const avatarPic = document.querySelector("#profilePic");
const bannerPic = document.querySelector("#bannerPic");

async function editAvatar(avatarUrl) {
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("name");
  const editAvatarUrl = `https://api.noroff.dev/api/v1/social/profiles/${username}/media`;

  try {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    };

    const response = await fetch(editAvatarUrl, postData);
    const json = await response.json();
    console.log(json);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function editBanner(bannerUrl) {
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("name");
  const editBannerUrl = `https://api.noroff.dev/api/v1/social/profiles/${username}/media`;

  try {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        banner: bannerUrl,
      }),
    };

    const response = await fetch(editBannerUrl, postData);
    const json = await response.json();
    console.log(json);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

// Function to attach the edit media event listener
function editMediaEventListener() {
  bannerPic.addEventListener("click", () => {
    console.log("Banner clicked");
    const bannerUrl = prompt("Enter new banner-image URL");
    editBanner(bannerUrl);
  });

  avatarPic.addEventListener("click", () => {
    console.log("Avatar clicked");
    const avatarUrl = prompt("Enter new profile-image URL");
    editAvatar(avatarUrl);
  });
}

editMediaEventListener();
