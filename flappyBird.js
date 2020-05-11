var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


// Loading the Images

var bird = new Image();
var bg = new Image();
var ground = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
ground.src = "images/ground.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


 // Variable Declaration

var space = 85;
var fixed;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;


//Sound Effects

var jump = new Audio();
var add = new Audio();

jump.src="sounds/jump.mp3"
add.src="sounds/add.mp3"



// Key Down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    jump.play();
}


// Co-ordinates for Pipe

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}


// Drawing the Images

function draw(){
    ctx.drawImage(bg,0,0);
    
    for(var i=0; i<pipe.length; i++){

        fixed = pipeNorth.height+space;     

        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+fixed);
        
        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }


        // Collision Detection

        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+fixed) || bY + bird.height >= cvs.height - ground.height){
            location.reload(); // Reloading the Page
        }

        if(pipe[i].x == 5){
            score++;
            add.play();
        }
    }
    
    ctx.drawImage(ground,0,cvs.height-ground.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);

}

draw();