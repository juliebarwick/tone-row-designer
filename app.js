var $toneSquare = $('#tr-square');

$(document).ready(function() {

  $('#draw').on('click', function() {
    var n = $('input').val();
    drawSquares(n);
  })



});

var drawSquares = function(n) {

  if (n > 12 || n < 1) {
    alert('Please provide a row number between 1 and 12.');
    return;
  }

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


var shuffle = function(arr) {
  var res = arr.slice();
  for (var i = res.length - 1; i > 0; i--) {
    var randomNum = Math.floor(Math.random() * i);
    var temp = res[i];
    res[i] = res[randomNum];
    res[randomNum] = temp
  }

  return res;
}



var originalRow = [];

const N = 12;
while (originalRow.length < N) {
  var randInt1to12 = Math.floor(Math.random() * (N))
  var match = false;
  for (var i = 0; i <= originalRow.length; i++) {
    if (originalRow[i] === randInt1to12) {
      match = true;
    }
  }
  if (!match) {
    originalRow.push(randInt1to12);
  }
}

var toneSquare = [];

var transposingRowValues = []
for (var i = 0; i < originalRow.length; i++) {
  var invertedTransposing = (originalRow[0] - originalRow[i]);
  transposingRowValues.push(invertedTransposing);
}

var octaveReduce = function(n) {

}
function octaveReduce(n) {
  return ((n % 12) + 12) % 12;
}

for (var i = 0; i < N; i++) {
  var row = [];
  for (var j = 0; j < N; j++) {
    var note = octaveReduce(transposingRowValues[i] + originalRow[j])
    row.push(note);
  }
  toneSquare.push(row);
}

// console.log(toneSquare);

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

