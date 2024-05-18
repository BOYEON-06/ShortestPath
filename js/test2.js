// 배열로 구현한 우선순위 큐 
class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({ val, priority});
        this.sort();
    }
    dequeue() {
        return this.values.shift();
    }
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}


// 가중 그래프(Weighted Graph) 구현
// Vertex: 장소, weight: 거리(가중치)
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight});
        this.adjacencyList[vertex2].push({ node: vertex1, weight});
    }
    // weightedGraph 클래스 내부 메서드
    Dijkstra(start, finish) {
        // 위에서 만든 PrioirtyQueue 클래스로 nodes 인스턴스를 만들고, start 추가
        const nodes = new PriorityQueue();
        nodes.enqueue(start, 0);
        // distances : 시작점부터 그 노드까지의 최단 거리 기록
        const distances = {};
        // privious : 그 노드까지 최단거리로 경유한 직전 노드 기록
        const previous = {};
        // path : 마지막에 return 할, 최종 탐색 경로 
        const path = [];
        let smallest; 
        for (const vertex in this.adjacencyList) {
            if(vertex === start) {
                distances[vertex] = 0;
            } else {
                distances[vertex] = Infinity;
            }
            previous[vertex] = null;
        }

        while (true) {
            // nodes는 우선순위 정렬이 되어 있기에 dequene시 우선순위가 가장 높은(최소 거리) 값을 주며, 그 값을 smallest 변수에 재할당
            smallest = nodes.dequeue().val;
            // dequeue한 값이 finish와 같으면 목적지에 도착한 것
            if (smallest === finish) {
                // return할 값을 아래의 while문을 통해 만들고 상위 while문(무한 루프)을 break;
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }

            // dequeue한 값이 finish와 같지 않으면 아직 목적지에 도달하지 X
            else {
                // dequeue한 노드와 간선으로 이어진 노드들에 대해 아래 반목문을 돌림
                for (const neighbor in this.adjacencyList[smallest]) {
                    const nextNode = this.adjacencyList[smallest][neighbor];
                    const candidate = distances[smallest] + nextNode.weight;
                    const nextNeighbor = nextNode.node;
                    // 시작점에서 현 노드까지 경유한 거리(distances[smallest])와 
                    // 현 노드와 다음 노드 사이의 거리(nextNode.weight)를 합하여 최소거리 후부로 둠

                    if (candidate < distances[nextNeighbor]) {
                        // 시작점에서 다음 노드까지 가장 짧은 거리를 구하기 위해
                        // 방금 만든 후보 값과 기존에 저장된 거리값을 비교 후, 후보 값이 더 작으면
                        distances[nextNeighbor] = candidate;
                        // 새로운 최소 거리 값으로 업뎃
                        previous[nextNeighbor] = smallest;
                        // 다음 노드로 가기 위해 직전에 들린 노드 기록
                        nodes.enqueue(nextNeighbor, candidate);
                        // 다음 노드와 그곳까지 걸린 거리(priority)를 nodes에 넣음
                    }
                }
            }
        }
            return console.log(path.concat(smallest).reverse());
    }

}


// 그래프 설정
const graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

graph.Dijkstra("A", "E");
