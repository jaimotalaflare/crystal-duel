# Crystal Duel v0.4

Campaña de 0–10.000 trofeos. Cuatro paneles: tienda, arena, colección y amigos. El arte del santuario, los retratos y las criaturas originales se conserva desde v0.3; iconos, cofres, cristales y controles se dibujan en SVG/CSS.

## Reglas
Mazo de 15 cartas, hasta dos copias, solo su elemento y neutrales. La lista recomendada lleva 13 esbirros, un hechizo y una runa. Estadísticas base cercanas a 2 × maná; las habilidades consumen parte del presupuesto. Mover cuesta 1, agota y se bloquea después de atacar. Nuevas sinergias: Blindaje ofensivo, Descarga del blindaje, Marea creciente y Marea de retorno.

## Progreso
El navegador guarda monedas, gemas, trofeos, héroes, colección, mazos y lista de amigos en localStorage. No hay cuenta ni sincronización entre dispositivos. +30 trofeos por victoria; +15 por derrota. Los jefes de 300/600/900/1.200 desbloquean Agua/Viento/Luz/Oscuridad. Desafíos adicionales en 2.500/5.000/7.500/10.000. Recompensas reclamables una vez; cofres con contenido visible, recursos ganados jugando y sin compras con dinero real.

## Duelo privado
Los dos jugadores pulsan Conectarme y comparten sus IDs. PeerJS 1.5.5 (licencia MIT incluida) usa el servidor público de señalización; la partida viaja en un canal WebRTC. El anfitrión valida las acciones y envía el tablero desde la perspectiva del invitado, ocultando la mano y el orden del mazo contrarios. No otorga progreso de campaña. Depende del servicio público y de la conectividad WebRTC de ambas redes; no incluye servidor TURN propio ni reconexión de partida.

La opción de códigos intercambia offer/answer WebRTC directamente, con candidatos de la red local y sin STUN externo. Requiere una red que permita comunicar los dispositivos. Una IP por sí sola no basta para conectar dos navegadores de una página estática. El campo lo explica y dirige al intercambio de códigos; no simula una conexión por IP.

El anfitrión sigue siendo un participante de confianza en este prototipo amistoso. Los IDs no son cuentas autenticadas. No hay cámara, micrófono ni chat libre. Las frases rápidas usan la voz de síntesis disponible en el dispositivo; no son grabaciones propias de personajes.

## Validación
`node tests.mjs`: mazos/balance, movimientos y agotamiento, sinergias, 108 cartas, campaña/jefes, recompensas, edición, persistencia, validación de comandos y ocultamiento del rival, y partidas completas.

Fuentes técnicas: https://peerjs.com/client/getting-started y la API estándar RTCPeerConnection.
