//On DOM Load
$(document).ready(function() {
    $('.maker').click(function() {
        //Open maker page when maker button is clicked
        //$('.menu-flex-container').hide();
        $('.entrepreneur-div, .writer-div').toggleClass('fadeout');
        $('.name').data('page', 'maker');
    });
    $('.name').click(function() {
        //When name is clicked open about page if current page is main or open main page if current page is not main
        let data = $('.name').data('page');
        if (data == 'main') {
            $('.menu-div').hide();
            $('.name').data('page', 'about');
        } else {
            $('.menu-div').show();
            $('.name').data('page', 'main');
        }
    });
});