// Function to add click event listeners for reactions
export function addReactionListeners(postId, postReaction) {
  const thumbsUp = document.querySelector(`#thumbsUp_${postId}`);
  const thumbsDown = document.querySelector(`#thumbsDown_${postId}`);
  const lol = document.querySelector(`#lol_${postId}`);
  const mad = document.querySelector(`#mad_${postId}`);

  thumbsUp.addEventListener("click", function () {
    const reactUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}/react/👍`;
    postReaction(reactUrl);
  });

  thumbsDown.addEventListener("click", function () {
    const reactUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}/react/👎`;
    postReaction(reactUrl);
  });

  lol.addEventListener("click", function () {
    const reactUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}/react/🤣`;
    postReaction(reactUrl);
  });

  mad.addEventListener("click", function () {
    const reactUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}/react/😡`;
    postReaction(reactUrl);
  });
}

// Function to handle post reactions
export async function postReaction(url) {
  const token = localStorage.getItem("accessToken");
  console.log(token);
  try {
    const postData = {
      method: "PUT",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    console.log(response);
    // 1. Store the current scroll position
    const scrollPosition = window.scrollY || window.pageYOffset;

    // 2. Reload the page and scroll to the stored position after it loads
    window.location.reload();

    // Add a load event listener to scroll to the stored position when the page is fully loaded
    window.addEventListener("load", () => {
      window.scrollTo(0, scrollPosition);
    });
  } catch (error) {
    console.log(error);
  }
}
