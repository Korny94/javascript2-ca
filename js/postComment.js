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

// Function to attach the comment event listener
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

// Add a load event listener to scroll to the stored position when the page is fully loaded
window.addEventListener("load", () => {
  // Read the stored scroll position from localStorage
  const scrollPosition = localStorage.getItem("scrollPosition");
  // Scroll to the stored position with a delay of 1 second
  setTimeout(() => {
    window.scrollTo(0, scrollPosition);
  }, 2000); // 1000 milliseconds (1 second) delay
});
