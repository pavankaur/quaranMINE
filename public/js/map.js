

function initMap() {

    var myLatLng = { lat: 34.1225992, lng: -118.0553189 };
    var myLatLng2 = { lat: 34.1297977, lng: -118.054468 };
    var myLatLng3 = { lat: 34.1264149, lng: -118.053458};
    var myLatLng4 = { lat: 34.12361, lng: -118.05816};
    var myLatLng5 = { lat: 34.09822049113962, lng: -118.1092034730346 };
    var myLatLng6 = { lat: 34.124572, lng: -118.03231 };
    var myLatLng7 = { lat: 34.13012, lng: -118.07166 };
    var myLatLng8 = { lat: 34.139891, lng: -118.030681 };
    var myLatLng9 = { lat: 34.12692, lng: -118.05524 };
    var myLatLng10 = { lat: 34.12573, lng: -118.05186 };
   
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: myLatLng2,
    });
    // The marker, positioned at Uluru

    var contentString = "Alexa's Flower";
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: "Alexa's Flower"
    });
    marker.addListener("click", () => {
        infowindow.open(map, marker);
      });

    var contentString2 = "Valentine's Wine & Spirits";
    var infowindow2 = new google.maps.InfoWindow({
        content: contentString2,
      });
    var marker2 = new google.maps.Marker({
        position: myLatLng2,
        map: map,
        title: "Valentine's Wine & Spirits"
      });
      marker2.addListener("click", () => {
        infowindow2.open(map, marker2);
      });

    var contentString3 = "Ellie's Cathy Bakery";
    var infowindow3 = new google.maps.InfoWindow({
        content: contentString3,
    });
    var marker3 = new google.maps.Marker({
        position: myLatLng3,
        map: map,
        title: "Ellie's Cathy Bakery"
      });
    marker3.addListener("click", () => {
        infowindow3.open(map, marker3);
    });

    var contentString4 = 'FinaLee Floral Cakes';
    var infowindow4 = new google.maps.InfoWindow({
        content: contentString4,
    });
    var marker4 = new google.maps.Marker({
        position: myLatLng3,
        map: map,
        title: 'FinaLee Floral Cakes'
      });
    marker4.addListener("click", () => {
        infowindow4.open(map, marker4);
    });

    var contentString5 = 'Love to Go';
    var infowindow5 = new google.maps.InfoWindow({
        content: contentString5,
    });
    var marker5 = new google.maps.Marker({
        position: myLatLng5,
        map: map,
        title: 'Love to Go'
      });
    marker5.addListener("click", () => {
        infowindow5.open(map, marker5);
    });

    var contentString6 = 'Flowers by Sharen';
    var infowindow6 = new google.maps.InfoWindow({
        content: contentString6,
    });
    var marker6 = new google.maps.Marker({
        position: myLatLng6,
        map: map,
        title: 'Flowers by Sharen'
      });
    marker6.addListener("click", () => {
        infowindow6.open(map, marker6);
    });

    var contentString7 = 'Paradise Flowers and Gifts';
    var infowindow7 = new google.maps.InfoWindow({
        content: contentString7,
    });
    var marker7 = new google.maps.Marker({
        position: myLatLng7,
        map: map,
        title: 'Paradise Flowers and Gifts'
      });
    marker7.addListener("click", () => {
        infowindow7.open(map, marker7);
    });

    var contentString8 = 'MDS Florist';
    var infowindow8 = new google.maps.InfoWindow({
        content: contentString8,
    });
    var marker8 = new google.maps.Marker({
        position: myLatLng8,
        map: map,
        title: 'MDS Florist'
      });
    marker8.addListener("click", () => {
        infowindow8.open(map, marker8);
    });

    var contentString9 = 'Orient Retreat Spa';
    var infowindow9 = new google.maps.InfoWindow({
        content: contentString9,
    });
    var marker9 = new google.maps.Marker({
        position: myLatLng9,
        map: map,
        title: 'Orient Retreat Spa'
      });
    marker9.addListener("click", () => {
        infowindow9.open(map, marker9);
    });

    var contentString10 = 'Fresh Face Med Spa';
    var infowindow10 = new google.maps.InfoWindow({
        content: contentString10,
    });
    var marker10 = new google.maps.Marker({
        position: myLatLng10,
        map: map,
        title: 'Fresh Face Med Spa'
      });
    marker10.addListener("click", () => {
        infowindow10.open(map, marker10);
    });
  }

  

