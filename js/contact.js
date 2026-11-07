$(document).ready(function () {
    $('#contactForm').on('submit', function (e) {
        e.preventDefault(); // Останавливаем стандартную отправку и перезагрузку страницы

        let isValid = true;

        // Очищаем предыдущие ошибки
        $('.form-control').removeClass('is-invalid is-valid');
        $('.invalid-feedback').text('').slideUp(200);
        $('#formSuccess').addClass('d-none');

        // 1. Проверка Name
        const name = $('#name').val().trim();
        if (name === '') {
            showError($('#name'), 'Full name is required.');
            isValid = false;
        } else {
            showValid($('#name'));
        }

        // 2. Проверка Email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError($('#email'), 'Email is required.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError($('#email'), 'Please enter a valid email address.');
            isValid = false;
        } else {
            showValid($('#email'));
        }

        // 3. Проверка Phone
        const phone = $('#phone').val().trim();
        if (phone === '') {
            showError($('#phone'), 'Phone number is required.');
            isValid = false;
        } else {
            showValid($('#phone'));
        }

        // 4. Проверка Event Date
        const eventDate = $('#eventDate').val();
        if (eventDate === '') {
            showError($('#eventDate'), 'Event date is required.');
            isValid = false;
        } else {
            showValid($('#eventDate'));
        }

        // 5. Проверка Number of Guests (от 1 до 10)
        const guests = parseInt($('#guests').val(), 10);
        if (isNaN(guests) || guests < 1 || guests > 10) {
            showError($('#guests'), 'Number of guests must be between 1 and 10.');
            isValid = false;
        } else {
            showValid($('#guests'));
        }

        // 6. Проверка Message
        const message = $('#message').val().trim();
        if (message === '') {
            showError($('#message'), 'Message cannot be empty.');
            isValid = false;
        } else {
            showValid($('#message'));
        }

        // Если все правильно — показываем успех
        if (isValid) {
            $('#formSuccess').removeClass('d-none').hide().fadeIn(400);
            $('#contactForm')[0].reset();
            $('.form-control').removeClass('is-valid');
        }
    });

    function showError($input, message) {
        $input.addClass('is-invalid');
        const $feedback = $input.siblings('.invalid-feedback');
        $feedback.text(message).stop(true, true).slideDown(300); // Плавное выплывание ошибки (jQuery)
    }

    function showValid($input) {
        $input.addClass('is-valid');
    }
});