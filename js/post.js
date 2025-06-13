const baseURL = 'https://your-render-backend.com/api'; // 🔁 Replace with your backend URL

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in.");
      window.location.href = "login.html";
      return;
    }

    const type = document.getElementById("type").value;
    const place = document.getElementById("place").value;
    const message = document.getElementById("message").value;
    const imageFile = document.getElementById("image").files[0];

    const formData = new FormData();
    formData.append("type", type);
    formData.append("place", place);
    formData.append("message", message);
    formData.append("image", imageFile);

    try {
      const res = await fetch(`${baseURL}/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert("Post submitted successfully!");
        window.location.href = "index.html";
      } else {
        alert(data.message || "Failed to submit post.");
      }
    } catch (err) {
      console.error("Post Error:", err);
      alert("An error occurred.");
    }
  });
});
