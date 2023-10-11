const userName = document.querySelector("#signUpUsername");
const email = document.querySelector("#signUpEmail");
const password = document.querySelector("#signUpPassword");
const submitRegister = document.querySelector("#submitRegister");
const registerH2 = document.querySelector(".registerH2");
const popoverMessageEmail = document.querySelector("#popoverMessage3");
const popoverMessagePassword = document.querySelector("#popoverMessage4");
const popoverMessageUsername = document.querySelector("#popoverMessage5");
const signInHere = document.querySelector("#signInHere");
const signUpForm = document.querySelector("#signUpForm");
const signInForm = document.querySelector("#signInForm");

submitRegister.addEventListener("click", (event) => {
  event.preventDefault();

  // Get the user input values from the form
  const name = userName.value;
  const userEmail = email.value;
  const userPassword = password.value;

  // Define regular expressions for email format and password length
  const emailRegex = /^[a-zA-Z0-9._-]+@(noroff\.no|stud\.noroff\.no)$/i;
  const passwordRegex = /^.{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;

  if (!usernameRegex.test(name)) {
    popoverMessageUsername.innerText =
      "Min. 3 characters long. (Only letters, numbers & underscores)";
    userName.classList.add("border-danger");
    return;
  } else userName.classList.remove("border-danger");
  userName.classList.add("border-success");
  popoverMessageUsername.innerText = "";

  // Check if the email and password match the required formats
  if (!emailRegex.test(userEmail)) {
    popoverMessageEmail.innerText = "Please use @noroff.no or @stud.noroff.no.";
    email.classList.add("border-danger");
    return;
  } else email.classList.remove("border-danger");
  email.classList.add("border-success");
  popoverMessageEmail.innerText = "";

  if (!passwordRegex.test(userPassword)) {
    popoverMessagePassword.innerText =
      "Password must be at least 8 characters long.";
    password.classList.add("border-danger");
    return;
  } else password.classList.remove("border-danger");
  password.classList.add("border-success");
  popoverMessagePassword.innerText = "";

  // Create the user data object
  const userToRegister = {
    name: name,
    email: userEmail,
    password: userPassword,
  };
  const registerUrl = `${API_BASE_URL}/api/v1/social/auth/register`;

  // Call the registerUser function
  registerUser(registerUrl, userToRegister);
});

// Url for all the api calls
const API_BASE_URL = "https://api.noroff.dev";

// SIGN UP USER

/**
 * @param {string} url
 * @param {any} userData
 * ``` js
 * registerUser(registerUrl, userToRegister);
 * ```
 */

// Register user function
async function registerUser(url, userData) {
  try {
    // Do API call
    const postData = {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    if (response.ok === true) {
      registerH2.classList.remove("text-danger");
      loginFailed.classList.add("text-success");

      // Sanitize and set the innerHTML
      loginFailed.innerHTML = DOMPurify.sanitize(
        "Registration successful!<br>Please sign in."
      );
      signUpForm.style.display = "none";
      signInForm.style.display = "block";
    } else {
      registerH2.classList.add("text-danger");
      registerH2.innerText = "User already exists.";
    }
  } catch (error) {
    console.log(error);
  }
}

signInHere.addEventListener("click", (event) => {
  event.preventDefault();
  signUpForm.style.display = "none";
  signInForm.style.display = "block";
});
