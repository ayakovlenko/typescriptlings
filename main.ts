import { run } from "./runner.ts";

const watcher = Deno.watchFs("./exercises");

const fileModifedEvents: Set<string> = new Set();

const FileModifiedEvent = "file-modified";

window.addEventListener(FileModifiedEvent, () => {
  setTimeout(() => {
    for (const path of fileModifedEvents.values()) {
      run(path);
    }
    fileModifedEvents.clear();
  }, 1000);
});

for await (const event of watcher) {
  const { kind, paths } = event;
  if (kind === "modify") {
    paths.forEach((path) => fileModifedEvents.add(path));
    window.dispatchEvent(new Event(FileModifiedEvent));
  }
}

export {};
