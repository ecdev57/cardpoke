'use strict';

import angular from 'angular';

export default angular.module('yomanPokedexApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
