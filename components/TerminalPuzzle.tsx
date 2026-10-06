"use client";

import { useEffect, useRef, useState } from "react";
import { terminalEntries, terminalHelp } from "@/games/puzzles/terminalMachine";

type Line = { prompt: string; command: string; output?: string };
const home = "/home/victor";

function cleanPath(value: string) {
  const parts: string[] = [];
  for (const part of value.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop(); else parts.push(part);
  }
  return `/${parts.join("/")}` || "/";
}
function resolvePath(input: string, cwd: string) {
  if (!input || input === "~") return home;
  if (input.startsWith("/")) return cleanPath(input);
  return cleanPath(`${cwd}/${input}`);
}
function childrenAt(path: string, includeHidden: boolean) {
  const prefix = path === "/" ? "/" : `${path}/`;
  return Object.entries(terminalEntries).flatMap(([fullPath, entry]) => {
    if (!fullPath.startsWith(prefix)) return [];
    const remainder = fullPath.slice(prefix.length);
    if (remainder.includes("/") || !remainder || (!includeHidden && entry.hidden)) return [];
    return [[remainder, entry] as const];
  });
}
function locationLabel(cwd: string) { return cwd === home ? "~" : cwd.replace("/home/victor", "~"); }
function prompt(root: boolean, cwd: string) { return `${root ? "root" : "victor"}@dossier4x100:${locationLabel(cwd)}${root ? "#" : "$"}`; }
function permissionLine(name: string, rootOnly: boolean, type: string) { return `${type === "directory" ? "d" : "-"}${rootOnly ? "rwx------" : "rw-r--r--"}  2 ${rootOnly ? "root root" : "victor victor"} 4096 ${name}`; }

