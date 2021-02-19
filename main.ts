import { check, run } from "./runner.ts";
import { exercises } from "./exercises.ts";
import { State } from "./state.ts";
import { relative } from "./deps.ts";
import {
  congratsAndExit,
  failedRun,
  nextInstuctions,
  successfulRun,
} from "./ui.ts";

const state = new State(exercises);

// rewind to the next uncompleted exercise
let exercise = state.current();
while (exercise && await check(exercise)) {
  successfulRun(exercise);
  exercise = state.next();
}

const watcher = Deno.watchFs("./exercises");

const FileModifiedEvent = "file-modified";

window.addEventListener(FileModifiedEvent, async () => {
  const current = state.current();
  if (current) {
    const [ok, output] = await run(current);
    if (ok) {
      successfulRun(current);
      console.log(output);
      if (state.next()) {
        window.dispatchEvent(new Event(FileModifiedEvent));
        nextInstuctions();
      } else {
        congratsAndExit();
      }
    } else {
      failedRun(current);
      console.log(output);
    }
  }
});

if (exercise) {
  window.dispatchEvent(new Event(FileModifiedEvent));
} else {
  congratsAndExit();
}

// FS LISTENER

let lastEventTs = performance.now();
for await (const event of watcher) {
  const { kind, paths } = event;
  if (kind === "modify") {
    const eventTs = performance.now();
    paths.forEach((path) => {
      path = relative(Deno.cwd(), path);
      const current = state.current();
      if (current && current.path === path) {
        if (eventTs - lastEventTs > 1000) { // throttling
          lastEventTs = eventTs;
          window.dispatchEvent(new Event(FileModifiedEvent));
        }
      }
    });
  }
}

export {};
