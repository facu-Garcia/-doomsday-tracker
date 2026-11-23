(function(){'use strict';
const DB=window.DOOMSDAY_CAST_DB;
const shell=document.getElementById('v6-cast-view');
if(!DB||!shell)return;
const actors=["Chris Hemsworth","Vanessa Kirby","Anthony Mackie","Sebastian Stan","Letitia Wright","Paul Rudd","Wyatt Russell","Tenoch Huerta Mejía","Ebon Moss-Bachrach","Simu Liu","Florence Pugh","Kelsey Grammer","Lewis Pullman","Danny Ramirez","Joseph Quinn","David Harbour","Winston Duke","Hannah John-Kamen","Tom Hiddleston","Patrick Stewart","Ian McKellen","Alan Cumming","Rebecca Romijn","James Marsden","Channing Tatum","Pedro Pascal","Robert Downey Jr."];
const single={"Chris Hemsworth":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/thor.jpeg?crop=1&h=820&w=550","Anthony Mackie":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/mack.jpeg?crop=1&h=820&w=550","Sebastian Stan":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/winter.jpeg?crop=1&h=820&w=550","Letitia Wright":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/shuri2.jpeg?crop=1&h=820&w=550","Paul Rudd":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/antman.jpeg?crop=1&h=820&w=550","Tom Hiddleston":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/loki.jpeg?crop=1&h=820&w=550","Chris Evans":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/cpt.jpeg?crop=1&h=820&w=550","Mark Ruffalo":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/hulk.jpeg?crop=1&h=820&w=550","Benedict Cumberbatch":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/strange.jpeg?crop=1&h=820&w=550","Elizabeth Olsen":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/witch.jpeg?crop=1&h=820&w=550","Paul Bettany":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/vision.jpeg?crop=1&h=820&w=550","Brie Larson":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/captainmarvel.jpeg?crop=1&h=820&w=550","Robert Downey Jr.":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-doctor-doom.jpg?resize=1086%2C1609&ssl=1","Channing Tatum":"https://static1.srcdn.com/wordpress/wp-content/uploads/2024/08/deadpool-wolverine-gambit-poster.jpg","Hugh Jackman":"https://images.squarespace-cdn.com/content/571e7cc14c2f859b347c0167/1489967363338-AJV5517BYT75B0D7F04T/poster%2B-%2BLogan.jpg?content-type=image%2Fjpeg","Ryan Reynolds":"https://image.tmdb.org/t/p/w780/3E53WEZJqP6aM84D8CckXx4pIHw.jpg","Tobey Maguire":"https://www.impawards.com/2002/posters/spiderman_ver1.jpg","Tom Holland":"https://www.impawards.com/2017/posters/spider_man_homecoming_ver11.jpg","Hailee Steinfeld":"https://celebmafia.com/wp-content/uploads/2021/11/hailee-steinfeld-hawkeye-posters-2021-3.jpg","Iman Vellani":"https://wegotthiscovered.com/wp-content/uploads/2022/05/20220529_191140.jpg","Samuel L. Jackson":"https://editorial.rottentomatoes.com/wp-content/uploads/2019/03/fury.jpeg?crop=1&h=820&w=550","Xochitl Gomez":"https://image.tmdb.org/t/p/w780/kJ25bPaP47qM1kVQAgGlK5RzbbN.jpg"};
const FALLBACK='https://image.tmdb.org/t/p/w780/';
const id=actor=>DB.people.find(x=>x.actor===actor);
const confirmedNames=new Set(actors);
const gallery=document.createElement('section');gallery.id='v8-cast-views';gallery.className='v8-cast-views';
const row=document.createElement('div');row.className='v8-viewbar';row.innerHTML='<button type="button" data-view="gallery" aria-pressed="true">Galería de personajes</button><button type="button" data-view="chairs" aria-pressed="false">Las 27 sillas · 2025</button>';
const intro=document.createElement('p');intro.className='v8-disclaimer';intro.textContent='Cada tarjeta destaca un retrato individual de material promocional existente. Los pósteres grupales no se utilizan como primera opción; cuando no existe un cartel individual de Doomsday, se utiliza arte de otra película o serie.';
const galleryRoot=document.createElement('div');galleryRoot.className='v8-root';
const chairsRoot=document.createElement('div');chairsRoot.className='v8-root';chairsRoot.hidden=true;
gallery.append(row,intro,galleryRoot,chairsRoot);shell.querySelector('.v6-cast-count').after(gallery);
const legacy=shell.querySelector('#v6-cast-grid');legacy.hidden=true;
const levelLabel={official:'Confirmado por Marvel',rumor:'Rumor · no confirmado',possible:'Posible · hipótesis'};
const teams={
'Doctor Doom':['Robert Downey Jr.'],
'Avengers':['Chris Evans','Chris Hemsworth','Anthony Mackie','Paul Rudd','Simu Liu'],
'Los Cuatro Fantásticos':['Pedro Pascal','Vanessa Kirby','Joseph Quinn','Ebon Moss-Bachrach'],
'X-Men':['Patrick Stewart','Ian McKellen','James Marsden','Rebecca Romijn','Alan Cumming','Kelsey Grammer','Channing Tatum'],
'Nuevos Avengers':['Florence Pugh','Sebastian Stan','Wyatt Russell','David Harbour','Hannah John-Kamen','Lewis Pullman'],
'Wakanda y Talokan':['Letitia Wright','Winston Duke','Tenoch Huerta Mejía','Mabel Cadena','Alex Livinalli'],
'Otros aliados':['Tom Hiddleston','Hayley Atwell','Danny Ramirez','Kathryn Newton']
};
function getTeam(p){return Object.keys(teams).find(k=>teams[k].includes(p.actor))||'Otros aliados';}
function heading(title,type,count){const h=document.createElement('div');h.className='v8-heading '+type;h.setAttribute('role','heading');h.setAttribute('aria-level','2');const b=document.createElement('strong');b.textContent=title;h.append(b);if(count!=null){const small=document.createElement('small');small.textContent=count+' personajes';h.append(small)}return h}
function posterCandidates(p){
 const pick=DB.characterPortraits[p.actor];
 const arr=[];
 if(single[p.actor])arr.push({src:single[p.actor],kind:p.actor==='Robert Downey Jr.'?'Doomsday · individual':'Póster individual · película anterior'});
 if(pick&&(pick.zoom||1)===1&&(!single[p.actor]||pick.url!==single[p.actor]))arr.push({src:pick.url,kind:pick.kind||'Arte individual'});
 if(pick&&(pick.zoom||1)>1.1)arr.push({src:pick.url,zoom:pick.zoom,ox:pick.ox??50,oy:pick.oy??50,kind:'Retrato individual · recorte de arte oficial'});
 // En el caso de no existir un póster individual documentado, conservar como último recurso
 // un solo personaje recortado, nunca presentar el arte doble completo.
 return arr;
}
function photo(p){
 const wrap=document.createElement('div');wrap.className='v8-photo';
 const img=document.createElement('img');img.alt='Retrato individual de '+p.name;img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';
 const label=document.createElement('span');label.className='v8-photo-source';
 const options=posterCandidates(p);let n=0;
 function fail(){if(n<options.length){const next=options[n++];label.textContent=next.kind;img.style.transform=next.zoom?'scale('+next.zoom+')':'none';img.style.transformOrigin=(next.ox??50)+'% '+(next.oy??50)+'%';img.src=next.src;}else{img.remove();const missing=document.createElement('span');missing.className='v8-photo-unavailable';missing.textContent='Retrato individual no disponible';wrap.append(missing);label.textContent='Sin imagen verificada';}}
 img.onerror=fail;fail();wrap.append(img,label);return wrap;
}
function detail(p){const d=document.createElement('details');d.className='v8-detail';const summary=document.createElement('summary');summary.textContent='Detalles';const body=document.createElement('div');body.className='v8-detail-body';
const fields=[['Actor',p.actor],['Participación',levelLabel[p.status]],['Películas y series',p.works]];
if(p.note)fields.push(['Información adicional',p.note]);fields.forEach(([k,v])=>{const r=document.createElement('p');const kEl=document.createElement('strong');kEl.textContent=k+': ';r.append(kEl,document.createTextNode(v));body.append(r)});
d.append(summary,body);return d;}
function card(p,index){const c=document.createElement('article');c.className='v8-card';c.dataset.status=p.status;c.append(photo(p));const info=document.createElement('div');info.className='v8-card-info';const chip=document.createElement('span');chip.className='v8-mini-status';chip.textContent=p.status==='official'?'Oficial':p.status==='rumor'?'Rumor':'Posible';
const title=document.createElement('h3');title.textContent=p.name;const actor=document.createElement('p');actor.className='v8-actor';actor.textContent=p.actor;
info.append(chip,title,actor,detail(p));c.append(info);return c}
const search=document.getElementById('v6-cast-search'),filter=document.getElementById('v6-cast-filter'),count=shell.querySelector('.v6-cast-count');
function norm(t){return String(t).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function drawGallery(){
 const q=norm(search.value.trim());const selected=filter.value;
 const list=DB.people.filter(p=>(selected==='all'||selected===p.status)&&(!q||norm(p.name+' '+p.actor+' '+p.works).includes(q)));
 galleryRoot.replaceChildren();
 for(const lvl of ['official','rumor','possible']){
  const subset=list.filter(p=>p.status===lvl);if(!subset.length)continue;
  galleryRoot.append(heading(({official:'Confirmados oficialmente',rumor:'Rumores y filtraciones · Sin confirmar',possible:'Posibles por contexto · Sin confirmar'})[lvl],lvl,subset.length));
  if(lvl==='official'){
   for(const team of Object.keys(teams)){const items=subset.filter(p=>getTeam(p)===team);if(!items.length)continue;const h=document.createElement('h3');h.className='v8-team';h.textContent=team;galleryRoot.append(h);const grid=document.createElement('div');grid.className='v8-grid';items.forEach(x=>grid.append(card(x)));galleryRoot.append(grid);}
  }else{const g=document.createElement('div');g.className='v8-grid';subset.forEach(x=>g.append(card(x)));galleryRoot.append(g)}
 }
 count.textContent=list.length+' personajes · '+DB.people.filter(p=>p.status==='official').length+' oficiales · '+DB.people.filter(p=>p.status==='rumor').length+' rumores · '+DB.people.filter(p=>p.status==='possible').length+' hipótesis';
}
function chairPerson(actor){return id(actor)||{actor,name:'Papel no especificado',status:'official',works:'',note:''}}
function drawChairs(){
 chairsRoot.replaceChildren();
 const hero=document.createElement('div');hero.className='v8-chair-intro';
 hero.innerHTML='<span>ARCHIVO HISTÓRICO · MARVEL STUDIOS</span><h2>LAS 27 SILLAS</h2><p>26 de marzo de 2025. Marvel anunció 27 actores durante una transmisión de varias horas, mostrando una silla tras otra. Esta es la secuencia de presentación original; no debe confundirse con las incorporaciones confirmadas posteriormente.</p><a href="https://thewaltdisneycompany.com/news/marvel-studios-avengers-doomsday-cast/" target="_blank" rel="noopener noreferrer">Comunicado oficial de Disney</a> · <a href="https://www.youtube.com/watch?v=GzK0KOsSlZY" target="_blank" rel="noopener noreferrer">Vídeo del anuncio</a>';
 chairsRoot.append(hero,heading('Revelación original · 26 marzo 2025','official',27));
 const list=document.createElement('div');list.className='v8-chairs-grid';
 actors.forEach((actor,i)=>{const p=chairPerson(actor);const c=document.createElement('article');c.className='v8-chair';c.append(photo(p));const panel=document.createElement('div');panel.className='v8-chair-panel';
 const seat=document.createElement('span');seat.className='v8-chair-order';seat.textContent='SILLA '+String(i+1).padStart(2,'0')+' / 27';
 const chair=document.createElement('div');chair.className='v8-chair-back';chair.textContent=actor;
 const role=document.createElement('strong');role.className='v8-chair-role';role.textContent=p.name;
 panel.append(seat,chair,role,detail(p));c.append(panel);list.append(c)});chairsRoot.append(list);
 const later=DB.people.filter(p=>p.status==='official'&&!confirmedNames.has(p.actor));
 if(later.length){chairsRoot.append(heading('Confirmados después de las 27 sillas','official',later.length));
 const p=document.createElement('p');p.className='v8-later-explain';p.textContent='Estos intérpretes están confirmados por Disney/Marvel, pero NO estuvieron entre las 27 sillas de marzo de 2025.';chairsRoot.append(p);
 const grid=document.createElement('div');grid.className='v8-grid';later.forEach(x=>grid.append(card(x)));chairsRoot.append(grid)}
}
let mode='gallery';function switchView(next){mode=next;galleryRoot.hidden=next!=='gallery';chairsRoot.hidden=next!=='chairs';search.closest('.v6-cast-controls').hidden=next==='chairs';count.hidden=next==='chairs';intro.hidden=next==='chairs';row.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.view===next)));if(next==='chairs')drawChairs();else drawGallery();}
row.addEventListener('click',e=>{const b=e.target.closest('button[data-view]');if(b)switchView(b.dataset.view)});
search.addEventListener('input',drawGallery);filter.addEventListener('change',drawGallery);
drawGallery();document.documentElement.dataset.appVersion='v8';
})();
