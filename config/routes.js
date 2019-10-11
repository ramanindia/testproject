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
  var cargo = require('../app/controllers/cargo');
  var accountGroup = require('../app/controllers/account_group');
  var vehicleType = require('../app/controllers/vehicle_type');
  var vehicleGroup = require('../app/controllers/vehicle_group');
  var fromDestination = require('../app/controllers/from_destinations');
  var bank = require('../app/controllers/bank');
  var vehicle = require('../app/controllers/Vehicle');
  var driver = require('../app/controllers/driver');
  var account = require('../app/controllers/account');
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
	   app.get('/users/CheckUniqueNameMultilevel',user.loggedIn,user.CheckMultiLevelUniqueName);
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
	 
	  //cargos routing
	  app.all('/cargos/add-cargo',user.loggedIn,parseForm,csrfProtection,cargo.addCargo);
	  app.post('/cargos/change-status',user.loggedIn,parseForm,csrfProtection,cargo.changeStatus);
	  app.all('/cargos/edit/:recordId',user.loggedIn,parseForm,csrfProtection,cargo.CargoEdit);
	   app.all('/cargos/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,cargo.deleteRecord);
	  app.get('/cargos/:CountrySlug',user.loggedIn,parseForm,csrfProtection,cargo.allCargos);
	  
	   //account group routing
	  app.all('/account-groups/add-group',user.loggedIn,parseForm,csrfProtection,accountGroup.addGroup);
	  app.post('/account-groups/change-status',user.loggedIn,parseForm,csrfProtection,accountGroup.changeStatus);
	  app.all('/account-groups/edit/:recordId',user.loggedIn,parseForm,csrfProtection,accountGroup.GroupEdit);
	   app.all('/account-groups/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,accountGroup.deleteRecord);
	  app.get('/account-groups/:CountrySlug',user.loggedIn,parseForm,csrfProtection,accountGroup.allGroup);
	  
	   //Vehicle type routing
	  app.all('/vehicle-types/add-type',user.loggedIn,parseForm,csrfProtection,vehicleType.addType);
	  app.post('/vehicle-types/change-status',user.loggedIn,parseForm,csrfProtection,vehicleType.changeStatus);
	  app.all('/vehicle-types/edit/:recordId',user.loggedIn,parseForm,csrfProtection,vehicleType.TypeEdit);
	   app.all('/vehicle-types/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,vehicleType.deleteRecord);
	  app.get('/vehicle-types/:CountrySlug',user.loggedIn,parseForm,csrfProtection,vehicleType.allType);
	  
	   //Vehicle group routing
	  app.all('/vehicle-groups/add-group',user.loggedIn,parseForm,csrfProtection,vehicleGroup.addGroup);
	  app.post('/vehicle-groups/change-status',user.loggedIn,parseForm,csrfProtection,vehicleGroup.changeStatus);
	  app.all('/vehicle-groups/edit/:recordId',user.loggedIn,parseForm,csrfProtection,vehicleGroup.GroupEdit);
	   app.all('/vehicle-groups/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,vehicleGroup.deleteRecord);
	  app.get('/vehicle-groups/:CountrySlug',user.loggedIn,parseForm,csrfProtection,vehicleGroup.allGroup);
	  
	  
	  
	  //Vehicle  routing
	  
		//strat vehicle rto routing
	      app.all('/vehicles/rto/:recordId',user.loggedIn,parseForm,csrfProtection,vehicle.VehicleRto);
		app.post('/vehicles/change-rto-status',user.loggedIn,parseForm,csrfProtection,vehicle.changeRtoStatus);
        app.all('/vehicles/rto-edit/:recordId/:driverId',user.loggedIn,parseForm,csrfProtection,vehicle.VechileRtoEdit);
        app.all('/vehicles/delete-rto-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,vehicle.deleteRtoRecord);
	    //end vehicle rto routing 
		
	     //strat vehicle drivers routing
	    app.all('/vehicles/driver/:recordId',user.loggedIn,parseForm,csrfProtection,vehicle.VehicleDriver);
		app.post('/vehicles/change-driver-status',user.loggedIn,parseForm,csrfProtection,vehicle.changeDriverStatus);
        app.all('/vehicles/driver-edit/:recordId/:driverId',user.loggedIn,parseForm,csrfProtection,vehicle.VechileDriverEdit);
        app.all('/vehicles/delete-driver-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,vehicle.deleteDriverRecord);
	    //end vehicle drivers routing 
		
	  app.all('/vehicles/add-vehicle',user.loggedIn,parseForm,csrfProtection,vehicle.addVehicle);
	  app.post('/vehicles/change-status',user.loggedIn,parseForm,csrfProtection,vehicle.changeStatus);
	  app.all('/vehicles/edit/:recordId',user.loggedIn,parseForm,csrfProtection,vehicle.VehicleEdit);
	  app.all('/vehicles/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,vehicle.deleteRecord);
	  app.get('/vehicles/:CountrySlug',user.loggedIn,parseForm,csrfProtection,vehicle.allVehicles);
	  
	 
	  //from_destinations routing
	  app.all('/from-destinations/add-from-destination',user.loggedIn,parseForm,csrfProtection,fromDestination.AddFromDestinationCity);
	  app.post('/from-destinations/change-status',user.loggedIn,parseForm,csrfProtection,fromDestination.changeStatus);
	  app.all('/from-destinations/edit/:recordId',user.loggedIn,parseForm,csrfProtection,fromDestination.FromDestinationsEdit);
	   app.all('/from-destinations/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,fromDestination.deleteRecord);
	  app.get('/from-destinations/:PageSlug',user.loggedIn,parseForm,csrfProtection,fromDestination.allFromDestinations);
	 
	   //bank routing
	  app.all('/banks/add-bank',user.loggedIn,parseForm,csrfProtection,bank.AddBank);
	  app.post('/banks/change-status',user.loggedIn,parseForm,csrfProtection,bank.changeStatus);
	  app.all('/banks/edit/:recordId',user.loggedIn,parseForm,csrfProtection,bank.BankEdit);
	  app.all('/banks/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,bank.deleteRecord);
	  app.get('/banks/:PageSlug',user.loggedIn,parseForm,csrfProtection,bank.allBanks);
	  
	  
	   //driver routing
	  app.all('/drivers/add-driver',user.loggedIn,parseForm,csrfProtection,driver.AddDriver);
	  app.post('/drivers/change-status',user.loggedIn,parseForm,csrfProtection,driver.changeStatus);
	  
	   app.post('/drivers/change-licence-status',user.loggedIn,parseForm,csrfProtection,driver.changeLicenceStatus);
	   
	  app.all('/drivers/edit/:recordId',user.loggedIn,parseForm,csrfProtection,driver.DriverEdit);
	  
	    app.all('/drivers/licence-edit/:recordId/:driverId',user.loggedIn,parseForm,csrfProtection,driver.DriverLicenseEdit);
	
	
	  app.all('/drivers/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,driver.deleteRecord);
	 
	 app.all('/drivers/delete-licence-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,driver.deleteLicenseRecord);
	
	app.get('/drivers/:PageSlug',user.loggedIn,parseForm,csrfProtection,driver.allDrivers);
	  
	    app.all('/drivers/licence/:recordId',user.loggedIn,parseForm,csrfProtection,driver.Licence);
		
	  
	   //account routing
	  app.all('/accounts/add-account',user.loggedIn,parseForm,csrfProtection,account.AddAccount);
	  app.post('/accounts/change-status',user.loggedIn,parseForm,csrfProtection,account.changeStatus);
	  app.all('/accounts/edit/:recordId',user.loggedIn,parseForm,csrfProtection,account.AccountEdit);
	  app.all('/accounts/delete-record/:deleteRecordId',user.loggedIn,parseForm,csrfProtection,account.deleteRecord);
	  app.get('/accounts/:PageSlug',user.loggedIn,parseForm,csrfProtection,account.allAccounts);
	  
	  
	  
}
