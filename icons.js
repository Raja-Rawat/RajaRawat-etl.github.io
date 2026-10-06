// Windows 2000 High-Fidelity SVG Icon Library

const ICONS = {
    // 4-Color Windows Flag
    "win-flag": `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 2.5C4 1 5.5 3.5 8 2.5C8 5.5 8 8.5 8 10C5.5 11 4 8.5 1 10V2.5Z" fill="#D83B01"/>
        <path d="M8.5 2.4C11 1.4 12.5 3.9 15 2.9V10.4C12.5 11.4 11 8.9 8.5 9.9V2.4Z" fill="#107C41"/>
        <path d="M1 10.5C4 9 5.5 11.5 8 10.5V14.5C5.5 15.5 4 13 1 14.5V10.5Z" fill="#0078D7"/>
        <path d="M8.5 10.4C11 9.4 12.5 11.9 15 10.9V14.9C12.5 15.9 11 13.4 8.5 14.4V10.4Z" fill="#FFB900"/>
    </svg>`,

    // My Computer (CRT Monitor with PC Tower)
    "my-computer": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Monitor -->
        <rect x="2" y="2" width="22" height="18" rx="2" fill="#D4D0C8" stroke="#404040" stroke-width="1.5"/>
        <rect x="4" y="4" width="18" height="14" fill="#000080"/>
        <!-- Screen Content -->
        <path d="M6 6H18V14H6V6Z" fill="#008080"/>
        <rect x="7" y="7" width="4" height="2" fill="#FFFFFF"/>
        <!-- Monitor Stand -->
        <rect x="10" y="20" width="6" height="3" fill="#808080"/>
        <path d="M6 23H20V25H6V23Z" fill="#D4D0C8" stroke="#404040" stroke-width="1"/>
        <!-- PC Tower Behind -->
        <rect x="19" y="8" width="11" height="20" rx="1" fill="#D4D0C8" stroke="#404040" stroke-width="1.5"/>
        <rect x="21" y="11" width="7" height="2" fill="#808080"/>
        <rect x="21" y="15" width="7" height="2" fill="#808080"/>
        <circle cx="23" cy="22" r="1.5" fill="#00FF00"/>
        <circle cx="27" cy="22" r="1.5" fill="#D83B01"/>
    </svg>`,

    // My Documents / Folder with documents
    "my-documents": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 7C2 5.89543 2.89543 5 4 5H12L15 8H28C29.1046 8 30 8.89543 30 10V26C30 27.1046 29.1046 28 28 28H4C2.89543 28 2 27.1046 2 26V7Z" fill="#D4A017" stroke="#664600" stroke-width="1.5"/>
        <path d="M5 11H27V26H5V11Z" fill="#FFD700"/>
        <!-- Paper sticking out -->
        <rect x="9" y="8" width="14" height="10" fill="#FFFFFF" stroke="#808080"/>
        <line x1="12" y1="11" x2="20" y2="11" stroke="#000080" stroke-width="1.5"/>
        <line x1="12" y1="14" x2="18" y2="14" stroke="#808080" stroke-width="1.5"/>
    </svg>`,

    // Classic Windows 2000 Folder
    "folder": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6C2 5 3 4 4 4H12L15 7H28C29 7 30 8 30 9V26C30 27 29 28 28 28H4C3 28 2 27 2 26V6Z" fill="#D4A017" stroke="#664600" stroke-width="1.2"/>
        <path d="M2 10H30V26C30 27 29 28 28 28H4C3 28 2 27 2 26V10Z" fill="#FFE271"/>
        <line x1="3" y1="11" x2="29" y2="11" stroke="#FFF7C2" stroke-width="1.5"/>
    </svg>`,

    "folder-system": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6C2 5 3 4 4 4H12L15 7H28C29 7 30 8 30 9V26C30 27 29 28 28 28H4C3 28 2 27 2 26V6Z" fill="#C49A24" stroke="#503800" stroke-width="1.2"/>
        <path d="M2 10H30V26C30 27 29 28 28 28H4C3 28 2 27 2 26V10Z" fill="#F4CF50"/>
        <!-- Gear on folder -->
        <circle cx="16" cy="19" r="4.5" fill="#D4D0C8" stroke="#404040" stroke-width="1.2"/>
        <circle cx="16" cy="19" r="2" fill="#000080"/>
    </svg>`,

    "folder-projects": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6C2 5 3 4 4 4H12L15 7H28C29 7 30 8 30 9V26C30 27 29 28 28 28H4C3 28 2 27 2 26V6Z" fill="#D4A017" stroke="#664600" stroke-width="1.2"/>
        <path d="M2 10H30V26C30 27 29 28 28 28H4C3 28 2 27 2 26V10Z" fill="#FFE271"/>
        <!-- Code tag < > on folder -->
        <path d="M12 16L9 19L12 22M20 16L23 19L20 22" stroke="#000080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    // Hard Drive C:
    "drive-c": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="10" width="26" height="15" rx="2" fill="#D4D0C8" stroke="#404040" stroke-width="1.5"/>
        <path d="M4 11H28V14H4V11Z" fill="#FFFFFF"/>
        <rect x="6" y="18" width="10" height="3" fill="#808080"/>
        <circle cx="21" cy="19" r="1.5" fill="#00FF00"/>
        <circle cx="25" cy="19" r="1.5" fill="#D83B01"/>
        <!-- Window logo corner badge -->
        <rect x="4" y="5" width="8" height="6" fill="#000080"/>
        <rect x="5" y="6" width="3" height="2" fill="#FF4500"/>
        <rect x="8" y="6" width="3" height="2" fill="#32CD32"/>
        <rect x="5" y="8" width="3" height="2" fill="#1E90FF"/>
        <rect x="8" y="8" width="3" height="2" fill="#FFD700"/>
    </svg>`,

    // Hard Drive D:
    "drive-d": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="10" width="26" height="15" rx="2" fill="#D4D0C8" stroke="#404040" stroke-width="1.5"/>
        <path d="M4 11H28V14H4V11Z" fill="#FFFFFF"/>
        <rect x="6" y="18" width="10" height="3" fill="#808080"/>
        <circle cx="21" cy="19" r="1.5" fill="#0080FF"/>
        <circle cx="25" cy="19" r="1.5" fill="#D83B01"/>
        <rect x="4" y="5" width="8" height="6" fill="#808080"/>
        <text x="5" y="10" font-family="Arial" font-size="5" font-weight="bold" fill="#FFFFFF">DATA</text>
    </svg>`,

    // 3.5" Floppy Disk (Drive A:)
    "floppy": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H24L28 8V28H4V4Z" fill="#1E3F66" stroke="#0A192F" stroke-width="1.5"/>
        <rect x="8" y="4" width="12" height="9" fill="#D4D0C8" stroke="#404040"/>
        <rect x="10" y="6" width="3" height="5" fill="#000000"/>
        <rect x="7" y="16" width="18" height="11" fill="#FFFFFF" stroke="#808080"/>
        <line x1="9" y1="19" x2="23" y2="19" stroke="#000080" stroke-width="1.5"/>
        <line x1="9" y1="22" x2="21" y2="22" stroke="#D83B01" stroke-width="1"/>
    </svg>`,

    // Internet Explorer (Classic blue 'e' with golden orbital halo)
    "ie": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Golden Halo -->
        <path d="M3 14C4 7 12 3 21 6C27 8 30 14 27 20C25 24 19 28 10 26" stroke="#FFBF00" stroke-width="3" stroke-linecap="round"/>
        <!-- Blue e -->
        <circle cx="16" cy="16" r="10.5" fill="#0072C6" stroke="#003D73" stroke-width="1.5"/>
        <path d="M7 16H25C25 10 21 8 16 8C10.5 8 7 12 7 16ZM7 16C7 21 11 24 16 24C20 24 23 22 24.5 19.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,

    // Notepad / Text Document
    "notepad-file": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Folded Paper Sheet -->
        <path d="M6 3H20L26 9V29H6V3Z" fill="#FFFFFF" stroke="#808080" stroke-width="1.5"/>
        <path d="M20 3V9H26" fill="#E0E0E0" stroke="#808080" stroke-width="1.5"/>
        <!-- Text lines -->
        <line x1="9" y1="9" x2="16" y2="9" stroke="#000080" stroke-width="1.5"/>
        <line x1="9" y1="13" x2="23" y2="13" stroke="#000080" stroke-width="1.5"/>
        <line x1="9" y1="17" x2="23" y2="17" stroke="#000080" stroke-width="1.5"/>
        <line x1="9" y1="21" x2="23" y2="21" stroke="#000080" stroke-width="1.5"/>
        <line x1="9" y1="25" x2="18" y2="25" stroke="#000080" stroke-width="1.5"/>
    </svg>`,

    // Command Prompt (cmd.exe)
    "cmd": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="28" height="22" rx="1.5" fill="#000000" stroke="#808080" stroke-width="1.5"/>
        <rect x="2" y="5" width="28" height="5" fill="#D4D0C8"/>
        <text x="4" y="9" font-family="monospace" font-size="4" font-weight="bold" fill="#000080">C:\_</text>
        <!-- Prompt text -->
        <text x="5" y="17" font-family="Courier, monospace" font-size="7" font-weight="bold" fill="#FFFFFF">&gt;_</text>
        <line x1="15" y1="18" x2="21" y2="18" stroke="#00FF00" stroke-width="1.5"/>
    </svg>`,

    // Minesweeper
    "minesweeper": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="26" height="26" rx="2" fill="#D4D0C8" stroke="#404040" stroke-width="1.5"/>
        <circle cx="16" cy="17" r="8" fill="#1A1A1A"/>
        <!-- Spikes on bomb -->
        <line x1="16" y1="6" x2="16" y2="9" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="16" y1="25" x2="16" y2="28" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="5" y1="17" x2="8" y2="17" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="24" y1="17" x2="27" y2="17" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="8" y1="9" x2="10" y2="11" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round"/>
        <line x1="22" y1="9" x2="20" y2="11" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round"/>
        <!-- Highlight glare on bomb -->
        <circle cx="13" cy="14" r="2" fill="#FFFFFF"/>
        <!-- Fuse spark -->
        <path d="M19 7L24 4" stroke="#D83B01" stroke-width="2"/>
        <circle cx="25" cy="4" r="1.5" fill="#FFFF00"/>
    </svg>`,

    // Recycle Bin (Empty)
    "recycle-bin-empty": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L10 27H22L24 8H8Z" fill="#F0F4F8" stroke="#005A9E" stroke-width="1.5"/>
        <ellipse cx="16" cy="8" rx="8" ry="3" fill="#D4D0C8" stroke="#005A9E" stroke-width="1.5"/>
        <!-- Bin ribs -->
        <line x1="12" y1="10" x2="13" y2="25" stroke="#005A9E" stroke-width="1.2"/>
        <line x1="16" y1="10" x2="16" y2="25" stroke="#005A9E" stroke-width="1.2"/>
        <line x1="20" y1="10" x2="19" y2="25" stroke="#005A9E" stroke-width="1.2"/>
        <!-- Recycle symbol in green -->
        <path d="M14 15L16 13L18 15M17 19L15 21L13 19" stroke="#107C41" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    // Recycle Bin (Full)
    "recycle-bin-full": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8L10 27H22L24 8H8Z" fill="#F0F4F8" stroke="#005A9E" stroke-width="1.5"/>
        <ellipse cx="16" cy="8" rx="8" ry="3" fill="#D4D0C8" stroke="#005A9E" stroke-width="1.5"/>
        <!-- Crumpled paper overflow -->
        <path d="M10 6C11 4 14 3 16 5C18 3 21 5 21 7C22 8 20 10 18 10C16 10 15 8 13 8C11 8 9 7 10 6Z" fill="#FFFFFF" stroke="#808080" stroke-width="1"/>
        <!-- Bin ribs -->
        <line x1="12" y1="10" x2="13" y2="25" stroke="#005A9E" stroke-width="1.2"/>
        <line x1="16" y1="10" x2="16" y2="25" stroke="#005A9E" stroke-width="1.2"/>
        <line x1="20" y1="10" x2="19" y2="25" stroke="#005A9E" stroke-width="1.2"/>
    </svg>`,

    // System Properties / Settings
    "settings": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="28" height="20" rx="1.5" fill="#D4D0C8" stroke="#404040" stroke-width="1.5"/>
        <rect x="4" y="6" width="24" height="16" fill="#008080"/>
        <!-- Screwdriver and wrench crossing -->
        <line x1="7" y1="20" x2="17" y2="10" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="17" y1="20" x2="7" y2="10" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
        <rect x="11" y="24" width="10" height="4" fill="#808080" stroke="#404040"/>
    </svg>`,

    // Sound Speaker (Sys Tray)
    "sound": `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5H5L9 2V14L5 11H2V5Z" fill="#000000"/>
        <path d="M11 5C12 6 12 10 11 11M13 3C15 5 15 11 13 13" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    // Help Book
    "help": `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7" fill="#000080"/>
        <text x="8" y="12" text-anchor="middle" font-family="Arial" font-size="11" font-weight="bold" fill="#FFFFFF">?</text>
    </svg>`,

    // Run Dialog Icon
    "run": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="22" height="18" fill="#D4D0C8" stroke="#404040" stroke-width="1.5"/>
        <rect x="7" y="11" width="16" height="12" fill="#000080"/>
        <!-- Flash arrow pointing to screen -->
        <path d="M18 20L28 14L24 24L21 21L18 20Z" fill="#FFD700" stroke="#B8860B" stroke-width="1"/>
    </svg>`,

    // Shut Down Computer Icon
    "shutdown": `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="24" height="20" rx="2" fill="#D4D0C8" stroke="#404040" stroke-width="1.5"/>
        <circle cx="16" cy="16" r="6" stroke="#D83B01" stroke-width="2.5"/>
        <line x1="16" y1="9" x2="16" y2="15" stroke="#D83B01" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
};

function getIconSvg(iconName, width = 32, height = 32) {
    const raw = ICONS[iconName] || ICONS["folder"];
    if (width === 32 && height === 32) return raw;
    // Replace width and height attributes
    return raw
        .replace(/width="[0-9]+"/, `width="${width}"`)
        .replace(/height="[0-9]+"/, `height="${height}"`);
}
