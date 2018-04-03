/**
 * Pokeliste model events
 */

'use strict';

import {EventEmitter} from 'events';
var PokelisteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PokelisteEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Pokeliste) {
  for(var e in events) {
    let event = events[e];
    Pokeliste.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    PokelisteEvents.emit(event + ':' + doc._id, doc);
    PokelisteEvents.emit(event, doc);
  };
}

export {registerEvents};
export default PokelisteEvents;
