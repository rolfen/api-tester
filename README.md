# api-tester
Simple node http request helper

### Dependencies

Not much, really. Vanilla node.js.

### Getting Started
    var apiTester = require("lib/Api.js");
    // apiTester accepts an options object (containing configuration options) as optional argument
    var api = apiTester();

### Api.js

Provides a helper function for making requests to a web API.

POST Example:

    api('/updateRecipe?id=3', function(response){
        // Do something with the server response. It will normally be a parsed JSON object.
      },{method:'POST'},{
        // send this object as post values
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
