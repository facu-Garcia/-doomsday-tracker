(function catalogV5(){
'use strict';
const poster='https://image.tmdb.org/t/p/w780/';
const seriesRows=[
 ['wandavision','WandaVision','2021',4,'2021-01-15','https://cdn.marvel.com/content/2x/wandavision_poster.jpg','Miniserie'],
 ['falcon','The Falcon and the Winter Soldier','2021',4,'2021-03-19','https://images.squarespace-cdn.com/content/v1/5efce5920d28887981c5bd9b/1614051972759-9N784CGPO1YAWCMFD5LI/The%2BFalcon%2Band%2BWinter%2BSoldier%2Bkey%2Bart%2B2%2B%281%29.jpg','Miniserie'],
 ['loki','Loki · Temporadas 1 y 2','2021–2023',4,'2021-06-09',poster+'kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg','2 temporadas'],
 ['whatif','What If...? · Temporadas 1–3','2021–2024',4,'2021-08-11','https://image.tmdb.org/t/p/original/gc8mX1f1t8xoQuCZGNEfflwyasA.jpg','Animación · multiverso'],
 ['hawkeye','Hawkeye','2021',4,'2021-11-24','https://artofthemovies.co.uk/cdn/shop/products/IMG_7452.jpg?v=1642601103&width=1946','Miniserie'],
 ['moonknight','Moon Knight','2022',4,'2022-03-30','https://i.ebayimg.com/images/g/Q1oAAOSw8zZiYm3c/s-l1200.jpg','Miniserie'],
 ['msmarvel','Ms. Marvel','2022',4,'2022-06-08','https://wegotthiscovered.com/wp-content/uploads/2022/05/20220529_191140.jpg','Miniserie'],
 ['groot','I Am Groot · Temporadas 1 y 2','2022–2023',4,'2022-08-10','https://terrigen-cdn-dev.marvel.com/content/prod/1x/iamgroot_poster.jpg','Cortos animados'],
 ['shehulk','She-Hulk: Attorney at Law','2022',4,'2022-08-18',poster+'hJfI6AGrmr4uSHRccfJuSsapvOb.jpg','Serie'],
 ['secretinvasion','Secret Invasion','2023',5,'2023-06-21','https://m.media-amazon.com/images/M/MV5BNmYzYzA2NzMtOTVmMC00ZDY4LThlMDctZmUyN2NlMjQ2ODViXkEyXkFqcGc%40._V1_.jpg','Miniserie'],
 ['echo','Echo','2024',5,'2024-01-09',poster+'eVqz9zgvGYVqvHOg1QlHWrGTpz3.jpg','Miniserie'],
 ['agatha','Agatha All Along','2024',5,'2024-09-18','https://chscommunicator.com/wp-content/uploads/2025/02/rQSTfu5odec5bFj9YcYEUjELyfsF4Suqqosh0U6V-960x1200.jpg','Miniserie'],
 ['friendlyspidey','Your Friendly Neighborhood Spider-Man · T1','2025',5,'2025-01-29','https://www.flickeringmyth.com/wp-content/uploads/2024/12/your-friendly-nightborhood-spider-man.jpg','Animación · universo alternativo'],
 ['daredevilba','Daredevil: Born Again · T1','2025',5,'2025-03-04','https://f.rpp-noticias.io/2025/01/15/1692815snapinstapp-473807099-2723084657877244-4278080076513490844-n-1080jpg.jpg','Serie'],
 ['ironheart','Ironheart','2025',5,'2025-06-24','https://cdn.kinocheck.com/i/w%3D325/vkav4s83t7.jpg','Miniserie'],
 ['eyeswakanda','Eyes of Wakanda','2025',6,'2025-08-01','https://cdn.marvel.com/content/2x/eyes_of_wakanda_lob_crd_01.jpg','Animación'],
 ['marvelzombies','Marvel Zombies','2025',6,'2025-09-24','https://cdn.marvel.com/content/2x/marvel_zombies_lob_crd_01.jpg','Animación · universo alternativo'],
 ['wonderman','Wonder Man','2026',6,'2026-01-27','https://cdn.marvel.com/content/2x/wonderman_lob_crd_03.jpg','Miniserie'],
 ['daredevilba2','Daredevil: Born Again · T2','2026',6,'2026-03-24','https://f.rpp-noticias.io/2025/01/15/1692815snapinstapp-473807099-2723084657877244-4278080076513490844-n-1080jpg.jpg','Serie · temporada 2'],
 ['visionquest','VisionQuest','2026',6,'2026-10-13','https://cdn.marvel.com/content/2x/visionquest_lob_crd_01.jpg','Miniserie']
];
const SERIES=seriesRows.map(([id,title,year,phase,release,url,note])=>({id,title,year,phase,release,group:'Fase '+phase,saga:phase<=3?'Saga del Infinito':'Saga del Multiverso',url,type:'serie',note,releaseOrder:100+seriesRows.findIndex(r=>r[0]===id)}));
const xRows=[
 ['xmen','X-Men',2000,true,''],['x2','X2: X-Men United',2003,true,''],
 ['xmenlast','X-Men: The Last Stand',2006,true,poster+'4kYJRFESJOoYdiOJ3yQKDrB6HdM.jpg'],
 ['wolverineorigins','X-Men Origins: Wolverine',2009,false,poster+'yj8LbTju1p7CUJg7US2unSBk33s.jpg'],
 ['xmenfirst','X-Men: First Class',2011,true,poster+'hNEokmUke0dazoBhttFN0o3L7Xv.jpg'],
 ['thewolverine','The Wolverine',2013,false,poster+'xNi8daRmN4XY8rXHd4rwLbJf1cU.jpg'],
 ['daysfuture','X-Men: Days of Future Past',2014,true,poster+'tYfijzolzgoMOtegh1Y7j2Enorg.jpg'],
 ['deadpool1','Deadpool',2016,false,poster+'3E53WEZJqP6aM84D8CckXx4pIHw.jpg'],
 ['apocalypse','X-Men: Apocalypse',2016,true,poster+'ikA8UhYdTGpqbatcW9sNXe6tKT3.jpg'],
 ['logan','Logan',2017,false,poster+'fnbjcRDYn6YviCcePDnGdyAkYsB.jpg'],
 ['deadpool2','Deadpool 2',2018,false,poster+'to0spRl1CMDvyUbOnbb4fTk3VAd.jpg'],
 ['darkphoenix','Dark Phoenix',2019,true,poster+'cCTJPelKGLhALq3r51A9uMonxKj.jpg'],
 ['newmutants','The New Mutants',2020,false,poster+'xrI4EnZWftpo1B7tTvlMUXVOikd.jpg'],
 ['deadpool','Deadpool & Wolverine',2024,true,'']
];
const xmen=xRows.map(([id,title,year,recommended,url],i)=>({id,title,year:String(year),group:'Universo X-Men',type:'pelicula',xmenOrder:i,recommended,url,releaseOrder:200+i}));
window.DOOMSDAY_XMEN=xmen;
const loki='https://image.tmdb.org/t/p/w780/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg';
for(const a of DOOM)if(a.id==='loki'){a.url=loki;}
for(const m of MCU){m.type='pelicula';m.release=m.year+'-07-01';}
MCU.push(...SERIES);
const known=new Set(ALL.map(x=>x.id));
for(const m of [...SERIES,...xmen]){
  if(!known.has(m.id)){known.add(m.id);ALL.push(m);map.set(m.id,{...m,order:ALL.length});data[m.id]={status:'pending',priority:'medium'};createCard(map.get(m.id));}
  else if(m.id==='loki'){
    const v=map.get(m.id);v.url=loki;v.phase=4;v.saga='Saga del Multiverso';v.type='serie';v.note='2 temporadas';v.release='2021-06-09';v.group='Series';v.year='2021–2023';
    if(cards.get(m.id)){cards.get(m.id).posterLoaded=false;}
  }
}
for(const m of xmen){if(m.url&&map.get(m.id)&&!map.get(m.id).url)map.get(m.id).url=m.url;}
const xButton=document.createElement('button');xButton.className='mode-tab';xButton.type='button';xButton.dataset.mode='xmen';xButton.setAttribute('role','tab');xButton.setAttribute('aria-selected','false');xButton.innerHTML='Universo X-Men<small>14 películas · guía esencial</small>';document.querySelector('.mode-nav').append(xButton);
const mcuTab=document.querySelector('[data-mode=mcu] small');if(mcuTab)mcuTab.textContent='38 películas + 20 series';
const catalogFields=$('catalogFields');
const mediaLabel=document.createElement('label');mediaLabel.className='field';mediaLabel.innerHTML='<span class="sr-only">Formato</span><select class="catalog-field" id="mediaSelect" aria-label="Tipo de título"><option value="all">Películas y series</option><option value="pelicula">Solo películas</option><option value="serie">Solo series</option></select>';catalogFields.append(mediaLabel);
const xmenBlock=document.createElement('div');xmenBlock.id='xmenFields';xmenBlock.hidden=true;xmenBlock.innerHTML='<label class="field"><span class="sr-only">Ruta mutante</span><select class="catalog-field" id="xmenFilter" aria-label="Filtrar películas de X-Men"><option value="all">Toda la saga X-Men (14)</option><option value="essential">Solo esenciales para Doomsday (8)</option></select></label><p class="catalog-info">Incluye las películas de Fox y el cruce con Deadpool & Wolverine; las series animadas pertenecen a otras continuidades.</p>';catalogFields.insertAdjacentElement('afterend',xmenBlock);
$('catalogInfo').textContent='Producciones estrenadas de Marvel Studios: 38 películas y 20 series, incluidas animaciones y universos alternativos identificados. Los títulos compartidos mantienen tu progreso.';
const sheetIntro=$('editIntro');sheetIntro.textContent='Selecciona estado y prioridad. Los títulos compartidos conservan el mismo progreso.';
const phaseOrder=m=>({1:1,2:2,3:3,4:4,5:5,6:6})[m.phase]||9;
const movieDates={'ironman':'2008-05','hulk':'2008-06','ironman2':'2010-05','thor1':'2011-05','cap1':'2011-07','avengers':'2012-05','ironman3':'2013-05','thor2':'2013-11','winter':'2014-04','guardians1':'2014-08','ultron':'2015-05','antman':'2015-07','civilwar':'2016-05','doctorstrange1':'2016-11','guardians2':'2017-05','homecoming':'2017-07','ragnarok':'2017-11','blackpanther1':'2018-02','infinity':'2018-04','antwasp':'2018-07','captainmarvel':'2019-03','endgame':'2019-04','farfromhome':'2019-07','blackwidow':'2021-07','shang':'2021-09','eternals':'2021-11','spiderman':'2021-12','strange':'2022-05','loveandthunder':'2022-07','panther':'2022-11','quantumania':'2023-02','guardians3':'2023-05','themarvels':'2023-11','deadpool':'2024-07','capbrave':'2025-02','thunder':'2025-05','fantastic':'2025-07','brandnewday':'2026-07'};
for(const m of MCU)if(m.type==='pelicula'){m.release=movieDates[m.id]||m.year+'-07';if(map.has(m.id)&&map.get(m.id).release==null)map.get(m.id).release=m.release;}
const originalMatches=matches,originalUpdate=updateCard,originalComparator=comparator,originalSelect=selectMode,originalOpenEditor=openEditor;
matches=function(m){
 if(!originalMatches(m))return false;
 if(mode==='mcu'&&$('mediaSelect').value!=='all'&&(m.type||'pelicula')!==$('mediaSelect').value)return false;
 if(mode==='xmen'&&$('xmenFilter').value==='essential'&&!xmen.find(x=>x.id===m.id)?.recommended)return false;
 return true;
};
updateCard=function(m){
 originalUpdate(m);
 const c=cards.get(m.id);if(!c)return;
 if(mode==='mcu'){c.groupEl.textContent=(m.type==='serie'?'SERIE':'PELÍCULA')+(m.note?' · '+m.note:'');}
 else if(mode==='xmen')c.groupEl.textContent='PELÍCULA · MUTANTES';
 else c.groupEl.textContent=m.group;
};
comparator=function(a,b){
 const sort=$('sort').value;
 if(mode==='mcu'&&(sort==='original'||sort==='release'))return String(a.release||a.year).localeCompare(String(b.release||b.year))||Number(a.releaseOrder||0)-Number(b.releaseOrder||0);
 if(mode==='xmen'&&(sort==='original'||sort==='release'))return xmen.findIndex(x=>x.id===a.id)-xmen.findIndex(x=>x.id===b.id);
 return originalComparator(a,b);
};
function heading(type,title,detail){
 const el=document.createElement('div');el.className='catalog-divider '+type;el.setAttribute('role','heading');el.setAttribute('aria-level',type==='saga-heading'?'2':'3');
 const kicker=document.createElement('span');kicker.className='divider-kicker';kicker.textContent=type==='saga-heading'?'SAGA':'CAPÍTULO';const h=document.createElement('strong');h.textContent=title;
 const info=document.createElement('span');info.className='divider-info';info.textContent=detail||'';
 el.append(kicker,h,info);return el;
}
refresh=function(){
 updateStats();const grid=$('grid');grid.querySelectorAll('.card,.catalog-divider').forEach(c=>c.remove());
 const source=current().map(x=>map.get(x.id)||x).filter(matches);
 const ordered=[...source].sort(comparator);const frag=document.createDocumentFragment();
 const appendCard=m=>{const c=cards.get(m.id);if(!c)return;updateCard(m);c.card.hidden=false;frag.append(c.card);};
 if(mode==='mcu'){
  for(const saga of ['Saga del Infinito','Saga del Multiverso']){
   const group=ordered.filter(m=>m.saga===saga);if(!group.length)continue;
   frag.append(heading('saga-heading',saga,group.length+' títulos'));
   for(const p of (saga==='Saga del Infinito'?[1,2,3]:[4,5,6])){
    const part=group.filter(m=>m.phase===p);if(!part.length)continue;
    frag.append(heading('phase-heading','FASE '+p,`${part.filter(m=>m.type!=='serie').length} películas · ${part.filter(m=>m.type==='serie').length} series`));
    part.forEach(appendCard);
   }
  }
 }else if(mode==='xmen'){
  const main=ordered.filter(m=>xmen.find(x=>x.id===m.id)?.recommended);
  const rest=ordered.filter(m=>!xmen.find(x=>x.id===m.id)?.recommended);
  if(main.length){frag.append(heading('phase-heading','Ruta esencial · X-Men',main.length+' películas recomendadas'));main.forEach(appendCard);}
  if(rest.length){frag.append(heading('phase-heading','Historias complementarias',rest.length+' películas'));rest.forEach(appendCard);}
 }else ordered.forEach(appendCard);
 grid.insertBefore(frag,$('noResults'));
 for(const m of ordered){const c=cards.get(m.id);if(!c.posterLoaded){if(posterObserver)posterObserver.observe(c.card);else ensurePoster(map.get(m.id));}}
 $('noResults').classList.toggle('show',ordered.length===0);$('matches').textContent=ordered.length+(ordered.length===1?' título':' títulos');
};
selectMode=function(next){
 if(next===mode)return;
 if(next==='doom'||next==='mcu')originalSelect(next);
 else {mode='xmen';filter='all';document.querySelectorAll('#filters [data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));$('heroGrid').querySelector('.panel:first-child').hidden=true;$('heroGrid').classList.add('catalog-hero');$('sort').value='original';$('search').value='';$('priorityFilter').value='all';$('phaseSelect').value='all';$('sagaSelect').value='all';$('groupFilter').value='all';$('advancedFilters').open=false;}
 document.querySelectorAll('.mode-tab').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.mode===mode)));
 $('catalogFields').hidden=mode!=='mcu';$('catalogInfo').hidden=mode!=='mcu';$('xmenFields').hidden=mode!=='xmen';$('groupFilterBox').hidden=mode!=='doom';
 if(mode==='mcu'){$('pageIntro').textContent='38 películas y 20 series del UCM · Seis fases y dos sagas. Los separadores marcan cada etapa.';$('sectionTitle').textContent='Películas y series del Universo Marvel';$('progressTitle').textContent='Progreso del UCM';$('mediaSelect').value='all';}
 if(mode==='xmen'){$('pageTitle').innerHTML='UNIVERSO <span>X-MEN</span>';$('pageIntro').textContent='14 películas de los mutantes, con una ruta esencial recomendada para Doomsday. Orden de estreno.';$('sectionTitle').textContent='Universo cinematográfico de X-Men';$('progressTitle').textContent='Progreso mutante';$('xmenFilter').value='all';}
 if(mode==='doom'){$('pageIntro').textContent='Tus películas, tus prioridades. Toca el lápiz de cualquier póster para editarlo.';}
 refresh();window.scrollTo({top:0,behavior:'instant'});
};
openEditor=function(id,trigger){originalOpenEditor(id,trigger);const m=map.get(id);if(m){$('editCategory').textContent=mode==='mcu'?(m.type==='serie'?'SERIE · FASE '+m.phase:'PELÍCULA · FASE '+m.phase):mode==='xmen'?'UNIVERSO X-MEN · '+m.year:m.group+' · '+m.year;}};
const STORAGE_V4='doom_pwa_tracker_v4';
const storedV4=(()=>{try{const v=localStorage.getItem(STORAGE_V4);return v?JSON.parse(v):null;}catch{return null;}})();
if(storedV4&&Array.isArray(storedV4.entries)){
 for(const e of storedV4.entries)if(map.has(e.id)&&STATES.has(e.status)&&PRIORITIES.has(e.priority))data[e.id]={status:e.status,priority:e.priority};
}
save=function(){try{localStorage.setItem(STORAGE_V4,JSON.stringify({version:4,entries:ALL.map(m=>({id:m.id,...data[m.id]}))}));$('storageWarn').classList.remove('show');}catch(e){$('storageWarn').classList.add('show');notify('Sin almacenamiento: exporta tu respaldo JSON');}};
readBackup=function(o){
 if(!o||o.app!=='Doomsday Watchlist'||!Array.isArray(o.entries)&&o.version!==1)throw Error('Archivo no reconocido');
 if(o.version===4||o.version===3||o.version===2)return decodeEntries(o.entries,true);
 if(o.version===1&&Array.isArray(o.watched)){const result=defaults();for(const id of o.watched)if(map.has(id))result[id].status='watched';return result;}
 throw Error('Versión no compatible');
};
decodeEntries=function(entries,allowPartial=true){
 if(!Array.isArray(entries))throw Error('Respaldo sin entradas');
 const out={};for(const m of ALL)out[m.id]={status:'pending',priority:'medium'};
 if(!storedV4){for(const [id,value] of Object.entries(data))if(out[id])out[id]={...value};}
 const seen=new Set();for(const e of entries){if(!e||typeof e.id!=='string'||seen.has(e.id)||!STATES.has(e.status)||!PRIORITIES.has(e.priority))throw Error('Respaldo mal formado');seen.add(e.id);if(map.has(e.id))out[e.id]={status:e.status,priority:e.priority};}
 return out;
};
downloadBackup=function(){const o={app:'Doomsday Watchlist',version:4,exportedAt:new Date().toISOString(),entries:ALL.map(m=>({id:m.id,...data[m.id]}))};const blob=new Blob([JSON.stringify(o,null,2)],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='DOOMSDAY-respaldo-v4.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);notify('Respaldo JSON descargado');};
$('mediaSelect').addEventListener('change',refresh);$('xmenFilter').addEventListener('change',refresh);
xButton.addEventListener('click',()=>selectMode('xmen'));
document.documentElement.setAttribute('data-app-version','v5');
refresh();
})();
