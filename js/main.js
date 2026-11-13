$(document).ready(function () {
    const THEME_STORAGE_KEY = 'sopranos_theme';
    const THEMES = ['dark', 'neon', 'light'];
    const THEME_LABELS = {
        dark: '🥃 Soprano Noir',
        neon: '🍸 Bada Bing Neon',
        light: '☀️ Jersey Daylight'
    };

    const $html = $('html');
    const $themeBtn = $('#themeToggle');

    // 1. Инициализация и циклическое переключение 3 тем
    function applyTheme(theme) {
        const validTheme = THEMES.includes(theme) ? theme : 'dark';
        $html.attr('data-theme', validTheme);
        localStorage.setItem(THEME_STORAGE_KEY, validTheme);

        if ($themeBtn.length) {
            $themeBtn.text(THEME_LABELS[validTheme]);
        }
    }

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    applyTheme(savedTheme);

    $themeBtn.on('click', function () {
        const currentTheme = $html.attr('data-theme') || 'dark';
        const nextIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
        applyTheme(THEMES[nextIndex]);
    });

    // 2. Плавный скролл (Smooth Scroll) для якорных ссылок
    $('a[href^="#"]').on('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const $target = $(href);
        if ($target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $target.offset().top - 70
            }, 600);
        }
    });

    // 3. Кнопка "Наверх" (появляется после прокрутки на 300px)
    const $backToTop = $('#backToTop');
    $backToTop.html('&uarr;');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $backToTop.fadeIn(300);
        } else {
            $backToTop.fadeOut(300);
        }
    });

    $backToTop.on('click', function (e) {
        e.preventDefault();
        $('html, body').stop().animate({ scrollTop: 0 }, 600);
    });
});
// ПАСХАЛКА 1: Снежинки при 3 кликах на логотип THE SOPRANOS (Pine Barrens)
let logoClicks = 0;
$('.navbar-brand').on('click', function(e) {
    logoClicks++;
    if (logoClicks === 3) {
        e.preventDefault();
        logoClicks = 0;
        triggerSnowfall();
    }
});

function triggerSnowfall() {
    for (let i = 0; i < 35; i++) {
        const snowflake = $('<div class="pine-snowflake">❄</div>');
        snowflake.css({
            left: Math.random() * $(window).width() + 'px',
            top: '-20px',
            fontSize: (Math.random() * 14 + 10) + 'px',
            opacity: Math.random() * 0.7 + 0.3
        });
        $('body').append(snowflake);
        snowflake.animate({
            top: $(window).height() + 'px',
            left: '+=' + (Math.random() * 100 - 50) + 'px'
        }, Math.random() * 3000 + 3000, function() {
            $(this).remove();
        });
    }
}

// Стили для снежинок через JS
$('<style>\
.pine-snowflake {\
    position: fixed;\
    z-index: 99999;\
    color: #fff;\
    pointer-events: none;\
    user-select: none;\
}\
</style>').appendTo('head');