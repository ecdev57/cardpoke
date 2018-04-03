/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pokelistes              ->  index
 * POST    /api/pokelistes              ->  create
 * GET     /api/pokelistes/:id          ->  show
 * PUT     /api/pokelistes/:id          ->  upsert
 * PATCH   /api/pokelistes/:id          ->  patch
 * DELETE  /api/pokelistes/:id          ->  destroy
 */

'use strict';
const pokemon = require('pokemontcgsdk');
import jsonpatch from 'fast-json-patch';
import Pokeliste from './pokeliste.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Pokelistes
export function index(req, res) {
  // return Pokeliste.find().exec()
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
 //pokemon.card.where({ supertype: 'pokemon', page: 0, pageSize: 1000}) .then(cards => { res.json(cards); });
  pokemon.card.where({ supertype: 'pokemon', page: 0, pageSize: 1000}) .then(cards => { res.json(cards); });
}

// Gets a single Pokeliste from the DB
export function show(req, res) {
  return Pokeliste.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Pokeliste in the DB
export function create(req, res) {
  return Pokeliste.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Pokeliste in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Pokeliste.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Pokeliste in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Pokeliste.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Pokeliste from the DB
export function destroy(req, res) {
  return Pokeliste.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
