// Select nav toggle button and nav menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

//nav open/close
navToggle.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !isExpanded);
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

const postForm = document.getElementById("postForm");
const postInput = document.getElementById("postInput");
const usernameInput = document.getElementById("username");
const postsContainer = document.getElementById("posts");

// load posts to local storage
function loadPosts() {
  const savedPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];
  postsContainer.innerHTML = "";
  savedPosts.forEach((post, index) => addPostToDOM(post, index));
}

// posts to local storage
function savePosts(posts) {
  localStorage.setItem("forumPosts", JSON.stringify(posts));
}

//post element
function addPostToDOM(post, index) {
  const div = document.createElement("div");
  div.classList.add("post");

  const span = document.createElement("span");
  span.innerHTML = `<strong>${post.username}:</strong> ${post.text}`;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");

  delBtn.addEventListener("click", () => {
    let savedPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    savedPosts.splice(index, 1);
    savePosts(savedPosts);
    loadPosts();
  });

  div.appendChild(span);
  div.appendChild(delBtn);
  postsContainer.appendChild(div);
}

// form submission
postForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = postInput.value.trim();
  let username = usernameInput.value.trim();

  if (text === "") return; // only block empty posts

  // default to Anonymous if no username entered
  if (username === "") {
    username = "Anonymous";
  }

  let savedPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];
  savedPosts.push({ username, text });
  savePosts(savedPosts);

  postInput.value = "";
  loadPosts();
});


// --- Initialize ---
loadPosts();
