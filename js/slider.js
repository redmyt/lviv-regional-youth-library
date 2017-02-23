(function () {

// Save all slide new book pictures to one variable 
var slidingPictures = $('.new-books-slider__sliding-picture-wrapper').toArray();
var par = $('.new-books-slider__picteres-slide-section');

// Variable for checking the slider pause
var isPaused = false;

// Start slide each of books picture
var sliderInterval = setInterval(function() {
  if (isPaused === false) {
    slidThePictures(slidingPictures, par);  
  }
}, 25);


// 
// Implement the slider. Change position of picture and when it bacomes less than -265 add the picture to the flow start
function  slidThePictures(itemsForSliding, slidingElementsWrapper) {
  // $(itemsForSliding).each(function()
  // {
  var firstSlidingElement =  itemsForSliding[0];
  var firstElementHeight = $(firstSlidingElement).height();
  var parentElementScroll = $(slidingElementsWrapper).scrollTop();
  if ( parentElementScroll === firstElementHeight ) {
    // debugger
    $(slidingElementsWrapper).append(firstSlidingElement);
    itemsForSliding.shift();
    itemsForSliding. push(firstSlidingElement);

  } else {
    parentElementScroll++;
    $(slidingElementsWrapper).scrollTop(parentElementScroll);
  }
    // var aaray = itemsForSliding;
    // var startPosition = parseInt( $(this).css('top') );
    // var startPosition = $(this).position();
    // var a = this.scrollTop;
        // startPosition = startPosition.top;
    // var elementHeight = $(this).height();
    // if (startPosition === - elementHeight) {
      // var finalPosition = 1060 + 'px';
    // } else {
      // var finalPosition = startPosition - 1;
    // }
    // $(this).css('top', finalPosition);
    // $(this).offset( {top:finalPosition, left:0} );
  // }); 
}

// Stop the slider when user hovers it
// var slider = ('.new-books-slider__picteres-slide-section');
// $(slider).hover(function() {
//   isPaused = true;
// }, function() {
//   isPaused = false;
// });

// Start mouse picture scroll function FOR TESTING
// mousePictureSlide(slidingPictures);


// to do start write function which move pictures when we scroll mouse
// function mousePictureSlide(itemsForSliding) {
//   // debugger
//   document.getElementById('id').addEventListener("mousewheel", function(e) {
//     $(itemsForSliding).each(function() {
//     var startPosition = parseInt( $(this).css('top') );
//     if (startPosition === -265) {
//       var finalPosition = 1060 + 'px';
//     }
//     if(e.deltaY === -100) {
//     // up
//       var finalPosition = startPosition - 50 + 'px';
//     } else {
//       // down
//       var finalPosition = startPosition + 50 + 'px';
//     }
//     $(this).css('top', finalPosition);
//   }); 
//   });
// }


// setInterval(function(){ alert("Hello"); }, 3000);

// $('#btn').click(function() {
//   slidThePictures(slidingPictures, par); 
// });


})();