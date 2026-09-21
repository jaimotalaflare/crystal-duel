# Wild Wizards v0.6

Juego móvil de cartas y magia. Conserva la campaña y las partidas privadas de Crystal Duel; el enlace y el guardado del navegador siguen siendo compatibles.

## Esta versión
- Mazo arriba y colección disponible abajo, en una sola pantalla. Contadores de copias, orden por tipo/nombre, arrastre de una copia y selección por toques. Con el mazo lleno, suelta sobre una carta para intercambiar una copia.
- 60 ilustraciones individuales con aspecto de miniatura 3D para los 60 esbirros de las cinco clases y los neutrales. Son sprites renderizados, no mallas 3D interactivas.
- Retratos, nombre, maná y reloj en barras compactas. Mano en abanico, carta ampliada al seleccionar y revelación pública de cada carta jugada durante unos dos segundos.
- Doble toque en esbirros y runas de cualquier jugador para inspeccionarlos. El arrastre para atacar o trasladar sigue disponible.
- Un esbirro recién invocado o reanimado no se traslada hasta el siguiente turno. Ímpetu conserva su excepción de atacar esbirros al entrar; no permite traslado ni ataque a cristales ese turno.
- Cada turno dura 60 segundos. Las animaciones automáticas pausan el reloj; las vistas de detalles y el menú no lo pausan. Al vencer el plazo el turno termina, incluso si quedaba una selección pendiente.
- Se mantienen 20 cartas, máximo dos copias. Robar la última carta no termina el duelo. Cada intento de robo con el mazo vacío produce Fatiga creciente de 1, 2, 3… sobre el propio nexo, incluso si está protegido. El duelo termina al destruir un nexo: todavía puedes usar tus cartas y esbirros para remontar.

## Reglas conservadas
El nexo rival requiere destruir ambos cristales laterales. Cada lateral perdido entrega un Legado: limpiar esbirros y runas, reanimar hasta dos aliados de un territorio o cambiar la mano y robar dos más. Trasladar cuesta 1 maná, una vez por turno, impide atacar y no se permite después de atacar.

## Comprobaciones
`npm test`: reglas de las 108 cartas, mazos, migración, campaña, IA, bloqueo de ambos cristales, Legados, Fatiga, agotamiento al invocar, reloj, transferencias de copias y mensajes privados sin revelar cartas ocultas. Transporte de red simulado. La conexión entre dos celulares reales sigue sin verificarse en este entorno.

## Multijugador experimental
Ambos jugadores deben cargar v0.6. El anfitrión valida acciones y controla el reloj. Protocolo 6 con sincronización de tiempo restante y revelación pública de cartas. PeerJS/WebRTC mediante ID o intercambio de códigos de red local; una IP sola no conecta dos navegadores. Se conserva el ID anterior para no perder amigos. No hay servidor TURN propio ni reconexión. PeerJS incluye licencia MIT.

## Desarrollo
Servir esta carpeta como `/v06/`, conservando los recursos compartidos de `/v03/assets/`. `qa.html` permite revisar tamaños 390×720, 360×640 y 320×568. Los archivos de `release/` se publican en la raíz después de comprobar la versión.
