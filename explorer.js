// Windows 2000 Explorer & Desktop Manager

class DesktopManagerClass {
    constructor() {
        this.desktopEl = document.getElementById("desktop");
        this.desktopIconsContainer = document.getElementById("desktop-icons");
        this.selectionBox = document.getElementById("selection-box");

        // Working copy of Desktop VFS
        this.desktopItems = JSON.parse(JSON.stringify(INITIAL_VFS.desktop));
        this.recycleBinItems = [];

        this.selectedItemIds = new Set();
        this.contextTargetItem = null;

        this.init();
    }

    init() {
        this.renderDesktopIcons();
        this.setupMarqueeSelection();
        this.setupDesktopContextMenu();
    }

    renderDesktopIcons() {
        this.desktopIconsContainer.innerHTML = "";

        this.desktopItems.forEach((item) => {
            const iconEl = document.createElement("div");
            iconEl.className = "desktop-icon";
            iconEl.id = `desktop-item-${item.id}`;
            iconEl.style.left = `${item.x}px`;
            iconEl.style.top = `${item.y}px`;

            if (this.selectedItemIds.has(item.id)) {
                iconEl.classList.add("selected");
            }

            // Determine icon image
            let iconKey = item.icon;
            if (item.appType === "recycle-bin") {
                iconKey = this.recycleBinItems.length > 0 ? "recycle-bin-full" : "recycle-bin-empty";
            }

            iconEl.innerHTML = `
                <div class="icon-img">${getIconSvg(iconKey, 32, 32)}</div>
                <div class="icon-label" id="label-${item.id}">${this.escapeHtml(item.name)}</div>
            `;

            // Setup Icon Selection & Double Click
            iconEl.addEventListener("mousedown", (e) => {
                e.stopPropagation();
                if (e.button === 0) { // Left click
                    if (!e.ctrlKey && !this.selectedItemIds.has(item.id)) {
                        this.clearSelection();
                    }
                    this.selectItem(item.id);
                    this.setupIconDragging(item, iconEl, e);
                } else if (e.button === 2) { // Right click
                    if (!this.selectedItemIds.has(item.id)) {
                        this.clearSelection();
                        this.selectItem(item.id);
                    }
                    this.showIconContextMenu(item, e.clientX, e.clientY);
                }
            });

            iconEl.addEventListener("dblclick", (e) => {
                e.stopPropagation();
                this.openItem(item);
            });

            this.desktopIconsContainer.appendChild(iconEl);
        });
    }

    escapeHtml(str) {
        if (!str) return "";
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    selectItem(id) {
        this.selectedItemIds.add(id);
        const el = document.getElementById(`desktop-item-${id}`);
        if (el) el.classList.add("selected");
    }

    deselectItem(id) {
        this.selectedItemIds.delete(id);
        const el = document.getElementById(`desktop-item-${id}`);
        if (el) el.classList.remove("selected");
    }

    clearSelection() {
        this.selectedItemIds.clear();
        document.querySelectorAll(".desktop-icon.selected").forEach((el) => {
            el.classList.remove("selected");
        });
    }

    setupIconDragging(item, iconEl, startEvent) {
        let isDragging = false;
        const startX = startEvent.clientX;
        const startY = startEvent.clientY;
        const initLeft = item.x;
        const initTop = item.y;

        const onMouseMove = (e) => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            if (!isDragging && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
                isDragging = true;
                iconEl.style.zIndex = 50;
            }

            if (isDragging) {
                const deskRect = this.desktopEl.getBoundingClientRect();
                let newLeft = Math.max(0, Math.min(deskRect.width - 74, initLeft + dx));
                let newTop = Math.max(0, Math.min(deskRect.height - 74, initTop + dy));

                iconEl.style.left = `${newLeft}px`;
                iconEl.style.top = `${newTop}px`;
                item.x = newLeft;
                item.y = newTop;
            }
        };

        const onMouseUp = (e) => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

            if (isDragging) {
                iconEl.style.zIndex = 10;
                // Snap loosely to 10px grid
                item.x = Math.round(item.x / 10) * 10;
                item.y = Math.round(item.y / 10) * 10;
                iconEl.style.left = `${item.x}px`;
                iconEl.style.top = `${item.y}px`;

                // Check if dropped onto Recycle Bin
                const binItem = this.desktopItems.find(i => i.appType === "recycle-bin");
                if (binItem && binItem.id !== item.id && !item.readOnly) {
                    const binEl = document.getElementById(`desktop-item-${binItem.id}`);
                    if (binEl) {
                        const binRect = binEl.getBoundingClientRect();
                        if (e.clientX >= binRect.left && e.clientX <= binRect.right &&
                            e.clientY >= binRect.top && e.clientY <= binRect.bottom) {
                            this.deleteItem(item);
                        }
                    }
                }
            }
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }

