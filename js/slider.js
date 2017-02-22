(function () {

// Save all new book pictures to variable 
var slidingPictures = $('.new-books-slider__sliding-picture-wrapper');

// Variable for checking the slider pause
// var isPaused = false;

// Start slide each of books picture
// var sliderInterval = setInterval(function() {
//   if (isPaused === false) {
//     slidThePictures(slidingPictures); 
//   }
// }, 50);

// Implement the slider. Change position of picture and when it bacomes less than -265 add the picture to the flow start
function  slidThePictures(itemsForSliding) {
  $(itemsForSliding).each(function() {
    var startPosition = parseInt( $(this).css('top') );
    if (startPosition === -265) {
      var finalPosition = 1060 + 'px';
    } else {
      var finalPosition = startPosition - 1 + 'px';
    }
    $(this).css('top', finalPosition);
  }); 
}

// Stop the slider when user hovers it
var slider = ('.new-books-slider__picteres-slide-section');
$(slider).hover(function() {
  isPaused = true;
}, function() {
  isPaused = false;
});

// Start mouse picture scroll function FOR TESTING
mousePictureSlide(slidingPictures);


// to do start write function which move pictures when we scroll mouse
function mousePictureSlide(itemsForSliding) {
  // debugger
  document.getElementById('id').addEventListener("mousewheel", function(e) {
    $(itemsForSliding).each(function() {
    var startPosition = parseInt( $(this).css('top') );
    if (startPosition === -265) {
      var finalPosition = 1060 + 'px';
    }
    if(e.deltaY === -100) {
    // up
      var finalPosition = startPosition - 50 + 'px';
    } else {
      // down
      var finalPosition = startPosition + 50 + 'px';
    }
    $(this).css('top', finalPosition);
  }); 
  });
}


// setInterval(function(){ alert("Hello"); }, 3000);

// $('#btn').click(function() {
//   slider(items); 
// });

})();