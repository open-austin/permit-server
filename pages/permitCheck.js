$(window).load(function () {
    
    $(document).ready(function () {
		
		var report_data = {historical_district: true, floodplain: true, queried_location:'4112 Ave D'};
		
		$('#submit_address').click(function(){
			var address = $('#street_address').val();
			console.log(address);
			var url = 'https://permit-wiz.herokuapp.com/api/zones?address=4112%20ave%20d';
			$.ajax({
                type: "GET",
                url: url,
                contentType: "application/json",
                dataType: "json",
                
                success: function(response){
					console.log(response);//Response will return {historical_district: <boolean>, floodplain: <boolean>} but doesn't yet
                    report_data = {historical_district: true, floodplain: true, queried_location:'4112 Ave D'};
                },
                error: function (response, textStatus, thrownError){
                    console.log(response, textStatus, thrownError);
                    errors_string = '';
                    errors = jQuery.parseJSON( response.responseText );
                    for (var key in errors) {
                        value = errors[key];
                        errors_string += key + ': ' + value + '\n';
                    };
                    alert("Error " + thrownError + '\n ' + errors_string);
                }
            });
		});
		
		if (fill_report === true){
			$('#address').html(report_data.queried_location);
			
			//floodplain
			console.log(report_data)
			if (report_data.floodplain === true){
				$('#floodplain').html('<p>You are within 150 ft of floodplane.</p><p>It sucks to be you.</p>' );
			}
			else{
				$('#floodplain').html('<p>You are not within 150 ft of floodplane.</p><p>No further action is required before submitting your application.</p>' );
			}
			
			//airport overlay
			//if (report_data.airport_overlay === true){
			//	$('#airport_overlay').html('<p>You are in an aiport overlay zone.</p><p>No further action is required before submitting your application though.</p>' );
			//}
			//else {
			//	$('#airport_overlay').html('<p>You are in not an aiport overlay zone.</p><p>No further action is required before submitting your application.</p>' );
			//}
			
			//historic_district
			if (report_data.historic_district === true){
				$('#historic_district').html('<p>You are in an historic district.</p><p>Further action is required before submitting your application.</p>' );
			}
			else {
				$('#historic_district').html('<p>You are not in an historic district.</p><p>No Further action is required before submitting your application.</p>' );
			}
		}
		
	
	});
});