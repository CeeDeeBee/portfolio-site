//On DOM Load
$(document).ready(function() {
    $('.maker').click(function() {
        //Open maker page when maker button is clicked
        $('.entrepreneur-div, .writer-div').hide();
        $('.main-container').css('justify-content', 'flex-end');
        $('.maker-container').removeClass('hidden');
        $('.name').data('page', 'maker');
    });
    $('.name').click(function() {
        //When name is clicked open about page if current page is main or open main page if current page is not main
        let data = $('.name').data('page');
        if (data == 'main') {
            $('.menu-div').hide();
            $('.name').data('page', 'about');
        } else {
            //Hide current content 
            $('.' + data + '-container').addClass('hidden');
            //Show main page
            $('.main-container').css('justify-content', 'center');
            $('.menu-div').show();
            $('.name').data('page', 'main');
        }
    });
});