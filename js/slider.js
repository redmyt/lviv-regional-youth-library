(function () {

    // Save all new book pictures for sliding to one variable 
    var slidingPictures = $('.new-books-slider__sliding-picture-wrapper').toArray(),
        // Save sliding pictures wrapper to variable 
        slidingPicturesWrapper = $('.new-books-slider__picteres-slide-section'), 
        // Variable for checking the slider pause
        isPaused = false;

    // Start slide each of books picture
    var sliderInterval = setInterval(function() {
        if (isPaused === false) {
            slidThePictures(slidingPictures, slidingPicturesWrapper);  
        }
    }, 25);

    // Implement the slider. Change scroll position of picture wrapper and when the first element height becomes equals scroll position change the DOM picture position
    function  slidThePictures(itemsForSliding, slidingElementsWrapper) {
        var firstSlidingElement = itemsForSliding[0],
            firstElementHeight = parseInt( $(firstSlidingElement).css('height') ),
            parentElementScroll = parseInt( $(slidingElementsWrapper).scrollTop() );
  
        if (parentElementScroll >= firstElementHeight) {
            var bodyScrollPosition = parseInt( document.body.scrollTop );
            $(slidingElementsWrapper).append(firstSlidingElement);
            document.body.scrollTop = bodyScrollPosition;
            itemsForSliding.shift();
            itemsForSliding. push(firstSlidingElement);;
        } else {
            parentElementScroll++;
            $(slidingElementsWrapper).scrollTop(parentElementScroll);
        }
    }

    // Stop the slider when user hovers it
    $(slidingPicturesWrapper).hover(function() {
        isPaused = true;
    }, function() {
        isPaused = false;
    });

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


// $('.btn').click(function() {
//   slidThePictures(slidingPictures, slidingPicturesWrapper);
// });

})();