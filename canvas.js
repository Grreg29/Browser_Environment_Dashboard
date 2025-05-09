const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let circles = [];
let selectedCircle = null;
let dragging = false;
let offsetX, offsetY;

canvas.addEventListener('mousedown', function (e) {
  const { x, y } = getMousePos(e);
  selectedCircle = getCircleAt(x, y);

  if (selectedCircle) {
    offsetX = x - selectedCircle.x;
    offsetY = y - selectedCircle.y;
    dragging = true;
    selectedCircle.color = 'red';
  } else {
    circles.forEach(c => c.color = 'steelblue');
    circles.push({ x, y, r: 20, color: 'steelblue' });
  }

  draw();
});

canvas.addEventListener('mousemove', function (e) {
  if (dragging && selectedCircle) {
    const { x, y } = getMousePos(e);
    selectedCircle.x = x - offsetX;
    selectedCircle.y = y - offsetY;
    draw();
  }
});

canvas.addEventListener('mouseup', function () {
  dragging = false;
});

canvas.addEventListener('wheel', function (e) {
  if (selectedCircle) {
    e.preventDefault();
    selectedCircle.r += (e.deltaY < 0 ? 2 : -2);
    if (selectedCircle.r < 5) selectedCircle.r = 5;
    draw();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Delete' && selectedCircle) {
    circles = circles.filter(c => c !== selectedCircle);
    selectedCircle = null;
    draw();
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
    ctx.stroke();
  });
}

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function getCircleAt(x, y) {
  return circles.find(c => Math.hypot(x - c.x, y - c.y) <= c.r);
}
