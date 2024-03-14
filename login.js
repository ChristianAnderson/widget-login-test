class LoginElement extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
        const cssStyleSheet = document.createElement('link');
        cssStyleSheet.rel = 'stylesheet';
        cssStyleSheet.href = 'https://christiananderson.github.io/widget-login-test/login.css';
        shadowRoot.appendChild(cssStyleSheet);
        shadowRoot.innerHTML += `
        <!-- Widget Custom Content -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
            <div id="screen-one" class="screen-one">
                <div class="logo-title">
                    <p id="email-validation" class="hide" style="color:black">The email address or password is incorrects.</p>
                </div>

                <div class="email">
                    <div class="sec-2">
                        <input type="email" name="email" id="emailInput" placeholder="Email Address"
                            value="francisco.negrete@epicor.com">
                    </div>
                </div>
                <div class="password">
                    <div class="sec-2">
                        <input class="pas" id="passwordInput" type="password" name="password" placeholder="Password"
                            value="j3{U*w{G$3)n">
                        <i class="fas fa-eye" id="togglePassword"></i>
                    </div>
                </div>
                <button id="submitButton" class="login">Login</button>
                <div class="footer">
                    <span>Forgot Password?</span>
                </div>
            </div>
            <div id="overlay">
                <div class="spinner">
                </div>
            </div>
                  `;

        // JS
        const passwordInput = shadowRoot.querySelector('#passwordInput');
        const togglePassword = shadowRoot.querySelector('#togglePassword');
        const emailInput = shadowRoot.querySelector('#emailInput');
        var element = shadowRoot.querySelector("#email-validation");
        var screenOne = shadowRoot.querySelector("#screen-one");
        var overlay = shadowRoot.querySelector("#overlay");

        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        function validatePassword(password) {
            return password.length >= 6;
        }

        //   j3{U*w{G$3)n
        shadowRoot.querySelector('#submitButton').addEventListener('click', async function () {
            const email = emailInput.value;
            const password = passwordInput.value;
            console.log('texto');
            if (validateEmail(email) && validatePassword(password)) {
                screenOne.style.display = 'none'
                overlay.style.display = 'flex'

                // Widget URL
                const url = 'http://10.162.185.140:32376/b2b/api/v1/login/widget';

                const apiUrlB2bIP = 'http://10.162.185.140:32376/b2b/api/v1';
                const apiUrlB2b = 'https://autob2b-stg-api.epicor.com/b2b/api/v1';
                const apiUrlB2bDev = 'https://autob2b-dev-api.epicor.com/b2b/api/v1';


                const payload = {
                    username: email,
                    password: password
                }
                // Login API call
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': '/',
                        },
                        body: JSON.stringify(payload)
                    });
                
                    if (response.ok) {
                        const data = await response.json();
                        window.location.href = data.location;
                    } else {
                        throw new Error('Failed to login');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
                
            } else {
                element.classList.remove("hide");
                screenOne.style.display = 'flex'
                overlay.style.display = 'none'
            }
        });
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye-slash');
        });

    };

}

customElements.define('login-element', LoginElement);