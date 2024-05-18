// 0번 노드는 사용하지 않는 빈 노드이다.
// 이는 시작 노드를 1번으로 설정하기 위함이다.
// 2차원 배열로 표현 => 우선순위 큐 이용(순차 탐색x) : 새로운 노드를 방문할 때마다 기록된 거리가 가장 짧은 노드부터 먼저 탐색
const graph = [
    [], // 사용 X
    [
      // 출발지 : 1  
      { to: 2, dist: 1 },  // to: 목적지, dist: 거리 
      { to: 4, dist: 2 },
    ],
    [
      // 출발지 : 2
      { to: 1, dist: 1 },
      { to: 3, dist: 3 },
      { to: 5, dist: 2 },
    ],
    [
      { to: 2, dist: 3 },
      { to: 5, dist: 1 },
    ],
    [
      { to: 1, dist: 2 },
      { to: 5, dist: 2 },
    ],
    [
      { to: 2, dist: 2 },
      { to: 3, dist: 1 },
      { to: 4, dist: 2 },
    ],
  ];
  
// 1번 노드와 각 노드까지 최단 경로를 저장하는 배열 생성
let dist = Array(graph.length).fill(Infinity);

// queue : 먼저 입력된 자료를 가장 먼저 처리하는 선형 자료구조
// 큐 생성 및 1번 노드에 대한 정보 저장 
let queue = [{ to: 1, dist: 0}];

// 1번 노드의 거리는 0으로 설정 
dist[1] = 0;

// 큐가 빌 때까지 반복
while (queue.length) {
    // 큐에서 방문할 노드 꺼내기 ( pop(): 배열에서 마지막 요소를 제거하고 그 요소를 반환 )
    let { to } = queue.pop();    //  queue의 to 요소에서 마지막 요소를 제거 후 그 요소를 to라는 변수에 담음

    // 방문한 노드까지 이동한 거리 + 다음 방문 노드까지 거리를
    // 기존에 저장된 값과 비교해서 갱신 
    graph[to].forEach((next)=> {  // .forEach : graph[to]를 순회하면서 실행
        let acc = dist[to] + next.dist; // dist[to]: 방문한 노드까지 이동한 거리 / next.dist: 다음 방문 노드까지 거리
        if(dist[next.to] > acc) { // 다음 방문 목적지까지 이동한 거리 > 방문한 노드까지 이동한 거리 + 다음 방문 노드까지 거리 
            // 최단 경로가 되는 노드는 큐에 추가
            queue.push(next); // 위 조건문 만족 시 queue에 다음 노드 추가
            // console.log(queue);
        }
    });
}


