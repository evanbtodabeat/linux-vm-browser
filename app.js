// Linux VM Browser - Main Application
// Optimized for systems with limited RAM

class LinuxVMBrowser {
    constructor() {
        this.emulator = null;
        this.isRunning = false;
        this.settings = this.loadSettings();
        this.initializeElements();
        this.attachEventListeners();
        this.applyTheme();
    }

    initializeElements() {
        this.elements = {
            screen: document.getElementById('screen'),
            startBtn: document.getElementById('startBtn'),
            stopBtn: document.getElementById('stopBtn'),
            fullscreenBtn: document.getElementById('fullscreenBtn'),
            status: document.getElementById('status'),
            statusDot: document.getElementById('statusDot'),
            cpuCount: document.getElementById('cpuCount'),
            memorySize: document.getElementById('memorySize'),
            distro: document.getElementById('distro'),
            theme: document.getElementById('theme'),
            saveSettings: document.getElementById('saveSettings'),
            clearData: document.getElementById('clearData'),
            navButtons: document.querySelectorAll('.nav-btn'),
            tabContents: document.querySelectorAll('.tab-content')
        };
    }

    attachEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.startVM());
        this.elements.stopBtn.addEventListener('click', () => this.stopVM());
        this.elements.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        this.elements.saveSettings.addEventListener('click', () => this.saveSettingsAction());
        this.elements.clearData.addEventListener('click', () => this.clearDataAction());
        this.elements.theme.addEventListener('change', () => this.toggleTheme());

        // Tab navigation
        this.elements.navButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
    }

    loadSettings() {
        const defaults = {
            cpuCount: 1,
            memorySize: 512, // Optimized for 1GB RAM systems
            distro: 'alpine', // Alpine is lightweight
            theme: 'dark'
        };
        const stored = localStorage.getItem('vmSettings');
        return stored ? JSON.parse(stored) : defaults;
    }

    saveSettingsAction() {
        this.settings = {
            cpuCount: parseInt(this.elements.cpuCount.value),
            memorySize: parseInt(this.elements.memorySize.value),
            distro: this.elements.distro.value,
            theme: this.elements.theme.value
        };
        localStorage.setItem('vmSettings', JSON.stringify(this.settings));
        alert('Settings saved! Restart the VM for changes to take effect.');
    }

    clearDataAction() {
        if (confirm('Are you sure? This will delete all VM data and settings.')) {
            localStorage.clear();
            alert('All data cleared. Refresh the page.');
        }
    }

    toggleTheme() {
        const theme = this.elements.theme.value;
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
        this.settings.theme = theme;
        localStorage.setItem('vmSettings', JSON.stringify(this.settings));
    }

    applyTheme() {
        this.elements.theme.value = this.settings.theme;
        if (this.settings.theme === 'light') {
            document.body.classList.add('light-theme');
        }
    }

    switchTab(tabName) {
        // Hide all tabs
        this.elements.tabContents.forEach(tab => tab.classList.remove('active'));
        this.elements.navButtons.forEach(btn => btn.classList.remove('active'));

        // Show selected tab
        document.getElementById(tabName).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    }

    async startVM() {
        if (this.isRunning) {
            alert('VM is already running!');
            return;
        }

        this.updateStatus('Starting VM...', false);
        this.elements.startBtn.disabled = true;

        try {
            // Choose image based on distribution
            const imageUrl = this.getImageUrl(this.settings.distro);

            const emulatorOptions = {
                wasm_path: 'https://copy.sh/v86/build/',
                memory_size: this.settings.memorySize * 1024 * 1024,
                vga_memory_size: 8 * 1024 * 1024,
                screen_container: this.elements.screen,
                bios: { url: 'https://copy.sh/v86/bios/seabios.bin' },
                vga_bios: { url: 'https://copy.sh/v86/bios/vgabios.bin' },
                cdrom: { url: imageUrl },
                autostart: true,
                disable_speaker: true,
            };

            this.emulator = new V86(emulatorOptions);

            this.emulator.add_listener('emulator-started', () => {
                this.isRunning = true;
                this.updateStatus('VM Running', true);
                this.elements.startBtn.disabled = true;
                this.elements.stopBtn.disabled = false;
                console.log('VM Started');
            });

            this.emulator.add_listener('emulator-stopped', () => {
                this.isRunning = false;
                this.updateStatus('VM Stopped', false);
                this.elements.startBtn.disabled = false;
                this.elements.stopBtn.disabled = true;
                console.log('VM Stopped');
            });

        } catch (error) {
            this.updateStatus('Error Starting VM', false);
            console.error('Error starting VM:', error);
            this.elements.startBtn.disabled = false;
            alert('Error starting VM. Check console for details.');
        }
    }

    stopVM() {
        if (!this.isRunning) {
            alert('VM is not running!');
            return;
        }

        if (this.emulator) {
            this.emulator.stop();
            this.isRunning = false;
            this.updateStatus('VM Stopped', false);
            this.elements.startBtn.disabled = false;
            this.elements.stopBtn.disabled = true;
        }
    }

    toggleFullscreen() {
        const screen = this.elements.screen;
        if (!document.fullscreenElement) {
            screen.requestFullscreen().catch(err => {
                alert(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    getImageUrl(distro) {
        // Alpine Linux is lightweight and perfect for 1GB RAM systems
        const images = {
            alpine: 'https://copy.sh/v86/images/alpine-linux-3.18.0.iso',
            debian: 'https://copy.sh/v86/images/debian-11.iso',
        };
        return images[distro] || images.alpine;
    }

    updateStatus(message, isOnline) {
        this.elements.status.textContent = message;
        if (isOnline) {
            this.elements.statusDot.classList.remove('offline');
        } else {
            this.elements.statusDot.classList.add('offline');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.vmBrowser = new LinuxVMBrowser();
    console.log('Linux VM Browser initialized - Optimized for 1GB RAM');
});