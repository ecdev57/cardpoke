'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var pokelisteCtrlStub = {
  index: 'pokelisteCtrl.index',
  show: 'pokelisteCtrl.show',
  create: 'pokelisteCtrl.create',
  upsert: 'pokelisteCtrl.upsert',
  patch: 'pokelisteCtrl.patch',
  destroy: 'pokelisteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pokelisteIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './pokeliste.controller': pokelisteCtrlStub
});

describe('Pokeliste API Router:', function() {
  it('should return an express router instance', function() {
    pokelisteIndex.should.equal(routerStub);
  });

  describe('GET /api/pokelistes', function() {
    it('should route to pokeliste.controller.index', function() {
      routerStub.get
        .withArgs('/', 'pokelisteCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/pokelistes/:id', function() {
    it('should route to pokeliste.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'pokelisteCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/pokelistes', function() {
    it('should route to pokeliste.controller.create', function() {
      routerStub.post
        .withArgs('/', 'pokelisteCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/pokelistes/:id', function() {
    it('should route to pokeliste.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'pokelisteCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/pokelistes/:id', function() {
    it('should route to pokeliste.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'pokelisteCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/pokelistes/:id', function() {
    it('should route to pokeliste.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'pokelisteCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
