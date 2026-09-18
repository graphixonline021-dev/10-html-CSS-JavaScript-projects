const usernameInput = document.getElementById("username-input");
const searchBtn = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");

const fetchProfile = async () => {
  const username = usernameInput.value.trim();

  if (!username) {
    alert("Please enter a GitHub username");
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    displayProfile(data);
  } catch (error) {
    profileContainer.classList.remove("hidden");
    profileContainer.innerHTML = `<p class="error">${error.message}</p>`;
  }
};

const displayProfile = (user) => {
  profileContainer.classList.remove("hidden");
  profileContainer.innerHTML = `
    <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
    <h2 class="name">${user.name || user.login}</h2>
    <p class="bio">${user.bio || "No bio available"}</p>
    
    <div class="stats">
      <div class="stat-item">
        <span>${user.public_repos}</span>
        <p>Repos</p>
      </div>
      <div class="stat-item">
        <span>${user.followers}</span>
        <p>Followers</p>
      </div>
      <div class="stat-item">
        <span>${user.following}</span>
        <p>Following</p>
      </div>
    </div>
    
    <a href="${user.html_url}" target="_blank" class="profile-link">View GitHub Profile →</a>
  `;
};

searchBtn.addEventListener("click", fetchProfile);

usernameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchProfile();
  }
});