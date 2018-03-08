jQuery(function($){
    var request;
    var inputField = $('spotifySearch');
    var searchResults = $('#searchResults');
    var insertHtml = '';
    var url = "https://elegant-croissant.glitch.me/spotify";
    var nextUrl;
    var query = '';
    var type = '';
    var scrollTimeout;
    $('#form').submit(function(e){
        e.preventDefault();
        $('#searchResults').empty();
        insertHtml = '';
        var formFields = $('#form').find(':input');
        formFields.each(function(){
            var element = $(this);
            if(element.attr('name') == 'searchText'){
                query = element.val();
            }else if(element.attr('name') == 'type'){
                if(element.is(':checked')){
                    type = element.attr('value');
                }
            }else if(element.attr('name') == 'submitBtn'){
                return;
            }
        });
        $('#searchResults').append('<h2>Results for your search:</h2>');
        requestData(url + '?q=' + encodeURIComponent(query) + '&type=' + type +'&limit=10');
    });


    $(document).on('scroll', function fn(e){
        if($(window).scrollTop() + $(window).height() == $(document).height()){
            if(nextUrl){
                function timeoutCallback(){
                    requestData(nextUrl);
                    nextUrl = '';
                }
                setTimeout(timeoutCallback, 1500);
            }
        }
    });

    function requestData(requestUrl){
        if(request){
            request.abort();
        }
        request = $.ajax({
            url: requestUrl,
            success: function(data){
                request = null;
                var insertHtml = '';
                var displayData = data.albums || data.artists;
                for(var i = 0; i < displayData.items.length; i++){
                    insertHtml += '<div id="result">';
                    if(displayData.items[i].images.length){
                        insertHtml += '<img src="' + displayData.items[i].images[0].url + '" alt="cover">';
                    }else{
                        insertHtml += '<img src="img/default.png" alt="cover">';
                    }
                    insertHtml += '<a href="' + displayData.items[i].external_urls.spotify + '">' + displayData.items[i].name + '</a>';
                    insertHtml += '</div>';
                }
                searchResults.append(insertHtml);
                if(displayData.next){
                    nextUrl = displayData.next.replace('api.spotify.com/v1/search', 'elegant-croissant.glitch.me/spotify');
                    //$('#searchResults').append('<div id="more"><button id="moreBtn" class="btn">More</button></div>');
                }
            }
        });
    }
});
