/**
Write a function that takes another function as a parameter. It should wait 1.5 seconds and then run the function that was passed in.
*/
function waitThenRun(f){
    setTimeout(f, 1500);
}

waitThenRun(function() {
    console.log('Hello!');
}); // logs 'Hello!' 1.5 seconds later

waitThenRun(function() {
    console.log('Goodbye!');
}); // logs 'Goodbye!' 1.5 seconds later
