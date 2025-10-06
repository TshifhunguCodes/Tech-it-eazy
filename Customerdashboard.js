

// Display username
document.getElementById("usernameDisplay").textContent = currentUser.username;

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "customerLogin.html";
});

// Handle service requests
const serviceButtons = document.querySelectorAll(".service-btn");
const requestMessage = document.getElementById("requestMessage");

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.getAttribute("data-service") || button.textContent.trim();
    requestMessage.textContent = `✅ You have requested the ${service} service. Our team will assist you shortly.`;

    // Save request for admin view later
    let requests = JSON.parse(localStorage.getItem("serviceRequests")) || [];
    requests.push({ user: currentUser.username, service });
    localStorage.setItem("serviceRequests", JSON.stringify(requests));
  });
});
