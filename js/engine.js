let stars=Number(localStorage.getItem('bhg2_stars')||0);
document.getElementById('stars').textContent=stars;
const MASCOTS=['🦉','🦊','🐨','🐧','🐼','🐰'];
let curSubject, curLesson, curContent, curMode, quizList, qi, correctCount, streakLocal, locked, hintUsed;

function pick(a){return a[Math.floor(Math.random()*a.length)];}
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('backBtn').classList.toggle('hidden', id==='s_subject');
  window.scrollTo(0,0);
}
function setCrumb(t){document.getElementById('crumb').textContent=t;}

/* âm thanh */
let actx;
function tone(f,d=.14,t='sine',v=.2){try{actx=actx||new(window.AudioContext||window.webkitAudioContext)();
  const o=actx.createOscillator(),g=actx.createGain();o.type=t;o.frequency.value=f;o.connect(g);g.connect(actx.destination);
  g.gain.setValueAtTime(v,actx.currentTime);g.gain.exponentialRampToValueAtTime(.001,actx.currentTime+d);o.start();o.stop(actx.currentTime+d);}catch(e){}}
function sRight(){tone(660,.12);setTimeout(()=>tone(880,.18),110);}
function sWrong(){tone(200,.25,'triangle',.16);}
function sWin(){[523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.18),i*130));}
function sStep(){tone(620,.1);} function sCarry(){tone(880,.14,'triangle');}

/* Màn đầu = chọn môn (không còn tầng chọn sách) */
function goHomeSubject(){ setCrumb(''); show('s_subject'); document.getElementById('mascot').textContent=pick(MASCOTS); }

/* Môn -> danh sách chương/bài, nhóm theo Tập */
function openSubject(sub){
  curSubject=sub;
  const chapters=CURRICULUM[sub].chapters;
  const monName=CURRICULUM[sub].name;
  setCrumb(monName);
  document.getElementById('lessonsLabel').textContent=monName+' · Chọn bài';
  const wrap=document.getElementById('chapterList'); wrap.innerHTML='';
  if(sub==='toan'){
    const cc=document.createElement('button');
    cc.className='row-card cc-shortcut';
    cc.onclick=()=>openLesson('bang_cuu_chuong','Bảng cửu chương (2–9)');
    cc.innerHTML=`<span class="num">✖️</span>
      <span class="info"><h3>Bảng cửu chương (2–9)</h3><span>Tra cứu · Luyện tập nhanh</span></span>
      <span class="go">›</span>`;
    wrap.appendChild(cc);
  }
  let lastTap=null;
  chapters.forEach((c)=>{
    // dải phân cách Tập 1 / Tập 2
    if(c.tap!==lastTap){
      const band=document.createElement('div');
      band.className='tap-band';
      band.textContent = c.tap===1 ? '📗 TẬP MỘT' : '📘 TẬP HAI';
      wrap.appendChild(band);
      lastTap=c.tap;
    }
    const head=document.createElement('div'); head.className='chapter-head';
    head.innerHTML=`<span class="dot"></span>${c.ch}`;
    wrap.appendChild(head);
    c.bai.forEach((b)=>{
      const has=b.key && CONTENT[b.key];
      const card=document.createElement('button');
      card.className='row-card'+(has?'':' empty');
      if(has) card.onclick=()=>openLesson(b.key,b.t);
      else card.onclick=()=>showComingSoon(b.t);
      card.innerHTML=`<span class="num">${has?'✓':'🔒'}</span>
        <span class="info"><h3>${b.t}</h3><span>${has?'Học · Luyện tập · Kiểm tra':'Sắp có nội dung'}</span></span>
        <span class="go">${has?'›':''}</span>`;
      wrap.appendChild(card);
    });
  });
  show('s_lessons');
}
function showComingSoon(title){
  setCrumb(title);
  document.getElementById('modeTitle').textContent=title;
  ['learn','practice','test'].forEach(m=>document.getElementById('mode-'+m).style.display='none');
  const lb=document.getElementById('learnBody');
  curContent=null;
  document.getElementById('mode-learn').style.display='flex'; // để nút học mở khung "sắp có"
  document.getElementById('mode-practice').style.display='none';
  document.getElementById('mode-test').style.display='none';
  show('s_modes');
}

/* 3. Bài -> chế độ */
function openLesson(key,title){
  curContent=CONTENT[key]; curLesson=title;
  setCrumb(title);
  document.getElementById('modeTitle').textContent=title;
  ['learn','practice','test'].forEach(m=>document.getElementById('mode-'+m).style.display='flex');
  show('s_modes');
}
function goToModes(){ setCrumb(curLesson); show('s_modes'); }

/* 4. Học bài */
function openLearn(){
  if(!curContent){
    document.getElementById('learnBody').innerHTML=`<div class="empty-note"><div class="ic">🚧</div>
      <p>Bài này chưa có nội dung.<br>Bố mẹ gửi trang sách của bài này cho trợ lý AI để thêm vào nhé!</p></div>`;
    document.getElementById('learnNextBtn').style.display='none';
    show('s_learn'); return;
  }
  document.getElementById('learnNextBtn').style.display='block';
  const L=curContent.learn;
  if(L.pages){ mountFlipbook(L); show('s_learn'); return; }
  let html=`<h2>${curContent.title} <span class="draft-badge">bản nháp</span></h2><div class="lead">${L.intro}</div>`;
  html+=renderBlocksHtml(L.blocks);
  document.getElementById('learnBody').innerHTML=html;
  mountBlocksInteractive(L.blocks);
  show('s_learn');
}
function afterLearn(){ if(curContent) openQuiz('practice'); }

