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
