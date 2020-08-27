var canvas = document.getElementById('drawCanvas');
canvas.width = 0.8 * window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
ctx.lineWidth = '3';
ctx.fillStyle = '#EEEEEE';
ctx.fillRect(0, 0, canvas.width, canvas.height);
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

    drawOnCanvas("#222222", plots);
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

    // emit brush stroke


    plots = []; // clear array
}