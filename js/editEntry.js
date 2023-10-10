// editPost.js

export async function editPost(url, updatedTitle, updatedBody, updatedMedia) {
  const token = localStorage.getItem("accessToken");
  try {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: updatedTitle,
        body: updatedBody,
        media: updatedMedia,
      }),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    console.log(json);
    // Store the current scroll position in localStorage
    localStorage.setItem("scrollPosition", window.scrollY);

    // Reload the page after editing the post
    window.location.reload();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export function editPostEventListener(postId, post) {
  const editPostButton = document.querySelector(`#editPost_${postId}`);
  const titleInput = document.querySelector(`#editPost_${postId}`);
  const bodyInput = document.querySelector(`#editPost_${postId}`);
  const mediaInput = document.querySelector(`#editPost_${postId}`);

  // Set the initial values of the edit fields based on the existing post data
  titleInput.value = post.title;
  bodyInput.value = post.body;
  mediaInput.value = post.media || ""; // Set to empty string if media is undefined

  const cardBody = document.querySelector(`#cardBody_${postId}`);

  cardBody.innerHTML = `
        <div class="modal-body">
          <h1 class="fs-5 text-center">Edit post</h1>
          <div class="row d-flex flex-column">
            <div class="col-md-8 col-sm-12 m-auto">
              <div class="input-group">
                <textarea class="form-control" placeholder="Title" id="titlePost_${postId}" style="height: 50px">${
    post.title
  }</textarea>
              </div>
              <div class="input-group">
                <textarea class="form-control" placeholder="What's on your mind?" id="bodyPost_${postId}" style="height: 100px">${
    post.body
  }</textarea>
              </div>
            </div>
            <div class="col-md-8 col-sm-12 mt-2 m-auto">
              <div class="input-group">
                <textarea class="form-control" placeholder="Link an image" id="mediaPost_${postId}" style="height: 30px">${
    post.media || ""
  }</textarea>
                <button class="btn btn-primary col-4" type="button" id="updatePostButton">Update</button>
              </div>
            </div>
          </div>
        </div>`;

  const updatePostButton = document.querySelector("#updatePostButton");

  updatePostButton.addEventListener("click", () => {
    const updatedTitle = document.querySelector(`#titlePost_${postId}`).value;
    const updatedBody = document.querySelector(`#bodyPost_${postId}`).value;
    const updatedMedia = document.querySelector(`#mediaPost_${postId}`).value;

    // Create a PUT request to update the post with the new data
    const editUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}`;
    editPost(editUrl, updatedTitle, updatedBody, updatedMedia);
  });
}
