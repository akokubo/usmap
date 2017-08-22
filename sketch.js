var mapImage;
var locationTable;
var rowCount;
var dataTable;
var dataMin = Number.MAX_VALUE;
var dataMax = Number.MIN_VALUE;

function preload() {
  mapImage = loadImage("assets/map.png");
  locationTable = new Table("assets/locations.tsv");
  dataTable = new Table("assets/random.tsv");
}

function setup() {
  var row, value;

  createCanvas(640, 400);
  rowCount = locationTable.getRowCount();

  for (row = 0; row < rowCount; row += 1) {
    value = dataTable.getFloat(row, 1);
    if (value > dataMax) {
      dataMax = value;
    }
    if (value < dataMin) {
      dataMin = value;
    }
  }
}

function draw() {
  var row, abbrev, x, y;

  background(255);
  image(mapImage, 0, 0);

  smooth();
  fill(192, 0, 0);
  noStroke();

  for (row = 0; row < rowCount; row += 1) {
    abbrev = dataTable.getRowName(row);
    x = locationTable.getFloat(abbrev, 1);
    y = locationTable.getFloat(abbrev, 2);
    drawData(x, y, abbrev);
  }
}

function drawData(x, y, abbrev) {
  var value, percent, between;

  value = dataTable.getFloat(abbrev, 1);
  percent = norm(value, dataMin, dataMax);
  between = lerpColor(color('#FF4422'), color('#4422CC'), percent);
  fill(between);
  ellipse(x, y, 15, 15);
}
