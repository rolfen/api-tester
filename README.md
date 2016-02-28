# api-tester
Simple node http request helper

### Getting Started
    var apiTester = require("lib/Api.js");
    // apiTester accepts an options object (containing configuration options) as optional argument
    var api = apiTester();

### Api.js

Provides a helper function for sending requests to an API, supposedly for testing.

POST Example:

    api('/updateRecipe?id=3', function(response){
        // Do something with the server response. It will normally be a parsed JSON object.
      },{method:'POST'},{
        // Update these recipe properties
        title:"New Veggie" 
      }
    );

If not specified, method will default to GET:


    api('/fetchById?id=4', function(response){
       // Do somethin with the server response.
    });

For more details feel free to look at the comments inside files.

### ToDo

Tests and examples
