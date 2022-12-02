import { exercises } from "../exercises/index.ts";
import { State } from "./state.ts";
import * as ui from "./ui.ts";
import { FsEvent, FsEventObservable, Observer } from "./fs.ts";
import { Runner } from "./runner.ts";

type TypeScriptlingsOpts = {
  state: State;
  runner: Runner;
};

class TypeScriptlings implements Observer<FsEvent> {
  private readonly state: State;
  private readonly runner: Runner;

  constructor({ state, runner }: TypeScriptlingsOpts) {
    this.state = state;
    this.runner = runner;
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
      const { ok, output } = await this.runner.typeCheck(exercise);
      const done = await this.runner.isDone(exercise);

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
    while (
      exercise &&
      await this.runner.typeCheck(exercise) &&
      await this.runner.isDone(exercise)
    ) {
      ui.successfulRun(exercise);
      exercise = this.state.next();
    }
  }
}

const tslings = new TypeScriptlings({
  state: new State(exercises),
  runner: new Runner(),
});

new FsEventObservable({
  watch: "./exercises",
  observer: tslings,
}).start();

await tslings.rewind();
tslings.checkExercise();

export {};