    setupMarqueeSelection() {
        let isSelecting = false;
        let startX = 0;
        let startY = 0;

        this.desktopEl.addEventListener("mousedown", (e) => {
            // Only left-click on empty desktop
            if (e.button !== 0 || e.target !== this.desktopEl && e.target !== this.desktopIconsContainer) return;

            // Close start menu and context menus
            document.getElementById("start-menu").classList.remove("open");
            document.getElementById("start-button").classList.remove("active");
            document.querySelectorAll(".context-menu").forEach(m => m.style.display = "none");

            this.clearSelection();

            isSelecting = true;
            startX = e.clientX;
            startY = e.clientY;

            this.selectionBox.style.left = `${startX}px`;
            this.selectionBox.style.top = `${startY}px`;
            this.selectionBox.style.width = "0px";
            this.selectionBox.style.height = "0px";
            this.selectionBox.style.display = "block";
        });

        document.addEventListener("mousemove", (e) => {
            if (!isSelecting) return;

            const currentX = e.clientX;
            const currentY = e.clientY;

            const boxLeft = Math.min(startX, currentX);
            const boxTop = Math.min(startY, currentY);
            const boxWidth = Math.abs(currentX - startX);
            const boxHeight = Math.abs(currentY - startY);

            this.selectionBox.style.left = `${boxLeft}px`;
            this.selectionBox.style.top = `${boxTop}px`;
            this.selectionBox.style.width = `${boxWidth}px`;
            this.selectionBox.style.height = `${boxHeight}px`;

            // Hit test desktop icons
            const boxRect = { left: boxLeft, top: boxTop, right: boxLeft + boxWidth, bottom: boxTop + boxHeight };

            this.desktopItems.forEach((item) => {
                const iconEl = document.getElementById(`desktop-item-${item.id}`);
                if (!iconEl) return;
                const r = iconEl.getBoundingClientRect();

                const overlaps = !(r.right < boxRect.left || r.left > boxRect.right || r.bottom < boxRect.top || r.top > boxRect.bottom);
                if (overlaps) {
                    this.selectItem(item.id);
                } else {
                    this.deselectItem(item.id);
                }
            });
        });

        document.addEventListener("mouseup", () => {
            if (isSelecting) {
                isSelecting = false;
                this.selectionBox.style.display = "none";
            }
        });
    }

