$(document).ready(function () {

    // Test Users
    const users = [
        { userId: "sanele123", name: "Sanele" },
        { userId: "keletso98", name: "Keletso" },
        { userId: "john45", name: "John" },
        { userId: "test001", name: "Test User" }
    ];

    // DOM Elements
    const popup = $("#search-container");
    const userIdInput = $("#search-user-id");
    const amountInput = $("#tip-amount");
    const amountLabel = $("#amount-label");
    const paymentSelect = $("#payment-method");
    const paymentLabel = $("#pay-label");
    const confirmBtn = $("#search-confirm");

    const searchBtn = $(".action-btn:first"); // Search UserID button
    const scanBtn = $(".action-btn:last"); // QR Code button

    //  OPEN POPUP
    searchBtn.on("click", () => {
        popup.removeClass("hidden");
        userIdInput.val("");
        amountInput.val("");
        paymentSelect.val("");

        amountInput.hide();
        amountLabel.hide();
        paymentSelect.hide();
        paymentLabel.hide();

        confirmBtn.text("Find User");
        confirmBtn.data("step", "find");
    });

    //  CLOSE POPUP
    $("#search-close").on("click", () => popup.addClass("hidden"));

    //  CONFIRM BUTTON LOGIC
    confirmBtn.on("click", () => {
        const step = confirmBtn.data("step");

        // STEP 1 — FIND USER
        if (step === "find") {
            const enteredID = userIdInput.val().trim();

            if (enteredID === "") {
                alert("Please enter a User ID.");
                return;
            }

            const foundUser = users.find(
                u => u.userId.toLowerCase() === enteredID.toLowerCase()
            );

            if (!foundUser) {
                alert(`User "${enteredID}" not found.`);
                return;
            }

            alert(` User found: ${foundUser.name}`);

            // Move to next step
            amountInput.show();
            amountLabel.show();

            paymentSelect.hide();
            paymentLabel.hide();

            confirmBtn.text("Next");
            confirmBtn.data("step", "amount");
            confirmBtn.data("username", foundUser.name);
            return;
        }

        // STEP 2 — ENTER AMOUNT
        if (step === "amount") {
            const amount = amountInput.val().trim();

            if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
                alert("Please enter a valid amount.");
                return;
            }

            paymentLabel.show();
            paymentSelect.show();

            confirmBtn.text("Tip Now");
            confirmBtn.data("step", "pay");
            return;
        }

        // STEP 3 — PAYMENT
        if (step === "pay") {
            const method = paymentSelect.val();
            const amount = amountInput.val();
            const username = confirmBtn.data("username");

            if (method === "") {
                alert("Please select a payment method.");
                return;
            }

            //  Placeholder for REAL PAYMENT GATEWAY
            alert(
                ` Starting payment...\n\n` +
                `User: ${username}\n` +
                `Amount: R${amount}\n` +
                `Payment Method: ${method.toUpperCase()}`
            );

            // Add your payment gateway API call here  
            // Example: redirect to PayFast, Yoco, PayPal, etc.

            popup.addClass("hidden");
        }
    });

    //  QR CODE NOT READY
    scanBtn.on("click", () => {
        alert(
            "QR Scanner not available yet.\n" +
            "Coming soon!"
        );
    });
});
