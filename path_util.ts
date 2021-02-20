import { normalize } from "./deps.ts";
import { isWindows } from "https://deno.land/std@0.88.0/_util/os.ts";

const osNormalize = (p: string): string => isWindows ? normalize(p) : p;

export { osNormalize };
