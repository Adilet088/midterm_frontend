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