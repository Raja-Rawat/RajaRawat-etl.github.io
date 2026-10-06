// Windows 2000 Built-In Applications Suite

const AppManager = {
    // ----------------------------------------------------
    // 1. My Computer
    // ----------------------------------------------------
    openMyComputer() {
        ExplorerApp.open("My Computer");
    },

    // ----------------------------------------------------
    // Dedicated Resume Viewer (A4 Interactive Document)
    // ----------------------------------------------------
    openResumeViewer() {
        const winId = "win_resume_viewer";
        if (wm.windows.has(winId)) {
            wm.focusWindow(winId);
            return;
        }

        const toolbar = document.createElement("div");
        toolbar.className = "win-toolbar";
        toolbar.innerHTML = `
            <button class="win-tool-btn" id="resume-print-btn">&#128438; Print / Save as PDF</button>
            <button class="win-tool-btn" id="resume-open-ie">&#127760; Open in Internet Explorer</button>
            <button class="win-tool-btn" id="resume-open-txt">&#128196; View Plain Text</button>
        `;

        const bodyContent = document.createElement("div");
        bodyContent.style.width = "100%";
        bodyContent.style.height = "100%";
        bodyContent.style.overflow = "hidden";
        bodyContent.style.background = "#f1f5f9";
        bodyContent.innerHTML = `
            <iframe id="resume-iframe" src="resume.html" style="width:100%; height:100%; border:none; display:block;"></iframe>
        `;

        const statusbar = document.createElement("div");
        statusbar.className = "win-statusbar";
        statusbar.innerHTML = `
            <div class="win-status-pane grow">Document: Raja Rawat - Informatica Administrator Resume</div>
            <div class="win-status-pane">A4 Portrait</div>
            <div class="win-status-pane">100%</div>
        `;

        const win = wm.createWindow({
            id: winId,
            title: "Raja Rawat - Resume [Printable A4]",
            icon: "ie",
            width: 820,
            height: 580,
            toolbar,
            bodyContent,
            statusbar,
            onInit: (w) => {
                const iframe = w.el.querySelector("#resume-iframe");
                w.el.querySelector("#resume-print-btn").addEventListener("click", () => {
                    retroSound.playClick();
                    if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.print();
                    } else {
                        window.print();
                    }
                });

                w.el.querySelector("#resume-open-ie").addEventListener("click", () => {
                    this.openInternetExplorer("https://rajarawat.dev/resume");
                    this.switchIeTab("resume");
                });

                w.el.querySelector("#resume-open-txt").addEventListener("click", () => {
                    const txtItem = DesktopManager.desktopItems.find(i => i.id === "resume-txt");
                    this.openNotepad("Resume.txt", txtItem ? txtItem.content : "");
                });
            }
        });
    },

    // ----------------------------------------------------
    // 2. Internet Explorer 5.0 (Portfolio Portal)
    // ----------------------------------------------------
    openInternetExplorer(startUrl = "https://rajarawat.dev/portfolio") {
        const winId = "win_ie";
        if (wm.windows.has(winId)) {
            wm.focusWindow(winId);
            return;
        }

        const menubar = document.createElement("div");
        menubar.className = "win-menubar";
        menubar.innerHTML = `
            <div class="win-menu-item"><u>F</u>ile</div>
            <div class="win-menu-item"><u>E</u>dit</div>
            <div class="win-menu-item"><u>V</u>iew</div>
            <div class="win-menu-item">F<u>a</u>vorites</div>
            <div class="win-menu-item"><u>T</u>ools</div>
            <div class="win-menu-item"><u>H</u>elp</div>
        `;

        const toolbar = document.createElement("div");
        toolbar.className = "win-toolbar";
        toolbar.innerHTML = `
            <button class="win-tool-btn" id="ie-back"><span style="font-size:13px;">&#9664;</span> Back</button>
            <button class="win-tool-btn" id="ie-forward"><span style="font-size:13px;">&#9654;</span></button>
            <button class="win-tool-btn" id="ie-stop">&#9632; Stop</button>
            <button class="win-tool-btn" id="ie-refresh">&#8635; Refresh</button>
            <button class="win-tool-btn" id="ie-home">&#8962; Home</button>
            <div class="win-toolbar-separator"></div>
            <button class="win-tool-btn" id="ie-search">&#128269; Search</button>
            <button class="win-tool-btn" id="ie-favorites">&#9733; Favorites</button>
        `;

        const addressbar = document.createElement("div");
        addressbar.className = "win-addressbar";
        addressbar.innerHTML = `
            <span class="win-address-label">Address</span>
            <div class="win-address-input-wrapper">
                <div class="win-address-icon">${getIconSvg("ie", 14, 14)}</div>
                <input type="text" class="win-address-input" id="ie-url-input" value="${startUrl}">
            </div>
            <button class="win-button win-go-btn" id="ie-go-btn">Go</button>
        `;

        const bodyContent = document.createElement("div");
        bodyContent.className = "ie-content";

        const statusbar = document.createElement("div");
        statusbar.className = "win-statusbar";
        statusbar.innerHTML = `
            <div class="win-status-pane grow" id="ie-status">Done</div>
            <div class="win-status-pane">Internet</div>
            <div class="win-status-pane">${getIconSvg("ie", 14, 14)}</div>
        `;

        const initialTab = startUrl.includes("resume") ? "resume" : "about";

        const win = wm.createWindow({
            id: winId,
            title: `Microsoft Internet Explorer - ${PORTFOLIO_DATA.personal.name} Portfolio`,
            icon: "ie",
            width: 780,
            height: 540,
            menubar,
            toolbar,
            addressbar,
            bodyContent,
            statusbar,
            onInit: (w) => {
                this.renderIePage(bodyContent, initialTab);

                const urlInput = w.el.querySelector("#ie-url-input");
                const goBtn = w.el.querySelector("#ie-go-btn");
                const refreshBtn = w.el.querySelector("#ie-refresh");
                const homeBtn = w.el.querySelector("#ie-home");

                goBtn.addEventListener("click", () => {
                    retroSound.playClick();
                    const val = urlInput.value.toLowerCase();
                    if (val.includes("resume")) this.renderIePage(bodyContent, "resume");
                    else if (val.includes("project")) this.renderIePage(bodyContent, "projects");
                    else if (val.includes("skill")) this.renderIePage(bodyContent, "skills");
                    else if (val.includes("exp")) this.renderIePage(bodyContent, "experience");
                    else if (val.includes("cert")) this.renderIePage(bodyContent, "certifications");
                    else if (val.includes("contact")) this.renderIePage(bodyContent, "contact");
                    else this.renderIePage(bodyContent, "about");
                });

                refreshBtn.addEventListener("click", () => {
                    retroSound.playClick();
                    this.renderIePage(bodyContent, "about");
                });

                homeBtn.addEventListener("click", () => {
                    urlInput.value = "https://rajarawat.dev/portfolio";
                    this.renderIePage(bodyContent, "about");
                });
            }
        });
    },

    renderIePage(container, activeTab = "about") {
        container.innerHTML = `
            <!-- Top Retro IE Portal Header -->
            <div class="ie-portal-header">
                <div class="ie-portal-title">
                    ${getIconSvg("win-flag", 24, 24)}
                    <span>${PORTFOLIO_DATA.personal.name}</span>
                </div>
                <div class="ie-portal-subtitle">${PORTFOLIO_DATA.personal.title} &bull; ${PORTFOLIO_DATA.personal.location}</div>
            </div>

            <!-- Tab Navigation -->
            <div class="ie-nav-tabs">
                <div class="ie-tab-btn ${activeTab === 'about' ? 'active' : ''}" onclick="AppManager.switchIeTab('about')">Summary</div>
                <div class="ie-tab-btn ${activeTab === 'resume' ? 'active' : ''}" style="color:#000080; font-weight:bold;" onclick="AppManager.switchIeTab('resume')">&#128196; A4 Resume (Printable)</div>
                <div class="ie-tab-btn ${activeTab === 'projects' ? 'active' : ''}" onclick="AppManager.switchIeTab('projects')">Enterprise Projects</div>
                <div class="ie-tab-btn ${activeTab === 'skills' ? 'active' : ''}" onclick="AppManager.switchIeTab('skills')">Skills Matrix</div>
                <div class="ie-tab-btn ${activeTab === 'experience' ? 'active' : ''}" onclick="AppManager.switchIeTab('experience')">Work History</div>
                <div class="ie-tab-btn ${activeTab === 'certifications' ? 'active' : ''}" onclick="AppManager.switchIeTab('certifications')">Certifications</div>
                <div class="ie-tab-btn ${activeTab === 'contact' ? 'active' : ''}" onclick="AppManager.switchIeTab('contact')">Contact</div>
            </div>

            <!-- Page Body -->
            <div class="ie-page-body" id="ie-tab-content">
                ${this.getIeTabHtml(activeTab)}
            </div>
        `;
    },

    switchIeTab(tabName) {
        retroSound.playClick();
        const ieWin = wm.windows.get("win_ie");
        if (!ieWin) return;
        const container = ieWin.el.querySelector(".ie-content");
        this.renderIePage(container, tabName);

        const urlInput = ieWin.el.querySelector("#ie-url-input");
        if (urlInput) {
            urlInput.value = `https://rajarawat.dev/${tabName}`;
        }
    },

    getIeTabHtml(tabName) {
        if (tabName === "resume") {
            return `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #e0f2fe; padding: 8px 12px; border: 1px solid #7dd3fc; margin-bottom: 8px; border-radius: 4px;">
                    <div>
                        <strong style="color: #0369a1; font-size: 13px;">Official 1-Page A4 Resume</strong> &bull;
                        <span style="color: #475569; font-size: 11px;">Optimized for Enterprise ATS & High-Resolution Print</span>
                    </div>
                    <div style="display: flex; gap: 6px;">
                        <button class="win-button" style="font-weight: bold;" onclick="const f = document.getElementById('ie-resume-frame'); if (f && f.contentWindow) f.contentWindow.print(); else window.print();">&#128438; Print / Save as PDF</button>
                        <a href="resume.html" target="_blank" class="retro-link-btn">&#8599; Open Full Window</a>
                    </div>
                </div>
                <div style="width: 100%; height: 580px; border: 2px solid; border-color: #808080 #ffffff #ffffff #808080; background: #f1f5f9;">
                    <iframe id="ie-resume-frame" src="resume.html" style="width: 100%; height: 100%; border: none;"></iframe>
                </div>
            `;
        }

        if (tabName === "about") {
            return `
                <div class="ie-section-heading">Professional Summary</div>
                <p style="font-size: 13px; line-height: 1.6; margin-bottom: 14px;">
                    ${PORTFOLIO_DATA.personal.bio.replace(/\n\n/g, "</p><p style='font-size: 13px; line-height: 1.6; margin-bottom: 14px;'>")}
                </p>

                <div style="margin-top: 14px; background: #eef3f8; border: 1px solid #99b4d1; padding: 12px; border-radius: 4px;">
                    <div style="font-weight: bold; color: #003366; margin-bottom: 6px;">&#128161; Quick Navigation & Highlights:</div>
                    <ul style="margin-left: 20px; font-size: 12px; line-height: 1.6;">
                        <li><strong><a href="#" onclick="AppManager.switchIeTab('resume')">A4 Resume Tab</a>:</strong> View or Print the official formatted resume with single-click PDF export.</li>
                        <li><strong>Desktop Shortcut:</strong> Double-click <code>Printable Resume.html</code> on the desktop anytime to open the high-fidelity A4 document viewer.</li>
                        <li><strong>My Computer:</strong> Explore <code>Local Disk (C:)</code> for system docs and <code>Work & Projects (D:)</code> for enterprise automation specs.</li>
                        <li><strong>Command Prompt:</strong> Run <code>skills</code>, <code>projects</code>, <code>whoami</code>, or <code>matrix</code> inside <code>cmd.exe</code>!</li>
                    </ul>
                </div>
            `;
        }

        if (tabName === "projects") {
            return `
                <div class="ie-section-heading">Key Enterprise Projects</div>
                <div class="project-cards-grid">
                    ${PORTFOLIO_DATA.projects.map(p => `
                        <div class="project-retro-card">
                            <div class="project-card-header">
                                <span class="project-card-title">${p.title}</span>
                                <span class="project-card-category">${p.category}</span>
                            </div>
                            <div class="project-card-summary">${p.summary}</div>
                            <div class="project-card-tech">
                                ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}
                            </div>
                            <div class="project-card-actions">
                                <a href="${PORTFOLIO_DATA.personal.linkedin}" target="_blank" class="retro-link-btn">&#128190; View Experience</a>
                                <button class="win-button" style="min-width: 60px; height: 20px; font-size: 10px;" onclick="AppManager.viewProjectDetails('${p.id}')">&#9658; Deep Dive</button>
                            </div>
                        </div>
                    `).join("")}
                </div>
            `;
        }

        if (tabName === "skills") {
            return `
                <div class="ie-section-heading">Technical Skills & Enterprise Stack</div>
                <table class="skills-retro-table">
                    <tr>
                        <th style="width: 28%;">Domain</th>
                        <th>Technologies & Capabilities</th>
                    </tr>
                    <tr>
                        <td><strong>Informatica & Cloud</strong></td>
                        <td>${PORTFOLIO_DATA.skills.informatica.join(", ")}</td>
                    </tr>
                    <tr>
                        <td><strong>Automation & DevOps</strong></td>
                        <td>${PORTFOLIO_DATA.skills.automation.join(", ")}</td>
                    </tr>
                    <tr>
                        <td><strong>Platforms & Cloud</strong></td>
                        <td>${PORTFOLIO_DATA.skills.platforms.join(", ")}</td>
                    </tr>
                    <tr>
                        <td><strong>Databases & SQL</strong></td>
                        <td>${PORTFOLIO_DATA.skills.databases.join(", ")}</td>
                    </tr>
                    <tr>
                        <td><strong>Governance & High Availability</strong></td>
                        <td>${PORTFOLIO_DATA.skills.governance.join(", ")}</td>
                    </tr>
                    <tr>
                        <td><strong>AI & Developer Productivity</strong></td>
                        <td>${PORTFOLIO_DATA.skills.ai_tools.join(", ")}</td>
                    </tr>
                </table>
            `;
        }

        if (tabName === "experience") {
            return `
                <div class="ie-section-heading">Work Experience Timeline</div>
                ${PORTFOLIO_DATA.experience.map(exp => `
                    <div style="margin-bottom: 16px; border-left: 3px solid #003366; padding-left: 12px;">
                        <div style="font-size: 14px; font-weight: bold; color: #003366;">${exp.role} &bull; <span style="color:#404040;">${exp.company}</span></div>
                        <div style="font-size: 11px; color: #666666; margin-bottom: 4px;">${exp.period}</div>
                        <div style="font-size: 12px; line-height: 1.5;">${exp.description}</div>
                    </div>
                `).join("")}

                <div class="ie-section-heading" style="margin-top: 24px;">Education</div>
                <div style="border-left: 3px solid #003366; padding-left: 12px;">
                    <div style="font-size: 13px; font-weight: bold; color: #003366;">${PORTFOLIO_DATA.education.degree}</div>
                    <div style="font-size: 11px; color: #666666; margin-bottom: 2px;">${PORTFOLIO_DATA.education.institution} &bull; ${PORTFOLIO_DATA.education.period}</div>
                    <div style="font-size: 12px;"><strong>${PORTFOLIO_DATA.education.gpa}</strong> &bull; ${PORTFOLIO_DATA.education.specialization}</div>
                </div>
            `;
        }

        if (tabName === "certifications") {
            return `
                <div class="ie-section-heading">Official Certifications & Credentials</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
                    ${PORTFOLIO_DATA.certifications.map(c => `
                        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 10px; display: flex; align-items: center; gap: 8px; border-radius: 4px; box-shadow: 1px 1px 3px rgba(0,0,0,0.05);">
                            <span style="font-size: 16px; color: #0284c7;">&#10003;</span>
                            <span style="font-size: 12px; font-weight: bold; color: #0f172a;">${c}</span>
                        </div>
                    `).join("")}
                </div>
            `;
        }

        if (tabName === "contact") {
            return `
                <div class="ie-section-heading">Get in Touch</div>
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 260px;">
                        <p style="font-size: 12px; margin-bottom: 12px;">
                            Interested in discussing Informatica platform administration, cloud modernization (CDIPC / IICS), automation architectures, or hiring for a senior engineering role? Feel free to reach out directly:
                        </p>
                        <div style="font-size: 12px; line-height: 2.0;">
                            <strong>Location:</strong> ${PORTFOLIO_DATA.personal.location}<br>
                            <strong>Phone:</strong> <a href="tel:${PORTFOLIO_DATA.personal.phone}">${PORTFOLIO_DATA.personal.phone}</a><br>
                            <strong>Email:</strong> <a href="mailto:${PORTFOLIO_DATA.personal.email}">${PORTFOLIO_DATA.personal.email}</a><br>
                            <strong>LinkedIn:</strong> <a href="${PORTFOLIO_DATA.personal.linkedin}" target="_blank">linkedin.com/in/raja-rawat-etl</a><br>
                            <strong>Availability:</strong> Open to Senior Informatica / Cloud Integration Roles
                        </div>
                    </div>
                    <div style="flex: 1; min-width: 280px; background: #ece9d8; padding: 12px; border: 2px solid; border-color: #ffffff #808080 #808080 #ffffff;">
                        <div style="font-weight: bold; margin-bottom: 8px;">Leave a Message</div>
                        <form onsubmit="AppManager.handleContactSubmit(event)">
                            <div class="retro-form-group">
                                <label class="retro-form-label">Your Name:</label>
                                <input type="text" id="contact-name" class="retro-input" required placeholder="Recruiter / Manager Name">
                            </div>
                            <div class="retro-form-group">
                                <label class="retro-form-label">Email Address:</label>
                                <input type="email" id="contact-email" class="retro-input" required placeholder="contact@company.com">
                            </div>
                            <div class="retro-form-group">
                                <label class="retro-form-label">Message:</label>
                                <textarea id="contact-msg" class="retro-textarea" required placeholder="Hi Raja, we have an exciting Informatica Administrator opportunity..."></textarea>
                            </div>
                            <button type="submit" class="win-button" style="width: 100%;">Send Message</button>
                        </form>
                    </div>
                </div>
            `;
        }
        return "";
    },

    viewProjectDetails(projId) {
        retroSound.playClick();
        const project = PORTFOLIO_DATA.projects.find(p => p.id === projId);
        if (!project) return;

        this.openNotepad(`${project.title} - Specs.txt`, `=====================================================
${project.title.toUpperCase()}
Category: ${project.category}
=====================================================
TECH STACK:
${project.tech.join(" | ")}

SUMMARY:
${project.summary}

DEEP DIVE:
${project.details}

RESOURCES:
Repository: ${project.link}
Live Demo:  ${project.demo}`);
    },

    handleContactSubmit(e) {
        e.preventDefault();
        retroSound.playDing();
        alert("Thank you! Your message has been dispatched successfully into the portfolio inbox.");
        e.target.reset();
    },

    // ----------------------------------------------------
    // 3. Notepad
    // ----------------------------------------------------
    openNotepad(fileName = "Untitled.txt", content = "") {
        const winId = `win_notepad_${Date.now()}`;

        const menubar = document.createElement("div");
        menubar.className = "win-menubar";
        menubar.innerHTML = `
            <div class="win-menu-item" id="np-file-menu">
                <u>F</u>ile
                <div class="start-submenu" style="top: 18px; left: 0;">
                    <div class="start-item" id="np-act-save"><span><u>S</u>ave</span></div>
                    <div class="start-item" id="np-act-saveas"><span>Save <u>A</u>s...</span></div>
                    <div class="start-separator"></div>
                    <div class="start-item" id="np-act-exit"><span>E<u>x</u>it</span></div>
                </div>
            </div>
            <div class="win-menu-item"><u>E</u>dit</div>
            <div class="win-menu-item">F<u>o</u>rmat</div>
            <div class="win-menu-item"><u>H</u>elp</div>
        `;

        const textarea = document.createElement("textarea");
        textarea.className = "notepad-textarea";
        textarea.value = content;
        textarea.spellcheck = false;

        const statusbar = document.createElement("div");
        statusbar.className = "win-statusbar";
        statusbar.innerHTML = `
            <div class="win-status-pane grow" id="np-status-pos">Ln 1, Col 1</div>
            <div class="win-status-pane">ANSI</div>
        `;

        const win = wm.createWindow({
            id: winId,
            title: `${fileName} - Notepad`,
            icon: "notepad-file",
            width: 520,
            height: 380,
            menubar,
            bodyContent: textarea,
            statusbar,
            onInit: (w) => {
                const posPane = w.el.querySelector("#np-status-pos");

                const updateCursor = () => {
                    const text = textarea.value.substr(0, textarea.selectionStart);
                    const lines = text.split("\n");
                    const ln = lines.length;
                    const col = lines[lines.length - 1].length + 1;
                    posPane.textContent = `Ln ${ln}, Col ${col}`;
                };

                textarea.addEventListener("keyup", updateCursor);
                textarea.addEventListener("click", updateCursor);

                // Save action
                w.el.querySelector("#np-act-save").addEventListener("click", () => {
                    retroSound.playDing();
                    // Update content in DesktopManager if it's on desktop
                    const dItem = DesktopManager.desktopItems.find(i => i.name === fileName);
                    if (dItem) {
                        dItem.content = textarea.value;
                    }
                    alert(`'${fileName}' has been saved.`);
                });

                w.el.querySelector("#np-act-saveas").addEventListener("click", () => {
                    const newName = prompt("Save file as:", fileName);
                    if (newName) {
                        wm.setWindowTitle(winId, `${newName} - Notepad`);
                        alert(`File saved as '${newName}'.`);
                    }
                });

                w.el.querySelector("#np-act-exit").addEventListener("click", () => {
                    wm.closeWindow(winId);
                });
            }
        });
    },

    // ----------------------------------------------------
    // 4. Command Prompt (cmd.exe)
    // ----------------------------------------------------
    openCmd() {
        const winId = "win_cmd";
        if (wm.windows.has(winId)) {
            wm.focusWindow(winId);
            return;
        }

        const bodyContent = document.createElement("div");
        bodyContent.className = "cmd-container";

        const win = wm.createWindow({
            id: winId,
            title: "Command Prompt",
            icon: "cmd",
            width: 600,
            height: 380,
            bodyContent,
            onInit: (w) => {
                this.initCmdTerminal(bodyContent, winId);
            }
        });
    },

    initCmdTerminal(container, winId) {
        let currentDir = "C:\\WINNT\\system32";
        let isMatrixMode = false;

        container.innerHTML = `
            <div class="cmd-output">Microsoft Windows 2000 [Version 5.00.2195]
(C) Copyright 1985-2000 Microsoft Corp.
Portfolio Virtual Shell initialized. Type 'help' for commands.
</div>
            <div class="cmd-line" id="cmd-active-line">
                <span class="cmd-prompt">${currentDir}&gt;</span>
                <input type="text" class="cmd-input" id="cmd-active-input" autofocus spellcheck="false">
            </div>
        `;

        const activeInput = container.querySelector("#cmd-active-input");

        const executeCommand = (cmdText) => {
            const raw = cmdText.trim();
            const parts = raw.split(" ");
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);

            let output = "";

            if (cmd === "") {
                output = "";
            } else if (cmd === "help") {
                output = `Supported commands:
  HELP        Provides Help information for Windows commands.
  DIR         Displays a list of files and subdirectories in a directory.
  WHOAMI      Displays the portfolio owner profile.
  SKILLS      Shows technical proficiencies matrix.
  PROJECTS    Lists featured software projects.
  CONTACT     Displays developer contact details.
  CLS / CLEAR Clears the screen.
  COLOR 0A    Enables Matrix Green retro terminal style.
  COLOR 07    Resets to default terminal style.
  DATE / TIME Displays the current system date and time.
  VER         Displays the Windows version.
  EXIT        Quits the CMD.EXE program.`;
            } else if (cmd === "whoami") {
                output = `${PORTFOLIO_DATA.personal.name} - ${PORTFOLIO_DATA.personal.title}\nBased in: ${PORTFOLIO_DATA.personal.location}\nPhone:    ${PORTFOLIO_DATA.personal.phone}\nEmail:    ${PORTFOLIO_DATA.personal.email}\nLinkedIn: ${PORTFOLIO_DATA.personal.linkedin}`;
            } else if (cmd === "skills") {
                output = `[INFORMATICA & CLOUD]:\n  ${PORTFOLIO_DATA.skills.informatica.join("\n  ")}
[AUTOMATION & DEVOPS]:\n  ${PORTFOLIO_DATA.skills.automation.join("\n  ")}
[PLATFORMS & CLOUD]:\n  ${PORTFOLIO_DATA.skills.platforms.join("\n  ")}
[DATABASES & SQL]:\n  ${PORTFOLIO_DATA.skills.databases.join("\n  ")}
[GOVERNANCE & HA/DR]:\n  ${PORTFOLIO_DATA.skills.governance.join("\n  ")}
[AI & PRODUCTIVITY]:\n  ${PORTFOLIO_DATA.skills.ai_tools.join("\n  ")}`;
            } else if (cmd === "projects") {
                output = PORTFOLIO_DATA.projects.map(p => `* ${p.title}\n  Category: ${p.category}\n  Stack:    ${p.tech.join(", ")}\n  Summary:  ${p.summary}`).join("\n\n");
            } else if (cmd === "certifications" || cmd === "certs") {
                output = `OFFICIAL CERTIFICATIONS:\n* ` + PORTFOLIO_DATA.certifications.join("\n* ");
            } else if (cmd === "resume") {
                AppManager.openResumeViewer();
                output = "Opening Raja Rawat's official A4 printable resume...";
            } else if (cmd === "contact") {
                output = `Phone:    ${PORTFOLIO_DATA.personal.phone}\nEmail:    ${PORTFOLIO_DATA.personal.email}\nLinkedIn: ${PORTFOLIO_DATA.personal.linkedin}\nLocation: ${PORTFOLIO_DATA.personal.location}`;
            } else if (cmd === "dir") {
                output = ` Volume in drive C has no label.
 Volume Serial Number is 4C28-11F2

 Directory of ${currentDir}

10/06/2026  10:00 AM    <DIR>          .
10/06/2026  10:00 AM    <DIR>          ..
10/06/2026  08:00 AM           245,760 cmd.exe
10/06/2026  08:00 AM            65,536 notepad.exe
10/06/2026  08:00 AM           112,640 winmine.exe
10/06/2026  09:30 AM             1,420 About_Me.txt
10/06/2026  09:45 AM             2,180 Resume.txt
               5 File(s)        427,536 bytes
               2 Dir(s)  14,248,321,024 bytes free`;
            } else if (cmd === "cls" || cmd === "clear") {
                container.innerHTML = `
                    <div class="cmd-line" id="cmd-active-line">
                        <span class="cmd-prompt">${currentDir}&gt;</span>
                        <input type="text" class="cmd-input" id="cmd-active-input" autofocus spellcheck="false">
                    </div>
                `;
                this.bindCmdInput(container, winId, currentDir, executeCommand);
                return;
            } else if (cmd === "color") {
                if (args[0] && args[0].toLowerCase() === "0a") {
                    container.classList.add("cmd-matrix");
                    output = "Matrix terminal color theme activated.";
                } else {
                    container.classList.remove("cmd-matrix");
                    output = "Standard terminal color theme restored.";
                }
            } else if (cmd === "matrix") {
                container.classList.toggle("cmd-matrix");
                output = "Toggled Matrix Green color.";
            } else if (cmd === "ver") {
                output = "Microsoft Windows 2000 [Version 5.00.2195]";
            } else if (cmd === "date" || cmd === "time") {
                output = `Current system time: ${new Date().toLocaleString()}`;
            } else if (cmd === "exit") {
                wm.closeWindow(winId);
                return;
            } else {
                output = `'${cmd}' is not recognized as an internal or external command,
operable program or batch file. Type 'help' for assistance.`;
            }

            // Append output and create new line
            const prevLine = container.querySelector("#cmd-active-line");
            if (prevLine) {
                prevLine.removeAttribute("id");
                const oldInput = prevLine.querySelector("input");
                if (oldInput) {
                    const span = document.createElement("span");
                    span.textContent = oldInput.value;
                    oldInput.replaceWith(span);
                }
            }

            if (output) {
                const outDiv = document.createElement("div");
                outDiv.className = "cmd-output";
                outDiv.textContent = output;
                container.appendChild(outDiv);
            }

            const newLine = document.createElement("div");
            newLine.className = "cmd-line";
            newLine.id = "cmd-active-line";
            newLine.innerHTML = `
                <span class="cmd-prompt">${currentDir}&gt;</span>
                <input type="text" class="cmd-input" id="cmd-active-input" autofocus spellcheck="false">
            `;
            container.appendChild(newLine);

            container.scrollTop = container.scrollHeight;
            this.bindCmdInput(container, winId, currentDir, executeCommand);
        };

        this.bindCmdInput(container, winId, currentDir, executeCommand);

        container.addEventListener("click", () => {
            const inp = container.querySelector("#cmd-active-input");
            if (inp) inp.focus();
        });
    },

    bindCmdInput(container, winId, currentDir, executeCommand) {
        const input = container.querySelector("#cmd-active-input");
        if (!input) return;
        input.focus();
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                executeCommand(input.value);
            }
        });
    },

    // ----------------------------------------------------
    // 5. Minesweeper (winmine.exe)
    // ----------------------------------------------------
    openMinesweeper() {
        const winId = "win_minesweeper";
        if (wm.windows.has(winId)) {
            wm.focusWindow(winId);
            return;
        }

        const bodyContent = document.createElement("div");
        bodyContent.className = "minesweeper-app";

        const win = wm.createWindow({
            id: winId,
            title: "Minesweeper",
            icon: "minesweeper",
            width: 230,
            height: 290,
            bodyContent,
            onInit: (w) => {
                this.initMinesweeperGame(bodyContent);
            }
        });
    },

    initMinesweeperGame(container) {
        const rows = 9;
        const cols = 9;
        const totalMines = 10;

        let grid = [];
        let revealedCount = 0;
        let flagsCount = 0;
        let timerSeconds = 0;
        let timerInterval = null;
        let gameOver = false;
        let gameWon = false;
        let firstClick = true;

        container.innerHTML = `
            <div class="minesweeper-header">
                <div class="mine-counter-lcd" id="mine-flags-lcd">010</div>
                <div class="mine-face-btn" id="mine-face-btn">&#128578;</div>
                <div class="mine-counter-lcd" id="mine-timer-lcd">000</div>
            </div>
            <div class="minesweeper-grid" id="mine-grid"></div>
        `;

        const flagsLcd = container.querySelector("#mine-flags-lcd");
        const timerLcd = container.querySelector("#mine-timer-lcd");
        const faceBtn = container.querySelector("#mine-face-btn");
        const gridEl = container.querySelector("#mine-grid");

        const updateFlagsLcd = () => {
            const remaining = Math.max(0, totalMines - flagsCount);
            flagsLcd.textContent = String(remaining).padStart(3, "0");
        };

        const updateTimerLcd = () => {
            timerLcd.textContent = String(Math.min(999, timerSeconds)).padStart(3, "0");
        };

        const resetGame = () => {
            clearInterval(timerInterval);
            timerInterval = null;
            timerSeconds = 0;
            revealedCount = 0;
            flagsCount = 0;
            gameOver = false;
            gameWon = false;
            firstClick = true;
            faceBtn.innerHTML = "&#128578;"; // Happy face
            updateFlagsLcd();
            updateTimerLcd();

            // Initialize Grid
            grid = [];
            gridEl.innerHTML = "";

            for (let r = 0; r < rows; r++) {
                grid[r] = [];
                for (let c = 0; c < cols; c++) {
                    const cell = {
                        r,
                        c,
                        mine: false,
                        revealed: false,
                        flagged: false,
                        count: 0,
                        el: document.createElement("div")
                    };
                    cell.el.className = "mine-cell";

                    cell.el.addEventListener("mousedown", (e) => {
                        if (gameOver) return;
                        if (e.button === 0 && !cell.flagged && !cell.revealed) {
                            faceBtn.innerHTML = "&#128558;"; // Shocked face
                        }
                    });

                    cell.el.addEventListener("mouseup", (e) => {
                        if (gameOver) return;
                        faceBtn.innerHTML = "&#128578;";
                    });

                    cell.el.addEventListener("click", (e) => {
                        if (gameOver || cell.flagged || cell.revealed) return;
                        if (firstClick) {
                            startTimer();
                            plantMines(r, c);
                            firstClick = false;
                        }
                        revealCell(r, c);
                    });

                    cell.el.addEventListener("contextmenu", (e) => {
                        e.preventDefault();
                        if (gameOver || cell.revealed) return;
                        toggleFlag(cell);
                    });

                    grid[r][c] = cell;
                    gridEl.appendChild(cell.el);
                }
            }
        };

        const plantMines = (safeR, safeC) => {
            let planted = 0;
            while (planted < totalMines) {
                const r = Math.floor(Math.random() * rows);
                const c = Math.floor(Math.random() * cols);
                // Safe zone around first click
                if (!grid[r][c].mine && !(Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1)) {
                    grid[r][c].mine = true;
                    planted++;
                }
            }

            // Calculate numbers
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (grid[r][c].mine) continue;
                    let count = 0;
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            const nr = r + dr;
                            const nc = c + dc;
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].mine) {
                                count++;
                            }
                        }
                    }
                    grid[r][c].count = count;
                }
            }
        };

        const startTimer = () => {
            if (timerInterval) return;
            timerInterval = setInterval(() => {
                timerSeconds++;
                updateTimerLcd();
            }, 1000);
        };

        const toggleFlag = (cell) => {
            retroSound.playClick();
            if (cell.flagged) {
                cell.flagged = false;
                cell.el.innerHTML = "";
                flagsCount--;
            } else {
                cell.flagged = true;
                cell.el.innerHTML = "&#128681;"; // Flag
                flagsCount++;
            }
            updateFlagsLcd();
        };

        const revealCell = (r, c) => {
            const cell = grid[r][c];
            if (cell.revealed || cell.flagged) return;

            cell.revealed = true;
            cell.el.classList.add("revealed");
            revealedCount++;

            if (cell.mine) {
                // Game Over - Boom!
                gameOver = true;
                clearInterval(timerInterval);
                retroSound.playExplosion();
                cell.el.classList.add("exploded");
                cell.el.innerHTML = "&#128163;";
                faceBtn.innerHTML = "&#128565;"; // Dead face

                // Reveal all mines
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        if (grid[i][j].mine) {
                            grid[i][j].el.classList.add("revealed");
                            grid[i][j].el.innerHTML = "&#128163;";
                        }
                    }
                }
                return;
            }

            retroSound.playClick();

            if (cell.count > 0) {
                cell.el.textContent = cell.count;
                cell.el.setAttribute("data-count", cell.count);
            } else {
                // Flood Fill blank cells
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                            revealCell(nr, nc);
                        }
                    }
                }
            }

            // Check Win
            if (revealedCount === rows * cols - totalMines) {
                gameWon = true;
                gameOver = true;
                clearInterval(timerInterval);
                retroSound.playDing();
                faceBtn.innerHTML = "&#128526;"; // Sunglasses cool face
                flagsLcd.textContent = "000";
            }
        };

        faceBtn.addEventListener("click", () => {
            retroSound.playClick();
            resetGame();
        });

        resetGame();
    },

    // ----------------------------------------------------
    // 6. Display / System Properties Dialog
    // ----------------------------------------------------
    openProperties() {
        const winId = "win_properties";
        if (wm.windows.has(winId)) {
            wm.focusWindow(winId);
            return;
        }

        const bodyContent = document.createElement("div");
        bodyContent.style.display = "flex";
        bodyContent.style.flexDirection = "column";
        bodyContent.style.height = "100%";

        const win = wm.createWindow({
            id: winId,
            title: "Display Properties",
            icon: "settings",
            width: 440,
            height: 420,
            bodyContent,
            onInit: (w) => {
                this.renderPropertiesDialog(bodyContent, winId);
            }
        });
    },

    renderPropertiesDialog(container, winId, activeTab = "background") {
        container.innerHTML = `
            <div class="props-tabs-header">
                <div class="props-tab ${activeTab === 'background' ? 'active' : ''}" onclick="AppManager.renderPropertiesDialog(this.parentElement.parentElement, '${winId}', 'background')">Background</div>
                <div class="props-tab ${activeTab === 'system' ? 'active' : ''}" onclick="AppManager.renderPropertiesDialog(this.parentElement.parentElement, '${winId}', 'system')">System Specs</div>
                <div class="props-tab ${activeTab === 'appearance' ? 'active' : ''}" onclick="AppManager.renderPropertiesDialog(this.parentElement.parentElement, '${winId}', 'appearance')">Appearance</div>
            </div>
            <div class="props-tab-content" style="flex: 1; background: var(--win-face);">
                ${activeTab === 'background' ? `
                    <div class="monitor-preview-box">
                        <div class="monitor-screen" id="preview-screen">Preview</div>
                    </div>
                    <div style="font-size: 11px;">Select a background wallpaper theme:</div>
                    <select id="wallpaper-select" class="retro-input" size="4" style="height: 100px;">
                        <option value="#008080" selected>Windows 2000 Classic (Teal)</option>
                        <option value="#000080">Midnight Retro Navy</option>
                        <option value="#2d3748">Slate Gray Workstation</option>
                        <option value="#1a202c">Matrix Dark Terminal</option>
                        <option value="#3b1d54">Cyberpunk Vaporwave Purple</option>
                    </select>
                    <div style="display: flex; justify-content: flex-end; gap: 6px; margin-top: auto;">
                        <button class="win-button" id="props-apply-btn">Apply</button>
                        <button class="win-button" onclick="wm.closeWindow('${winId}')">OK</button>
                    </div>
                ` : activeTab === 'system' ? `
                    <div style="display: flex; gap: 14px; align-items: flex-start;">
                        ${getIconSvg("my-computer", 48, 48)}
                        <div style="font-size: 11px; line-height: 1.6;">
                            <strong>System:</strong><br>
                            Microsoft Windows 2000 Professional<br>
                            5.00.2195 Service Pack 4<br><br>
                            <strong>Registered to:</strong><br>
                            ${PORTFOLIO_DATA.personal.name}<br>
                            ${PORTFOLIO_DATA.personal.title}<br>
                            Cognizant Technology Solutions<br><br>
                            <strong>Computer:</strong><br>
                            Intel(R) Pentium(R) III Processor<br>
                            512 MB RAM (High-Performance)<br>
                            Developer Edition Workstation
                        </div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 6px; margin-top: auto;">
                        <button class="win-button" onclick="wm.closeWindow('${winId}')">OK</button>
                    </div>
                ` : `
                    <div style="font-size: 11px; line-height: 1.6;">
                        <strong>Desktop Appearance Scheme:</strong><br>
                        Windows Standard (Classic 3D Gray & Deep Blue)<br><br>
                        Font: Tahoma (Pixel Clear, 11px)<br>
                        Active Title Gradient: #0a246a to #a6caf0<br>
                        Sound Schemes: Windows 2000 Default (Synthesized Web Audio)
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 6px; margin-top: auto;">
                        <button class="win-button" onclick="wm.closeWindow('${winId}')">OK</button>
                    </div>
                `}
            </div>
        `;

        const applyBtn = container.querySelector("#props-apply-btn");
        const wpSelect = container.querySelector("#wallpaper-select");
        const preview = container.querySelector("#preview-screen");

        if (wpSelect && preview) {
            wpSelect.addEventListener("change", () => {
                preview.style.backgroundColor = wpSelect.value;
            });
        }

        if (applyBtn && wpSelect) {
            applyBtn.addEventListener("click", () => {
                retroSound.playClick();
                document.getElementById("desktop").style.backgroundColor = wpSelect.value;
            });
        }
    },

    // ----------------------------------------------------
    // 7. Recycle Bin
    // ----------------------------------------------------
    openRecycleBin() {
        const winId = "win_recycle_bin";
        if (wm.windows.has(winId)) {
            wm.focusWindow(winId);
            return;
        }

        const toolbar = document.createElement("div");
        toolbar.className = "win-toolbar";
        toolbar.innerHTML = `
            <button class="win-tool-btn" id="bin-empty-btn">&#128465; Empty Recycle Bin</button>
            <button class="win-tool-btn" id="bin-restore-btn">&#8634; Restore all items</button>
        `;

        const bodyContent = document.createElement("div");
        bodyContent.className = "explorer-main";

        const statusbar = document.createElement("div");
        statusbar.className = "win-statusbar";
        statusbar.innerHTML = `<div class="win-status-pane grow" id="bin-status">Ready</div>`;

        const win = wm.createWindow({
            id: winId,
            title: "Recycle Bin",
            icon: DesktopManager.recycleBinItems.length > 0 ? "recycle-bin-full" : "recycle-bin-empty",
            width: 500,
            height: 350,
            toolbar,
            bodyContent,
            statusbar,
            onInit: (w) => {
                const renderBin = () => {
                    bodyContent.innerHTML = "";
                    if (DesktopManager.recycleBinItems.length === 0) {
                        bodyContent.innerHTML = `<div style="padding: 20px; color: #808080;">Recycle Bin is empty.</div>`;
                        w.el.querySelector("#bin-status").textContent = "0 objects";
                    } else {
                        DesktopManager.recycleBinItems.forEach(item => {
                            const el = document.createElement("div");
                            el.className = "explorer-item";
                            el.innerHTML = `
                                <div class="explorer-item-icon">${getIconSvg(item.icon, 32, 32)}</div>
                                <div class="explorer-item-name">${item.name}</div>
                            `;
                            bodyContent.appendChild(el);
                        });
                        w.el.querySelector("#bin-status").textContent = `${DesktopManager.recycleBinItems.length} objects`;
                    }
                };

                w.el.querySelector("#bin-empty-btn").addEventListener("click", () => {
                    retroSound.playDing();
                    DesktopManager.recycleBinItems = [];
                    renderBin();
                    DesktopManager.renderDesktopIcons();
                });

                w.el.querySelector("#bin-restore-btn").addEventListener("click", () => {
                    retroSound.playClick();
                    DesktopManager.recycleBinItems.forEach(item => {
                        DesktopManager.desktopItems.push(item);
                    });
                    DesktopManager.recycleBinItems = [];
                    renderBin();
                    DesktopManager.renderDesktopIcons();
                });

                renderBin();
            }
        });
    },

    // ----------------------------------------------------
    // 8. Help Dialog
    // ----------------------------------------------------
    openHelp() {
        const winId = "win_help";
        if (wm.windows.has(winId)) {
            wm.focusWindow(winId);
            return;
        }

        const bodyContent = document.createElement("div");
        bodyContent.style.padding = "16px";
        bodyContent.style.lineHeight = "1.5";
        bodyContent.style.fontSize = "12px";
        bodyContent.innerHTML = `
            <div style="font-size: 15px; font-weight: bold; color: #003366; margin-bottom: 8px;">
                Windows 2000 Interactive Portfolio Guide
            </div>
            <p>Welcome! This interactive retro desktop is an authentic recreation of Windows 2000 Professional, serving as a functional portfolio showcase.</p>
            <br>
            <strong>Key Features:</strong>
            <ul style="margin-left: 20px; margin-top: 4px;">
                <li><strong>Desktop Icons:</strong> Drag freely, double-click to open, slow-click or right-click to rename.</li>
                <li><strong>Right-Click Context Menu:</strong> Refresh desktop, create new folders or text documents, arrange icons.</li>
                <li><strong>My Computer:</strong> Explore drive C: (Portfolio/System) and drive D: (Projects & Code).</li>
                <li><strong>Internet Explorer 5.0:</strong> Read full portfolio pages, projects showcase with live links, and send messages.</li>
                <li><strong>Command Prompt:</strong> Interactive terminal with retro commands (<code>skills</code>, <code>projects</code>, <code>matrix</code>).</li>
                <li><strong>Minesweeper:</strong> Play the classic game with authentic sounds and timer!</li>
            </ul>
        `;

        wm.createWindow({
            id: winId,
            title: "Windows 2000 Help & Support",
            icon: "help",
            width: 480,
            height: 340,
            bodyContent
        });
    },

    openItemProperties(item) {
        retroSound.playClick();
        alert(`Properties of '${item.name}':\n\nType: ${item.type.toUpperCase()}\nLocation: Desktop\nStatus: ${item.readOnly ? "System Protected" : "Read/Write"}`);
    }
};

