let points = [];
let hull = [];
let isVisualizing = false;
let stepDelay = 30;
let frameCounter = 0;
let complete = false;
let isPaused = false;
let index_select_point = -1;

let currentVertex, nextVertex, checking;

function setup() {
  createCanvas(1200, 800);
}

function draw() {
  background(240);
  drawPoints();
  if (complete || isVisualizing) {
    drawHull();
  }
  displaySpeedBar();

  if (isPaused) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Paused", width / 2, height / 2);
    return;
  }
  
  if (isVisualizing && !complete) {
    frameCounter++;
    if (frameCounter >= stepDelay) {
      visualizeStep();
      frameCounter = 0;
    }
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    index_select_point = findPoint(mouseX, mouseY);
    if (index_select_point === -1) {
      points.push(createVector(mouseX, mouseY));
      if (complete) {
        if (!isInsideHull(points[points.length - 1])) {
          computeFullHull();
        }
      }
    }
  }
}


function mouseDragged() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    if (index_select_point !== -1) {
      points[index_select_point].x = mouseX;
      points[index_select_point].y = mouseY;
      if (complete) {
        computeFullHull();
      }
    }
  }
}

function mouseReleased() {
  index_select_point = -1;
}

function keyPressed() {
  if ((keyCode === DELETE || keyCode === BACKSPACE) && index_select_point !== -1) {
    points.splice(index_select_point, 1);
    index_select_point = -1;
    if (complete && points.length >= 3) {
      computeFullHull();
    } else {
      resetHull();
    }
    return;
  }

  if (keyCode === ENTER && points.length >= 3) {
    startVisualization();
  } else if (key === ' ') {
    isPaused = !isPaused;
  } else if (key === '+') {
    stepDelay = max(1, stepDelay - 5);
  } else if (key === '-') {
    stepDelay += 5;
  } else if (key === 'r' || key === 'R') {
    for (let i = 0; i < 10; i++) {
      points.push(createVector(random(50, width - 50), random(50, height - 50)));
    }
  } else if (key === 'c' || key === 'C') {
    points = [];
    resetHull();
  }
}

function drawPoints() {
  for (let i = 0; i < points.length; i++) {
    if (i === index_select_point) {
      fill('red');
    } else {
      fill('blue');
    }
    noStroke();
    ellipse(points[i].x, points[i].y, 8, 8);
  }
}

function drawHull() {
  if (hull.length > 1) {
    stroke('green');
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i of hull) {
      vertex(points[i].x, points[i].y);
    }
    if (complete) {
      endShape(CLOSE);
    } else {
      endShape();
    }
  }

  if (isVisualizing && !complete && currentVertex !== undefined) {
    stroke('blue');
    strokeWeight(3);
    line(points[currentVertex].x, points[currentVertex].y, points[checking].x, points[checking].y);
    stroke('orange');
    strokeWeight(3);
    line(points[currentVertex].x, points[currentVertex].y, points[nextVertex].x, points[nextVertex].y);
  }
}

function displaySpeedBar() {
  let maxBarWidth = 300;
  let barHeight = 20;
  let barX = 10;
  let barY = 30;

  let barWidth = map(stepDelay, 1, 20, maxBarWidth, 50);

  noStroke();
  fill(200);
  rect(barX, barY, maxBarWidth, barHeight);

  if (stepDelay <= 5) fill(0, 255, 0);
  else if (stepDelay <= 10) fill(255, 165, 0);
  else fill(255, 0, 0);

  rect(barX, barY, barWidth, barHeight);

  fill(0);
  textSize(16);
  text(`Speed: ${int(1000 / stepDelay)} (frames per step)`, barX, barY - 5);
}


function resetHull() {
  hull = [];
  complete = false;
  isVisualizing = false;
}

function startVisualization() {
  resetHull();
  isVisualizing = true;
  isPaused = false;
  let leftmost = 0;
  for (let i = 1; i < points.length; i++) {
    if (points[i].x < points[leftmost].x) leftmost = i;
  }
  currentVertex = leftmost;
  nextVertex = (currentVertex + 1) % points.length;
  checking = (nextVertex + 1) % points.length;
  hull.push(currentVertex);
  complete = false;
}

function visualizeStep() {
  if (orientation(points[currentVertex], points[nextVertex], points[checking]) < 0) {
    nextVertex = checking;
  }

  checking = (checking + 1) % points.length;

  if (checking === currentVertex) {
    hull.push(nextVertex);
    if (nextVertex === hull[0]) {
      complete = true;
      isVisualizing = false;
    } else {
      currentVertex = nextVertex;
      nextVertex = (currentVertex + 1) % points.length;
      checking = (nextVertex + 1) % points.length;
    }
  }
}

function computeFullHull() {
  if (points.length < 3) {
    hull = [];
    for (let i = 0; i < points.length; i++) {
      hull.push(i);
    }
    complete = false;
    return;
  }

  let newHull = [];
  let leftmost = 0;
  for (let i = 1; i < points.length; i++) {
    if (points[i].x < points[leftmost].x) leftmost = i;
  }
  let current = leftmost;
  do {
    newHull.push(current);
    let candidate = (current + 1) % points.length;
    for (let i = 0; i < points.length; i++) {
      if (orientation(points[current], points[i], points[candidate]) < 0) {
        candidate = i;
      }
    }
    current = candidate;
  } while (current !== leftmost);

  hull = newHull;
  complete = true;
}

function isInsideHull(pt) {
  let n = hull.length;
  if (n < 3) return false;
  for (let i = 0; i < n; i++) {
    let a = points[hull[i]];
    let b = points[hull[(i + 1) % n]];
    if (orientation(a, b, pt) < 0) {
      return false;
    }
  }
  return true;
}

function orientation(p, q, r) {
  let val = (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
  if (val > 0) return 1;
  if (val < 0) return -1;
  return 0;
}

function findPoint(x, y) {
  for (let i = 0; i < points.length; i++) {
    let d = dist(x, y, points[i].x, points[i].y);
    if (d < 10) return i;
  }
  return -1;
}

function createVector(x, y) {
  return { x, y };
}

