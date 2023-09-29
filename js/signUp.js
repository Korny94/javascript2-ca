const userName = document.querySelector("#validationCustomUsername");
const email = document.querySelector("#validationCustomEmail");
const password = document.querySelector("#validationCustomPassword");
const submitRegister = document.querySelector("#submitRegister");

submitRegister.addEventListener("click", (event) => {
  console.log(userName.value, email.value, password.value);
  const userToRegister = {
    name: userName.value,
    email: email.value,
    password: password.value,
  };
  const registerUrl = `${API_BASE_URL}/api/v1/social/auth/register`;
  registerUser(registerUrl, userToRegister);
});

// Url for all the api calls
const API_BASE_URL = "https://api.noroff.dev";

// ENDPOINTS:
// Register: api/v1//social/auth/register
// Login: api/v1//social/auth/login
// Get All Posts: api/v1//social/posts

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
  } catch (error) {
    console.log(error);
  }
}

// Example User
// const userToRegister = {
//   name: "test_user_korny1",
//   email: "test_user_korny1@stud.noroff.no",
//   password: "Rbkebest94!",
// };

const registerUrl = `${API_BASE_URL}/api/v1/social/auth/register`;

// registerUser(registerUrl, userToRegister);

// Sign up user info
// const userInfo = {
//   name: "my_username", // Required (A unique username)
//   email: "first.last@stud.noroff.no", // Required (A unique email)
//   password: "UzI1NiIsInR5cCI", // Required (A password)
//   avatar: "https://img.service.com/avatar.jpg", // Optional (A link to an avatar image)
//   banner: "https://img.service.com/banner.jpg", // Optional (A link to a banner image)
// };
