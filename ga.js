function calculateFitness() {
  var currentRecord = Infinity;
  for (i = 0; i < population.length; i++) {
    var d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
    }
    fitness[i] = 1 / pow((d + 1),10);
  }

  pBest.html("Best Distance: " + recordDistance);
}

function normalizeFitness() {
  var sum = 0;

  for (i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }

  for (i = 0; i < fitness.length; i++) {
    fitness[i] /= sum;
  }
}

function nextGeneration() {
  var newPopulation = [];
  for (var i = 0; i < population.length; i++) {
    var orderA = pickOne(population, fitness);
    var orderB = pickOne(population, fitness);
    var order = crossOver(orderA, orderB);
    mutate(order, 0.2);
    newPopulation[i] = order;
  }

  population = newPopulation;
  generation++;

}

function pickOne(list, prob) {
  var index = 0;
  var r = random(1);

  while (r > 0) {
    r -= prob[index];
    index++
  }
  index--;
  return list[index].slice();
}

function mutate(order, mutationRate) {
  for (var i = 0; i < cities.length; i++) {
    if (random(1) < mutationRate) {
      var indexA = floor(random(order.length));
      var indexB = (indexA + 1) % cities.length;
      
      swap(order, indexA, indexB);
    }
  }
}

function crossOver(orderA, orderB) {
  var start = floor(random(orderA.length));
  var end = floor(random(start + 1, orderA.length));
  var newOrder = orderA.slice(start, end);

  var left = cities.length - newOrder.length;
  for (var i = 0; i < orderB.length; i++) {
    var city = orderB[i];
    if (!newOrder.includes(city)) {
      newOrder.push(city);
    }
  }
  return newOrder;
}