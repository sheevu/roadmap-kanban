const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxEDTF8iaYtOKiSbDz2h6lxTmlqtjYcTGd-7tEcJ6XLqO-FYOXAowLSY-7LSxVDH4QGFw/exec";

// JSONP loader
function renderKanban(data){
  const container = document.getElementById("kanban");
  container.innerHTML = "";
  const categories = {};
  data.forEach(r=>{
    const cat = (r.Category||"Uncategorized").toString().trim();
    (categories[cat] ||= []).push(r);
  });
  for (const cat in categories){
    const col = document.createElement("div");
    col.className = "column " + cat.replace(/[^a-zA-Z]/g,"");
    col.innerHTML = `<h2>${cat}</h2>`;
    categories[cat].forEach(item=>{
      const task = document.createElement("div");
      task.className = "task";
      task.innerHTML = `
        <strong>${item.Task||""}</strong><br>
        👤 ${item.Owner||"-"}<br>
        📌 ${item.Status||"Pending"} | ${item.Priority||""}<br>
        ⏰ ${item.Timeline||""}<br>
        <em>${item.Notes||""}</em>`;
      col.appendChild(task);
    });
    container.appendChild(col);
  }
}

const s = document.createElement("script");
s.src = WEBAPP_URL + "?callback=renderKanban"; // JSONP call
document.body.appendChild(s);
