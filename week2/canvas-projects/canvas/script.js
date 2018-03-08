var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

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