/* ===== RENDER/MOUNT DÙNG CHUNG CHO 1 MẢNG blocks (dùng cho bài thường lẫn từng trang flipbook) ===== */
function renderBlocksHtml(blocks){
  let html='';
  blocks.forEach((b,idx)=>{
    if(b.type==='concept'){ html+=`<div class="concept"><p>${emo(b.text)}</p>`; if(b.big) html+=`<div class="big">${b.big}</div>`; html+=`</div>`; }
    else if(b.type==='example'){ html+=`<div class="example">${emo(b.html)}</div>`; }
    else if(b.type==='vcalc'){ html+=`<div class="vcalc-wrap" id="vcalcMount"></div>`; }
    else if(b.type==='numline'){ html+=`<div class="numline-wrap" id="numlineMount"></div>`; }
    else if(b.type==='compare'){ html+=`<div class="compare-wrap" id="compareMount"></div>`; }
    else if(b.type==='barcompare'){ html+=`<div class="barcompare-wrap" id="barcompareMount"></div>`; }
    else if(b.type==='wordcards'){ html+=`<div class="wordcards-wrap" id="wordcardsMount_${idx}"></div>`; }
    else if(b.type==='actioncards'){ html+=`<div class="actioncards-wrap" id="actioncardsMount_${idx}"></div>`; }
    else if(b.type==='scenecards'){ html+=`<div class="scenecards-wrap" id="scenecardsMount_${idx}"></div>`; }
    else if(b.type==='cuuchuong'){ html+=`<div class="cc-wrap" id="cuuchuongMount_${idx}"></div>`; }
    else if(b.type==='groupcalc'){ html+=`<div class="gc-wrap" id="gcMount_${idx}"></div>`; }
    else if(b.type==='groupviz'){ html+=`<div class="gv-wrap" id="gvMount_${idx}"></div>`; }
    else if(b.type==='placevalue'){ html+=`<div class="pv-wrap" id="pvMount_${idx}"></div>`; }
    else if(b.type==='pictochart'){ html+=`<div class="pc-wrap" id="pcMount_${idx}"></div>`; }
    else if(b.type==='ruler'){ html+=`<div class="ru-wrap" id="ruMount_${idx}"></div>`; }
    else if(b.type==='stepper'){ html+=`<div class="st-wrap" id="stMount_${idx}"></div>`; }
    else if(b.type==='clock'){ html+=`<div class="ck-wrap" id="ckMount_${idx}"></div>`; }
    else if(b.type==='calendar'){ html+=`<div class="ca-wrap" id="caMount_${idx}"></div>`; }
  });
  return html;
}
function mountBlocksInteractive(blocks){
  if(blocks.some(b=>b.type==='vcalc')) mountVCalc();
  const nlBlock=blocks.find(b=>b.type==='numline'); if(nlBlock) mountNumline(nlBlock.center);
  const cmpBlock=blocks.find(b=>b.type==='compare'); if(cmpBlock) mountCompare(cmpBlock);
  const barBlock=blocks.find(b=>b.type==='barcompare'); if(barBlock) mountBarcompare(barBlock.items);
  blocks.forEach((b,idx)=>{ if(b.type==='wordcards') mountWordcards('wordcardsMount_'+idx, b.items); });
  blocks.forEach((b,idx)=>{ if(b.type==='actioncards') mountActioncards('actioncardsMount_'+idx, b.items); });
  blocks.forEach((b,idx)=>{ if(b.type==='scenecards') mountScenecards('scenecardsMount_'+idx, b.items); });
  blocks.forEach((b,idx)=>{ if(b.type==='cuuchuong') mountCuuChuong('cuuchuongMount_'+idx, b.nums); });
  blocks.forEach((b,idx)=>{ if(b.type==='groupcalc') mountGroupCalc('gcMount_'+idx, b); });
  blocks.forEach((b,idx)=>{ if(b.type==='groupviz') mountGroupViz('gvMount_'+idx, b); });
  blocks.forEach((b,idx)=>{ if(b.type==='placevalue') mountPlaceValue('pvMount_'+idx, b); });
  blocks.forEach((b,idx)=>{ if(b.type==='pictochart') mountPictoChart('pcMount_'+idx, b); });
  blocks.forEach((b,idx)=>{ if(b.type==='ruler') mountRuler('ruMount_'+idx, b); });
  blocks.forEach((b,idx)=>{ if(b.type==='stepper') mountStepper('stMount_'+idx, b); });
  blocks.forEach((b,idx)=>{ if(b.type==='clock') mountClock('ckMount_'+idx, b); });
  blocks.forEach((b,idx)=>{ if(b.type==='calendar') mountCalendar('caMount_'+idx, b); });
}

/* ===== ĐỒNG HỒ: bấm chọn giờ, phút để xem kim chạy; đọc giờ bằng lời ===== */
const CK_STATE={};
function mountClock(mountId,cfg){
  CK_STATE[mountId]={h:cfg.h||3,m:cfg.m||0};
  const el=document.getElementById(mountId); if(!el) return;
  const mins=(cfg.mins||[0,15,30]).map(m=>`<button class="ck-btn" data-m="${m}" onclick="ckSet('${mountId}',null,${m})">${m===0?'Giờ đúng':m+' phút'}</button>`).join('');
  el.innerHTML=`${cfg.text?`<div class="gc-label">${emo(cfg.text)}</div>`:''}
    <div class="ck-box"><div class="ck-face" id="${mountId}_face"></div>
      <div class="ck-ctl"><div class="ck-read" id="${mountId}_read"></div>
        <div class="ck-row"><button class="ck-btn sq" onclick="ckHour('${mountId}',-1)">− giờ</button><button class="ck-btn sq" onclick="ckHour('${mountId}',1)">+ giờ</button></div>
        <div class="ck-row">${mins}</div></div></div>`;
  ckRender(mountId);
}
function ckRender(mountId){
  const s=CK_STATE[mountId]; const face=document.getElementById(mountId+'_face'); if(!face) return;
  face.innerHTML=window.LS.clockSvg(s.h,s.m,150);
  const txt = s.m===0 ? `${s.h} giờ` : (s.m===30 ? `${s.h} giờ 30 phút (${s.h} giờ rưỡi)` : `${s.h} giờ ${s.m} phút`);
  document.getElementById(mountId+'_read').innerHTML=`Đồng hồ chỉ: <b>${txt}</b>`;
  document.querySelectorAll('#'+mountId+' .ck-btn[data-m]').forEach(b=>b.classList.toggle('on', Number(b.dataset.m)===s.m));
}
function ckHour(mountId,d){ const s=CK_STATE[mountId]; s.h=((s.h-1+d+12)%12)+1; sStep(); ckRender(mountId); }
function ckSet(mountId,h,m){ const s=CK_STATE[mountId]; if(h!==null) s.h=h; if(m!==null) s.m=m; sStep(); ckRender(mountId); }

/* ===== LỊCH THÁNG: bấm vào một ngày để biết ngày đó là thứ mấy ===== */
const CA_NAMES=['Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy','Chủ nhật'];
function mountCalendar(mountId,cfg){
  const el=document.getElementById(mountId); if(!el) return;
  const head=['T2','T3','T4','T5','T6','T7','CN'].map(d=>`<div class="ca-h">${d}</div>`).join('');
  let cells=''; for(let i=0;i<cfg.start;i++) cells+='<div class="ca-c ca-e"></div>';
  for(let d=1; d<=cfg.days; d++){ const wd=(cfg.start+d-1)%7; cells+=`<button class="ca-c" onclick="caPick('${mountId}',${d},${wd})">${d}</button>`; }
  el.innerHTML=`${cfg.title?`<div class="gc-label">${emo(cfg.title)}</div>`:''}<div class="ca-grid">${head}${cells}</div>
    <div class="ca-say" id="${mountId}_say">👉 Bấm vào một ngày để biết đó là thứ mấy. (Tháng này có ${cfg.days} ngày.)</div>`;
}
function caPick(mountId,d,wd){
  document.querySelectorAll('#'+mountId+' .ca-c').forEach(b=>b.classList.remove('on'));
  const b=[...document.querySelectorAll('#'+mountId+' button.ca-c')].find(x=>Number(x.textContent)===d); if(b) b.classList.add('on');
  document.getElementById(mountId+'_say').innerHTML=`Ngày <b>${d}</b> là <b>${CA_NAMES[wd]}</b>.`; sStep();
}

/* ===== HƯỚNG DẪN TỪNG BƯỚC — bấm "bước tiếp theo" để hiện dần từng bước có hình minh hoạ =====
   {type:"stepper", title, steps:[{say:"lời hướng dẫn (HTML)", vis:"hình minh hoạ (HTML)"}, ...]} */
