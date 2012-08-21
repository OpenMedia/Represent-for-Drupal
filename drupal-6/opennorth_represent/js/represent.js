/**
 * Queries via JSONP opennorth.ca 's API. 
 * API Info: http://represent.opennorth.ca/api/
 *
 * 
 * Copyright (C) 2012 Floyd Mann
 *
 * This program is free software; you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by the 
 * Free Software Foundation; either version 2 of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU General Public License for more details.
 *
 * Author's email: floyd.mann@gmail.com 
 **/
 
 /**
  * Usage:
  * $.OpenNorth.Represent("somecall", {some_parameter1:'foo', some_parameter2:'bar'}, callback);
  * 
  * The callback method takes 1 or 2 arguments. If it returns succesfully, then the only argument that is passed
  * to the callback method is an object literal (JSONP) result. If the first argument ever returns 'false', then
  * you know there was an error and to check the second argument for a string that reports the error.
  **/


(function($){
	var settings = {
		'url'    : 'http://represent.opennorth.ca',
		'format' : 'jsonp'
	}
	
	var methods = {
		configure : function(newSettings){
			$.extend(settings, newSettings);
		},
		callApi : function(call, parameters, callback){
			
			$.ajax({
				url      : settings['url'] + '/' + call,
				data     : parameters,
				dataType : 'jsonp',
				
				success  : function(data){
					if (callback){
						if (data.error){
						    //return false if there's an error
							callback(false, data.error);
						} else {
							callback(data);
						}
					}
				},
				
				error    : function(jqXHR, textStatus, errorThrown){
					if (callback){
						if (textStatus){
							//returns false if there's an error.
							callback(false, textStatus);
						}
					}
				}
			})
			
		}
	}
	
	var validCalls = ['representative','postcodes'];
	
	$.OpenNorth = {};

	$.OpenNorth.Represent = function(call, parameters, callback){

		if (call == 'configure'){
			methods.configure(parameters);
			return;
		}
		if ($.inArray(call, validCalls) && parameters && $.isFunction(callback)){
			methods.callApi(call, parameters, callback);
		}
	}
})(jQuery);