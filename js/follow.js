/**
 * @function followUnfollowFunction
 * @async
 * @description Function to perform a follow or unfollow action for a user profile.
 *
 * @param {string} url - The URL for the follow or unfollow action.
 * @returns {Promise<void>} A Promise that resolves when the action is completed.
 */
async function followUnfollowFunction(url) {
  const token = localStorage.getItem("accessToken");

  try {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    location.reload();
  } catch (error) {}
}

const follow = document.querySelector("#follow");
const unfollow = document.querySelector("#unfollow");
const username = localStorage.getItem("otherProfile");

/**
 * @event
 * @description Event handler for the "Follow" button click.
 * @description Calls the followUnfollowFunction with the follow URL.
 */
follow.onclick = function () {
  const follow = `https://api.noroff.dev/api/v1/social/profiles/${username}/follow`;

  followUnfollowFunction(follow);
};

/**
 * @event
 * @description Event handler for the "Unfollow" button click.
 * @description Calls the followUnfollowFunction with the unfollow URL.
 */
unfollow.onclick = function () {
  const unfollow = `https://api.noroff.dev/api/v1/social/profiles/${username}/unfollow`;
  followUnfollowFunction(unfollow);
};