const ST_STATE={};
function mountStepper(mountId,cfg){
  ST_STATE[mountId]={n:0,cfg};
  const el=document.getElementById(mountId); if(!el) return;
  el.innerHTML=`${cfg.title?`<div class="st-title">${emo(cfg.title)}</div>`:''}<div class="st-list" id="${mountId}_list"></div>
    <button class="gc-btn st-next" id="${mountId}_next" onclick="stNext('${mountId}')"></button>`;
  stNext(mountId,true);
}
function stNext(mountId,silent){
  const s=ST_STATE[mountId]; if(!s) return;
  const steps=s.cfg.steps, list=document.getElementById(mountId+'_list'), btn=document.getElementById(mountId+'_next');
  if(!list||!btn) return;
  if(s.n>=steps.length){ s.n=0; list.innerHTML=''; }
  const st=steps[s.n]; s.n++;
  const d=document.createElement('div'); d.className='st-step';
  d.innerHTML=`<span class="st-n">${s.n}</span><div class="st-body"><div class="st-say">${emo(st.say)}</div>${st.vis?emo(st.vis):''}</div>`;
  list.appendChild(d);
  if(!silent){ sStep(); try{ d.scrollIntoView({block:'nearest',behavior:'smooth'}); }catch(e){} }
  const last=s.n>=steps.length;
  btn.textContent = last ? '↺ Xem lại từ đầu' : `👆 Bấm để xem bước ${s.n+1}/${steps.length}`;
  btn.classList.toggle('done', last);
}

/* ===== NHÓM ĐỒ VẬT: PHÉP NHÂN (xếp vào từng nhóm) / PHÉP CHIA (chia đều vào đĩa) =====
   mode:"mul" {groups, per, icon}  |  mode:"div" {total, icon, groups} hoặc {total, icon, per} */
const GV_CFG={}, GV_PLAYED={};
function gvGroupCount(cfg){ return cfg.mode==='mul' ? cfg.groups : (cfg.groups || cfg.total/cfg.per); }
function mountGroupViz(mountId,cfg){
  GV_CFG[mountId]=cfg; GV_PLAYED[mountId]=false;
  const el=document.getElementById(mountId); if(!el) return;
  const label = cfg.mode==='mul' ? '👆 Bấm để xếp vào từng nhóm!' : '👆 Bấm để chia đều!';
  el.innerHTML=`<div class="gc-label">${emo(cfg.text)}</div>
    <div class="gv-stage" id="${mountId}_stage"></div>
    <button class="gc-btn" id="${mountId}_btn" onclick="gvPlay('${mountId}')">${label}</button>
    <div class="gc-eq" id="${mountId}_eq"></div>`;
  gvReset(mountId);
}
function gvReset(mountId){
  const cfg=GV_CFG[mountId]; const stage=document.getElementById(mountId+'_stage'); if(!stage) return;
  const g=gvGroupCount(cfg);
  let html='';
  if(cfg.mode==='div'){
    html+=`<div class="gv-pool">`+Array.from({length:cfg.total},(_,i)=>`<span class="gv-ic" id="${mountId}_p${i}">${emo(cfg.icon)}</span>`).join('')+`</div>`;
  }
  const dyn = cfg.mode==='div' && !cfg.groups;   // chia theo "mỗi đĩa per cái": đĩa xuất hiện dần, không lộ đáp án
  html+=`<div class="gv-plates" id="${mountId}_plates">`+(dyn?'':Array.from({length:g},(_,i)=>`<div class="gv-plate" id="${mountId}_g${i}"></div>`).join(''))+`</div>`;
  stage.innerHTML=html;
  const eq=document.getElementById(mountId+'_eq'); if(eq){ eq.innerHTML=''; eq.classList.remove('show'); }
  GV_PLAYED[mountId]=false;
}
function gvPlay(mountId){
  const cfg=GV_CFG[mountId]; if(!cfg) return;
  if(GV_PLAYED[mountId]) gvReset(mountId);
  const btn=document.getElementById(mountId+'_btn'); if(btn) btn.disabled=true;
  const g=gvGroupCount(cfg);
  const step=cfg.mode==='mul' ? 150 : 170;
  const dyn = cfg.mode==='div' && !cfg.groups;
  const put=(gi)=>{ let pl=document.getElementById(mountId+'_g'+gi);
    if(!pl && dyn){ const wrap=document.getElementById(mountId+'_plates'); if(!wrap) return;
      pl=document.createElement('div'); pl.className='gv-plate'; pl.id=mountId+'_g'+gi; wrap.appendChild(pl); }
    if(!pl) return;
    const s=document.createElement('span'); s.className='gv-ic gv-new'; s.innerHTML=emo(cfg.icon); pl.appendChild(s); sStep(); };
  let n=0, total;
  if(cfg.mode==='mul'){
    total=g*cfg.per;
    for(let gi=0; gi<g; gi++){ for(let k=0;k<cfg.per;k++){ const gi2=gi; setTimeout(()=>put(gi2), n*step); n++; } }
  } else {
    total=cfg.total;
    for(let i=0;i<total;i++){
      setTimeout(()=>{ const src=document.getElementById(mountId+'_p'+i); if(src) src.style.visibility='hidden'; put(dyn?Math.floor(i/cfg.per):i%g); }, i*step);
    }
    n=total;
  }
  setTimeout(()=>{
    const eq=document.getElementById(mountId+'_eq'); if(!eq) return;
    if(cfg.mode==='mul') eq.innerHTML=`${Array(g).fill(cfg.per).join(' + ')} = ${total}<br>${cfg.per} × ${g} = ${total}`;
    else eq.innerHTML = cfg.groups ? `${total} : ${g} = ${total/g}` : `${total} : ${cfg.per} = ${g}`;
    eq.classList.add('show'); sWin(); GV_PLAYED[mountId]=true; if(btn) btn.disabled=false;
  }, n*step+500);
}

/* ===== HÀNG TRĂM – CHỤC – ĐƠN VỊ (bấm +/− để tự dựng số) ===== */
const PV_STATE={};
function mountPlaceValue(mountId,cfg){
  PV_STATE[mountId]={h:cfg.h||0,t:cfg.t||0,u:cfg.u||0,th:cfg.th||0,thousand:!!cfg.thousand,fixed:!!cfg.fixed};
  const el=document.getElementById(mountId); if(!el) return;
  el.innerHTML=`${cfg.text?`<div class="gc-label">${emo(cfg.text)}</div>`:''}<div class="pv-cols" id="${mountId}_cols"></div><div class="pv-read" id="${mountId}_read"></div>`;
  pvRender(mountId);
}
function pvRender(mountId){
  const s=PV_STATE[mountId]; const cols=document.getElementById(mountId+'_cols'); if(!cols) return;
  const defs=[];
  if(s.thousand) defs.push({k:'th',name:'Nghìn',cls:'pv-th'});
  defs.push({k:'h',name:'Trăm',cls:'pv-h'},{k:'t',name:'Chục',cls:'pv-t'},{k:'u',name:'Đơn vị',cls:'pv-u'});
  cols.innerHTML=defs.map(d=>{
    const v=s[d.k];
    const items=Array.from({length:v},()=>`<span class="${d.cls}"></span>`).join('');
    const ctrl=s.fixed?'':`<div class="pv-ctrl"><button onclick="pvStep('${mountId}','${d.k}',-1)">−</button><button onclick="pvStep('${mountId}','${d.k}',1)">+</button></div>`;
    return `<div class="pv-col"><div class="pv-name">${d.name}</div><div class="pv-items">${items}</div><div class="pv-num">${v}</div>${ctrl}</div>`;
  }).join('');
  const n=s.th*1000+s.h*100+s.t*10+s.u;
  const parts=[];
  if(s.thousand&&s.th) parts.push(`${s.th} nghìn`);
  if(s.h) parts.push(`${s.h} trăm`); if(s.t) parts.push(`${s.t} chục`); if(s.u) parts.push(`${s.u} đơn vị`);
  document.getElementById(mountId+'_read').innerHTML=`Số: <b>${n}</b>${parts.length?' = '+parts.join(' '):''}`;
}
function pvStep(mountId,k,d){
  const s=PV_STATE[mountId]; const max=(k==='th')?1:9;
  const v=s[k]+d; if(v<0||v>max) return;
  s[k]=v;
  if(s.thousand){ if(k==='th' && v===1){ s.h=s.t=s.u=0; } else if(k!=='th' && s.th===1){ s[k]=0; } }
  sStep(); pvRender(mountId);
}

