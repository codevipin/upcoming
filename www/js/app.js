// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('conFusion', ['ionic','ngCordova', 'ngResource','conFusion.services'])

.run(function($ionicPlatform,$rootScope, $ionicLoading, $cordovaSplashscreen, $timeout, $state, tvService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
     // $timeout(function(){
     //            $cordovaSplashscreen.hide();
     //  },2000);

  });

      $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading ...');
        $rootScope.$broadcast('loading:show');

        tvService.reset();
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

   //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

     delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    cache: false,
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl',
            resolve: {
              
              savedShowList: function(storageService){

                return storageService.get('showlist');
              }         
          }
      }
    }
  })

  .state('app.aboutus', {
      url: '/aboutus',
      views: {
        'mainContent': {
          templateUrl: 'templates/aboutus.html',
          controller: 'AboutController',
          resolve: {
            leaders: ['corporateFactory',function(corporateFactory){
              return corporateFactory.query();
            }]
          }
        }
      }
    })

   .state('app.contactus', {
      url: '/contactus',
      views: {
        'mainContent': {
          templateUrl: 'templates/contactus.html'
        }
      }
    })

    .state('app.menu', {
      cache:false,
      url: '/menu',
      views: {
        'mainContent': {
          templateUrl: 'templates/menu.html',
          controller: 'seriesController'
        }
      }
    })

   .state('app.favorites', {
      url: '/favorites',
      views: {
        'mainContent': {
          templateUrl: 'templates/favorites.html',
            controller:'FavoritesController',
              resolve: {
              dishes:  ['menuFactory', function(menuFactory){
                return menuFactory.query();
              }],
                            favorites: ['favoriteFactory', function(favoriteFactory) {
                  return favoriteFactory.getFavorites();
              }]
          }
        }
      }
    })
   
  .state('app.dishdetails', {
    url: '/menu/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/dishdetail.html',
        controller: 'DishDetailController',
         resolve: {
            dish: ['tvService','$stateParams', function(tvService,$stateParams){

                var TvService = tvService;

                var series = TvService;

                TvService.getSeriesDetails($stateParams.id);
              
                return series;
            }]
        }
      }
    }
  })

  .state('app.seasonDetails', {
    url: '/menu/:id/season/:seasonId',
    views: {
      'mainContent': {
        templateUrl: 'templates/seasonDetails.html',
        controller: 'seasonEpisodeCtrl',
         resolve: {
            dish: ['tvService','$stateParams', function(tvService,$stateParams){

                var TvService = tvService;

                var series = TvService;

                TvService.getSeriesEpisodes($stateParams.id, $stateParams.seasonId);
              
                return series;
            }]
        }
      }
    }
  })

  .state('app.seachShows', {
    cache:false,
    url: '/show/search',
    views: {
      'mainContent': {
        templateUrl: 'templates/searchShow.html',
        controller: 'searchCtrl',
        resolve: {
          showDefaultResult: ['tvService',function(tvService) {
            var series = tvService;  
            tvService.getPopularSeason();
            // console.log(series.getPopularSeries());
            return tvService;
          }]
        }
      }
    }
  })

  .state('app.schedule', {
    url: '/schedule',
    views: {
      'mainContent': {
        templateUrl: 'templates/schedule.html',
        controller: 'scheduleCtrl'
      }
    }
  })

  .state('app.channelDetail', {
    url: '/channeldetail',
    views: {
      'mainContent': {
        templateUrl: 'templates/scheduleDetail.html',
        controller: 'scheduleCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

})

/**
 * @name errSrc
 * @author StackOverflow
 * @description
 * Sets a alternate source for image in case of error
 * Source : http://stackoverflow.com/questions/16310298/if-a-ngsrc-path-resolves-to-a-404-is-there-a-way-to-fallback-to-a-default
 */
.directive('errSrc', function() {

 return {
  link: function(scope, element, attrs) {

   scope.$watch(function() {

    return attrs['ngSrc'];
   }, function (value) {

    if (!value) {
     element.attr('src', attrs.errSrc);
    }
   });

   element.bind('error', function() {

    if (attrs.src != attrs.errSrc) {
     attrs.$set('src', attrs.errSrc);
    }
   });
  }
 }
});
