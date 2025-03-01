// Google Apps Script URL
const googleScriptURL = "https://script.google.com/macros/s/AKfycbxthcfcF2Snjd4qe8Q5u-AiVTe0ElB5pKHGjOx4FfHh/dev";

// Function to fetch data from Google Sheets
async function fetchData() {
  try {
    const response = await fetch(googleScriptURL);
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to update the UI with fetched data
function updateUI(data) {
  const currentName = document.getElementById("current-name");
  const currentAccount = document.getElementById("current-account");
  const currentTime = document.getElementById("current-time");
  const dataHistory = document.getElementById("data-history");

  // Clear previous data
  dataHistory.innerHTML = "";

  // Update current scan
  if (data.length > 0) {
    const latestEntry = data[data.length - 1];
    currentName.textContent = latestEntry.name;
    currentAccount.textContent = latestEntry.account;
    currentTime.textContent = latestEntry.time;
  }

  // Populate history table
  data.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.account}</td>
      <td>${entry.time}</td>
    `;
    dataHistory.appendChild(row);
  });
}

// Fetch data every 5 seconds
setInterval(fetchData, 5000);

// Initial fetch
fetchData();