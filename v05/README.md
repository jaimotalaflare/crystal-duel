# Crystal Duel v0.5

El núcleo requiere ambos laterales destruidos. Los ataques, hechizos, Embates y Desborde respetan esta protección. Fatiga y el coste del Despertar de Oscuridad siguen afectando a su propio núcleo para impedir partidas interminables.

Cada lateral perdido entrega un Legado del cristal que permite elegir Cataclismo del santuario (destruye esbirros y runas de ambos jugadores), Doble retorno (hasta dos aliados reanimados en un territorio) o Nuevo destino (devuelve la mano al mazo, baraja y roba esa cantidad más dos, máximo diez). Cada hechizo cuesta 1. Los dos Legados se conservan incluso con la mano llena.

Mazos exactamente de 20, máximo dos copias. El recomendado tiene 16 esbirros, tres hechizos y una runa. Migración de perfiles v0.4 conserva cartas existentes, monedas, trofeos, héroes y amigos, y completa las listas antiguas a veinte. Datos locales al navegador.

Fuego utiliza daño inmediato, Embate, eliminación y hechizos con robo o Desborde. Cristales facetados en SVG/CSS, sin retrato central, con dos haces de energía animados y escudo proporcional a los vínculos vivos. Arrastrar un aliado al enemigo ataca; a una casilla aliada lo traslada por 1 y agota. Mantiene el ataque por toques.

## Comprobaciones
npm test: 108 cartas, mazos, migración, ataques, agotamiento, bloqueo doble, Legados, robo, reanimación, IA, campaña y protocolo privado simulado.

## Multijugador experimental
PeerJS y WebRTC por ID o códigos. Compatible solo con clientes v0.5 por las nuevas reglas y el tamaño de mazo. Sin recompensas de campaña, cuentas autenticadas, TURN propio ni reconexión. No ha sido posible verificar la conexión real desde el navegador de revisión; la señalización sí responde. Una IP sola no conecta dos navegadores web. Licencia MIT de PeerJS incluida.

Comprobado en navegador: ataque por arrastre, traslado con coste y agotamiento, bloqueo tras perder un lateral y exposición tras perder ambos. Mano visible en tamaños de 390 × 720 y 320 × 568. Ajustado el margen superior de cristales para pantallas bajas.

Verificada la recepción del Legado con once cartas en mano, su menú de tres opciones, la previsualización de maná y el lanzamiento de Cataclismo durante una partida contra la IA.
