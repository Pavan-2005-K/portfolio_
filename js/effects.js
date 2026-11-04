/* Scroll progress bar, reveal-on-scroll, click ripple. Must load after main.js */
(function(){
var pg=document.createElement('div');pg.id='pg';document.body.appendChild(pg);
function sp(){var h=document.documentElement.scrollHeight-innerHeight;pg.style.width=(h>0?scrollY/h*100:0)+'%'}
addEventListener('scroll',sp,{passive:true});sp();
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(!rm){
var els=document.querySelectorAll('section>h2,.box,.art,.about>div:first-child,.lc,#cf,.roles,.btns,.social');
var io2=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){var e=en.target;e.classList.add('in');io2.unobserve(e);setTimeout(function(){e.style.transitionDelay=''},1200)}})},{threshold:.12});
els.forEach(function(e){var p=e.parentElement,i=Array.prototype.indexOf.call(p.children,e);e.classList.add('rv');var dir=e.matches('.about>div:first-child')?'rv-l':e.matches('.art,.edu')?'rv-r':e.matches('.pc,.cert,#skgrid .box')?'rv-s':'';if(dir)e.classList.add(dir);e.style.transitionDelay=(i%3)*0.12+'s';io2.observe(e)});
addEventListener('click',function(ev){var r=document.createElement('div');r.className='rip';r.style.left=ev.clientX+'px';r.style.top=ev.clientY+'px';document.body.appendChild(r);setTimeout(function(){r.remove()},650)});
}

if(!rm&&!matchMedia('(pointer:coarse)').matches){
var ph=document.querySelector('.photo'),hm=document.getElementById('home');
if(ph&&hm){hm.addEventListener('mousemove',function(ev){var r=hm.getBoundingClientRect(),dx=(ev.clientX-r.left)/r.width-.5,dy=(ev.clientY-r.top)/r.height-.5;ph.style.transform='translate('+(dx*22)+'px,'+(dy*22)+'px)'});hm.addEventListener('mouseleave',function(){ph.style.transform=''})}
}

if(!rm&&!matchMedia('(pointer:coarse)').matches){
var art=document.querySelector('.art'),tl=art&&art.querySelector('.tilt');
if(art&&tl){art.addEventListener('mousemove',function(ev){var r=art.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;tl.style.transform='perspective(800px) rotateY('+(x*14)+'deg) rotateX('+(-y*14)+'deg)'});art.addEventListener('mouseleave',function(){tl.style.transform=''})}
}

if(matchMedia('(hover:none)').matches){
var hl=new IntersectionObserver(function(es){es.forEach(function(en){en.target.classList.toggle('hl',en.isIntersecting)})},{rootMargin:'-38% 0px -38% 0px'});
document.querySelectorAll('.box,.art,.photo,.robot,.social a.ic,.ci').forEach(function(x){hl.observe(x)});
}
})();