    setupDesktopContextMenu() {
        const desktopMenu = document.getElementById("context-menu-desktop");

        this.desktopEl.addEventListener("contextmenu", (e) => {
            // Only trigger if right-clicking background
            if (e.target === this.desktopEl || e.target === this.desktopIconsContainer) {
                e.preventDefault();
                // Close other menus
                document.querySelectorAll(".context-menu").forEach(m => m.style.display = "none");
                document.getElementById("start-menu").classList.remove("open");
                document.getElementById("start-button").classList.remove("active");

                // Position context menu
                let x = e.clientX;
                let y = e.clientY;
                const menuW = 160;
                const menuH = 150;

                if (x + menuW > window.innerWidth) x = window.innerWidth - menuW - 10;
                if (y + menuH > window.innerHeight) y = window.innerHeight - menuH - 10;

                desktopMenu.style.left = `${x}px`;
                desktopMenu.style.top = `${y}px`;
                desktopMenu.style.display = "flex";
                retroSound.playClick();
            }
        });

        // Hide menus when clicking outside
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".context-menu")) {
                desktopMenu.style.display = "none";
                document.getElementById("context-menu-icon").style.display = "none";
            }
        });
    }

    showIconContextMenu(item, clientX, clientY) {
        this.contextTargetItem = item;
        const iconMenu = document.getElementById("context-menu-icon");

        const renameBtn = document.getElementById("ctx-icon-rename");
        const deleteBtn = document.getElementById("ctx-icon-delete");

        if (item.readOnly) {
            renameBtn.classList.add("disabled");
            deleteBtn.classList.add("disabled");
        } else {
            renameBtn.classList.remove("disabled");
            deleteBtn.classList.remove("disabled");
        }

        let x = clientX;
        let y = clientY;
        const menuW = 150;
        const menuH = 130;

        if (x + menuW > window.innerWidth) x = window.innerWidth - menuW - 10;
        if (y + menuH > window.innerHeight) y = window.innerHeight - menuH - 10;

        iconMenu.style.left = `${x}px`;
        iconMenu.style.top = `${y}px`;
        iconMenu.style.display = "flex";
        retroSound.playClick();
    }

    openContextItem() {
        document.getElementById("context-menu-icon").style.display = "none";
        if (this.contextTargetItem) {
            this.openItem(this.contextTargetItem);
        }
    }

    renameContextItem() {
        document.getElementById("context-menu-icon").style.display = "none";
        if (this.contextTargetItem && !this.contextTargetItem.readOnly) {
            this.beginRename(this.contextTargetItem);
        }
    }

    deleteContextItem() {
        document.getElementById("context-menu-icon").style.display = "none";
        if (this.contextTargetItem) {
            this.deleteItem(this.contextTargetItem);
        }
    }

    propertiesContextItem() {
        document.getElementById("context-menu-icon").style.display = "none";
        if (this.contextTargetItem) {
            AppManager.openItemProperties(this.contextTargetItem);
        }
    }

    beginRename(item) {
        const labelEl = document.getElementById(`label-${item.id}`);
        if (!labelEl) return;

        const currentName = item.name;
        labelEl.innerHTML = `<input type="text" class="icon-edit-input" value="${this.escapeHtml(currentName)}">`;
        const input = labelEl.querySelector("input");
        input.focus();
        input.select();

        let committed = false;

        const commit = () => {
            if (committed) return;
            committed = true;
            const newName = input.value.trim();
            if (newName && newName !== currentName) {
                if (item.type === "folder" && item.targetPath) {
                    const oldPath = item.targetPath;
                    const newPath = `C:\\Desktop\\${newName}`;
                    if (INITIAL_VFS.folders[oldPath]) {
                        INITIAL_VFS.folders[newPath] = INITIAL_VFS.folders[oldPath];
                        delete INITIAL_VFS.folders[oldPath];
                    }
                    item.targetPath = newPath;
                }
                item.name = newName;
            }
            this.renderDesktopIcons();
        };

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                commit();
            } else if (e.key === "Escape") {
                committed = true;
                this.renderDesktopIcons();
            }
        });

        input.addEventListener("blur", commit);
    }

    deleteItem(item) {
        if (item.readOnly) {
            retroSound.playChord();
            alert(`The '${item.name}' is a system object and cannot be deleted.`);
            return;
        }

        retroSound.playDing();
        // Move to Recycle Bin
        this.recycleBinItems.push(item);
        this.desktopItems = this.desktopItems.filter(i => i.id !== item.id);
        this.selectedItemIds.delete(item.id);
        this.renderDesktopIcons();
    }

    openItem(item) {
        retroSound.playClick();
        if (item.appType === "my-computer") {
            AppManager.openMyComputer();
        } else if (item.appType === "explorer") {
            ExplorerApp.open(item.targetPath || "C:\\");
        } else if (item.appType === "ie") {
            AppManager.openInternetExplorer();
        } else if (item.appType === "resume-viewer") {
            AppManager.openResumeViewer();
        } else if (item.appType === "notepad") {
            AppManager.openNotepad(item.name, item.content);
        } else if (item.appType === "cmd") {
            AppManager.openCmd();
        } else if (item.appType === "minesweeper") {
            AppManager.openMinesweeper();
        } else if (item.appType === "recycle-bin") {
            AppManager.openRecycleBin();
        }
    }

    refresh() {
        document.getElementById("context-menu-desktop").style.display = "none";
        retroSound.playClick();

        // Brief repaint flicker animation
        this.desktopIconsContainer.style.opacity = "0.7";
        setTimeout(() => {
            this.desktopIconsContainer.style.opacity = "1";
            this.clearSelection();
            this.renderDesktopIcons();
        }, 80);
    }

    arrangeIcons(by = "name") {
        document.getElementById("context-menu-desktop").style.display = "none";
        retroSound.playClick();

        if (by === "name") {
            this.desktopItems.sort((a, b) => a.name.localeCompare(b.name));
        } else if (by === "type") {
            this.desktopItems.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
        }

        const startX = 20;
        const startY = 20;
        const cellH = 84;
        const cellW = 84;
        const deskH = this.desktopEl.clientHeight - 40;
        const rowsPerCol = Math.max(1, Math.floor(deskH / cellH));

        this.desktopItems.forEach((item, idx) => {
            const col = Math.floor(idx / rowsPerCol);
            const row = idx % rowsPerCol;
            item.x = startX + col * cellW;
            item.y = startY + row * cellH;
        });

        this.renderDesktopIcons();
    }

    createNewFolder() {
        document.getElementById("context-menu-desktop").style.display = "none";
        retroSound.playClick();

        // Find unique name
        let folderName = "New Folder";
        let counter = 2;
        while (this.desktopItems.some(i => i.name === folderName)) {
            folderName = `New Folder (${counter++})`;
        }

        // Place near mouse or next free slot
        const id = `folder_${Date.now()}`;
        const targetPath = `C:\\Desktop\\${folderName}`;
        INITIAL_VFS.folders[targetPath] = [];

        const newFolder = {
            id,
            name: folderName,
            type: "folder",
            appType: "explorer",
            targetPath: targetPath,
            icon: "folder",
            x: 188,
            y: 20,
            readOnly: false
        };

        this.desktopItems.push(newFolder);
        this.clearSelection();
        this.selectItem(id);
        this.renderDesktopIcons();

        // Auto start inline renaming
        setTimeout(() => {
            this.beginRename(newFolder);
        }, 100);
    }

    createNewTextFile() {
        document.getElementById("context-menu-desktop").style.display = "none";
        retroSound.playClick();

        let fileName = "New Text Document.txt";
        let counter = 2;
        while (this.desktopItems.some(i => i.name === fileName)) {
            fileName = `New Text Document (${counter++}).txt`;
        }

        const id = `file_${Date.now()}`;
        const newFile = {
            id,
            name: fileName,
            type: "file",
            appType: "notepad",
            icon: "notepad-file",
            x: 188,
            y: 104,
            readOnly: false,
            content: ""
        };

        this.desktopItems.push(newFile);
        this.clearSelection();
        this.selectItem(id);
        this.renderDesktopIcons();

        setTimeout(() => {
            this.beginRename(newFile);
        }, 100);
    }
}

