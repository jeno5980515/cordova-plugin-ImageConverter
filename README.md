# cordova-plugin-ImageConverter
This plugin is designed to convert 3 type of images among webview, base64 and bitmap to another.

# Support
*   Android

# Installation
```
$ cordova plugin add https://github.com/jeno5980515/cordova-plugin-ImageConverter
```

# Example
```javascript
document.addEventListener('deviceready', function () {
	function getBase64Callback(base64){
		alert(base64);
	}

	window.plugins.imageconveter.webViewToBitmap({
		url : "https://www.google.com.tw/images/branding/googleg/1x/googleg_standard_color_128dp.png" ,
		name : "test" ,
		getBase64 : true 
	},successCallback,errorCallback,getBase64Callback);

	function successCallback(message){
		alert(message);
		window.plugins.imageconveter.bitmapToBase64({
				name : "test" ,
				type : "PNG" ,   //JPEG
				quality : 100 ,
				isPrefix : true 
			},
			function(base64){
				alert(base64);
			},
			function(err){
				alert(err);
			}
		);
	}

	function errorCallback(err){
		alert(err);
	}
});
``` 
# ToDo
*   iOS
*   FILE_URI
