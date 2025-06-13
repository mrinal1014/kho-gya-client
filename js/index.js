const baseURL = 'https://your-backend-url.com/api';

document.addEventListener("DOMContentLoaded", async () => {
  const postList = document.getElementById("postList");
  const token = localStorage.getItem("token");
  const user = getUser();

  try {
    const res = await fetch(`${baseURL}/posts`);
    const posts = await res.json();

    postList.innerHTML = "";

    posts.reverse().forEach(post => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
        <h3>${post.type.toUpperCase()} @ ${post.place}</h3>
        <p>${post.message}</p>
        <img src="${post.imageUrl}" alt="Post Image" width="200"/>
        <p>Posted by: ${post.username}</p>
        ${user && user.id === post.userId ? `<button onclick="deletePost('${post._id}')">Delete</button>` : ""}
      `;
      postList.appendChild(card);
    });

  } catch (err) {
    console.error("Failed to fetch posts", err);
  }
});

async function deletePost(id) {
  const token = localStorage.getItem("token");
  if (!confirm("Are you sure you want to delete this post?")) return;

  try {
    const res = await fetch(`${baseURL}/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      alert("Post deleted.");
      location.reload();
    } else {
      alert("Unauthorized or error deleting.");
    }
  } catch (err) {
    console.error(err);
  }
}
