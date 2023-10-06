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
    console.log(json);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

const follow = document.querySelector("#follow");
const unfollow = document.querySelector("#unfollow");
const username = localStorage.getItem("otherProfile");

follow.onclick = function () {
  const follow = `https://api.noroff.dev/api/v1/social/profiles/${username}/follow`;

  followUnfollowFunction(follow);
};

unfollow.onclick = function () {
  const unfollow = `https://api.noroff.dev/api/v1/social/profiles/${username}/unfollow`;
  followUnfollowFunction(unfollow);
};
