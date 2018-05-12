var canvas = document.querySelector('.snow'),
    ctx = canvas.getContext('2d'),
    windowW = window.innerWidth,
    windowH = window.innerHeight,
    numFlakes = 200,
    flakes = [];

function Flake(x, y) {
  var maxWeight = 5,
      maxSpeed = 3;
  
  this.x = x;
  this.y = y;
  this.r = randomBetween(0, 1);
  this.a = randomBetween(0, Math.PI);
  this.aStep = 0.01;

  
  this.weight = randomBetween(2, maxWeight);
  this.alpha = (this.weight / maxWeight);
  this.speed = (this.weight / maxWeight) * maxSpeed;
  
  this.update = function() {
    this.x += Math.cos(this.a) * this.r;
    this.a += this.aStep;
    
    this.y += this.speed;
  }
  
}

function init() {
  var i = numFlakes,
      flake,
      x,
      y;
  
  while (i--) {
    x = randomBetween(0, windowW, true);
    y = randomBetween(0, windowH, true);
    
    
    flake = new Flake(x, y);
    flakes.push(flake);
  }
  
  scaleCanvas();
  loop();  
}

function scaleCanvas() {
  canvas.width = windowW;
  canvas.height = windowH;
}

function loop() {
  var i = flakes.length,
      z,
      dist,
      flakeA,
      flakeB;
  
  // clear canvas
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, windowW, windowH);
  ctx.restore();
  
  // loop of hell
  while (i--) {
    
    flakeA = flakes[i];
    flakeA.update();
    

    /*for (z = 0; z < flakes.length; z++) {
      flakeB = flakes[z];
      if (flakeA !== flakeB && distanceBetween(flakeA, flakeB) < 150) {          
        ctx.beginPath();
        ctx.moveTo(flakeA.x, flakeA.y);
        ctx.lineTo(flakeB.x, flakeB.y);
        ctx.strokeStyle = '#444444';
        ctx.stroke();
        ctx.closePath();
      }
    }*/

    
    ctx.beginPath();
    ctx.arc(flakeA.x, flakeA.y, flakeA.weight, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 255, 255, ' + flakeA.alpha + ')';
    ctx.fill();
    
    if (flakeA.y >= windowH) {
      flakeA.y = -flakeA.weight;
    }  
  }
  
  requestAnimationFrame(loop);
}

function randomBetween(min, max, round) {
  var num = Math.random() * (max - min + 1) + min;

  if (round) {
    return Math.floor(num);
  } else {
    return num;
  }
}

function distanceBetween(vector1, vector2) {
  var dx = vector2.x - vector1.x,
      dy = vector2.y - vector1.y;

  return Math.sqrt(dx*dx + dy*dy);
}

init();

















//  (function() {
//     var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
//     function(callback) {
//         window.setTimeout(callback, 1000 / 60);
//     };
//     window.requestAnimationFrame = requestAnimationFrame;
// })();


// var flakes = [],
//     canvas = document.getElementById("canvas"),
//     ctx = canvas.getContext("2d"),
//     flakeCount = 400,
//     mX = -100,
//     mY = -100

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

// function snow() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     for (var i = 0; i < flakeCount; i++) {
//         var flake = flakes[i],
//             x = mX,
//             y = mY,
//             minDist = 150,
//             x2 = flake.x,
//             y2 = flake.y;

//         var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
//             dx = x2 - x,
//             dy = y2 - y;

//         if (dist < minDist) {
//             var force = minDist / (dist * dist),
//                 xcomp = (x - x2) / dist,
//                 ycomp = (y - y2) / dist,
//                 deltaV = force / 2;

//             flake.velX -= deltaV * xcomp;
//             flake.velY -= deltaV * ycomp;

//         } else {
//             flake.velX *= .98;
//             if (flake.velY <= flake.speed) {
//                 flake.velY = flake.speed
//             }
//             flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
//         }

//         ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
//         flake.y += flake.velY;
//         flake.x += flake.velX;
            
//         if (flake.y >= canvas.height || flake.y <= 0) {
//             reset(flake);
//         }


//         if (flake.x >= canvas.width || flake.x <= 0) {
//             reset(flake);
//         }

//         ctx.beginPath();
//         ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
//         ctx.fill();
//     }
//     requestAnimationFrame(snow);
// };

// function reset(flake) {
//     flake.x = Math.floor(Math.random() * canvas.width);
//     flake.y = 0;
//     flake.size = (Math.random() * 3) + 2;
//     flake.speed = (Math.random() * 1) + 0.5;
//     flake.velY = flake.speed;
//     flake.velX = 0;
//     flake.opacity = (Math.random() * 0.5) + 0.3;
// }

// function init() {
//     for (var i = 0; i < flakeCount; i++) {
//         var x = Math.floor(Math.random() * canvas.width),
//             y = Math.floor(Math.random() * canvas.height),
//             size = (Math.random() * 3) + 2,
//             speed = (Math.random() * 1) + 0.5,
//             opacity = (Math.random() * 0.5) + 0.3;

//         flakes.push({
//             speed: speed,
//             velY: speed,
//             velX: 0,
//             x: x,
//             y: y,
//             size: size,
//             stepSize: (Math.random()) / 30,
//             step: 0,
//             opacity: opacity
//         });
//     }

//     snow();
// };

// canvas.addEventListener("mousemove", function(e) {
//     mX = e.clientX,
//     mY = e.clientY
// });

// window.addEventListener("resize",function(){
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// })

// init();