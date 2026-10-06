// Windows 2000 Window Management System

class WindowManager {
    constructor() {
        this.container = document.getElementById("windows-container");
        this.taskbarTasks = document.getElementById("taskbar-tasks");
        this.windows = new Map(); // id -> window instance
        this.activeWindowId = null;
        this.zIndexCounter = 100;
        this.cascadeOffset = 0;
    }

    createWindow(config) {
        const id = config.id || `win_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        // If window already exists, bring it to front
        if (this.windows.has(id)) {
            const existingWin = this.windows.get(id);
            if (existingWin.minimized) {
                this.restoreWindow(id);
            }
            this.focusWindow(id);
            return existingWin;
        }

        const width = config.width || 560;
        const height = config.height || 400;

        // Smart Cascade placement
        const deskRect = document.getElementById("desktop").getBoundingClientRect();
        let left = config.left !== undefined ? config.left : 40 + (this.cascadeOffset % 10) * 24;
        let top = config.top !== undefined ? config.top : 30 + (this.cascadeOffset % 10) * 24;
        this.cascadeOffset++;

        // Keep inside bounds
        if (left + width > deskRect.width) left = Math.max(10, deskRect.width - width - 20);
        if (top + height > deskRect.height) top = Math.max(10, deskRect.height - height - 20);

        const winEl = document.createElement("div");
        winEl.className = "win-window";
        winEl.id = `window-${id}`;
        winEl.style.width = `${width}px`;
        winEl.style.height = `${height}px`;
        winEl.style.left = `${left}px`;
        winEl.style.top = `${top}px`;
        winEl.style.zIndex = ++this.zIndexCounter;

        // Titlebar
        const titlebar = document.createElement("div");
        titlebar.className = "win-titlebar";

        const titlebarLeft = document.createElement("div");
        titlebarLeft.className = "win-titlebar-left";

        const iconEl = document.createElement("div");
        iconEl.className = "win-titlebar-icon";
        iconEl.innerHTML = getIconSvg(config.icon || "folder", 16, 16);

        const titleEl = document.createElement("span");
        titleEl.className = "win-titlebar-title";
        titleEl.textContent = config.title || "Window";

        titlebarLeft.appendChild(iconEl);
        titlebarLeft.appendChild(titleEl);

        // Control Buttons
        const controls = document.createElement("div");
        controls.className = "win-titlebar-controls";

        // Minimize
        const minBtn = document.createElement("button");
        minBtn.className = "win-control-btn";
        minBtn.title = "Minimize";
        minBtn.innerHTML = "&#9601;";
        minBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.minimizeWindow(id);
        });

        // Maximize / Restore
        const maxBtn = document.createElement("button");
        maxBtn.className = "win-control-btn";
        maxBtn.title = "Maximize";
        maxBtn.innerHTML = "&#9633;";
        maxBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleMaximizeWindow(id);
        });

        // Close
        const closeBtn = document.createElement("button");
        closeBtn.className = "win-control-btn";
        closeBtn.title = "Close";
        closeBtn.innerHTML = "&#10005;";
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.closeWindow(id);
        });

        controls.appendChild(minBtn);
        controls.appendChild(maxBtn);
        controls.appendChild(closeBtn);

        titlebar.appendChild(titlebarLeft);
        titlebar.appendChild(controls);
        winEl.appendChild(titlebar);

        // Menubar if specified
        if (config.menubar) {
            winEl.appendChild(config.menubar);
        }

        // Toolbar if specified
        if (config.toolbar) {
            winEl.appendChild(config.toolbar);
        }

        // Address bar if specified
        if (config.addressbar) {
            winEl.appendChild(config.addressbar);
        }

        // Main Body Container
        const bodyEl = document.createElement("div");
        bodyEl.className = "win-body";
        if (config.bodyContent) {
            if (typeof config.bodyContent === "string") {
                bodyEl.innerHTML = config.bodyContent;
            } else {
                bodyEl.appendChild(config.bodyContent);
            }
        }
        winEl.appendChild(bodyEl);

        // Status bar if specified
        if (config.statusbar) {
            winEl.appendChild(config.statusbar);
        }

        this.container.appendChild(winEl);

        // Create Taskbar Tab
        const taskTab = document.createElement("div");
        taskTab.className = "taskbar-tab active";
        taskTab.id = `task-tab-${id}`;

        const tabIcon = document.createElement("div");
        tabIcon.className = "taskbar-tab-icon";
        tabIcon.innerHTML = getIconSvg(config.icon || "folder", 16, 16);

        const tabTitle = document.createElement("span");
        tabTitle.className = "taskbar-tab-title";
        tabTitle.textContent = config.title || "Window";

        taskTab.appendChild(tabIcon);
        taskTab.appendChild(tabTitle);

        taskTab.addEventListener("click", () => {
            retroSound.playClick();
            if (this.activeWindowId === id) {
                this.minimizeWindow(id);
            } else {
                if (winData.minimized) {
                    this.restoreWindow(id);
                }
                this.focusWindow(id);
            }
        });

        this.taskbarTasks.appendChild(taskTab);

        // Window Data Model
        const winData = {
            id,
            config,
            el: winEl,
            taskTab,
            bodyEl,
            titleEl,
            maxBtn,
            minimized: false,
            maximized: false,
            normalBounds: { left, top, width, height }
        };

        this.windows.set(id, winData);

        // Setup Dragging
        this.setupDragging(winData, titlebar);

        // Window Focus Click
        winEl.addEventListener("mousedown", () => {
            this.focusWindow(id);
        });

        this.focusWindow(id);
        retroSound.playClick();

        if (config.onInit) {
            config.onInit(winData);
        }

        return winData;
    }

    setupDragging(winData, titlebar) {
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let startLeft = 0;
        let startTop = 0;

        const onMouseDown = (e) => {
            // Only drag on left click and not on control buttons
            if (e.button !== 0 || e.target.closest(".win-control-btn")) return;
            if (winData.maximized) return;

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(winData.el.style.left, 10) || 0;
            startTop = parseInt(winData.el.style.top, 10) || 0;

            this.focusWindow(winData.id);

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
            e.preventDefault();
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            let newLeft = startLeft + dx;
            let newTop = startTop + dy;

            const desk = document.getElementById("desktop");
            const deskRect = desk.getBoundingClientRect();

            // Constrain top to not disappear above desktop
            if (newTop < 0) newTop = 0;
            if (newTop > deskRect.height - 30) newTop = deskRect.height - 30;

            winData.el.style.left = `${newLeft}px`;
            winData.el.style.top = `${newTop}px`;
            winData.normalBounds.left = newLeft;
            winData.normalBounds.top = newTop;
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        titlebar.addEventListener("mousedown", onMouseDown);
    }

    focusWindow(id) {
        const win = this.windows.get(id);
        if (!win) return;

        this.activeWindowId = id;

        // Update all windows inactive except this one
        this.windows.forEach((w) => {
            if (w.id === id) {
                w.el.classList.remove("inactive");
                w.el.style.zIndex = ++this.zIndexCounter;
                w.taskTab.classList.add("active");
            } else {
                w.el.classList.add("inactive");
                w.taskTab.classList.remove("active");
            }
        });
    }

    minimizeWindow(id) {
        const win = this.windows.get(id);
        if (!win) return;

        win.minimized = true;
        win.el.style.display = "none";
        win.taskTab.classList.remove("active");

        // Focus next highest window
        if (this.activeWindowId === id) {
            this.activeWindowId = null;
            let highestZ = -1;
            let nextWinId = null;

            this.windows.forEach((w) => {
                if (!w.minimized) {
                    const z = parseInt(w.el.style.zIndex, 10);
                    if (z > highestZ) {
                        highestZ = z;
                        nextWinId = w.id;
                    }
                }
            });

            if (nextWinId) {
                this.focusWindow(nextWinId);
            }
        }
    }

    restoreWindow(id) {
        const win = this.windows.get(id);
        if (!win) return;

        win.minimized = false;
        win.el.style.display = "flex";
        this.focusWindow(id);
    }

    toggleMaximizeWindow(id) {
        const win = this.windows.get(id);
        if (!win) return;

        win.maximized = !win.maximized;

        if (win.maximized) {
            win.el.classList.add("maximized");
            win.maxBtn.innerHTML = "&#10064;"; // double square restore symbol
            win.maxBtn.title = "Restore";
        } else {
            win.el.classList.remove("maximized");
            win.el.style.left = `${win.normalBounds.left}px`;
            win.el.style.top = `${win.normalBounds.top}px`;
            win.el.style.width = `${win.normalBounds.width}px`;
            win.el.style.height = `${win.normalBounds.height}px`;
            win.maxBtn.innerHTML = "&#9633;";
            win.maxBtn.title = "Maximize";
        }
    }

    closeWindow(id) {
        const win = this.windows.get(id);
        if (!win) return;

        retroSound.playClick();

        if (win.config.onClose) {
            win.config.onClose(win);
        }

        win.el.remove();
        win.taskTab.remove();
        this.windows.delete(id);

        if (this.activeWindowId === id) {
            this.activeWindowId = null;
            let highestZ = -1;
            let nextWinId = null;

            this.windows.forEach((w) => {
                if (!w.minimized) {
                    const z = parseInt(w.el.style.zIndex, 10);
                    if (z > highestZ) {
                        highestZ = z;
                        nextWinId = w.id;
                    }
                }
            });

            if (nextWinId) {
                this.focusWindow(nextWinId);
            }
        }
    }

    setWindowTitle(id, newTitle) {
        const win = this.windows.get(id);
        if (win) {
            win.titleEl.textContent = newTitle;
            win.taskTab.querySelector(".taskbar-tab-title").textContent = newTitle;
        }
    }
}

const wm = new WindowManager();
