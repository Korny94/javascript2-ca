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
    if (response.ok) {
      // Comment posted successfully, you can handle this as needed
      console.log("Comment posted successfully.");
    } else {
      // Handle error cases
      console.error("Failed to post comment.");
    }
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
