/**
 * @function addReactionListeners
 * @description Add click event listeners for reactions.
 *
 * @param {string} postId - The ID of the post to attach the listeners to.
 * @param {Function} postReaction - The function to handle post reactions.
 */
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

/**
 * @function postReaction
 * @async
 * @description Handle post reactions.
 *
 * @param {string} url - The URL to send the reaction request.
 * @returns {Promise<void>}
 */
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
    // Store the current scroll position in localStorage
    localStorage.setItem("scrollPosition", window.scrollY);

    // Reload the page after editing the post
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