// Windows Explorer (My Computer & Folder Browser) Application
const ExplorerApp = {
    history: [],
    historyIndex: -1,

    open(initialPath = "My Computer") {
        const winId = "win_explorer";

        // Check if existing window
        if (wm.windows.has(winId)) {
            wm.focusWindow(winId);
            this.navigateTo(winId, initialPath);
            return;
        }

        const toolbar = document.createElement("div");
        toolbar.className = "win-toolbar";
        toolbar.innerHTML = `
            <button class="win-tool-btn" id="exp-btn-back"><span style="font-size:13px;">&#9664;</span> Back</button>
            <button class="win-tool-btn" id="exp-btn-forward"><span style="font-size:13px;">&#9654;</span></button>
            <button class="win-tool-btn" id="exp-btn-up"><span style="font-weight:bold;">&#8679;</span> Up</button>
            <div class="win-toolbar-separator"></div>
            <button class="win-tool-btn" id="exp-btn-search">&#128269; Search</button>
            <button class="win-tool-btn" id="exp-btn-folders">&#128193; Folders</button>
            <div class="win-toolbar-separator"></div>
            <button class="win-tool-btn" id="exp-btn-refresh">&#8635; Refresh</button>
        `;

        const addressbar = document.createElement("div");
        addressbar.className = "win-addressbar";
        addressbar.innerHTML = `
            <span class="win-address-label">Address</span>
            <div class="win-address-input-wrapper">
                <div class="win-address-icon" id="exp-addr-ico"></div>
                <input type="text" class="win-address-input" id="exp-addr-input" value="${initialPath}">
            </div>
            <button class="win-button win-go-btn" id="exp-btn-go">Go</button>
        `;

        const statusbar = document.createElement("div");
        statusbar.className = "win-statusbar";
        statusbar.innerHTML = `
            <div class="win-status-pane grow" id="exp-status-text">Ready</div>
            <div class="win-status-pane" id="exp-status-icon">${getIconSvg("my-computer", 14, 14)} My Computer</div>
        `;

        const bodyContent = document.createElement("div");
        bodyContent.className = "explorer-container";
        bodyContent.innerHTML = `
            <div class="explorer-sidebar" id="exp-sidebar"></div>
            <div class="explorer-main" id="exp-main-grid"></div>
        `;

        const win = wm.createWindow({
            id: winId,
            title: initialPath,
            icon: "my-computer",
            width: 640,
            height: 440,
            toolbar,
            addressbar,
            statusbar,
            bodyContent,
            onInit: (w) => {
                const addrInput = w.el.querySelector("#exp-addr-input");
                const goBtn = w.el.querySelector("#exp-btn-go");
                const backBtn = w.el.querySelector("#exp-btn-back");
                const forwardBtn = w.el.querySelector("#exp-btn-forward");
                const upBtn = w.el.querySelector("#exp-btn-up");
                const refreshBtn = w.el.querySelector("#exp-btn-refresh");

                goBtn.addEventListener("click", () => this.navigateTo(winId, addrInput.value.trim()));
                addrInput.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") this.navigateTo(winId, addrInput.value.trim());
                });

                backBtn.addEventListener("click", () => this.goBack(winId));
                forwardBtn.addEventListener("click", () => this.goForward(winId));
                upBtn.addEventListener("click", () => this.goUp(winId));
                refreshBtn.addEventListener("click", () => this.refresh(winId));

                this.navigateTo(winId, initialPath);
            }
        });
    },

    navigateTo(winId, path) {
        const win = wm.windows.get(winId);
        if (!win) return;

        retroSound.playClick();

        const addrInput = win.el.querySelector("#exp-addr-input");
        const addrIco = win.el.querySelector("#exp-addr-ico");
        const sidebar = win.el.querySelector("#exp-sidebar");
        const mainGrid = win.el.querySelector("#exp-main-grid");
        const statusText = win.el.querySelector("#exp-status-text");

        addrInput.value = path;
        wm.setWindowTitle(winId, path);

        if (path === "My Computer") {
            addrIco.innerHTML = getIconSvg("my-computer", 14, 14);
            this.renderMyComputer(sidebar, mainGrid, statusText, winId);
        } else if (INITIAL_VFS.drives[path]) {
            addrIco.innerHTML = getIconSvg(INITIAL_VFS.drives[path].icon, 14, 14);
            this.renderDrive(path, sidebar, mainGrid, statusText, winId);
        } else if (INITIAL_VFS.folders[path]) {
            addrIco.innerHTML = getIconSvg("folder", 14, 14);
            this.renderFolder(path, sidebar, mainGrid, statusText, winId);
        } else {
            // Folder not found or empty
            addrIco.innerHTML = getIconSvg("folder", 14, 14);
            mainGrid.innerHTML = `<div style="padding: 20px; color: #808080;">This folder is empty.</div>`;
            sidebar.innerHTML = `
                <div class="explorer-sidebar-title">${DesktopManager.escapeHtml(path)}</div>
                <div class="explorer-sidebar-desc">0 objects inside.</div>
            `;
            statusText.textContent = "0 objects";
        }
    },

    renderMyComputer(sidebar, mainGrid, statusText, winId) {
        sidebar.innerHTML = `
            <div class="explorer-sidebar-header">
                ${getIconSvg("my-computer", 32, 32)}
                <div class="explorer-sidebar-title">My Computer</div>
            </div>
            <div class="explorer-sidebar-desc">
                Displays the contents of your computer and portfolio storage devices.
            </div>
            <div class="explorer-sidebar-divider"></div>
            <div class="explorer-sidebar-stats">
                <span class="explorer-sidebar-stat-label">Operating System:</span>
                <span class="explorer-sidebar-stat-value">Windows 2000 Pro</span>
                <span class="explorer-sidebar-stat-label">Engineer:</span>
                <span class="explorer-sidebar-stat-value">${PORTFOLIO_DATA.personal.name}</span>
                <span class="explorer-sidebar-stat-label">Total Storage:</span>
                <span class="explorer-sidebar-stat-value">60.0 GB</span>
            </div>
        `;

        mainGrid.innerHTML = "";

        const driveEntries = [
            { id: "A:", name: "3½ Floppy (A:)", icon: "floppy", type: "drive", desc: "Removable Storage" },
            { id: "C:", name: "Local Disk (C:)", icon: "drive-c", type: "drive", desc: "Portfolio & System Drive" },
            { id: "D:", name: "Projects & Demos (D:)", icon: "drive-d", type: "drive", desc: "Software & Web Projects" },
            { id: "Control Panel", name: "Control Panel", icon: "settings", type: "special", desc: "Display & Settings" }
        ];

        driveEntries.forEach((item) => {
            const el = document.createElement("div");
            el.className = "explorer-item";
            el.innerHTML = `
                <div class="explorer-item-icon">${getIconSvg(item.icon, 32, 32)}</div>
                <div class="explorer-item-name">${item.name}</div>
            `;

            el.addEventListener("click", () => {
                mainGrid.querySelectorAll(".explorer-item").forEach(i => i.classList.remove("selected"));
                el.classList.add("selected");
                statusText.textContent = `${item.name} - ${item.desc}`;
            });

            el.addEventListener("dblclick", () => {
                if (item.id === "A:") {
                    retroSound.playChord();
                    alert("A:\\ is not accessible.\n\nPlease insert a disk into drive A:.");
                } else if (item.id === "Control Panel") {
                    AppManager.openProperties();
                } else {
                    this.navigateTo(winId, item.id);
                }
            });

            mainGrid.appendChild(el);
        });

        statusText.textContent = `${driveEntries.length} objects`;
    },

    renderDrive(driveKey, sidebar, mainGrid, statusText, winId) {
        const drive = INITIAL_VFS.drives[driveKey];

        sidebar.innerHTML = `
            <div class="explorer-sidebar-header">
                ${getIconSvg(drive.icon, 32, 32)}
                <div class="explorer-sidebar-title">${drive.name}</div>
            </div>
            <div class="explorer-sidebar-desc">
                Capacity: <strong>${drive.totalSpace}</strong><br>
                Free Space: <strong>${drive.freeSpace}</strong>
            </div>
            <div class="explorer-sidebar-divider"></div>
            <div class="explorer-sidebar-stats">
                <span class="explorer-sidebar-stat-label">File System:</span>
                <span class="explorer-sidebar-stat-value">NTFS</span>
                <span class="explorer-sidebar-stat-label">Drive Label:</span>
                <span class="explorer-sidebar-stat-value">${drive.label}</span>
            </div>
        `;

        mainGrid.innerHTML = "";

        drive.items.forEach((item) => {
            const el = document.createElement("div");
            el.className = "explorer-item";
            el.innerHTML = `
                <div class="explorer-item-icon">${getIconSvg(item.icon, 32, 32)}</div>
                <div class="explorer-item-name">${item.name}</div>
            `;

            el.addEventListener("click", () => {
                mainGrid.querySelectorAll(".explorer-item").forEach(i => i.classList.remove("selected"));
                el.classList.add("selected");
                statusText.textContent = `${item.name} (${item.size || "Folder"})`;
            });

            el.addEventListener("dblclick", () => {
                if (item.type === "folder") {
                    this.navigateTo(winId, item.targetPath);
                } else if (item.type === "file") {
                    AppManager.openNotepad(item.name, item.content);
                } else if (item.type === "app") {
                    if (item.appType === "cmd") AppManager.openCmd();
                    else if (item.appType === "notepad") AppManager.openNotepad();
                    else if (item.appType === "minesweeper") AppManager.openMinesweeper();
                    else if (item.appType === "resume-viewer") AppManager.openResumeViewer();
                    else if (item.appType === "ie") AppManager.openInternetExplorer();
                }
            });

            mainGrid.appendChild(el);
        });

        statusText.textContent = `${drive.items.length} objects (Free space: ${drive.freeSpace})`;
    },

    renderFolder(folderPath, sidebar, mainGrid, statusText, winId) {
        const items = INITIAL_VFS.folders[folderPath] || [];

        const folderName = folderPath.split("\\").pop();

        sidebar.innerHTML = `
            <div class="explorer-sidebar-header">
                ${getIconSvg("folder", 32, 32)}
                <div class="explorer-sidebar-title">${DesktopManager.escapeHtml(folderName)}</div>
            </div>
            <div class="explorer-sidebar-desc">
                Location: <strong>${folderPath}</strong>
            </div>
            <div class="explorer-sidebar-divider"></div>
            <div class="explorer-sidebar-stats">
                <span class="explorer-sidebar-stat-label">Objects:</span>
                <span class="explorer-sidebar-stat-value">${items.length} items</span>
            </div>
        `;

        mainGrid.innerHTML = "";

        items.forEach((item) => {
            const el = document.createElement("div");
            el.className = "explorer-item";
            el.innerHTML = `
                <div class="explorer-item-icon">${getIconSvg(item.icon, 32, 32)}</div>
                <div class="explorer-item-name">${item.name}</div>
            `;

            el.addEventListener("click", () => {
                mainGrid.querySelectorAll(".explorer-item").forEach(i => i.classList.remove("selected"));
                el.classList.add("selected");
                statusText.textContent = `${item.name} (${item.size || "File"})`;
            });

            el.addEventListener("dblclick", () => {
                if (item.type === "folder") {
                    this.navigateTo(winId, item.targetPath);
                } else if (item.type === "file") {
                    AppManager.openNotepad(item.name, item.content);
                } else if (item.type === "app") {
                    if (item.appType === "cmd") AppManager.openCmd();
                    else if (item.appType === "notepad") AppManager.openNotepad();
                    else if (item.appType === "minesweeper") AppManager.openMinesweeper();
                    else if (item.appType === "resume-viewer") AppManager.openResumeViewer();
                    else if (item.appType === "ie") AppManager.openInternetExplorer();
                }
            });

            mainGrid.appendChild(el);
        });

        statusText.textContent = `${items.length} objects`;
    },

    goUp(winId) {
        const win = wm.windows.get(winId);
        if (!win) return;
        const currentPath = win.el.querySelector("#exp-addr-input").value;

        if (currentPath === "My Computer") return;

        if (currentPath === "C:" || currentPath === "D:" || currentPath === "A:") {
            this.navigateTo(winId, "My Computer");
        } else if (currentPath.includes("\\")) {
            const parts = currentPath.split("\\");
            parts.pop();
            const parent = parts.length === 1 ? parts[0] : parts.join("\\");
            this.navigateTo(winId, parent || "My Computer");
        } else {
            this.navigateTo(winId, "My Computer");
        }
    },

    refresh(winId) {
        const win = wm.windows.get(winId);
        if (!win) return;
        const currentPath = win.el.querySelector("#exp-addr-input").value;
        this.navigateTo(winId, currentPath);
    }
};

let DesktopManager;
