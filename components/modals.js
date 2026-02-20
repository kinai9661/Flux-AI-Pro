/**
 * 模態框組件
 */

/**
 * 顯示模態框
 */
export function showModal(content) {
    const container = document.getElementById('modalContainer');
    if (!container) {
        const newContainer = document.createElement('div');
        newContainer.id = 'modalContainer';
        document.body.appendChild(newContainer);
    }
    document.getElementById('modalContainer').innerHTML = `
        <div class="modal-overlay" onclick="closeModalOnOverlay(event)">
            <div class="modal" onclick="event.stopPropagation()">
                ${content}
            </div>
        </div>
    `;
}

/**
 * 關閉模態框
 */
export function closeModal() {
    const container = document.getElementById('modalContainer');
    if (container) {
        container.innerHTML = '';
    }
}

/**
 * 點擊遮罩關閉
 */
window.closeModalOnOverlay = function(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

/**
 * 確認對話框
 */
export function showConfirmModal(title, message, onConfirm, onCancel) {
    showModal(`
        <h2>${title}</h2>
        <p>${message}</p>
        <div class="form-actions">
            <button class="btn btn-secondary" onclick="handleCancel()">取消</button>
            <button class="btn btn-danger" onclick="handleConfirm()">確認</button>
        </div>
    `);
    
    window.handleConfirm = function() {
        closeModal();
        if (onConfirm) onConfirm();
    };
    
    window.handleCancel = function() {
        closeModal();
        if (onCancel) onCancel();
    };
}

/**
 * 表單模態框
 */
export function showFormModal(title, fields, onSubmit, submitText = '保存') {
    const fieldsHtml = fields.map(field => {
        if (field.type === 'select') {
            return `
                <div class="form-group">
                    <label class="form-label">${field.label}${field.required ? ' *' : ''}</label>
                    <select class="form-select" id="${field.id}" ${field.required ? 'required' : ''}>
                        ${field.options.map(opt => `
                            <option value="${opt.value}" ${opt.selected ? 'selected' : ''}>${opt.label}</option>
                        `).join('')}
                    </select>
                </div>
            `;
        } else if (field.type === 'textarea') {
            return `
                <div class="form-group">
                    <label class="form-label">${field.label}${field.required ? ' *' : ''}</label>
                    <textarea class="form-textarea" id="${field.id}" 
                              placeholder="${field.placeholder || ''}" 
                              ${field.required ? 'required' : ''}>${field.value || ''}</textarea>
                </div>
            `;
        } else {
            return `
                <div class="form-group">
                    <label class="form-label">${field.label}${field.required ? ' *' : ''}</label>
                    <input type="${field.type || 'text'}" 
                           class="form-input" 
                           id="${field.id}" 
                           value="${field.value || ''}"
                           placeholder="${field.placeholder || ''}"
                           ${field.required ? 'required' : ''}>
                </div>
            `;
        }
    }).join('');

    showModal(`
        <h2>${title}</h2>
        <form id="modalForm" onsubmit="handleFormSubmit(event)">
            ${fieldsHtml}
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                <button type="submit" class="btn btn-primary">${submitText}</button>
            </div>
        </form>
    `);

    window.handleFormSubmit = function(event) {
        event.preventDefault();
        const formData = {};
        fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (element) {
                formData[field.id] = field.type === 'checkbox' ? element.checked : element.value;
            }
        });
        if (onSubmit) {
            onSubmit(formData);
        }
    };
}

/**
 * 載入中模態框
 */
export function showLoadingModal(message = '處理中...') {
    showModal(`
        <div class="loading-state">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `);
}
