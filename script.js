const graph = {
    Sundarijal: {
        Mulkharka: 5
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
        "Please choose different locations.";
    return;
}

    let result = dijkstra(start, end);

    document.getElementById("result").innerText =
    `Shortest Route:
${result.path.join(" → ")}

Total Distance: ${result.distance} km`;
}