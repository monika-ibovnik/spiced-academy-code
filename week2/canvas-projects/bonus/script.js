var srcCanvas = document.getElementById('source');
var src = srcCanvas.getContext('2d');
var destCanvas = document.getElementById('destination');
var destination = destCanvas.getContext('2d');
var width = destCanvas.width;
var height = destCanvas.height;

(function drawStickman(context){
    context.strokeStyle = 'black';
    context.beginPath();
    context.arc(100,50,40,0,Math.PI*2);
    context.stroke();
    //torso
    context.beginPath();
    context.moveTo(100,90);
    context.lineTo(100,220);
    context.stroke();
    //legs
    context.beginPath();
    context.moveTo(100,220);
    context.lineTo(50,330);
    context.stroke();
    context.beginPath();
    context.moveTo(100,220);
    context.lineTo(150,330);
    context.stroke();
    //arms
    context.beginPath();
    context.moveTo(100, 150);
    context.lineTo(30,80);
    context.stroke();
    context.beginPath();
    context.moveTo(100,150);
    context.lineTo(170,80);
    context.stroke();
})(src);

var x = 0;
var y = 0;
var step = 5;

function draw(){
    destination.clearRect(0, 0, width, height);
    destination.drawImage(srcCanvas, x, y, 100, 200);
}

draw();
document.addEventListener('keydown',function(e){
    if(e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 40 || e.keyCode === 38){
        e.preventDefault();
        console.log('prevent!');
    }
    if(e.keyCode === 39 && x <= width - 100){
        //right arrow
        x += step;
        draw();
    }else if(e.keyCode === 37 && x > 0){
        //left arrow
        x -= step;
        draw();
    }else if(e.keyCode === 40 && y <= height - 180){
        y += step;
        draw();
    }else if(e.keyCode === 38 && y > 0){
        y -= step;
        draw();
    }
});
