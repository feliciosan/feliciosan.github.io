$(document).ready(function () {

    var desktop = window.innerWidth;
    // console.log(mobile);
    if(desktop > 768){
        $(".middle").mousemove(function(event){

            var relX = event.pageX;
            // var relY = event.pageY;
            var windowWidth = window.innerWidth;
            // var windowHeight = window.innerHeight;

            var width = (relX - (windowWidth / 2)) / 60;
            // var height = (relY - (windowHeight / 2)) / 45;
            // height = ((height / 50) + 1);

            $('.title-featured').css("transform","translateX("+(width*2)+"px)");

            $('.title-code').css("transform", "rotateY("+width+"deg) translateX("+(width*3)+"px)");

        });
    }

});


$(window).on("load", function() {
    $(".my-page-loading").fadeOut();
});