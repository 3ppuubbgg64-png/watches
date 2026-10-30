const watches = [
  {name:'Aurum Classic', cat:'classic', price:4800, face:'#f4efe3', ink:'#222', accent:'#c9a45c', strap:'#5a3a22', badge:'Bestseller',
   desc:'A dress watch in 18k rose gold with a silver sunburst dial and hand-stitched calfskin strap.',
   img:'photo-1523275335684-37898b6baf30'},
  {name:'Abyss Diver', cat:'sport', price:3200, face:'#0d2a4a', ink:'#fff', accent:'#e8e8e8', strap:'#111', badge:'New',
   desc:'300 m water resistance, ceramic bezel and luminous markers. Built for the deep.',
   img:'photo-1524592094714-0f0654e20314'},
  {name:'Noir Tourbillon', cat:'luxury', price:28500, face:'#0a0a0a', ink:'#e9d9a8', accent:'#c9a45c', strap:'#1b1b1b',
   desc:'A flying tourbillon visible through the sapphire dial. Limited to 88 pieces.',
   img:'photo-1522312346375-d1a52e2b99b3'},
  {name:'Meridian GMT', cat:'sport', price:5400, face:'#2c3a2e', ink:'#f1f1e6', accent:'#d9d9d9', strap:'#2c2c2c',
   desc:'Dual time zone complication with a rotating 24-hour bezel for the modern traveller.',
   img:'photo-1434056886845-dac89ffe9b56'},
  {name:'Lune Moonphase', cat:'classic', price:7900, face:'#1b2a4a', ink:'#f3e9c6', accent:'#c9a45c', strap:'#3a2418',
   desc:'Poetic moonphase display with a navy guilloché dial that catches every light.',
   img:'photo-1547996160-81dfa63595aa'},
  {name:'Sovereign Gold', cat:'luxury', price:19800, face:'#e9d28e', ink:'#2a1f08', accent:'#fff1c1', strap:'#7a5a1e',
   desc:'Solid 18k yellow gold on an integrated bracelet. A statement of permanence.',
   img:'photo-1542496658-e33a6d0d50f6'}
];

const fmt = n => '$' + n.toLocaleString();

