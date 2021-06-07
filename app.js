var $toneSquare = $('#tr-square');
$(document).ready(function() {

  $('#draw').on('click', function() {
    var n = $('input').val();
    drawSquares(n);
  })



});

var drawSquares = function(n) {
  $toneSquare.html('');
  if (n > 12 || n < 1) {
    alert('Please provide a row number between 1 and 12.');
  }
  if (!n) {
    n = 12;
  }
  for (var i = 0; i < n; i++) {
    var $row = $('<div>').addClass('tr')
    for (var j = 0; j < n; j++) {
      var $pitch = $('<div>').addClass('pitch-box');
      $row.prepend($pitch)
    }
    $row.appendTo($toneSquare);
  }
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

