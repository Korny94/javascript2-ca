/**
 * @function deletePost
 * @async
 * @description Delete a post using the specified URL.
 *
 * @param {string} url - The URL for deleting the post.
 * @returns {Promise<void>}
 */
export async function deletePost(url) {
  const token = localStorage.getItem("accessToken");
  try {
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(json);

    // Store the current scroll position in localStorage
    localStorage.setItem("scrollPosition", window.scrollY);

    // Reload the page after editing the post
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

/**
 * @function deletePostEventListener
 * @description Attach an event listener for deleting a post.
 *
 * @param {string} postId - The ID of the post to attach the listener to.
 * @param {object} post - The post data to delete.
 */
export function deletePostEventListener(postId, post) {
  const deletePostButton = document.querySelector(`#deletePost_${postId}`);

  deletePostButton.addEventListener("click", () => {
    if (localStorage.getItem("name") !== post.author.name) {
      alert("You can only delete your own posts.");
      return;
    }
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }
    const deleteUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}`;
    deletePost(deleteUrl);
  });
}
