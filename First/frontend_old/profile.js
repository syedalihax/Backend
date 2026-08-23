// ==========================================
// PROFILE
// ==========================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


// ==========================================
// GET PROFILE
// ==========================================

const getProfile = async () => {

    try {

        const response = await fetch(
            "http://127.0.0.1:3000/api/auth/profile",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const data = await response.json();


        if (!response.ok) {

            console.log("Profile error:", data);

            localStorage.removeItem("token");

            window.location.href = "login.html";

            return;
        }


        console.log("Profile:", data);


        // Profile data frontend par show karna

        document.querySelector(".profile-avatar").textContent =
            data.data.name.charAt(0).toUpperCase();

        document.querySelector(".profile-card h1").textContent =
            `Welcome ${data.data.name} 👋`;

        document.querySelector(".info-box strong").textContent =
            "Logged In";

        document.querySelectorAll(".info-box strong")[1].textContent =
            data.data.role;


    } catch (error) {

        console.error("Fetch error:", error);

    }

};


getProfile();