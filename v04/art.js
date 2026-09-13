import {ELEMENTS as MAGES} from './cards.js?v=0401';
const paths={
 fire:'M12 2C7 8 18 8 12 14c-2-2-4-3-5-6-5 5-4 13 5 14 9-1 10-10 5-15 1 6-4 6-5-5Z',
 water:'M12 2C9 7 4 11 4 15a8 8 0 0 0 16 0c0-4-5-8-8-13ZM8 15c0 3 2 4 4 4',
 wind:'M3 7h13c6 0 5-7 1-5M2 12h18c4 0 4 5 0 5M5 17h7c4 0 4 5 1 5',
 light:'M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2',
 dark:'M18 3A10 10 0 1 0 21 17 9 9 0 0 1 18 3ZM4 5l2 1 1 2 1-2 2-1-2-1-1-2-1 2Z',
 attack:'m5 19 13-13 3-4-4 2L4 17m-2-3 8 8M2 22l3-3',
 health:'M12 21 3 12C-3 4 7-1 12 6 17-1 27 4 21 12Z',
 shield:'m12 2 9 4-1 8c-1 4-5 7-8 9-3-2-7-5-8-9L3 6Z',
 rush:'M14 1 4 13h7l-1 10L21 9h-8Z',
 overflow:'M3 19 16 6M7 5h11v11M3 12V4h3m14 12v5h-6',
 lifesteal:'M12 21 3 12C-3 4 7-1 12 6 17-1 27 4 21 12ZM7 12h10m-5-5v10',
 book:'M12 4v17M2 3c4-2 7-1 10 1 3-2 6-3 10-1v16c-4-2-7-1-10 2-3-3-6-4-10-2Z',
 rune:'m12 2 8 10-8 10-8-10Zm0 4v12m-5-6h10',
 mana:'m12 2 8 7-3 12H7L4 9Zm-8 7h16M12 2l-3 7 3 12 3-12Z',
 sound:'M3 9h5l6-5v16l-6-5H3Zm14-2c5 3 5 7 0 10m2-13c8 5 8 11 0 16',
 mute:'M3 9h5l6-5v16l-6-5H3Zm14 0 5 6m0-6-5 6',
 close:'m5 5 14 14M19 5 5 19',info:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 7v7m0-11v1',
 move:'m3 12 4-4m-4 4 4 4m-4-4h18m0 0-4-4m4 4-4 4',
 freeze:'M12 1v22M2 6l20 12M2 18 22 6M8 3l4 4 4-4M8 21l4-4 4 4',
 spark:'m12 1 3 7 8 4-8 3-3 8-4-8-7-3 7-4Z',
 eye:'M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Zm11-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z'
};
export function icon(name,cls=''){return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[name]||paths.spark}"/></svg>`}
export const runeColors={vigor:'#f191c4',overflow:'#ffb777',lifesteal:'#c5a1fb',rush:'#b0f2ca',bulwark:'#80dceb',weak:'#afa2eb',radiance:'#ffe29a',rage:'#ff8b87',fragile:'#e295e0',scorch:'#ffa674'};
const runeIcon={vigor:'health',overflow:'overflow',lifesteal:'lifesteal',rush:'wind',bulwark:'shield',weak:'dark',radiance:'light',rage:'attack',fragile:'rune',scorch:'fire'};
export function portrait(element,extra=''){return `<div class="portrait ${extra}" style="--portrait-x:${MAGES[element].idx*25}%" role="img" aria-label="${MAGES[element].name}"></div>`}
export function figure(c,extra=''){return `<div class="figure ${extra} ${c.art==='beast'?'beast':''} ${c.element==='neutral'?'neutral-figure':''}" style="--sprite-x:${MAGES[c.element].idx*25}%;--sprite-y:${c.art==='beast'?100:0}%;--seal:${c.seal||0}" aria-hidden="true"></div>`}
export function prism(color,small=false){return `<svg class="prism ${small?'small':''}" viewBox="0 0 90 102" aria-hidden="true" style="color:${color}"><ellipse cx="45" cy="89" rx="30" ry="9" fill="#010910" opacity=".65"/><path d="m10 82 35-10 35 10v9l-35 10-35-10Z" fill="#354448" stroke="#b1a17c"/><path d="m10 82 35 10 35-10-35-10Z" fill="#758080"/><path d="M45 3 68 27 65 64 45 84 25 64 22 27Z" fill="currentColor" stroke="#fff" stroke-opacity=".75"/><path d="m45 3-5 33-18-9Z" fill="#fff" opacity=".62"/><path d="m45 3 23 24-28 9Z" fill="#fff" opacity=".22"/><path d="m22 27 18 9 5 48-20-20Z" fill="#112240" opacity=".55"/><path d="m68 27-28 9 5 48 20-20Z" fill="#020b20" opacity=".25"/><path d="m45 3-5 33 5 51M22 27l18 6 28-6" fill="none" stroke="#fff" opacity=".7"/><path d="m49 16 9 10-2 13" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/><ellipse cx="45" cy="87" rx="15" ry="3" fill="currentColor" opacity=".5"/></svg>`}
export function runestone(c,extra=''){const col=runeColors[c.effect]||MAGES[c.element].color;return `<div class="runestone ${extra}" style="--rune:${col}"><span class="rune-halo"></span><span class="rune-gem">${icon(runeIcon[c.effect]||'rune')}</span></div>`}
export function spellArt(c){const sign=/heal|revive/i.test(c.fx)?'health':/shield/i.test(c.fx)?'shield':/draw/i.test(c.fx)?'book':/freeze/i.test(c.fx)?'freeze':/buff|focus/i.test(c.fx)?'light':/weaken/i.test(c.fx)?'dark':/drain/i.test(c.fx)?'lifesteal':c.element;return `<div class="spell-art seal-${c.seal%4}" style="--spell:${MAGES[c.element].color}"><span class="spell-circle"></span><span class="spell-orbit"></span>${icon(sign)}</div>`}
export const kindNames={minion:'Esbirro',monster:'Monstruo',rune:'Runa',spell:'Hechizo'};
export function cardMarkup(c,{large=false,count=0}={}){return `<div class="card-frame kind-${c.kind} ${large?'large':''} ${c.legend?'legendary':''}" style="--element:${MAGES[c.element].color}"><div class="card-corner"></div><span class="cost-gem">${c.cost}</span><span class="element-seal">${icon(c.element)}</span><div class="card-illustration">${c.type==='minion'?figure(c):c.type==='rune'?runestone(c):spellArt(c)}</div><div class="card-title">${c.name}</div><div class="card-type">${kindNames[c.kind]}<span> · ${MAGES[c.element].element}</span></div><div class="card-description">${c.text}</div><div class="card-bottom">${c.type==='minion'?`<b class="atk">${icon('attack')}${c.atk}</b><span>${c.legend?'✦':'◆'}</span><b class="hp">${icon('health')}${c.hp}</b>`:`<span class="card-ornament">— ◇ —</span>`}</div>${count?`<span class="copy-count">×${count}</span>`:''}</div>`}
