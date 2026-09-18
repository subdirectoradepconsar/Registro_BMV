var SPREADSHEET_ID = "1M0HCwlNzMsvAQ6xQY3p50TkWAD8sf5YY5Ben4ahnNrs";

function doPost(e) {
  try {
    if (!SPREADSHEET_ID.trim()) throw new Error("Configura SPREADSHEET_ID.");
    if (!e || !e.postData || !e.postData.contents) throw new Error("No se recibieron datos.");
    var data = JSON.parse(e.postData.contents);
    var hoja = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
    hoja.appendRow([new Date(), data.nombreCompleto || "-", data.correo || "-", data.genero || "-", data.anioNacimiento || data.anoNacimiento || data.fechaNacimiento || "-"]);
    return ContentService.createTextOutput(JSON.stringify({status: "success", message: "Asistencia registrada"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: String(error)})).setMimeType(ContentService.MimeType.JSON);
  }
}
