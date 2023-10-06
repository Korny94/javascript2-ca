const avatar = document.querySelector("#profilePic");
const banner = document.querySelector("#bannerPic");
const profileName = document.querySelector("#profileName");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");

const title = document.querySelector("title");

title.innerHTML = localStorage.getItem("name") + "'s Profile" + " | TeeTalk";

async function getProfile() {
  try {
    const username = localStorage.getItem("name");
    const postsUrl = `https://api.noroff.dev/api/v1/social/profiles/${username}`;
    const profileBannerPic = document.querySelector("#profileBannerPic");
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(postsUrl, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);

    profileBannerPic.classList.remove("loading");
    profileName.innerText = "@" + username;
    banner.src = json.banner ? json.banner : "/assets/noImage.jpg";
    avatar.src = json.avatar ? json.avatar : "/assets/profileNoImage.png";
    followers.innerText = json._count.followers + " Followers";
    following.innerText = json._count.following + " Following";
  } catch (error) {
    profileBannerPic.classList.remove("loading");
    profileBannerPic.classList.add("error");
    profileBannerPic.innerText = "There was an error!";
    console.log(error);
  }
}

getProfile();
