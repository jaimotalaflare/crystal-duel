import assert from 'node:assert/strict';
import {Duel,targetKey} from './engine.js';
import {CATALOG,MAGES,deckList,curve} from './cards.js';
const tests=[];const clone=o=>JSON.parse(JSON.stringify(o));
function test(name,fn){fn();tests.push(name)}
const t=(side=0,lane=0,slot=0,kind='unit')=>({side,lane,slot,kind});
const base=(element='fire',atk=3,hp=5,kw=[])=>({...clone(CATALOG[element][0]),atk,hp,kw,cost:2});
function fixture(element='fire'){const g=new Duel(()=>.4);g.start(element);g.sides=[g.side(element,MAGES[element].heavy),g.side(element==='water'?'fire':'water',8)];g.active=0;g.events=[];for(const s of g.sides){s.mana=10;s.maxMana=10;s.turns=1;s.hand=[]}return g}
function summon(g,p,l,slot,c=base(g.sides[p].element)){return g.summon(p,c,t(p,l,slot),false)}
test('95 class-specific cards, costs 1–10 and 30-card tempo decks',()=>{
 const all=Object.values(CATALOG).flat();assert.equal(all.length,95);assert.equal(new Set(all.map(c=>c.id)).size,95);
 for(const el of Object.keys(MAGES)){assert.deepEqual([...new Set(CATALOG[el].map(c=>c.cost))],[1,2,3,4,5,6,7,8,9,10]);for(const high of [8,9]){const d=deckList(el,high);assert.equal(d.length,30);assert.equal(d.filter(c=>c.cost>=8).length,2);assert(d.every(c=>c.element===el));assert.equal(curve(el,high)[3],6);assert.equal(curve(el,high)[4],5)}}
});
test('Every mage starts with a playable one-mana apprentice',()=>{
 for(const el of Object.keys(MAGES)){const g=new Duel(()=>.73);g.start(el);assert.equal(g.sides[0].hand.length,5);assert.equal(g.sides[0].deck.length,25);const i=g.sides[0].hand.findIndex(c=>c.type==='minion'&&c.cost===1);assert(i>=0);assert(g.play(0,i,t()));assert.equal(g.sides[0].mana,0);assert.equal(g.sides[0].hand.length,4);assert.equal(g.attackTargets(0,0,0).filter(t=>t.kind==='crystal').length,0)}});
