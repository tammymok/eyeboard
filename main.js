var canvas = document.getElementById('drawCanvas');
var ctx = canvas.getContext('2d');
ctx.lineWidth = '3';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDraw);


// create a flag
var isActive = false;

// array to collect coordinates
var plots = [];
console.log(plots);

function draw(e) {
    if(!isActive) return;

    console.log(e);
    console.log(plots);

    // cross-browser canvas coordinates
    var x = e.offsetX || e.layerX - canvas.offsetLeft;
    var y = e.offsetY || e.layerY - canvas.offsetTop;

    plots.push({x: x, y: y});

    drawOnCanvas(this.plots);
}

// draws plot onto the canvas
function drawOnCanvas(color, plots) {
    ctx.beginPath();
    ctx.moveTo(plots[0].x, plots[0].y);

    for(var i=1; i<plots.length; i++) {
        ctx.lineTo(plots[i].x, plots[i].y);
    }
    ctx.stroke();
}

function startDraw(e) {
    console.log("start drawing!!");
    isActive = true;
}

function endDraw(e) {
    console.log("ending drawing!!");
    isActive = false;
    plots = []; // clear array
}