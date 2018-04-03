'use strict';

describe('Component: MylistPokeComponent', function() {
  // load the controller's module
  beforeEach(module('yomanPokedexApp.mylistPoke'));

  var MylistPokeComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MylistPokeComponent = $componentController('mylistPoke', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
