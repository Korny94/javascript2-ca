async function createPost() {
  try {
    const title = document.querySelector("#titlePost").value;

    // Check if title is empty
    if (!title) {
      console.error("Title is required.");
      return;
    }

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

    if (response.ok) {
      // Handle success, e.g., show a success message or update the UI
      console.log("Post created successfully");
    } else {
      // Handle errors, e.g., show an error message
      console.error("Error creating post");
    }
    // 1. Store the current scroll position
    const scrollPosition = window.scrollY || window.pageYOffset;

    // 2. Reload the page and scroll to the stored position after it loads
    window.location.reload();

    // Add a load event listener to scroll to the stored position when the page is fully loaded
    window.addEventListener("load", () => {
      window.scrollTo(0, scrollPosition - 70);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Event listener for creating a post
const createPostButton = document.querySelector("#createPostButton");
createPostButton.addEventListener("click", createPost);
