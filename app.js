var $toneSquare = $('#tr-square');

$(document).ready(function() {

  // Default view
  drawSquares();

  $('#draw').on('click', function() {
    var n = Number($('input').val());

    // Check/force input to be a whole number
    var res = checkInput(n);
    if (!res) {
      return;
    } else {
      n = res;
    }

    drawSquares(n);
    createShuffledNumList(n);
  })

});

var drawSquares = function(n) {

  $toneSquare.html('');

  if (!n) {
    n = 12;
  }

  for (var i = 0; i < n; i++) {
    var $row = $('<div>').addClass('tr');
    for (var j = 0; j < n; j++) {
      var $pitch = $('<div>').addClass('pitch-box');
      $row.prepend($pitch)
    }
    $row.appendTo($toneSquare);
  }
}

var generateListOfPitches = function(n) {
  if (n === undefined || n < 1) {
    n = 12;
  }
  var res = [];
  for (var i = 0; i < n; i++) {
    res.push(i);
  }
  return res;
}

var shuffleAllPitches = function() {
  var pitches = generateListOfPitches(12);
  for (var j = pitches.length - 1; j > 0; j--) {
    // Get a random index number, from current current index to
    var randomNum = Math.floor(Math.random() * j);
    // Swap current element with randomly selected element
    var temp = pitches[j];
    pitches[j] = pitches[randomNum];
    pitches[randomNum] = temp
  }
  return pitches;
}

var checkInput = function(x) {
  if (isNaN(x)) {
    alert('Please provide a valid number');
    return false;
  }

  x = Math.round(x);

  if (x > 12 || x < 1) {
    alert('Please provide a row number between 1 and 12.');
    return false;
  }

  return x;
}

var createShuffledNumList = function(n) {
  var pitches = shuffleAllPitches();
  var maxLength = pitches.length - n;
  var randStart = Math.floor(Math.random() * maxLength);
  console.log(pitches.slice(randStart, randStart + n))
}

var octaveReduce = function(n) {
  return ((n % 12) + 12) % 12;
}

var calcInvertedValues = function(arr) {
  var first = arr[0];
  return arr.map(function(el) {
    return first - el;
  });
}

function prettyPrintRow(square) {
  for (var i = 0; i < square.length; i++) {
    var strRow = [];
    for (var j = 0; j < square[i].length; j++) {
      var str = square[i][j].toString();
      strRow.push(str.padStart(2, ' '));
    }
    console.log(strRow.join("\t"));
  }
}

