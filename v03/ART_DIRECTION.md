# Crystal Duel — Santuario del Umbral, v0.3

Arte original generado con ImageGen en modo generación, sin imágenes de referencia. Los PNG maestros se convirtieron a WebP manteniendo su geometría y transparencia.

## Dirección de los prompts
- `assets/arena.webp`: santuario élfico de piedra en un bosque, vista elevada de diorama, río turquesa horizontal, tres puentes dorados y tres carriles, iluminación mágica, centro despejado, sin interfaz ni texto.
- `assets/mages.webp`: atlas de cinco retratos en columnas iguales: maga pelirroja de fuego, hechicera de agua, sabio de viento, sacerdotisa solar de piel oscura y mago violeta de sombras; fantasía épica original.
- `assets/creatures.webp`: atlas transparente de cinco columnas y dos filas, miniaturas con volumen; guardianes de fuego, agua, viento, luz y sombra arriba; dragón, serpiente marina, grifo, ciervo luminoso y gólem de amatista abajo.

Los sprites tienen aspecto 3D, con sombras y pedestales en perspectiva; no son modelos geométricos 3D. Diez ilustraciones base se combinan con marcos, sellos y colores elementales. Cristales e iconos están dibujados en SVG. Los efectos sonoros son síntesis original Web Audio.

## Cambios jugables
95 cartas (19 por elemento), costes 1–10. Mazos de 30: 4/4/4/6/5/3/2 cartas de coste 1/2/3/4/5/6/7, un finalizador de 8 o 9 y una carta de 10. Poder de mago: 1 maná, una vez por turno. Dos casillas lado a lado por cristal. Runas rosas, esbirros burdeos, monstruos marfil y hechizos azules.

## Validación
`npm test`: reglas, cartas, objetivos, costes, poderes, estados, auras, combate y partidas completas de IA.
