const form = document.getElementById("registrationForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");
const successMessage = document.getElementById("successMessage");

// Utility: show error
function showError(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector(".error-message");
  input.classList.remove("valid");
  input.classList.add("invalid");
  errorMessage.textContent = message;
}

// Utility: show success
function showSuccess(input) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector(".error-message");
  input.classList.remove("invalid");
  input.classList.add("valid");
  errorMessage.textContent = "";
}

// Validation Functions
function checkFullName() {
  if (fullname.value.trim() === "") {
    showError(fullname, "Full Name is required");
    return false;
  } else {
    showSuccess(fullname);
    return true;
  }
}

function checkEmail() {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.value.trim())) {
    showError(email, "Enter a valid email");
    return false;
  } else {
    showSuccess(email);
    return true;
  }
}

function checkPassword() {
  const pass = password.value.trim();
  if (pass.length < 6) {
    showError(password, "Password must be at least 6 characters");
    return false;
  }
  if (!/[!@#$%^&*]/.test(pass)) {
    showError(password, "Password must include a special character");
    return false;
  }
  showSuccess(password);
  return true;
}

function checkPhone() {
  const re = /^[0-9]{10}$/;
  if (!re.test(phone.value.trim())) {
    showError(phone, "Phone must be 10 digits");
    return false;
  } else {
    showSuccess(phone);
    return true;
  }
}

// Event Listeners (real-time validation)
fullname.addEventListener("input", checkFullName);
email.addEventListener("input", checkEmail);
password.addEventListener("input", checkPassword);
phone.addEventListener("input", checkPhone);

// Form submission
form.addEventListener("submit", function(e) {
  e.preventDefault(); // stop normal form submit

  const isValid =
    checkFullName() & checkEmail() & checkPassword() & checkPhone();

  if (isValid) {
    successMessage.textContent = "✅ Registration Successful!";
    form.reset();
    // remove borders after reset
    document.querySelectorAll("input").forEach(input => {
      input.classList.remove("valid");
      input.classList.remove("invalid");
    });
  } else {
    successMessage.textContent = "";
  }
});