// Dialogs Manager (Run..., Shut Down...)
const DialogManager = {
    showRun() {
        retroSound.playClick();
        const modal = document.getElementById("modal-run");
        modal.style.display = "flex";
        document.getElementById("run-dialog-icon").innerHTML = getIconSvg("run", 32, 32);
        const inp = document.getElementById("run-input");
        inp.value = "";
        setTimeout(() => inp.focus(), 50);
    },

    hideRun() {
        document.getElementById("modal-run").style.display = "none";
    },

    executeRun() {
        const val = document.getElementById("run-input").value.trim().toLowerCase();
        this.hideRun();

        if (val === "cmd" || val === "command") {
            AppManager.openCmd();
        } else if (val === "notepad") {
            AppManager.openNotepad();
        } else if (val === "ie" || val === "iexplore" || val === "portfolio") {
            AppManager.openInternetExplorer();
        } else if (val === "winmine" || val === "minesweeper" || val === "mine") {
            AppManager.openMinesweeper();
        } else if (val === "explorer" || val === "my computer") {
            AppManager.openMyComputer();
        } else if (val === "control" || val === "settings") {
            AppManager.openProperties();
        } else if (val === "help") {
            AppManager.openHelp();
        } else {
            retroSound.playChord();
            alert(`Windows cannot find '${val}'. Make sure you typed the name correctly, and then try again.`);
        }
    },

    browseRun() {
        AppManager.openMyComputer();
        this.hideRun();
    },

    showShutdown() {
        retroSound.playClick();
        const modal = document.getElementById("modal-shutdown");
        modal.style.display = "flex";
        document.getElementById("shutdown-dialog-icon").innerHTML = getIconSvg("shutdown", 32, 32);
    },

    hideShutdown() {
        document.getElementById("modal-shutdown").style.display = "none";
    },

    executeShutdown() {
        const action = document.getElementById("shutdown-action-select").value;
        this.hideShutdown();

        if (action === "shutdown") {
            const screen = document.getElementById("shutdown-screen");
            screen.style.display = "flex";
            retroSound.playChord();

            const restartHandler = () => {
                screen.style.display = "none";
                document.removeEventListener("click", restartHandler);
                document.removeEventListener("keydown", restartHandler);
                location.reload();
            };

            setTimeout(() => {
                document.addEventListener("click", restartHandler);
                document.addEventListener("keydown", restartHandler);
            }, 500);
        } else if (action === "restart") {
            location.reload();
        } else {
            alert("Developer logged off.");
        }
    }
};
