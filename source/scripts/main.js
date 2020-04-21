// Index
$(document).ready(function(){
    animateDiv('.s-index__link1');
    animateDiv('.s-index__link2');
    animateDiv('.s-index__link3');
});

function makeNewPosition(){

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];

}

function animateDiv(myclass){
    var newq = makeNewPosition();
    $(myclass).animate({ top: newq[0], left: newq[1] }, 1000,   function(){
      animateDiv(myclass);
    });

};

// EX4

$(document).ready(function(){
  function geoFindMe() {

    var output = document.getElementById("out");
    if (!navigator.geolocation) {
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

      var img = new Image();
      img.src = "http://maps.googleapis.com/maps/api/staticmap?zoom=15&size=512x512&markers=icon:http://pngimages.net/sites/default/files/location-png-image-31558.png|" + latitude + "," + longitude + "";
      output.appendChild(img);
    }

    function error() {
      output.innerHTML = "Unable to retrieve your location";
    }

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
  }
}
