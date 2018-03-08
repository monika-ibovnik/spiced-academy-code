jQuery(function($){
    $('#validate').on('click', function f(e){
        var message = 'valid';
        var initVal = $('#validator').val();
        if(initVal!=''){
            try{
                var jObject = JSON.parse(initVal);
            }catch(e){
                message = "invalid";
            }finally{
                $('#validator').addClass(message);
                $('p').html(message);
                $('p').addClass(message);
            }
        }
    });

    $('#clear').on('click', function fn(e){
        $('#validator').val('');
        $('#validator').removeClass('valid');
        $('#validator').removeClass('invalid');
        $('p').removeClass('valid');
        $('p').removeClass('invalid');

    });
});