/* ===== BIỂU ĐỒ TRANH (mỗi hàng 1 loại, số hình = số lượng) ===== */
function mountPictoChart(mountId,cfg){
  const el=document.getElementById(mountId); if(!el) return;
  const rows=cfg.rows.map(r=>`<div class="cmp-row"><span class="cmp-label">${r.label}</span><div class="cmp-icons">`+
    Array.from({length:r.n},(_,i)=>`<span class="cmp-ic" style="animation-delay:${i*50}ms">${emo(r.icon)}</span>`).join('')+`</div></div>`).join('');
  el.innerHTML=`${cfg.title?`<div class="gc-label">${emo(cfg.title)}</div>`:''}${rows}${cfg.note?`<div class="pc-note">${emo(cfg.note)}</div>`:''}`;
}

/* ===== THƯỚC KẺ: đoạn từ vạch start đến vạch end ===== */
function mountRuler(mountId,cfg){
  const el=document.getElementById(mountId); if(!el) return;
  const max=cfg.max||15, a=cfg.start, b=cfg.end;
  let track='<div class="ru-track">';
  for(let i=0;i<=max;i++){ track+=`<div class="ru-tick${(i>=a&&i<=b)?' in':''}${(i===a||i===b)?' edge':''}">${i}</div>`; }
  track+='</div>';
  el.innerHTML=`${cfg.text?`<div class="gc-label">${emo(cfg.text)}</div>`:''}${track}<div class="gc-eq show" style="font-size:18px">${b} − ${a} = ${b-a} (${cfg.unit||'cm'})</div>`;
}

/* ===== FLIPBOOK — bài Học nhiều trang, mỗi trang ôn 1 bài, lật trang có hiệu ứng ===== */
let FB_STATE=null;
function mountFlipbook(L){
  FB_STATE={ idx:0, pages:L.pages, animating:false };
  const html=`<h2>${curContent.title} <span class="draft-badge">bản nháp</span></h2><div class="lead">${emo(L.intro)}</div>
    <div class="fb-wrap">
      <div class="fb-nav">
        <button class="fb-arrow" id="fbPrev" onclick="fbTurn(-1)">‹</button>
        <div class="fb-dots" id="fbDots"></div>
        <button class="fb-arrow" id="fbNext" onclick="fbTurn(1)">›</button>
      </div>
      <div class="fb-stage"><div class="fb-page" id="fbPage"></div></div>
    </div>`;
  document.getElementById('learnBody').innerHTML=html;
  renderFbPage();
}
function renderFbPage(){
  const {idx,pages}=FB_STATE;
  const page=pages[idx];
  const el=document.getElementById('fbPage'); if(!el) return;
  el.innerHTML = `<div class="fb-pagehead">Trang ${idx+1}/${pages.length} · ${page.title}</div>` + renderBlocksHtml(page.blocks);
  mountBlocksInteractive(page.blocks);
  document.getElementById('fbDots').innerHTML = pages.map((p,i)=>`<span class="fb-dot${i===idx?' active':''}"></span>`).join('');
  document.getElementById('fbPrev').disabled = idx===0;
  document.getElementById('fbNext').disabled = idx===pages.length-1;
}
function fbTurn(dir){
  if(!FB_STATE || FB_STATE.animating) return;
  const nextIdx=FB_STATE.idx+dir;
  if(nextIdx<0 || nextIdx>=FB_STATE.pages.length) return;
  FB_STATE.animating=true;
  const el=document.getElementById('fbPage');
  el.classList.add(dir>0?'fb-out-next':'fb-out-prev');
  sStep();
  setTimeout(()=>{
    FB_STATE.idx=nextIdx;
    renderFbPage();
    el.classList.remove('fb-out-next','fb-out-prev');
    el.classList.add(dir>0?'fb-in-next':'fb-in-prev');
    setTimeout(()=>{
      el.classList.remove('fb-in-next','fb-in-prev');
      FB_STATE.animating=false;
    },260);
  },260);
}

/* ===== ANIMATION TIA SỐ: số liền trước / số liền sau ===== */
function mountNumline(center){
  let html='<div class="nline-track">';
  for(let n=0;n<=11;n++){ html+=`<div class="nline-box" id="nb_${n}" onclick="playNumline(${n})">${n}</div>`; }
  html+='</div><div class="nline-explain" id="nlExplain">👉 Bấm vào một số bất kỳ để xem số liền trước, số liền sau!</div>';
  document.getElementById('numlineMount').innerHTML=html;
  playNumline(center);
}
function playNumline(center){
  document.querySelectorAll('.nline-box').forEach(b=>b.classList.remove('hl-blue','hl-amber','hl-grass'));
  const ex=document.getElementById('nlExplain');
  const b0=document.getElementById('nb_'+center); if(b0) b0.classList.add('hl-blue');
  ex.innerHTML=`Số đã chọn: <b style="color:var(--blue)">${center}</b> 👆`;
  const hasBefore=center>0;
  let delay=750;
  if(hasBefore){
    setTimeout(()=>{
      const b1=document.getElementById('nb_'+(center-1)); if(b1) b1.classList.add('hl-amber');
      ex.innerHTML=`Số liền <b>trước</b> của ${center} là <b style="color:var(--amber); font-size:20px">${center-1}</b> ⬅️`;
      sStep();
    },delay);
    delay+=900;
  }
  setTimeout(()=>{
    const b2=document.getElementById('nb_'+(center+1)); if(b2) b2.classList.add('hl-grass');
    ex.innerHTML = hasBefore
      ? `Số liền <b>sau</b> của ${center} là <b style="color:var(--grass); font-size:20px">${center+1}</b> ➡️`
      : `Số 0 không có số liền trước. Số liền <b>sau</b> của 0 là <b style="color:var(--grass); font-size:20px">1</b> ➡️`;
    sCarry();
  },delay);
}


