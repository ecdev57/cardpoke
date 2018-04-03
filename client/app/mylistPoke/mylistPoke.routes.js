'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('mylistPoke', {
      url: '/mylistPoke',
      template: '<mylist-poke></mylist-poke>'
    });
}
