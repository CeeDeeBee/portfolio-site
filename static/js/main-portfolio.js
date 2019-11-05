//Global variables
let isMakerPageInit = false;
let isAboutPageInit = false; 
let isWriterPageInit = false;
//On DOM Load
$(document).ready(function() {
    $('.maker').click(function() {
        //Open maker page when maker button is clicked
        openPage('maker');
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
        openPage('writer');
    });
    $('.writer-container').on('click', '.writer-card-title', function() {
        //Open the page affiliated with the writer card
        window.open($(this).data('content'), '_blank');
    });
    $('.name').click(function() {
        //When name is clicked open about page if current page is main or open main page if current page is not main
        let data = $('.name').data('page');
        if (data != 'main') {
            //Hide current content 
            $('.' + data + '-container').fadeOut('slow');
            //Show main page
            $('.main-container').css('justify-content', 'center');
            $('.menu-div').fadeIn('slow');
            $('.menu-item').addClass('clickable');
            $('.name').data('page', 'main');
            $('.name').removeClass('clickable');
        }
    });
    $('.about').click(function() {
        openPage('about');
    });
});

function makerPageInit() {
    //Initialize Maker Page Cards With JSON
    if (!isMakerPageInit) {
        $.getJSON('/static/data.json', function(data) {
            let makerPageData = data.makerCards
            let makerContainer = $('.maker-container');
            let makerColumn1 = $('#maker-column-1');
            let makerColumn2 = $('#maker-column-2');
            let makerColumn3 = $('#maker-column-3');
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
                //If not a mobile device
                if (screen.width >= 699) {
                    //Append card to desired column
                    if (i === 0 || i % 3 === 0) {
                        makerColumn1.append(makerCardTemplate.html());
                    } else if (i === 1 || (i - 1) % 3 === 0) {
                        makerColumn2.append(makerCardTemplate.html());
                    } else {
                        makerColumn3.append(makerCardTemplate.html());
                    }
                } else {
                    makerContainer.append(makerCardTemplate.html());
                }
            }
        });

        isMakerPageInit = true;
    }
}

function aboutPageInit() {
    //Initialize About Page With JSON
    if (!isAboutPageInit) {
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
    }

    isAboutPageInit = true;
}

function writerPageInit() {
    //Initialize Writer Page With JSON
    if (!isWriterPageInit) {
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
    }

    isWriterPageInit = true;
}

function openPage(page) {
    window[page + 'PageInit']();
    $('.menu-div').not('.' + page + '-div').fadeOut('slow');
    $('.main-container').css('justify-content', 'flex-end');
    $('.name').addClass('clickable');
    $('.' + page).removeClass('clickable');
    $('.name').data('page', page);
    $('.' + page + '-container').fadeIn('slow').css('display', 'flex');
}