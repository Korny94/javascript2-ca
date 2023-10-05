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

    // 1. Store the current scroll position
    const scrollPosition = window.scrollY || window.pageYOffset;

    // 2. Reload the page and scroll to the stored position after it loads
    window.location.reload();

    // Add a load event listener to scroll to the stored position when the page is fully loaded
    window.addEventListener("load", () => {
      window.scrollTo(0, scrollPosition - 70);
    });
  } catch (error) {
    console.log(error);
  }
}

// Function to attach the comment event listener
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