/* ===== ANIMATION SO SÁNH HƠN KÉM (hai nhóm đồ vật) ===== */
function mountCompare(cfg){
  const {a,b,labelA,labelB,iconA,iconB}=cfg;
  const minAB=Math.min(a,b);
  let rowA='', rowB='';
  for(let i=0;i<a;i++) rowA+=`<span class="cmp-ic${i>=minAB?' cmp-extra':''}" style="animation-delay:${i*60}ms">${emo(iconA)}</span>`;
  for(let i=0;i<b;i++) rowB+=`<span class="cmp-ic${i>=minAB?' cmp-extra':''}" style="animation-delay:${i*60}ms">${emo(iconB)}</span>`;
  const diff=Math.abs(a-b);
  const resultText = a>b ? `${labelA} hơn ${labelB}` : (a<b ? `${labelB} hơn ${labelA}` : `${labelA} bằng ${labelB}`);
  const html=`
    <div class="cmp-row"><span class="cmp-label">${labelA} (${a})</span><div class="cmp-icons">${rowA}</div></div>
    <div class="cmp-row"><span class="cmp-label">${labelB} (${b})</span><div class="cmp-icons">${rowB}</div></div>
    <div class="cmp-result">${resultText} là <b style="color:var(--coral)">${diff}</b> ${diff>0?('(vì '+Math.max(a,b)+' − '+Math.min(a,b)+' = '+diff+')'):''}</div>`;
  document.getElementById('compareMount').innerHTML=html;
}

/* ===== ANIMATION CỘT SO SÁNH SỐ (bar chart) ===== */
function mountBarcompare(items){
  const vals=items.map(i=>i.n);
  const max=Math.max(...vals), min=Math.min(...vals);
  const range=(max-min)||1;
  let html='<div class="bar-row">';
  items.forEach((it,idx)=>{ html+=`<div class="bar-col"><div class="bar" id="barcol_${idx}"></div><div class="bar-num">${it.n}</div></div>`; });
  html+='</div>';
  document.getElementById('barcompareMount').innerHTML=html;
  items.forEach((it,idx)=>{
    const h=Math.round((it.n-min)/range*110)+30; // phóng đại chênh lệch: nhỏ nhất=30px, lớn nhất=140px
    setTimeout(()=>{ const el=document.getElementById('barcol_'+idx); if(el) el.style.height=h+'px'; },150*idx);
  });
}

/* ===== THẺ TỪ VỰNG CÓ HÌNH MINH HỌA ===== */
const isVideoSrc=src=>!!src && /\.(mp4|webm|mov)$/i.test(src);
function staticImg(word){ const a=IMAGE_ASSETS[word]; return (a && !isVideoSrc(a)) ? a : null; }
function iconHtml(it){
  const img=staticImg(it.word);
  if(img) return `<img class="emo-img" src="${img}" alt="${it.word}">`;
  return it.custom ? (CUSTOM_ICONS[it.custom] ? `<span class="emo-ic">${CUSTOM_ICONS[it.custom]}</span>` : '') : emo(it.icon);
}
function mountWordcards(mountId, items){
  let html='';
  items.forEach((it,i)=>{
    const hasImg=!!staticImg(it.word);
    const badge = (!hasImg && it.icon2) ? `<span class="ic-badge">${emo(it.icon2)}</span>` : '';
    html+=`<div class="wc-card" style="animation-delay:${i*90}ms"><span class="ic">${iconHtml(it)}${badge}</span><span class="wd">${it.word}</span></div>`;
  });
  const el=document.getElementById(mountId); if(el) el.innerHTML=html;
}

/* ===== THẺ HOẠT ĐỘNG TƯƠNG TÁC — bấm để xem chuyển động thật ===== */
function mountActioncards(mountId, items){
  let html='';
  items.forEach((it,i)=>{
    const id=mountId+'_ic'+i;
    const src=IMAGE_ASSETS[it.word];
    const isVideo=!!src && /\.(mp4|webm|mov)$/i.test(src);
    const hasImg=!!src && !isVideo;
    const iconContent = isVideo
      ? `<video class="emo-img" src="${src}" muted playsinline preload="metadata"></video><span class="ic-play">▶</span>`
      : (hasImg ? `<img class="emo-img" src="${src}" alt="${it.word}">` : emo(it.icon));
    const badge = (!hasImg && !isVideo && it.prop) ? `<span class="ic-badge">${emo(it.prop)}</span>` : '';
    const click = isVideo ? `playAction('${id}','${it.anim}','${src}')` : `playAction('${id}','${it.anim}')`;
    html+=`<div class="ac-card" style="animation-delay:${i*90}ms" onclick="${click}">
      <span class="ac-ic" id="${id}">${iconContent}${badge}</span>
      <span class="ac-wd">${it.word}</span>
      <span class="ac-tap">👆 Bấm để xem!</span>
    </div>`;
  });
  const el=document.getElementById(mountId); if(el) el.innerHTML=html;
}
function playAction(id, animName, videoSrc){
  if(videoSrc){ openSceneVideo(videoSrc); return; }
  const el=document.getElementById(id); if(!el) return;
  el.style.animation='none';
  void el.offsetWidth; // ép trình duyệt vẽ lại để animation chạy lại được từ đầu
  el.style.animation=animName+' .8s ease';
  sStep();
}

/* ===== THẺ CẢNH GHÉP 2 NHÂN VẬT — cho hành động cần tương tác (khám bệnh, dạy học...) =====
   Nếu đã có ảnh AI cho sceneKey này (IMAGE_ASSETS), hiển thị 1 ảnh lớn thay vì ghép icon. */
function mountScenecards(mountId, items){
  let html='';
  items.forEach((it,i)=>{
    const id=mountId+'_sc'+i;
    if(IMAGE_ASSETS[it.sceneKey]){
      const src=IMAGE_ASSETS[it.sceneKey];
      const isVideo=/\.(mp4|webm|mov)$/i.test(src);
      const media=isVideo
        ? `<video class="sc-img" src="${src}" muted playsinline preload="metadata"></video><span class="sc-play">▶</span>`
        : `<img class="sc-img" src="${src}" alt="${it.word}">`;
      html+=`<div class="sc-card" style="animation-delay:${i*90}ms" onclick="playScene('${id}','${src}')">
        <div class="sc-stage" id="${id}">${media}</div>
        <span class="sc-wd">${it.word}</span>
        <span class="sc-tap">👆 Bấm để xem!</span>
      </div>`;
    } else {
      const sc=SCENES[it.sceneKey];
      html+=`<div class="sc-card" style="animation-delay:${i*90}ms" onclick="playScene('${id}')">
        <div class="sc-stage" id="${id}">
          <div class="sc-char left">${sc.left}</div>
          <div class="sc-char right">${sc.right}</div>
          <div class="sc-prop" style="${sc.propStyle}">${sc.prop}</div>
        </div>
        <span class="sc-wd">${it.word}</span>
        <span class="sc-tap">👆 Bấm để xem!</span>
      </div>`;
    }
  });
  const el=document.getElementById(mountId); if(el) el.innerHTML=html;
}
function playScene(id,videoSrc){
  if(videoSrc){ openSceneVideo(videoSrc); return; }
  const el=document.getElementById(id); if(!el) return;
  el.style.animation='none';
  void el.offsetWidth;
  el.style.animation='scenePulse .8s ease';
  sCarry();
}
function openSceneVideo(src){
  const modal=document.getElementById('videoModal');
  const player=document.getElementById('videoModalPlayer');
  if(!modal || !player) return;
  if(player.getAttribute('src')!==src) player.setAttribute('src', src);
  modal.classList.add('open');
  player.currentTime=0;
  player.play();
  sCarry();
}
function toggleSceneVideo(v){
  if(v.paused){ if(v.ended) v.currentTime=0; v.play(); } else { v.pause(); }
}
function closeSceneModal(e){
  if(e && e.target.id!=='videoModal' && !e.target.classList.contains('video-modal-close')) return;
  const modal=document.getElementById('videoModal');
  const player=document.getElementById('videoModalPlayer');
  if(!modal) return;
  modal.classList.remove('open');
  if(player) player.pause();
}

