// Windows 2000 System Entrypoint & Orchestrator

function bootstrap() {
    // 1. Initialize Desktop Manager
    DesktopManager = new DesktopManagerClass();

    // 2. Setup System Tray & Clock
    initSystemTray();

    // 3. Setup Start Button & Menu
    initStartMenu();

    // 4. Populate SVG Icons in static chrome
    populateChromeIcons();

    // 5. Setup Keyboard Shortcuts
    initKeyboardShortcuts();

    // 6. First user interaction startup audio
    let audioUnlocked = false;
    const unlockAudio = () => {
        if (!audioUnlocked) {
            audioUnlocked = true;
            retroSound.playStartup();
            document.removeEventListener("click", unlockAudio);
            document.removeEventListener("keydown", unlockAudio);
        }
    };
    document.addEventListener("click", unlockAudio);
    document.addEventListener("keydown", unlockAudio);

    // 7. Auto-open "My Computer" after a brief welcoming moment
    setTimeout(() => {
        AppManager.openMyComputer();
    }, 400);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
} else {
    bootstrap();
}

function initSystemTray() {
    const clockEl = document.getElementById("clock-display");
    const traySound = document.getElementById("tray-sound");
    const trayScreen = document.getElementById("tray-screen");

    // Live Clock
    const updateClock = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        clockEl.textContent = `${hours}:${minutes} ${ampm}`;
        clockEl.title = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    updateClock();
    setInterval(updateClock, 1000);

    // Audio Toggle
    traySound.innerHTML = getIconSvg("sound", 16, 16);
    traySound.addEventListener("click", () => {
        const isEnabled = retroSound.toggle();
        traySound.classList.toggle("sound-muted", !isEnabled);
        traySound.title = isEnabled ? "Audio: Enabled (Click to Mute)" : "Audio: Muted (Click to Unmute)";
    });

    // Display settings shortcut
    trayScreen.innerHTML = getIconSvg("settings", 16, 16);
    trayScreen.addEventListener("click", () => {
        AppManager.openProperties();
    });
}

function initStartMenu() {
    const startBtn = document.getElementById("start-button");
    const startMenu = document.getElementById("start-menu");

    startBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        retroSound.playClick();
        const isOpen = startMenu.classList.toggle("open");
        startBtn.classList.toggle("active", isOpen);
        // Hide context menus
        document.querySelectorAll(".context-menu").forEach(m => m.style.display = "none");
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#start-menu") && !e.target.closest("#start-button")) {
            startMenu.classList.remove("open");
            startBtn.classList.remove("active");
        }
    });

    // Submenu item click should close start menu
    startMenu.querySelectorAll(".start-item:not(#start-programs):not(#start-documents):not(#start-settings)").forEach(item => {
        item.addEventListener("click", () => {
            startMenu.classList.remove("open");
            startBtn.classList.remove("active");
        });
    });
}

function populateChromeIcons() {
    // Start button
    document.getElementById("start-icon").innerHTML = getIconSvg("win-flag", 16, 16);

    // Start menu items
    const setInner = (id, icon, size = 16) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = getIconSvg(icon, size, size);
    };

    setInner("start-ico-programs", "folder", 18);
    setInner("start-ico-documents", "my-documents", 18);
    setInner("start-ico-settings", "settings", 18);
    setInner("start-ico-help", "help", 18);
    setInner("start-ico-run", "run", 18);
    setInner("start-ico-shutdown", "shutdown", 18);

    // Programs Submenu
    setInner("start-sub-mycomputer", "my-computer", 16);
    setInner("start-sub-ie", "ie", 16);
    setInner("start-sub-notepad", "notepad-file", 16);
    setInner("start-sub-cmd", "cmd", 16);
    setInner("start-sub-minesweeper", "minesweeper", 16);

    // Documents Submenu
    setInner("start-sub-doc-htmlresume", "ie", 16);
    setInner("start-sub-doc-htmlresume2", "ie", 16);
    setInner("start-sub-doc-resume", "notepad-file", 16);
    setInner("start-sub-doc-about", "notepad-file", 16);
    setInner("start-sub-doc-contact", "notepad-file", 16);

    // Settings Submenu
    setInner("start-sub-ctrlpanel", "settings", 16);
    setInner("start-sub-disp-props", "settings", 16);

    // Context Menu New Items
    setInner("ctx-new-folder-ico", "folder", 14);
    setInner("ctx-new-file-ico", "notepad-file", 14);
}

function initKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        // F5 Refresh
        if (e.key === "F5") {
            e.preventDefault();
            DesktopManager.refresh();
        }
        // Escape closes start menu & context menus
        if (e.key === "Escape") {
            document.getElementById("start-menu").classList.remove("open");
            document.getElementById("start-button").classList.remove("active");
            document.querySelectorAll(".context-menu").forEach(m => m.style.display = "none");
            DialogManager.hideRun();
            DialogManager.hideShutdown();
        }
        // Win key toggles start menu
        if (e.key === "Meta") {
            const startBtn = document.getElementById("start-button");
            const startMenu = document.getElementById("start-menu");
            const isOpen = startMenu.classList.toggle("open");
            startBtn.classList.toggle("active", isOpen);
        }
    });
}
