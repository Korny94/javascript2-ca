const avatarPic = document.querySelector("#profilePic");
const bannerPic = document.querySelector("#bannerPic");

/**
 * @function editAvatar
 * @async
 * @description Edit the user's avatar.
 * @param {string} avatarUrl - The URL of the new avatar image.
 * @returns {Promise<void>}
 */

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
    location.reload();
  } catch (error) {}
}

/**
 * @function editBanner
 * @async
 * @description Edit the user's banner image.
 * @param {string} bannerUrl - The URL of the new banner image.
 * @returns {Promise<void>}
 */

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
    location.reload();
  } catch (error) {}
}

/**
 * @function editMediaEventListener
 * @description Attach event listeners to the profile picture and banner picture for editing media.
 */

function editMediaEventListener() {
  bannerPic.addEventListener("click", () => {
    const bannerUrl = prompt("Enter new banner-image URL");
    if (!bannerUrl) {
      return;
    }
    editBanner(bannerUrl);
  });

  avatarPic.addEventListener("click", () => {
    const avatarUrl = prompt("Enter new profile-image URL");
    if (!avatarUrl) {
      return;
    }
    editAvatar(avatarUrl);
  });
}

/**
 * @function
 * @description Initialize the media editing event listener.
 */
editMediaEventListener();
