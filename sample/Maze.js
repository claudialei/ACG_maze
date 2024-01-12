let maze;
let mazeX = 10;
let mazeY = 9;
let visited = 0;
let steps= 1000000;
let cell =[];
var notStarted = true;

function drawMaze(scene){
    
    const borderMat = new BABYLON.StandardMaterial("borderMat", scene);
    //borderMat.diffuseTexture = new BABYLON.StandardMaterial("link to texture", scene);
    //borderMat.bumpTexture = new BABYLON.Texture("Link", scene)
    //borderMat.invertNormalMapX = true;
    //borderMat.invertNormalMapY = true;


    //boders
    for (let i =0; i < maze.length+2; i++){

        let box = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 3}, scene);
        box.position = new BABYLON.Vector3(i, 0, 0);
        box.material = borderMat;
        box.checkCollisions = true;
        let box2 = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 3}, scene);
        box2.position = new BABYLON.Vector3(0,0,-i-1);
        box2.material = borderMat;
        box2.checkCollisions = true;
        let box3 = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 3}, scene);
        box3.position = new BABYLON.Vector3(maze.length+1, 0, -i-1);
        box3.material = borderMat;
        box3.checkCollisions = true;
        let box4 = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 3}, scene);
        box4.position = new BABYLON.Vector3(i,0,-maze.length-3);
        box4.material = borderMat;
        box4.checkCollisions = true;
    }

    //maze
    for (let r = 0; r < maze.length; r++) {
    for (let c = 0; c < maze[0].length; c++) {
      if (maze[r][c]){
        if (!((r == 4 && c == maze.length+1) || (r == maze.length-1 && c == 5))){
            let box = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 3}, scene);
            box.position = new BABYLON.Vector3((r + 1), 0, -(c + 1));
            //box.material = mazeMat;
            box.checkCollisions = true;
         }
        }
      }
    }
    
  
    if ((visited < mazeX * mazeY) && (--steps > 0)) drawMaze();
    console.log(maze.length);


}

function generateMaze(){
  setUp();
  
  
  while ((visited < mazeX*mazeY) && (--steps > 0)){
    //pick random neighbour
    let nl = [];
    if(cell.r+2 < maze.length) nl.push({r:cell.r+2, c:cell.c});
    if(cell.c+2 < maze[0].length) nl.push({r:cell.r, c:cell.c+2});
    if (cell.r > 0) nl.push({r:cell.r-2, c:cell.c});
    if (cell.c>0) nl.push({r:cell.r, c:cell.c-2});
    let n = nl[Math.floor(Math.random()*nl.length)];
    if(maze[n.r][n.c] == 1){ //unvisited
      maze[n.r][n.c]  = 0;  //visted
      maze[(n.r+cell.r)/2][(n.c+cell.c)/2] = 0; //remove wall
      visited++
    }
    cell = n;
  }
}

function setUp(){
  // init maze
  maze = Array(mazeY*2-1).fill().map(()=> Array(mazeX*2-1));
  for (let r = 0; r < mazeY*2-1; r++){
    for (let c = 0; c < mazeX*2-1; c++){
      maze[r][c]=1;      
    }
  }
  
  //pick a start point
  cell = {r:0, c:0};
  maze[cell.r][cell.c]=0;  //set to 1 == wall
  
}

function working(){
    console.log("it works");
}

