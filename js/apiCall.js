const toTop = document.querySelector("#toTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 1000) {
    toTop.style.opacity = ".6";
    toTop.style.cursor = "pointer";
  } else {
    toTop.style.opacity = "0";
    toTop.style.cursor = "default";
  }
});

toTop.addEventListener("click", () => {
  if (toTop.style.opacity !== "0") {
    window.scrollTo(0, 0);
  }
});

// Define a variable to store the JSON data
let jsonData = [];

// Add an event listener to the select element
const selectElement = document.querySelector("#floatingSelect");

// Define the event handler function
function handleSelectChange() {
  const selectedValue = parseInt(localStorage.getItem("selectedValue"));

  // Sort the JSON data based on the selected option
  let sortedJson = [];
  switch (selectedValue) {
    case 0: // Newest (ID highest to lowest)
      sortedJson = jsonData.sort((a, b) => b.id - a.id);
      break;
    case 1: // Oldest (ID lowest to highest)
      sortedJson = jsonData.sort((a, b) => a.id - b.id);
      break;
    case 2: // Popularity (Comments.length + reactions.length)
      sortedJson = jsonData.sort(
        (a, b) =>
          b.comments.length +
          b.reactions.length -
          (a.comments.length + a.reactions.length)
      );
      break;
    case 3: // Most comments (comments.length)
      sortedJson = jsonData.sort(
        (a, b) => b.comments.length - a.comments.length
      );
      break;
    case 4: // Most reactions (reactions.length)
      sortedJson = jsonData.sort(
        (a, b) => b.reactions.length - a.reactions.length
      );
      break;
    default:
      sortedJson = jsonData; // Default order
  }

  // Update jsonData with the sorted data
  jsonData = sortedJson;

  // Call the getWithToken function with the sorted data
  getWithToken(postsUrl, jsonData);
}

// Add the event listener with the named function as the handler
selectElement.addEventListener("change", function () {
  localStorage.setItem("selectedValue", selectElement.value);
  handleSelectChange();
});

window.addEventListener("load", function () {
  this.setTimeout(() => {
    handleSelectChange();
  }, 1000);
});

// Add an event listener to the search button
const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchButton.click();
    event.preventDefault();
  }
});

// Add an event listener to the search button

searchButton.addEventListener("click", function () {
  // Get the search term from the input field
  const searchInput = document
    .querySelector("#searchInput")
    .value.toLowerCase();

  // Filter the JSON data based on the search term
  const filteredData = jsonData.filter((post) => {
    const authorName = post.author.name.toLowerCase();
    const title = post.title.toLowerCase();
    const body = post.body.toLowerCase();
    const tags = post.tags;
    return (
      authorName.includes(searchInput) ||
      title.includes(searchInput) ||
      body.includes(searchInput) ||
      tags.includes(searchInput)
    );
  });

  // Call the getWithToken function with the filtered data
  getWithToken(postsUrl, filteredData);
});

// Import the functions from the react module
import { addReactionListeners, postReaction } from "./postReactions.js";
import { postComment, attachCommentEventListener } from "./postComment.js";
import { deletePostEventListener } from "./deleteEntry.js";
import { editPostEventListener } from "./editEntry.js";

// Append query parameters to the URL to include all optional properties
const postsUrl = `https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true`;

// Fetch and store the JSON data initially and when the page loads
async function fetchData() {
  try {
    const token = localStorage.getItem("accessToken");
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(postsUrl, fetchOptions);
    console.log(response);
    jsonData = await response.json(); // Store the data in the jsonData variable
    console.log(jsonData);

    // Call the getWithToken function initially with the unsorted data
    getWithToken(postsUrl, jsonData);
  } catch (error) {
    // Handle errors
    console.error(error);
  }
}

// Initial call to fetchData to populate the jsonData variable
fetchData();

// Modify your getWithToken function to accept an additional 'data' parameter
async function getWithToken(url, data) {
  try {
    const postsContainer = document.querySelector("#postsContainer");
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
    postsContainer.innerHTML = ""; // Clear the postsContainer

    // Render posts using the sorted data
    data.forEach(function (post) {
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
        const commentAvatar = comment.author.avatar
          ? comment.author.avatar
          : "/assets/profileNoImage.png";
        const capitalizedCommentName =
          commentName.charAt(0).toUpperCase() + commentName.slice(1);
        commentsHtml += `
          <div class="comment-card border mb-2 p-2 d-flex align-items-center comment-profile" data-owner="${commentName}">
            <img src="${commentAvatar}" alt="Avatar" class="commentAvatar ms-2">
            <p class="singleComment"><span class="commentName">${capitalizedCommentName}:</span>  ${comment.body}</p>
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
    <div class="card-body d-flex justify-content-between topBody" id="cardBody_${postId}">
      <div class=" d-flex align-items-center gap-2" id="otherProfile">
        <img src="${imageUrlAvatar}" class="commentAvatar">
        <li class="list-group-item authorName">${capitalizedAuthorName}</li>
      </div>
      <div class="editDeleteBtns">
        <img src="../assets/edit.png" title="Edit post" class="editBtn" id="editPost_${postId}">
        <button type="button" title="Delete post" class="btn-close" aria-label="Close" id="deletePost_${postId}"></button>
      </div>
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

      const commentProfiles =
        postContainer.querySelectorAll(".comment-profile");

      commentProfiles.forEach((commentProfile) => {
        commentProfile.addEventListener("click", () => {
          const owner = commentProfile.getAttribute("data-owner");
          localStorage.setItem("otherProfile", owner);
          window.location.href = "othersProfile.html";
        });
      });

      const otherProfile = postContainer.querySelector("#otherProfile");
      otherProfile.onclick = function () {
        localStorage.setItem("otherProfile", post.author.name);
        window.location.href = "othersProfile.html";
      };

      postsContainer.appendChild(postContainer);
      addReactionListeners(postId, postReaction);
      attachCommentEventListener(postId);
      deletePostEventListener(postId, post);
      const editPostButton = document.querySelector(`#editPost_${postId}`);
      editPostButton.onclick = function () {
        if (localStorage.getItem("name") !== post.author.name) {
          alert("You can only edit your own posts.");
          return;
        } else {
          editPostEventListener(postId, post);
        }
      };
    });
    if (selectElement) {
      const selectedValue = localStorage.getItem("selectedValue");
      selectElement.value = selectedValue;
    }
    // Read the stored scroll position from localStorage
    const scrollPosition = localStorage.getItem("scrollPosition");
    // Scroll to the stored position with a delay of 1 second
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 1000);
    setTimeout(() => {
      localStorage.removeItem("scrollPosition");
    }, 3000);
    if (postsContainer.innerHTML === "" && searchInput !== "") {
      // No matching posts found, display a message
      setTimeout(() => {
        window.scrollTo(0, 1000);
      }, 1001);
      postsContainer.innerText = "No posts were found in this search.";
      postsContainer.style.textAlign = "center";
      postsContainer.style.fontSize = "1.2rem";
    }
  } catch (error) {
    postsContainer.classList.remove("loading");
    postsContainer.classList.add("error");
    postsContainer.innerText = "There was an error!";
    console.log(error);
  }
}
