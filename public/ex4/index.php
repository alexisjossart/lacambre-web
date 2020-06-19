<!DOCTYPE HTML>
<html lang="fr">

	<head>

		<!-- BASIC -->
		<meta charset="utf-8">
		<title>Alexis Jossart — Lacambre web index</title>
		<meta name="description" content="Etienne Ozeray Exo">
		<meta name="author" content="Alexis Jossart">
		<meta name="keywords" content=""/>

		<!-- MOBILE -->
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

		<!-- CSS -->
		<link rel="stylesheet" type="text/css" href="../assets/styles/main.min.css">

		<!-- FAVICON -->
		<link rel="icon" href="images/favicon.png">

		<!-- SCRIPTS -->
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

		<script type="text/javascript">
		function geoFindMe() {

			var output = document.getElementById("out");
		  if (!navigator.geolocation) {
		    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		    return;
		  }

		  function success(position) {
		    var latitude = position.coords.latitude;
		    var longitude = position.coords.longitude;

				document.getElementById("name").value = latitude;
				document.getElementById("gender").value = longitude;

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
		</script>

	</head>

			<?php
			 $message = '';
			 $error = '';
			 if(isset($_POST["submit"]))
			 {
			      if(empty($_POST["name"]))
			      {
			           $error = "<label class='text-danger'>Enter Name</label>";
			      }
			      else if(empty($_POST["gender"]))
			      {
			           $error = "<label class='text-danger'>Enter Gender</label>";
			      }
			      else if(empty($_POST["designation"]))
			      {
			           $error = "<label class='text-danger'>Enter Designation</label>";
			      }
			      else
			      {
			           if(file_exists('employee_data.json'))
			           {
			                $current_data = file_get_contents('employee_data.json');
			                $array_data = json_decode($current_data, true);
			                $extra = array(
			                     'name'               =>     $_POST['name'],
			                     'gender'          =>     $_POST["gender"],
			                     'designation'     =>     $_POST["designation"]
			                );
			                $array_data[] = $extra;
			                $final_data = json_encode($array_data);
			                if(file_put_contents('employee_data.json', $final_data))
			                {
			                     $message = "<label class='text-success'>File Appended Success fully</p>";
			                }
			           }
			           else
			           {
			                $error = 'JSON File not exits';
			           }
			      }
			 }
			 ?>






		<body class="ex4-body" onload="geoFindMe()">

			<div class="introduction">
					<img src="../assets/images/covshit-logo.svg" class="covshit-logo">
			</div>

			<span class="house"></span>

				 <div class="header">
							<form method="post">

									 <?php
									 if(isset($error))
									 {
												echo $error;
									 }
									 ?>

									 <div class="header-container">
										 <div id="out"></div>
										 <input id="name" type="text" name="name" placeholder="Lattitude" class="form-control" /><br />
										 <input id="gender" type="text" name="gender" placeholder="Longitude" class="form-control" /><br />
										 <input type="text" name="designation" placeholder="Place" class="form-control" /><br />
										 <input type="submit" name="submit" value="Append" class="btn-submit" /><br />

										 <?php
										 if(isset($message))
										 {
													echo $message;
										 }
										 ?>

									</div>

							</form>
				 </div>

				<div id="myData"></div>
				<script>
				fetch('employee_data.json')
						.then(function (response) {
								return response.json();
						})
						.then(function (data) {
								appendData(data);
						})
						.catch(function (err) {
								console.log('error: ' + err);
						});
				function appendData(data) {
						var mainContainer = document.getElementById("myData");
						var mapWidth = 1000;
						var mapHeight = 446;

						for (var i = 0; i < data.length; i++) {
								var div = document.createElement("div");

								var lat = (data[i].name - 50.736) * 1000000;
								var lon = (data[i].gender - 4.699) * 1000000 ;

							//	var y = ((-1 * lat ) + 90) * (mapHeight / 180);
							//	var x = (lon + 180) * (mapWidth / 360);

								$(div).addClass( "point" );
								$(div).css({"left":lat+"px", "top":lon+"px"});
								div.innerHTML = '';
								mainContainer.appendChild(div);
						}
				}
		</script>

	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script type="text/javascript" src="assets/scripts/main.js"></script>

	</body>
</html>
