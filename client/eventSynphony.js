let typing = require('./misc/typedObject.js');
const fs = require('fs');
const path = require('path');

let TypedObject = typing.TypedObject;

class EventScore {

  // SpcFORK |
  
  static events = [];

  constructor() {}

  static loadEventScores(dir) {
    const files = fs.readdirSync(dir);
  
    files.forEach(file => {
      if (path.extname(file) === '.json') {
        try {
          const data = fs.readFileSync(path.join(dir, file));
          const scoreJson = JSON.parse(data);
          if (Array.isArray(scoreJson)) {
            EventScore.events.push(...scoreJson.map(item => new TypedEvent(item)));
          }
          else {
            console.error(`${file} does not contain a list of events`);
          }
        } catch (error) {
          console.error(`Error loading event score from ${file}:`, error);
        }
      }
    });
  }

  static handleEvent(event) {
    this.events
      .filter(score => score.event === event)
      .forEach(typedEvent => setTimeout(() => typedEvent.callback(), typedEvent.timing));
  }

  static addEvent(event, callback, timing) {
    this.events.push(new TypedEvent({ event, callback, timing }));
    this.events.sort((a, b) => a.timing - b.timing);
    return this.events.length;
  }

  static removeEvent(event) {
    this.events = this.events.filter(score => score.event !== event);
    return this.events.length;
  }

  static removeAllEvents() {
    this.events = [];
    return this.events.length;
  }

  static runAllEvents() {
    this.events.forEach(typedEvent => setTimeout(() => typedEvent.callback(), typedEvent.timing));
  }
}

class TypedEvent extends TypedObject {
  constructor({ name, callback, event, timing }) {
    super({
      name: typeof name,
      callback: typeof callback,
      event: typeof event,
      timing: typeof timing
    });

    // Assign provided values with Object.assign to leverage type checking
    Object.assign(this, { name, callback, event, timing });
  }
}

module.exports = EventScore;