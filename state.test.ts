import { assertEquals } from "./deps_test.ts";
import { State } from "./state.ts";

Deno.test("no more exercises", () => {
  const state = new State([]);

  assertEquals(state.next(), undefined);
});
