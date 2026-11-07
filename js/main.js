$(document).ready(function () {

    // 1. Плавный скролл (Smooth Scroll) для якорных ссылок
    $('a[href^="#"]').on('click', function (e) {
        var target = $(this.getAttribute('href'));

        if (target.length) {
            e.preventDefault();

            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 600);
        }
    });

    // 2. Управлении кнопкой "Наверх" при скролле страницы
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn(300);
        } else {
            $('#backToTop').fadeOut(300);
        }
    });

});
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn(300);
        } else {
            $('#backToTop').fadeOut(300);
        }
    });
    $('#backToTop').click(function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
});