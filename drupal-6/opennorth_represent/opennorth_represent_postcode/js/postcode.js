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
  * $.OpenNorth.Represent.postcode(POSTCODE);
  * 
  **/


(function($){	
	$.OpenNorth.Represent.postcode = function(postcode){
		console.log('postcode! ' + postcode);

		if (postcode.length > 0){
			postcode = postcode.replace(/\s+/gi,'').toUpperCase();
			call = 'postcodes/' + postcode;
			$.OpenNorth.Represent(call, {}, $.OpenNorth.Represent.postcode.findMPCentroid);
		}
	}

	$.OpenNorth.Represent.postcode.findMPCentroid = function (data){
		console.log('Looking...');
		if ($.isArray(data.representatives_centroid)){

			var representative_centroid;

			$.each(data.representatives_centroid, function (key, centroid){
				if (centroid.elected_office == 'MP'){
					representative_centroid = centroid;
					console.log("Found them in " + key);
					return false;
				}
			});

		}
		console.log(representative_centroid);
	}

	$.OpenNorth.Represent.postcode.log = function (data){
		console.log(data);
	}


})(jQuery);