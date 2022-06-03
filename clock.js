let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let myFont;

function preload() {
  myFont = loadFont('./JetBrainsMono-Bold.ttf');
}

let W = 900

function setup() {
  h = W*1.4
  createCanvas(W, h);
  stroke(255);

  let radius = W / 2.2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  cx = width / 2;
  cy = (height / 2)+200;
  textFont(myFont);
  setTimeout(location.reload, parseInt(Math.random()*10000000))
}

function goFullscreen() {
  // Get the element that we want to take into fullscreen mode
  var element = document.getElementById("body");

  // These function will not exist in the browsers that don't support fullscreen mode yet,
  // so we'll have to check to see if they're available before calling them.

  if (element.mozRequestFullScreen) {
    // This is how to go into fullscren mode in Firefox
    // Note the "moz" prefix, which is short for Mozilla.
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    // This is how to go into fullscreen mode in Chrome and Safari
    // Both of those browsers are based on the Webkit project, hence the same prefix.
    element.webkitRequestFullScreen();
 }
 // Hooray, now we're in fullscreen mode!
}

function dayStr(n){
  switch (n){
    case 0:
    return "sunday | dimanche";

    case 1:
    return "monday | lundi";

    case 2:
    return "tuesday | mardi";

    case 3:
    return "wednesday | mercredi";

    case 4:
    return "thursday | jeudi";

    case 5:
    return "friday | vendredi";

    case 6:
    return "saturday | samedi";

    }
}

function monthStr(n){
  switch (n){
    case 0:
    return "january | janvier";

    case 1:
    return "february | février";

    case 2:
    return "march | mars";

    case 3:
    return "april | avril";

    case 4:
    return "may | mai";

    case 5:
    return "june | juin";

    case 6:
    return "july | juillet";

    case 7:
    return "august | août";

    case 8:
    return "september | septembre";

    case 9:
    return "october | octobre";

    case 10:
    return "november | novembre";

    case 11:
    return "december | décembre";

    }
}

function ordinal_suffix_of(i) {
  var j = i % 10,
      k = i % 100;
  if (j == 1 && k != 11) {
      return i + "st";
  }
  if (j == 2 && k != 12) {
      return i + "nd";
  }
  if (j == 3 && k != 13) {
      return i + "rd";
  }
  return i + "th";
}

function draw() {
  clear();
  // Draw the clock background
  noStroke();
  fill(90,90,90);
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill("#644132");
  ellipse(cx, cy, clockDiameter, clockDiameter);

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  stroke(255);
  stroke("#d28aa0");
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(8);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  stroke(200);

  // Draw the minute ticks
  strokeWeight(1);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();

  // Draw the 3hr ticks
  stroke(122);

  strokeWeight(20);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 90) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }

  endShape();

  stroke(255);
  // Draw the hours ticks
  strokeWeight(8);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 30) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();

  textSize(250);
  var d = new Date();

  stroke(0);
  noStroke();
  textAlign(CENTER, TOP);

  fill("#6c7194");

  text(String(d.getHours()).padStart(2, '0')+":"+String(d.getMinutes()).padStart(2, '0'),W/2, 180);
  //fill(20,20,20);
  today = dayStr(d.getDay())
  month = monthStr(d.getMonth())
  textSize(50);
  Den = today.split("|")[0].trim();
  Dfr = today.split("|")[1].trim();

  Men = month.split("|")[0].trim();
  Mfr = month.split("|")[1].trim();

  fill("#d28aa0");
  text(Den.toUpperCase()+" "+Men+" "+ordinal_suffix_of(d.getDate())+", "+ d.getFullYear(),W/2, 75);
  text(Dfr.toUpperCase()+" "+d.getDate()+" "+Mfr+", "+ d.getFullYear(),W/2, 150);

}

function mouseDragged(event) {
  location.reload(); 
  // prevent default
  return false;
}


function doubleClicked(event) {
  goFullscreen('');
  return false;

}