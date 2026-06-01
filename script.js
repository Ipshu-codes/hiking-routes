const graph = {
    Sundarijal: ["Mulkharka"],
    Mulkharka: ["Sundarijal", "Manichud"],
    Manichud: ["Mulkharka"]
};

function bfs(start, end) {
    let queue = [[start]];
    let visited = new Set();

    while (queue.length > 0) {
        let path = queue.shift();
        let node = path[path.length - 1];

        if (node === end) {
            return path;
        }

        if (!visited.has(node)) {
            visited.add(node);

            for (let neighbor of (graph[node] || [])) {
                queue.push([...path, neighbor]);
            }
        }
    }

    return null;
}

function findRoute() {
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;

    let route = bfs(start, end);

    document.getElementById("result").innerText =
        route
            ? route.join(" → ")
            : "Route not found";
}