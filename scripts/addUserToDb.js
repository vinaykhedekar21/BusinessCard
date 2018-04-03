(function(window) {
  "use strict";
  var App = window.App || {};

  function AddUserToDb(regId, db) {
    this.regId = regId;
    this.db = db;
  }
  AddUserToDb.prototype.validateExistingUser = function(exiUser){
    console.log("validating user " + exiUser.username);
    var exUsername;
    var exPassword;
    this.db.get(exiUser.username, function(serverResponse){
      console.log(serverResponse);
      exUsername = serverResponse["0"].Username;
      exPassword = serverResponse["0"].Password;

      if ((exiUser.username == exUsername) && (exiUser.password == exPassword)) {
        document.cookie = "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = exUsername;
            var templatePath = serverResponse["0"].TemplatePath;
            location.href=templatePath;
        }
    });
  }
  AddUserToDb.prototype.registerNewUser = function(newReg) {
    console.log("Register for " + newReg.Username);
    this.db.add(newReg.Username, newReg);
  };

  //update database
  AddUserToDb.prototype.updateUserData = function(user, userData) {
    console.log("Update Data for " + user);
    this.db.update(user, userData);
  };

  AddUserToDb.prototype.updateTemplatePath = function(user, templatePath) {
    console.log("Update template for " + user);
    this.db.updateTempPath(user, templatePath);
  };

  AddUserToDb.prototype.getDataWithKey = function(currentUser,cb) {
    this.db.get(currentUser,function(serverResponse) {
      if(serverResponse.length != 0){
        console.log("The list of comments is :" + serverResponse);
        cb(serverResponse);
      }
    });
  };

  App.AddUserToDb = AddUserToDb;
  window.App = App;
})(window);