function watchSVG(w, live){
  let ticks = '';
  for(let i=0;i<60;i++){
    const big = i%5===0, a = i*6;
    ticks += `<line x1="200" y1="${big?44:48}" x2="200" y2="${big?64:55}" stroke="${w.ink}" stroke-width="${big?4:1.2}" transform="rotate(${a} 200 200)"/>`;
  }
  const d = new Date();
  const s = d.getSeconds(), m = d.getMinutes()+s/60, h = (d.getHours()%12)+m/60;
  const style = (cls,deg,dur) => live ? `class="hand ${cls}" style="animation-delay:-${(deg/360*dur).toFixed(2)}s"` : `class="hand" transform="rotate(${deg} 200 200)"`;
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g${w.name.length}${live?'l':''}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${w.accent}"/><stop offset=".5" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="${w.accent}"/></linearGradient>
    <radialGradient id="f${w.name.length}${live?'l':''}"><stop offset="0" stop-color="${w.face}"/><stop offset="1" stop-color="${w.face}" stop-opacity=".85"/></radialGradient>
  </defs>
  <rect x="145" y="0" width="110" height="400" rx="30" fill="${w.strap}"/>
  <rect x="155" y="0" width="90" height="400" rx="24" fill="none" stroke="#000" stroke-opacity=".3" stroke-dasharray="6 6"/>
  <circle cx="200" cy="200" r="168" fill="url(#g${w.name.length}${live?'l':''})"/>
  <circle cx="200" cy="200" r="150" fill="#000" fill-opacity=".35"/>
  <circle cx="200" cy="200" r="142" fill="url(#f${w.name.length}${live?'l':''})"/>
  ${ticks}
  <text x="200" y="125" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="20" letter-spacing="6" fill="${w.ink}">CHRONOS</text>
  <text x="200" y="285" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" letter-spacing="3" fill="${w.ink}" opacity=".7">AUTOMATIC · SWISS MADE</text>
  <g ${style('hr',h*30,43200)}><polygon points="194,200 200,120 206,200 200,212" fill="${w.ink}"/></g>
  <g ${style('min',m*6,3600)}><polygon points="196,200 200,80 204,200 200,214" fill="${w.ink}"/></g>
  <g ${style(live?'sec fast':'sec',s*6,60)}><line x1="200" y1="228" x2="200" y2="62" stroke="${w.accent==='#e8e8e8'||w.accent==='#d9d9d9'?'#ff5a3c':'#d33'}" stroke-width="2"/><circle cx="200" cy="200" r="7" fill="#d33"/></g>
  <circle cx="200" cy="200" r="3" fill="#000"/>
  <path d="M90 110 A150 150 0 0 1 200 52" stroke="#fff" stroke-opacity=".25" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>`;
}

// hero watch (live clock)
document.getElementById('heroWatch').outerHTML = watchSVG({name:'Hero', face:'#101013', ink:'#ece8df', accent:'#c9a45c', strap:'#2a1d12'}, true);

// split headline
document.querySelectorAll('[data-split]').forEach(el=>{
  el.innerHTML = el.textContent.split(' ').map((w,i)=>`<span class="w"><i style="animation-delay:${.2+i*.15}s">${w}</i></span>`).join(' ');
});

// products
const grid = document.getElementById('grid');
const unsplash = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=70`;
watches.forEach((w,i)=>{
  const c = document.createElement('article');
  c.className = 'card reveal'; c.dataset.cat = w.cat; c.style.transitionDelay = (i%3)*.12+'s';
  c.innerHTML = `<div class="card-img">${w.badge?`<span class="badge">${w.badge}</span>`:''}${watchSVG(w,false)}<img src="${unsplash(w.img)}" alt="${w.name}" loading="lazy"></div>
    <div class="card-body"><div><small>${w.cat}</small><h3>${w.name}</h3></div><span class="p">${fmt(w.price)}</span></div>`;
  c.querySelector('img').onerror = e => e.target.remove();
  c.onclick = () => openModal(w);
  // 3D tilt
  c.addEventListener('mousemove', e=>{
    const r = c.getBoundingClientRect(), x = (e.clientX-r.left)/r.width-.5, y = (e.clientY-r.top)/r.height-.5;
    c.style.transition = 'border-color .3s'; c.style.transform = `perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`;
  });
  c.addEventListener('mouseleave', ()=>{ c.style.transition=''; c.style.transform=''; });
  grid.appendChild(c);
});

// filters
document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  document.querySelectorAll('.card').forEach(c=>{
    const show = b.dataset.f==='all' || c.dataset.cat===b.dataset.f;
    c.classList.toggle('hide', !show);
    if(show){ c.style.opacity=0; requestAnimationFrame(()=>requestAnimationFrame(()=>c.style.opacity=1)); }
  });
});

// modal
const modal = document.getElementById('modal');
function openModal(w){
  document.getElementById('mName').textContent = w.name;
  document.getElementById('mDesc').textContent = w.desc;
  document.getElementById('mPrice').textContent = fmt(w.price);
  const box = document.getElementById('mImg');
  box.innerHTML = watchSVG(w,true) ;
  const img = new Image(); img.alt = w.name; img.src = unsplash(w.img);
  img.onload = () => { box.innerHTML=''; box.appendChild(img); };
  modal.classList.add('open');
}
const closeModal = () => modal.classList.remove('open');
document.getElementById('close').onclick = closeModal;
document.getElementById('mBtn').onclick = closeModal;
modal.onclick = e => { if(e.target===modal) closeModal(); };
addEventListener('keydown', e => e.key==='Escape' && closeModal());

// scroll reveal + counters
const io = new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return;
  e.target.classList.add('in'); io.unobserve(e.target);
  const n = e.target.querySelector('[data-count]');
  if(n){ const t=+n.dataset.count; let s=null;
    const step = ts=>{ s??=ts; const p=Math.min((ts-s)/1800,1); n.textContent=Math.floor(t*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(step); else n.textContent=t; };
    requestAnimationFrame(step); }
}), {threshold:.15});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>io.observe(el));

// scroll effects
const nav = document.getElementById('nav'), bar = document.getElementById('progress');
const par = document.querySelector('[data-parallax]');
addEventListener('scroll', ()=>{
  const y = scrollY, max = document.documentElement.scrollHeight-innerHeight;
  nav.classList.toggle('scrolled', y>50);
  bar.style.width = (y/max*100)+'%';
  if(y<innerHeight) par.style.transform = `translateY(${y*+par.dataset.parallax}px)`;
}, {passive:true});

// cursor glow
const cur = document.getElementById('cursor');
addEventListener('mousemove', e=>{ cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; });

// mobile menu
const burger = document.getElementById('burger'), menu = document.querySelector('.nav nav');
burger.onclick = () => menu.classList.toggle('open');
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>menu.classList.remove('open'));
