class GlobalEvents {
  events = [];

  listen(fn) {
    this.events.push(fn);

    return () => {
      const index = this.events.indexOf(fn);
      if (index !== -1) {
        this.events.splice(index, 1);
      }
    };
  }

  emit(eventName, data) {
    for (const fn of this.events) {
      fn(eventName, data);
    }
  }
}

export default new GlobalEvents();
