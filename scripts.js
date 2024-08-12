document.getElementById('togglePassword').addEventListener('click', function() {
    var passwordField = document.getElementById('psw');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
});

let attemptCount = 0;
let usernameHintShown = false;
let passwordHintShown = false;

function validateLogin() {
    var username = document.getElementById("uname").value.trim();
    var password = document.getElementById("psw").value.trim();

    console.log("Username entered: " + username);
    console.log("Password entered: " + password);

    var correctUsername = "ariana";
    var correctPassword = "21august2007";

    if (username === correctUsername && password === correctPassword) {
        document.getElementById("loading").style.display = "flex";
        document.getElementById("blur-overlay").style.display = "block";
        setTimeout(function() {
            window.location.href = "Partea2.html";
        }, 2000); // Simulate loading time
    } else {
        attemptCount++;
        let usernameIncorrect = username !== correctUsername;
        let passwordIncorrect = password !== correctPassword;

        if (usernameIncorrect) {
            alert("Invalid username");
            document.getElementById("uname").classList.add('error');
        }
        if (passwordIncorrect) {
            alert("Invalid password");
            document.getElementById("psw").classList.add('error');
        }
        setTimeout(function() {
            document.getElementById("uname").classList.remove('error');
            document.getElementById("psw").classList.remove('error');
        }, 500);

        if (usernameIncorrect && attemptCount === 2 && !usernameHintShown) {
            showHint("username-hint", "Hint: The username is 'ariana'");
            usernameHintShown = true;
        }
        if (passwordIncorrect && attemptCount === 5 && !passwordHintShown) {
            showHint("password-hint", "Hint: The password is '21august2007'");
            passwordHintShown = true;
        }
    }
}

function showHint(elementId, message) {
    var hintElement = document.getElementById(elementId);
    var hintTextElement = document.getElementById(elementId + "-text");
    hintTextElement.textContent = message;
    hintElement.style.display = "block";
    positionHint(elementId);
}

function positionHint(elementId) {
    var hintElement = document.getElementById(elementId);
    var inputElement = elementId === "username-hint" ? document.getElementById("uname") : document.getElementById("psw");
    var rect = inputElement.getBoundingClientRect();
    hintElement.style.top = rect.top + window.scrollY + "px";
    hintElement.style.left = rect.left + window.scrollX - hintElement.offsetWidth - 10 + "px"; // Adjust to move to the left
}

function closeHint(elementId) {
    var hintElement = document.getElementById(elementId);
    hintElement.style.display = "none";
}

document.addEventListener('click', function() {
    var audio = document.getElementById('background-music');
    audio.play().catch(function(error) {
        console.log('Autoplay was prevented:', error);
    });
});

// Scroll event to reveal the poem
window.addEventListener('scroll', function() {
    var poemContainer = document.getElementById('poem');
    var rect = poemContainer.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
        poemContainer.classList.add('visible');
    }
});
