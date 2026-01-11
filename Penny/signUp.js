$(document).ready(function () {

    // --- ELEMENTS ---
    const form = $('.signup form');
    const nameInput = $('#name');
    const surnameInput = $('#surname');
    const idInput = $('#id-number');
    const emailInput = $('#email');
    const passwordInput = $('#password');

    const subscribeBtn = $(".btn-newsletter");
    const newsletterInput = $(".newsletter-input input");

    // --- FORM SUBMIT ---
    form.on('submit', function (e) {
        e.preventDefault();
        clearErrors();

        let name = nameInput.val().trim();
        let surname = surnameInput.val().trim();
        let idNumber = idInput.val().trim();
        let email = emailInput.val().trim();
        let password = passwordInput.val();

        let isValid = true;

        // --- VALIDATION ---
        if (name === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        }

        if (surname === '') {
            showError(surnameInput, 'Surname is required');
            isValid = false;
        }

        if (!/^\d{13}$/.test(idNumber)) {
            showError(idInput, 'ID Number must be exactly 13 digits');
            isValid = false;
        } else if (!validateSAID(idNumber)) {
            showError(idInput, 'Invalid South African ID Number');
            isValid = false;
        }

        if (email === '' || !validateEmail(email)) {
            showError(emailInput, 'Valid email is required');
            isValid = false;
        }

        if (password.length < 8) {
            showError(passwordInput, 'Password must be at least 8 characters');
            isValid = false;
        }

        // --- SUCCESS ---
        if (isValid) {
            showSuccessMessage('Account created successfully! Redirecting...');
            setTimeout(() => {
                window.location.href = 'Login.html';
            }, 2000);
        }
    });

    // --- NEWSLETTER SUBSCRIBE ---
    subscribeBtn.on("click", function () {
        const email = newsletterInput.val().trim();

        if (email === "") {
            alert("Please enter an email.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email.");
            return;
        }

        alert("🎉 You are now subscribed!");
        newsletterInput.val("");
    });

    // ===============================
    // ✅ HELPER FUNCTIONS (jQuery)
    // ===============================

    function showError(inputElement, message) {
        const formGroup = inputElement.parent();

        formGroup.find('.error-message').remove();

        let error = $('<span></span>')
            .addClass('error-message')
            .css({
                color: '#ff4444',
                fontSize: '12px',
                display: 'block'
            })
            .text(message);

        formGroup.append(error);
        inputElement.css('border', '2px solid #ff4444');
    }

    function clearErrors() {
        $('.error-message').remove();
        $('input').css('border', '');
    }

    function showSuccessMessage(message) {
        let successDiv = $('<div></div>')
            .css({
                position: 'fixed',
                top: '20px',
                right: '20px',
                background: '#4CAF50',
                color: 'white',
                padding: '15px 25px',
                borderRadius: '8px',
                zIndex: '1000'
            })
            .text(message);

        $('body').append(successDiv);

        setTimeout(() => successDiv.remove(), 3000);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateSAID(idNumber) {
        if (idNumber.length !== 13 || isNaN(idNumber)) return false;

        let sum = 0;

        for (let i = 0; i < 12; i++) {
            let digit = parseInt(idNumber[i]);

            if (i % 2 === 1) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
        }

        const checkDigit = (10 - (sum % 10)) % 10;
        return checkDigit === parseInt(idNumber[12]);
    }

});
