function initMap() {
    var libraryLocation = {lat: 49.841870, lng: 24.032773};
    var map = new google.maps.Map(
        document.getElementById('google-map-frame'),
        {
            zoom: 18,
            center: libraryLocation
        }
    );
    var marker = new google.maps.Marker({position: libraryLocation, map: map});
}
