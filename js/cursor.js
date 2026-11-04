/* Comet cursor: quick-following head, long dotted trail, twinkling sparkles (mouse and touch) */
(function(){
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var cv=document.createElement('canvas');cv.id='cur';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);
var cx=cv.getContext('2d'),dpr=window.devicePixelRatio||1,W,H;
function rs(){W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}
rs();addEventListener('resize',rs);
var m={x:-100,y:-100},h={x:-100,y:-100,vx:0,vy:0},seen=false,tr=[],ps=[],N=72;
var lt=0,tt;addEventListener('mousemove',function(e){if(Date.now()-lt<900)return;m.x=e.clientX;m.y=e.clientY;if(!seen){h.x=m.x;h.y=m.y;h.vx=h.vy=0;seen=true}});
function tp(e){var t=e.touches[0];if(!t)return;clearTimeout(tt);lt=Date.now();m.x=t.clientX;m.y=t.clientY;if(!seen){h.x=m.x;h.y=m.y;h.vx=h.vy=0;seen=true}}
addEventListener('touchstart',tp,{passive:true});addEventListener('touchmove',tp,{passive:true});
addEventListener('touchend',function(){lt=Date.now();clearTimeout(tt);tt=setTimeout(function(){seen=false;tr=[]},350)},{passive:true});
document.addEventListener('mouseleave',function(){seen=false;tr=[]});
function f(){
cx.clearRect(0,0,W,H);
if(seen){
var px=h.x,py=h.y;h.x+=(m.x-h.x)*.22;h.y+=(m.y-h.y)*.22;h.vx=h.x-px;h.vy=h.y-py;
var sp=Math.hypot(h.vx,h.vy);
if(sp>.2){tr.push({x:h.x,y:h.y});if(tr.length>N)tr.shift()}else if(tr.length){tr.shift()}
if(sp>1.4){var n=Math.min(3,Math.ceil(sp/5));for(var k=0;k<n;k++){if(ps.length<150)ps.push({x:h.x+(Math.random()-.5)*8,y:h.y+(Math.random()-.5)*8,vx:(Math.random()-.5)*1.8,vy:(Math.random()-.5)*1.8+.15,l:1,d:.014+Math.random()*.025,s:Math.random()*1.8+.5,t:Math.random()*6.28})}}
cx.fillStyle='#fff';
for(var i=0;i<tr.length;i+=2){var t=i/tr.length;cx.globalAlpha=Math.pow(t,1.4)*.95;cx.beginPath();cx.arc(tr[i].x,tr[i].y,.6+t*4,0,6.283);cx.fill()}
cx.globalAlpha=1;
var g=cx.createRadialGradient(h.x,h.y,0,h.x,h.y,18);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.35,'rgba(255,255,255,.32)');g.addColorStop(1,'rgba(255,255,255,0)');
cx.fillStyle=g;cx.beginPath();cx.arc(h.x,h.y,18,0,6.283);cx.fill();
cx.fillStyle='#fff';cx.beginPath();cx.arc(h.x,h.y,4.6,0,6.283);cx.fill();
}
for(var j=ps.length-1;j>=0;j--){var p=ps[j];p.x+=p.vx;p.y+=p.vy;p.l-=p.d;if(p.l<=0){ps.splice(j,1);continue}
cx.globalAlpha=Math.max(0,p.l*(.55+.45*Math.sin(p.t+p.l*22)));cx.fillStyle='#fff';cx.beginPath();cx.arc(p.x,p.y,p.s,0,6.283);cx.fill()}
cx.globalAlpha=1;
requestAnimationFrame(f)}
f();
})();
