/**
 * @function postComment
 * @async
 * @description Post a comment on a specific URL.
 *
 * @param {string} url - The URL to post the comment to.
 * @param {string} commentText - The text of the comment to be posted.
 * @returns {Promise<void>}
 */
export async function postComment(url, commentText) {
  const token = localStorage.getItem("accessToken");
  try {
    const postData = {
      method: "POST",
      body: JSON.stringify({
        body: commentText,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, postData);
    const json = await response.json();

    // Store the current scroll position in localStorage
    localStorage.setItem("scrollPosition", window.scrollY);

    // Reload the page after editing the post
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

/**
 * @function attachCommentEventListener
 * @description Attach the comment event listener to the specified post.
 *
 * @param {string} postId - The ID of the post to attach the listener to.
 */
export function attachCommentEventListener(postId) {
  const sendCommentButton = document.querySelector(`#sendComment_${postId}`);
  const commentInput = document.querySelector(`#textComment_${postId}`);

  sendCommentButton.addEventListener("click", () => {
    const commentText = commentInput.value;
    if (commentText.trim() !== "") {
      const commentUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}/comment`;
      postComment(commentUrl, commentText);
    }
  });
}
