<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Mini App - GotSport (local)</title>
  <style>
    :root{--bg:#f4f6f8;--card:#fff;--accent:#0369a1;--accent-2:#0ea5a3;--muted:#6b7280;--success:#16a34a;--danger:#dc2626;--gray:#9ca3af}
    *{box-sizing:border-box}
    body{font-family:Inter,ui-sans-serif,system-ui,Arial,sans-serif;background:var(--bg);margin:0;color:#111}
    header{background:linear-gradient(90deg,#0ea5a3, #0369a1);color:white;padding:14px 20px;display:flex;align-items:center;justify-content:space-between}
    header h1{font-size:18px;margin:0}
    .container{max-width:1200px;margin:22px auto;padding:12px}
    .layout{display:grid;grid-template-columns:380px 1fr;gap:16px}

    /* left ranking */
    .card{background:var(--card);border-radius:12px;padding:12px;box-shadow:0 2px 8px rgba(2,6,23,0.06)}
    .ranking-table{width:100%;border-collapse:collapse}
    .ranking-row{display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:8px;gap:8px}
    .ranking-row:hover{background:#f1f5f9;cursor:pointer}
    .team-meta{display:flex;align-items:center;gap:12px}
    .logo{width:48px;height:48px;border-radius:8px;background:#e6eef2;display:flex;align-items:center;justify-content:center;overflow:hidden}
    .logo img{width:100%;height:100%;object-fit:cover}

    .controls{display:flex;gap:8px;margin-top:10px}
    .btn{padding:8px 10px;border-radius:8px;border:none;background:var(--accent);color:white;cursor:pointer}
    .btn.ghost{background:transparent;color:var(--accent);border:1px solid rgba(3,105,161,0.12)}
    .small{padding:6px 8px;font-size:13px}

    /* right panel */
    .team-header{display:flex;justify-content:space-between;align-items:center;gap:10px}
    .team-title{display:flex;gap:12px;align-items:center}
    .big-logo{width:84px;height:84px;border-radius:10px;background:#eef3f6;overflow:hidden;display:flex;align-items:center;justify-content:center}
    .tabs{display:flex;gap:6px;margin-top:12px}
    .tab{padding:8px 10px;border-radius:8px;cursor:pointer;background:transparent;border:1px solid transparent}
    .tab.active{background:#eef2ff;border-color:#c7d2fe}

    .section{margin-top:12px}
    .list-item{background:#fff;border-radius:8px;padding:10px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 1px 2px rgba(2,6,23,0.04)}
    .match-line{display:flex;gap:14px;align-items:center}
    .result{padding:6px 10px;border-radius:8px;font-weight:700}
    .result.green{background:var(--success);color:white}
    .result.red{background:var(--danger);color:white}
    .result.gray{background:#9ca3af;color:white}

    /* forms */
    .form-row{display:flex;gap:8px}
    input[type=text], input[type=number], input[type=date], input[type=time], select{padding:8px;border-radius:8px;border:1px solid #e6e9ee;background:#fbfdff}
    .file{padding:8px}

    /* achievements */
    .progress{height:12px;background:#eef2f7;border-radius:999px;overflow:hidden}
    .progress > i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--accent-2));}

    /* stats grid */
    .stats{display:flex;gap:12px;margin-top:10px}
    .stat{background:#fff;padding:10px;border-radius:8px;flex:1;text-align:center}

    /* publish / admin */
    .admin-bar{display:flex;gap:8px;align-items:center}
    .readonly{opacity:0.6}

    footer{max-width:1200px;margin:24px auto;text-align:center;color:var(--muted)}

    .category-select{margin-left:8px;padding:6px;border-radius:8px;border:1px solid rgba(0,0,0,0.06)}
    @media(max-width:900px){.layout{grid-template-columns:1fr;}.logo{width:40px;height:40px}}
  </style>
</head>
<body>
<header>
  <h1>GotSport - Mini App (local)</h1>
  <div style="display:flex;align-items:center;gap:10px">
    <div id="statusMsg" style="font-size:13px;opacity:0.95"></div>
    <div class="admin-bar">
      <button class="btn small" id="adminBtn">Modo Admin</button>
      <button class="btn ghost small" id="publishBtn">Publicar</button>
    </div>
  </div>
</header>

<div class="container">
  <div class="layout">
    <div>
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <strong>Ranking</strong>
          <div>
            <!-- New: category select -->
            <select id="categorySelect" class="category-select" onchange="render()">
              <option value="all">Todas</option>
              <option value="U14">U14</option>
              <option value="U15" selected>U15</option>
              <option value="U16">U16</option>
              <option value="U17">U17</option>
            </select>

            <!-- existing ranking filter -->
            <select id="rankingFilter" onchange="render()">
              <option value="all">Todos niveles</option>
              <option value="national">Nacional</option>
              <option value="region">Regional</option>
              <option value="state">Estatal</option>
            </select>

            <!-- Add Team button (will be hidden for non-admins) -->
            <button class="btn small" id="addTeamBtn">+ Equipo</button>
          </div>
        </div>
        <div id="rankingList" style="margin-top:12px"></div>
      </div>

      <div class="card" style="margin-top:12px">
        <strong>Controles</strong>
        <div style="margin-top:8px" class="controls">
          <!-- Import/Export/Reset (Import & Reset hidden for non-admins) -->
          <button class="btn ghost small" id="importBtn">Importar</button>
          <button class="btn ghost small" id="exportBtn">Exportar</button>
          <button class="btn ghost small" id="resetBtn">Reset</button>
        </div>
        <div style="font-size:12px;color:var(--muted);margin-top:8px">Comparte el archivo HTML para que otros vean (sólo lectura). Para editar hace falta la contraseña.</div>
      </div>
    </div>

    <div>
      <div id="rightPanel" class="card readonly">
        <div class="team-header">
          <div class="team-title">
            <div class="big-logo" id="bigLogo">G</div>
            <div>
              <div id="teamNameLarge">Selecciona un equipo</div>
              <div style="color:var(--muted);font-size:13px" id="teamMeta">Puntos • Partidos • Win%</div>
            </div>
          </div>
          <div>
            <div style="display:flex;gap:8px">
              <!-- these are hidden for non-admins -->
              <button class="btn small" id="editTeamBtn">Editar</button>
              <button class="btn ghost small" id="deleteTeamBtn">Eliminar</button>
            </div>
          </div>
        </div>

        <div class="tabs" id="tabs"></div>

        <div id="tabContent" class="section"></div>
      </div>
    </div>
  </div>
</div>

<footer>Mini app creada localmente • <span id="footerGenerated"></span> • Última modificación: <span id="footerModified"></span></footer>

<!-- Modals and hidden forms -->
<div id="modalRoot"></div>

<script>
// --- CONFIG & STATE ---
const ADMIN_PASS = 'santiago.80113105';
const STORAGE_KEY = 'mini_gotsport_v3'; // bump version if needed
let isAdmin = false;               // <-- initial mode visitor (false). Login toggles to true.
let published = false;
let data = { teams: [], published: false };
let selectedTeamId = null;

// Ensure every team has a category (used after load)
function ensureTeamCategories(){
  (data.teams || []).forEach(t => { if(!t.category) t.category = 'U15'; });
}

// Utils
const uid = (p='')=> 'id'+Date.now()+Math.floor(Math.random()*1000)+p;
function updateFooterDates(){ const genEl=document.getElementById('footerGenerated'); const modEl=document.getElementById('footerModified'); if(genEl) genEl.innerText = 'Generado: ' + (data.generated ? new Date(data.generated).toLocaleString() : '—'); if(modEl) modEl.innerText = (data.lastModified ? new Date(data.lastModified).toLocaleString() : '—'); }
function save(){ data.lastModified = new Date().toISOString(); localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); updateFooterDates(); }
function load(){ const r=localStorage.getItem(STORAGE_KEY); if(r){ try{data=JSON.parse(r);}catch(e){console.error(e); data={teams:[]};}} else { seed(); data.generated = new Date().toISOString(); save(); } ensureTeamCategories(); document.getElementById('statusMsg').innerText = data.published? 'PÁGINA PUBLICADA (modo sólo lectura para visitantes)':'No publicada'; published = !!data.published; data.generated = data.generated || new Date().toISOString(); updateFooterDates(); updateAdminUI(); }

// --- SEED EXAMPLE (con categoría añadida) ---
function seed(){ data={teams:[
  {id:'t1',name:'Miami Rush',logo:null,level:'national',category:'U15',ranking:1,points:9,played:4,wins:3,draws:0,losses:1,goalsFor:8,achievements:[{id:'a1',title:'Campeón regional',done:true}],formation:['A','B','C'],matches:[],history:[]},
  {id:'t2',name:'Inter Juniors',logo:null,level:'region',category:'U15',ranking:2,points:6,played:4,wins:2,draws:0,losses:2,goalsFor:5,achievements:[],formation:[],matches:[],history:[]}
]}; }

// --- ADMIN UI SHOW/HIDE ---
function updateAdminUI(){
  // static buttons
  const show = !!isAdmin;
  const addTeamBtn = document.getElementById('addTeamBtn');
  const importBtn = document.getElementById('importBtn');
  const resetBtn = document.getElementById('resetBtn');
  const editTeamBtn = document.getElementById('editTeamBtn');
  const deleteTeamBtn = document.getElementById('deleteTeamBtn');

  if(addTeamBtn) addTeamBtn.style.display = show ? 'inline-block' : 'none';
  if(importBtn) importBtn.style.display = show ? 'inline-block' : 'none';
  if(resetBtn) resetBtn.style.display = show ? 'inline-block' : 'none';
  if(editTeamBtn) editTeamBtn.style.display = show ? 'inline-block' : 'none';
  if(deleteTeamBtn) deleteTeamBtn.style.display = show ? 'inline-block' : 'none';

  // status message update
  if(isAdmin) document.getElementById('statusMsg').innerText = data.published? 'PÁGINA PUBLICADA (admin)':'Modo admin (editable)';
  else document.getElementById('statusMsg').innerText = data.published? 'PÁGINA PUBLICADA (modo sólo lectura para visitantes)':'No publicada';
}

// Wire static buttons
function wireStaticButtons(){ 
  document.getElementById('adminBtn').addEventListener('click', handleAdmin); 
  document.getElementById('publishBtn').addEventListener('click', handlePublish); 
  document.getElementById('addTeamBtn').addEventListener('click', ()=>{ if(!isAdmin){alert('Solo admin');return;} openTeamForm();}); 
  document.getElementById('exportBtn').addEventListener('click', handleExport); 
  document.getElementById('importBtn').addEventListener('click', ()=>{ if(!isAdmin){alert('Solo admin');return;} handleImport();}); 
  document.getElementById('resetBtn').addEventListener('click', ()=>{ if(!isAdmin){alert('Solo admin');return;} if(confirm('Resetear datos y reemplazar por ejemplo?')){ seed(); save(); render(); }});
}

// Action handlers
function handleAdmin(){ const pass = prompt('Ingresá la contraseña de admin:'); if(pass===ADMIN_PASS){ isAdmin=true; updateAdminUI(); alert('Modo admin activado'); render(); } else alert('Contraseña incorrecta — quedás en modo visitante'); }
function handlePublish(){ if(!isAdmin){ alert('Sólo admin puede publicar'); return; } data.published = !data.published; save(); load(); render(); alert(data.published? 'Página publicada. Otros verán solo lectura.':'Página despublicada.'); }
function handleExport(){ const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='gotsport-data.json'; a.click(); }
function handleImport(){ const inp=document.createElement('input'); inp.type='file'; inp.accept='application/json'; inp.onchange=(e)=>{ const f=e.target.files[0]; const r=new FileReader(); r.onload=()=>{ try{ data=JSON.parse(r.result); save(); render(); alert('Importado'); }catch(err){alert('Error en archivo');}}; r.readAsText(f); }; inp.click(); }

// Finder helpers
function findTeam(id){ return data.teams.find(x=>x.id===id); }
function findMatchById(id){ if(!id) return null; for(const t of data.teams){ const mm=(t.matches||[]).find(m=>m.id===id); if(mm) return mm; } return null; }

// Rendering
function render(){ renderRanking(); renderRight(); }

function renderRanking(){ const target=document.getElementById('rankingList'); target.innerHTML=''; const levelFilter=document.getElementById('rankingFilter').value; const catFilter=document.getElementById('categorySelect').value;
  let list = (data.teams||[]).filter(t=> (levelFilter==='all' || t.level===levelFilter) && (catFilter==='all' || (t.category || 'U15')===catFilter) );
  // sort: by ranking ascending (1 top) then points
  list.sort((a,b)=>{ const ra=(a.ranking!=null)?a.ranking:9999; const rb=(b.ranking!=null)?b.ranking:9999; if(ra!==rb) return ra-rb; return (b.points||0)-(a.points||0); });
  list.forEach(t=>{
    const row=document.createElement('div'); row.className='ranking-row';
    row.addEventListener('click', ()=>{ selectedTeamId = t.id; render(); });
    const left=document.createElement('div'); left.className='team-meta';
    const logo=document.createElement('div'); logo.className='logo'; if(t.logo){ const img=document.createElement('img'); img.src=t.logo; logo.appendChild(img);} else logo.innerText=(t.name && t.name[0]) || 'G';
    const info=document.createElement('div'); info.innerHTML=`<div style='display:flex;align-items:center;gap:10px'><div style='font-weight:900;color:var(--accent)'>#${t.ranking!=null?t.ranking:'—'}</div><div><div style='font-weight:700'>${t.name}</div><div style='font-size:12px;color:${'var(--muted)'}'>${(t.level||'').toUpperCase()} • ${t.category||'U15'}</div></div></div>`;
    left.appendChild(logo); left.appendChild(info);
    const right=document.createElement('div'); right.style.textAlign='right'; right.innerHTML=`<div style='font-weight:700'>${t.points||0} pts</div><div style='font-size:12px;color:var(--muted)'>${t.played||0}p • ${calcWinPercent(t)}</div>`;
    row.appendChild(left); row.appendChild(right);
    target.appendChild(row);
  });
}

function calcWinPercent(t){ const p=(t.played||0); if(p===0) return '0%'; const w=(t.wins||0); return Math.round((w/p)*100)+'%'; }

function renderRight(){ const panel=document.getElementById('rightPanel'); const bigLogo=document.getElementById('bigLogo'); const title=document.getElementById('teamNameLarge'); const meta=document.getElementById('teamMeta'); const tabsDiv=document.getElementById('tabs'); const tc=document.getElementById('tabContent'); tc.innerHTML=''; tabsDiv.innerHTML=''; if(!selectedTeamId){ title.innerText='Selecciona un equipo'; bigLogo.innerText='G'; meta.innerText='Puntos • Partidos • Win%'; panel.classList.add('readonly'); return; }
  const team=findTeam(selectedTeamId); if(!team){ selectedTeamId=null; render(); return; }
  panel.classList.toggle('readonly', !isAdmin);
  if(team.logo){ bigLogo.innerHTML=`<img src='${team.logo}' style='width:100%;height:100%;object-fit:cover'/>`; } else bigLogo.innerText = team.name[0];
  title.innerText = team.name; meta.innerText = `${team.points||0} pts • ${team.played||0} partidos • ${calcWinPercent(team)}`;
  // header buttons (show/hide according to isAdmin)
  const editBtn = document.getElementById('editTeamBtn'); if(editBtn){ editBtn.style.display = isAdmin ? 'inline-block' : 'none'; editBtn.onclick = ()=>{ if(!isAdmin){alert('Solo admin');return;} openTeamForm(team); }; }
  const delBtn = document.getElementById('deleteTeamBtn'); if(delBtn){ delBtn.style.display = isAdmin ? 'inline-block' : 'none'; delBtn.onclick = ()=>{ if(!isAdmin){alert('Solo admin');return;} if(confirm('Eliminar equipo? (los partidos en otros equipos permanecen)')){ data.teams = data.teams.filter(x=>x.id!==team.id); save(); selectedTeamId = data.teams[0]?data.teams[0].id:null; render(); } }; }
  // tabs
  const tabs = ['Próximos partidos','Game History','Logros','Formación','Ranking Year','Estadísticas'];
  tabs.forEach((name,i)=>{
    const b=document.createElement('button'); b.className='tab'+(i===0?' active':''); b.innerText=name; b.onclick=()=>{ document.querySelectorAll('.tab').forEach(el=>el.classList.remove('active')); b.classList.add('active'); showTab(i); };
    tabsDiv.appendChild(b);
  });
  showTab(0);

  function showTab(i){ tc.innerHTML=''; if(i===0) renderUpcoming(team,tc); if(i===1) renderHistory(team,tc); if(i===2) renderAchievements(team,tc); if(i===3) renderFormation(team,tc); if(i===4) renderRankingYear(team,tc); if(i===5) renderStats(team,tc); }
}

// UPCOMING
function renderUpcoming(team,root){
  const div=document.createElement('div');
  const list=document.createElement('div');
  list.style.marginTop='8px';
  team.matches = team.matches || [];
  if(team.matches.length===0) list.innerHTML='<div style="color:var(--muted)">No hay próximos partidos.</div>';
  team.matches.sort((a,b)=> (a.date||'').localeCompare(b.date));
  team.matches.forEach(m=>{
    const item=document.createElement('div'); item.className='list-item';
    // build home block with logo
    const homeTeam = findTeam(m.homeId) || {};
    const awayTeam = findTeam(m.awayId) || {};
    const homeLogoHtml = homeTeam.logo? `<img src="${homeTeam.logo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : (homeTeam.name? homeTeam.name[0] : 'L');
    const awayLogoHtml = awayTeam.logo? `<img src="${awayTeam.logo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : (awayTeam.name? awayTeam.name[0] : 'V');

    const left=document.createElement('div'); left.style.display='flex'; left.style.alignItems='center'; left.style.gap='12px';
    left.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:44px;height:44px;border-radius:50%;overflow:hidden;background:#eef3f6;display:flex;align-items:center;justify-content:center">${homeLogoHtml}</div>
        <div style="min-width:140px"><div style='font-weight:700'>${m.homeName||homeTeam.name||'Local'}</div><div style='font-size:12px;color:var(--muted)'>${m.date||''} ${m.time||''}</div></div>
      </div>
    `;

    // center result (only color indicates win/loss/draw as requested)
    const center=document.createElement('div'); center.style.display='flex'; center.style.alignItems='center'; center.style.justifyContent='center'; center.style.minWidth='140px';
    let scoreText = 'vs';
    let cls = 'gray';
    if(m.pointsLocal!=null && m.pointsAway!=null){ scoreText = `${m.pointsLocal} - ${m.pointsAway}`; if(m.pointsLocal > m.pointsAway) cls = 'green'; else if(m.pointsLocal < m.pointsAway) cls = 'red'; else cls = 'gray'; }
    const resDiv = document.createElement('div'); resDiv.className = 'result '+cls; resDiv.style.minWidth='80px'; resDiv.style.textAlign='center'; resDiv.innerText = scoreText;
    center.appendChild(resDiv);

    const right=document.createElement('div'); right.style.display='flex'; right.style.alignItems='center'; right.style.gap='12px';
    right.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px">
        <div style="min-width:140px;text-align:left"><div style='font-weight:700'>${m.awayName||awayTeam.name||'Visitante'}</div><div style='font-size:12px;color:var(--muted)'>${m.venue||''} • ${m.competition||''}</div></div>
        <div style="width:44px;height:44px;border-radius:50%;overflow:hidden;background:#eef3f6;display:flex;align-items:center;justify-content:center">${awayLogoHtml}</div>
      </div>
    `;

    const actionDiv=document.createElement('div');

    // Only add edit/finish/delete if admin
    if(isAdmin){
      const edit=document.createElement('button'); edit.className='btn ghost small'; edit.innerText='Editar'; edit.addEventListener('click',(e)=>{ e.stopPropagation(); if(!isAdmin){alert('Solo admin');return;} openMatchForm(team,m);} );
      const finish=document.createElement('button'); finish.className='btn small'; finish.innerText='Finalizar'; finish.addEventListener('click',(e)=>{ e.stopPropagation(); if(!isAdmin){alert('Solo admin');return;} finishMatch(team,m);} );
      const del=document.createElement('button'); del.className='btn ghost small'; del.innerText='Eliminar'; del.addEventListener('click',(e)=>{ e.stopPropagation(); if(!isAdmin){alert('Solo admin');return;} if(confirm('Eliminar partido programado?')){ data.teams.forEach(t=>{ t.matches = (t.matches||[]).filter(x=>x.id!==m.id); }); save(); render(); } } );
      actionDiv.appendChild(edit); actionDiv.appendChild(finish); actionDiv.appendChild(del);
    }

    // assemble
    const rowLeft=document.createElement('div'); rowLeft.style.display='flex'; rowLeft.style.alignItems='center'; rowLeft.style.justifyContent='flex-start'; rowLeft.appendChild(left);
    const rowCenter=document.createElement('div'); rowCenter.appendChild(center);
    const rowRight=document.createElement('div'); rowRight.style.display='flex'; rowRight.style.alignItems='center'; rowRight.style.justifyContent='flex-end'; rowRight.appendChild(right);

    // create container for match line
    const matchLine=document.createElement('div'); matchLine.style.display='flex'; matchLine.style.alignItems='center'; matchLine.style.justifyContent='space-between'; matchLine.style.width='100%'; matchLine.appendChild(rowLeft); matchLine.appendChild(rowCenter); matchLine.appendChild(rowRight);

    item.appendChild(matchLine);
    item.appendChild(actionDiv);
    list.appendChild(item);
  });
  // Add match button only for admin
  if(isAdmin){
    const addBtn=document.createElement('button'); addBtn.className='btn small'; addBtn.innerText='Agregar partido'; addBtn.addEventListener('click', ()=>{ if(!isAdmin){alert('Solo admin');return;} openMatchForm(team); });
    div.appendChild(list); div.appendChild(addBtn); root.appendChild(div);
  } else {
    div.appendChild(list); root.appendChild(div);
  }
}

function openMatchForm(team,match){
  const editing = !!match;
  const modal=document.createElement('div'); modal.style.position='fixed'; modal.style.left=0; modal.style.top=0; modal.style.right=0; modal.style.bottom=0; modal.style.background='rgba(0,0,0,0.45)'; modal.style.display='flex'; modal.style.alignItems='center'; modal.style.justifyContent='center';
  const box=document.createElement('div'); box.style.width='700px'; box.style.background='#fff'; box.style.padding='18px'; box.style.borderRadius='10px';
  box.innerHTML = `<h3>${editing?'Editar partido':'Agregar partido'}</h3>
    <div style='display:flex;gap:8px;margin-top:8px'>
      <div style='flex:1'><label>Competición</label><input id='m_comp' type='text' value='${match?match.competition||'':''}'></div>
      <div style='width:140px'><label>Fecha</label><input id='m_date' type='date' value='${match?match.date||'':''}'></div>
      <div style='width:120px'><label>Hora</label><input id='m_time' type='time' value='${match?match.time||'':''}'></div>
    </div>
    <div style='display:flex;gap:8px;margin-top:8px'>
      <div style='flex:1'><label>Equipo local</label><select id='m_home'>${data.teams.map(t=>`<option value='${t.id}' ${match && match.homeId===t.id? 'selected':''}>${t.name}</option>`).join('')}</select></div>
      <div style='flex:1'><label>Equipo visitante</label><select id='m_away'>${data.teams.map(t=>`<option value='${t.id}' ${match && match.awayId===t.id? 'selected':''}>${t.name}</option>`).join('')}</select></div>
    </div>
    <div style='display:flex;gap:8px;margin-top:8px'>
      <div style='width:120px'><label>Cancha</label><input id='m_venue' type='text' value='${match?match.venue||'':''}'></div>
      <div style='width:120px'><label>Puntos local (opcional)</label><input id='m_points_local' type='number' value='${match?match.pointsLocal||'' :''}'></div>
      <div style='width:120px'><label>Puntos visitante (opcional)</label><input id='m_points_away' type='number' value='${match?match.pointsAway||'' :''}'></div>
    </div>
    <div style='margin-top:12px;display:flex;gap:8px;justify-content:flex-end'>
      <button id='m_cancel' class='btn ghost small'>Cancelar</button>
      <button id='m_save' class='btn small'>Guardar</button>
    </div>`;
  modal.appendChild(box); document.body.appendChild(modal);
  document.getElementById('m_cancel').onclick = ()=> modal.remove();
  document.getElementById('m_save').onclick = ()=>{
    const comp=document.getElementById('m_comp').value.trim(); const date=document.getElementById('m_date').value; const time=document.getElementById('m_time').value; const homeId=document.getElementById('m_home').value; const awayId=document.getElementById('m_away').value; const venue=document.getElementById('m_venue').value; const pointsLocal=parseInt(document.getElementById('m_points_local').value); const pointsAway=parseInt(document.getElementById('m_points_away').value);
    if(homeId===awayId){ alert('El local y visitante no pueden ser el mismo'); return; }
    if(editing){
      // update match across all teams that have it
      data.teams.forEach(t=>{
        t.matches = (t.matches||[]).map(mm=>{
          if(mm.id===match.id){ mm.competition=comp; mm.date=date; mm.time=time; mm.homeId=homeId; mm.awayId=awayId; mm.venue=venue; mm.pointsLocal = isNaN(pointsLocal)?null:pointsLocal; mm.pointsAway = isNaN(pointsAway)?null:pointsAway; mm.homeName = findTeam(homeId)?.name; mm.awayName = findTeam(awayId)?.name; }
          return mm;
        })
      });
      save(); modal.remove(); render();
    }
    else {
      const m={id:uid('m'),competition:comp,date,time,homeId,awayId,homeName:findTeam(homeId).name,awayName:findTeam(awayId).name,venue,pointsLocal:isNaN(pointsLocal)?null:pointsLocal,pointsAway:isNaN(pointsAway)?null:pointsAway};
      // add to both teams
      const th=findTeam(homeId); const ta=findTeam(awayId);
      th.matches = th.matches||[]; ta.matches = ta.matches||[];
      th.matches.push(Object.assign({},m)); ta.matches.push(Object.assign({},m));
      save(); modal.remove(); selectedTeamId = homeId; render();
    }
  };
}

// finalize match -> move to history with result input
function finishMatch(team,match){
  // same modal as add to history but prefilled
  openHistoryForm({homeId: match.homeId, awayId: match.awayId, date: match.date, competition: match.competition, defaultHomeGoals: match.pointsLocal, defaultAwayGoals: match.pointsAway, removeScheduledId: match.id});
}

// Open form to add a match directly to history (no scheduled required)
function openHistoryForm(opts){
  const modal=document.createElement('div'); modal.style.position='fixed'; modal.style.left=0; modal.style.top=0; modal.style.right=0; modal.style.bottom=0; modal.style.background='rgba(0,0,0,0.45)'; modal.style.display='flex'; modal.style.alignItems='center'; modal.style.justifyContent='center';
  const box=document.createElement('div'); box.style.width='600px'; box.style.background='#fff'; box.style.padding='18px'; box.style.borderRadius='10px';
  const defaultHome = opts && opts.homeId ? opts.homeId : (selectedTeamId || (data.teams[0] && data.teams[0].id));
  const defaultAway = opts && opts.awayId ? opts.awayId : (data.teams.find(t=>t.id!==defaultHome) && data.teams.find(t=>t.id!==defaultHome).id);
  box.innerHTML = `<h3>Agregar partido al historial</h3>
    <div style='display:flex;gap:8px;margin-top:8px'>
      <div style='flex:1'><label>Equipo local</label><select id='h_home'>${data.teams.map(t=>`<option value='${t.id}' ${t.id===defaultHome?'selected':''}>${t.name}</option>`).join('')}</select></div>
      <div style='flex:1'><label>Equipo visitante</label><select id='h_away'>${data.teams.map(t=>`<option value='${t.id}' ${t.id===defaultAway?'selected':''}>${t.name}</option>`).join('')}</select></div>
    </div>
    <div style='display:flex;gap:8px;margin-top:8px'>
      <div style='width:140px'><label>Fecha</label><input id='h_date' type='date' value='${opts && opts.date?opts.date:''}'></div>
      <div style='width:120px'><label>Competición</label><input id='h_comp' type='text' value='${opts && opts.competition?opts.competition:''}'></div>
      <div style='width:80px'><label>Goles local</label><input id='h_goals_home' type='number' value='${opts && opts.defaultHomeGoals!=null?opts.defaultHomeGoals:0}'></div>
      <div style='width:80px'><label>Goles visitante</label><input id='h_goals_away' type='number' value='${opts && opts.defaultAwayGoals!=null?opts.defaultAwayGoals:0}'></div>
    </div>
    <div style='margin-top:12px;display:flex;gap:8px;justify-content:flex-end'>
      <button id='h_cancel' class='btn ghost small'>Cancelar</button>
      <button id='h_save' class='btn small'>Agregar al historial</button>
    </div>`;
  modal.appendChild(box); document.body.appendChild(modal);
  document.getElementById('h_cancel').onclick = ()=> modal.remove();
  document.getElementById('h_save').onclick = ()=>{
    const homeId = document.getElementById('h_home').value; const awayId = document.getElementById('h_away').value; if(homeId===awayId){ alert('Local y visitante no pueden ser el mismo'); return; }
    const date = document.getElementById('h_date').value || new Date().toISOString().slice(0,10);
    const comp = document.getElementById('h_comp').value || '';
    const gh = parseInt(document.getElementById('h_goals_home').value) || 0; const ga = parseInt(document.getElementById('h_goals_away').value) || 0;
    const record = { id: uid('h'), date, competition: comp, homeId, awayId, homeName: findTeam(homeId).name, awayName: findTeam(awayId).name, goalsHome: gh, goalsAway: ga };
    // push to both
    const th = findTeam(homeId); const ta = findTeam(awayId); th.history = th.history||[]; ta.history = ta.history||[]; th.history.push(record); ta.history.push(record);
    updateStatsAfterResult(th,ta,record);
    // optionally remove scheduled match
    if(opts && opts.removeScheduledId){ data.teams.forEach(t=>{ t.matches=(t.matches||[]).filter(m=>m.id!==opts.removeScheduledId); }); }
    save(); modal.remove(); render();
  };
}

// HISTORY
function renderHistory(team,root){ const div=document.createElement('div'); team.history=team.history||[];
  // Add to history button only for admin
  if(isAdmin){
    const addBtn=document.createElement('button'); addBtn.className='btn small'; addBtn.innerText='Agregar partido al historial'; addBtn.addEventListener('click', ()=>{ if(!isAdmin){alert('Solo admin');return;} openHistoryForm({homeId:team.id}); });
    root.appendChild(addBtn);
  }
  if(team.history.length===0) root.appendChild(document.createElement('div')).innerHTML = '<div style="color:var(--muted);margin-top:8px">No hay historial de partidos.</div>';
  const arr = team.history.slice().sort((a,b)=> (b.date||'').localeCompare(a.date));
  arr.forEach(h=>{
    const item=document.createElement('div'); item.className='list-item';
    // logos
    const homeTeam = findTeam(h.homeId) || {};
    const awayTeam = findTeam(h.awayId) || {};
    const homeLogoHtml = homeTeam.logo? `<img src="${homeTeam.logo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : (homeTeam.name? homeTeam.name[0] : 'L');
    const awayLogoHtml = awayTeam.logo? `<img src="${awayTeam.logo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : (awayTeam.name? awayTeam.name[0] : 'V');

    const left=document.createElement('div'); left.style.display='flex'; left.style.alignItems='center'; left.style.gap='10px';
    left.innerHTML = `<div style="display:flex;align-items:center;gap:8px"><div style="width:44px;height:44px;border-radius:50%;overflow:hidden;background:#eef3f6;display:flex;align-items:center;justify-content:center">${homeLogoHtml}</div><div style='font-weight:700'>${h.homeName}</div></div>`;

    const right=document.createElement('div'); right.style.display='flex'; right.style.alignItems='center'; right.style.gap='10px';
    right.innerHTML = `<div style='font-weight:700'>${h.awayName}</div><div style="width:44px;height:44px;border-radius:50%;overflow:hidden;background:#eef3f6;display:flex;align-items:center;justify-content:center">${awayLogoHtml}</div>`;

    // determine color from perspective of the team being viewed
    const isViewingHome = (team.id === h.homeId);
    let cls = 'gray';
    if(h.goalsHome > h.goalsAway){ cls = isViewingHome ? 'green' : 'red'; }
    else if(h.goalsHome < h.goalsAway){ cls = isViewingHome ? 'red' : 'green'; }
    const resSpan = document.createElement('div'); resSpan.className = 'result '+cls; resSpan.innerText = `${h.goalsHome} - ${h.goalsAway}`;

    // assemble line: home (logo+name) | result | away (name+logo)
    const line=document.createElement('div'); line.style.display='flex'; line.style.alignItems='center'; line.style.justifyContent='space-between'; line.style.width='100%';
    const leftWrap=document.createElement('div'); leftWrap.style.display='flex'; leftWrap.style.alignItems='center'; leftWrap.appendChild(left);
    const centerWrap=document.createElement('div'); centerWrap.style.display='flex'; centerWrap.style.alignItems='center'; centerWrap.style.justifyContent='center'; centerWrap.style.minWidth='120px'; centerWrap.appendChild(resSpan);
    const rightWrap=document.createElement('div'); rightWrap.style.display='flex'; rightWrap.style.alignItems='center'; rightWrap.appendChild(right);

    item.appendChild(leftWrap); item.appendChild(centerWrap); item.appendChild(rightWrap);
    // meta line below
    const meta=document.createElement('div'); meta.style.fontSize='12px'; meta.style.color='var(--muted)'; meta.style.marginTop='6px'; meta.innerText = `${h.date} • ${h.competition||''}`;
    const container=document.createElement('div'); container.style.display='flex'; container.style.flexDirection='column'; container.appendChild(item); container.appendChild(meta);
    root.appendChild(container);
  });
}

// ACHIEVEMENTS
function renderAchievements(team,root){ const div=document.createElement('div');
  const ul=document.createElement('div'); ul.style.marginTop='8px';
  team.achievements = team.achievements || [];
  team.achievements.forEach(a=>{
    const it=document.createElement('div'); it.className='list-item'; it.innerHTML = `<div><div style='font-weight:700'>${a.title}</div><div style='font-size:12px;color:var(--muted)'>${a.desc||''}</div></div><div>${a.done?'<span style="color:var(--success)">✓</span>':'<span style="color:var(--danger)">✕</span>'}</div>`;
    ul.appendChild(it);
  });
  // only show add if admin
  if(isAdmin){
    const add=document.createElement('button'); add.className='btn small'; add.innerText='Agregar logro'; add.addEventListener('click', ()=>{ if(!isAdmin){alert('Solo admin');return;} const title=prompt('Título del logro'); if(!title) return; const done = confirm('Marcar como cumplido? OK = Sí'); const t=findTeam(selectedTeamId); t.achievements = t.achievements||[]; t.achievements.push({id:uid('a'),title,desc:'',done}); save(); render(); });
    const progress=document.createElement('div'); const doneCount = team.achievements.filter(x=>x.done).length; const pct = team.achievements.length? Math.round((doneCount/team.achievements.length)*100):0; progress.innerHTML = `<div style='display:flex;justify-content:space-between;align-items:center'><div><strong>Progreso de logros</strong><div style='font-size:12px;color:var(--muted)'>${doneCount}/${team.achievements.length} completados</div></div><div style='font-weight:700'>${pct}%</div></div><div class='progress' style='margin-top:8px'><i style='width:${pct}%'></i></div>`;
    root.appendChild(progress); root.appendChild(ul); root.appendChild(add);
  } else {
    const progress=document.createElement('div'); const doneCount = team.achievements.filter(x=>x.done).length; const pct = team.achievements.length? Math.round((doneCount/team.achievements.length)*100):0; progress.innerHTML = `<div style='display:flex;justify-content:space-between;align-items:center'><div><strong>Progreso de logros</strong><div style='font-size:12px;color:var(--muted)'>${doneCount}/${team.achievements.length} completados</div></div><div style='font-weight:700'>${pct}%</div></div><div class='progress' style='margin-top:8px'><i style='width:${pct}%'></i></div>`;
    root.appendChild(progress); root.appendChild(ul);
  }
}

// FORMATION
function renderFormation(team,root){ const div=document.createElement('div'); const list=document.createElement('div'); list.style.marginTop='8px'; team.formation = team.formation || [];
  if(team.formation.length===0) list.innerHTML='<div style="color:var(--muted)">No hay formación aún.</div>';
  team.formation.forEach((p,i)=>{ const it=document.createElement('div'); it.className='list-item'; const editBtn=document.createElement('button'); editBtn.className='btn ghost small'; editBtn.innerText='Editar'; editBtn.addEventListener('click', ()=>{ if(!isAdmin){alert('Solo admin');return;} const newName = prompt('Editar nombre', p); if(newName){ team.formation[i]=newName; save(); render(); } }); const delBtn=document.createElement('button'); delBtn.className='btn ghost small'; delBtn.innerText='Borrar'; delBtn.addEventListener('click', ()=>{ if(!isAdmin){alert('Solo admin');return;} if(confirm('Eliminar jugador?')){ team.formation.splice(i,1); save(); render(); } }); it.innerHTML=`<div>${i+1}. ${p}</div>`; const right=document.createElement('div'); right.appendChild(editBtn); right.appendChild(delBtn); it.appendChild(right); list.appendChild(it); });
  if(isAdmin){
    const add=document.createElement('button'); add.className='btn small'; add.innerText='Agregar jugador'; add.addEventListener('click', ()=>{ if(!isAdmin){alert('Solo admin');return;} const name=prompt('Nombre del jugador'); if(!name) return; team.formation.push(name); save(); render(); });
    root.appendChild(list); root.appendChild(add);
  } else {
    root.appendChild(list);
  }
}

// RANKING YEAR
function renderRankingYear(team,root){ const div=document.createElement('div'); div.innerHTML=`<div style='display:flex;gap:8px;align-items:center'><div style='flex:1'><strong>Puntos acumulados:</strong><div style='font-size:12px;color:var(--muted)'>Podés editar manualmente los puntos</div></div><div><input id='ry_points' type='number' value='${team.points||0}'></div></div><div style='margin-top:10px'><button class='btn small' id='ry_save'>Guardar</button></div>`; root.appendChild(div);
  // only enable saving for admin
  if(!isAdmin){
    document.getElementById('ry_save').style.display = 'none';
  } else {
    document.getElementById('ry_save').onclick = ()=>{ if(!isAdmin){alert('Solo admin');return;} team.points = parseInt(document.getElementById('ry_points').value)||0; save(); render(); }
  }
}

// STATS
function renderStats(team,root){ const div=document.createElement('div'); const s1=document.createElement('div'); s1.className='stats'; s1.innerHTML = `<div class='stat'><div style='font-size:12px;color:var(--muted)'>Ganados</div><div style='font-weight:700'>${team.wins||0}</div></div><div class='stat'><div style='font-size:12px;color:var(--muted)'>Empatados</div><div style='font-weight:700'>${team.draws||0}</div></div><div class='stat'><div style='font-size:12px;color:var(--muted)'>Perdidos</div><div style='font-weight:700'>${team.losses||0}</div></div><div class='stat'><div style='font-size:12px;color:var(--muted)'>Goles a favor</div><div style='font-weight:700'>${team.goalsFor||0}</div></div><div class='stat'><div style='font-size:12px;color:var(--muted)'>Win %</div><div style='font-weight:700'>${calcWinPercent(team)}</div></div>`; root.appendChild(s1);
}

// Team form (now includes category select)
function openTeamForm(team){
  const modal=document.createElement('div'); modal.style.position='fixed'; modal.style.left=0; modal.style.top=0; modal.style.right=0; modal.style.bottom=0; modal.style.background='rgba(0,0,0,0.4)'; modal.style.display='flex'; modal.style.alignItems='center'; modal.style.justifyContent='center';
  const box=document.createElement('div'); box.style.width='720px'; box.style.background='#fff'; box.style.padding='18px'; box.style.borderRadius='10px';
  box.innerHTML=`<h3>${team? 'Editar equipo':'Agregar equipo'}</h3>
    <div style='display:flex;gap:8px;margin-top:8px'>
      <div style='flex:1'><label>Nombre</label><input id='fm_name' type='text' value='${team?team.name:''}'></div>
      <div style='width:160px'><label>Nivel</label><select id='fm_level'><option value='national'>Nacional</option><option value='region'>Regional</option><option value='state'>Estatal</option></select></div>
      <div style='width:140px'><label>Categoría</label><select id='fm_category'><option value='U14'>U14</option><option value='U15'>U15</option><option value='U16'>U16</option><option value='U17'>U17</option></select></div>
      <div style='width:100px'><label>Ranking</label><input id='fm_ranking' type='number' value='${team && team.ranking!=null?team.ranking:(data.teams.length+1)}' min='1'></div>
    </div>
    <div style='display:flex;gap:8px;margin-top:8px'>
      <div style='width:160px'><label>Puntos</label><input id='fm_points' type='number' value='${team?team.points||0:0}'></div>
      <div style='width:160px'><label>Partidos jugados</label><input id='fm_played' type='number' value='${team?team.played||0:0}'></div>
      <div style='width:160px'><label>Goles a favor</label><input id='fm_gf' type='number' value='${team?team.goalsFor||0:0}'></div>
    </div>
    <div style='margin-top:8px'><label>Logo</label><input id='fm_logo' type='file' accept='image/*'></div>
    <div style='margin-top:12px;display:flex;gap:8px;justify-content:flex-end'>
      <button id='fm_cancel' class='btn ghost small'>Cancelar</button>
      <button id='fm_save' class='btn small'>Guardar</button>
    </div>`;
  modal.appendChild(box); document.body.appendChild(modal);
  document.getElementById('fm_level').value = team?team.level:'national';
  document.getElementById('fm_category').value = team?team.category||'U15':'U15';
  document.getElementById('fm_cancel').onclick = ()=>{ modal.remove(); };
  document.getElementById('fm_save').onclick = ()=>{
    const name = document.getElementById('fm_name').value.trim()||'Equipo';
    const level = document.getElementById('fm_level').value;
    const category = document.getElementById('fm_category').value;
    const ranking = parseInt(document.getElementById('fm_ranking').value) || (data.teams.length+1);
    const points = parseInt(document.getElementById('fm_points').value)||0;
    const played = parseInt(document.getElementById('fm_played').value)||0;
    const gf = parseInt(document.getElementById('fm_gf').value)||0;
    const file = document.getElementById('fm_logo').files[0];
    if(team){ // update
      team.name=name; team.level=level; team.category=category; team.ranking=ranking; team.points=points; team.played=played; team.goalsFor=gf;
      if(file){ const r=new FileReader(); r.onload=()=>{ team.logo=r.result; save(); render(); modal.remove(); }; r.readAsDataURL(file);} else { save(); render(); modal.remove(); }
    } else { const newT={id:uid(),name,logo:null,level,category,ranking,points,played,wins:0,draws:0,losses:0,goalsFor:gf,achievements:[],formation:[],matches:[],history:[]}; if(file){ const r=new FileReader(); r.onload=()=>{ newT.logo=r.result; data.teams.push(newT); save(); selectedTeamId=newT.id; render(); modal.remove(); }; r.readAsDataURL(file);} else { data.teams.push(newT); save(); selectedTeamId=newT.id; render(); modal.remove(); }}
  };
}

function updateStatsAfterResult(th,ta,rec){
  th.played = (th.played||0)+1; ta.played=(ta.played||0)+1;
  th.goalsFor = (th.goalsFor||0)+rec.goalsHome; ta.goalsFor=(ta.goalsFor||0)+rec.goalsAway;
  if(rec.goalsHome>rec.goalsAway){ th.wins=(th.wins||0)+1; ta.losses=(ta.losses||0)+1; th.points=(th.points||0)+3; }
  else if(rec.goalsHome<rec.goalsAway){ ta.wins=(ta.wins||0)+1; th.losses=(th.losses||0)+1; ta.points=(ta.points||0)+3; }
  else { th.draws=(th.draws||0)+1; ta.draws=(ta.draws||0)+1; th.points=(th.points||0)+1; ta.points=(ta.points||0)+1; }
}

// initial boot
load(); wireStaticButtons(); render();

</script>
</body>
</html>
