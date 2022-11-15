var map = L.map("map").setView([-34.932512,-56.159718],16);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 25
}).addTo(map);
L.control.scale().addTo(map);

L.marker([-34.935404,-56.160398],{draggable: true}).addTo(map);
L.marker([-34.930813,-56.159797],{draggable: true}).addTo(map);


