 var Promise = require('promise');
var momsPromise = new Promise(function(resolve, reject) 
{
  var momsSavings = 200000;
  var priceOfPhone = 60000;
  if (momsSavings > priceOfPhone) 
  {
    resolve({
      brand: "iphone",
      model: "6s"
    });
  } else {
    reject("We donot have enough savings. Let us save some more money.");
  }
});
momsPromise.then(function(value) 
{
  console.log("Hurray I got this phone as a gift ", JSON.stringify(value));
});
momsPromise.catch(function(reason)
 {
  console.log("Mom coudn't buy me the phone because ", reason);
});
momsPromise.finally(function() 
{
  console.log(
    "Irrespecitve of whether my mom can buy me a phone or not, I still love her"
  );
});
