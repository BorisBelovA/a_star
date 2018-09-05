var node = {
    name: '',
    parent: null,
    func: null
};

function Node(name) {
    this.name = name;
    this.g = null;
}

var nodes_arr = [0,1,2,3,4,5,6,7,8,9];

var  nodes = [];

for(let i = 0; i<=9; i++){
    var tempNode = new Node(i);
    nodes.push(tempNode);
}

var adjacency_matrix = [[0, 6, 10, 0, 0, 0, 0, 0, 0, 0],
                        [6, 0, 12, 11, 14, 0, 0, 0, 0, 0],
                        [10, 12, 0, 12, 0, 0, 8, 16, 0, 0],
                        [0, 11, 12, 0, 0, 6, 3, 0, 0, 0],
                        [0, 14, 0, 0, 0, 4, 0, 0, 6, 0],
                        [0, 0, 0, 6, 4, 0, 0, 0, 12, 0],
                        [0, 0, 8, 3, 0, 0, 0, 0, 16, 6],
                        [0, 0, 16, 0, 0, 0, 0, 0, 0, 8],
                        [0, 0, 0, 0, 6, 12, 16, 0, 0, 13],
                        [0, 0, 0, 0, 0, 0, 6, 8, 13, 0, ]];

var heuristic_matrix = [[0,1,'',4,''],
                        [2,3,'',5,8],
                        ['','',6,'',''],
                        [7,'','',9,'']];


var startNode = 8,
    endNode = 7;

var openList = [],
    closeList = [];

var heuristic = function (start, end) { // Эвристическая функция манхэттеновские кварталы
    let  x1,x2,y1,y2;
    for(let i = 0; i<heuristic_matrix.length; i++){
        if(heuristic_matrix[i].indexOf(start) !== -1){
            x1 = heuristic_matrix[i].indexOf(start);
            y1 = i;
            //console.log("["+x1+";"+y1+"]"+" - " + start);
        }
        if(heuristic_matrix[i].indexOf(end) !== -1){
            x2 = heuristic_matrix[i].indexOf(end);
            y2 = i;
            //console.log("["+x2+";"+y2+"]"+" - " + end);
        }
    }
    return Math.abs(x1-x2) + Math.abs(y1-y2);
};

var choseNextNode = function(node, arr){
    let neighbors = arr;                                // [Node{name, g, func, parent}, Node{name, g, func, parent}, ...]
    let thisNode = node;                                    //На вход подается thisNode из nextNode
    let min = 999999;
    let nextNode = null;
    for(let i = 0; i < neighbors.length; i++){
        if((neighbors[i].func<min) && (openList.includes(neighbors[i].name))){
            min = neighbors[i].func;
            nextNode = neighbors[i].name;
        }
    }
    return nextNode;
};

var nextNode = function (node) {
    let thisNode = node;                                //Текущая точка  //При буквах надо доделать конструкцию поиска имени ноды из масива нод
    let neighbors = [];                                 // [Node{name, g, func, parent}, Node{name, g, func, parent}, ...]
    closeList.push(thisNode);
    for(let i = 0; i<adjacency_matrix[thisNode].length; i++){

        if(adjacency_matrix[thisNode][i] !== 0){        //Если есть путь из текущей вершины в вершину Х
           if(!openList.includes(nodes[i].name) && (!closeList.includes(nodes[i].name))){openList.push(nodes[i].name)}
            neighbors.push(nodes[i]);                   // [Node{name, g, func, parent}, Node{name, g, func, parent}, ...]

            let possibleNode = nodes[i];                // Node {name: str, g: int}

            if(openList.includes(possibleNode.name)){   //Если вершина Х в открытом списке, не ближе ли до нее путь от текущей вершины?

                let current_g = possibleNode.g;
                let possible_g = nodes[thisNode].g + adjacency_matrix[thisNode][i];
                //console.log(current_g + ' - ' + possible_g);

                if((current_g > possible_g) || (current_g === null)){             //Если Х.g > возмодный g, то значит, что мы можем в нее прийти более коротким путем

                    possibleNode.g = possible_g;
                    possibleNode.func = heuristic(possibleNode.name, endNode) + possibleNode.g;
                    possibleNode.parent = thisNode;

                }
            }else if((!openList.includes(possibleNode.name)) && (!closeList.includes(nodes[i].name))){                                      //Если вершина Х нет в открытом списке, то просто посчитаем путь до нее от текущей вершины

                possibleNode.g = nodes[thisNode].g + adjacency_matrix[thisNode][i]; //Просчитали G(x)
                possibleNode.func = heuristic(possibleNode.name, endNode) + possibleNode.g; //Просчитали F(x) = G(x) + h(x)
                possibleNode.parent = thisNode;

            }
        }
    }

    return choseNextNode(thisNode, neighbors);
};

var A_star = function(startNode, endNode){

    thisNode = startNode;

    do {

        console.log('Начальная точка: ' + thisNode);
        next = nextNode(thisNode);

        console.log('next ' + next);
        console.log("OpenList: " + openList);
        console.log('CloseList: ' + closeList);
        console.log(nodes);
        thisNode = next; //На этом шаге сделали 1 - новой точкой
        openList.splice(openList.indexOf(thisNode), 1); // Удалил 1 из открытого списка
        if(next === null){
            thisNode = openList[0];
            console.log('Начальная точка: ' + thisNode);
            openList.splice(openList.indexOf(thisNode), 1); // Удалил 1 из открытого списка
            next = nextNode(thisNode);

            console.log('next ' + next);
            console.log("OpenList: " + openList);
            console.log('CloseList: ' + closeList);
            console.log(nodes);
            thisNode = next; //На этом шаге сделали 1 - новой точкой
            openList.splice(openList.indexOf(thisNode), 1); // Удалил 1 из открытого списка
        }

    }while (thisNode!==endNode)
    };

A_star(startNode, endNode);



/*
Повторяющаяся конструкция

console.log('Начальная точка: ' + thisNode);


next = nextNode(thisNode)
closeList.push(thisNode);

console.log('next ' + next);
console.log("OpenList: " + openList);
console.log('CloseList: ' + closeList);
console.log(nodes);

thisNode = next; //На этом шаге сделали 1 - новой точкой
openList.splice(openList.indexOf(thisNode),1); // Удалил 1 из открытого списка
 */

