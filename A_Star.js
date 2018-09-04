var node = {
    name: '',
    parent: null,
    func: null
};

function Node(name) {
    this.name = name;
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


var startNode = 4,
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



var nextNode = function (node) {
    let thisNode = node;
    for(let i = 0; i<adjacency_matrix[thisNode].length; i++){
        console.log("To " + nodes[i].name + " from " +thisNode + " way is - " +adjacency_matrix[thisNode][i] + '  ' + thisNode + '   ' + i + '  ' + ((adjacency_matrix[thisNode][i]!==0)&&(!closeList.includes(nodes[i].name))));
        if(((adjacency_matrix[thisNode][i]!==0)&&(!closeList.includes(nodes[i].name)))){   //Если есть путь и если данная вершина
            // не содержится в закрытом списке

            if(!openList.includes(nodes[i].name)){ // Если вершина не содержится в открытом списке
                openList.push(nodes[i].name);
                nodes[i].parent = thisNode;
                //console.log("Эвристика для: " + nodes[i].name + '  ' + heuristic(i,endNode));
                nodes[i].func = heuristic(i,endNode) + adjacency_matrix[thisNode][i]; // Записывам примерное расстояние до конца
            }else{  // Если вершина содержится в открытом списке
                //Сравниваем ее g и g от текущей клетки к ней........Ну ты понял
                let parent_g = adjacency_matrix[nodes[i].parent][i];
                console.log("Parent_g: " + parent_g);
                let g = adjacency_matrix[thisNode][i];
                console.log("g: " + g);
                if(parent_g > g){
                    nodes[i].parent = thisNode;
                    nodes[i].func = heuristic(i,endNode) + adjacency_matrix[thisNode][i]
                }
                //console.log(parent_g);
            }
        }
    }

    let min = 9999999;
    let next = null;
    /*for(let i = 0; i<adjacency_matrix[thisNode].length; i++){
        if(((adjacency_matrix[thisNode][i]!==0)&&(!closeList.includes(nodes[thisNode].name)) && ((nodes[thisNode].func < min)))){
            min = nodes[openList[i]].func;
            next = nodes[openList[i]].name;
        }
    }*/
    // console.log("thisNode " + adjacency_matrix[thisNode].length);
    /*for(let i = 0; i<adjacency_matrix[thisNode].length; i++){
        if(((adjacency_matrix[thisNode][i]!==0)&&(!closeList.includes(nodes[thisNode].name)) && ((nodes[thisNode].func < min)))){
            min = nodes[thisNode].func;
            next = nodes[thisNode].name;
        }
    }*/

    console.log(thisNode);
    for(let i = 0; i<openList.length; i++){
        if((adjacency_matrix[openList[i]][thisNode] != 0) && (nodes[openList[i]].func < min)){
            //console.log('Way' + openList[i] + ' ' + thisNode)
            min = nodes[openList[i]].func;
            next = nodes[openList[i]].name;
        }
    }
    /*for (let i = 0; i<openList.length; i++){
        for(let j = 0; j<adjacency_matrix[openList[i]].length; j++){
           // console.log("Нода "+ openList[i]+ " " + j+ '    ' + (adjacency_matrix[openList[i]][j]!==0))
            if((adjacency_matrix[openList[i]][j]!==0)){
                console.log('Есть путь к  '+nodes[openList[i].name])
                if (!closeList.includes(nodes[openList[i]].name)){
                    if(nodes[openList[i]].func < min){
                        min = nodes[openList[i]].func;
                        next = nodes[openList[i]].name;
                    }
                }
            }
        }
        /!*if (nodes[openList[i]].func < min){
            min = nodes[openList[i]].func
            next = nodes[openList[i]].name
        }*!/
        //console.log(nodes[openList[i]].func + ' - ' + nodes[openList[i]].name)
    }*/

    //closeList.push(thisNode);
    closeList.push(thisNode);

    return next;
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
        //openList.splice(openList.indexOf(thisNode), 1); // Удалил 1 из открытого списка
    }while (closeList.length != nodes_arr.length-1)
    };

//A_star(startNode, endNode);

console.log('Начальная точка: ' + startNode);

next = nextNode(startNode)

console.log('next ' + next);
console.log("OpenList: " + openList);
console.log('CloseList: ' + closeList);
console.log(nodes);

thisNode = next; //На этом шаге сделали 1 - новой точкой
openList.splice(openList.indexOf(thisNode),1); // Удалил 1 из открытого списка
////////////////
console.log('Начальная точка: ' + thisNode);

next = nextNode(thisNode)

console.log('next ' + next);
console.log("OpenList: " + openList);
console.log('CloseList: ' + closeList);
console.log(nodes);

thisNode = next; //На этом шаге сделали 1 - новой точкой
openList.splice(openList.indexOf(thisNode),1); // Удалил 1 из открытого списка
////////////////
console.log('Начальная точка: ' + thisNode);

next = nextNode(thisNode)

console.log('next ' + next);
console.log("OpenList: " + openList);
console.log('CloseList: ' + closeList);
console.log(nodes);

thisNode = next; //На этом шаге сделали 1 - новой точкой
openList.splice(openList.indexOf(thisNode),1); // Удалил 1 из открытого списка
////////////////
console.log('Начальная точка: ' + thisNode);

next = nextNode(thisNode)

console.log('next ' + next);
console.log("OpenList: " + openList);
console.log('CloseList: ' + closeList);
console.log(nodes);

thisNode = next; //На этом шаге сделали 1 - новой точкой
openList.splice(openList.indexOf(thisNode),1); // Удалил 1 из открытого списка
////////////////
console.log('Начальная точка: ' + thisNode);

next = nextNode(thisNode)

console.log('next ' + next);
console.log("OpenList: " + openList);
console.log('CloseList: ' + closeList);
console.log(nodes);

thisNode = next; //На этом шаге сделали 1 - новой точкой
openList.splice(openList.indexOf(thisNode),1); // Удалил 1 из открытого списка
////////////////
console.log('Начальная точка: ' + thisNode);

next = nextNode(thisNode)

console.log('next ' + next);
console.log("OpenList: " + openList);
console.log('CloseList: ' + closeList);
console.log(nodes);

thisNode = next; //На этом шаге сделали 1 - новой точкой
openList.splice(openList.indexOf(thisNode),1); // Удалил 1 из открытого списка
////////////////
console.log('Начальная точка: ' + thisNode);

next = nextNode(thisNode)

console.log('next ' + next);
console.log("OpenList: " + openList);
console.log('CloseList: ' + closeList);
console.log(nodes);

thisNode = next; //На этом шаге сделали 1 - новой точкой
openList.splice(openList.indexOf(thisNode),1); // Удалил 1 из открытого списка
////////////////
console.log('Начальная точка: ' + thisNode);

next = nextNode(thisNode)

console.log('next ' + next);
console.log("OpenList: " + openList);
console.log('CloseList: ' + closeList);
console.log(nodes);

thisNode = next; //На этом шаге сделали 1 - новой точкой
openList.splice(openList.indexOf(thisNode),1); // Удалил 1 из открытого списка
////////////////
console.log('Начальная точка: ' + thisNode);

next = nextNode(thisNode)

console.log('next ' + next);
console.log("OpenList: " + openList);
console.log('CloseList: ' + closeList);
console.log(nodes);

thisNode = next; //На этом шаге сделали 1 - новой точкой
openList.splice(openList.indexOf(thisNode),1); // Удалил 1 из открытого списка
////////////////
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

// console.log(nodes[5].name);
