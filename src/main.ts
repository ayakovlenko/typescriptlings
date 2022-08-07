import { check, isDone } from "./runner.ts";
import { exercises } from "../exercises/index.ts";
import { State } from "./state.ts";
import { relative } from "./deps.ts";
import * as ui from "./ui.ts";

const FileModifiedEvent = "file-modified";

const state = new State(exercises);

// rewind to the next uncompleted exercise
const rewind = async () => {
  let exercise = state.current();
  while (exercise && await check(exercise) && await isDone(exercise)) {
    ui.successfulRun(exercise);
    exercise = state.next();
  }
};

const trigger = () => {
  const exercise = state.current();
  if (exercise) {
    window.dispatchEvent(new Event(FileModifiedEvent));
  } else {
    ui.congratsAndExit();
  }
};

window.addEventListener(FileModifiedEvent, async () => {
  const exercise = state.current();
  if (exercise) {
    const { ok, output } = await check(exercise);
    const done = await isDone(exercise);

    if (ok && done) {
      state.next();
      await rewind();
      trigger();
    } else if (ok && !done) {
      ui.successfulRun(exercise);
      console.log("\n" + output);
      ui.nextInstuctions();
    } else {
      // !ok && done
      // !ok && !done
      ui.failedRun(exercise);
      console.log(output);
    }
  }
});

await rewind();
await trigger();

// FS LISTENER

const fsListener = async () => {
  const watcher = Deno.watchFs("./exercises");
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
};

fsListener();

export {};
