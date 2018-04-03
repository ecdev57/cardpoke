'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPokeliste;

describe('Pokeliste API:', function() {
  describe('GET /api/pokelistes', function() {
    var pokelistes;

    beforeEach(function(done) {
      request(app)
        .get('/api/pokelistes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pokelistes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      pokelistes.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/pokelistes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pokelistes')
        .send({
          name: 'New Pokeliste',
          info: 'This is the brand new pokeliste!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPokeliste = res.body;
          done();
        });
    });

    it('should respond with the newly created pokeliste', function() {
      newPokeliste.name.should.equal('New Pokeliste');
      newPokeliste.info.should.equal('This is the brand new pokeliste!!!');
    });
  });

  describe('GET /api/pokelistes/:id', function() {
    var pokeliste;

    beforeEach(function(done) {
      request(app)
        .get(`/api/pokelistes/${newPokeliste._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pokeliste = res.body;
          done();
        });
    });

    afterEach(function() {
      pokeliste = {};
    });

    it('should respond with the requested pokeliste', function() {
      pokeliste.name.should.equal('New Pokeliste');
      pokeliste.info.should.equal('This is the brand new pokeliste!!!');
    });
  });

  describe('PUT /api/pokelistes/:id', function() {
    var updatedPokeliste;

    beforeEach(function(done) {
      request(app)
        .put(`/api/pokelistes/${newPokeliste._id}`)
        .send({
          name: 'Updated Pokeliste',
          info: 'This is the updated pokeliste!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPokeliste = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPokeliste = {};
    });

    it('should respond with the updated pokeliste', function() {
      updatedPokeliste.name.should.equal('Updated Pokeliste');
      updatedPokeliste.info.should.equal('This is the updated pokeliste!!!');
    });

    it('should respond with the updated pokeliste on a subsequent GET', function(done) {
      request(app)
        .get(`/api/pokelistes/${newPokeliste._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let pokeliste = res.body;

          pokeliste.name.should.equal('Updated Pokeliste');
          pokeliste.info.should.equal('This is the updated pokeliste!!!');

          done();
        });
    });
  });

  describe('PATCH /api/pokelistes/:id', function() {
    var patchedPokeliste;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/pokelistes/${newPokeliste._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Pokeliste' },
          { op: 'replace', path: '/info', value: 'This is the patched pokeliste!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPokeliste = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPokeliste = {};
    });

    it('should respond with the patched pokeliste', function() {
      patchedPokeliste.name.should.equal('Patched Pokeliste');
      patchedPokeliste.info.should.equal('This is the patched pokeliste!!!');
    });
  });

  describe('DELETE /api/pokelistes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/pokelistes/${newPokeliste._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pokeliste does not exist', function(done) {
      request(app)
        .delete(`/api/pokelistes/${newPokeliste._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
