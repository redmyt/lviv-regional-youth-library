(function () {

// var sliderInterval = 
// setInterval( slider(), 1000);

var items = $('.new-books-slider__new-book-item-wrapper');

$('#btn').click(function() {
  slider(items); 
});

function  slider(items) {
  $(items).each(function() {
    // debugger
    var startPosition = parseInt( $(this).css('top') );
    var finalPosition = startPosition - 5 + 'px';
    $(this).css('top', finalPosition);
  }); 
}

})();