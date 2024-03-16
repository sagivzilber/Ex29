var FPS = 60;

/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("canvas");
var canvasHeight = canvas.getAttribute("height");
var canvasWidth = canvas.getAttribute("width");

var ctx = canvas.getContext("2d");

function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawCircle(x, y, r, color = "black") {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawRectangle(x, y, width, height, color = "black") {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fill();
}

function ballBouncingBetweenWalls(x, y, r) {
  var newX = x;

  var direction = 1; // right

  setInterval(() => {
    clearCanvas();
    drawCircle(newX, y, r);
    if (newX + r >= canvasWidth) {
      direction = -1;
    } else if (newX - r <= 0) {
      direction = 1;
    }
    newX += 3 * direction;
  }, 1000 / FPS);
}

// ballBouncingBetweenWalls(100, 100, 50);

function ballMovingRight(x, y, r) {
  var newX = x;

  setInterval(() => {
    clearCanvas();
    drawCircle(newX, y, r);
    if (newX - r >= canvasWidth) {
      newX = -r;
    } else {
      newX += 3;
    }
  }, 1000 / FPS);
}

// ballMovingRight(100, 100, 50);

function drawLine(x1, y1, x2, y2, color) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function parseColor(colorSegment) {
  switch (colorSegment) {
    case 1:
      return "red";
    case 2:
      return "green";
    case 3:
      return "blue";
    default:
      throw Error("colorSegment must be one of {1,2,3}");
  }
}

function drawLines(lines) {
  for (var i = 0; i < lines.length; i += 5) {
    drawLine(lines[i], lines[i + 1], lines[i + 2], lines[i + 3], parseColor(lines[i + 4]));
  }
}

// drawLines([100, 100, 150, 150, 1, 300, 350, 250, 250, 2]);

var radius = 30;
var x = canvasWidth / 2;
var y = canvasHeight / 2;
// drawCircle(x, y, radius, "red");

function resizeCircle(sizeChange) {
  radius += sizeChange;
  clearCanvas();
  drawCircle(x, y, radius, "red");
}

function moveCircle(xChange, yChange) {
  x += xChange;
  y += yChange;
  clearCanvas();
  drawCircle(x, y, radius, "red");
}

function onKeyDown(event) {
  switch (event.key) {
    case "=":
      resizeCircle(10);
      break;
    case "-":
      resizeCircle(-10);
      break;
    case "ArrowRight":
      moveCircle(10, 0);
      break;
    case "ArrowLeft":
      moveCircle(-10, 0);
      break;
    case "ArrowUp":
      moveCircle(0, -10);
      break;
    case "ArrowDown":
      moveCircle(0, 10);
      break;
    default:
      break;
  }
}

var colors = [
  `AliceBlue`,
  `AntiqueWhite`,
  `Aqua`,
  `Aquamarine`,
  `Azure`,
  `Beige`,
  `Bisque`,
  `Black`,
  `BlanchedAlmond`,
  `Blue`,
  `BlueViolet`,
  `Brown`,
  `BurlyWood`,
  `CadetBlue`,
  `Chartreuse`,
  `Chocolate`,
  `Coral`,
  `CornflowerBlue`,
  `Cornsilk`,
  `Crimson`,
  `Cyan`,
  `DarkBlue`,
  `DarkCyan`,
  `DarkGoldenRod`,
  `DarkGray`,
  `DarkGrey`,
  `DarkGreen`,
  `DarkKhaki`,
  `DarkMagenta`,
  `DarkOliveGreen`,
  `Darkorange`,
  `DarkOrchid`,
  `DarkRed`,
  `DarkSalmon`,
  `DarkSeaGreen`,
  `DarkSlateBlue`,
  `DarkSlateGray`,
  `DarkSlateGrey`,
  `DarkTurquoise`,
  `DarkViolet`,
  `DeepPink`,
  `DeepSkyBlue`,
  `DimGray`,
  `DimGrey`,
  `DodgerBlue`,
  `FireBrick`,
  `FloralWhite`,
  `ForestGreen`,
  `Fuchsia`,
  `Gainsboro`,
  `GhostWhite`,
  `Gold`,
  `GoldenRod`,
  `Gray`,
  `Grey`,
  `Green`,
  `GreenYellow`,
  `HoneyDew`,
  `HotPink`,
  `IndianRed`,
  `Indigo`,
  `Ivory`,
  `Khaki`,
  `Lavender`,
  `LavenderBlush`,
  `LawnGreen`,
  `LemonChiffon`,
  `LightBlue`,
  `LightCoral`,
  `LightCyan`,
  `LightGoldenRodYellow`,
  `LightGray`,
  `LightGrey`,
  `LightGreen`,
  `LightPink`,
  `LightSalmon`,
  `LightSeaGreen`,
  `LightSkyBlue`,
  `LightSlateGray`,
  `LightSlateGrey`,
  `LightSteelBlue`,
  `LightYellow`,
  `Lime`,
  `LimeGreen`,
  `Linen`,
  `Magenta`,
  `Maroon`,
  `MediumAquaMarine`,
  `MediumBlue`,
  `MediumOrchid`,
  `MediumPurple`,
  `MediumSeaGreen`,
  `MediumSlateBlue`,
  `MediumSpringGreen`,
  `MediumTurquoise`,
  `MediumVioletRed`,
  `MidnightBlue`,
  `MintCream`,
  `MistyRose`,
  `Moccasin`,
  `NavajoWhite`,
  `Navy`,
  `OldLace`,
  `Olive`,
  `OliveDrab`,
  `Orange`,
  `OrangeRed`,
  `Orchid`,
  `PaleGoldenRod`,
  `PaleGreen`,
  `PaleTurquoise`,
  `PaleVioletRed`,
  `PapayaWhip`,
  `PeachPuff`,
  `Peru`,
  `Pink`,
  `Plum`,
  `PowderBlue`,
  `Purple`,
  `Red`,
  `RosyBrown`,
  `RoyalBlue`,
  `SaddleBrown`,
  `Salmon`,
  `SandyBrown`,
  `SeaGreen`,
  `SeaShell`,
  `Sienna`,
  `Silver`,
  `SkyBlue`,
  `SlateBlue`,
  `SlateGray`,
  `SlateGrey`,
  `Snow`,
  `SpringGreen`,
  `SteelBlue`,
  `Tan`,
  `Teal`,
  `Thistle`,
  `Tomato`,
  `Turquoise`,
  `Violet`,
  `Wheat`,
  `White`,
  `WhiteSmoke`,
  `Yellow`,
  `YellowGreen`
];
function randomColor() {
  var randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function ex4() {
  var xSize = 400;
  var ySize = 400;

  var rows = 5;
  var columns = 5;

  var rectWidth = xSize / rows;
  var rectHeight = ySize / columns;

  var bigCircleR = rectWidth / 2;
  var smallCircleR = rectWidth / 3;

  for (var i = 0; i <= rows; i++) {
    for (var j = 0; j <= columns; j++) {
      drawRectangle(i * rectWidth, j * rectHeight, rectWidth, rectHeight, randomColor());
      var rectXCenter = i * rectWidth + rectWidth / 2;
      var rectYCenter = j * rectHeight + rectHeight / 2;
      drawCircle(rectXCenter, rectYCenter, bigCircleR, randomColor());
      drawCircle(rectXCenter, rectYCenter, smallCircleR, randomColor());
    }
  }
}

// ex4();
