import { check, isDone } from "./runner.ts";
import { exercises } from "../exercises/index.ts";
import { State } from "./state.ts";
import * as ui from "./ui.ts";
import { FsEvent, FsEventObservable, Observer } from "./fs.ts";

type TypeScriptlingsOpts = {
  state: State;
};

class TypeScriptlings implements Observer<FsEvent> {
  private readonly state: State;

  constructor({ state }: TypeScriptlingsOpts) {
    this.state = state;
  }

  update({ kind }: FsEvent): void | PromiseLike<void> {
    switch (kind) {
      case "modify": {
        this.checkExercise();
      }
    }
  }

  async checkExercise() {
    const exercise = this.state.current();
    if (exercise) {
      const { ok, output } = await check(exercise);
      const done = await isDone(exercise);

      if (ok && done) {
        // trigger next exercise
        await this.rewind();
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

  async rewind() {
    let exercise = this.state.current();
    while (exercise && await check(exercise) && await isDone(exercise)) {
      ui.successfulRun(exercise);
      exercise = this.state.next();
    }
  }
}

const tslings = new TypeScriptlings({
  state: new State(exercises),
});

new FsEventObservable({
  watch: "./exercises",
  observer: tslings,
}).start();

await tslings.rewind();
tslings.checkExercise();

export {};
