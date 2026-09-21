import assert from 'node:assert/strict';
import {Duel} from './engine.js';
import {TurnClock,TURN_MS} from './clock.js';
import {CATALOG,ALL_CARDS} from './cards.js';
import {spriteFrame} from './art.js';
import {freshProfile,transferCard,purchase,validDeck} from './progress.js';
import {guestView,validView} from './network.js';
const unit=(side=0,lane=0,slot=0)=>({side,lane,slot,kind:'unit'});
const tests=[];const test=(name,run)=>{run();tests.push(name)};
test('Summoning, rush, echoes and revival cannot bypass movement sickness',()=>{
 const d=new Duel(()=>.4);d.start('fire');d.sides[0].mana=10;
 const u=d.summon(0,CATALOG.fire[0],unit(),false);
 assert.equal(d.moves(0,0,0).length,0);assert.equal(d.attackTargets(0,0,0).length,0);
 u.kw.push('rush');d.summon(1,CATALOG.water[0],unit(1),false);
 assert(d.attackTargets(0,0,0).length>0);assert.equal(d.moves(0,0,0).length,0);
 assert(!d.move(0,0,0,unit(0,2)));assert.equal(d.sides[0].mana,10);
 d.echo(0,0,u);assert.equal(d.moves(0,0,1).length,0);
 d.sides[0].grave=[CATALOG.fire[2]];d.revive(0,99,unit(0,2));assert.equal(d.moves(0,2,0).length,0);
 d.end();d.end();assert(d.moves(0,0,0).length>0);
});
test('A 60-second deadline resets, pauses only explicitly, and synchronizes relatively',()=>{
 let time=1000;const clock=new TurnClock(()=>time);clock.start();assert.equal(clock.remaining(),TURN_MS);
 time+=59999;assert(!clock.expired());clock.pause();time+=7000;assert.equal(clock.remaining(),1);
 clock.resume();time++;assert(clock.expired());clock.start();assert.equal(clock.remaining(),60000);
 clock.sync(23000,true);time+=5000;assert.equal(clock.remaining(),23000);assert(!clock.expired());
 clock.sync(23000);time+=23000;assert(clock.expired());
 const d=new Duel(()=>.4,()=>time);d.start('fire');time+=60000;assert(d.expireTurn());
 assert.equal(d.active,1);assert.equal(d.clock.remaining(),60000);assert(!d.expireTurn());
 assert.equal(d.drainEvents().filter(e=>e.type==='timeout').length,1);
});
test('Deck transfers and full-deck swaps conserve owned cards and copy limits',()=>{
 const p=freshProfile();purchase(p,'welcome');const inventory=JSON.stringify(p.owned),old=p.decks.fire[0];
 assert(!transferCard(p,'neutral-0','deck'));assert(transferCard(p,'neutral-0','deck',old));
 assert(validDeck(p));assert.equal(p.decks.fire.length,20);assert.equal(p.decks.fire.filter(id=>id==='neutral-0').length,1);
 assert(transferCard(p,'neutral-0','collection'));assert.equal(p.decks.fire.length,19);
 assert(transferCard(p,'neutral-0','deck'));assert(transferCard(p,'neutral-0','deck',old));
 assert.equal(p.decks.fire.filter(id=>id==='neutral-0').length,2);
 assert(!transferCard(p,'neutral-0','deck',p.decks.fire[2]));assert(!transferCard(p,'water-0','deck',old));
 assert.equal(JSON.stringify(p.owned),inventory);assert(validDeck(p));
});
test('Both players receive only the played card, with clock and perspective intact',()=>{
 const d=new Duel(()=>.4);d.start('fire');d.drainEvents();d.sides[0].hand=[CATALOG.fire[0],CATALOG.fire[18]];
 d.sides[0].mana=10;assert(d.play(0,0,unit()));d.clock.pause();
 const v=guestView(d,d.drainEvents()),ev=v.events.find(e=>e.type==='cardPlayed');assert(validView(v));
 assert.equal(ev.side,1);assert.equal(ev.target.side,1);assert.equal(ev.card.id,CATALOG.fire[0].id);
 assert(v.sides[1].hand.every(c=>c.hidden&&!c.name&&!c.id));assert(v.clockPaused);assert(v.turnRemainingMs<=60000);
 assert(!validView({...v,turnRemainingMs:Infinity}));assert(!validView({...v,turnRemainingMs:-1}));
});
test('The last real draw does not lose; increasing fatigue eventually destroys the nexus',()=>{
 const d=new Duel(()=>.4);d.start('fire');const s=d.sides[0];s.hand=[];s.deck=[CATALOG.fire[0]];
 d.draw(0);assert(!d.over);assert.equal(s.crystals[1].hp,30);assert.equal(s.fatigue,0);
 d.draw(0);assert.equal(s.crystals[1].hp,29);d.draw(0,2);assert.equal(s.crystals[1].hp,24);
 assert.equal(s.crystals[0].hp,15);assert.equal(s.crystals[2].hp,15);
 d.draw(0,20);assert(d.over);assert.equal(d.winner,1);assert.equal(s.crystals[1].hp,0);
});
test('Every minion, including every element and neutral, has its own illustrated frame',()=>{
 const cards=ALL_CARDS.filter(c=>c.type==='minion'),frames=cards.map(spriteFrame);
 assert.equal(cards.length,60);assert(frames.every(Boolean));
 assert.equal(new Set(frames.map(f=>`${f.element}:${f.index}`)).size,60);
});
console.log(JSON.stringify({passed:tests.length,tests},null,2));
