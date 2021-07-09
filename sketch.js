var cities = [];
var totalCities = 25;

var population = [];
var popSize = 10000;
var fitness = [];

var recordDistance = Infinity;
var bestEver;
var currentBest;

var pGeneration;
var pBest;

var generation = 0;


function setup() {
  createCanvas(640, 640);
  //frameRate(5);

  var order = [];

  pGeneration = createP("Generation #: ");
  pBest = createP("Best Distance: ");

  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(10, width - 10), random(10, (height / 2) - 10));
    cities[i] = v;
    order[i] = i;
  }

  for (i = 0; i < popSize; i++) {
    population[i] = order.slice();
    shuffle(population[i], true);
  }



}

function draw() {
  background(0);
  
    //GA
  calculateFitness();
  normalizeFitness();
  nextGeneration();

  
  //best graph
  //city dots
  stroke(255);
  fill(255);
  strokeWeight(1);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 10);
  }
  
  
  //path
  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);
  beginShape();
  for (var i = 0; i < bestEver.length; i++) {
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();
  
  //current graph
  translate(0, (height/2))
    //city dots
  stroke(255);
  fill(255);
  strokeWeight(1);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 10);
  }
  
  //path
  noFill();
  stroke(255);
  strokeWeight(1);
  beginShape();
  for (var i = 0; i < currentBest.length; i++) {
    var n = currentBest[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  pGeneration.html("Generation #: " + generation);
}

//swap 2 indexes in an array
function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function calcDistance(points, order) {
  var sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    var d = p5.Vector.dist(cityA, cityB);
    sum += d;
  }
  return sum;
}