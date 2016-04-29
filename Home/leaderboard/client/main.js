
  $(document).ready(function(){
    $('ul.tabs').tabs();
  });

  $(document).ready(function(){
    $('ul.tabs').tabs('select_tab', 'tab_id');

        $('.button-collapse').sideNav({
       menuWidth: 300, // Default is 240
       edge: 'left', // Choose the horizontal origin
       closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
   }
   );

  });





  $(document).ready(function($) {

    $('.card__share > a').on('click', function(e){
        e.preventDefault() // prevent default action - hash doesn't appear in url
        $(this).parent().find( 'div' ).toggleClass( 'card__social--active' );
        $(this).toggleClass('share-expanded');
    });

});



$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });





















Meteor.startup(function() {
 GoogleMaps.load();
});

div.map.helpers({
 mapOptions: function() {
   if (GoogleMaps.loaded()) {
     return {
       center: new google.maps.LatLng(-37.8136, 144.9631),
       zoom: 8
     };
   }
 }
});


div.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
     console.log("I'm ready!");
  });
});


Markers = new Mongo.Collection('markers');

div.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
    google.maps.event.addListener(map.instance, 'click', function(event) {
      Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    });

    var markers = {};

  Markers.find().observe({
    added: function(document) {
      // Create a marker for this document
      var marker = new google.maps.Marker({
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(document.lat, document.lng),
        map: map.instance,
        // We store the document _id on the marker in order
        // to update the document within the 'dragend' event below.
        id: document._id
      });

      // This listener lets us drag markers on the map and update their corresponding document.
      google.maps.event.addListener(marker, 'dragend', function(event) {
        Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
      });

      // Store this marker instance within the markers object.
      markers[document._id] = marker;
    },
    changed: function(newDocument, oldDocument) {
      markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
    },
    removed: function(oldDocument) {
      // Remove the marker from the map
      markers[oldDocument._id].setMap(null);

      // Clear the event listener
      google.maps.event.clearInstanceListeners(
        markers[oldDocument._id]);

      // Remove the reference to this marker instance
      delete markers[oldDocument._id];
    }
  });

  });
});
