// Original procedural sound design. No recordings or assets from other games.
export class Sound{
 constructor(){this.ctx=null;this.volume=.25;try{this.enabled=localStorage.getItem('crystal-sound')!=='off';this.volume=+(localStorage.getItem('crystal-volume')||.25)}catch{this.enabled=true}}
 async unlock(){try{if(!this.ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;this.ctx=new C();this.master=this.ctx.createGain();this.master.gain.value=this.volume;const limiter=this.ctx.createDynamicsCompressor();limiter.threshold.value=-14;limiter.ratio.value=6;this.master.connect(limiter);limiter.connect(this.ctx.destination);this.noiseBuffer=this.ctx.createBuffer(1,this.ctx.sampleRate,this.ctx.sampleRate);const channel=this.noiseBuffer.getChannelData(0);for(let i=0;i<channel.length;i++)channel[i]=Math.random()*2-1}if(this.ctx.state==='suspended')await this.ctx.resume()}catch{this.enabled=false}}
 toggle(){this.enabled=!this.enabled;try{localStorage.setItem('crystal-sound',this.enabled?'on':'off')}catch{}return this.enabled}
 setVolume(v){this.volume=Math.min(.7,Math.max(0,v));if(this.master)this.master.gain.setTargetAtTime(this.volume,this.ctx.currentTime,.03);try{localStorage.setItem('crystal-volume',this.volume)}catch{}}
 tone(freq,to,duration,volume=.2,type='sine',delay=0){const c=this.ctx,t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,to),t+duration);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.009);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(this.master);o.start(t);o.stop(t+duration+.01)}
 noise(duration,volume=.2,freq=1500,delay=0,filter='bandpass'){const c=this.ctx,t=c.currentTime+delay,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=this.noiseBuffer;f.type=filter;f.frequency.setValueAtTime(freq,t);f.frequency.exponentialRampToValueAtTime(Math.max(100,freq*.4),t+duration);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+duration);s.connect(f);f.connect(g);g.connect(this.master);s.start(t);s.stop(t+duration)}
 play(kind,element='light',heavy=false){if(!this.enabled||!this.ctx||this.ctx.state!=='running')return;const root={fire:196,water:294,wind:330,light:392,dark:147}[element]||294;
 if(kind==='select'){this.noise(.055,.12,2200);this.tone(650,520,.07,.07,'triangle');return}
 if(kind==='draw'){this.noise(.16,.16,3500);this.tone(650,850,.14,.08,'sine');return}
 if(kind==='attack'){this.noise(.14,.5,1700);this.tone(130,42,.2,.65);this.tone(620,180,.09,.15,'triangle',.045);return}
 if(kind==='shatter'||kind==='death'){this.noise(.4,.33,2800);[2,2.5,3.2].forEach((x,i)=>this.tone(root*x,root*x*.6,.35,.13,'triangle',i*.04));this.tone(95,35,.35,.4);return}
 if(kind==='summon'){this.noise(.42,.2,element==='water'?3200:900);this.tone(heavy?90:150,40,.4,heavy?.6:.4);[1,1.5,2].forEach((x,i)=>this.tone(root*x*.75,root*x,.38,.12,'triangle',i*.08));return}
 if(kind==='spell'||kind==='power'){this.noise(.4,.18,element==='fire'?1500:element==='wind'?4200:2800);this.tone(root*.6,root*2,.24,.2,'sine');this.tone(root*2,root,.3,.19,element==='dark'?'triangle':'sine',.15);this.tone(110,55,.18,.2,'sine',.2);return}
 if(kind==='rune'||kind==='heal'||kind==='shield'){[1,1.25,1.5,2].forEach((x,i)=>this.tone(root*x*2,root*x*2,.65,.13,'sine',i*.07));this.noise(.18,.07,3800);return}
 if(kind==='turn'){[1,1.5].forEach((x,i)=>this.tone(330*x,330*x,.35,.15,'triangle',i*.1));return}
 if(kind==='start'||kind==='awaken'||kind==='victory'){[1,1.25,1.5,2,3].forEach((x,i)=>this.tone(root*x,root*x,.9,.17,'triangle',i*.1));this.tone(120,40,.6,.35);return}
 }
}
