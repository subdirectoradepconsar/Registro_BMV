# Registro_BMV

Copia independiente del registro, con los mismos campos y conectada a la hoja Registros BMV.

## Conectar la nueva spreadsheet

1. Crear la nueva hoja. En la primera pestaña usar las columnas: Fecha y hora, Nombre, Correo, Género, Año de nacimiento.
2. Crear un proyecto propio de Apps Script y copiar apps-script/Code.gs.
3. Configurar SPREADSHEET_ID con el ID de la nueva hoja (entre /d/ y /edit en su enlace).
4. Implementar como aplicación web, ejecutándola como propietario y permitiendo el acceso a los usuarios del formulario.
5. Configurar WEBHOOK_URL en index.html con la nueva dirección /exec.
6. Realizar un registro de prueba y comprobar que aparezca en la nueva hoja.

El formulario no envía datos mientras WEBHOOK_URL esté vacío. Apps Script también rechaza registros si falta SPREADSHEET_ID.

## Banner

banner.svg es un espacio provisional de 1600 × 400 px. Reemplazarlo por el banner definitivo y actualizar src en index.html si cambia el nombre o formato. Mantiene la proporción 4:1 y se adapta al ancho del formulario, conservando el diseño actual.

## Publicación

Repositorio: https://github.com/subdirectoradepconsar/Registro_BMV

Página web: https://subdirectoradepconsar.github.io/Registro_BMV/

Los cambios en main se publican mediante GitHub Pages.

## Conexión BMV preparada

Hoja: https://docs.google.com/spreadsheets/d/1M0HCwlNzMsvAQ6xQY3p50TkWAD8sf5YY5Ben4ahnNrs/edit
Proyecto Apps Script: https://script.google.com/home/projects/1AQTQOGxfK-jjFXRBsynJ0ZAHB5BOv_C86RZj16dorN68NJn39T23fJeO/edit
El ID está configurado, el script implementado y WEBHOOK_URL conectado. Se comprobó que el servicio responde HTTP 200 y devuelve un error JSON al recibir datos inválidos, sin agregar filas. Falta verificar un registro real desde el formulario. El banner definitivo está pendiente.

URL de aplicación web: https://script.google.com/macros/s/AKfycbxk1jFqD95ziNBz9ifGkBbQ5RpzUoDfflmmqvP0G2wXAMhaj0xOcVfzW0BXDsZkJkNlLw/exec



