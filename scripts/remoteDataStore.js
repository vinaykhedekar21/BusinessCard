/*@author:VinayKhedekar.
* This file handles all the API's call including add/update/remove/get data.
*
* 1. POST - add user signup data to database
* 2. PUT - update user data with key as 'UserName'
* 3. DELETE- Delete user data with user name and ID as a Key
* 4. GET - Get user data using usename as a key
*/

(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, value) {
    this.remove(key);
    $.post(this.serverUrl, value, function(serverResponse) {
      console.log(serverResponse);
    });
  };
  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + "?Username=" + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };
  //Update database
  RemoteDataStore.prototype.update = function(key, value) {
    var serverUrl = this.serverUrl;
    this.get(key, function(serverResponse) {
      if (serverResponse.length != 0) {
        console.log(serverResponse);
        var id = serverResponse[0]["id"];
        $.ajax(serverUrl + "/" + id, {
          type: "PUT",
          contentType: "application/json",
          data: JSON.stringify({
            "PhotoPath": value.PhotoPath,
            "Address": value.Address,
            "Occupation": value.Occupation,
            "PersonalInfo": value.PersonalInfo
          }),
          success: function(serverResponse) {
            console.log(serverResponse);
          },
          error: function(xhr) {
            alert(xhr.responseText);
          }
        });
      }
    });
  };

//Insert Template Path
RemoteDataStore.prototype.updateTempPath = function(key, templatePath) {
  var serverUrl = this.serverUrl;
  this.get(key, function(serverResponse) {
    if (serverResponse.length != 0) {
      console.log(serverResponse);
      var id = serverResponse[0]["id"];
      $.ajax(serverUrl + "/" + id, {
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
          "TemplatePath": templatePath
        }),
        success: function(serverResponse) {
          console.log(serverResponse);
        },
        error: function(xhr) {
          alert(xhr.responseText);
        }
      });
    }
  });
};

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };
  //Functon to remove order from deployd
  RemoteDataStore.prototype.remove = function(key) {
    var serverUrl = this.serverUrl;
    this.get(key, function(serverResponse) {
      if (serverResponse.length != 0) {
        console.log(serverResponse);
        var id = serverResponse[0]["id"];
        $.ajax(serverUrl + "/" + id, {
          type: "DELETE"
        });
      }
      console.log("Deleted User=" + key);
    });
  };
  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
