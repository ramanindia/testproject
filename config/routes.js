'use strict';

/**
 * call controllers
 */
 
 var user = require('../app/controllers/user');
 var country = require('../app/controllers/country');
 var state = require('../app/controllers/state');
 var district = require('../app/controllers/district');
  var ajax = require('../app/controllers/ajax');
    var city = require('../app/controllers/city');
/**
 * set url 
 */
module.exports = function (app)
 {
	 
	 //ajax data routing
	  app.post('/ajax/getlisting',user.loggedIn,ajax.getData);
	 
	 
     app.all('/users/login',user.notloggedIn,parseForm,csrfProtection,user.userLogin);
	 app.get('/',user.loggedIn,user.userDashboard);
	 app.get('/users/logout',user.loggedIn,parseForm,csrfProtection,user.logout);
	 app.all('/users/add-user',user.loggedIn,parseForm,csrfProtection,user.addUser);
	 app.post('/users/change-status',user.loggedIn,parseForm,csrfProtection,user.changeStatus);
	 app.all('/users/edit/:userId',user.loggedIn,parseForm,csrfProtection,user.userEdit);
	 app.get('/users/checkUniqueUsername',user.loggedIn,user.checkUsernameExits);
	 app.get('/users/checkUniqueEmail',user.loggedIn,user.checkEmailExits);
	  app.get('/users/CheckUniqueName',user.loggedIn,user.CheckUniqueName);
	 app.get('/users/:UsersSlug',user.loggedIn,parseForm,csrfProtection,user.allUsers);
	 
	 //coutries routing
	  app.all('/countries/add-country',user.loggedIn,parseForm,csrfProtection,country.addCountry);
	  app.post('/countries/change-status',user.loggedIn,parseForm,csrfProtection,country.changeStatus);
	  app.all('/countries/edit/:recordId',user.loggedIn,parseForm,csrfProtection,country.countryEdit);
	   app.all('/countries/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,country.deleteRecord);
	  app.get('/countries/:CountrySlug',user.loggedIn,parseForm,csrfProtection,country.allCountries);
	  
	  //states routing
	  app.all('/states/add-state',user.loggedIn,parseForm,csrfProtection,state.addState);
	  app.post('/states/change-status',user.loggedIn,parseForm,csrfProtection,state.changeStatus);
	  app.all('/states/edit/:recordId',user.loggedIn,parseForm,csrfProtection,state.stateEdit);
	   app.all('/states/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,state.deleteRecord);
	  app.get('/states/:StateSlug',user.loggedIn,parseForm,csrfProtection,state.allStates);
	  
	   //districts routing
	  app.all('/districts/add-district',user.loggedIn,parseForm,csrfProtection,district.addDistrict);
	  app.post('/districts/change-status',user.loggedIn,parseForm,csrfProtection,district.changeStatus);
	  app.all('/districts/edit/:recordId',user.loggedIn,parseForm,csrfProtection,district.DistrictEdit);
	   app.all('/districts/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,district.deleteRecord);
	  app.get('/districts/:PageSlug',user.loggedIn,parseForm,csrfProtection,district.allDistricts);
	 
	 //cities routing
	  app.all('/cities/add-city',user.loggedIn,parseForm,csrfProtection,city.addCity);
	  app.post('/cities/change-status',user.loggedIn,parseForm,csrfProtection,city.changeStatus);
	  app.all('/cities/edit/:recordId',user.loggedIn,parseForm,csrfProtection,city.CityEdit);
	   app.all('/cities/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,city.deleteRecord);
	  app.get('/cities/:PageSlug',user.loggedIn,parseForm,csrfProtection,city.allCities);
	 
}
