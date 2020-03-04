// Adapted from
// https://codepen.io/pekopekopeko/pen/PbYRWps


var go = document.getElementById("vName");
var vGreet = document.getElementById("vTextID");
var vChat = document.getElementsByClassName("vChat");



//eel.expose(vUserNameHeader);
//function vUserNameHeader(vUsername){
//	document.getElementById("vHumanName").textContent=vUsername;
//}


//eel.expose(vPassInput);
//function vPassInput(vChatcontent) {
//	var vHuman = document.getElementById("vHumanChatContent");

//	var vLisa = document.getElementById("vLisaChatContent");
//	vLisa.textContent=vChatcontent;
//	alert(vChatcontent);
//	vHuman.textContent="Logged-in";
//}




const el = document.getElementById('canvas');
const ctx = el.getContext('2d');
const dpr = window.devicePixelRatio || 1;
const pi = Math.PI;
const points = 20;
const radius = 250 * dpr;
const h = 600 * dpr;
const w = 600 * dpr;
const center = {
    x: w / 2 * dpr, 
    y: h / 2 * dpr
};
const circles = [];
var rangeMin = 1;
var rangeMax = 32;
const showPoints = true;
var vSpeed = 11000;
var vPhase = 1;
let mouseY = 1;
let tick = 1;

const gradient1 = ctx.createLinearGradient(0, 0, w, 0);
gradient1.addColorStop(0, '#96fbc4');
gradient1.addColorStop(1, '#f9f586');

const gradient2 = ctx.createLinearGradient(0, 0, w, 0);
gradient2.addColorStop(0, '#48c6ef');
gradient2.addColorStop(1, '#6f86d6');

const gradient3 = ctx.createLinearGradient(0, 0, w, 0);
gradient3.addColorStop(0, '#9795f0');
gradient3.addColorStop(1, '#9be15d');

const gradient4 = ctx.createLinearGradient(0, 0, w, 0);
gradient4.addColorStop(0, '#f6d365');
gradient4.addColorStop(1, '#fda085');

const gradients = [ gradient1, gradient2, gradient3, gradient4 ];

//window.addEventListener('mousemove', handleMove, true);

//function handleMove(event) {
//    mouseY = 1;
//}



ctx.scale(dpr, dpr);

el.width = w * dpr;
el.height = h * dpr;
el.style.width = w + 'px';
el.style.height = h + 'px';


var vClix = document.getElementById('canvas');
vClix.addEventListener('click',vRespondClick);



async function vRespondClick(){
var vText = document.getElementById('fire');

vText.innerHTML = 'Speak';
vText.style.color = '#ff3333';
vText.style.backgroundImage = 'linear-gradient('
        + 'to top' + ', ' + '#ff3333 0%' + ', ' + '#cc0000 100%' + ')';
vSpeed = 420;
vPhase = 35;
rangeMax = 10;
vClix.disabled = true;

console.log('start');	
await eel.start_record()();	
console.log('end');	
eel.expose(LisaTextract);
function LisaTextract(vLisaTexto){
	vLisaTextto();	
}






setTimeout(function vTout(){vClix.disabled = false;vSpeed = 11000;vPhase = 1;vText.style.backgroundImage = 'linear-gradient('
        + 'to top' + ', ' + '#248f24 0%' + ', ' + '#33cc33 100%' + ')';vText.innerHTML = vLisaText;},7000);
 
clearInterval(vTout);
}




// Setup swing circle points


for (var idx = 0; idx <= gradients.length - 1; idx++) {
  
    let swingpoints = [];
    let radian = 0;

    for (var i = 0; i < points; i++){
        radian = pi * 2 / points * i;
        var ptX = center.x + radius * Math.cos(radian);
        var ptY = center.y + radius * Math.sin(radian);
        swingpoints.push({ 
            x: ptX,
            y: ptY,
            radian: radian,
            range: random(rangeMin, rangeMax),
            phase: 0 
        });
    }	
	
    circles.push(swingpoints);

}

// --------------------------------------------------------------------------- //
// swingCircle

function swingCircle() {
    ctx.clearRect(0, 0, w * dpr, h * dpr);
    
    ctx.globalAlpha = 1;
    // ctx.globalCompositeOperation = 'source-over';
    ctx.globalCompositeOperation = 'screen';
    
    for (let k = 0; k < circles.length; k++) {
        let swingpoints = circles[k];
      
        for (var i = 0; i < swingpoints.length; i++){
            swingpoints[i].phase += random(1, vPhase) * -0.01;
            
            let phase = 4 * Math.sin(tick / 65);
            
            if (mouseY !== 0) {
                phase = mouseY / 200 + 1;
            }
            
            var r = radius + (swingpoints[i].range * phase * Math.sin(swingpoints[i].phase)) - rangeMax;
            
            swingpoints[i].radian += pi / vSpeed;
            
            var ptX = center.x + r * Math.cos(swingpoints[i].radian);
            var ptY = center.y + r * Math.sin(swingpoints[i].radian);

			
            if (showPoints === true) {
                ctx.strokeStyle = '#96fbc4';

                ctx.beginPath();
                ctx.arc(ptX, ptY, 2 * dpr, 0, pi * 2, true);
                ctx.closePath();
                ctx.stroke();
            }
                
            swingpoints[i] = {
                x: ptX,
                y: ptY,
                radian: swingpoints[i].radian,
                range: swingpoints[i].range,
                phase: swingpoints[i].phase,
            };
        }

        const fill = gradients[k];
        drawCurve(swingpoints, fill);
      
    }
    
    tick++;
    
    requestAnimationFrame(swingCircle);
}

requestAnimationFrame(swingCircle);

// --------------------------------------------------------------------------- //
// drawCurve

function drawCurve(pts, fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.moveTo(
        (pts[cycle( - 1, points)].x + pts[0].x) / 2,
        (pts[cycle( - 1, points)].y + pts[0].y) / 2);
    for (var i = 0; i < pts.length; i++){
      
        ctx.quadraticCurveTo(
            pts[i].x,
            pts[i].y,
            (pts[i].x + pts[cycle(i + 1, points)].x) / 2,
            (pts[i].y + pts[cycle(i + 1, points)].y) / 2);
    }
  
  ctx.closePath();
  ctx.fill();

}

// --------------------------------------------------------------------------- //
// cycle
function cycle( num1, num2 ) {
    return ( num1 % num2 + num2 ) % num2;
	
}

// --------------------------------------------------------------------------- //
// random
function random (num1, num2) {
    var max = Math.max(num1, num2);
    var min = Math.min(num1, num2);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}





// --------------------------------------------------------------------------- //
// rotate

// function rotate (x, y, angle) {
//     var radians = (pi / 180) * angle,
//         cos = Math.cos(radians),
//         sin = Math.sin(radians),
//         nx = (cos * (x - center.x)) + (sin * (y - center.y)) + center.x,
//         ny = (cos * (y - center.y)) - (sin * (x - center.x)) + center.y;
//     return { x: nx, y: ny };
// }
