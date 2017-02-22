(function () {

// var sliderInterval = 
var slidingPictures = $('.new-books-slider__sliding-picture-wrapper');
setInterval(function() {
  slidThePictures(slidingPictures); 
}, 50);

// setInterval(function(){ alert("Hello"); }, 3000);

// $('#btn').click(function() {
//   slider(items); 
// });

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

})();