/* ===== BẢNG CỬU CHƯƠNG (2-9) — chọn số, xem bảng nhân của số đó, kết quả tính bằng code ===== */
function mountCuuChuong(mountId, nums){
  const el=document.getElementById(mountId); if(!el) return;
  const tabs=nums.map(n=>`<button class="cc-tab" data-n="${n}" onclick="ccPick('${mountId}',${n})">${n}</button>`).join('');
  el.innerHTML=`<div class="cc-tabs">${tabs}</div><div class="cc-table" id="${mountId}_table"></div>`;
  ccPick(mountId, nums[0]);
}
function ccPick(mountId, n){
  const wrap=document.getElementById(mountId); if(!wrap) return;
  wrap.querySelectorAll('.cc-tab').forEach(t=>t.classList.toggle('active', Number(t.dataset.n)===n));
  const rows=Array.from({length:10},(_,i)=>i+1).map(k=>
    `<div class="cc-row"><span>${n} × ${k}</span><b>${n*k}</b></div>`).join('');
  document.getElementById(mountId+'_table').innerHTML=rows;
}

/* ===== NHÓM VẬT THỂ TRỰC QUAN (bể cá, cành chim...) — bấm nút để xem cộng/trừ diễn ra thật =====
   op:"+" thêm delta con (màu khác, hiệu ứng xuất hiện); op:"-" bớt delta con (bay/biến mất). */
const GC_CFG={}, GC_PLAYED={};
function mountGroupCalc(mountId, cfg){
  GC_CFG[mountId]=cfg; GC_PLAYED[mountId]=false;
  const el=document.getElementById(mountId); if(!el) return;
  const stageCls = cfg.scene==='tank' ? 'gc-tank' : 'gc-branch';
  const btnLabel = cfg.op==='+' ? `👆 Bấm để xem thêm ${cfg.delta} con!` : `👆 Bấm để xem ${cfg.delta} con bay đi!`;
  el.innerHTML = `<div class="gc-label">${emo(cfg.text)}</div>
    <div class="gc-stage ${stageCls}" id="${mountId}_stage"></div>
    <button class="gc-btn" id="${mountId}_btn" onclick="gcPlay('${mountId}')">${btnLabel}</button>
    <div class="gc-eq" id="${mountId}_eq"></div>`;
  gcReset(mountId);
}
function gcReset(mountId){
  const cfg=GC_CFG[mountId];
  const stage=document.getElementById(mountId+'_stage'); if(!stage) return;
  stage.innerHTML = Array.from({length:cfg.start}).map(()=>`<span class="gc-icon">${emo(cfg.icon)}</span>`).join('');
  const eq=document.getElementById(mountId+'_eq'); if(eq){ eq.textContent=''; eq.classList.remove('show'); }
  GC_PLAYED[mountId]=false;
}
function gcPlay(mountId){
  const cfg=GC_CFG[mountId]; if(!cfg) return;
  const btn=document.getElementById(mountId+'_btn');
  if(GC_PLAYED[mountId]){ gcReset(mountId); }
  const stage=document.getElementById(mountId+'_stage'); if(!stage) return;
  if(btn) btn.disabled=true;
  if(cfg.op==='+'){
    const total=cfg.start+cfg.delta;
    for(let i=0;i<cfg.delta;i++){
      const span=document.createElement('span');
      span.className='gc-icon gc-new';
      span.style.animationDelay=(i*160)+'ms';
      span.innerHTML=emo(cfg.deltaIcon||cfg.icon);
      stage.appendChild(span);
    }
    sCarry();
    setTimeout(()=>{
      const eq=document.getElementById(mountId+'_eq');
      if(eq){ eq.textContent=`${cfg.start} + ${cfg.delta} = ${total}`; eq.classList.add('show'); }
      sWin(); GC_PLAYED[mountId]=true; if(btn) btn.disabled=false;
    }, cfg.delta*160+500);
  } else {
    const icons=[...stage.querySelectorAll('.gc-icon')];
    const leaving=icons.slice(-cfg.delta);
    leaving.forEach((ic,i)=>{ ic.style.animationDelay=(i*160)+'ms'; ic.classList.add('gc-leaving'); });
    sStep();
    setTimeout(()=>{
      leaving.forEach(ic=>ic.remove());
      const result=cfg.start-cfg.delta;
      const eq=document.getElementById(mountId+'_eq');
      if(eq){ eq.textContent=`${cfg.start} − ${cfg.delta} = ${result}`; eq.classList.add('show'); }
      sWin(); GC_PLAYED[mountId]=true; if(btn) btn.disabled=false;
    }, cfg.delta*160+700);
  }
}

