
// ==========================================
// QR CODE GENERATOR - ADVANCED VERSION
// ==========================================

// State Management
const state = {
    currentPage: 'home',
    qrCode: null,
    qrHistory: [],
    formData: {},
    currentUser: null,
    settings: {
        size: 300,
        errorCorrection: 'M',
        type: 'text',
        darkColor: '#000000',
        lightColor: '#ffffff'
    }
};

// Color Presets
const presets = {
    classic: { dark: '#000000', light: '#ffffff' },
    colorful: { dark: '#667eea', light: '#e0e7ff' },
    neon: { dark: '#ff006e', light: '#ffbe0b' },
    pastel: { dark: '#d4a5ff', light: '#fff5f7' }
};

// QR Types Configuration
const qrTypes = {
    text: '📝',
    url: '🔗',
    email: '📧',
    phone: '📱',
    wifi: '📡',
    location: '📍',
    contact: '👤',
    calendar: '📅',
    sms: '💬',
    vcard: '🗂️'
};

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    loadUserDetails();
    setupEventListeners();
    loadQRHistory();
    navigateTo('home');
    initializeQRCode();
});

// ==========================================
// PAGE NAVIGATION
// ==========================================

function navigateTo(page) {
    if (state.currentPage === page) return;

    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show selected page
    const currentPage = document.getElementById(`${page}-page`);
    if (currentPage) {
        currentPage.classList.add('active');
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-page="${page}"]`)?.classList.add('active');

    state.currentPage = page;

    // Initialize page-specific content
    if (page === 'gallery') {
        populateGallery();
    } else if (page === 'generator') {
        setTimeout(() => generateQR(), 100);
    }
}

// ==========================================
// EVENT LISTENERS SETUP
// ==========================================

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Modal buttons
    setupModalListeners();

    // Form inputs in generator
    setupGeneratorListeners();

    // Modal links
    setupModalLinks();

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Message sent! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// ==========================================
// MODAL HANDLING
// ==========================================

function setupModalListeners() {
    const signInBtn = document.getElementById('btnSignIn');
    const signUpBtn = document.getElementById('btnSignUp');

    if (signInBtn) {
        signInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('signin-modal');
        });
    }

    if (signUpBtn) {
        signUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('signup-modal');
        });
    }

    // Close modals
    document.querySelectorAll('.modal').forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal.id));
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Sign In form
    const signInForm = document.getElementById('signin-form');
    if (signInForm) {
        signInForm.addEventListener('submit', handleSignIn);
    }

    // Sign Up form
    const signUpForm = document.getElementById('signup-form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', handleSignUp);
    }
}

function setupModalLinks() {
    const toSignUpLink = document.getElementById('to-signup');
    const toSignInLink = document.getElementById('to-signin');

    if (toSignUpLink) {
        toSignUpLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('signin-modal');
            openModal('signup-modal');
        });
    }

    if (toSignInLink) {
        toSignInLink.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('signup-modal');
            openModal('signin-modal');
        });
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

function switchModal(fromModal, toModal) {
    closeModal(fromModal);
    openModal(toModal);
}

function handleSignIn(e) {
    e.preventDefault();
    const email = document.getElementById('signin-email')?.value;
    const password = document.getElementById('signin-password')?.value;

    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    // Simulate sign in
    state.currentUser = { email, name: email.split('@')[0] };
    localStorage.setItem('currentUser', JSON.stringify(state.currentUser));

    showToast('Signed in successfully!', 'success');
    closeModal('signin-modal');

    // Reset form
    e.target.reset();
}

function handleSignUp(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name')?.value;
    const email = document.getElementById('signup-email')?.value;
    const password = document.getElementById('signup-password')?.value;
    const confirmPassword = document.getElementById('signup-confirm')?.value;

    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }

    // Simulate sign up
    state.currentUser = { name, email };
    localStorage.setItem('currentUser', JSON.stringify(state.currentUser));

    showToast('Account created successfully!', 'success');
    closeModal('signup-modal');

    // Reset form
    e.target.reset();
}

// ==========================================
// GENERATOR PAGE
// ==========================================

function setupGeneratorListeners() {
    // Content input (HTML uses id="qrInput")
    const contentInput = document.getElementById('qrInput');
    if (contentInput) {
        contentInput.addEventListener('input', handleContentChange);
    }

    // QR Type selection (HTML uses <select id="qrType">)
    const qrTypeSelect = document.getElementById('qrType');
    if (qrTypeSelect) {
        qrTypeSelect.addEventListener('change', handleQrTypeChange);
    }

    // Color pickers (HTML uses id="colorDark" and id="colorLight")
    const darkColorPicker = document.getElementById('colorDark');
    const lightColorPicker = document.getElementById('colorLight');

    if (darkColorPicker) {
        darkColorPicker.addEventListener('change', handleColorChange);
    }
    if (lightColorPicker) {
        lightColorPicker.addEventListener('change', handleColorChange);
    }

    // Style presets (HTML uses .style-btn and data-style)
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.addEventListener('click', handleStylePreset);
    });

    // Error correction (HTML uses id="errorCorrection")
    const errorCorrectionSelect = document.getElementById('errorCorrection');
    if (errorCorrectionSelect) {
        errorCorrectionSelect.addEventListener('change', handleErrorCorrectionChange);
    }

    // Size slider (HTML uses id="qrSize")
    const sizeSlider = document.getElementById('qrSize');
    if (sizeSlider) {
        sizeSlider.addEventListener('input', handleSizeChange);
    }

    // Size presets (HTML uses .size-preset and data-size)
    document.querySelectorAll('.size-preset').forEach(btn => {
        btn.addEventListener('click', handleSizePreset);
    });

    // Export format (HTML uses .format-btn and data-format)
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', handleFormatChange);
    });

    // Generate & Reset buttons
    const generateBtn = document.getElementById('generateBtn');
    const resetBtn = document.getElementById('resetBtn');
    if (generateBtn) generateBtn.addEventListener('click', () => { generateQR(); enableExportButtons(); });
    if (resetBtn) resetBtn.addEventListener('click', resetGenerator);

    // Export buttons (HTML uses id="downloadBtn", "copyBtn", "shareBtn")
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const shareBtn = document.getElementById('shareBtn');

    if (downloadBtn) downloadBtn.addEventListener('click', downloadQR);
    if (copyBtn) copyBtn.addEventListener('click', copyQR);
    if (shareBtn) shareBtn.addEventListener('click', shareQR);

    // Clear history (HTML uses id="clearHistory")
    const clearHistoryBtn = document.getElementById('clearHistory');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearHistory);
    }
}

function handleQrTypeChange(e) {
    state.settings.type = e.target.value;
    generateQR();
}

function enableExportButtons() {
    const canvas = document.querySelector('.qr-preview-box canvas');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const shareBtn = document.getElementById('shareBtn');
    if (canvas && downloadBtn) { downloadBtn.disabled = false; }
    if (canvas && copyBtn) { copyBtn.disabled = false; }
    if (canvas && shareBtn) { shareBtn.disabled = false; }
}

function resetGenerator() {
    const qrInput = document.getElementById('qrInput');
    const previewBox = document.querySelector('.qr-preview-box');
    if (qrInput) qrInput.value = '';
    state.settings.darkColor = '#000000';
    state.settings.lightColor = '#ffffff';
    state.settings.size = 300;
    state.settings.errorCorrection = 'M';
    state.settings.format = 'png';
    const colorDark = document.getElementById('colorDark');
    const lightColor = document.getElementById('colorLight');
    const qrSize = document.getElementById('qrSize');
    const errorCorrection = document.getElementById('errorCorrection');
    if (colorDark) colorDark.value = '#000000';
    if (lightColor) lightColor.value = '#FFFFFF';
    if (qrSize) { qrSize.value = 300; }
    if (errorCorrection) errorCorrection.value = 'M';
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.style === 'classic');
    });
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.format === 'png');
    });
    const sizeValue = document.getElementById('sizeValue');
    if (sizeValue) sizeValue.textContent = '300';
    if (previewBox) {
        previewBox.innerHTML = '<div class="preview-placeholder"><div class="placeholder-icon">📱</div><p>Your QR code will appear here</p><small>Configure settings and click "Generate QR Code"</small></div>';
    }
    state.qrCode = null;
    const dBtn = document.getElementById('downloadBtn');
    const cBtn = document.getElementById('copyBtn');
    const sBtn = document.getElementById('shareBtn');
    if (dBtn) dBtn.disabled = true;
    if (cBtn) cBtn.disabled = true;
    if (sBtn) sBtn.disabled = true;
    updateColorPreview();
    updateStatistics('');
}

// ==========================================
// QR GENERATION
// ==========================================

function initializeQRCode() {
    try {
        if (typeof QRCode !== 'undefined') {
            generateQR();
        } else {
            console.warn('QRCode library not loaded');
        }
    } catch (error) {
        console.error('Error initializing QR code:', error);
    }
}

function generateQR() {
    const content = document.getElementById('qr-content')?.value || document.getElementById('qrInput')?.value || 'https://example.com';
    const previewBox = document.querySelector('.qr-preview-box');

    if (!previewBox) return;

    // Clear previous QR
    previewBox.innerHTML = '';

    if (!content) {
        previewBox.innerHTML = `
            <div class="preview-placeholder">
                <div class="placeholder-icon">📱</div>
                <p>Enter content to generate QR code</p>
            </div>
        `;
        return;
    }

    try {
        const qr = new QRCode(previewBox, {
            text: content,
            width: state.settings.size,
            height: state.settings.size,
            colorDark: state.settings.darkColor,
            colorLight: state.settings.lightColor,
            correctLevel: QRCode.CorrectLevel[state.settings.errorCorrection]
        });

        state.qrCode = qr;
        updateStatistics(content);
        updateColorPreview();

    } catch (error) {
        console.error('QR generation error:', error);
        previewBox.innerHTML = `
            <div class="preview-placeholder">
                <p style="color: red;">Error generating QR code</p>
            </div>
        `;
    }
}

// ==========================================
// HANDLERS
// ==========================================

function handleContentChange(e) {
    state.settings.content = e.target.value;
    generateQR();
}

function handleTypeChange(e) {
    state.settings.type = e.target.dataset.qrType;
    document.querySelectorAll('[data-qr-type]').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    generateQR();
}

function handleColorChange(e) {
    if (e.target.id === 'colorDark') {
        state.settings.darkColor = e.target.value;
    } else if (e.target.id === 'colorLight') {
        state.settings.lightColor = e.target.value;
    }
    updateColorPreview();
    generateQR();
}

function handleStylePreset(e) {
    const preset = e.target.dataset.style;
    if (presets[preset]) {
        state.settings.darkColor = presets[preset].dark;
        state.settings.lightColor = presets[preset].light;

        const colorDarkEl = document.getElementById('colorDark');
        const colorLightEl = document.getElementById('colorLight');
        if (colorDarkEl) colorDarkEl.value = presets[preset].dark;
        if (colorLightEl) colorLightEl.value = presets[preset].light;

        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        updateColorPreview();
        generateQR();
    }
}

function handleErrorCorrectionChange(e) {
    state.settings.errorCorrection = e.target.value;
    generateQR();
}

function handleSizeChange(e) {
    state.settings.size = parseInt(e.target.value);
    const sizeValue = document.getElementById('sizeValue');
    if (sizeValue) {
        sizeValue.textContent = state.settings.size;
    }
    generateQR();
}

function handleSizePreset(e) {
    const size = parseInt(e.target.dataset.size);
    state.settings.size = size;
    const sizeSlider = document.getElementById('qrSize');
    const sizeValue = document.getElementById('sizeValue');
    if (sizeSlider) {
        sizeSlider.value = size;
        sizeSlider.dispatchEvent(new Event('input'));
    }
    if (sizeValue) sizeValue.textContent = size;
}

function handleFormatChange(e) {
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    state.settings.format = e.target.dataset.format || 'png';
}

// ==========================================
// EXPORT FUNCTIONS
// ==========================================

function downloadQR() {
    if (!state.qrCode) {
        showToast('Please generate a QR code first', 'warning');
        return;
    }

    try {
        const canvas = document.querySelector('.qr-preview-box canvas');
        if (!canvas) {
            showToast('Unable to download QR code', 'error');
            return;
        }

        const format = state.settings.format || 'png';
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        
        if (format === 'svg') {
            // For SVG, we need to create SVG from canvas
            link.href = canvas.toDataURL('image/png');
            link.download = `qrcode-${timestamp}.png`;
        } else {
            const type = format === 'jpg' ? 'image/jpeg' : 'image/png';
            link.href = canvas.toDataURL(type);
            link.download = `qrcode-${timestamp}.${format}`;
        }

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        addToHistory();
        showToast('QR code downloaded successfully!', 'success');

    } catch (error) {
        console.error('Download error:', error);
        showToast('Error downloading QR code', 'error');
    }
}

function copyQR() {
    try {
        const canvas = document.querySelector('.qr-preview-box canvas');
        if (!canvas) {
            showToast('Unable to copy QR code', 'error');
            return;
        }

        canvas.toBlob(blob => {
            navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]).then(() => {
                addToHistory();
                showToast('QR code copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Clipboard error:', err);
                showToast('Error copying to clipboard', 'error');
            });
        });
    } catch (error) {
        console.error('Copy error:', error);
        showToast('Error copying QR code', 'error');
    }
}

function shareQR() {
    try {
        const canvas = document.querySelector('.qr-preview-box canvas');
        const content = document.getElementById('qrInput')?.value || 'Check out this QR code!';

        if (!canvas) {
            showToast('Unable to share QR code', 'error');
            return;
        }

        if (navigator.share) {
            canvas.toBlob(blob => {
                const file = new File([blob], 'qrcode.png', { type: 'image/png' });
                navigator.share({
                    files: [file],
                    title: 'QR Code',
                    text: content
                }).then(() => {
                    addToHistory();
                    showToast('QR code shared successfully!', 'success');
                }).catch(err => {
                    if (err.name !== 'AbortError') {
                        console.error('Share error:', err);
                    }
                });
            });
        } else {
            showToast('Share not supported on this device', 'warning');
        }
    } catch (error) {
        console.error('Share error:', error);
        showToast('Error sharing QR code', 'error');
    }
}

// ==========================================
// HISTORY & GALLERY
// ==========================================

function addToHistory() {
    const content = document.getElementById('qrInput')?.value || '';
    const timestamp = new Date().toLocaleTimeString();
    const canvas = document.querySelector('.qr-preview-box canvas');

    if (!canvas) return;

    const historyItem = {
        id: Date.now(),
        content: content,
        timestamp: timestamp,
        image: canvas.toDataURL()
    };

    state.qrHistory.unshift(historyItem);
    if (state.qrHistory.length > 20) {
        state.qrHistory.pop();
    }

    saveQRHistory();
    updateHistoryPanel();
}

function loadQRHistory() {
    const saved = localStorage.getItem('qrHistory');
    if (saved) {
        try {
            state.qrHistory = JSON.parse(saved);
        } catch (error) {
            console.error('Error loading history:', error);
            state.qrHistory = [];
        }
    }
    updateHistoryPanel();
}

function saveQRHistory() {
    localStorage.setItem('qrHistory', JSON.stringify(state.qrHistory));
}

function updateHistoryPanel() {
    const historyList = document.querySelector('.history-list');
    if (!historyList) return;

    historyList.innerHTML = '';

    if (state.qrHistory.length === 0) {
        historyList.innerHTML = '<div style="text-align: center; color: #999; padding: 20px;">No history yet</div>';
        return;
    }

    state.qrHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${item.content.substring(0, 20)}</strong>
                    <small style="display: block; color: #999;">${item.timestamp}</small>
                </div>
                <button onclick="deleteHistoryItem(${item.id})" style="background: none; border: none; cursor: pointer; color: #ef4444;">✕</button>
            </div>
        `;
        historyList.appendChild(div);
    });
}

