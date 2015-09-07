angular.module('starter.controllers', ['starter.services'])

.controller('DashCtrl', function($scope, $state, Proximiio) {
  console.log("DASH STATE: ", $state, Proximiio);
  $scope.entered = "Discovering...";
  $scope.outputs = [];
  $scope.inputType = "Discovering...";
  $scope.inputObject = "Discovering...";
  $scope.lastPositionLatitude = "Discovering...";
  $scope.lastPositionLongitude = "Discovering...";

  ionic.Platform.ready(function() {
    var outputTriggerCallback = function(outputs, input) {
      console.log("outputTriggerCallback:" + JSON.stringify(outputs, null, 4));
      $scope.outputs = outputs;
      $scope.$apply()
    }

    var inputTriggerCallback = function(input, entered) {
      $scope.entered = entered;
      if (input.type == "iBeacon") {
        $scope.inputType = input.type + "(" + input.name + ")";
      } else {
        $scope.inputType = input.type
      }

      $scope.lastPositionLatitude = input.coordinates.lat;
      $scope.lastPositionLongitude = input.coordinates.lon;
      $scope.inputObject = JSON.stringify(input, null, 4);
      $scope.$apply()
    }

    var positionChangeCallback = function(coords) {
      $scope.lastPositionLatitude = coords.coordinates.lat;
      $scope.lastPositionLongitude = coords.coordinates.lon;
      $scope.$apply()
    }

    Proximiio.init(outputTriggerCallback, inputTriggerCallback, positionChangeCallback);
  });

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
