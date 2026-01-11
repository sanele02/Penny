$(document).ready(function () {

    // Array of users
    const users = [
        { userId: "sanele123",name: "Sanele", password: "pass123" },
        { userId: "keletso98", name: "keletso",password: "cakequeen" },
        { userId: "test001",name: "john", password: "password" },
        { userId: "john45",name: "palesa", password: "tipme" }
    ];

    // --- GET ELEMENTS ---
    const loginForm = $(".form");
    const userID = $("#user-id");
    const password = $("#password");
    const subscribeBtn = $(".btn-newsletter");
    const emailInput = $(".newsletter-input input");

    // ============================
    //  LOGIN HANDLER
    // ============================
    loginForm.on("submit", function (e) {
        e.preventDefault();

        const uid = userID.val().trim();
        const pass = password.val().trim();

        // Empty check
        if (uid === "" || pass === "") {
            alert("Please enter both User ID and Password.");
            return;
        }

        // Find user in array
        const foundUser = users.find(user => user.userId === uid);

        if (!foundUser) {
            alert("User ID does not exist.");
            return;
        }

        // Check password
        if (foundUser.password !== pass) {
            alert("Incorrect password.");
            return;
        }

        // Success
        alert(`Welcome back, ${foundUser.name}! Redirecting...`);
        // window.location.href = "dashboard.html";
    });

    // ============================
    //  NEWSLETTER SUBSCRIBE
    // ============================
    subscribeBtn.on("click", function () {
        const email = emailInput.val().trim();

        if (email === "") {
            alert("Please enter an email.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert("🎉 You are now subscribed!");
        emailInput.val("");
    });

});
