# Dynamic Kanban Roadmap 📊

This project shows a **Kanban roadmap** that dynamically fetches data from a **Google Sheet**.

## 🚀 Live Demo
Hosted on GitHub Pages:
`https://YOUR_USERNAME.github.io/roadmap-kanban/`

## 🛠 Setup
1. Create a Google Sheet with columns:
   - Category | Task | Owner | Status | Priority | Timeline | Notes
2. Create a Google Apps Script attached to the Sheet:
   ```javascript
   function doGet() {
     var ss = SpreadsheetApp.getActiveSpreadsheet();
     var sheet = ss.getSheetByName("Sheet1"); // tab name
     var data = sheet.getDataRange().getValues();
     var json = [];
     var headers = data[0];
     for (var i = 1; i < data.length; i++) {
       var row = {};
       for (var j = 0; j < headers.length; j++) {
         row[headers[j]] = data[i][j];
       }
       json.push(row);
     }
     return ContentService.createTextOutput(JSON.stringify(json))
       .setMimeType(ContentService.MimeType.JSON);
   }
