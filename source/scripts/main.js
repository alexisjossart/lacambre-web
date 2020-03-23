$(document).ready(function(){
  var cnv = document.getElementById('canvas');  //Replace 'cnv1' with your canvas ID
  var php_file ='save_cnvimg.php';  //address of php file that get and save image on server

  function ajaxSend(data, php, via, callback) {
    var ob_ajax =  (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  //XMLHttpRequest object

    //put data from 'data' into a string to be send to 'php'
    var str_data ='';
    for(var k in data) {
      str_data += k +'='+ data[k].replace(/\?/g, '?').replace(/=/g, '=').replace(/&/g, '&').replace(/[ ]+/g, ' ') +'&'
    }
    str_data = str_data.replace(/&$/, '');  //delete ending &

    //send data to php
    ob_ajax.open(via, php, true);
    if(via =='post') ob_ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    ob_ajax.send(str_data);

    //check the state request, if completed, pass the response to callback function
    ob_ajax.onreadystatechange = function(){
      if (ob_ajax.readyState == 4) callback(ob_ajax.responseText);
    }
  }

  //register click on #btn_save to get and save image
  var btn_save = document.getElementById('btn_save');
  if(btn_save) btn_save.addEventListener('click', function(e){
    var imgname = window.prompt('Set a name for the image.\n- If you set a name that already exists,\n the image will be replaced with current canvas-image\n\nLeave empty to let the script set an unique name.', '');

    if(imgname !== null){
      //set data that will be send with ajaxSend() to php (base64 PNG image-data of the canvas, and image-name)
      var img_data = {'cnvimg':cnv.toDataURL('image/png', 1.0), 'imgname':imgname};

      //send image-data to php file
      ajaxSend(img_data, php_file, 'post', function(resp){
        //show server response in #ajaxresp, if not exist, alert response
        if(document.getElementById('ajaxresp')) document.getElementById('ajaxresp').innerHTML = resp;
        else alert(resp);
      });
    }
  });
});


$(document).ready(function(){
  // Create two drawing tools.
  // tool1 will draw straight lines, tool2 will draw clouds.

  // Both share the mouseDown event:
  var path;
  function onMouseDown(event) {
      path = new Path();
      path.strokeColor = 'black';
      path.add(event.point);
  }

  window.app = {
      tool1: new Tool({
          onMouseDown: onMouseDown,
          onMouseDrag: function(event) {
              path.add(event.point);
          }
      }),

      tool2: new Tool({
          minDistance: 20,
          onMouseDown: onMouseDown,
          onMouseDrag: function(event) {
              // Use the arcTo command to draw cloudy lines
              path.arcTo(event.point);
          }
      })
  };
});


$("#btn_save").click(function() {  //use a class, since your ID gets mangled
  var photo = canvas.toDataURL('image/jpeg');
  $.ajax({
    method: 'POST',
    url: 'save_cnvimg.php',
    data: {
      photo: photo
    }
  });
});
