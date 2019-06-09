/**
 * This is to make sure setTimeout and clearTimeout functions
 * will be parts of window object.
 */
export default class Timeout {
    public static set(handler: TimerHandler, timeout?: number): number {
        return window.setTimeout(handler, timeout);
    }

    public static clear(handle?: number): void {
        window.clearTimeout(handle);
    }
}