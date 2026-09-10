document.addEventListener("DOMContentLoaded", () => {
    // Role selection tabs in Login & Register forms
    const roleOptions = document.querySelectorAll(".role-option");
    roleOptions.forEach((option) => {
        option.addEventListener("click", () => {
            const radioInput = option.querySelector("input[type='radio']");
            if (radioInput) {
                radioInput.checked = true;
                
                // Update active class on siblings
                const parentSelector = option.closest(".role-selector");
                if (parentSelector) {
                    parentSelector.querySelectorAll(".role-option").forEach((opt) => opt.classList.remove("active"));
                }
                option.classList.add("active");

                // Trigger role change logic if in Register form
                const roleValue = radioInput.value;
                handleRegisterRoleChange(roleValue);
            }
        });
    });

    // Handle role-specific input fields in Register form
    function handleRegisterRoleChange(role) {
        const farmerGroup = document.getElementById("farmerLocationGroup");
        const buyerGroup = document.getElementById("buyerAddressGroup");

        if (farmerGroup && buyerGroup) {
            if (role === "farmer") {
                farmerGroup.classList.remove("hidden");
                buyerGroup.classList.add("hidden");
            } else {
                buyerGroup.classList.remove("hidden");
                farmerGroup.classList.add("hidden");
            }
        }
    }

    // Toggle Password Visibility
    const togglePasswordBtn = document.getElementById("togglePasswordBtn");
    const passwordInput = document.getElementById("password");

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener("click", () => {
            const isPassword = passwordInput.type === "password";
            passwordInput.type = isPassword ? "text" : "password";
            togglePasswordBtn.textContent = isPassword ? "🙈" : "👁️";
        });
    }

    // Quick Demo Login buttons
    const demoFarmerBtn = document.getElementById("demoFarmerBtn");
    const demoBuyerBtn = document.getElementById("demoBuyerBtn");
    const emailInput = document.getElementById("email");

    if (demoFarmerBtn && emailInput && passwordInput) {
        demoFarmerBtn.addEventListener("click", () => {
            emailInput.value = "farmer.demo@agriconnect.org";
            passwordInput.value = "farmer123";
            const farmerRole = document.querySelector(".role-option[data-role='farmer']");
            if (farmerRole) farmerRole.click();
        });
    }

    if (demoBuyerBtn && emailInput && passwordInput) {
        demoBuyerBtn.addEventListener("click", () => {
            emailInput.value = "buyer.demo@agriconnect.org";
            passwordInput.value = "buyer123";
            const buyerRole = document.querySelector(".role-option[data-role='buyer']");
            if (buyerRole) buyerRole.click();
        });
    }

    // Client-side Password Match Validation on Register
    const registerForm = document.getElementById("registerForm");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const clientErrorBox = document.getElementById("clientErrorBox");

    if (registerForm && confirmPasswordInput && passwordInput && clientErrorBox) {
        registerForm.addEventListener("submit", (e) => {
            if (passwordInput.value !== confirmPasswordInput.value) {
                e.preventDefault();
                clientErrorBox.textContent = "⚠️ Passwords do not match. Please verify and try again.";
                clientErrorBox.classList.remove("hidden");
                confirmPasswordInput.focus();
            } else {
                clientErrorBox.classList.add("hidden");
            }
        });
    }
});
