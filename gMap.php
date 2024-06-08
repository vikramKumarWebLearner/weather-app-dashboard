<?php
session_start();
require 'vendor/autoload.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
$apiKey = '168e1dd664485f4b46687ec7280f3daf'; // Replace with your actual API key

$data = stripcslashes(file_get_contents("php://input"));
$cityData = json_decode($data, true);
$lat = $cityData['lat'];
$lon = $cityData['lon'];
$body=[];


if(!empty($apiKey)){ 
 // API endpoint for current weather
 $apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lon}&appid={$apiKey}&units=metric";
 
$client = new Client();
try {
    // Make a GET request
   
        $response = $client->request('GET', $apiEndpoint);
        $statusCode = $response->getStatusCode();
        if($statusCode >= 200 && $statusCode < 300){
            // Get the response body as a string
        $body = $response->getBody();
           
        // Process the response
       echo  $body;
    }
   
    
} catch (RequestException $e) {
    // Handle request errors
    $body['error'] = 'city name not found ' ;
    $body['status'] = 'false';
    echo  json_encode($body);
}
   
}else{
    echo "Api key not set";
}
?>
