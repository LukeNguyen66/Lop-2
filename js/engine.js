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
  let html=`<h2>${curContent.title} <span class="draft-badge">bản nháp</span></h2><div class="lead">${L.intro}</div>`;
  L.blocks.forEach((b,idx)=>{
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
  });
  document.getElementById('learnBody').innerHTML=html;
  // gắn animation nếu có
  if(L.blocks.some(b=>b.type==='vcalc')) mountVCalc();
  const nlBlock=L.blocks.find(b=>b.type==='numline');
  if(nlBlock) mountNumline(nlBlock.center);
  const cmpBlock=L.blocks.find(b=>b.type==='compare');
  if(cmpBlock) mountCompare(cmpBlock);
  const barBlock=L.blocks.find(b=>b.type==='barcompare');
  if(barBlock) mountBarcompare(barBlock.items);
  L.blocks.forEach((b,idx)=>{ if(b.type==='wordcards') mountWordcards('wordcardsMount_'+idx, b.items); });
  L.blocks.forEach((b,idx)=>{ if(b.type==='actioncards') mountActioncards('actioncardsMount_'+idx, b.items); });
  L.blocks.forEach((b,idx)=>{ if(b.type==='scenecards') mountScenecards('scenecardsMount_'+idx, b.items); });
  L.blocks.forEach((b,idx)=>{ if(b.type==='cuuchuong') mountCuuChuong('cuuchuongMount_'+idx, b.nums); });
  show('s_learn');
}
function afterLearn(){ if(curContent) openQuiz('practice'); }

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
function iconHtml(it){
  if(IMAGE_ASSETS[it.word]) return `<img class="emo-img" src="${IMAGE_ASSETS[it.word]}" alt="${it.word}">`;
  return it.custom ? (CUSTOM_ICONS[it.custom] ? `<span class="emo-ic">${CUSTOM_ICONS[it.custom]}</span>` : '') : emo(it.icon);
}
function mountWordcards(mountId, items){
  let html='';
  items.forEach((it,i)=>{
    const hasImg=!!IMAGE_ASSETS[it.word];
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
    const hasImg=!!IMAGE_ASSETS[it.word];
    const iconContent = hasImg ? `<img class="emo-img" src="${IMAGE_ASSETS[it.word]}" alt="${it.word}">` : emo(it.icon);
    const badge = (!hasImg && it.prop) ? `<span class="ic-badge">${emo(it.prop)}</span>` : '';
    html+=`<div class="ac-card" style="animation-delay:${i*90}ms" onclick="playAction('${id}','${it.anim}')">
      <span class="ac-ic" id="${id}">${iconContent}${badge}</span>
      <span class="ac-wd">${it.word}</span>
      <span class="ac-tap">👆 Bấm để xem!</span>
    </div>`;
  });
  const el=document.getElementById(mountId); if(el) el.innerHTML=html;
}
function playAction(id, animName){
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
  if(q.visual) html+=`<div class="qvisual">${emo(q.visual)}</div>`;
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
  if(q.visual) html+=`<div class="qvisual">${emo(q.visual)}</div>`;
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
