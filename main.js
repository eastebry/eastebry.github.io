$(document).ready(function(){
  var offset = (screen.width/2);
  var initial = (screen.width/4);
  var opacity = 0;

  for (var i=0; i<5; i++){
    $("#bg-" + i).css('left', offset/(i+1) - initial);;
  }
  $("body").mousemove(function( event ) {
    var interval;
    if (opacity == 0){
      interval = setInterval(function(){ 
        opacity += .01
        $('.fadein').css('opacity', opacity);
        if(opacity > 1)
          clearInterval(interval);
      }, 100);
    }
    var offsetX = (event.pageX/screen.width)*50;
    var offsetY = (event.pageY/screen.height)*100;
    var initialX = (screen.width/4);
    for (var i=0; i<5; i++){
      $("#bg-" + i).css('left', offsetX/(Math.pow(i+1,2)) - initialX);;
    }
  });
});
