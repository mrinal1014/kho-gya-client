const baseURL = 'https://kho-gaya-board.onrender.com/api'; // Change to your backend URL


document.addEventListener("DOMContentLoaded", async () => {
  const user = getUser();
  const token = localStorage.getItem("token");

  if (!user || user.role !== 'admin') {
    alert("Access denied. Admins only.");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`${baseURL}/admin/posts`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const posts = await res.json();
    const container = document.getElementById("adminPosts");

    posts.reverse().forEach(post => {
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
        <h3>${post.type.toUpperCase()} @ ${post.place}</h3>
        <p>${post.message}</p>
        <img src="${post.imageUrl}" width="200"/>
        <p>By: ${post.username}</p>
        <button onclick="deletePost('${post._id}')">🗑 Delete</button>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Admin fetch error", err);
  }
});

async function deletePost(id) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${baseURL}/admin/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      alert("Post deleted by admin.");
      location.reload();
    } else {
      alert("Error or unauthorized.");
    }
  } catch (err) {
    console.error("Admin delete error", err);
  }
}
