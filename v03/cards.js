export const VERSION='0.3.0';
export const MAGES={
 fire:{name:'Pyra',title:'Guardiana de las Brasas',element:'Fuego',color:'#ff955b',deep:'#893d24',idx:0,desc:'Enciende el carril. Presiona con Quemadura y remata con Desborde.',power:{name:'Chispa viva',text:'Inflige 1 daño. Si el objetivo tiene Quemadura, inflige 2.',fx:'spark',target:'enemyUnit'},awake:'Tus Quemaduras hacen +1. Tu primer golpe a un cristal cada turno hace +2.',heavy:8},
 water:{name:'Neris',title:'Voz de las Mareas',element:'Agua',color:'#6ed9ee',deep:'#285d75',idx:1,desc:'Resiste, congela al rival y recupera tus guardianes con las mareas.',power:{name:'Gota de vida',text:'Cura 2 a un aliado o cristal.',fx:'heal',power:2,target:'ownDamaged'},awake:'Cura 6 al núcleo y reanima un aliado de coste 5 o menor.',heavy:9},
 wind:{name:'Aeral',title:'Custodio del Vendaval',element:'Viento',color:'#a3d59b',deep:'#365f50',idx:2,desc:'Domina el ritmo con Ímpetu, Barrera y ataques que atraviesan la defensa.',power:{name:'Velo del aire',text:'Otorga Barrera 2 a un aliado o cristal.',fx:'shield',power:2,target:'ownUnitCrystal'},awake:'El núcleo gana Barrera 8. Tus nuevas Barreras otorgan +1.',heavy:8},
 light:{name:'Solenne',title:'Heredera del Alba',element:'Luz',color:'#ffdf91',deep:'#8a713c',idx:3,desc:'Fortalece tu formación y llena el tablero de ecos radiantes.',power:{name:'Destello',text:'Un aliado gana +1 ATQ hasta el final de este turno.',fx:'focus',power:1,target:'ownUnit'},awake:'Tu primera invocación de cada turno crea un eco 1/1.',heavy:9},
 dark:{name:'Morvane',title:'Tejedor del Ocaso',element:'Oscuridad',color:'#c6a1f7',deep:'#67438e',idx:4,desc:'Debilita a tus enemigos y convierte el daño en vida para tu núcleo.',power:{name:'Mal de sombra',text:'Un enemigo pierde 1 ATQ durante sus próximos 2 turnos.',fx:'weaken',power:1,target:'enemyUnit'},awake:'Aliados +2 ATQ y hechizos ofensivos +1 daño. Tu núcleo pierde 2 al final del turno.',heavy:8}
};
export const KEYWORDS={guard:'Guardia',rush:'Ímpetu',overflow:'Desborde',lifesteal:'Robo de vida',burnHit:'Quemadura',ward:'Barrera'};
export const RULES={guard:'Impide atacar directamente al cristal de este carril.',rush:'Puede atacar esbirros al entrar. Nunca cristales ese turno.',overflow:'El daño sobrante al derrotar un esbirro golpea su cristal, si está accesible.',lifesteal:'El daño de este esbirro cura tu núcleo.',burnHit:'Al dañar a un esbirro, le aplica Quemadura 1 durante 3 turnos.',ward:'La Barrera absorbe daño antes que la vida y no se puede curar.'};
const u=(name,cost,atk,hp,kw=[],extra={})=>({name,cost,type:'minion',atk,hp,kw,art:cost>=6?'beast':'warden',...extra});
const s=(name,cost,fx,power,target,text,extra={})=>({name,cost,type:'spell',fx,power,target,text,...extra});
const r=(name,cost,effect,text,polarity='good')=>({name,cost,type:'rune',effect,text,polarity});
const lists={
 fire:[
 u('Aprendiz de ascuas',1,2,1),s('Ascua fugaz',1,'damage',1,'enemyUnit','Inflige 1 daño. Si el objetivo arde, inflige 3.',{bonusBurn:2}),
 u('Custodio del rescoldo',2,2,3),s('Lengua de fuego',2,'burn',2,'enemyUnit','Aplica Quemadura 2 durante 3 turnos.'),
 u('Lancero de ceniza',3,3,3,['burnHit']),r('Sello del ariete',3,'overflow','Tus esbirros de este cristal ganan Desborde.'),
 u('Guardián de la fragua',4,3,6,['guard']),s('Lanza volcánica',4,'damage',6,'enemyUnit','Inflige 6 daño a un esbirro.'),r('Corazón de brasa',4,'vigor','Tus esbirros de este cristal ganan +2/+2.'),
 u('Halcón de las brasas',5,5,4,['rush','burnHit']),s('Lluvia de brasas',5,'laneDamage',3,'enemyLane','Inflige 3 daño a ambos esbirros de un carril.'),r('Marca abrasadora',5,'scorch','Al final del turno rival, sus esbirros de este cristal reciben 2 daño.','bad'),
 u('Draco de la fragua',6,6,6,['overflow']),s('Fuego renaciente',6,'damageDraw',6,'enemyUnit','Inflige 6 daño a un esbirro. Roba 1 carta.'),
 u('Señor del rescoldo',7,6,8,['burnHit','guard']),s('Horizonte incandescente',7,'allDamage',3,'none','Inflige 3 daño a todos los esbirros enemigos.'),
 u('Dragón de la caldera',8,7,8,['rush','overflow']),u('Vigía del volcán',9,8,10,['guard','burnHit'],{entry:'laneBurn'}),
 u('Azhur, sol de ceniza',10,9,11,['overflow','burnHit'],{entry:'allDamage',entryPower:2,legend:true})],
 water:[
 u('Aprendiz de la espuma',1,1,3),s('Rocío lunar',1,'heal',3,'ownDamaged','Cura 3 a un aliado o cristal.'),
 u('Escudera del arrecife',2,1,4,['guard']),s('Lanza de escarcha',2,'damageFreeze',2,'enemyUnit','Inflige 2 daño y Congela al objetivo por 1 turno.'),
 u('Vigía de la marea',3,2,5,[],{entry:'healCore',entryPower:2}),r('Sello de savia azul',3,'lifesteal','Tus esbirros de este cristal ganan Robo de vida.'),
 u('Guardiana de perlas',4,3,6,['guard']),s('Marea reparadora',4,'laneHeal',5,'ownLane','Cura 5 a los esbirros y al cristal de un carril.'),r('Corazón del arrecife',4,'bulwark','Tus esbirros de este cristal ganan +4 VIDA.'),
 u('Cantora de las profundidades',5,4,6,['lifesteal']),s('Regreso de la marea',5,'revive',0,'ownEmpty','Reanima tu último aliado caído en una casilla libre.'),r('Marea de quietud',5,'weak','Los esbirros enemigos de este cristal pierden 2 ATQ.','bad'),
 u('Serpiente de nácar',6,5,8,['guard']),s('Invierno de cristal',6,'laneFreeze',3,'enemyLane','Inflige 3 daño a un carril enemigo y Congela sus esbirros por 1 turno.'),
 u('Oráculo del abismo azul',7,5,9,['lifesteal'],{entry:'healCore',entryPower:4}),s('Renacer del océano',7,'allHealDraw',4,'none','Cura 4 a tus esbirros y cristales. Roba 2 cartas.'),
 u('Leviatán del arrecife',8,7,9,['guard']),u('Serpiente de la luna',9,7,11,['lifesteal'],{entry:'healCore',entryPower:5}),
 u('Thalassa, marea eterna',10,8,12,['guard','lifesteal'],{entry:'revive',legend:true})],
 wind:[
 u('Aprendiz del céfiro',1,1,2,['rush']),s('Brisa protectora',1,'shield',2,'ownUnitCrystal','Otorga Barrera 2 a un aliado o cristal.'),
 u('Explorador del dosel',2,2,2,['rush']),s('Ráfaga cortante',2,'damage',3,'enemyUnit','Inflige 3 daño a un esbirro.'),
 u('Arquero del vendaval',3,3,3,['rush']),r('Sello de la tormenta',3,'rush','Tus esbirros de este cristal ganan Ímpetu.'),
 u('Centinela de las cumbres',4,3,5,['guard'],{entry:'selfShield',entryPower:2}),s('Muralla invisible',4,'laneShield',4,'ownLane','Otorga Barrera 4 a los esbirros y al cristal de un carril.'),r('Corazón del ciclón',4,'radiance','Tus esbirros de este cristal ganan +1/+2 e Ímpetu.'),
 u('Jinete de los vientos',5,4,6,['rush','overflow']),s('Atadura del cielo',5,'laneWeaken',3,'enemyLane','Los esbirros de un carril pierden 3 ATQ durante sus próximos 2 turnos.'),r('Niebla del extravío',5,'weak','Los esbirros enemigos de este cristal pierden 2 ATQ.','bad'),
 u('Grifo esmeralda',6,5,7,['rush'],{entry:'selfShield',entryPower:2}),s('Ojo del huracán',6,'damageShield',5,'enemyUnit','Inflige 5 daño a un esbirro. Tu núcleo gana Barrera 4.'),
 u('Custodio de la aguja',7,6,8,['guard','overflow']),s('Vientos de guerra',7,'allShieldDraw',3,'none','Tus esbirros ganan Barrera 3. Roba 2 cartas.'),
 u('Grifo de la aurora',8,7,8,['rush','overflow']),u('Ala de la tempestad',9,8,9,['guard','rush'],{entry:'allShield',entryPower:3}),
 u('Zephir, cielo indomable',10,9,11,['rush','overflow'],{entry:'allShield',entryPower:3,legend:true})],
 light:[
 u('Aprendiz del alba',1,1,3),s('Destello valiente',1,'buff',1,'ownUnit','Un aliado gana +1/+1.'),
 u('Escudera solar',2,2,3),s('Flecha de luz',2,'damage',3,'enemyUnit','Inflige 3 daño a un esbirro.'),
 u('Vigía de la aurora',3,2,4,['guard']),r('Sello del amanecer',3,'radiance','Tus esbirros de este cristal ganan +1/+2.'),
 u('Caballero del sol',4,3,5,['guard']),s('Bendición del coro',4,'buffAll',1,'none','Todos tus esbirros ganan +1/+1.'),r('Corazón radiante',4,'vigor','Tus esbirros de este cristal ganan +2/+2.'),
 u('Portadora del estandarte',5,4,5,[],{entry:'echo'}),s('Reflejo de aurora',5,'clone',0,'ownUnitSpace','Crea un eco 2/2 de un aliado en una casilla libre.'),r('Eclipse dorado',5,'fragile','Los esbirros enemigos de este cristal pierden 1 ATQ y 2 VIDA.','bad'),
 u('Ciervo del santuario',6,5,7,['guard'],{entry:'selfShield',entryPower:2}),s('Consagración',6,'laneBuff',2,'ownLane','Tus esbirros de un carril ganan +2/+2. Su cristal se cura 3.'),
 u('Custodio del primer sol',7,6,8,['guard'],{entry:'echo'}),s('Juramento de luz',7,'allBuffShield',1,'none','Tus esbirros ganan +1/+1 y Barrera 3.'),
 u('Ciervo de las estrellas',8,7,9,['guard']),u('Guardián del sol naciente',9,7,10,['guard','lifesteal'],{entry:'allBuff',entryPower:1}),
 u('Aureon, corona del alba',10,8,11,['guard'],{entry:'allBuff',entryPower:2,legend:true})],
 dark:[
 u('Aprendiz del crepúsculo',1,2,1,['lifesteal']),s('Susurro marchito',1,'weaken',2,'enemyUnit','Un enemigo pierde 2 ATQ durante sus próximos 2 turnos.'),
 u('Centinela del ocaso',2,3,2),s('Toque del vacío',2,'drain',2,'enemyUnit','Inflige 2 daño y cura tu núcleo por el daño infligido.'),
 u('Tejedor de sombras',3,3,4),r('Sello de la penumbra',3,'lifesteal','Tus esbirros de este cristal ganan Robo de vida.'),
 u('Custodio de amatista',4,4,4,['lifesteal']),s('Lanza del ocaso',4,'drain',4,'enemyUnit','Inflige 4 daño y cura tu núcleo por el daño infligido.'),r('Corazón del vacío',4,'rage','Tus esbirros de este cristal ganan +3 ATQ.'),
 u('Vigía de la noche',5,5,5,['guard']),s('Ecos del archivo',5,'draw',3,'none','Roba 3 cartas.'),r('Maldición marchita',5,'fragile','Los esbirros enemigos de este cristal pierden 1 ATQ y 2 VIDA.','bad'),
 u('Gólem de amatista',6,6,6,['lifesteal']),s('Noche envolvente',6,'laneDrain',3,'enemyLane','Inflige 3 daño a los esbirros de un carril. Cura tu núcleo por el daño infligido.'),
 u('Custodio del umbral',7,6,8,['guard','lifesteal']),s('Regreso entre sombras',7,'reviveBuff',2,'ownEmpty','Reanima tu último aliado y le otorga +2/+2.'),
 u('Coloso de la penumbra',8,8,8,['lifesteal']),u('Vigía de la última estrella',9,8,10,['guard','lifesteal']),
 u('Nocthar, corazón estelar',10,9,11,['lifesteal','overflow'],{entry:'laneWeaken',entryPower:3,legend:true})]
};
const entryText={healCore:n=>`Al entrar, cura ${n} al núcleo.`,selfShield:n=>`Al entrar, gana Barrera ${n}.`,echo:()=>`Al entrar, invoca un eco 1/1.`,allShield:n=>`Al entrar, tus esbirros ganan Barrera ${n}.`,allDamage:n=>`Al entrar, inflige ${n} a todos los enemigos.`,allBuff:n=>`Al entrar, tus otros esbirros ganan +${n}/+${n}.`,revive:()=>`Al entrar, reanima un aliado de coste 5 o menor.`,laneBurn:()=>`Al entrar, aplica Quemadura 2 a su carril enemigo.`,laneWeaken:n=>`Al entrar, los enemigos de su carril pierden ${n} ATQ por 2 turnos.`};
export const CATALOG=Object.fromEntries(Object.entries(lists).map(([element,cards])=>[element,cards.map((c,i)=>({...c,id:`${element}-${i}`,element,kind:c.type==='minion'?(c.cost>=8?'monster':'minion'):c.type,text:c.text||[...(c.kw||[]).map(k=>KEYWORDS[k]),c.entry&&entryText[c.entry](c.entryPower||0)].filter(Boolean).join('. ')||'Sin habilidad. Un aliado para sostener el carril.',seal:i%8}))]));
export function deckList(element,heavy=MAGES[element].heavy){return CATALOG[element].flatMap(c=>{const siblings=CATALOG[element].filter(x=>x.cost===c.cost),i=siblings.indexOf(c);let n=c.cost<=4?2:c.cost===5?(i===2?1:2):c.cost===6?(i===0?2:1):c.cost===7?1:c.cost===10||c.cost===heavy?1:0;return Array.from({length:n},()=>({...c,kw:[...(c.kw||[])]}))});}
export function curve(element,heavy){const d=deckList(element,heavy);return Array.from({length:10},(_,i)=>d.filter(c=>c.cost===i+1).length)}
