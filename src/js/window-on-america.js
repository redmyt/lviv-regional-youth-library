// Switch on window on america animation when user goes to the woa section
viewsCallbacks.windowOnAmericaScope = {};
viewsCallbacks.windowOnAmericaScope.callbacks = []
var firstWoaAnimation,
secondWoaAnimation;


function() {

}
if(window.location.hash === '#window-on-america') {
    firstWoaAnimation = switchOnWoaAnimation($firstWindowOnAmericaImage, 20000);
    secondWoaAnimation = switchOnWoaAnimation($secondWindowOnAmericaImage, 25000);
} else {
    switchOfWoaAnimation(firstWoaAnimation);
    switchOfWoaAnimation(secondWoaAnimation);
}
