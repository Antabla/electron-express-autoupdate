# electron-express-autoupdate

Una aplicacion simple creada con electron y express, que se actualiza automaticamente cuando detecta un cambio de version en la nube de amazon s3


## Dependencias

Es necesario descargar `Node.exe` y `Node.lib`: [https://nodejs.org/dist/v11.4.0/win-x64/]

Despues de descargar copie los archivos en la raiz del proyecto.

## ALERTA

Al empaquetar la aplicacion con `electron-builder` se presenta un error con express ya que el servidor no arranca automaticamente.
