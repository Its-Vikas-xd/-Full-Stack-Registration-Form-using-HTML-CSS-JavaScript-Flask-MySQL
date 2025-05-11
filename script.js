document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        this.submit();
    }
});

function validateForm() {
    let isValid = true;
    const email = document.getElementById('email');
    const age = document.getElementById('age');
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm');

    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }

    // Age validation
    if (age.value < 13 || age.value > 120) {
        showError('age-error', 'Age must be between 13 and 120');
        isValid = false;
    }

    // Password validation
    if (password.value.length < 8) {
        showError('password-error', 'Password must be at least 8 characters');
        isValid = false;
    }

    // Confirm password
    if (password.value !== confirm.value) {
        showError('confirm-error', 'Passwords do not match');
        isValid = false;
    }

    return isValid;
}

function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Password strength indicator
document.getElementById('password').addEventListener('input', function(e) {
    const strength = calculatePasswordStrength(e.target.value);
    const strengthBar = document.getElementById('password-strength');
    const colors = ['#ff4444', '#ffbb33', '#00C851', '#00C851'];
    strengthBar.style.width = `${strength * 25}%`;
    strengthBar.style.backgroundColor = colors[strength];
});

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    return Math.min(3, strength);
}