$(function () {
    var options = {
        height: window.innerHeight,
        width: window.innerWidth,
        x_colors: ['#e64a19', '#651616', '#e64a19'],
        y_colors: 'match_x',
        variance: 2,
        cell_size: 70,
        seed: 'wov6o'
    };

    var ab_options = {
        selector:'.bg',
        normalizeTextColor:   true

    };


    var bodyHeight = $('body').height();
    var $_bg = $('.bg');
    var $_container = $('.container');

    var index = 1;
    var pi = 3.14;
    var frequency = 10;
    var sin = 0;
    window.pattern = new Trianglify(options);
    var url = 'url(' + window.pattern.png() + ')';
    $_bg.css('background-image', url);

    function sine(start) {
        sin = (1+Math.sin(2 * pi * frequency * start))*100;
        options.variance = (((sin + 1) / bodyHeight) * 100);
        delete window.pattern;
        window.pattern = new Trianglify(options);
        $_bg.css('background-image', 'url(' + window.pattern.png() + ')');
    }

    window.setInterval( function(){
        sine(index);
        index++
    }, 600 );

    window.addEventListener("deviceorientation", handleOrientation, false);
    function handleOrientation(event) {
        var tiltLR = event.alpha;
        var tiltFB = event.beta;
        var rotateLR = event.gamma;
        $_container.css('transform',"rotate("+ (tiltLR*-1) +"deg) rotateY("+rotateLR+"deg) rotateX("+(tiltFB)+"deg)");
    }
});

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function statusChangeCallback(response){
    var $_fbBtn = $('.fb__btn');
    console.log($_fbBtn);
    console.log(response);
    if(response.status == 'connected'){
        FB.api('/me', {fields: 'first_name',access_token:response.authResponse.accessToken}, function(response) {
            $('.js-name').text('Waletynek, '+response.first_name+' !');
        });
        $_fbBtn.hide();
    }else{
        $_fbBtn.show();
    }
}




