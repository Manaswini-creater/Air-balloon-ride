var ball;
var database
function preload(){
balloonImage=loadImage("Images/HotAirBallon-01.png")
cityImage=loadImage("Images/cityImage.png")


}
function setup(){
    createCanvas(500,500);
    database = firebase.database()

    ball = createSprite(250,250,10,10);
    ball.addImage(balloonImage);
    ball.shapeColor = "red";
    var databaseball = database.ref('ball/position')
    databaseball.on("value",readPosition)
}

function draw(){
    background(cityImage);
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("ball/position").set({
     "x": position.x+x,
     "y": position.y+y
    })
    
}
function readPosition(data){
    position = data.val();
    ball.x = position.x
    ball.y = position.y
}