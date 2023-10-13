/**
 * @function createPost
 * @async
 * @description Create a new post using the specified data.
 *
 * @returns {Promise<void>}
 */
async function createPost() {
  try {
    const title = document.querySelector("#titlePost").value;

    const body = document.querySelector("#bodyPost").value;
    const mediaInput = document.querySelector("#mediaPost").value;

    const token = localStorage.getItem("accessToken");

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        media: mediaInput,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `https://api.noroff.dev/api/v1/social/posts`,
      fetchOptions
    );

    // Store the current scroll position in localStorage
    localStorage.setItem("scrollPosition", window.scrollY);

    // Reload the page after editing the post
    window.location.reload();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Event listener for creating a post
const createPostButton = document.querySelector("#createPostButton");

/**
 * @event
 * @description Event listener for creating a post when the button is clicked.
 */
createPostButton.addEventListener("click", () => {
  const titlePost = document.querySelector("#titlePost");
  const title = titlePost.value;
  // Check if title is empty
  if (!title) {
    titlePost.classList.add("border-danger");
    titlePost.placeholder = "Title is required";
  } else {
    createPost();
  }
});
