angular.module('starter.services', [])

.factory("Proximiio", function() {
  return {
    init: function(outputTriggerCallback, inputTriggerCallback, positionChangeCallback) {
      proximiio.setIDandAuthToken("YOUR_APP_TOKEN", "YOUR_AUTH_TOKEN", null, null);
      proximiio.setDebugOutput(true, null, null);
      proximiio.setOutputTriggerCallback(outputTriggerCallback);
      proximiio.setInputTriggerCallback(inputTriggerCallback);
      proximiio.setPositionChangeCallback(positionChangeCallback);
    }
  };
})
