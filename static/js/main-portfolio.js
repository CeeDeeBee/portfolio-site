//On DOM Load
$(document).ready(function() {
    init();
    $('.maker').click(function() {
        //Open maker page when maker button is clicked
        $('.entrepreneur-div, .writer-div').hide();
        $('.main-container').css('justify-content', 'flex-end');
        $('.maker-container').removeClass('hidden');
        $('.maker').removeClass('clickable');
        $('.name').data('page', 'maker');
    });
    $('.maker-container').on('click', '.maker-card-title', function() {
        //Open the site affiliated with the maker card
        let site = $(this).data('site');
        if (site != './classic') {
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

function init() {
    //Initialize Maker Page Cards With JSON
    $.getJSON('/static/maker-cards.json', function(data) {
        let makerContainer = $('.maker-container');
        let makerCardTemplate = $('#maker-card-template');

        for (var i = 0; i < data.length; i ++) {
            makerCardTemplate.find('img').attr('src', "/static/images/" + data[i].image);
            let h1 = makerCardTemplate.find('h1');
            if (data[i].site != null) {
                h1.addClass('maker-card-title clickable');
                h1.attr('data-site', data[i].site);
            } else {
                h1.removeClass();
                h1.removeAttr('data-site')
            }
            h1.text(data[i].title);
            let pTags = makerCardTemplate.find('p');
            $(pTags[0]).text(data[i].description);
            $(pTags[1]).text(data[i].tools);
            let makerCardA = makerCardTemplate.find('a');
            if (data[i].github != null) {
               makerCardA.prop({'href': data[i].github, 'target': '_blank'}).text('GitHub');
            } else {
                makerCardA.empty().removeAttr('href target');
            }

            makerContainer.append(makerCardTemplate.html());
        }
    });
}