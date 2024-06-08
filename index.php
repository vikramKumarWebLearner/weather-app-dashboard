<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8">
    <title>Weather App Project</title>
    <link rel="stylesheet" href="custom.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css" integrity="sha512-10/jx2EXwxxWqCLX/hHth/vu2KY3jCF70dCQB8TSgNjbCVAC/8vai53GfMDrO2Emgwccf2pJqxct9ehpzG+MTw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>

<body >
    <header class="bg-success text-center py-3">
        <h1 class="fw-bold h3 text-white my-1">Weather Dashboard</h1>
    </header>
    <div class="container-fluid my-4 weather-data">
        <div class="row">
            <div class="col-xxl-3 col-md-4 px-lg-4">
                <h5 class="fw-bold">Enter a City Name</h5>
                <form id="weatherForm">
                    <input type="text" id="city-input" class="py-2 form-control"
                        placeholder="E.g., New York, London, Tokyo">
                    <button id="search-btn" class="btn btn-success py-2 w-100 mt-3 mb-2">Search</button>
                </form>
                <div class="toggle_button">
                <button class="toggle-btn mb-3 mt-2" onclick="toggleButton()">Metric: °C, m/s</button>
                </div>
                <div id="loadMap">
                <div id="map"  style="height:400px;margin-bottom:10px;"></div>
                </div>
              
            </div>
            <div class="col-xxl-9 col-md-8 mt-md-1 mt-4 pe-lg-4">
                <div class="current-weather bg-success text-white py-2 px-4 rounded-3">
                    <div class="mt-3 d-flex justify-content-between">
                        <div>
                            <h3 class="fw-bold">_______ ( ______ )</h3>
                            <h6 class="my-3 mt-3">Temperature: __°C</h6>
                            <h6 class="my-3">Wind: __ M/S</h6>
                            <h6 class="my-3">Humidity: __%</h6>
                            <h6 class="my-3">Sunrise:</h6>
                            <h6 class="my-3">Sunset:</h6>
                        </div>
                    </div>
                </div>
                <h4 class="fw-bold my-4">5-Day Forecast</h4>
                <div
                    class="days-forecast row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-5 justify-content-between">
                    <div class="col mb-3">
                        <div class="card border-0 bg-secondary text-white">
                            <div class="card-body p-3 text-white">
                                <h5 class="card-title fw-semibold">( ______ )</h5>
                                <h6 class="card-text my-3 mt-3">Temp: __°C</h6>
                                <h6 class="card-text my-3">Wind: __ M/S</h6>
                                <h6 class="card-text my-3">Humidity: __%</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-3">
                        <div class="card border-0 bg-secondary text-white">
                            <div class="card-body p-3 text-white">
                                <h5 class="card-title fw-semibold">( ______ )</h5>
                                <h6 class="card-text my-3 mt-3">Temp: __°C</h6>
                                <h6 class="card-text my-3">Wind: __ M/S</h6>
                                <h6 class="card-text my-3">Humidity: __%</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-3">
                        <div class="card border-0 bg-secondary text-white">
                            <div class="card-body p-3 text-white">
                                <h5 class="card-title fw-semibold">( ______ )</h5>
                                <h6 class="card-text my-3 mt-3">Temp: __°C</h6>
                                <h6 class="card-text my-3">Wind: __ M/S</h6>
                                <h6 class="card-text my-3">Humidity: __%</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-3">
                        <div class="card border-0 bg-secondary text-white">
                            <div class="card-body p-3 text-white">
                                <h5 class="card-title fw-semibold">( ______ )</h5>
                                <h6 class="card-text my-3 mt-3">Temp: __°C</h6>
                                <h6 class="card-text my-3">Wind: __ M/S</h6>
                                <h6 class="card-text my-3">Humidity: __%</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-3">
                        <div class="card border-0 bg-secondary text-white">
                            <div class="card-body p-3 text-white">
                                <h5 class="card-title fw-semibold">( ______ )</h5>
                                <h6 class="card-text my-3 mt-3">Temp: __°C</h6>
                                <h6 class="card-text my-3">Wind: __ M/S</h6>
                                <h6 class="card-text my-3">Humidity: __%</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="javascript.js"></script>
</body>

</html>