const trailInfo = {
    Sundarijal: {
        elevation: "1350 m",
        season: "All year",
        highlight: "Gateway to Shivapuri National Park"
    },

    Mulkharka: {
        elevation: "1800 m",
        season: "Spring, Autumn",
        highlight: "Traditional Tamang village"
    },

    Manichud: {
        elevation: "2400 m",
        season: "Spring, Autumn",
        highlight: "Forest trails and hilltop views"
    },

    Chisapani: {
        elevation: "2165 m",
        season: "Spring, Autumn",
        highlight: "Mountain sunrise views"
    },

    Nagarkot: {
        elevation: "2175 m",
        season: "All year",
        highlight: "Himalayan panorama"
    },

    Dhulikhel: {
        elevation: "1550 m",
        season: "All year",
        highlight: "Scenic mountain viewpoints"
    },

    "Dhap Dam": {
        elevation: "1900 m",
        season: "Autumn, Winter",
        highlight: "Peaceful reservoir and birdwatching"
    },

    "Shivapuri Peak": {
        elevation: "2732 m",
        season: "Spring, Autumn",
        highlight: "Highest peak around Kathmandu Valley"
    },

    "Nagi Gumba": {
        elevation: "2330 m",
        season: "All year",
        highlight: "Buddhist monastery and forest views"
    },

    Jamacho: {
        elevation: "2128 m",
        season: "Spring, Autumn",
        highlight: "Tower viewpoint inside Nagarjun Forest"
    },

    Champadevi: {
        elevation: "2285 m",
        season: "Spring, Autumn",
        highlight: "Popular ridge hike with valley views"
    },

    Phulchoki: {
        elevation: "2782 m",
        season: "Spring",
        highlight: "Rhododendron forests and birdwatching"
    }
};
const locations = {
    Sundarijal: [27.7810, 85.4210],
    Mulkharka: [27.8000, 85.4100],
    Manichud: [27.8150, 85.3950],
    Chisapani: [27.8390, 85.4130],
    Nagarkot: [27.7150, 85.5200],
    Dhulikhel: [27.6220, 85.5420],
    "Dhap Dam": [27.8100, 85.3900],
    "Shivapuri Peak": [27.8170, 85.4100],
    "Nagi Gumba": [27.8250, 85.4000],
    Jamacho: [27.7420, 85.2700],
    Champadevi: [27.6580, 85.3000],
    Phulchoki: [27.5760, 85.4060]
};
let map;

window.onload = function () {

    map = L.map('map').setView([27.7172, 85.3240], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Add markers for all hiking locations
    for (let place in locations) {
        L.marker(locations[place])
            .addTo(map)
            .bindPopup(place);
    }

};
let routeLine;
let startMarker;
let endMarker;
const graph = {
    Sundarijal: {
        Mulkharka: 5,
        "Shivapuri Peak": 8
    },

    Mulkharka: {
        Sundarijal: 5,
        Manichud: 4,
        Chisapani: 6
    },

    Manichud: {
        Mulkharka: 4
    },

    Chisapani: {
        Mulkharka: 6,
        Nagarkot: 7
    },

    Nagarkot: {
        Chisapani: 7,
        Dhulikhel: 8
    },

    Dhulikhel: {
        Nagarkot: 8,
        "Dhap Dam": 10
    },

    "Dhap Dam": {
        Dhulikhel: 10
    },

   "Shivapuri Peak": {
    Sundarijal: 8,
    "Nagi Gumba": 3,
    Jamacho: 12
},

    "Nagi Gumba": {
        "Shivapuri Peak": 3
    },
    Jamacho: {
    "Shivapuri Peak": 12,
    Champadevi: 10
    },

Champadevi: {
    Jamacho: 10,
    Phulchoki: 15
},

Phulchoki: {
    Champadevi: 15
}
};



function dijkstra(start, end) {
    const distances = {};
    const previous = {};
    const unvisited = new Set();

    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
        unvisited.add(node);
    }

    distances[start] = 0;

    while (unvisited.size > 0) {

        let current = null;

        for (let node of unvisited) {
            if (
                current === null ||
                distances[node] < distances[current]
            ) {
                current = node;
            }
        }

        if (current === end) break;

        unvisited.delete(current);

        for (let neighbor in graph[current]) {

            let newDistance =
                distances[current] +
                graph[current][neighbor];

            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = current;
            }
        }
    }

    const path = [];
    let current = end;

    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    return {
        path,
        distance: distances[end]
    };
}

function findRoute() {

    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;

    if (start === end) {
        document.getElementById("result").innerText =
            "Select different start and destination locations.";
        return;
    }

    let result = dijkstra(start, end);

    const estimatedHours = (result.distance / 3).toFixed(1);

    let difficulty;

    if (result.distance <= 10) {
        difficulty = "Easy";
    } else if (result.distance <= 20) {
        difficulty = "Moderate";
    } else {
        difficulty = "Hard";
    }

    document.getElementById("result").innerText =
`🥾 Route Summary

Start: ${start}
Destination: ${end}

Route:
${result.path.join(" → ")}

Distance: ${result.distance} km
Estimated Hiking Time: ${estimatedHours} hours
Difficulty: ${difficulty}`;

    if (routeLine) {
        map.removeLayer(routeLine);
    }

if (startMarker) {
    map.removeLayer(startMarker);
}

if (endMarker) {
    map.removeLayer(endMarker);
}
    

    let routeCoords = result.path.map(place => locations[place]);

    
startMarker = L.marker(locations[start])
    .addTo(map)
    .bindPopup("🟢 Start: " + start)
    .openPopup();

endMarker = L.marker(locations[end])
    .addTo(map)
    .bindPopup("🔴 Destination: " + end);
    routeLine = L.polyline(routeCoords, {
        color: "blue",
        weight: 5
    }).addTo(map);

    // Zoom map to route
    map.fitBounds(routeLine.getBounds());

    if (trailInfo[end]) {
    document.getElementById("result").innerText +=

`\n\n📍 Destination Info

Elevation: ${trailInfo[end].elevation}
Best Season: ${trailInfo[end].season}
Highlight: ${trailInfo[end].highlight}`;
}
    
}


