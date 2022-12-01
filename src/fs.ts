import { groupBy, maxBy, sortBy } from "./deps.ts";

type FsEvent = {
  ts: number;
  kind: "any" | "access" | "create" | "modify" | "remove" | "other";
  path: string;
  flag?: Deno.FsEventFlag;
};

type FsEventPublisherOpts = {
  watch: string;
};

class FsEventPublisher {
  private readonly watch: string;

  constructor({ watch }: FsEventPublisherOpts) {
    this.watch = watch;
  }

  private subscribers: Subscriber<FsEvent>[] = [];
  private buffer: FsEvent[] = [];

  addSubscriber(subscriber: Subscriber<FsEvent>) {
    this.subscribers.push(subscriber);
  }

  private notifySubscribers(event: FsEvent) {
    for (const subscriber of this.subscribers) {
      subscriber.update(event);
    }
  }

  async start() {
    const watcher = Deno.watchFs(this.watch, {
      recursive: true,
    });

    // notify subscribers every X millisecond
    setInterval(() => {
      const events = [...this.buffer];
      if (this.buffer.length > events.length) { // ???????
        return;
      }
      this.buffer = [];

      // deduplicate events
      sortBy(
        Object
          .entries(
            groupBy(events, (e) => e.path),
          ).map(([_, events]) => maxBy(events!, (e) => e.ts)!),
        (e) => e.ts,
      ).forEach((event) => {
        this.notifySubscribers(event);
      });
    }, 100);

    for await (const event of watcher) {
      const { kind, paths, flag } = event;

      for (const path of paths) {
        const event = {
          ts: performance.now(),
          kind,
          path,
          flag,
        };

        this.buffer.push(event);
      }
    }
  }
}

interface Subscriber<A> {
  update(event: A): void | PromiseLike<void>;
}

export { FsEventPublisher };

export type { FsEvent, Subscriber };
