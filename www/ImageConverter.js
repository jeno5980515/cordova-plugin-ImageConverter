var PLUGIN_NAME = "ImageConverter";

function ImageConverter(){

}

ImageConverter.prototype.webViewToBase64 = function(url,successCallback, errorCallback) {
	try {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'blob';
		xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
				successCallback(reader.result);
			}
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.send();
	} catch(err){
		errorCallback(err);
	}
};

ImageConverter.prototype.base64ToBitmap = function(data,successCallback, errorCallback) {
	var name = data.name ;
	var base64 = data.base64 ;
	if ( name === undefined ){
		return errorCallback("name is undefined.");
	} else if ( url === undefined ){
		return errorCallback("base64 is undefined.");
	} else {
		var params = [name,base64];
		cordova.exec(successCallback, errorCallback, PLUGIN_NAME, "base64ToBitmap", params);
	}
};

ImageConverter.prototype.webViewToBitmap = function(data,successCallback, errorCallback,getBase64Callback) {
	var name = data.name ;
	var url = data.url ;
	var getBase64 = data.getBase64 || true ;
	if ( name === undefined ){
		return errorCallback("name is undefined.");
	} else if ( url === undefined ){
		return errorCallback("url is undefined.");
	} else {
		try {
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onload = function() {
				var reader = new FileReader();
				reader.onloadend = function() {
					var params = [name,reader.result];
					if ( getBase64 ){
						getBase64Callback(reader.result);
					}
					cordova.exec(successCallback, errorCallback, PLUGIN_NAME, "base64ToBitmap", params);
				}
				reader.readAsDataURL(xhr.response);
			};
			xhr.open('GET', url);
			xhr.send();
		} catch(err){
			errorCallback(err);
		}
	}
};

ImageConverter.prototype.bitmapToBase64 = function(data,successCallback, errorCallback ) {
	var name = data.name ;
	var type = data.type || "PNG" ;
	var quality = data.quality || 100 ;
	var isPrefix = data.isPrefix || true ; 
	if ( name === undefined ){
		return errorCallback("name is undefined.");
	} else {
		var params = [name,type,quality,isPrefix]
		cordova.exec(successCallback, errorCallback, PLUGIN_NAME, "bitmapToBase64", params );
	}
};

ImageConverter.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.imageconveter = new ImageConverter();
  return window.plugins.imageconveter;
};

cordova.addConstructor(ImageConverter.install);
