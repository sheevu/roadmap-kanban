// Replace this with your Web App URL from Apps Script
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxEDTF8iaYtOKiSbDz2h6lxTmlqtjYcTGd-7tEcJ6XLqO-FYOXAowLSY-7LSxVDH4QGFw/exec";

fetch(WEBAPP_URL)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("kanban");
    container.innerHTML = "";
    const categories = {};

    // Group tasks by category
    data.forEach(row => {
      if (!categories[row.Category]) categories[row.Category] = [];
      categories[row.Category].push(row);
    });

    // Render each category as a column
    for (const cat in categories) {
      const col = document.createElement("div");
      col.className = "column " + cat.replace(/[^a-zA-Z]/g,"");
      col.innerHTML = `<h2>${cat}</h2>`;

      categories[cat].forEach(item => {
        const task = document.createElement("div");
        task.className = "task";
        task.innerHTML = `
          <strong>${item.Task}</strong><br>
          👤 ${item.Owner} <br>
          📌 ${item.Status} | ${item.Priority}<br>
          ⏰ ${item.Timeline}<br>
          <em>${item.Notes}</em>
        `;
        col.appendChild(task);
      });

      container.appendChild(col);
    }
  })
  .catch(err => console.error("Error fetching data:", err));
