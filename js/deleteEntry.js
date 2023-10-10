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

// Add a load event listener to scroll to the stored position when the page is fully loaded
window.addEventListener("load", () => {
  // Read the stored scroll position from localStorage
  const scrollPosition = localStorage.getItem("scrollPosition");
  if (scrollPosition !== null) {
    // Scroll to the stored position with a delay of 1 second
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 1000); // 1000 milliseconds (1 second) delay
  }
});
