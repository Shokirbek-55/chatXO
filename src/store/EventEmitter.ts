/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */


class EventEmitter {
    observers: any;
    constructor() {
        this.observers = {};
    }

    on(events: string, listener: any) {
        events.split(' ').forEach((event: string | number) => {
            this.observers[event] = this.observers[event] || [];
            this.observers[event].push(listener);
        });
        return this;
    }

    off(event: string | number, listener: any) {
        if (!this.observers[event]) return;
        if (!listener) {
            delete this.observers[event];
            return;
        }

        this.observers[event] = this.observers[event].filter((l: any) => l !== listener);
    }

    emit(event: string | number, ...args: any[]) {
        if (this.observers[event]) {
            const cloned = [].concat(this.observers[event]);
            cloned.forEach((observer: Function) => { // Add type annotation to observer parameter
                observer(...args);
            });
        }

        if (this.observers['*']) {
            const cloned = [].concat(this.observers['*']);
            cloned.forEach((observer: Function) => { // Add type annotation to observer parameter
                observer.apply(observer, [event, ...args]);
            });
        }
    }
}

export default EventEmitter;
