jQuery(function f($){
    if(localStorage.getItem('storedText')){
        $('#text').val(localStorage.getItem('storedText'));
    }
    $('#text').on('input', function fn(e){
        var value = $('#text').val()
        value.trim();
        if(value !== ''){
            localStorage.setItem('storedText', value);
        }
    });
});
