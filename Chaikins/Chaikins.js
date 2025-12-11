let Points = [];

class Point{
 constructor(x,y,a){
 this.x = x
 this.y = y
 this.a = a
 }
}

let slider;

function setup() {
createCanvas(500,500);
background(0);

  slider = createSlider(0, 5,0);
  slider.position(500, 250);
  slider.size(80);


}


function drawPoints(points) {
background(0)

  for (let i = 0; i < points.length; i++) {
    fill(255,0,0)
    circle(points[i].x, points[i].y, 5)
    stroke(0,255,0)
   
    line(points[i].x, points[i].y, points[(i+1)%points.length].x, points[(i+1)%points.length].y)
    
  }
  noFill();
}

function chaikin(points, times) {

  let newPoints = points;

  for (let t = 0; t < times; t++) {
    let refined = [];

    for (let i = 0; i < newPoints.length; i++) {
      let P = newPoints[i];
      let Q = newPoints[(i + 1) % newPoints.length];

      let qx = 0.75 * P.x + 0.25 * Q.x;
      let qy = 0.75 * P.y + 0.25 * Q.y;

      let px = 0.25 * P.x + 0.75 * Q.x;
      let py = 0.25 * P.y + 0.75 * Q.y;

      refined.push(new Point(qx, qy, getAngle(qx, qy)));
      refined.push(new Point(px, py, getAngle(px, py)));
    }

    newPoints = refined;
  }

  return newPoints;
}

  
function doubleClicked(){
  let x = mouseX;
  let y = mouseY;
  
  let a = getAngle(x,y)
  Points.push(new Point(x,y,a));
  
  Points = sortList(Points);
  drawPoints(Points)
  
}

function sortList(Points){
  Points.sort((a,b) =>  parseFloat(a.a) - parseFloat(b.a));
  return Points;
}
function getAngle(x,y){
  let cx = x - 250;
  let cy = y - 250;

  let a = Math.atan2(cy, cx) * 180 / Math.PI;
  if (a < 0) a += 360;
  return a;
}

function draw() {
  background(0);

  let times = slider.value();
  let smoothed = chaikin(Points, times);

  drawPoints(smoothed);
}
