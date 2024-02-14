const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const resetBtn = document.getElementById('resetBtn');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawCircle);
canvas.addEventListener('mouseup', stopDrawing);

resetBtn.addEventListener('click', resetCanvas);

canvas.addEventListener('click', checkHitOrMiss);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function drawCircle(e) {
    if (!isDrawing) return;
    const x = e.offsetX;
    const y = e.offsetY;
    const size = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));

    ctx.beginPath();
    ctx.arc(lastX, lastY, size, 0, Math.PI * 2);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    [lastX, lastY] = [x, y];
}

function stopDrawing() {
    isDrawing = false;
}

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function checkHitOrMiss(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    if (imageData[3] !== 0) {
        console.log('Hit');
    } else {
        console.log('Miss');
    }
}
