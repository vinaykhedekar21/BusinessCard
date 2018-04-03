/*@author:VinayKhedekar.
* Main javascript for all the modules. It has all selector and event handler.
* Contains logic to dynamically render user data for respective users
* 1. user signUp selector for handling user sign-in events.
* 2. handlers for existing and new users
* 3. Dynamically retrive template data for user from database.
* 4. Remote data store 'Deployd' interface 
*/
(function(window) {
  "use strict";
  var SIGNIN_SELECTOR = "[user-signin-data='form']";
  var SIGNUP_SELECTOR = "[user-signup-data='form']";
  var TEMPLATE1_SELECTOR = "[data-template1=\"form\"]";
  var TEMPLATE2_SELECTOR = "[data-template2=\"form\"]";
  var MAIN_TEMPLATE_SELECTOR = "[template-selector='form']";
  //var USER_DATA = "[user-additional-data='form']";

  //var SERVER_URL = "http://localhost:2403/userdata";
  var SERVER_URL = "http://localhost:2403/usersignupdata";
  var App = window.App;
  var $ = window.jQuery;
  var AddUserToDb = App.AddUserToDb;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var addUser = new AddUserToDb("reg_111", remoteDS);
  window.addUser = addUser;

  //on load main templates
  $(MAIN_TEMPLATE_SELECTOR).ready(function() {
      var currentUser = document.cookie;
    //alert('currentUser='+currentUser);
    console.log("Main Template on-load");
    var params = window.location.search.split("?")[1];
    var PhotoPath = decodeURIComponent(params.split("=")[1].split("&")[0]);
    var Address = decodeURIComponent(params.split("=")[2].split("&")[0]);
    var Address = Address.replace(/[+]/g, '  ');
    var Occupation = decodeURIComponent(params.split("=")[3].split("&")[0]);
    var Occupation = Occupation.replace(/[+]/g, '  ');
    var PersonalInfo = decodeURIComponent(params.split("=")[4]);
    var PersonalInfo = PersonalInfo.replace(/[+]/g, '  ');

    var data = {
      "PhotoPath": PhotoPath,
      "Address": Address,
      "Occupation": Occupation,
      "PersonalInfo": PersonalInfo
    }
    //call update method
    addUser.updateUserData.call(addUser, currentUser, data);
  });
  //on load of template1
  $(TEMPLATE1_SELECTOR).ready(function() {
    var currentUser = document.cookie;
    console.log("Template1 on-load");
    //var templatePath = window.location.pathname;
    var templatePath = location.pathname.substr(0);
    //if (templatePath != "/") {
    if(templatePath.startsWith("/templates")){
      //alert('templatePath='+templatePath);
      addUser.updateTemplatePath.call(addUser, currentUser, templatePath);
    }
    addUser.getDataWithKey.call(addUser, currentUser, function(serverResponse) {

      var FirstName = serverResponse["0"].FirstName;
      var LastName = serverResponse["0"].LastName;
      var Email = serverResponse["0"].Email;
      var PhoneNumber = serverResponse["0"].PhoneNumber;
      var username = serverResponse["0"].Username;
      var PhotoPath = serverResponse["0"].PhotoPath;
      var Address = serverResponse["0"].Address;
      var Occupation = serverResponse["0"].Occupation;
      var PersonalInfo = serverResponse["0"].PersonalInfo;
      var username = FirstName+" "+LastName;
      var address = Address +"      |    "+PhoneNumber + "     |     " +"Email - "+Email;
      $("#userName").text(username);
      $("#address").text(address);
      $("#emailId").text(Email);
      $("#PersonalInfo").text(PersonalInfo);
    });
  });

//code for template2
$(TEMPLATE2_SELECTOR).ready(function() {
  //alert('Template2 loaded');
  var currentUser = document.cookie;
  //alert('Inside template2='+currentUser);
  console.log("Template2 on-load");
  var templatePath = location.pathname.substr(0);
  if(templatePath.startsWith("/templates")){
    //alert('templatePath='+templatePath);
    addUser.updateTemplatePath.call(addUser, currentUser, templatePath);
  }
  addUser.getDataWithKey.call(addUser, currentUser, function(serverResponse) {

    var FirstName = serverResponse["0"].FirstName;
    var LastName = serverResponse["0"].LastName;
    var Email = serverResponse["0"].Email;
    var PhoneNumber = serverResponse["0"].PhoneNumber;
    var username = serverResponse["0"].Username;
    var PhotoPath = serverResponse["0"].PhotoPath;
    var Address = serverResponse["0"].Address;
    var Occupation = serverResponse["0"].Occupation;
    var PersonalInfo = serverResponse["0"].PersonalInfo;
    var username = FirstName+" "+LastName;
    $("#userName").text(username);
    $("#Address").text(Address);
      $("#Email").text(Email);
    $("#Occupation").text(Occupation);
    $("#PhoneNumber").text(PhoneNumber);
  });
});
  var signinHandler = new FormHandler(SIGNIN_SELECTOR);
  var signupHandler = new FormHandler(SIGNUP_SELECTOR);
  //var userAdditionalData = new FormHandler(USER_DATA);

  signinHandler.addSubmitHandler(function(data) {
    if (data.username != "" && data.password != "") {
      addUser.validateExistingUser.call(addUser, data);
    }
  });
  signupHandler.addSubmitHandler(function(data) {
    //$.cookie("username", data.username);
    //var currentUser=
    addUser.registerNewUser.call(addUser, data);
    //redirect to userData
    location.href = "userdata.html?username=" + data.Username;

  });

})(window);
