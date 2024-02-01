const avatar = document.querySelector("#profilePic");
const banner = document.querySelector("#bannerPic");
const profileName = document.querySelector("#profileName");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");

const title = document.querySelector("title");

// Set the title of the HTML document based on the user's name.
title.innerHTML = localStorage.getItem("name") + "'s Profile" + " | TeeTalk";

/**
 * @function getProfile
 * @async
 * @description Fetch and display the user's profile information.
 *
 * @returns {Promise<void>}
 */
async function getProfile() {
  try {
    const username = localStorage.getItem("name");
    const postsUrl = `https://api.noroff.dev/api/v1/social/profiles/${username}?_following=true&_followers=true&_posts=true`;
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
    const json = await response.json();

    const followers = document.querySelector("#followers");
    const following = document.querySelector("#following");

    // Function to create follower/following cards and attach click event listeners
    function createFollowerCards(data, containerSelector) {
      let cardsHTML = "";

      data.forEach(function (element) {
        const username = element.name;
        cardsHTML += DOMPurify.sanitize(
          `
      <div class="d-flex align-items-center gap-2 border p-2 mb-3 follower-card" data-username="${username}">
        <img src="${
          element.avatar ? element.avatar : "/assets/profileNoImage.png"
        }" alt="Avatar" class="followersAvatar">
        <h3 class="follower-name">${element.name}</h3>
      </div>
      `
        );
      });

      const container = document.querySelector(containerSelector);
      container.innerHTML = cardsHTML;

      // Attach click event listeners to each card
      const cards = container.querySelectorAll(".follower-card");
      cards.forEach((card) => {
        card.addEventListener("click", function () {
          const username = card.getAttribute("data-username");
          localStorage.setItem("otherProfile", username);
          window.location.href = "../html/othersProfile.html";
        });
      });
    }

    // Handle "Following" click event
    following.onclick = function () {
      createFollowerCards(json.following, "#followersModalBody");
    };

    // Handle "Followers" click event
    followers.onclick = function () {
      createFollowerCards(json.followers, "#followersModalBody");
    };

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
  }
}

/**
 * @function
 * @description Call the getProfile function to fetch and display the profile information
 */
getProfile();

const follow = document.querySelector("#follow");

/**
 * @event
 * @description Handle the "Follow" button click event.
 */
follow.onclick = function () {
  alert("You can't follow yourself!");
};
