document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const errorMsg = document.getElementById('error-msg');

    function showError(message) {
        if (errorMsg) {
            errorMsg.textContent = message;
            // Shake effect
            errorMsg.style.transform = 'translateX(-10px)';
            setTimeout(() => errorMsg.style.transform = 'translateX(10px)', 100);
            setTimeout(() => errorMsg.style.transform = 'translateX(-10px)', 200);
            setTimeout(() => errorMsg.style.transform = 'translateX(0)', 300);
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('loginBtn');
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            btn.classList.add('btn-loading');
            errorMsg.textContent = '';

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Save user to localStorage
                    localStorage.setItem('user', JSON.stringify(data));
                    // Redirect to shop
                    window.location.href = 'index.html';
                } else {
                    showError(data.error || 'Login failed. Please try again.');
                }
            } catch (err) {
                showError('Network error. Please try again later.');
            } finally {
                btn.classList.remove('btn-loading');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('registerBtn');
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            btn.classList.add('btn-loading');
            errorMsg.textContent = '';

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Show success directly on page before navigating
                    errorMsg.style.color = '#764ba2'; // success color matches theme
                    errorMsg.textContent = 'Account created! Redirecting to login...';
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                } else {
                    showError(data.error || 'Registration failed.');
                }
            } catch (err) {
                showError('Network error. Please try again later.');
            } finally {
                if (errorMsg.textContent !== 'Account created! Redirecting to login...') {
                   btn.classList.remove('btn-loading');
                }
            }
        });
    }
});
