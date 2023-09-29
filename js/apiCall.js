// ...

// Append query parameters to the URL to include all optional properties
const postsUrl = `https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true`;

async function getWithToken(url) {
  try {
    const postsContainer = document.querySelector("#postsContainer");
    const mainContainer = document.querySelector("#mainContainer");
    console.log(url);
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
    mainContainer.classList.remove("loading");
    json.forEach(function (post) {
      const updatedShort = post.updated.substring(0, 10);

      // Initialize empty strings to store reaction symbols and counts
      let reactionsSymbolHtml = "";
      let reactionsCountHtml = "";

      // Loop through reactions to generate HTML for each symbol and count
      post.reactions.forEach((reaction) => {
        reactionsSymbolHtml += `<div class="reaction-symbol">${reaction.symbol}</div>`;
        reactionsCountHtml += `<div class="reaction-count">${reaction.count}</div>`;
      });

      // Initialize an empty string to store comment HTML
      let commentsHtml = "";

      post.comments.forEach((comment) => {
        const commentName = comment.owner;
        const capitalizedCommentName =
          commentName.charAt(0).toUpperCase() + commentName.slice(1);
        commentsHtml += `
            <div class="comment-card border mb-2 p-2">
              <p class="mb-0">${capitalizedCommentName}: ${comment.body}</p>
            </div>
          `;
      });

      // Assuming post.author.name contains the name you want to capitalize
      const authorName = post.author.name;

      // Capitalize the first letter
      const capitalizedAuthorName =
        authorName.charAt(0).toUpperCase() + authorName.slice(1);

      // Assuming post.media contains the image URL or is empty/null when there's no image
      const imageUrl = post.media ? post.media : "/assets/noImage.png";
      const imageUrlAvatar = post.author.avatar
        ? post.author.avatar
        : "/assets/noImage.png";

      postsContainer.innerHTML += `
      <div class="card m-auto mt-5 mb-5"">
      <div class="card-body d-flex align-items-center gap-2">
      <img src="${imageUrlAvatar}" class="commentAvatar">
      <li class="list-group-item">${capitalizedAuthorName}</li>
    </div>
            <img src="${imageUrl}" class="card-img-top postImage">
            <div class="card-body d-flex justify-content-between">
              <li class="list-group-item">Posted: ${updatedShort}</li>
              <li class="list-group-item">ID: ${post.id}</li>
            </div>
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body}</p>
            </div>
            <ul class="list-group list-group-flush">
              <div class="card-body">
                <li class="list-group-item reactions">
                  <div class="d-flex justify-content-between">
                  <div>
                  ${reactionsSymbolHtml}
                  </div>
                  <div>
                  ${reactionsCountHtml}
                  </div>
                  </div>
                </li>
              </div>
              <li class="list-group-item">Comments (${post.comments.length}):</li>
              <li class="list-group-item comments">${commentsHtml}</li>
            </ul>
          </div>
        `;
    });
  } catch (error) {
    mainContainer.classList.remove("loading");
    mainContainer.classList.add("error");
    mainContainer.innerHTML = "There was an error!";
    console.log(error);
  }
}

getWithToken(postsUrl);
