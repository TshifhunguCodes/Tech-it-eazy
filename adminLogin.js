document
  .getElementById("adminLoginForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const errorMsg = document.getElementById("adminErrorMsg");

    // Simple hardcoded admin credentials (you can replace with DB later)
    const adminCredentials = {
      username: "admin",
      password: "admin123",
    };

    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      localStorage.setItem("currentAdmin", JSON.stringify({ username }));
      window.location.href = "admin-dashboard.html";
    } else {
      errorMsg.textContent = "❌ Invalid admin username or password!";
      errorMsg.style.display = "block";
    }
  });
