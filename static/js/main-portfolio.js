//On DOM Load
$(document).ready(function() {
    $('.maker').click(function() {
        //Open maker page when maker button is clicked
        $('.entrepreneur-div, .writer-div').hide();
        $('.main-container').css('justify-content', 'flex-end');
        $('.maker-container').removeClass('hidden');
        $('.maker').removeClass('clickable');
        $('.name').data('page', 'maker');
    });
    $('.maker-card').click(function() {
        //Open the site affiliated with the maker card
        let site = $(this).data('site');
        if (site && site != './classic') {
            window.open(site, '_blank');
        } else {
            window.open(site, '_self');
        }
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
            $('.menu-item').addClass('clickable');
            $('.name').data('page', 'main');
        }
    });
});