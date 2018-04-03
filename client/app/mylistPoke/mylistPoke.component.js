'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './mylistPoke.routes';

export class MylistPokeComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('yomanPokedexApp.mylistPoke', [uiRouter])
  .config(routes)
  .component('mylistPoke', {
    template: require('./mylistPoke.html'),
    controller: MylistPokeComponent,
    controllerAs: 'mylistPokeCtrl',
    resolve: {
      posts: function($http){
          return $http.get('../../server/api/pokeliste').then(function(posts){
              return posts.data;
          });
      }
    }
  })
  .name;
