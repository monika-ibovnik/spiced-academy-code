jQuery(function($){
    var rowNumber = 6;
    var colNumber = 7;
    var howMuch = 4;
    var currentPlayer = 'playerDog';
    function generate(rows, cols){
        var generateHtml = '';
        for(var i = 0; i < 7; i++){
            generateHtml += '<div class="column">';
            for(var j = rowNumber - 1; j >= 0; j--){
                generateHtml += '<div class="outer"><div class="inner row'+j+'"></div></div>';
            }
            generateHtml += '</div>';
        }
        $("main").html(generateHtml);
    }
    generate(rowNumber, colNumber);

    //startscreen
    $('#gameOver').hide();

    $('#startBtn').on('click', function(){
        $('#startScreen').hide();
        $('#overlay').hide();
        play();
    });

    function play(){
        $('.column').on('click', function fn(e){
            (function changePlayer(){
                if(currentPlayer == 'playerCat'){
                    currentPlayer = 'playerDog'
                }else{
                    currentPlayer = 'playerCat';
                }
            })();//changePlayer
            var slots = $(e.currentTarget).children();
            for(var i = slots.length-1; i>=0;i--){
                if(slots.eq(i).find('.inner').hasClass('playerDog') || slots.eq(i).find('.inner').hasClass('playerCat')){
                    continue;
                }else{
                    slots.eq(i).find('.inner').addClass(currentPlayer);
                    var currentRow = Math.abs(i-5);
                    var currentColumn = $(e.currentTarget).index();
                    //console.log('row ',currentRow,' column', currentColumn);
                    checkForVictory(currentRow, currentColumn, currentPlayer);
                    return;
                }
            }
        });//column on click
    }//function play

    function returnSlot(row, column){
        return $(".column").eq(column).children().eq(Math.abs(row-rowNumber+1)).find('.inner');
    }

    function checkForVictory(row, column, player){
        (function checkColumn(){
            var count = 1;
            (function checkDown(rowPosition){
                if(rowPosition == 0){
                    return;
                }else{
                    if(!returnSlot(--rowPosition, column).hasClass(player)){
                        return;
                    }else{
                        count++;
                        if(count > howMuch - 1){
                            victory(player);
                            return;
                        }
                        checkDown(rowPosition);
                    }
                }
            })(row);
        })();

        (function checkRow(){
            var count = 1;
            (function checkLeft(columnPosition){
                if(columnPosition == 0){
                    return;
                }else{
                    if(!returnSlot(row, --columnPosition).hasClass(player)){
                        return;
                    }else{
                        count++;
                        if(count > howMuch - 1){
                            victory(player);
                            return;
                        }
                        checkLeft(columnPosition);
                    }
                }
            })(column);

            (function checkRight(colPosition){
                if(colPosition == 0){
                    return;
                }else{
                    if(!returnSlot(row, ++colPosition).hasClass(player)){
                        return;
                    }else{
                        count++;
                        if(count > howMuch - 1){
                            victory(player);
                            return;
                        }
                        checkRight(colPosition);
                    }
                }
            })(column);
        })();

        (function checkDiagonal(){
            (function upLeftDownRight(){
                var count = 1;
                (function checkUpLeft(rowPosition, columnPosition){
                    if(row === rowNumber - 1 || columnPosition == 0){
                        return;
                    }else{
                        //console.log('1st',rowPosition, columnPosition)
                        if(!returnSlot(++rowPosition, --columnPosition).hasClass(player)){
                            //console.log('2nd',rowPosition, columnPosition)
                            return;
                        }else{
                            count++;
                            if(count > howMuch - 1){
                                victory(player);
                                return;
                            }
                            checkUpLeft(rowPosition, columnPosition);
                        }
                    }
                })(row, column);

                (function checkDownRight(rowPosition, columnPosition){
                    if(rowPosition === 0 || columnPosition === colNumber - 1){
                        return;
                    }else{
                        if(!returnSlot(--rowPosition, ++columnPosition).hasClass(player)){
                            return;
                        }else{
                            count++;
                            if(count > howMuch - 1){
                                victory(player);
                                return;
                            }
                            checkDownRight(rowPosition, columnPosition);
                        }
                    }
                })(row, column);
            })();//function upLeftDownRight
            (function downLeftUpRight(){
                var count = 1;
                (function checkDownLeft(rowPosition, columnPosition){
                    if(rowPosition == 0 || columnPosition == 0){
                        return;
                    }else{
                        if(!returnSlot(--rowPosition, --columnPosition).hasClass(player)){
                            return;
                        }else{
                            count++;
                            if(count > howMuch - 1){
                                victory(player);
                                return;
                            }
                            checkDownLeft(rowPosition, columnPosition);
                        }
                    }
                })(row, column);

                (function checkUpRight(rowPosition, columnPosition){
                    if(rowPosition == rowNumber-1 || columnPosition == colNumber-1){
                        return;
                    }else{
                        if(!returnSlot(++rowPosition, ++columnPosition).hasClass(player)){
                            return;
                        }else{
                            count++;
                            if(count > howMuch - 1){
                                victory(player);
                                return;
                            }
                            checkUpRight(rowPosition, columnPosition);
                        }
                    }
                })(row,column);
            })();
        })();//function downLeftUpRight
    }//function checkForVictory

    function victory(player){
        $('#dogeWinner').show();
        $('#catWinner').show();
        var gameOverHtml = '';
        if(player == 'playerCat'){
            gameOverHtml = 'Cat wins!';
            $('#dogeWinner').hide();
        }else if(player == 'playerDog'){
            gameOverHtml = 'Doge wins!';
            $('#catWinner').hide();
        }
        $('#centre h2').html(gameOverHtml);
        $('#gameOver').show();
        $('#overlay').show();
        $('#fatality h3').animate({fontSize: 150}, 500);
    }

    $('#iksbutton').on('click', function f(e){
        $('#gameOver').hide();
    });

    $('#restartBtn').on('click', function f(e){
        $('main').html();
        generate();
        $('#gameOver').hide();
        $('#overlay').hide();
        play();
    });

});
