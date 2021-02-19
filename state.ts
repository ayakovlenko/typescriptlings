import { Exercise } from "./exercises.ts";

class State {
  #i = 0;

  constructor(private readonly exercises: Exercise[]) {}

  next(): Exercise | undefined {
    return this.exercises[this.#i];
  }
}

export { State };
