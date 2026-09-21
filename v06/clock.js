export const TURN_MS=60000;
export class TurnClock{
 constructor(now=Date.now){this.now=now;this.deadline=0;this.pausedAt=null}
 start(){this.pausedAt=null;this.deadline=this.now()+TURN_MS}
 remaining(){return Math.max(0,Math.min(TURN_MS,this.deadline-(this.pausedAt??this.now())))}
 expired(){return this.deadline>0&&this.pausedAt===null&&this.now()>=this.deadline}
 pause(){if(this.pausedAt===null)this.pausedAt=this.now()}
 resume(){if(this.pausedAt!==null){this.deadline+=Math.max(0,this.now()-this.pausedAt);this.pausedAt=null}}
 sync(ms,paused=false){this.pausedAt=null;this.deadline=this.now()+Math.max(0,Math.min(TURN_MS,ms));if(paused)this.pause()}
}
