var canvas = document.getElementById('drawCanvas');
var ctx = canvas.getContext('2d');
ctx.lineWidth = '3';
canvas.width = window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
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

    // cross-browser canvas coordinates
    var x = e.offsetX || e.layerX - canvas.offsetLeft;
    var y = e.offsetY || e.layerY - canvas.offsetTop;

    plots.push({x: x, y: y});

    drawOnCanvas("#ff0000", plots);
}

// draws plot onto the canvas
function drawOnCanvas(color, plots) {
    ctx.beginPath();
    ctx.moveTo(this.plots[0].x, this.plots[0].y);

    for(var i = 1; i < this.plots.length; i++) {
        ctx.lineTo(this.plots[i].x, this.plots[i].y);
    }
    ctx.strokeStyle = color;
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