jsx3.lang.Package.definePackage(
  "downloadlist.service",                //the full name of the package to create
  function(service) {          //name the argument of this function

    //call this method to begin the service call (downloadlist.service.call();)
    service.call = function() {
      var objService = gTorrent.loadResource("Downloadlist_xml");
      objService.setOperation("");

      objService.setEndpointURL(gTorrent.getJSXByName("URI").getValue()+":"+gTorrent.getJSXByName("Port").getValue()+gTorrent.getJSXByName("Mount").getValue());
      objService.setUserName(gTorrent.getJSXByName("UserId").getValue());
      objService.setUserPass(gTorrent.getJSXByName("Password").getValue());

      //subscribe
      objService.subscribe(jsx3.net.Service.ON_SUCCESS, service.onSuccess);
      objService.subscribe(jsx3.net.Service.ON_ERROR, service.onError);
      objService.subscribe(jsx3.net.Service.ON_INVALID, service.onInvalid);

      //PERFORMANCE ENHANCEMENT: uncomment the following line of code to use XSLT to convert the server response to CDF (refer to the API docs for jsx3.net.Service.compile for implementation details)
      //objService.compile();

      //call the service
      objService.doCall();
    };

    service.onSuccess = function(objEvent) {
      //var responseXML = objEvent.target.getInboundDocument();
     gTorrent.getJSXByName("matrix1").repaint(); 
    };

    service.onError = function(objEvent) {
      var myStatus = objEvent.target.getRequest().getStatus();
      objEvent.target.getServer().alert("Error","The service call failed. The HTTP Status code is: " + myStatus);
    };

    service.onInvalid = function(objEvent) {
      objEvent.target.getServer().alert("Invalid","The following message node just failed validation:\n\n" + objEvent.message);
    };

  }
);

