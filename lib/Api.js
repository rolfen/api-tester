'use strict';

/*
 * Testing helper.
 */

var http = require('http');

/*
 * Returns new object containing props from ob1 and obj2. Props from obj2 overwrite those from obj1 on conflict.
 */
var mergeObjects = function(obj1, obj2){
	var keys = Object.keys(obj2).concat(Object.keys(obj1));
	var r = {};
	keys.forEach(function(k){
		r[k] = (obj2[k] !== undefined) ? obj2[k] : obj1[k];
	});
	return(k);
}

/*
 * 
 */
var onSuccess = function(callback){
	var handler = function(res){
		var ret = '';
		res.on('data', function(data){
			ret += data;
		});
		res.on('end', function(){
			try {
				var parsed = JSON.parse(ret);				
			} catch(e) {
				var parsed = ret;
				console.log("Not valid JSON: "+ret);
			}
			callback(parsed);
		});
	}
	return(handler);
}

// generates the api testing function
var apiTester = function(baseOptions) {

	// use closure for default options in api()
	
	var defaultOptions = {
		host: 'localhost',
		port: '80',
		method: "GET",
		headers: {
		    accept: 'application/json',
		    encoding: 'utf-8'
		}
	};
	if(!baseOptions) {
		baseOptions = {};
	}
	var baseOptions = mergeObjects(defaultOptions, baseOptions);

	/*
	 * Boilerplate-light way to call the API
	 * @param urn: The URN (eg: string: /fetchById?id=3&titleHi%20There)
	 * (Todo maybe: array:['fetchById',{id:3,title;"Hi There"}])
	 * @param callback: This callback will be called on success. It takes a single argument: the server response, parse as JSON (whenever possible)
	 * @param options: Optional: Request options, to be passed to the node request object. Mostly useful for {method: 'POST'}
	 * @param data: If method is post then this data will be POSTed (JSON and UTF-8)
	 */
	var api = function(urn, callback, options, data){
		var opt = (typeof options === 'object') ? options : {};
		opt.path = urn;
		var req = http.request(
			mergeObjects(baseOptions, opt),
			onSuccess(callback)
		)
		if(opt.method && opt.method.toLowerCase() === 'post') {
			req.write(JSON.stringify(data), 'utf-8', function(){
				req.end();			
			})
		} else {
			req.end();		
		}
	}

	return api;
}

module.exports = apiTester;
