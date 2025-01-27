// utils/EventBus.ts
type Callback = (data?: any) => void;

class EventBus {
    private events: Record<string, Callback[]> = {};

    subscribe(events: string | string[], callback: Callback) {
        const eventList = Array.isArray(events) ? events : [events];

        eventList.forEach((event) => {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
        });
    }

    unsubscribe(events: string | string[], callback: Callback) {
        const eventList = Array.isArray(events) ? events : [events];

        eventList.forEach((event) => {
            if (!this.events[event]) return;
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        });
    }

    publish(events: string | string[], data?: any) {
        const eventList = Array.isArray(events) ? events : [events];

        eventList.forEach((event) => {
            if (!this.events[event]) return;
            this.events[event].forEach(callback => callback(data));
        });
    }
}

export const eventBus = new EventBus();
