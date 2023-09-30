const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const submitLogin = document.querySelector("#submitLogin");
const popoverMessage = document.querySelector("#popoverMessage");
const popoverMessage2 = document.querySelector("#popoverMessage2");
const loginFailed = document.querySelector("#loginFailed");

submitLogin.addEventListener("click", (event) => {
  event.preventDefault();

  // Get the email and password values from the form
  const email = loginEmail.value;
  const password = loginPassword.value;

  // Define regular expressions for email format and password length
  const emailRegex = /^[a-zA-Z0-9._-]+@(noroff\.no|stud\.noroff\.no)$/i;
  const passwordRegex = /^.{8,}$/;

  // Check if the email and password match the required formats
  if (!emailRegex.test(email)) {
    popoverMessage.innerText = "Please use @noroff.no or @stud.noroff.no.";
    loginEmail.classList.add("border-danger");
    return;
  } else loginEmail.classList.remove("border-danger");
  loginEmail.classList.add("border-success");
  popoverMessage.innerText = "";

  if (!passwordRegex.test(password)) {
    popoverMessage2.innerText = "Password must be at least 8 characters long.";

    loginPassword.classList.add("border-danger");
    return;
  } else loginPassword.classList.remove("border-danger");

  // For example, you can send a login request to your API
  const userToLogin = {
    email: email,
    password: password,
  };
  const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`;
  loginUser(loginUrl, userToLogin);
});

// SIGN IN USER

/**
 * @param {string} url
 * @param {any} userData
 * ``` js
 * loginUser(loginUrl, userToLogin);
 * ```
 */

async function loginUser(url, userData) {
  try {
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
    console.log(json.accessToken);
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("name", json.name);
    localStorage.setItem("status", response.ok);
    if (response.ok) {
      window.location.href = "/html/profile.html";
    } else {
      loginFailed.classList.add("text-danger");
      loginFailed.innerText = "Login failed, please try again.";
    }
  } catch (error) {
    console.log(error);
  }
}

const loginUrl = `${API_BASE_URL}/api/v1/social/auth/login`;

// const userToLogin = {
//   email: "test_user_korny@stud.noroff.no",
//   password: "Rbkebest94!",
// };

// loginUser(loginUrl, userToLogin);
