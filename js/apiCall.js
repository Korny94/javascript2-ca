// Import the functions from the react module
import { addReactionListeners, postReaction } from "./postReactions.js";
import { postComment, attachCommentEventListener } from "./postComment.js";

// Append query parameters to the URL to include all optional properties
const postsUrl = `https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true`;

async function getWithToken(url) {
  try {
    const postsContainer = document.querySelector("#postsContainer");
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
    postsContainer.classList.remove("loading");

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
            <p class="mb-0 singleComment"><span class="commentName">${capitalizedCommentName}:</span>  ${comment.body}</p>
          </div>
        `;
      });

      const authorName = post.author.name;

      // Capitalize the first letter
      const capitalizedAuthorName =
        authorName.charAt(0).toUpperCase() + authorName.slice(1);

      const imageUrl = post.media ? post.media : "/assets/noImage.jpg";
      const imageUrlAvatar = post.author.avatar
        ? post.author.avatar
        : "/assets/profileNoImage.png";

      const postId = post.id;

      const postContainer = document.createElement("div");
      postContainer.classList.add("card", "m-auto", "mt-5", "mb-5");

      // Sanitize and set the innerHTML
      postContainer.innerHTML = DOMPurify.sanitize(
        `
    <div class="card-body d-flex justify-content-between">
      <div class=" d-flex align-items-center gap-2">
        <img src="${imageUrlAvatar}" class="commentAvatar">
        <li class="list-group-item">${capitalizedAuthorName}</li>
      </div>
      <button type="button" class="btn-close" aria-label="Close"></button>
    </div>
    <img src="${imageUrl}" class="card-img-top postImage">
    <div class="card-body d-flex justify-content-between postedId">
      <li class="list-group-item"><span class="bold">Posted:</span> <span class="smallText">${updatedShort}</span></li>
      <li class="list-group-item"><span class="bold">ID:</span>  <span class="smallText">${postId}</span></li>
    </div>
    <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.body}</p>
    </div>
    <ul class="list-group list-group-flush">
      <div class="d-flex">
        <div class="card-body bodyReactions">
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
        <div class="d-flex">
          <div class="react" id="thumbsUp_${postId}" data-symbol="👍">👍</div>
          <div class="react" id="thumbsDown_${postId}" data-symbol="👎">👎</div>
          <div class="react" id="lol_${postId}" data-symbol="🤣">🤣</div>
          <div class="react" id="mad_${postId}" data-symbol="😡">😡</div>
        </div>
      </div>
      <li class="list-group-item commentCount">Comments (${post.comments.length}):</li>
      <li class="list-group-item comments">${commentsHtml}</li>
    </ul>
    <div class="input-group commentGroup">
    <img src="../assets/send.png" class="send" id="sendComment_${postId}">
      <textarea class="form-control commentPost" placeholder="Comment on this post" id="textComment_${postId}" style="height: 80px"></textarea>
    </div>
    `
      );

      postsContainer.appendChild(postContainer);
      addReactionListeners(postId, postReaction);
      attachCommentEventListener(postId);
    });
  } catch (error) {
    postsContainer.classList.remove("loading");
    postsContainer.classList.add("error");
    postsContainer.innerText = "There was an error!";
    console.log(error);
  }
}

getWithToken(postsUrl);
