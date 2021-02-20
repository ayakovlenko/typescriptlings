import { Exercise } from "./exercise.ts";

class State {
  #i = 0;

  constructor(private readonly exercises: Exercise[]) {}

  current(): Exercise | undefined {
    return this.exercises[this.#i];
  }

  next(): Exercise | undefined {
    this.#i++;
    return this.exercises[this.#i];
  }
}

export { State };
