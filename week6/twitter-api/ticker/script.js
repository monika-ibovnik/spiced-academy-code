
$(document).ready(function ready(){
    var ticker = $('#dogeTicker');
    var insertHtml = '';
    var request = $.ajax({
        url: "http://localhost:8080/headlines.json",
        method : "GET",
        success: function(data){
            for(var i = 0; i < data.headlines.length; i++){
                insertHtml += '<a href="' + data.headlines[i].url + '">' + data.headlines[i].text + '<a>';
            }
            $('#dogeTicker').html(insertHtml);
            moveTicker();
        }
    });

    function moveTicker(){
        ticker.animate({left: '-=1'}, 10, function fn(){
            if(ticker.offset().left <= 0 - ticker.children().first().outerWidth()){
                ticker.append(ticker.children().first());
                ticker.offset({left: 0});
            }
            moveTicker();
        });
    }

    ticker.on('mouseover', function fn(e){
        ticker.stop();
    });
    ticker.on('mouseout', function fn(e){
        moveTicker();
    });
});
