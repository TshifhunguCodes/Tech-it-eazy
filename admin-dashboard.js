// Check admin session
const currentAdmin = JSON.parse(localStorage.getItem("currentAdmin"));
if (!currentAdmin) {
  alert("Please log in as admin to access this page.");
  window.location.href = "adminLogin.html";
}

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentAdmin");
  window.location.href = "adminLogin.html";
});

const tableBody = document.querySelector("#requestsTable tbody");
const serviceFilter = document.getElementById("serviceFilter");

let serviceRequests = JSON.parse(localStorage.getItem("serviceRequests")) || [];

function getRequestDetails(req) {
  if (!req || !req.service) return "-";

  switch (req.service) {
    case "Printing":
      return `
        <strong>Color:</strong> ${req.colorOption || "Not specified"}<br>
        <strong>Pages:</strong> ${req.numberOfPages || "Not specified"}<br>
        <strong>Document Name:</strong> ${req.documentName || "Not specified"}
      `;

    case "CV Poster":
      return `
        <strong>Full Name:</strong> ${req.fullName || "Not specified"}<br>
        <strong>Education:</strong> ${req.education || "Not specified"}<br>
        <strong>Degree:</strong> ${req.degree || "Not specified"}<br>
        <strong>Skills:</strong> ${req.skills || "Not specified"}
      `;

    case "Website Assistance":
      return `
        <strong>Website Name:</strong> ${req.websiteName || "Not specified"}<br>
        <strong>Type of Website:</strong> ${
          req.websiteType || "Not specified"
        }<br>
        <strong>Design Preference:</strong> ${req.designPref || "Not specified"}
      `;

    case "University Applications":
      return `
        <strong>Name:</strong> ${req.fullName || "Not specified"}<br>
        <strong>Degree:</strong> ${req.degree || "Not specified"}<br>
        <strong>University:</strong> ${req.university || "Not specified"}<br>
        <strong>Instructions:</strong> ${req.instructions || "Not specified"}
      `;

    default:
      return `
        <strong>Name:</strong> ${req.fullName || "Not specified"}<br>
        <strong>Job Title:</strong> ${req.jobTitle || "Not specified"}<br>
        <strong>Industry:</strong> ${req.industry || "Not specified"}<br>
        <strong>Instructions:</strong> ${req.instructions || "Not specified"}
      `;
}
}


function formatDate(dateString) {
  // Assumes dateString is in "YYYY-MM-DD HH:mm" or similar
  return dateString.split(" ")[0];
}

function loadRequests(filter = "all") {
  tableBody.innerHTML = "";

  let filteredRequests = serviceRequests;
  if (filter !== "all") {
    filteredRequests = serviceRequests.filter((req) => req.service === filter);
  }

  if (filteredRequests.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">No requests found.</td></tr>`;
    return;
  }

  filteredRequests.forEach((req, index) => {
    let docBtn = "No document";
    if (req.documentData && req.documentName) {
      docBtn = `<button class="download-btn" data-index="${index}">Download</button>`;
    }

    const details = getRequestDetails(req);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${
        req.user && req.user.trim()
          ? req.user
          : req.username && req.username.trim()
          ? req.username
          : "-"
      }</td>
      <td>${req.service || "-"}</td>
      <td>${docBtn}</td>
      <td>${req.requestedAt || "-"}</td>
      <td>${details}</td>
      <td>${req.contact || "-"}</td>
      <td>${req.receivingMethod || "-"}</td>
      <td>${req.paymentMethod || "-"}</td>
    `;
    tableBody.appendChild(row);
  });

  // Download handler
  document.querySelectorAll(".download-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      const req = filteredRequests[idx];
      if (req && req.documentData && req.documentName) {
        const a = document.createElement("a");
        a.href = req.documentData;
        a.download = req.documentName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        alert("⚠️ No file found for this request.");
      }
    });
  });
}

// Initial load
loadRequests();

// Filter by service type
serviceFilter.addEventListener("change", () => {
  loadRequests(serviceFilter.value);
});
