export type TerminalEntry = { type: "file" | "directory"; content?: string; hidden?: boolean; rootOnly?: boolean };

export const terminalEntries: Record<string, TerminalEntry> = {
  "/home": { type: "directory" }, "/home/victor": { type: "directory" },
  "/home/victor/Desktop": { type: "directory" }, "/home/victor/Documents": { type: "directory" }, "/home/victor/Downloads": { type: "directory" }, "/home/victor/Music": { type: "directory" }, "/home/victor/Pictures": { type: "directory" }, "/home/victor/archives": { type: "directory" }, "/home/victor/logs": { type: "directory" }, "/home/victor/PCGF": { type: "directory", rootOnly: true },
  "/home/victor/courses.txt": { type: "file", content: "BIÈRE\nCACAHUÈTE" },
  "/home/victor/README.txt": { type: "file", content: "DOSSIER 4X100 — poste personnel\n\nLes informations importantes ne sont pas toujours visibles au premier regard.\nLes journaux conservent plus de choses qu’ils ne devraient.\n\nConseil : ne néglige pas les fichiers cachés." },
  "/home/victor/.vault_hint": { type: "file", hidden: true, content: "Animal préféré après la licorne + ce qui vient après 123 + ponctuation habituelle" },
  "/home/victor/.bash_history": { type: "file", hidden: true, content: "ls\ncd logs\ncat auth.log\nsudo -i" },
  "/home/victor/Desktop/todo.md": { type: "file", content: "- faire des bisous.\n- pratiquer le love bombing" },
  "/home/victor/Documents/assurance.pdf": { type: "file", content: "cat: assurance.pdf: binary file" },
  "/home/victor/Documents/projet-2026.txt": { type: "file", content: "coming soon petit curieux" },
  "/home/victor/Downloads/linux.iso": { type: "file", content: "cat: linux.iso: binary file" },
  "/home/victor/Music/playlist.m3u": { type: "file", content: "01 - Night Drive\n02 - Sunday Morning\n03 - Nothing Useful" },
  "/home/victor/Pictures/nude1.jpg": { type: "file", content: "cat: nude1.jpg: binary file" },
  "/home/victor/Pictures/nude2.jpg": { type: "file", content: "cat: nude2.jpg: binary file" },
  "/home/victor/Pictures/nude3.jpg": { type: "file", content: "cat: nude3.jpg: binary file" },
  "/home/victor/Pictures/nude4.jpg": { type: "file", content: "cat: nude4.jpg: binary file" },
  "/home/victor/Pictures/nude5.jpg": { type: "file", content: "cat: nude5.jpg: binary file" },
  "/home/victor/Pictures/nude6.jpg": { type: "file", content: "cat: nude6.jpg: binary file" },
  "/home/victor/Pictures/chat-2024.jpg": { type: "file", content: "cat: chat-2024.jpg: binary file" },
  "/home/victor/Pictures/facture.jpg": { type: "file", content: "cat: facture.jpg: binary file" },
  "/home/victor/archives/old_notes.txt": { type: "file", content: "mot de passe : pas celui de 2019." },
  "/home/victor/logs/auth.log": { type: "file", content: "Sep 30 19:42 dossier sudo: victor : TTY=pts/0 ; PWD=/home/victor ; USER=root ; COMMAND=/bin/bash\nSep 30 19:42 dossier sudo: pam_unix(sudo:auth): authentication failure\nSep 30 19:43 dossier systemd[1]: PCGF access policy loaded" },
  "/home/victor/logs/kernel.log": { type: "file", content: "[    0.000000] kernel: boot sequence complete\n[    2.114000] audio: harmless crackle detected" },
  "/home/victor/logs/cleanup.log": { type: "file", content: "cleanup: Downloads untouched\ncleanup: definitely not deleting nude*.jpg" },
  "/home/victor/PCGF/code.txt": { type: "file", rootOnly: true, content: "JOHNNY" },
};

export const terminalHelp = "Commandes disponibles : pwd, ls, ls -a, ls -la, cd, cat, whoami, id, sudo -i, sudo su, clear, help\nTab complète une commande ou un nom ; deux Tab affichent les possibilités.";
