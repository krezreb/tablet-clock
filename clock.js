let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let myFont;

let clock_bg = "#F7AF9D"; 
let clock_hands = "#2FF3E0";
let digital_time = "#FA26A0";
let fulldate = "#d28aa0"; 

clock_bg = "#444";
clock_accent = "#2FF3E0";
clock_hands = "#F8D210" ;
clock_hands_accent = "#000000";
digital_time = "#FA26A0";
fulldate = "#F8D210";
let fulldate_accent = "#F51720"

function preload() {
  myFont = loadFont('./JetBrainsMono-Bold.ttf');
}

let W = 900

function setup() {
  h = W*1.7
  createCanvas(W, h);
  stroke(255);
  frameRate(2); 
  let radius = W / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  cx = width / 2;
  cy = (height / 2)+160;
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
  stroke(0);
  noStroke();
  textAlign(CENTER, TOP);

  var d = new Date();

  today = dayStr(d.getDay())
  month = monthStr(d.getMonth())
  textSize(50);
  Den = today.split("|")[0].trim();
  Dfr = today.split("|")[1].trim();

  Men = month.split("|")[0].trim();
  Mfr = month.split("|")[1].trim();


  fill(fulldate_accent);
  // english date
  text(Den.toUpperCase()+" "+Men+" "+ordinal_suffix_of(d.getDate())+", "+ d.getFullYear(),W/2, 95);
  fill(fulldate);
  text(Den.toUpperCase()+" "+Men+" "+ordinal_suffix_of(d.getDate())+", "+ d.getFullYear(),W/2-2, 95-2);
  
  // french date
  fill(fulldate_accent);

  text(Dfr.toUpperCase()+" "+d.getDate()+" "+Mfr+", "+ d.getFullYear(),W/2, 160);
  fill(fulldate);

  text(Dfr.toUpperCase()+" "+d.getDate()+" "+Mfr+", "+ d.getFullYear(),W/2-2, 160-2);


  textSize(250);

  fill("#EEEEEE");
  text(String(d.getHours()).padStart(2, '0')+":"+String(d.getMinutes()).padStart(2, '0'),W/2, 220);
  fill(digital_time);
  text(String(d.getHours()).padStart(2, '0')+":"+String(d.getMinutes()).padStart(2, '0'),W/2+6, 220+6);
  //fill(20,20,20);

  // Draw the clock background
  noStroke();
  fill(clock_accent);
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(clock_bg);
  ellipse(cx, cy-10, clockDiameter, clockDiameter);

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock

  // hour hand
  strokeWeight(15);
  stroke(clock_hands_accent);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
  stroke(clock_hands);
  line(cx-5, cy-5, cx -5 + cos(h) * hoursRadius, cy -5  + sin(h) * hoursRadius);

  // seconds hand
  stroke(255);
  stroke(clock_hands_accent);
  strokeWeight(2);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  stroke(clock_hands);
  line(cx+2, cy+2, cx+2 + cos(s) * secondsRadius, cy+2 + sin(s) * secondsRadius);
  
  // minute
  stroke(clock_hands_accent);
  strokeWeight(7);  
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  stroke(clock_hands);
  line(cx-4, cy-4, cx -4 + cos(m) * minutesRadius, cy -4 + sin(m) * minutesRadius);

  

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

  strokeWeight(40);
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
  strokeWeight(16);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 30) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();

 
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