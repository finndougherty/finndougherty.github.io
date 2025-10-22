// Select nav toggle button and nav menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Toggle nav menu open/close
navToggle.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !isExpanded);
  navMenu.classList.toggle('active');
});

// Select forum elements
const postForm = document.getElementById("postForm");
const postInput = document.getElementById("postInput");
const postsContainer = document.getElementById("posts");

// Handle new post submission
postForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const content = postInput.value.trim();
  if (!content) return;

  const newPost = document.createElement("p");
  newPost.innerHTML = `<strong>You:</strong> ${content}`;
  postsContainer.appendChild(newPost);

  postInput.value = "";
});


let btn = document.querySelector('#theme');

btn.addEventListener('click', toggleTheme);

function toggleTheme() {
  if (document.body.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

function setTheme(theme) {
  localStorage.setItem('userTheme', theme);

  // Remove any existing theme classes
  document.body.classList.remove('light', 'dark');
  // Add the new theme class
  document.body.classList.add(theme);
}

window.addEventListener('load', function () {
  const savedTheme = localStorage.getItem('userTheme') || 'light';
  setTheme(savedTheme);
});
