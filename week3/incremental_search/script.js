jQuery(function($){

    var inputField = $('input');
    var results = $('#results');
    var request;
    var requestTimeout;
    results.hide();
    //input events
    inputField.on('input', function fn(){
        var val = inputField.val();
        $('#results').hide();
        $('p').remove();
        val = val.trim().toLowerCase();
        //ajax request
        if(request){
            request.abort();
        }
        stopTimeout();
        startTimeout();
        function startTimeout(){
            requestTimeout = setTimeout(function sendRequest(){
                request = $.ajax({
                    url: "https://flame-egg.glitch.me/",
                    method: "GET",
                    data:{
                        q : val
                    },
                    success: function(data){
                        var insertHtml = '';
                        if(data.length == 0){
                            insertHtml = '<p>No results</p>';
                            $('#search').append(insertHtml);
                        }else{
                            for(var i = 0; i < data.length; i++){
                                insertHtml += '<div>'+data[i]+'</div>';
                            }
                            results.html(insertHtml);
                            results.show();
                        }
                    }
                });
            },250);
        }
        function stopTimeout(){
            clearTimeout(requestTimeout);
        }
        //ajax request
    });

    inputField.on('blur', function(e){
        results.hide();
        inputField.on('focus', function(e){
            results.show();
        });
    });

    //mouse events
    results.on('mouseover', function fn(e){
        if(e.target != e.currentTarget){
            results.children().each(function(){
                $(this).removeClass('highlight');
            });
            $(e.target).addClass('highlight');
        }
    });
    results.on('mousedown', function(e){
        inputField.val(e.target.innerHTML);
        results.hide();
    });

    //key events
    $(document).on('keydown', function fn(e){
        if(e.keyCode === 40){
            if($('.highlight').index() === -1){
                results.children().first().addClass('highlight');
            }else if($('.highlight').index() == results.children().length - 1){
                return;
            }else{
                $('.highlight').removeClass('highlight').next().addClass('highlight');
            }
        }else if(e.keyCode === 38){
            if($('.highlight').index() === -1 || $('.highlight').index() === 0){
                return;
            }else if($('.highlight').index() == results.children().length - 1){
                $('.highlight').removeClass('highlight').prev().addClass('highlight');
            }else{
                $('.highlight').removeClass('highlight').prev().addClass('highlight');
            }
        }else if(e.keyCode === 13){
            $("#results div").each(function(){
                results.hide();
                results.empty();
                if($(this).hasClass('highlight')){
                    inputField.val($(this).html());
                }
            });
        }
    });
});
