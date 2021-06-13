var $toneSquare = $('#tr-square');
var toneSquare = [];
var mode = 'numeric';
var rowLength = 12;
var clicked = 0;

$(document).ready(function() {

  // Default view
  drawSquares(rowLength);
  drawPitchButtons();
  $('#numeric').removeClass('btn-dark').addClass('btn-danger');

  $('#draw').on('click', function() {
    clearAll();

    // Check/force input to be a whole number
    var res = checkInput(Number($('input').val()));
    if (!res) {
      return;
    } else {
      rowLength = res;
    }

    drawSquares(rowLength);
  });

  $('#random-pitch').on('click', function() {
    createAndFillSquare(rowLength, mode);
    $('#user-row').html('')
    var row = toneSquare[0];
    for (var i = 0; i < row.length; i++) {
      addRowText(row[i]);
    }
  })

  $('.mode').on('click', function() {
    mode = $(this).attr('id');

    $('button.mode').removeClass('btn-danger').addClass('btn-dark');
    $(this).removeClass('btn-dark').addClass('btn-danger');

    var $allPitchInputs = $('.pitch-input');

    $allPitchInputs.each(function(index, element) {
      var input = index;
      if (mode !== 'numeric') {
        input = convertToLetter(input, mode);
      }
      $(this).html(input);
    });

    if (toneSquare.length === rowLength) {
      var inputSquare = toneSquare;
      if (mode !== 'numeric') {
        inputSquare = convertSquareToLetters(toneSquare, mode);
      }
      fillSquares(inputSquare);
    }

    var $rowSpans = $('.original-row-item');
    if ($rowSpans) {
      $rowSpans.each(function(index, element) {
        var input = toneSquare[0][index] || toneSquare[index];
        if (mode !== 'numeric') {
          input = convertToLetter(input, mode);
        }
        $(this).html(input);
      })
    }
  });

  $('#randomize').on('click', function() {
    var randomLength = Math.floor(Math.random() * 12) + 1;
    createAndFillSquare(randomLength, mode);
    rowLength = randomLength;
    $('#user-row').html('');
    makeAllUnclicked();
    var row = toneSquare[0];
    for (var i = 0; i < row.length; i++) {
      addRowText(row[i]);
    }
  });

  $('.pitch-input').on('click', function() {
    if (!clicked) {
      clearAll();
    }
    clicked++;
    var n = Number($(this).attr('id'));
    addRowText(n);

    toneSquare.push(n);
    $(this).addClass('clicked');

    if (rowLength === clicked) {
      toneSquare = calcSquareValues(toneSquare);
      var inputSquare = toneSquare;
      if (mode !== numeric) {
        inputSquare = convertSquareToLetters(toneSquare, mode);
      }
      fillSquares(inputSquare);
      makeAllClicked();
    }
  });

  $('#clear').on('click', clearAll)
});

// Functions to build and fill the tone square
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

var createShuffledNumList = function(n) {
  var pitches = shuffleAllPitches();
  var maxLength = pitches.length - n;
  var randStart = Math.floor(Math.random() * maxLength);
  return pitches.slice(randStart, randStart + n);
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

var calcSquareValues = function(oRow) {
  var invertedValues = calcInvertedValues(oRow);

  var square = invertedValues.map(function(transposingValue){
    return oRow.map(function(currentPitch) {
      return octaveReduce(currentPitch + transposingValue);
    });
  });

  return square;
}

var fillSquares = function(arr) {

  $('.tr').each(function(i, row) {
    $('.pitch-box', this).each(function(j, box) {
      var input = arr[i][j];
      $(this).html(input);
    });
  });
}

var createAndFillSquare = function(n, mode) {
  drawSquares(n);
  var originalRow = createShuffledNumList(n);
  toneSquare = calcSquareValues(originalRow);

  if (mode !== 'numeric') {
    var letters = convertSquareToLetters(toneSquare, mode);
    fillSquares(letters);
  } else {
    fillSquares(toneSquare);
  }
}

// Functions to handle letter/number switching
var convertSquareToLetters = function(arr, pref) {

  // Make a copy of the nested array
  var squareInLetters = arr.map(function(a) {
    return a.slice();
  });

  for (var i = 0; i < squareInLetters.length; i++) {
    for (var j = 0; j < squareInLetters[i].length; j++) {
      squareInLetters[i][j] = convertToLetter(squareInLetters[i][j], pref);
    }
  }
  return squareInLetters;
}

var convertToLetter = function(num, pref) {

  var letters = {
    0: 'C',
    2: 'D',
    4: 'E',
    5: 'F',
    7: 'G',
    9: 'A',
    11: 'B'
  };
  if (pref === 'sharp') {
    return letters[num] ? letters[num] : letters[num - 1] + '&#9839;'
  }
  return letters[num] ? letters[num] : letters[num + 1] + '&#9837'
}

// Layout helper functions
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

var drawPitchButtons = function(pref) {
  $pitchInputArea = $('#pitches');
  for (var i = 0; i < 12; i++) {
    $pitchButton = $('<div>').addClass('pitch-input').attr('id', i)
    $pitchButton.text(i)
    $pitchInputArea.append($pitchButton);
  }
}

var clearAll = function() {
  $('.pitch-box').html('');
  toneSquare = [];
  makeAllUnclicked();
  $('#user-row').html('');
}

var makeAllClicked = function() {
  $('.pitch-input').addClass('clicked');
  clicked = 12;
}

var makeAllUnclicked = function() {
  $('.pitch-input').removeClass('clicked');
  clicked = 0;
}

var addRowText = function(str) {
  if (mode !== 'numeric') {
    str = convertToLetter(str, mode);
  }
  var $rowItem = $('<span>').addClass('original-row-item').html(str)
  $('#user-row').append($rowItem);
}