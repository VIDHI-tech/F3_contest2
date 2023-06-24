// Utility function to generate a random access token
function generateAccessToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
}

// Signup function
function signup() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const cpasswordInput = document.getElementById("confirmPassword");
  const signupError = document.getElementById("signupError");
  const signupSuccess = document.getElementById("signupSuccess");

  // Retrieve user data from inputs
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const cpassword = cpasswordInput.value;

  // Validate if all fields are filled
  if (!name || !email || !password) {
    signupError.textContent = "Error : All the fields are mandatory.";
    return;
  }

  // Validate if password and confirm password match
  if (password !== cpassword) {
    signupError.textContent = "Password and Confirm Password do not match.";
    return;
  }

  // Create user state
  const user = {
    name: name,
    email: email,
    password: password,
    accessToken: generateAccessToken(),
  };

  // Save user state to local storage
  localStorage.setItem("user", JSON.stringify(user));

  // Clear inputs and show success message
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  cpasswordInput.value = "";
  signupError.textContent = "";
  signupSuccess.textContent = "Successfully Signed Up!";

  // Redirect to profile page after a delay
  setTimeout(() => {
    showPage("profilePage");
    displayProfileDetails();
  }, 1500);
}

// Logout function
function logout() {
  // Clear user state from local storage
  localStorage.removeItem("user");

  // Redirect to signup page
  showPage("signupPage");
}

// Display profile details
function displayProfileDetails() {
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profilePassword = document.getElementById("profilePassword");
  // Retrieve user state from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  // Display user details
  profileName.textContent = user.name;
  profileEmail.textContent = user.email;
  profilePassword.textContent = user.password;
}

// Function to show a specific page
function showPage(pageId) {
  const pages = document.getElementsByClassName("page");
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].id === pageId) {
      pages[i].style.display = "block";
    } else {
      pages[i].style.display = "none";
    }
  }
}

// Check if the user has an access token in local storage
function checkAccessToken() {
  const user = JSON.parse(localStorage.getItem("user"));

  // If no access token, redirect to signup page
  if (!user || !user.accessToken) {
    showPage("signupPage");
    
  }

  // If access token exists, redirect to profile page
  if (user && user.accessToken) {
    showPage("profilePage");
    displayProfileDetails();
  }
}

// Check access token on page load
window.addEventListener("load", checkAccessToken);
