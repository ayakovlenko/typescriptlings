import { groupBy, maxBy, sortBy } from "./deps.ts";

type FsEvent = {
  ts: number;
  kind: Deno.FsEvent["kind"];
  path: string;
};

type FsEventObservableOpts = {
  watch: string;
  observer: Observer<FsEvent>;
};

class FsEventObservable {
  private readonly watch: string;
  private readonly observer: Observer<FsEvent>;

  private buffer: FsEvent[] = [];

  constructor({ watch, observer }: FsEventObservableOpts) {
    this.watch = watch;
    this.observer = observer;
  }

  async start() {
    const watcher = Deno.watchFs(this.watch, {
      recursive: true,
    });

    setInterval(() => {
      const events = [...this.buffer];
      this.buffer = [];

      // deduplicate events
      sortBy(
        Object
          .entries(
            groupBy(events, (e) => e.path),
          ).map(([_, events]) => maxBy(events!, (e) => e.ts)!),
        (e) => e.ts,
      ).forEach((event) => {
        this.observer.update(event);
      });
    }, 100);

    for await (const event of watcher) {
      const { kind, paths } = event;

      for (const path of paths) {
        const event: FsEvent = {
          ts: performance.now(),
          kind,
          path,
        };

        this.buffer.push(event);
      }
    }
  }
}

interface Observer<A> {
  update(event: A): void | PromiseLike<void>;
}

export { FsEventObservable };

export type { FsEvent, Observer };