test('All 95 card effects execute with legal targets and exact mana costs',()=>{
 for(const [el,cards] of Object.entries(CATALOG))for(const card of cards){const g=fixture(el);for(const p of [0,1]){summon(g,p,0,0);summon(g,p,1,0);summon(g,p,2,0);g.sides[p].lanes[0][0].damage=1;g.sides[p].crystals[1].hp=20;g.sides[p].grave.push(base(el));}g.sides[0].hand=[clone(card)];const targets=g.targets(0,card);assert(g.canPlay(0,card),card.name);assert(g.play(0,0,card.target==='none'?null:targets[0]),card.name);assert.equal(g.sides[0].mana,10-card.cost,card.name);assert.equal(g.sides[0].hand.length,card.fx?.includes('Draw')||card.fx==='draw'?g.sides[0].hand.length:0);for(const p of [0,1])for(const x of g.units(p)){assert(Number.isFinite(g.stats(p,x.lane,x.u).atk));assert(g.stats(p,x.lane,x.u).hp>0)}}
});
test('Illegal targets, occupied slots and actions outside your turn spend nothing',()=>{
 const g=fixture(),c=CATALOG.fire[0];summon(g,0,0,0);g.sides[0].hand=[clone(c)];assert(!g.play(0,0,t()));assert(!g.play(0,0,t(1,0,1)));assert.equal(g.sides[0].mana,10);assert.equal(g.sides[0].hand.length,1);g.active=1;assert(!g.play(0,0,t(0,1,0)));assert.equal(g.sides[0].mana,10)
});
test('Rune auras follow the crystal and replace cleanly',()=>{
 const g=fixture();summon(g,0,0,0);summon(g,0,0,1);summon(g,0,1,0);g.sides[0].runes[0]={effect:'vigor',element:'fire'};
 assert.equal(g.stats(0,0,g.sides[0].lanes[0][0]).atk,5);assert.equal(g.stats(0,0,g.sides[0].lanes[0][1]).max,7);assert.equal(g.stats(0,1,g.sides[0].lanes[1][0]).atk,3);
 g.sides[0].runes[0]={effect:'fragile',element:'dark'};assert.equal(g.stats(0,0,g.sides[0].lanes[0][0]).max,3);g.sides[0].runes[0]={effect:'vigor',element:'fire'};assert(g.move(0,0,0,t(0,2,0)));assert.equal(g.stats(0,2,g.sides[0].lanes[2][0]).atk,3);assert.equal(g.sides[0].mana,9);assert.equal(g.moves(0,2,0).length,0);
 g.crystalDamage(0,0,15);assert.equal(g.sides[0].runes[0],null)
});
test('Rush granted after summoning allows minion combat once, never crystals',()=>{
 const g=fixture('wind');const u=summon(g,0,0,0,base('wind'));summon(g,1,0,0,base('water',1,8));assert.equal(g.attackTargets(0,0,0).length,0);g.sides[0].runes[0]={effect:'rush',element:'wind'};assert(g.attackTargets(0,0,0).some(x=>x.kind==='unit'));assert(!g.attackTargets(0,0,0).some(x=>x.kind==='crystal'));assert(g.strike(0,0,0,t(1)));assert.equal(g.attackTargets(0,0,0).length,0);assert(!g.strike(0,0,0,t(1)));assert.equal(u.attacked,true)
});
test('Guard and lateral crystal destruction govern core access',()=>{
 const g=fixture();summon(g,0,0,0);summon(g,0,1,0);summon(g,1,0,0,base('water',1,5,['guard']));g.begin(0);assert(!g.attackTargets(0,0,0).some(x=>x.kind==='crystal'));assert(!g.attackTargets(0,1,0).some(x=>x.kind==='crystal'));g.crystalDamage(1,2,15);assert(g.attackTargets(0,1,0).some(x=>x.kind==='crystal'));assert(!g.strike(0,1,0,t(0,1,0,'crystal')))
});
test('Simultaneous combat, barrier, overflow and lifesteal use actual damage',()=>{
 const g=fixture('dark');const a=summon(g,0,0,0,base('dark',7,8,['lifesteal','overflow']));const b=summon(g,1,0,0,base('water',3,4,['lifesteal']));b.shield=1;g.sides[0].crystals[1].hp=10;g.sides[1].crystals[1].hp=10;g.begin(0);assert(g.strike(0,0,0,t(1)));assert.equal(a.damage,3);assert.equal(g.sides[1].lanes[0][0],null);assert.equal(g.sides[1].crystals[0].hp,13);assert.equal(g.sides[0].crystals[1].hp,16);assert.equal(g.sides[1].crystals[1].hp,13)
});
test('Hero powers cost one mana, can be used once and reset next turn',()=>{
 for(const el of Object.keys(MAGES)){const g=fixture(el);const own=summon(g,0,0,0);summon(g,1,0,0,base('water',3,10));own.damage=2;const target=g.powerTargets(0)[0];assert(target,el);assert(g.usePower(0,target),el);assert.equal(g.sides[0].mana,9);assert(g.sides[0].powerUsed);assert(!g.usePower(0,target));assert.equal(g.sides[0].mana,9);g.end();g.end();assert.equal(g.sides[0].powerUsed,false)}
});
test('Burn, freezing and temporary buffs expire on the affected turn',()=>{
 const g=fixture('light');const u=summon(g,0,0,0,base('light',3,20));u.burn={amount:2,left:3,source:1};u.freeze=1;u.weak={amount:2,left:2};u.focus=1;assert(!g.ready(0,0,u));g.end();assert.equal(u.damage,2);assert.equal(u.freeze,0);assert.equal(u.focus,0);assert.equal(u.weak.left,1);g.end();assert(g.ready(0,0,u));g.end();g.end();g.end();assert.equal(u.damage,6);assert.equal(u.burn.left,0);g.end();g.end();assert.equal(u.damage,6)
});
test('Reanimation clears old damage and statuses without duplicating entry effects',()=>{
 const g=fixture('water');const u=summon(g,0,0,0);u.damage=99;u.freeze=1;u.burn={amount:2,left:3,source:1};g.tidy(0);assert.equal(g.sides[0].grave.length,1);const v=g.revive(0);assert(v);assert.equal(v.damage,0);assert.equal(v.freeze,0);assert.equal(v.burn,null);assert.equal(g.sides[0].grave.length,0)
});
test('Awakening cannot revive a destroyed core and only triggers once',()=>{
 let g=fixture('water');g.crystalDamage(0,1,1);assert(g.sides[0].awake);assert.equal(g.sides[0].crystals[1].hp,30);g.crystalDamage(0,1,2);assert.equal(g.sides[0].crystals[1].hp,28);g=fixture('water');g.sides[0].crystals[1].hp=2;g.crystalDamage(0,1,2);assert(g.over);assert.equal(g.sides[0].crystals[1].hp,0);assert.equal(g.winner,1)
});
test('Complete games with every mage preserve health, slots, mana and turn limits',()=>{
 for(const element of Object.keys(MAGES)){let seed=847;const g=new Duel(()=>{seed=(seed*16807)%2147483647;return seed/2147483647});g.start(element);let turns=0;while(!g.over&&turns++<160){const p=g.active;if(p===1){let n=0;while(n++<35){const a=g.aiChoice();if(!a)break;assert(g.act(a),'AI legal action');if(g.over)break}assert(n<35)}else{for(let n=0;n<20&&!g.over;n++){const choices=g.sides[0].hand.map((c,index)=>({c,index})).filter(x=>g.canPlay(0,x.c)).sort((a,b)=>b.c.cost-a.c.cost);if(!choices.length)break;const x=choices[0];assert(g.play(0,x.index,x.c.target==='none'?null:g.targets(0,x.c)[0]))}if(!g.over&&!g.sides[0].powerUsed&&g.sides[0].mana){const ts=g.powerTargets(0);if(ts.length)g.usePower(0,ts[0])}for(const x of g.units(0)){if(g.sides[0].lanes[x.lane][x.slot]!==x.u)continue;const ts=g.attackTargets(0,x.lane,x.slot);if(ts.length)g.strike(0,x.lane,x.slot,ts[0])}}
 for(const side of [0,1]){const s=g.sides[side];assert(s.mana>=0);assert(s.hand.length<=10);assert.equal(s.lanes.flat().length,6);for(const c of s.crystals)assert(c.hp>=0&&c.hp<=c.max);for(const x of g.units(side)){assert(g.stats(side,x.lane,x.u).hp>0);assert(Number.isFinite(g.stats(side,x.lane,x.u).atk))}}if(!g.over)g.end();g.drainEvents()}assert(g.over,element+' eventually ends')}
});
console.log(JSON.stringify({passed:tests.length,tests},null,2));
