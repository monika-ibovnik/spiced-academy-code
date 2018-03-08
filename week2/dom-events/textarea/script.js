/**
Make a page that has a <textarea> element on it. As the user types visible characters into this field, the characters should be replaced with the characters in the corresponding position in the Gettysburg Address. (Note - you can get and set the text in a <textarea> through its value property.)
*/


var textarea = document.getElementById('text');
var text = 'Abraham Lincoln November 19, 1863 Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.';
textarea.value = '';
textarea.addEventListener('input', function(){
    var length = textarea.value.length;
    textarea.value = text.slice(0, length);
});