/* ===== ANIMATION CỘT DỌC (hỗ trợ cả CỘNG và TRỪ, 2 hoặc 3 chữ số) ===== */
let vModel, vStepPos, vAutoTimer, vProblems, vCurIdx;
function digitsN(n,len){const s=String(n).padStart(len,'0');return s.split('');}
function vBuild(a,b,op){
  const total = op==='-' ? a-b : a+b;
  const digitCount=Math.max(String(a).length,String(b).length,String(total).length,2);
  const A=digitsN(a,digitCount),B=digitsN(b,digitCount);
  const names3=['đơn vị','chục','trăm'];
  const idxs=[]; for(let i=digitCount-1;i>=0;i--) idxs.push(i);
  const out=[]; let carry=0; const res=new Array(digitCount).fill('');
  for(let k=0;k<digitCount;k++){
    const idx=idxs[k]; const name=names3[k]; const da=+A[idx], db=+B[idx];
    if(op==='-'){
      const daEff=da-carry; let bOut=0, diff;
      if(daEff<db){ diff=daEff+10-db; bOut=1; } else { diff=daEff-db; bOut=0; }
      out.push({colIdx:idx,name,da,db,daEff,carryIn:carry,diff,carryOut:bOut,op});
      res[idx]=String(diff); carry=bOut;
    } else {
      const sum=da+db+carry; const write=sum%10, nc=Math.floor(sum/10);
      out.push({colIdx:idx,name,da,db,carryIn:carry,sum,write,carryOut:nc,op});
      res[idx]=String(write); carry=nc;
    }
  }
  return {out,res,total,digitCount};
}
function mountVCalc(){
  const key=Object.keys(CONTENT).find(k=>CONTENT[k]===curContent);
  vProblems = VCALC_PROBLEMS[key] || [{a:255,b:204,note:"không nhớ",op:"+"}];
  vCurIdx=0;
  const mount=document.getElementById('vcalcMount');
  mount.innerHTML=`<div class="vpicker" id="vpicker"></div>
    <div class="vboard"><div class="vcalc" id="vcalc"></div>
      <div class="vlegend" id="vlegend"></div>
      <div class="vexplain" id="vexplain">Bấm “Bước tiếp” hoặc “Tự chạy”.</div></div>
    <div class="vctrl">
      <button class="vbtn step" id="vstep" onclick="vDoStep()">Bước tiếp →</button>
      <button class="vbtn auto" id="vauto" onclick="vAuto()">▶ Tự chạy</button>
      <button class="vbtn rst" onclick="vLoad(vCurIdx)" aria-label="Làm lại">🔄</button></div>`;
  vLoad(0);
}
function vLoad(i){
  vCurIdx=i; vStopAuto();
  const p=vProblems[i]; vModel=vBuild(p.a,p.b,p.op||'+'); vStepPos=0;
  const pk=document.getElementById('vpicker'); pk.innerHTML='';
  vProblems.forEach((pr,idx)=>{
    const b=document.createElement('button'); b.className='vpick'+(idx===i?' act':'');
    b.innerHTML=`${pr.a} ${pr.op==='-'?'−':'+'} ${pr.b}<span>(${pr.note})</span>`; b.onclick=()=>vLoad(idx);
    pk.appendChild(b);
  });
  vRenderBoard(p);
  const names = vModel.digitCount===3 ? ['Trăm','Chục','Đơn vị'] : ['Chục','Đơn vị'];
  document.getElementById('vlegend').innerHTML = names.map(n=>`<div class="l">${n}</div>`).join('');
  const ex=document.getElementById('vexplain'); ex.textContent='Bấm “Bước tiếp” hoặc “Tự chạy”.'; ex.className='vexplain';
  document.getElementById('vstep').disabled=false; document.getElementById('vauto').disabled=false;
}
function vRenderBoard(p){
  const dc=vModel.digitCount;
  const A=digitsN(p.a,dc), B=digitsN(p.b,dc);
  const carrySpans=Array.from({length:dc},(_,i)=>`<span class="vcarry" id="vc${i}"></span>`).join('');
  const aSpans=A.map(d=>`<span class="vdigit">${d}</span>`).join('');
  const bSpans=B.map(d=>`<span class="vdigit">${d}</span>`).join('');
  const resSpans=Array.from({length:dc},(_,i)=>`<span class="vres" id="vr${i}">${vModel.res[i]}</span>`).join('');
  const opSym=p.op==='-'?'−':'+';
  document.getElementById('vcalc').innerHTML=`
    <div class="vcarry-row">${carrySpans}</div>
    <div class="vnum-row">${aSpans}</div>
    <div class="vnum-row"><span class="vplus">${opSym}</span>${bSpans}</div>
    <div class="vrule"></div>
    <div class="vres-row">${resSpans}</div>`;
}
function vColDigits(colIdx){
  const rows=document.querySelectorAll('#vcalc .vnum-row');
  return [rows[0].querySelectorAll('.vdigit')[colIdx], rows[1].querySelectorAll('.vdigit')[colIdx]];
}
function vClearHl(){document.querySelectorAll('#vcalc .vdigit').forEach(d=>d.classList.remove('hl'));}
function vDoStep(){
  if(!vModel || vStepPos>=vModel.out.length) return;
  const s=vModel.out[vStepPos]; vClearHl();
  const [top,bot]=vColDigits(s.colIdx); top.classList.add('hl'); bot.classList.add('hl'); sStep();
  let txt;
  if(s.op==='-'){
    if(s.carryOut>0){
      txt=`Cột <b>${s.name}</b>: ${s.daEff} không đủ trừ ${s.db}, mượn 1 chục: ${s.daEff+10} − ${s.db} = ${s.diff}. Viết <b>${s.diff}</b>, nhớ mượn <b>1</b>.`;
    } else {
      txt=`Cột <b>${s.name}</b>: ${s.daEff} − ${s.db} = ${s.diff}. Viết <b>${s.diff}</b>.`;
    }
  } else {
    txt=`Cột <b>${s.name}</b>: ${s.da} + ${s.db}`;
    if(s.carryIn>0) txt+=` + ${s.carryIn} (nhớ)`;
    txt+=` = ${s.sum}. `+(s.carryOut>0?`Viết <b>${s.write}</b>, nhớ <b>${s.carryOut}</b>.`:`Viết <b>${s.write}</b>.`);
  }
  document.getElementById('vexplain').innerHTML=txt;
  setTimeout(()=>{
    document.getElementById('vr'+s.colIdx).classList.add('show');
    top.classList.remove('hl'); bot.classList.remove('hl'); top.classList.add('done'); bot.classList.add('done');
    if(s.carryOut>0 && s.colIdx>0){
      const c=document.getElementById('vc'+(s.colIdx-1));
      if(s.op==='-'){ c.textContent='−1'; } else { c.textContent=s.carryOut; }
      c.classList.add('show'); sCarry();
    }
  },400);
  vStepPos++;
  if(vStepPos>=vModel.out.length) setTimeout(vFinish,700);
}
function vFinish(){
  document.getElementById('vstep').disabled=true; document.getElementById('vauto').disabled=true;
  const p=vProblems[vCurIdx];
  const ex=document.getElementById('vexplain');
  const opSym=p.op==='-'?'−':'+';
  ex.innerHTML=`🎉 <b style="color:var(--blue)">${p.a} ${opSym} ${p.b} = ${vModel.total}</b>`; ex.className='vexplain done';
  sWin();
}
function vAuto(){
  vStopAuto();
  document.getElementById('vauto').textContent='⏸ Đang chạy'; document.getElementById('vauto').disabled=true; document.getElementById('vstep').disabled=true;
  (function tick(){ if(vModel && vStepPos<vModel.out.length){vDoStep(); vAutoTimer=setTimeout(tick,1600);} else vStopAuto(); })();
}
function vStopAuto(){
  if(vAutoTimer){clearTimeout(vAutoTimer); vAutoTimer=null;}
  const ab=document.getElementById('vauto'); if(ab){ab.textContent='▶ Tự chạy';
    if(vModel && vStepPos<vModel.out.length){ab.disabled=false; document.getElementById('vstep').disabled=false;}}
}

