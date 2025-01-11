// User accounts data
const accounts = {
    user: {
        email: 'user@ridafrozen.com',
        password: 'user',
        role: 'user'
    },
    admin: {
        email: 'admin@ridafrozen.com',
        password: 'admin',
        role: 'admin'
    }
};

// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    const registerLink = document.querySelector('.nav-links li:last-child');
    const loginLink = document.querySelector('.nav-links li:nth-last-child(2)');
    
    if (isLoggedIn === 'true') {
        // Hide register button
        if (registerLink) registerLink.style.display = 'none';
        
        // Only change login to profile for regular users, not admin
        if (loginLink && userRole !== 'admin') {
            loginLink.querySelector('a').textContent = 'Profile';
            loginLink.querySelector('a').href = 'profile.html';
        }
        
        // Add logout button
        const logoutLink = document.createElement('li');
        const logoutAnchor = document.createElement('a');
        logoutAnchor.href = '#';
        logoutAnchor.textContent = 'Logout';
        logoutAnchor.onclick = logout;
        logoutLink.appendChild(logoutAnchor);
        
        // Insert logout button after profile/login
        if (loginLink && registerLink) {
            loginLink.parentNode.insertBefore(logoutLink, registerLink);
        }
    }
}

// Login handler
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Check credentials
        let isValid = false;
        let userRole = '';

        for (const account in accounts) {
            if (accounts[account].email === email && accounts[account].password === password) {
                isValid = true;
                userRole = accounts[account].role;
                break;
            }
        }

        if (isValid) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userEmail', email);
            
            // Redirect based on user role
            if (userRole === 'admin') {
                window.location.href = 'adminpanel/dashboard.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            alert('Email atau password salah!');
        }
    });
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // KTP image preview
    const ktpInput = document.getElementById('ktp');
    const ktpPreview = document.getElementById('ktpPreview');

    if (ktpInput) {
        ktpInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            // Check if a file was selected
            if (!file) return;

            // Check file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                alert('Hanya file gambar (JPG, JPEG, PNG) yang diperbolehkan!');
                this.value = ''; // Clear the input
                return;
            }

            // Check file size (5MB = 5 * 1024 * 1024 bytes)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                alert('Ukuran file tidak boleh lebih dari 5MB!');
                this.value = ''; // Clear the input
                return;
            }

            // If validation passes, show preview
            const reader = new FileReader();
            reader.onload = function(e) {
                ktpPreview.src = e.target.result;
                ktpPreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        });
    }

    // Check login status when page loads
    checkLoginStatus();
});