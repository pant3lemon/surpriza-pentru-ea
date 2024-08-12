document.getElementById('myVideo').addEventListener('ended', function() {
    document.getElementById('lockedVideoContainer').style.display = 'block';
    document.getElementById('passwordPrompt').style.display = 'block';
    document.getElementById('backgroundMusic').play();
});

let passwordPromptAppeared = false;

document.getElementById('passwordPrompt').addEventListener('transitionend', function() {
    if (document.getElementById('passwordPrompt').style.display === 'block') {
        document.getElementById('backgroundMusic').play();
        passwordPromptAppeared = true;
    }
});

document.getElementById('myVideo').addEventListener('play', function() {
    if (passwordPromptAppeared) {
        document.getElementById('backgroundMusic').pause();
    }
});

document.getElementById('myVideo').addEventListener('pause', function() {
    if (passwordPromptAppeared) {
        document.getElementById('backgroundMusic').play();
    }
});

document.getElementById('lockedVideo').addEventListener('play', function() {
    if (passwordPromptAppeared) {
        document.getElementById('backgroundMusic').pause();
    }
});

document.getElementById('lockedVideo').addEventListener('pause', function() {
    if (passwordPromptAppeared) {
        document.getElementById('backgroundMusic').play();
    }
});

let passwords = ['password1', 'password2', 'password3', 'password4'];
let currentPasswordIndex = 0;
let lastEnteredPassword = '';

document.getElementById('passwordInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
});

function checkPassword() {
    var password = document.getElementById('passwordInput').value;
    if (password === lastEnteredPassword) {
        alert('You have already entered this password.');
        document.getElementById('passwordInput').value = ''; // Clear the input field
        return;
    }

    if (password === passwords[currentPasswordIndex]) {
        alert('Password correct!');
        currentPasswordIndex++;
        document.getElementById('passwordInput').value = ''; // Clear the input field
        lastEnteredPassword = password; // Update the last entered password

        // Update progress bar
        let progress = (currentPasswordIndex / passwords.length) * 100;
        document.getElementById('progressBar').style.width = progress + '%';

        // Update password counter
        document.getElementById('passwordCounter').textContent = `${currentPasswordIndex}/${passwords.length}`;

        // Show check mark
        let checkmark = document.createElement('span');
        checkmark.className = 'checkmark show';
        checkmark.textContent = '✓';
        document.getElementById('passwordCounter').appendChild(checkmark);

        if (currentPasswordIndex === passwords.length) {
            document.getElementById('passwordPrompt').style.display = 'none';
            document.getElementById('lockedVideo').style.opacity = '1';
            document.getElementById('lockedVideoContainer').querySelector('::before').style.display = 'none';
        }
    } else {
        alert('Incorrect password. Please try again.');
        document.getElementById('passwordInput').value = ''; // Clear the input field
        lastEnteredPassword = password; // Update the last entered password
    }
}