/* ===== QUIZ ===== */
function randInt(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function shuffleArr(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function distinctOptions(correct,count,genCandidate){
  const set=new Set([String(correct)]); const result=[String(correct)]; let guard=0;
  while(result.length<count+1 && guard<200){ guard++;
    const raw=genCandidate();
    if(typeof raw==="number" && raw<0) continue;
    const v=String(raw);
    if(!set.has(v)){ set.add(v); result.push(v); }
  }
  return shuffleArr(result);
}
const QUIZ_TARGET=10; // số câu mỗi lượt luyện tập/kiểm tra
function buildQuizList(mode){
  const fixed=(curContent[mode]||[]).slice();
  const pool=curContent.gen||[];
  let list=fixed.slice();
  const sig=q=>q.q+'|'+String(q.expr||'')+'|'+String(q.answer);
  const seen=new Set(list.map(sig));
  let guard=0;
  while(list.length<QUIZ_TARGET && pool.length>0 && guard<80){
    guard++;
    const q=pool[Math.floor(Math.random()*pool.length)]();
    const s=sig(q);
    if(seen.has(s)) continue;
    seen.add(s); list.push(q);
  }
  return shuffleArr(list);
}
function openQuiz(mode){
  if(!curContent) return;
  curMode=mode; quizList=buildQuizList(mode);
  qi=0; correctCount=0; streakLocal=0;
  const tag=document.getElementById('modeTag');
  tag.textContent=mode==='practice'?'Luyện tập':'Kiểm tra';
  tag.className='mode-tag '+(mode==='practice'?'practice':'test');
  show('s_quiz'); renderQ();
}
function restartQuiz(){ openQuiz(curMode); }
function renderQ(){
  locked=false; hintUsed=false;
  const q=quizList[qi];
  document.getElementById('bar').style.width=(qi/quizList.length*100)+'%';
  document.getElementById('count').textContent=(qi+1)+'/'+quizList.length;
  document.getElementById('feedback').textContent=''; document.getElementById('feedback').className='feedback';
  document.getElementById('hintbox').className='hintbox';
  document.getElementById('nextBtn').classList.add('hidden');
  const hb=document.getElementById('hintBtn'); hb.classList.toggle('hidden', !(curMode==='practice' && q.hint));
  const body=document.getElementById('qbody');
  if(q.type==='mc') body.innerHTML=renderMC(q);
  else if(q.type==='fill') renderFill(q,body);
}
function renderMC(q){
  const L=['A','B','C','D'];
  let html=`<div class="qtext">${q.q}</div>`;
  if(q.visual) html+=`<div class="qvisual${q.vsmall?' sm':''}">${emo(q.visual)}</div>`;
  html+=`<div class="opts ${q.two?'two':''}" id="opts">`;
  q.options.forEach((o,i)=>{ html+=`<button class="opt" onclick="pickMC(${i})">${q.two?'':`<span class="letter">${L[i]}</span>`}${o}</button>`; });
  return html+`</div>`;
}
function pickMC(i){
  if(locked) return; locked=true;
  const q=quizList[qi]; const btns=document.querySelectorAll('#opts .opt');
  if(i===q.answer){btns[i].classList.add('good'); win('Đúng rồi! 🎉');}
  else{btns[i].classList.add('bad'); btns[q.answer].classList.add('reveal'); lose('Đáp án đúng có màu xanh');}
}
let fillVal='';
function renderFill(q,body){
  fillVal='';
  let html=`<div class="qtext">${q.q}</div>`;
  if(q.expr) html+=`<div class="qbig">${q.expr} = ?</div>`;
  if(q.visual) html+=`<div class="qvisual${q.vsmall?' sm':''}">${emo(q.visual)}</div>`;
  html+=`<div style="text-align:center;margin:14px 0"><span style="display:inline-block;min-width:110px;border-bottom:4px solid var(--blue);font-size:34px;font-weight:800;padding:4px 12px;color:var(--blue)" id="slot">?</span></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:290px;margin:12px auto 0">`;
  [1,2,3,4,5,6,7,8,9].forEach(n=>html+=`<button class="opt" style="justify-content:center;padding:16px" onclick="tapKey('${n}')">${n}</button>`);
  html+=`<button class="opt" style="justify-content:center;padding:16px" onclick="tapKey('back')">⌫</button>
    <button class="opt" style="justify-content:center;padding:16px" onclick="tapKey('0')">0</button>
    <button class="opt" style="justify-content:center;padding:16px;background:var(--blue);color:#fff;border-color:var(--blue)" onclick="submitFill()">✓</button></div>`;
  body.innerHTML=html;
}
function tapKey(k){ if(locked) return; if(k==='back') fillVal=fillVal.slice(0,-1); else if(fillVal.length<4) fillVal+=k;
  document.getElementById('slot').textContent=fillVal||'?'; }
function submitFill(){
  if(locked||fillVal==='') return; locked=true;
  const q=quizList[qi]; const slot=document.getElementById('slot');
  if(Number(fillVal)===q.answer){slot.style.color='var(--grass)'; win('Chính xác! 🎉');}
  else{slot.style.color='var(--coral)'; lose('Đáp án đúng là '+q.answer);}
}
function showHint(){ const q=quizList[qi]; const hb=document.getElementById('hintbox');
  hb.textContent='💡 '+q.hint; hb.classList.add('show'); hintUsed=true; document.getElementById('hintBtn').classList.add('hidden'); }
function win(msg){
  correctCount++; streakLocal++; stars++; document.getElementById('stars').textContent=stars; localStorage.setItem('bhg2_stars',stars);
  const f=document.getElementById('feedback'); f.textContent=msg; f.className='feedback ok'; sRight(); showNext();
}
function lose(msg){ streakLocal=0; const f=document.getElementById('feedback'); f.textContent=msg; f.className='feedback no'; sWrong(); showNext(); }
function showNext(){ locked=true; document.getElementById('hintBtn').classList.add('hidden');
  const nb=document.getElementById('nextBtn'); nb.classList.remove('hidden');
  nb.textContent=qi<quizList.length-1?'Tiếp theo →':'Xem kết quả 🏁'; }
function nextQ(){ qi++; if(qi<quizList.length) renderQ(); else finish(); }
function finish(){
  document.getElementById('bar').style.width='100%';
  const total=quizList.length, pct=correctCount/total;
  show('s_result'); sWin(); confetti();
  const medal=pct===1?'🏆':pct>=.7?'🥇':pct>=.5?'🥈':'🌱';
  const title=pct===1?'Hoàn hảo!':pct>=.7?'Rất giỏi!':pct>=.5?'Tốt lắm!':'Cố lên nào!';
  const msg=pct===1?'Con làm đúng tất cả! Tuyệt vời!':pct>=.7?'Con làm rất tốt, tiếp tục nhé!':pct>=.5?'Khá lắm, luyện thêm sẽ giỏi hơn!':'Không sao đâu, làm lại sẽ giỏi hơn!';
  document.getElementById('medal').textContent=medal;
  document.getElementById('rTitle').textContent=title;
  document.getElementById('rMsg').textContent=msg;
  document.getElementById('rScore').textContent=correctCount;
  document.getElementById('rTotal').textContent=total;
  const n=pct===1?3:pct>=.7?2:pct>=.4?1:0;
  document.getElementById('rStars').textContent='⭐'.repeat(n)+'☆'.repeat(3-n);
}
function confetti(){
  const e=['🎉','⭐','🎊','✨','🌟','💙','🧡'];
  for(let i=0;i<40;i++){const c=document.createElement('div');c.className='confetti';c.textContent=pick(e);
    c.style.left=Math.random()*100+'vw';c.style.animationDuration=(2+Math.random()*2)+'s';c.style.animationDelay=(Math.random()*.6)+'s';
    document.body.appendChild(c);setTimeout(()=>c.remove(),4300);}
}

/* Quay lại */
function goBack(){
  const cur=document.querySelector('.screen.active').id;
  if(cur==='s_lessons') goHomeSubject();
  else if(cur==='s_modes') openSubject(curSubject);
  else if(cur==='s_learn'||cur==='s_quiz'||cur==='s_result') goToModes();
  else goHomeSubject();
}

['touchstart','click'].forEach(ev=>document.body.addEventListener(ev,()=>{
  if(!actx){try{actx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}}
},{once:true}));

document.getElementById('mascot').textContent=pick(MASCOTS);
