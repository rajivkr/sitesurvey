(function() {

  var app = angular.module("routedTabs", ["ui.router", "ui.bootstrap", "ngMap"]);

  app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main/tab1");

    $stateProvider
      .state("main", {
        abtract: true,
        url: "/main",
        templateUrl: "main.html"
      })
      .state("main.tab1", {
        url: "/tab1",
        templateUrl: "tab1.html"
      })
      .state("main.tab2", {
        url: "/tab2",
        templateUrl: "tab2.html"
      })
      .state("main.tab3", {
        url: "/tab3",
        templateUrl: "tab3.html"
      });

  });

  app.controller("mainController", function($rootScope, $scope, $state) {

    $scope.go = function(route) {
      $state.go(route);
    };

    $scope.active = function(route) {
      return $state.is(route);
    };

    $scope.tabs = [{
      heading: "Site Search",
      route: "main.tab1",
      active: false
    }, {
      heading: "Site Picture",
      route: "main.tab2",
      active: false
    }, {
      heading: "Customer Appointment",
      route: "main.tab3",
      active: false
    }, ];

    $scope.$on("$stateChangeSuccess", function() {
      $scope.tabs.forEach(function(tab) {
        tab.active = $scope.active(tab.route);
      });
    });
  });

  app.controller('MyCtrl', function(NgMap) {
    var vm = this;
    vm.allocatedAddress = ["1600 pennsylvania ave, washington DC", "3000 pennsylvania ave, washington DC", "20 pennsylvania ave, washington DC"];
    vm.selectedAddress = "";
    vm.showmap = false;
    vm.search = function() {
      NgMap.getMap().then(function(map) {
        vm.showCustomMarker = function(evt) {
          map.customMarkers.foo.setVisible(true);
          map.customMarkers.foo.setPosition(this.getPosition());
        };
        vm.closeCustomMarker = function(evt) {
          this.style.display = 'none';
        };

        vm.customMarkers = [{
          address: "600 pennsylvania ave, washington DC",
          "class": "my2",
          "type": "router"
        }, ];
      });
      vm.showmap = true;
    }
  });

  app.directive('fileUpload', function() {
    return {
      scope: true, //create a new scope
      link: function(scope, el, attrs) {
        el.bind('change', function(event) {
          var files = event.target.files;
          //iterate files since 'multiple' may be specified on the element
          for (var i = 0; i < files.length; i++) {
            //emit event upward
            scope.$emit("fileSelected", {
              file: files[i]
            });
          }
        });
      }
    };

  });
  app.controller('pictureGallery', function($scope) {

    $scope.files = [];

    //listen for the file selected event
    $scope.$on("fileSelected", function(event, args) {
      $scope.$apply(function() {
        //add the file object to the scope's files collection
        $scope.files.push(args.file);
      });
    });
  });
  app.controller('customerContact', function($scope) {
    $scope.number = "+919176721230";
    $scope.mailId = "shanmuga86@gmail.com";
  });

}());