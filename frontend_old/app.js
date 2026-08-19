// ==========================================
// POPUP FUNCTION
// ==========================================

const showPopup = (title, text, callback = null) => {

    const popup = document.createElement("div");

    popup.className = "popup-overlay";

    popup.innerHTML = `
        <div class="popup">

            <div class="popup-icon">✓</div>

            <h2>${title}</h2>

            <p>${text}</p>

            <button class="popup-btn">
                Continue
            </button>

        </div>
    `;

    document.body.appendChild(popup);


    const button = popup.querySelector(".popup-btn");

    button.addEventListener("click", () => {

        popup.remove();

        if (callback) {
            callback();
        }

    });

};



// ==========================================
// REGISTER
// ==========================================

const registerForm = document.querySelector("#registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        const name = document.querySelector(".name");
        const email = document.querySelector(".email");
        const password = document.querySelector(".password");

        const message = document.querySelector("#message");


        // Frontend validation

        if (!name.value || !email.value || !password.value) {

            message.textContent = "Please fill all fields.";

            return;
        }


        const userData = {

            name: name.value,

            email: email.value,

            password: password.value

        };


        try {

            const response = await fetch(
                "http://127.0.0.1:3000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(userData)
                }
            );


            const data = await response.json();


            if (response.ok) {

                console.log("Registration successful:", data);

                showPopup(
                    "Registration Successful!",
                    "Your account has been created successfully.",
                    () => {

                        window.location.href = "login.html";

                    }
                );

            } else {

                message.textContent = data.message;

                console.log("Registration failed:", data);

            }


        } catch (error) {

            console.error("Fetch error:", error);

            message.textContent =
                "Cannot connect to server.";

        }

    });

}



// ==========================================
// LOGIN
// ==========================================

const loginForm = document.querySelector("#loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        const email = document.querySelector("#loginEmail");

        const password = document.querySelector("#loginPassword");

        const message = document.querySelector("#loginMessage");


        // Frontend validation

        if (!email.value || !password.value) {

            message.textContent =
                "Please enter email and password.";

            return;

        }


        const loginData = {

            email: email.value,

            password: password.value

        };


        try {

            const response = await fetch(
                "http://127.0.0.1:3000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(loginData)
                }
            );


            const data = await response.json();


            if (response.ok) {

                console.log("Login successful:", data);


                showPopup(
                    "Login Successful!",
                    "Welcome back. You are now logged in.",
                    () => {

                        window.location.href = "profile.html";

                    }
                );


            } else {

                message.textContent = data.message;

                console.log("Login failed:", data);

            }


        } catch (error) {

            console.error("Fetch error:", error);

            message.textContent =
                "Cannot connect to server.";

        }

    });

}