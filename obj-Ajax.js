function AjaxObj(url, params, data) {
        this.url = url;            // request url
	this.params = params;      // params string
        this.data = data;          // object data
        this.responseText = null;  // responseText
}

function AjaxRequest(obj, method, readyFunc) {
        var self = this;

        if (window.XMLHttpRequest) {
                        // code for IE7+, Firefox, Chrome, Opera, Safari
                this.xmlhttp = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
                // code for IE6, IE5
                this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else {
                alert("Your browser does not support XMLHTTP!");
        }

        this.xmlhttp.onreadystatechange = function() {
                if (self.xmlhttp.readyState == 4) {
			if (!self.customData) { self.customData = {}; }
                        self.customData.responseText = self.xmlhttp.responseText;
                        readyFunc(self.customData);
                        self.xmlhttp = null;
                }
        }

	if (method == "GET") {
	        //this.xmlhttp.setRequestHeader("Content-Type","application/x-javascript; charset:UTF-8");
                this.xmlhttp.open(method, obj.url +'?' + obj.params + "&sid="+Math.random(), true);
                this.xmlhttp.send(null);
        } else if (method == 'POST') {
                this.xmlhttp.open(method, obj.url, true);

                this.xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                this.xmlhttp.setRequestHeader("Content-length", obj.params.length);
                this.xmlhttp.setRequestHeader("Connection", "close");

                this.xmlhttp.send(obj.params);
        }
}




