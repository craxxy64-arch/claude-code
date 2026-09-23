export type Listener<T> = (payload: T) => void;

/**
 * Minimal typed event emitter. A throwing listener is isolated so that one
 * faulty subscriber can never take down the emitting subsystem.
 */
export class Emitter<Events extends object> {
  private listeners = new Map<keyof Events, Set<Listener<never>>>();

  on<K extends keyof Events>(event: K, fn: Listener<Events[K]>): () => void {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(fn as Listener<never>);
    return () => set.delete(fn as Listener<never>);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const set = this.listeners.get(event);
    if (!set) return;
    for (const fn of set) {
      try {
        (fn as Listener<Events[K]>)(payload);
      } catch (err) {
        console.error(`[emitter] listener for "${String(event)}" failed`, err);
      }
    }
  }
}
