/* =================================================================================
 *  Flux AI Pro - FIXED & DEPLOYABLE EDITION
 *  - Pollinations API Key fully supported (env + frontend)
 *  - Nano & Main UI unified auth logic
 *  - Ready for Cloudflare Workers
 * ================================================================================= */

const CONFIG = {
  PROJECT_NAME: "Flux-AI-Pro",
  PROJECT_VERSION: "11.2.1-fixed",

  FETCH_TIMEOUT: 120000,
  MAX_RETRIES: 3,

  POLLINATIONS_AUTH: {
    enabled: true,
    token: "",
    method: "bearer"
  },

  PROVIDERS: {
    pollinations: {
      name: "Pollinations.ai",
      endpoint: "https://gen.pollinations.ai",
      pathPrefix: "/image",
      type: "direct",
      auth_mode: "bearer",
      requires_key: true,
      enabled: true,
      default: true,
      models: [
        { id: "gptimage", name: "GPT-Image" },
        { id: "flux", name: "Flux" },
        { id: "turbo", name: "Flux Turbo" },
        { id: "klein", name: "FLUX.2 Klein 4B" },
        { id: "nanobanana-pro", name: "NanoBanana Pro" }
      ]
    },

    infip: {
      name: "Ghostbot (Infip)",
      endpoint: "https://api.infip.pro",
      auth_mode: "bearer",
      requires_key: true,
      enabled: true,
      models: [
        { id: "img4", name: "Imagen 4" },
        { id: "sdxl", name: "SDXL" }
      ]
    }
  },

  DEFAULT_PROVIDER: "pollinations"
};

/* =======================================================
 *  Logger
 * ======================================================= */
class Logger {
  constructor() { this.logs = []; }
  add(title, data) {
    this.logs.push({ title, data, time: new Date().toISOString() });
  }
  get() { return this.logs; }
}

/* =======================================================
 *  Pollinations Provider (FIXED)
 * ======================================================= */
class PollinationsProvider {
  constructor(config, env) {
    this.config = config;
    this.env = env;
  }

  async generate(prompt, options, logger) {
    const {
      model = "flux",
      width = 1024,
      height = 1024,
      seed = -1,
      apiKey = ""
    } = options;

    const requestKey = apiKey?.trim();
    const envKey = this.env?.POLLINATIONS_API_KEY?.trim();
    const fallbackKey = CONFIG.POLLINATIONS_AUTH.token?.trim();

    const finalKey = requestKey || envKey || fallbackKey;

    const headers = {
      "User-Agent": "Flux-AI-Pro",
      "Accept": "image/*"
    };

    if (finalKey) {
      headers["Authorization"] = `Bearer ${finalKey}`;
      logger.add("Auth", {
        provider: "pollinations",
        source: requestKey ? "request" : (envKey ? "env" : "fallback"),
        token_prefix: finalKey.slice(0, 8) + "..."
      });
    } else {
      logger.add("Auth", {
        provider: "pollinations",
        authenticated: false,
        warning: "No API key provided"
      });
    }

    const usedSeed = seed === -1 ? Math.floor(Math.random() * 1e6) : seed;
    const encodedPrompt = encodeURIComponent(prompt);

    const url =
      `${this.config.endpoint}${this.config.pathPrefix}/${encodedPrompt}` +
      `?model=${model}&width=${width}&height=${height}&seed=${usedSeed}&nologo=true`;

    const res = await fetch(url, { headers, method: "GET" });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Pollinations authentication failed (401)");
      }
      throw new Error(`Pollinations error ${res.status}`);
    }

    const buf = await res.arrayBuffer();
    return {
      imageData: buf,
      contentType: res.headers.get("content-type") || "image/png",
      seed: usedSeed,
      model,
      provider: "pollinations",
      authenticated: !!finalKey
    };
  }
}

/* =======================================================
 *  Infip Provider (unchanged but cleaned)
 * ======================================================= */
class InfipProvider {
  constructor(config, env) {
    this.config = config;
    this.env = env;
  }

  async generate(prompt, options) {
    const apiKey = options.apiKey || this.env?.INFIP_API_KEY;
    if (!apiKey) throw new Error("INFIP_API_KEY required");

    const res = await fetch(`${this.config.endpoint}/v1/images/generations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: options.model || "img4",
        prompt,
        size: "1024x1024"
      })
    });

    if (!res.ok) throw new Error("Infip request failed");

    const data = await res.json();
    const imgUrl = data.data[0].url;
    const imgRes = await fetch(imgUrl);

    return {
      imageData: await imgRes.arrayBuffer(),
      contentType: imgRes.headers.get("content-type"),
      provider: "infip",
      authenticated: true
    };
  }
}

/* =======================================================
 *  Router
 * ======================================================= */
class MultiProviderRouter {
  constructor(env) {
    this.env = env;
    this.providers = {
      pollinations: new PollinationsProvider(CONFIG.PROVIDERS.pollinations, env),
      infip: new InfipProvider(CONFIG.PROVIDERS.infip, env)
    };
  }

  async generate(prompt, options, logger) {
    const providerName = options.provider || CONFIG.DEFAULT_PROVIDER;
    const provider = this.providers[providerName];
    if (!provider) throw new Error("Unknown provider");
    return provider.generate(prompt, options, logger);
  }
}

/* =======================================================
 *  Worker Entrypoint
 * ======================================================= */
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (request.method === "POST") {
      const body = await request.json();
      const logger = new Logger();

      try {
        const router = new MultiProviderRouter(env);
        const result = await router.generate(
          body.prompt,
          {
            provider: body.provider,
            model: body.model,
            width: body.width,
            height: body.height,
            seed: body.seed,
            apiKey: body.api_key
          },
          logger
        );

        return new Response(result.imageData, {
          headers: {
            "Content-Type": result.contentType,
            "X-Provider": result.provider,
            "X-Authenticated": result.authenticated ? "true" : "false",
            "Access-Control-Allow-Origin": "*"
          }
        });

      } catch (e) {
        return new Response(JSON.stringify({
          error: e.message,
          logs: logger.get()
        }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
    }

    return new Response("Flux AI Pro is running", {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
};
