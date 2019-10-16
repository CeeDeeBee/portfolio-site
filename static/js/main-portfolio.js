//On DOM Load
$(document).ready(function() {
    let isMakerPageInit = false;
    let isAboutPageInit = false; 

    $('.maker').click(function() {
        //Open maker page when maker button is clicked
        if (!isMakerPageInit) {
            isMakerPageInit = makerPageInit();
        }
        $('.entrepreneur-div, .writer-div').hide();
        $('.main-container').css('justify-content', 'flex-end');
        $('.maker').removeClass('clickable');
        $('.name').data('page', 'maker');
        $('.maker-container').removeClass('hidden');
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
            if (!isAboutPageInit) {
                isAboutPageInit = aboutPageInit();
            }
            $('.menu-div').hide();
            $('.name').data('page', 'about');
            $('.about-container').removeClass('hidden');
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

function makerPageInit() {
    //Initialize Maker Page Cards With JSON
    $.getJSON('/static/data.json', function(data) {
        let makerPageData = data.makerCards
        let makerContainer = $('.maker-container');
        let makerCardTemplate = $('#maker-card-template');

        for (let i = 0; i < makerPageData.length; i ++) {
            makerCardTemplate.find('img').prop('src', "/static/images/" + makerPageData[i].image);
            let h1 = makerCardTemplate.find('h1');
            if (makerPageData[i].site) {
                h1.addClass('maker-card-title clickable');
                h1.prop('data-site', makerPageData[i].site);
            } else {
                h1.removeClass();
                h1.removeAttr('data-site')
            }
            h1.text(makerPageData[i].title);
            let pTags = makerCardTemplate.find('p');
            $(pTags[0]).text(makerPageData[i].description);
            $(pTags[1]).text(makerPageData[i].tools);
            let makerCardA = makerCardTemplate.find('a');
            if (makerPageData[i].github != null) {
               makerCardA.prop({'href': makerPageData[i].github, 'target': '_blank'}).text('GitHub');
            } else {
                makerCardA.empty().removeAttr('href target');
            }

            makerContainer.append(makerCardTemplate.html());
        }
    });

    return true;
}

function aboutPageInit() {
    //Initialize About Page With JSON
    $.getJSON('/static/data.json', function(data) {
        let aboutPageData = data.about;
        let aboutContainer = $('.about-container');

        aboutContainer.find('p').text(aboutPageData.description);
        aboutContainer.find('a').prop('href', aboutPageData.resume).text('Resume');
        let aboutDiv = aboutContainer.find('div');
        console.log(aboutPageData);
        for (let i = 0; i < aboutPageData.socialLinks.length; i ++) {
            aboutDiv.append($('<a></a>').prop({'href': '/static/' + aboutPageData.socialLinks[i].link, 'target': '_blank'}));
            aboutDiv.append($('<img>').prop({'src': '/static/images/' + aboutPageData.socialLinks[i].img, 'height': '200px'}));
        }
    });

    return true;
}