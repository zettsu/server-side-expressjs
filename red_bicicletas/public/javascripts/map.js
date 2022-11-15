var map = L.map("map").setView([-34.932512,-56.159718],16);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 25
}).addTo(map);
L.control.scale().addTo(map);

fetch('/api/v1/bikes')
    .then((response) => response.json())
    .then((response) => {
        response.bikes.forEach((bike)=>{
        L.marker([bike.location[0],bike.location[1]],{draggable: true}).addTo(map);
    });
}).catch((error)=>console.log(error));





