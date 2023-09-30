const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const submitLogin = document.querySelector("#submitLogin");

submitLogin.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.setItem("email", loginEmail.value);
  localStorage.setItem("password", loginPassword.value);
  const userToLogin = {
    email: loginEmail.value,
    password: loginPassword.value,
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
