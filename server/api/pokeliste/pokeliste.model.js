'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './pokeliste.events';

var PokelisteSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(PokelisteSchema);
export default mongoose.model('Pokeliste', PokelisteSchema);
