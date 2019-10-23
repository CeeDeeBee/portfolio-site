//On DOM Load
$(document).ready(function() {
    let isMakerPageInit = false;
    let isAboutPageInit = false; 
    let isWriterPageInit = false;

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
    $('.writer').click(function() {
        if (!isWriterPageInit) {
            isWriterPageInit = writerPageInit();
        }
        $('.entrepreneur-div, .maker-div').hide();
        $('.main-container').css('justify-content', 'flex-end');
        $('.writer').removeClass('clickable');
        $('.name').data('page', 'writer');
        $('.writer-container').removeClass('hidden');
    });
    $('.writer-container').on('click', '.writer-card-title', function() {
        //Open the page affiliated with the writer card
        window.open($(this).data('content'), '_blank');
    });
    $('.name').click(function() {
        //When name is clicked open about page if current page is main or open main page if current page is not main
        let data = $('.name').data('page');
        if (data == 'main') {
            if (!isAboutPageInit) {
                isAboutPageInit = aboutPageInit();
            }
            $('.menu-div').hide();
            $('.main-container').css('justify-content', 'flex-end');
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
        let img = makerCardTemplate.find('img');
        let h1 = makerCardTemplate.find('h1');
        let p = makerCardTemplate.find('p');
        let a = makerCardTemplate.find('a');

        for (let i = 0; i < makerPageData.length; i ++) {
            img.prop('src', "/static/images/" + makerPageData[i].image);
            if (makerPageData[i].site) {
                h1.addClass('clickable');
                h1.attr('data-site', makerPageData[i].site);
            } else {
                h1.removeClass();
                h1.removeAttr('data-site');
            }
            h1.text(makerPageData[i].title);
            $(p[0]).text(makerPageData[i].description);
            $(p[1]).text(makerPageData[i].tools);
            if (makerPageData[i].github) {
                a.prop({'href': makerPageData[i].github, 'target': '_blank'}).text('GitHub');
            } else {
                a.empty().removeAttr('href target');
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

        $(aboutContainer.find('p')[0]).text(aboutPageData.description);
        $(aboutContainer.find('a')[0]).prop({'href': '/static/' + aboutPageData.resume, 'target': '_blank'}).text('Resume').addClass('resume-link');
        let aboutDiv = aboutContainer.find('div');
        for (let i = 0; i < aboutPageData.socialLinks.length; i ++) {
            aboutDiv.append($('<a></a>').prop({'href': aboutPageData.socialLinks[i].link, 'target': '_blank'}));
            $(aboutDiv.find('a')[i]).append($('<img>').prop('src', '/static/images/' + aboutPageData.socialLinks[i].img).addClass('about-img'));
        }
    });

    return true;
}

function writerPageInit() {
    //Initialize Writer Page With JSON
    $.getJSON('/static/data.json', function(data) {
        let writerPageData = data.writer;
        let writerContainer = $('.writer-container');
        let writerCardTemplate = $('#writer-card-template');
        let h1 = writerCardTemplate.find('h1');
        let p = writerCardTemplate.find('p');

        for (let i = 0; i < writerPageData.length; i ++) {
            h1.text(writerPageData[i].title)
            h1.attr('data-content', writerPageData[i].contentLocation);
            p.text(writerPageData[i].synopsis);

            writerContainer.append(writerCardTemplate.html());
        }
    });

    return true;
}