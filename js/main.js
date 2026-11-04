/* Builds the Projects and Certificates cards from js/data.js */
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function linkBtn(label,href){var a=el('a','btn',label);a.href=href;a.target='_blank';a.rel='noopener';return a}
var pgrid=document.getElementById('projects-grid');
PROJECTS.forEach(function(p){
  var c=p.github?el('a','box pc'):el('div','box pc');
  if(p.github){c.href=p.github;c.target='_blank';c.rel='noopener';c.setAttribute('aria-label',p.title+' - open on GitHub')}
  var imgs=!p.image?[]:(Array.isArray(p.image)?p.image:[p.image]),ban;
  if(imgs.length){
    ban=el('div','ban has-img'+(imgs.length>1?' multi':'')+(p.fit==='contain'?' contain':''));
    imgs.forEach(function(s,i){var im=el('img');im.src=s;im.alt=p.title;im.loading='lazy';if(p.pos)im.style.objectPosition=p.pos;if(i===0)im.className='on';ban.appendChild(im)});
    if(imgs.length>1){var k=0,all=ban.querySelectorAll('img');setInterval(function(){all[k].classList.remove('on');k=(k+1)%all.length;all[k].classList.add('on')},2800)}
  }else{ban=el('div','ban',p.abbr||p.title.slice(0,3).toUpperCase())}
  c.appendChild(ban);c.appendChild(el('h3',null,p.title));c.appendChild(el('p',null,p.description));
  var t=el('div','tags');p.tags.forEach(function(x){t.appendChild(el('span',null,x))});c.appendChild(t);
  pgrid.appendChild(c)});
var cgrid=document.getElementById('certs-grid');
CERTS.forEach(function(c){
  var d=el('div','box cert'),im=el('img');im.src=c.image;im.alt=c.title;d.appendChild(im);
  d.appendChild(el('h3',null,c.title));d.appendChild(el('p',null,c.issuer+' \u2022 '+c.date));
  var b;if(c.link){b=linkBtn('View Certificate',c.link)}else{b=el('button','btn','View Certificate');b.type='button';b.dataset.src=c.image}
  d.appendChild(b);cgrid.appendChild(d)});

var g=document.getElementById('skgrid');
SK.forEach(function(s){var d=document.createElement('div');d.className='box';var h=document.createElement('h3');var u=document.createElement('u');u.textContent=s[0];h.appendChild(u);d.appendChild(h);var w=document.createElement('div');w.className='sk';s[1].forEach(function(n){var c=document.createElement('div');var b=document.createElement('b');b.style.setProperty('--c',CL[n]||'#6b7280');b.textContent=n.replace(/[^A-Za-z+#.]/g,'').slice(0,3).replace(/^./,function(x){return x.toUpperCase()});var t=document.createElement('span');t.textContent=n;c.appendChild(b);c.appendChild(t);w.appendChild(c)});d.appendChild(w);g.appendChild(d)});
var lb=document.getElementById('lb'),li=lb.querySelector('img');
document.addEventListener('click',function(e){var b=e.target.closest('[data-src]');if(b){li.src=b.dataset.src;lb.classList.add('open')}});
lb.addEventListener('click',function(){lb.classList.remove('open')});
document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('open')});
(function(){
var form=document.getElementById('cf'),fs=document.getElementById('fs'),btn=form.querySelector('button[type=submit]');
function say(t,c){fs.textContent=t;fs.className=c||''}
var busy=false;
function apiBase(){
  var h=location.hostname,local=(h==='localhost'||h==='127.0.0.1'||h==='');
  return (local?API_BASE_URL_LOCAL:(API_BASE_URL_PROD||location.origin)).replace(/\/+$/,'');
}
form.addEventListener('submit',function(e){
  e.preventDefault();
  if(busy)return;
  var f=form,name=f.n.value.trim(),email=f.e.value.trim(),subject=f.s.value.trim(),msg=f.m.value.trim();
  if(name.length<2){say('Please enter your name.','err');return}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){say('Please enter a valid email address.','err');return}
  if(subject.length<2){say('Please enter a subject.','err');return}
  if(msg.length<10){say('Message must be at least 10 characters.','err');return}
  var base=apiBase();
  busy=true;btn.disabled=true;var label=btn.textContent;btn.textContent='Sending...';say('');
  var ctl=new AbortController(),to=setTimeout(function(){ctl.abort()},30000);
  fetch(base+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},signal:ctl.signal,
    body:JSON.stringify({name:name,email:email,subject:subject,message:msg,botcheck:document.getElementById('bc').checked})})
  .then(function(r){return r.json().catch(function(){return{}}).then(function(j){return{ok:r.ok,status:r.status,j:j}})})
  .then(function(x){
    if(x.ok&&x.j.success){say('Thanks! Your message was sent.','ok');form.reset()}
    else if(x.status===429){say('Too many messages. Please try again in a few minutes.','err')}
    else{say('Could not send: '+(x.j.message||'please try again.'),'err')}})
  .catch(function(){say('Could not reach the server. Please try again, or email me directly.','err')})
  .then(function(){clearTimeout(to);busy=false;btn.disabled=false;btn.textContent=label});
});

})();
var links=document.querySelectorAll('#links a'),secs=document.querySelectorAll('section');

var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+en.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(function(s){io.observe(s)});
(function(){var el=document.getElementById('typed'),t='Hi, I am Pavan K',i=0,del=false;el.textContent='';function k(){if(!del){i++;el.textContent=t.slice(0,i);if(i===t.length){del=true;return setTimeout(k,1200)}setTimeout(k,45)}else{i--;el.textContent=t.slice(0,i);if(i===0){del=false;return setTimeout(k,300)}setTimeout(k,25)}}setTimeout(k,200)})();
(function(){var r=document.querySelector('.robot');if(r)r.addEventListener('click',function(){r.classList.toggle('on')})})();
(function(){if(typeof ABOUT_GIF==='string'&&ABOUT_GIF){var i=document.getElementById('aboutimg'),s=document.getElementById('stage');if(i&&s){i.src=ABOUT_GIF;s.classList.add('gif')}}})();
(function(){
var nav=document.querySelector('nav'),mb=document.getElementById('menu');
function set(o){nav.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Close menu':'Open menu')}
mb.addEventListener('click',function(e){e.stopPropagation();set(!nav.classList.contains('open'))});
document.querySelectorAll('#links a').forEach(function(a){a.addEventListener('click',function(){set(false)})});
document.addEventListener('click',function(e){if(!nav.contains(e.target))set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
addEventListener('resize',function(){if(innerWidth>900)set(false)});
})();
