const mode = document.querySelector(".speed");
const over = document.getElementById("game-ended");


const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
if (mode.innerHTML == "EASY"){
    ground.src = "./img/ground-easy.png";
} else if (mode.innerHTML == "NORMAL") {
    ground.src = "./img/ground-med.png";
} else {
    ground.src = "./img/ground-hard.png";
}

const foodImg = new Image();
foodImg.src = "./img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 5 * box,
    y : 5 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*10+9) * box,
    y : Math.floor(Math.random()*10+10) * box
}

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    event.preventDefault();
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

document.getElementById("moveup").addEventListener("click", function(event){
    if (d != "DOWN"){
        up.play();
        d = "UP";
    }
});
document.getElementById("movedown").addEventListener("click", function(event){
    if (d != "UP"){
        down.play();
        d = "DOWN";
    }
});
document.getElementById("moveleft").addEventListener("click", function(event){
    if (d != "RIGHT"){
        left.play();
        d = "LEFT";
    }
});
document.getElementById("moveright").addEventListener("click", function(event){
    if (d != "LEFT"){
        right.play();
        d = "RIGHT";
    }
});

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function bumped(head, dir){
    if (mode.innerHTML == "EASY"){
        return false;
    }
    if (mode.innerHTML == "NORMAL"){
        // Obstacle 1
        if ((head.x == box*12 && (head.y >= box*4 && head.y <= box*8)) && dir == "RIGHT"){
            return true;
        }
        if ((head.x == box*11 && (head.y >= box*4 && head.y <= box*8)) && dir == "LEFT"){
            return true;
        }
        // Obsctacle 2
        if ((head.x == box*7 && (head.y >= box*14 && head.y <= box*19)) && dir == "RIGHT"){
            return true;
        }
        if ((head.x == box*6 && (head.y >= box*14 && head.y <= box*19)) && dir == "LEFT"){
            return true;
        }
        // Obstacle 3
        if ((head.y == box*16 && head.x >= box*15) && dir == "DOWN"){
            return true;
        }
        if ((head.y == box*15 && head.x >= box*15 ) && dir == "UP"){
            return true;
        }
        // Obstacle 4
        if ((head.y == box*20 && (head.x >= box*7 && head.x <= box*9)) && dir == "DOWN"){
            return true;
        }
        if ((head.y == box*19 && (head.x >= box*7 && head.x <= box*9)) && dir == "UP"){
            return true;
        }
    }
    if (mode.innerHTML == "HARD"){
        // Vertical Obstacles:
        if ((head.x == box*11 && head.y >= box*20) && dir == "RIGHT"){
            return true;
        }
        if ((head.x == box*10 && head.y >= box*20) && dir == "LEFT"){
            return true;
        }
        
        if ((head.x == box*11 && (head.y >= box*5 && head.y <= box*10)) && dir == "RIGHT"){
            return true;
        }
        if ((head.x == box*10 && (head.y >= box*5 && head.y <= box*10)) && dir == "LEFT"){
            return true;
        }
        
        if ((head.x == box*7 && (head.y >= box*19 && head.y <= box*21)) && dir == "RIGHT"){
            return true;
        }
        if ((head.x == box*6 && (head.y >= box*19 && head.y <= box*21)) && dir == "LEFT"){
            return true;
        }
        
        if ((head.x == box*18 && (head.y >= box*6 && head.y <= box*9)) && dir == "RIGHT"){
            return true;
        }
        if ((head.x == box*17 && (head.y >= box*6 && head.y <= box*9)) && dir == "LEFT"){
            return true;
        }
        
        // Horizontal Obstacles
        if ((head.y == box*20 && (head.x >= box*13 && head.x <= box*15)) && dir == "DOWN"){
            return true;
        }
        if ((head.y == box*19 && (head.x >= box*13 && head.x <= box*15)) && dir == "UP"){
            return true;
        }

        if ((head.y == box*17 && head.x >= box*13) && dir == "DOWN"){
            return true;
        }
        if ((head.y == box*16 && head.x >= box*13) && dir == "UP"){
            return true;
        }

        if ((head.y == box*19 && (head.x >= box*5 && head.x <= box*6)) && dir == "DOWN"){
            return true;
        }
        if ((head.y == box*18 && (head.x >= box*5 && head.x <= box*6)) && dir == "UP"){
            return true;
        }
        
        if ((head.y == box*15 && (head.x >= box*3 && head.x <= box*5)) && dir == "DOWN"){
            return true;
        }
        if ((head.y == box*14 && (head.x >= box*3 && head.x <= box*5)) && dir == "UP"){
            return true;
        }

        if ((head.y == box*5 && (head.x >= box*8 && head.x <= box*10)) && dir == "DOWN"){
            return true;
        }
        if ((head.y == box*4 && (head.x >= box*8 && head.x <= box*10)) && dir == "UP"){
            return true;
        }

        if ((head.y == box*11 && (head.x >= box*5 && head.x <= box*14)) && dir == "DOWN"){
            return true;
        }
        if ((head.y == box*10 && (head.x >= box*5 && head.x <= box*14)) && dir == "UP"){
            return true;
        }
        
    }
}

// draw everything to the canvas
let gameOver = false;

let ping = 100, newPing = 100;

if (mode.innerHTML == "EASY"){
    ping = 160;
} else if (mode.innerHTML == "HARD"){
    ping = 60;
}

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "lightgreen";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        //ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*19+1) * box,
            y : Math.floor(Math.random()*20+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    
    // game over
    if(snakeX < box || snakeX > 20 * box || snakeY < 3*box || snakeY > 25*box || collision(newHead,snake) || bumped(newHead, d)){
        clearInterval(game);
        gameOver = true;
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "black";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);

    if (gameOver){
        //over.setAttribute("opacity", 1);
        over.style.opacity = 1;
        over.style.width = "50%";
        over.style.fontSize = "7rem";
    }

}

// call draw function every 100 ms

let game = setInterval(draw, ping);

