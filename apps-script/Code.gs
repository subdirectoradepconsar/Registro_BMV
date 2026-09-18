var SPREADSHEET_ID = "1M0HCwlNzMsvAQ6xQY3p50TkWAD8sf5YY5Ben4ahnNrs";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    if (!SPREADSHEET_ID.trim()) throw new Error("Configura SPREADSHEET_ID.");
    if (!e || !e.postData || !e.postData.contents) throw new Error("No se recibieron datos.");
    var data = JSON.parse(e.postData.contents);
    var hoja = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
    if (data.accion === "validar") {
      var idTicket = (data.id || "").toString().trim();
      if (!idTicket) return respuestaJSON({ status: "error", message: "ID no proporcionado" });
      var valores = hoja.getDataRange().getValues();
      var filaEncontrada = -1;
      var nombreAsistente = "";
      var estatusActual = "";
      var horaIngresoPrevia = "";
      for (var i = 1; i < valores.length; i++) {
        if (valores[i][5] && valores[i][5].toString().trim() === idTicket) {
          filaEncontrada = i + 1;
          nombreAsistente = valores[i][1];
          estatusActual = valores[i][6] ? valores[i][6].toString().trim().toLowerCase() : "";
          horaIngresoPrevia = valores[i][7];
          break;
        }
      }
      if (filaEncontrada === -1) return respuestaJSON({ status: "DENEGADO", titulo: "NO ENCONTRADO", message: "El código no existe en la lista de registros." });
      if (estatusActual === "ingresado") return respuestaJSON({ status: "REPETIDO", titulo: "CÓDIGO YA UTILIZADO", nombre: nombreAsistente, message: "Esta persona ya ingresó a las " + horaIngresoPrevia });
      var tz = Session.getScriptTimeZone();
      var horaIngreso = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd HH:mm:ss");
      hoja.getRange(filaEncontrada, 7).setValue("Ingresado");
      hoja.getRange(filaEncontrada, 8).setValue(horaIngreso);
      return respuestaJSON({ status: "EXITO", titulo: "ACCESO CONCEDIDO", nombre: nombreAsistente, message: "Bienvenido/a" });
    }
    var totalFilas = hoja.getLastRow();
    var nuevoFolio = "BMV-" + Utilities.formatString("%03d", totalFilas);
    var tz = Session.getScriptTimeZone();
    var fechaRegistro = Utilities.formatDate(new Date(), tz, "dd/MM/yyyy HH:mm:ss");
    hoja.appendRow([fechaRegistro, data.nombreCompleto || "-", data.correo || "-", data.genero || "-", data.anioNacimiento || data.anoNacimiento || data.fechaNacimiento || "-", nuevoFolio, "Pendiente", ""]);
    return respuestaJSON({ status: "success", message: "Asistencia registrada", folio: nuevoFolio });
  } catch (error) {
    return respuestaJSON({ status: "error", message: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function respuestaJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