export function TerminalPuzzle({ onBack, onSolved }: { onBack: () => void; onSolved: () => void }) {
  const [cwd, setCwd] = useState(home), [isRoot, setIsRoot] = useState(false), [input, setInput] = useState(""), [lines, setLines] = useState<Line[]>([{ prompt: "", command: "", output: "DOSSIER 4X100 terminal [session active]\nType ‘help’ for available commands." }]), [history, setHistory] = useState<string[]>([]), [historyIndex, setHistoryIndex] = useState(-1), [awaitingPassword, setAwaitingPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null), terminalEndRef = useRef<HTMLDivElement>(null), tabCountRef = useRef(0), tabTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const terminalOutput = terminalEndRef.current?.parentElement;
    if (terminalOutput instanceof HTMLElement) terminalOutput.scrollTo({ top: terminalOutput.scrollHeight, behavior: "smooth" });
  }, [lines, awaitingPassword]);
  const addLine = (command: string, output?: string, promptText = prompt(isRoot, cwd)) => setLines((previous) => [...previous, { prompt: promptText, command, output }]);
  const execute = (raw: string) => {
    const command = raw.trim();
    if (!command) return;
    if (awaitingPassword) {
      const successful = raw === "Koala456!";
      addLine("********", successful ? undefined : "Sorry, try again.", "[sudo] password for victor:");
      if (successful) { setAwaitingPassword(false); setIsRoot(true); setCwd(home); }
      return;
    }
    setHistory((previous) => [...previous, command]); setHistoryIndex(-1);
    const [base, ...argumentsList] = command.split(/\s+/); const argument = argumentsList.join(" ");
    if (base === "clear") { setLines([]); return; }
    if (base === "pwd") { addLine(command, cwd); return; }
    if (base === "whoami") { addLine(command, isRoot ? "root" : "victor"); return; }
    if (base === "id") { addLine(command, isRoot ? "uid=0(root) gid=0(root) groups=0(root)" : "uid=1000(victor) gid=1000(victor) groups=1000(victor),27(sudo)"); return; }
    if (base === "help") { addLine(command, terminalHelp); return; }
    if (base === "sudo" && ["-i", "su", "su -"].includes(argument)) { if (isRoot) { addLine(command); return; } addLine(command, "", prompt(isRoot, cwd)); setAwaitingPassword(true); return; }
    if (base === "exit" && isRoot) { addLine(command); setIsRoot(false); setCwd(home); return; }
    if (base === "ls") {
      const flags = argument.replace(/\s/g, "");
      if (flags && !["-a", "-l", "-la", "-al"].includes(flags)) { addLine(command, `ls: invalid option -- '${flags.replace("-", "").charAt(0)}'`); return; }
      const items = childrenAt(cwd, flags.includes("a"));
      const output = flags.includes("l") ? items.map(([name, item]) => permissionLine(name, Boolean(item.rootOnly), item.type)).join("\n") : items.map(([name, item]) => item.type === "directory" ? `${name}/` : name).join("  ");
      addLine(command, output || ""); return;
    }
    if (base === "cd") {
      const destination = resolvePath(argument, cwd), entry = terminalEntries[destination];
      if (!entry) { addLine(command, `bash: cd: ${argument || "~"}: No such file or directory`); return; }
      if (entry.type !== "directory") { addLine(command, `bash: cd: ${argument}: Not a directory`); return; }
      if (entry.rootOnly && !isRoot) { addLine(command, `bash: cd: ${argument}: Permission denied`); return; }
      setCwd(destination); addLine(command); return;
    }
    if (base === "cat") {
      const target = resolvePath(argument, cwd), entry = terminalEntries[target];
      if (!argument) { addLine(command, "cat: missing operand"); return; }
      if (!entry) { addLine(command, `cat: ${argument}: No such file or directory`); return; }
      if (entry.rootOnly && !isRoot) { addLine(command, `cat: ${argument}: Permission denied`); return; }
      if (entry.type === "directory") { addLine(command, `cat: ${argument}: Is a directory`); return; }
      addLine(command, entry.content); return;
    }
    addLine(command, `bash: ${base}: command not found`);
  };
  const submit = () => {
    execute(input);
    setInput("");
    window.requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  };
  const autocomplete = () => {
    if (awaitingPassword) return;
    const [command = "", ...parts] = input.split(/\s+/); const fragment = parts.join(" ");
    const candidates = parts.length === 0 ? ["pwd", "ls", "cd", "cat", "whoami", "id", "sudo", "clear", "help", "exit"].filter((item) => item.startsWith(command)) : ["cd", "cat"].includes(command) ? childrenAt(cwd, true).map(([name, entry]) => `${name}${entry.type === "directory" ? "/" : ""}`).filter((item) => item.startsWith(fragment)) : [];
    tabCountRef.current += 1;
    if (tabTimerRef.current) clearTimeout(tabTimerRef.current);
    tabTimerRef.current = setTimeout(() => { tabCountRef.current = 0; }, 650);
    if (candidates.length === 1) { setInput(parts.length === 0 ? candidates[0] : `${command} ${candidates[0]}`); tabCountRef.current = 0; return; }
    if (candidates.length > 1 && tabCountRef.current >= 2) { setLines((previous) => [...previous, { prompt: "", command: "", output: candidates.join("  ") }]); tabCountRef.current = 0; return; }
    if (candidates.length === 0) tabCountRef.current = 0;
  };
  return <div className="content terminal-puzzle fade"><button className="back" onClick={onBack}>← Retour</button><p className="eyebrow">ÉNIGME 02 — ACCÈS REFUSÉ</p><p className="terminal-intro">Un environnement local a été récupéré. Son contenu reste à explorer.</p><section className="terminal-window" onClick={() => inputRef.current?.focus({ preventScroll: true })} aria-label="Terminal Linux simulé"><div className="terminal-titlebar"><span>victor@dossier4x100</span><i>● ● ●</i></div><div className="terminal-output">{lines.map((line, index) => <div className="terminal-line" key={`${line.command}-${index}`}>{line.command && <div><span className={line.prompt.endsWith("#") ? "root-prompt" : "user-prompt"}>{line.prompt}</span> <span>{line.command}</span></div>}{line.output !== undefined && line.output !== "" && <pre>{line.output}</pre>}</div>)}<form className="terminal-entry" onSubmit={(event) => { event.preventDefault(); submit(); }}><span className={isRoot ? "root-prompt" : "user-prompt"}>{awaitingPassword ? "[sudo] password for victor:" : prompt(isRoot, cwd)}</span><input ref={inputRef} type={awaitingPassword ? "password" : "text"} autoCapitalize="none" autoCorrect="off" autoComplete="off" spellCheck={false} enterKeyHint="send" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Tab") { event.preventDefault(); autocomplete(); } if (event.key === "ArrowUp") { event.preventDefault(); const next = Math.min(historyIndex + 1, history.length - 1); if (next >= 0) { setHistoryIndex(next); setInput(history[history.length - 1 - next]); } } if (event.key === "ArrowDown") { event.preventDefault(); const next = historyIndex - 1; setHistoryIndex(next); setInput(next >= 0 ? history[history.length - 1 - next] : ""); } }} aria-label="Commande terminal" /></form><div ref={terminalEndRef}/></div></section><TerminalValidation onSolved={onSolved}/></div>;
}

function TerminalValidation({ onSolved }: { onSolved: () => void }) {
  const [answer, setAnswer] = useState(""), [error, setError] = useState(false);
  const validate = () => { if (answer.trim().toLocaleUpperCase("fr-FR") === "JOHNNY") onSolved(); else setError(true); };
  return <div className="terminal-validation"><label htmlFor="terminal-answer">Code récupéré</label><input id="terminal-answer" autoCapitalize="characters" autoComplete="off" value={answer} onChange={(event) => { setAnswer(event.target.value); setError(false); }} onKeyDown={(event) => event.key === "Enter" && validate()} placeholder="Saisir le code"/><p className="error">{error && "Code non reconnu. Continuez l’exploration."}</p><button className="action" onClick={validate}>Valider <span>→</span></button></div>;
}
