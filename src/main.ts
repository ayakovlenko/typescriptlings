import { check, isDone } from "./runner.ts";
import { exercises } from "../exercises/index.ts";
import { State } from "./state.ts";
import * as ui from "./ui.ts";
import { FsEvent, FsEventPublisher, Subscriber } from "./fs.ts";

const state = new State(exercises);

// rewind to the next uncompleted exercise
const rewind = async () => {
  let exercise = state.current();
  while (exercise && await check(exercise) && await isDone(exercise)) {
    ui.successfulRun(exercise);
    exercise = state.next();
  }
};

// FS LISTENER

class FsEventSubscriber implements Subscriber<FsEvent> {
  update({ kind }: FsEvent): void | PromiseLike<void> {
    switch (kind) {
      case "modify": {
        this.checkExercise();
      }
    }
  }

  async checkExercise() {
    const exercise = state.current();
    if (exercise) {
      const { ok, output } = await check(exercise);
      const done = await isDone(exercise);

      if (ok && done) {
        // trigger next exercise
        await rewind();
        this.checkExercise();
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
    } else {
      ui.congratsAndExit();
    }
  }
}

const fsEventPublisher = new FsEventPublisher({
  watch: "./exercises",
});
fsEventPublisher.start();

const fsEventSubscriber = new FsEventSubscriber();
fsEventPublisher.addSubscriber(fsEventSubscriber);

await rewind();
fsEventSubscriber.checkExercise();

export {};
