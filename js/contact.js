$(document).ready(function () {
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        $('.form-control').removeClass('is-invalid is-valid');
        $('.invalid-feedback').text('').slideUp(200);
        $('#formSuccess').addClass('d-none');

        const name = $('#name').val().trim();
        if (name === '') {
            showError($('#name'), 'Full name is required.');
            isValid = false;
        } else {
            showValid($('#name'));
        }

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

        const phone = $('#phone').val().trim();
        const phoneRegex = /^(?=.*\d)[0-9+\s()-]{7,18}$/;
        if (phone === '') {
            showError($('#phone'), 'Phone number is required.');
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            showError($('#phone'), 'Please enter a valid phone number (digits required).');
            isValid = false;
        } else {
            showValid($('#phone'));
        }

        const eventDateVal = $('#eventDate').val();
        const selectedDate = new Date(eventDateVal);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (eventDateVal === '') {
            showError($('#eventDate'), 'Event date is required.');
            isValid = false;
        } else if (isNaN(selectedDate.getTime()) || selectedDate < today) {
            showError($('#eventDate'), 'Event date must be today or in the future.');
            isValid = false;
        } else {
            showValid($('#eventDate'));
        }

        const guests = parseInt($('#guests').val(), 10);
        if (isNaN(guests) || guests < 1 || guests > 10) {
            showError($('#guests'), 'Number of guests must be between 1 and 10.');
            isValid = false;
        } else {
            showValid($('#guests'));
        }

        const message = $('#message').val().trim();
        if (message === '') {
            showError($('#message'), 'Message cannot be empty.');
            isValid = false;
        } else {
            showValid($('#message'));
        }

        if (isValid) {
            $('#formSuccess').removeClass('d-none').hide().fadeIn(400);
            $('#contactForm')[0].reset();
            $('.form-control').removeClass('is-valid');
        }
    });

    function showError($input, message) {
        $input.addClass('is-invalid');
        const $feedback = $input.siblings('.invalid-feedback');
        $feedback.text(message).stop(true, true).slideDown(300);
    }

    function showValid($input) {
        $input.addClass('is-valid');
    }
});