function deleteHistoryItem(id) {
    state.qrHistory = state.qrHistory.filter(item => item.id !== id);
    saveQRHistory();
    updateHistoryPanel();
    showToast('Item removed from history', 'success');
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        state.qrHistory = [];
        saveQRHistory();
        updateHistoryPanel();
        showToast('History cleared', 'success');
    }
}

function populateGallery() {
    const gallery = document.querySelector('.gallery-grid');
    if (!gallery) return;

    gallery.innerHTML = '';

    if (state.qrHistory.length === 0) {
        gallery.innerHTML = `
            <div class="gallery-placeholder">
                <p>No QR codes yet. Generate one from the Generator page!</p>
            </div>
        `;
        return;
    }

    state.qrHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <img src="${item.image}" alt="QR Code" style="max-width: 100%; border-radius: 8px;">
            <div class="gallery-item-info">
                <strong>${item.content.substring(0, 30)}</strong>
                <div>${item.timestamp}</div>
            </div>
        `;
        gallery.appendChild(div);
    });
}

// ==========================================
// STATISTICS
// ==========================================

function updateStatistics(content) {
    const length = (content || '').length;
    const version = calculateQRVersion(length);
    const capacity = calculateDataCapacity(version);

    const contentLengthEl = document.getElementById('contentLength');
    const qrVersionEl = document.getElementById('qrVersion');
    const dataCapacityEl = document.getElementById('dataCapacity');
    if (contentLengthEl) contentLengthEl.textContent = length;
    if (qrVersionEl) qrVersionEl.textContent = 'v' + version;
    if (dataCapacityEl) dataCapacityEl.textContent = capacity;
}

function calculateQRVersion(contentLength) {
    if (contentLength <= 41) return 1;
    if (contentLength <= 77) return 2;
    if (contentLength <= 127) return 3;
    if (contentLength <= 187) return 4;
    if (contentLength <= 335) return 5;
    return 6;
}

function calculateDataCapacity(version) {
    const capacities = {
        1: 41,
        2: 77,
        3: 127,
        4: 187,
        5: 335,
        6: 520
    };
    return capacities[version] || 2953;
}

// ==========================================
// UI HELPERS
// ==========================================

function updateColorPreview() {
    const darkPreview = document.getElementById('colorDarkPreview');
    const lightPreview = document.getElementById('colorLightPreview');

    if (darkPreview) darkPreview.style.backgroundColor = state.settings.darkColor;
    if (lightPreview) lightPreview.style.backgroundColor = state.settings.lightColor;
}

function loadUserDetails() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        try {
            state.currentUser = JSON.parse(saved);
        } catch (error) {
            console.error('Error loading user details:', error);
        }
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// PERSISTENCE
// ==========================================

window.addEventListener('beforeunload', () => {
    localStorage.setItem('qrSettings', JSON.stringify(state.settings));
    localStorage.setItem('qrHistory', JSON.stringify(state.qrHistory));
});

// Load saved settings on startup
window.addEventListener('load', () => {
    const saved = localStorage.getItem('qrSettings');
    if (saved) {
        try {
            const settings = JSON.parse(saved);
            state.settings = { ...state.settings, ...settings };

            // Update UI (HTML IDs: colorDark, colorLight, qrSize, errorCorrection)
            const darkColor = document.getElementById('colorDark');
            const lightColor = document.getElementById('colorLight');
            const sizeSlider = document.getElementById('qrSize');
            const errorCorrection = document.getElementById('errorCorrection');

            if (darkColor) darkColor.value = state.settings.darkColor;
            if (lightColor) lightColor.value = state.settings.lightColor;
            if (sizeSlider) sizeSlider.value = state.settings.size;
            if (errorCorrection) errorCorrection.value = state.settings.errorCorrection;

            const sizeValue = document.getElementById('sizeValue');
            if (sizeValue) sizeValue.textContent = state.settings.size;
            updateColorPreview();
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }
});
