(function v6Upgrade(){
"use strict";
const P="https://image.tmdb.org/t/p/w780/";
const patches={
 eyeswakanda:P+"bG23nZW96LxmWkJjsagRZI9hF6t.jpg",
 marvelzombies:"https://static.nexilia.it/mangaforever/2025/09/marvel_zombies_trailer-1.jpg",
 xmenlast:P+"a2xicU8DpKtRizOHjQLC1JyCSRS.jpg",
 apocalypse:P+"ikA8UhYdTGpqbatFa93nIf6noSr.jpg",
 visionquest:"https://image.tmdb.org/t/p/w780/6j60tGRAjBmWRPTOEwhW6oRbPMP.jpg",
 agatha:P+"mGsxKwXUjojitRv2E9qMTbxbBRd.jpg",
 friendlyspidey:"https://image.tmdb.org/t/p/w780/kjcsNeqF52YUQ2rUBGLMHwLkxvR.jpg",
 daredevilba:P+"xDUoAsU8lQHOOoRkFiBuarmACDN.jpg",
 daredevilba2:P+"xDUoAsU8lQHOOoRkFiBuarmACDN.jpg"
};
for(const [id,url] of Object.entries(patches)){
 const m=map.get(id);if(!m)continue;
 m.url=url;
 const c=cards.get(id);
 if(c){c.posterLoaded=false;const n=c.front;n.style.objectFit="contain";n.style.objectPosition="center";n.style.maxWidth="100%";n.style.maxHeight="100%";n.onerror=null;}
}
const oldPoster=setPoster;
setPoster=function(front,bg,m){
 const newm=map.get(m.id)||m;oldPoster(front,bg,newm);
 const urls=[newm.url].filter(Boolean);
 if(newm.id==="friendlyspidey")urls.push("https://www.flickeringmyth.com/wp-content/uploads/2024/12/your-friendly-nightborhood-spider-man.jpg");
 if(newm.id==="visionquest")urls.push(P+"bWPktguPGslrdM79SNQt4OWYyJS.jpg",P+"jzPwsojjFStf5lR5Nm07w2hH56G.jpg");
 if(newm.id==="marvelzombies")urls.push(P+"9xK6y7J4MoerGUqAxzWAGdlOK35.jpg");
 if(newm.id==="agatha")urls.push("https://cdn.marvel.com/content/2x/agatha_all_along_lob_crd_01.jpg");
 if(newm.id==="xmenlast")urls.push("https://www.impawards.com/2006/posters/x_men_three_ver1.jpg");
 if(newm.id==="apocalypse")urls.push("https://www.impawards.com/2016/posters/xmen_apocalypse_ver1.jpg");
 if(newm.id==="eyeswakanda")urls.push("https://cdn.marvel.com/content/2x/eyes_of_wakanda_lob_crd_01.jpg");
 if(newm.id==="daredevilba"||newm.id==="daredevilba2")urls.push("https://cdn.marvel.com/content/2x/daredevil_born_again_lob_crd_01.jpg");
 let idx=0;const apply=()=>{if(idx>=urls.length)return;const src=urls[idx++],im=new Image();im.referrerPolicy="no-referrer";im.onload=()=>{if(front.isConnected){front.src=src;bg.src=src;}};im.onerror=apply;im.src=src;};
 apply();
};

const nav=document.querySelector(".mode-nav"),head=document.querySelector("header.top"),main=document.querySelector("main.main");
if(!nav||!head||!main)return;
const bar=document.createElement("div");bar.className="v6-menu-bar";
const toggle=document.createElement("button");toggle.className="v6-toggle";toggle.type="button";toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-controls","v6-nav");toggle.innerHTML='<span class="v6-bars">☰</span> <span>MENÚ</span>';
const brand=document.createElement("div");brand.className="v6-brand";brand.innerHTML='<strong>DOOMSDAY</strong><small>MARVEL WATCH TRACKER</small>';
bar.append(toggle,brand);nav.before(bar);
nav.id="v6-nav";nav.classList.add("v6-nav");nav.setAttribute("role","navigation");nav.removeAttribute("aria-label");
const dark=document.createElement("div");dark.className="v6-shade";dark.hidden=true;document.body.append(dark);
const castBtn=document.createElement("button");castBtn.type="button";castBtn.className="mode-tab";castBtn.dataset.mode="cast";castBtn.innerHTML='Personajes de Doomsday<small>Confirmados, rumores e hipótesis</small>';nav.append(castBtn);
const navText={doom:"Camino a Doomsday",mcu:"Universo Marvel",xmen:"Universo X-Men",cast:"Personajes de Doomsday"};
function closeMenu(){document.body.classList.remove("v6-open");dark.hidden=true;toggle.setAttribute("aria-expanded","false");}
function openMenu(){document.body.classList.add("v6-open");dark.hidden=false;toggle.setAttribute("aria-expanded","true");}
toggle.onclick=()=>document.body.classList.contains("v6-open")?closeMenu():openMenu();
dark.onclick=closeMenu;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
const view=document.createElement("section");view.className="v6-cast-view";view.id="v6-cast-view";view.hidden=true;
view.innerHTML=`<div class="v6-cast-hero"><p class="v6-hero-overline">INTELIGENCIA MULTIVERSAL · NOV 2026</p><h2>PERSONAJES DE <span>DOOMSDAY</span></h2><p>Actores y personajes relacionados con la película. <strong>Confirmado</strong> significa anuncio de Disney o Marvel; <strong>rumor</strong> significa información no corroborada; <strong>posible</strong> es solo una hipótesis. Los pósteres son de obras previas, no nuevos carteles oficiales individuales.</p><a href="https://thewaltdisneycompany.com/news/marvel-studios-avengers-doomsday-cast/" target="_blank" rel="noopener">Fuente oficial: Disney, reparto de Avengers: Doomsday</a></div><div class="v6-cast-controls"><input id="v6-cast-search" type="search" placeholder="Buscar personaje o actor…" aria-label="Buscar personaje o actor"><select id="v6-cast-filter" aria-label="Nivel de confirmación"><option value="all">Todos los personajes</option><option value="official">Confirmados oficialmente</option><option value="rumor">Rumores y filtraciones</option><option value="possible">Posibles, sin confirmación</option></select></div><p class="v6-cast-count" aria-live="polite"></p><div id="v6-cast-grid" class="v6-cast-grid"></div><p class="v6-data-note">Actualizado el 21 de noviembre de 2026. Las apariciones enumeran películas y series principales en las que apareció cada versión del personaje, no toda su filmografía. Reparto sujeto a cambios.</p>`;
main.before(view);
const official=[
["Doctor Doom / Victor von Doom","Robert Downey Jr.","Nuevo personaje: ninguna aparición previa de esta versión de Doom; el actor interpretó a Tony Stark en Iron Man y Avengers.","fantastic"],
["Steve Rogers / Capitán América","Chris Evans","Capitán América: El primer vengador · The Avengers · El soldado del invierno · Civil War · Infinity War · Endgame","endgame"],
["Thor","Chris Hemsworth","Thor · The Avengers · The Dark World · Age of Ultron · Ragnarok · Infinity War · Endgame · Love and Thunder","ragnarok"],
["Sam Wilson / Capitán América","Anthony Mackie","The Winter Soldier · Age of Ultron · Ant-Man · Civil War · Infinity War · Endgame · The Falcon and the Winter Soldier · Brave New World","capbrave"],
["Reed Richards / Mr. Fantástico","Pedro Pascal","Los 4 Fantásticos: Primeros pasos","fantastic"],
["Sue Storm / Mujer Invisible","Vanessa Kirby","Los 4 Fantásticos: Primeros pasos","fantastic"],
["Johnny Storm / Antorcha Humana","Joseph Quinn","Los 4 Fantásticos: Primeros pasos","fantastic"],
["Ben Grimm / La Mole","Ebon Moss-Bachrach","Los 4 Fantásticos: Primeros pasos","fantastic"],
["Bucky Barnes / Soldado del Invierno","Sebastian Stan","The Winter Soldier · Civil War · Black Panther · Infinity War · Endgame · The Falcon and the Winter Soldier · Thunderbolts*","thunder"],
["Shuri / Pantera Negra","Letitia Wright","Black Panther · Infinity War · Endgame · Wakanda Forever","panther"],
["M’Baku","Winston Duke","Black Panther · Infinity War · Endgame · Wakanda Forever","panther"],
["Namor","Tenoch Huerta Mejía","Black Panther: Wakanda Forever","panther"],
["Namora","Mabel Cadena","Black Panther: Wakanda Forever","panther"],
["Attuma","Alex Livinalli","Black Panther: Wakanda Forever","panther"],
["Scott Lang / Ant-Man","Paul Rudd","Ant-Man · Civil War · Ant-Man and the Wasp · Endgame · Quantumania","quantumania"],
["Cassie Lang","Kathryn Newton","Ant-Man and the Wasp: Quantumania (interpretada por Kathryn Newton)","quantumania"],
["Yelena Belova","Florence Pugh","Black Widow · Hawkeye · Thunderbolts*","thunder"],
["Alexei Shostakov / Red Guardian","David Harbour","Black Widow · Thunderbolts*","thunder"],
["John Walker / U.S. Agent","Wyatt Russell","The Falcon and the Winter Soldier · Thunderbolts*","thunder"],
["Ava Starr / Ghost","Hannah John-Kamen","Ant-Man and the Wasp · Thunderbolts*","thunder"],
["Bob Reynolds / Sentry","Lewis Pullman","Thunderbolts*","thunder"],
["Shang-Chi","Simu Liu","Shang-Chi y la leyenda de los Diez Anillos","shang"],
["Loki","Tom Hiddleston","Thor · The Avengers · The Dark World · Ragnarok · Infinity War · Endgame · Loki (temporadas 1 y 2)","loki"],
["Charles Xavier / Profesor X","Patrick Stewart","X-Men · X2 · The Last Stand · The Wolverine (escena) · Days of Future Past · Logan (continuidad alternativa) · Doctor Strange in the Multiverse of Madness (variante)","xmen"],
["Erik Lehnsherr / Magneto","Ian McKellen","X-Men · X2 · The Last Stand · The Wolverine (escena) · Days of Future Past","xmen"],
["Scott Summers / Cíclope","James Marsden","X-Men · X2 · The Last Stand · Days of Future Past","xmen"],
["Raven Darkhölme / Mystique","Rebecca Romijn","X-Men · X2 · The Last Stand · First Class (cameo)","xmen"],
["Kurt Wagner / Nightcrawler","Alan Cumming","X2: X-Men United","x2"],
["Hank McCoy / Beast","Kelsey Grammer","The Last Stand · Days of Future Past · The Marvels (escena poscréditos)","xmenlast"],
["Remy LeBeau / Gambit","Channing Tatum","Deadpool & Wolverine","deadpool"],
["Peggy Carter","Hayley Atwell","Captain America: The First Avenger · The Winter Soldier · Ant-Man · Endgame · Agent Carter · What If...? · Doctor Strange in the Multiverse of Madness (variante)","cap1"],
["Joaquín Torres / Falcon","Danny Ramirez","The Falcon and the Winter Soldier · Captain America: Brave New World","capbrave"]
];
const rumor=[
["Wanda Maximoff / Bruja Escarlata","Elizabeth Olsen","Age of Ultron · Civil War · Infinity War · Endgame · WandaVision · Multiverse of Madness · VisionQuest","strange","Rumor de rodaje; no figura en la lista oficial de reparto."],
["Logan / Wolverine","Hugh Jackman","X-Men · X2 · The Last Stand · Origins · The Wolverine · Days of Future Past · Logan · Deadpool & Wolverine","deadpool","Su presencia se ha rumoreado, no confirmada."],
["Wade Wilson / Deadpool","Ryan Reynolds","Deadpool · Deadpool 2 · Deadpool & Wolverine","deadpool","Rumores sobre su participación, sin confirmación oficial."],
["Peter Parker / Spider-Man (Raimi)","Tobey Maguire","Spider-Man · Spider-Man 2 · Spider-Man 3 · No Way Home","spiderman","Rumores de un enfrentamiento multiversal, sin anuncio de Marvel."],
["Doctor Strange","Benedict Cumberbatch","Doctor Strange · Infinity War · Endgame · No Way Home · Multiverse of Madness","strange","Se ha especulado sobre su regreso, no confirmado oficialmente."],
["Peter Parker / Spider-Man (UCM)","Tom Holland","Civil War · Homecoming · Infinity War · Endgame · Far From Home · No Way Home · Brand New Day","spiderman","El actor no aparece entre los nombres confirmados."],
["Vision","Paul Bettany","Age of Ultron · Civil War · Infinity War · WandaVision · VisionQuest","visionquest","Referencias a rodajes próximos no confirman su aparición."],
["Kate Bishop / Hawkeye","Hailee Steinfeld","Hawkeye · The Marvels (cameo)","hawkeye","Aparición sugerida por reportes no oficiales."],
["Bruce Banner / Hulk","Mark Ruffalo","The Avengers · Age of Ultron · Thor: Ragnarok · Infinity War · Endgame · Shang-Chi (escena) · She-Hulk","endgame","Su presencia se menciona en rumores, pero no aparece en la ficha oficial de Disney."]
];
const possible=[
["Carol Danvers / Capitana Marvel","Brie Larson","Captain Marvel · Endgame · The Marvels","captainmarvel","Narrativamente posible por la trama multiversal, sin anuncio."],
["Kamala Khan / Ms. Marvel","Iman Vellani","Ms. Marvel · The Marvels","msmarvel","Hipótesis por su conexión con el universo mutante."],
["Nick Fury","Samuel L. Jackson","Iron Man · The Avengers · Winter Soldier · Infinity War · Endgame · Captain Marvel · Secret Invasion · The Marvels","captainmarvel","Personaje vinculado a varios equipos, sin confirmación."],
["America Chavez","Xochitl Gomez","Doctor Strange in the Multiverse of Madness","strange","Posible por sus poderes multiversales; no hay anuncio."]
];
const people=[
...official.map((r,i)=>({name:r[0],actor:r[1],works:r[2],poster:r[3],status:"official",note:i===0?"Nuevo papel anunciado oficialmente para Robert Downey Jr.":""})),
...rumor.map(r=>({name:r[0],actor:r[1],works:r[2],poster:r[3],status:"rumor",note:r[4]})),
...possible.map(r=>({name:r[0],actor:r[1],works:r[2],poster:r[3],status:"possible",note:r[4]}))
];
const characterPortraits={"Robert Downey Jr.":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-doctor-doom.jpg?resize=1086%2C1609&ssl=1","zoom":1,"ox":50,"oy":50,"kind":"DOOMSDAY · póster individual oficial"},"Chris Evans":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-thor-steve-rogers.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":100,"oy":32,"kind":"DOOMSDAY · póster oficial recortado"},"Chris Hemsworth":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-thor-steve-rogers.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":0,"oy":32,"kind":"DOOMSDAY · póster oficial recortado"},"Anthony Mackie":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-captain-america-cyclops.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":0,"oy":50,"kind":"DOOMSDAY · póster oficial recortado"},"Pedro Pascal":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-professor-x-mr-fantastic.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":100,"oy":24,"kind":"DOOMSDAY · póster oficial recortado"},"Vanessa Kirby":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-sue-storm-namor.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":0,"oy":68,"kind":"DOOMSDAY · póster oficial recortado"},"Joseph Quinn":{"url":"https://www.newdvdreleasedates.com/images/posters/large/the-fantastic-four-first-steps-2025-06.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · obra anterior"},"Ebon Moss-Bachrach":{"url":"https://m.media-amazon.com/images/M/MV5BNWZlZWEyMzItZDFiOS00ZmY4LWJhOTItMmZiODQyNzJjNjI3XkEyXkFqcGc%40._V1_.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · obra anterior"},"Sebastian Stan":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-bucky-shang-chi.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":0,"oy":40,"kind":"DOOMSDAY · póster oficial recortado"},"Letitia Wright":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-magneto-black-panther.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":100,"oy":34,"kind":"DOOMSDAY · póster oficial recortado"},"Winston Duke":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-mbaku-nightcrawler.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":0,"oy":44,"kind":"DOOMSDAY · póster oficial recortado"},"Tenoch Huerta Mejía":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-sue-storm-namor.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":100,"oy":28,"kind":"DOOMSDAY · póster oficial recortado"},"Mabel Cadena":{"url":"https://xyz.comic.systems/images/Disney/Marvel-BlackPantherWakandaForever/Marvel-BlackPantherWakandaForever-affiche-19368","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Wakanda Forever"},"Alex Livinalli":{"url":"https://xyz.comic.systems/images/Disney/Marvel-BlackPantherWakandaForever/Marvel-BlackPantherWakandaForever-affiche-19369","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Wakanda Forever"},"Paul Rudd":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-red-guardian-ant-man.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":100,"oy":30,"kind":"DOOMSDAY · póster oficial recortado"},"Kathryn Newton":{"url":"https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/75D6BE005F3DA8A31997BBB857C72F58E2D2BB425C9219DA4577E04DC4DF58E3/compose?format=webp&width=1280","zoom":1,"ox":49,"oy":50,"kind":"FOTOGRAMA OFICIAL · Disney+"},"Florence Pugh":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-gambit-yelena.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":100,"oy":72,"kind":"DOOMSDAY · póster oficial recortado"},"David Harbour":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-red-guardian-ant-man.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":0,"oy":75,"kind":"DOOMSDAY · póster oficial recortado"},"Wyatt Russell":{"url":"https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/B4ADC09C83184A5D561CE95BD040D6B7B27030C9E181E4359E3BD3DD206521C6/compose?format=webp&width=1280","zoom":1,"ox":55,"oy":50,"kind":"FOTOGRAMA OFICIAL · Disney+"},"Hannah John-Kamen":{"url":"https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/386872E3E771AF98DC8193C461687EA9104CD9A48ADA6098FD25B0CBFFD7BBCC/compose?format=webp&width=1280","zoom":1,"ox":38,"oy":50,"kind":"FOTOGRAMA OFICIAL · Disney+"},"Lewis Pullman":{"url":"https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/4FD0C945B4F5AF4563F2B6E6372BBF235BCCD6DDF3254D472AFA3E9515A784D7/compose?format=webp&width=1280","zoom":1,"ox":50,"oy":50,"kind":"FOTOGRAMA OFICIAL · Disney+"},"Simu Liu":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-bucky-shang-chi.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":100,"oy":38,"kind":"DOOMSDAY · póster oficial recortado"},"Tom Hiddleston":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-mystique-loki.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":100,"oy":24,"kind":"DOOMSDAY · póster oficial recortado"},"Patrick Stewart":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-professor-x-mr-fantastic.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":0,"oy":68,"kind":"DOOMSDAY · póster oficial recortado"},"Ian McKellen":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-magneto-black-panther.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":0,"oy":48,"kind":"DOOMSDAY · póster oficial recortado"},"James Marsden":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-captain-america-cyclops.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":100,"oy":28,"kind":"DOOMSDAY · póster oficial recortado"},"Rebecca Romijn":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-mystique-loki.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":0,"oy":70,"kind":"DOOMSDAY · póster oficial recortado"},"Alan Cumming":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-mbaku-nightcrawler.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":100,"oy":42,"kind":"DOOMSDAY · póster oficial recortado"},"Kelsey Grammer":{"url":"https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/98B52B76965105E2F4E1E3516770EA3DE14BB7FBD9D2E4D65873A69DD9EFA07F/compose?format=webp&width=1280","zoom":1,"ox":50,"oy":50,"kind":"FOTOGRAMA OFICIAL · Disney+"},"Channing Tatum":{"url":"https://i0.wp.com/popculturepit.com/wp-content/uploads/2026/11/avengers-doomsday-poster-gambit-yelena.jpg?resize=1086%2C1609&ssl=1","zoom":1.78,"ox":0,"oy":28,"kind":"DOOMSDAY · póster oficial recortado"},"Hayley Atwell":{"url":"https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/291582FDC064E37BFE2DFF3EFC8F841E01DB743F8A556ACF5BD946D92A8A7451/compose?format=webp&width=1280","zoom":1,"ox":50,"oy":50,"kind":"FOTOGRAMA OFICIAL · Disney+"},"Danny Ramirez":{"url":"https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/A9A329354E5790CCF71B67A9A545498E3DC2B4E2469A2B41E2AE40D30084ADE7/compose?format=webp&width=1280","zoom":1,"ox":50,"oy":50,"kind":"FOTOGRAMA OFICIAL · Disney+"},"Elizabeth Olsen":{"url":"https://cdn.marvel.com/content/2x/sv_specialod_72x48_scarletwitch_v2_lg.webp","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Multiverse of Madness"},"Hugh Jackman":{"url":"https://images.squarespace-cdn.com/content/571e7cc14c2f859b347c0167/1489967363338-AJV5517BYT75B0D7F04T/poster%2B-%2BLogan.jpg?content-type=image%2Fjpeg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Logan"},"Ryan Reynolds":{"url":"https://image.tmdb.org/t/p/w780/3E53WEZJqP6aM84D8CckXx4pIHw.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Deadpool"},"Tobey Maguire":{"url":"https://www.impawards.com/2002/posters/spiderman_ver1.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Spider-Man (2002)"},"Benedict Cumberbatch":{"url":"https://r2-media.wdwnt.com/2022/04/doctor-strange-character-poster-1.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Multiverse of Madness"},"Tom Holland":{"url":"https://2.bp.blogspot.com/-3Gf0qeyXwwc/XRPgJVhafzI/AAAAAAAAEEw/YSeqlND1ACgocK2hzuMdj_uafNs0iiMnQCKgBGAs/w1080-h1920-p-k-no-nu/peter-parker-spiderman-far-from-home-tom-holland-uhdpaper.com-8K-36.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · obra anterior"},"Paul Bettany":{"url":"https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/4294/thumb_fb89f2e65d1e0a350bdbf20f4ec5ba22.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · VisionQuest"},"Hailee Steinfeld":{"url":"https://celebmafia.com/wp-content/uploads/2021/11/hailee-steinfeld-hawkeye-posters-2021-3.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Hawkeye"},"Mark Ruffalo":{"url":"https://lumiere-a.akamaihd.net/v1/images/th_avengers-endgame_12495_12523_12463_65288_12502_12523_953bc921.jpeg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Endgame"},"Brie Larson":{"url":"https://image.tmdb.org/t/p/w780/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Captain Marvel"},"Iman Vellani":{"url":"https://wegotthiscovered.com/wp-content/uploads/2022/05/20220529_191140.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Ms. Marvel"},"Samuel L. Jackson":{"url":"https://www.impawards.com/2023/posters/marvels_ver12_xlg.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · The Marvels"},"Xochitl Gomez":{"url":"https://assets.dev-filo.dift.io/img/2022/04/12/strange2.jpg_344325628.jpg","zoom":1,"ox":50,"oy":50,"kind":"PÓSTER INDIVIDUAL · Multiverse of Madness"}};
const statusName={official:"CONFIRMADO OFICIAL",rumor:"RUMOR · SIN CONFIRMAR",possible:"HIPÓTESIS · NO CONFIRMADA"};
const grid=view.querySelector("#v6-cast-grid"),search=view.querySelector("#v6-cast-search"),selector=view.querySelector("#v6-cast-filter"),amount=view.querySelector(".v6-cast-count");
function posterOf(id){return map.get(id)?.url||MCU.find(x=>x.id===id)?.url||DOOM.find(x=>x.id===id)?.url||""}
function initialPoster(name){return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600"><rect width="400" height="600" fill="#071a0e"/><text x="200" y="280" text-anchor="middle" font-size="27" font-family="Arial" fill="#8ef4ac">DOOMSDAY</text><text x="200" y="325" text-anchor="middle" font-size="19" fill="white">'+name.slice(0,20).replace(/&/g,'&amp;')+'</text></svg>')}
function renderCast(){
 const q=search.value.trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),filter=selector.value;
 const visible=people.filter(x=>(filter==="all"||filter===x.status)&&(!q||[x.name,x.actor,x.works].join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(q)));
 grid.replaceChildren();amount.textContent=`${visible.length} personajes · ${official.length} confirmados · ${rumor.length} rumores · ${possible.length} hipótesis`;
 
const teamOrder=["Doctor Doom","Avengers","4 Fantásticos","X-Men","Nuevos Avengers","Wakanda y Talokan","Otros aliados"];
const teams={
"Doctor Doom":["Robert Downey Jr."],
"Avengers":["Chris Evans","Chris Hemsworth","Anthony Mackie","Paul Rudd","Simu Liu"],
"4 Fantásticos":["Pedro Pascal","Vanessa Kirby","Joseph Quinn","Ebon Moss-Bachrach"],
"X-Men":["Patrick Stewart","Ian McKellen","James Marsden","Rebecca Romijn","Alan Cumming","Kelsey Grammer","Channing Tatum"],
"Nuevos Avengers":["Florence Pugh","Sebastian Stan","Wyatt Russell","David Harbour","Hannah John-Kamen","Lewis Pullman"],
"Wakanda y Talokan":["Letitia Wright","Winston Duke","Tenoch Huerta Mejía","Mabel Cadena","Alex Livinalli"],
"Otros aliados":["Tom Hiddleston","Hayley Atwell","Danny Ramirez","Kathryn Newton"]};
const teamOf=p=>Object.keys(teams).find(t=>teams[t].includes(p.actor))||"Otros aliados";
const ranks={official:0,rumor:1,possible:2};
visible.sort((a,b)=>ranks[a.status]-ranks[b.status]||(a.status==="official"?teamOrder.indexOf(teamOf(a))-teamOrder.indexOf(teamOf(b)):0));
let prevStatus=null,prevTeam=null;
for(const p of visible){
 if(p.status!==prevStatus){prevStatus=p.status;prevTeam=null;
  const h=document.createElement("div");h.className="v7-cast-heading v7-level-"+p.status;h.setAttribute("role","heading");h.setAttribute("aria-level","2");
  const count=visible.filter(x=>x.status===p.status).length;
  h.innerHTML='<span>'+({official:"ELENCO CONFIRMADO POR MARVEL",rumor:"REPORTES Y FILTRACIONES · SIN CONFIRMAR",possible:"HIPÓTESIS NARRATIVAS · NO CONFIRMADAS"})[p.status]+'</span><small>'+count+' personajes</small>';
  grid.append(h);
 }
 if(p.status==="official"&&teamOf(p)!==prevTeam){prevTeam=teamOf(p);
  const h=document.createElement("div");h.className="v7-team-heading";h.setAttribute("role","heading");h.setAttribute("aria-level","3");h.textContent=prevTeam;grid.append(h);
 }
 const card=document.createElement("article");card.className="v6-person";card.dataset.status=p.status;
 
const media=document.createElement("div");media.className="v6-person-poster v7-individual";
const im=document.createElement("img");im.loading="lazy";im.decoding="async";im.referrerPolicy="no-referrer";
const pic=characterPortraits[p.actor];
const fallback=posterOf(p.poster)||initialPoster(p.name);
im.alt="Retrato individual de "+p.name+" ("+(pic?.kind||"obra anterior")+")";
if(pic){
 im.src=pic.url; im.style.objectFit="cover";
 im.style.transform="scale("+(pic.zoom||1)+")";
 im.style.transformOrigin=(pic.ox??50)+"% "+(pic.oy??50)+"%";
 if((pic.zoom||1)===1)im.style.objectPosition=(pic.ox??50)+"% "+(pic.oy??50)+"%";
}else im.src=fallback;
let didFallback=false;
im.onerror=()=>{
 if(!didFallback&&im.src!==fallback){didFallback=true;im.style.transform="none";im.style.objectFit="contain";im.src=fallback;}
 else{im.onerror=null;im.src=initialPoster(p.name);}
};
const origin=document.createElement("span");origin.className="v7-source-label";origin.textContent=pic?.kind||"ARTE DE PRODUCCIÓN ANTERIOR";
media.append(im,origin);
 const body=document.createElement("div");body.className="v6-person-body";
 const badge=document.createElement("span");badge.className="v6-status";badge.textContent=statusName[p.status];
 const h=document.createElement("h3");h.textContent=p.name;const a=document.createElement("p");a.className="v6-actor";a.textContent=p.actor;
 const lab=document.createElement("p");lab.className="v6-works-label";lab.textContent="APARICIONES PREVIAS";const works=document.createElement("p");works.className="v6-works";works.textContent=p.works;
 body.append(badge,h,a,lab,works);
 if(p.note){const note=document.createElement("p");note.className="v6-person-note";note.textContent=p.note;body.append(note)}
 card.append(media,body);grid.append(card);
 }
}
search.addEventListener("input",renderCast);selector.addEventListener("change",renderCast);
renderCast();
let oldTitle="",oldIntro="";
nav.addEventListener("click",e=>{
 const b=e.target.closest("[data-mode]");if(!b)return;
 closeMenu();
 if(b.dataset.mode!=="cast"){
 nav.querySelectorAll(".mode-tab").forEach(btn=>btn.setAttribute("aria-selected",String(btn===b)));
 if(document.body.classList.contains("v6-cast-mode")){
 document.body.classList.remove("v6-cast-mode");view.hidden=true;$("pageTitle").innerHTML=oldTitle;$("pageIntro").textContent=oldIntro;
 }
 toggle.setAttribute("aria-label","Abrir menú. Sección actual: "+navText[b.dataset.mode]);
 try{localStorage.setItem("doomsday_last_menu_mode",b.dataset.mode)}catch{}
 }
},true);
castBtn.addEventListener("click",()=>{
 if(!document.body.classList.contains("v6-cast-mode")){oldTitle=$("pageTitle").innerHTML;oldIntro=$("pageIntro").textContent;}
 document.body.classList.add("v6-cast-mode");view.hidden=false;
 $("pageTitle").innerHTML='PERSONAJES <span>DOOMSDAY</span>';$("pageIntro").textContent="Elenco confirmado por Disney, filtraciones y apariciones posibles, sin mezclarlas.";
 nav.querySelectorAll(".mode-tab").forEach(b=>b.setAttribute("aria-selected",String(b===castBtn)));
 toggle.setAttribute("aria-label","Abrir menú. Sección actual: personajes de Doomsday");
 renderCast();window.scrollTo({top:0,behavior:"instant"});
});
function decorate(){
 document.querySelectorAll(".catalog-divider").forEach(el=>{
  const t=el.querySelector("strong")?.textContent||"";
  const ph=t.match(/FASE\s*([1-6])/i);if(ph)el.dataset.phase=ph[1];
  else if(t.toLowerCase().includes("infinito"))el.dataset.saga="infinity";
  else if(t.toLowerCase().includes("multiverso"))el.dataset.saga="multiverse";
  else if(t.includes("X-Men"))el.dataset.saga="xmen";
 });
}
const oldRefresh=refresh;
refresh=function(){oldRefresh();decorate()};
refresh();
document.documentElement.dataset.appVersion="v6";
})();
