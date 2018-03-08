jQuery(function($){
    var bar = $('#bar');
    var panes = $('#container');
    var cat = $('#cat');

    $(document).on('mouseup', function fn_up(){
        $(document).off('mousemove');
    });
    bar.on('mousedown', function fn_down(){
        $(document).on('mousemove', function fn_move(e_move){
            e_move.preventDefault();
            if(e_move.target.id == 'bar'){
                return;
            }
            if(e_move.offsetX > panes.width()){
                return;
            }else{
                bar.css({
                    left: e_move.offsetX
                });
            }
            cat.width(e_move.offsetX);
        });
    });
});
