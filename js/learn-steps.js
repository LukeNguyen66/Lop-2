/* ===== PHẦN HỌC — HƯỚNG DẪN TỪNG BƯỚC (ghi đè `learn` của các bài) =====
   Nạp SAU content-tap2.js, TRƯỚC engine.js. Mỗi bài: lời giải thích rõ ràng + khối "stepper"
   (bấm từng bước, có hình minh hoạ) + giữ các khối tương tác cũ (tia số, bể cá, đặt tính...).
   Nguyên tắc viết: nói rõ LÀM GÌ và VÌ SAO, không chỉ liệt kê kết quả; tránh lời chung chung. */
(function(){
  /* ---------- hình minh hoạ dùng chung (trả về chuỗi HTML) ---------- */
  const rep=(c,n)=>Array.from({length:Math.max(0,n)},()=>c);
  const dots=(n,c)=>`<span class="dt-row">${rep(c,n).map(x=>`<i class="dt ${x}"></i>`).join('')}</span>`;
  const row=(lab,inner)=>`<div class="vis-row"><span class="vis-lab">${lab}</span>${inner}</div>`;
  const N=(x,c)=>`<b class="n-${c}">${x}</b>`;
  const eq=h=>`<div class="st-eq">${h}</div>`;
  const tag=(t,c)=>`<span class="st-tag ${c||''}">${t}</span>`;
  // khung 10 ô (mỗi khung 2 hàng × 5); seq = mảng màu từng chấm; out = các chấm đặt bên ngoài
  function frames(seq,out){
    const nf=Math.max(1,Math.ceil(seq.length/10));
    let h='<div class="tf-wrap">';
    for(let f=0;f<nf;f++){
      h+='<div class="tf">';
      for(let i=0;i<10;i++){ const c=seq[f*10+i]; h+=`<span class="tfc">${c?`<i class="dt ${c}"></i>`:''}</span>`; }
      h+='</div>';
    }
    if(out && out.length) h+=`<span class="tf-plus">+</span><span class="dt-row">${out.map(c=>`<i class="dt ${c}"></i>`).join('')}</span>`;
    return h+'</div>';
  }
  // dải số (giống thước): hl = {số:'in'|'edge'|'pre'|'nxt'}
  const strip=(from,to,hl)=>{ let h='<div class="ru-track">'; for(let i=from;i<=to;i++) h+=`<div class="ru-tick ${(hl&&hl[i])||''}">${i}</div>`; return h+'</div>'; };
  // chục – đơn vị – trăm bằng hình
  const pvr=(n,cls)=>`<span class="pvr">${rep(cls,n).map(c=>`<span class="${c}"></span>`).join('')}</span>`;
  function pv(h,t,u){
    let s='';
    if(h) s+=row('Trăm',pvr(h,'pv-h'));
    if(t) s+=row('Chục',pvr(t,'pv-t'));
    if(u) s+=row('Đơn vị',pvr(u,'pv-u'));
    return s;
  }
  // phép tính đặt cột: done = số cột đã tính xong (từ phải sang); cột đang tính được tô vàng
  function col(a,b,op,done){
    const res=op==='+'?a+b:a-b;
    const L=Math.max(String(a).length,String(b).length,String(res).length);
    const dig=(n,i)=>{ const s=String(n); const k=L-1-i; return k<s.length ? s[s.length-1-k] : ''; };
    const cell=(txt,i,extra)=>`<td class="${(L-1-i)===done?'cur':''} ${extra||''}">${txt}</td>`;
    let r1='<td></td>', r2=`<td>${op==='+'?'+':'−'}</td>`, r3='<td></td>';
    for(let i=0;i<L;i++){
      r1+=cell(dig(a,i),i); r2+=cell(dig(b,i),i);
      const k=L-1-i, show=k<done; const d=dig(res,i);
      r3+=cell(d===''?'':(show?d:'?'),i,show?'':'q');
    }
    return `<table class="cl"><tr>${r1}</tr><tr>${r2}</tr><tr class="cl-rule">${r3}</tr></table>`;
  }

  /* ---------- tạo các bước mẫu ---------- */
  // a + b qua 10: tách số hạng thứ hai để cùng số thứ nhất thành 10 (a < 10, a + b > 10)
  function congQua10(a,b){
    const need=10-a, rest=b-need, sum=a+b;
    return [
      {say:`Ta tính <b>${a} + ${b}</b>. Xếp ${a} chấm xanh vào khung 10 ô. Còn ${b} chấm cam để ở ngoài.`,
        vis:frames(rep('a',a),rep('b',b))},
      {say:`Khung 10 ô còn thiếu <b>${need}</b> ô mới đầy. Vì vậy ta tách <b>${b} = ${need} + ${rest}</b>: lấy ${need} chấm để lấp cho đầy khung, còn lại ${rest} chấm.`,
        vis:frames(rep('a',a),rep('b',need).concat(rep('c',rest)))+eq(`${b} = ${N(need,'b')} + ${N(rest,'c')}`)},
      {say:`Chuyển ${need} chấm cam vào khung: <b>${a} + ${need} = 10</b>. Khung đã đầy 10 ô.`,
        vis:frames(rep('a',a).concat(rep('b',need)),rep('c',rest))+eq(`${a} + ${N(need,'b')} = 10`)},
      {say:`Còn ${rest} chấm xanh lá ở ngoài. Cộng tiếp: <b>10 + ${rest} = ${sum}</b>.`,
        vis:frames(rep('a',a).concat(rep('b',need)).concat(rep('c',rest)))+eq(`10 + ${N(rest,'c')} = ${sum}`)},
      {say:`Vậy <b>${a} + ${b} = ${sum}</b>. Viết gọn: ${a} + ${b} = ${a} + ${need} + ${rest} = 10 + ${rest} = ${sum}.`,
        vis:eq(`${a} + ${b} = ${sum}`)},
    ];
  }
  // a − b qua 10: tách số bị trừ a = 10 + (a−10), lấy 10 − b rồi cộng phần đơn vị (a − 10 < b)
  function truQua10(a,b){
    const u=a-10, r=10-b, res=a-b;
    return [
      {say:`Ta tính <b>${a} − ${b}</b>. Số ${a} gồm 1 chục và ${u} đơn vị, ta tách <b>${a} = 10 + ${u}</b>.`,
        vis:frames(rep('a',10),rep('b',u))+eq(`${a} = 10 + ${N(u,'b')}`)},
      {say:`Số ${u} đơn vị chưa đủ để trừ ${b}, nên ta lấy ${b} trừ vào <b>10</b> trước: <b>10 − ${b} = ${r}</b>.`,
        vis:frames(rep('a',r).concat(rep('x',b)),rep('b',u))+eq(`10 − ${b} = ${r}`)},
      {say:`Cộng thêm ${u} đơn vị đã tách riêng: <b>${r} + ${u} = ${res}</b>.`,
        vis:frames(rep('a',r).concat(rep('b',u)))+eq(`${r} + ${N(u,'b')} = ${res}`)},
      {say:`Vậy <b>${a} − ${b} = ${res}</b>. Viết gọn: ${a} − ${b} → 10 − ${b} = ${r}; ${r} + ${u} = ${res}.`,
        vis:eq(`${a} − ${b} = ${res}`)},
    ];
  }
  /* ---------- thêm: nhóm, đĩa, icon tự vẽ, ảnh minh hoạ, đặt tính từng cột ---------- */
  const grp=(per,groups,c)=>`<div class="vis-row">${rep(0,groups).map(()=>`<span class="gbox">${dots(per,c||'a')}</span>`).join('')}</div>`;
  const plates=(counts,c)=>`<div class="vis-row">${counts.map(n=>`<span class="gbox">${dots(n,c||'a')}</span>`).join('')}</div>`;
  const ci=k=>`<span class="st-pic"><span class="emo-ic">${CUSTOM_ICONS[k]||''}</span></span>`;
  const big=s=>`<span style="font-size:28px">${s}</span>`;
  const chips=(arr,c)=>`<div class="st-pics">${arr.map(w=>`<span class="st-tag ${c||''}">${w}</span>`).join('')}</div>`;
  function pic(word,fallbackIcon){
    const a=IMAGE_ASSETS[word]; const ok=a && !/\.(mp4|webm|mov)$/i.test(a);
    return `<span class="st-pic">${ok?`<img src="${a}" alt="${word}">`:(fallbackIcon?emo(fallbackIcon):'')}<span>${word}</span></span>`;
  }
  const pics=arr=>`<div class="st-pics">${arr.map(x=>pic(x[0],x[1])).join('')}</div>`;
  const DIGNAME=['đơn vị','chục','trăm'];
  // Các bước đặt tính cột dọc (cộng/trừ, có nhớ hoặc không) tạo tự động, có lời giải thích từng cột
  function tinhCot(a,b,op){
    const L=Math.max(String(a).length,String(b).length,String(op==='+'?a+b:a-b).length);
    const dg=(n,k)=>Math.floor(n/Math.pow(10,k))%10;
    const res=op==='+'?a+b:a-b;
    const steps=[{say:`<b>Đặt tính:</b> viết ${a} ở trên, ${b} ở dưới sao cho các hàng thẳng cột với nhau (đơn vị thẳng đơn vị, chục thẳng chục${L>2?', trăm thẳng trăm':''}). Rồi tính <b>từ phải sang trái</b>.`, vis:col(a,b,op,0)}];
    let carry=0;
    for(let k=0;k<L;k++){
      const da=dg(a,k), db=dg(b,k); let say;
      if(op==='+'){
        const s=da+db+carry, w=s%10, nc=Math.floor(s/10);
        say=`Hàng <b>${DIGNAME[k]}</b>: ${da} + ${db}${carry?` + ${carry} (nhớ)`:''} = ${s}`+(nc?`. Viết <b>${w}</b>, <b>nhớ 1</b> sang hàng ${DIGNAME[k+1]||'tiếp theo'}.`:`. Viết <b>${w}</b>.`);
        carry=nc;
      } else {
        const eff=da-carry;
        if(eff>=db){ say=`Hàng <b>${DIGNAME[k]}</b>: ${carry?`${da} đã cho mượn 1 nên còn ${eff}; `:''}${eff} − ${db} = ${eff-db}. Viết <b>${eff-db}</b>.`; carry=0; }
        else { say=`Hàng <b>${DIGNAME[k]}</b>: ${carry?`${da} đã cho mượn 1 nên còn ${eff}; `:''}${eff} nhỏ hơn ${db}, không trừ được. <b>Mượn 1</b> ở hàng ${DIGNAME[k+1]} được ${eff+10}: ${eff+10} − ${db} = ${eff+10-db}. Viết <b>${eff+10-db}</b>.`; carry=1; }
      }
      steps.push({say, vis:col(a,b,op,k+1)});
    }
    steps.push({say:`Đọc kết quả:`, vis:eq(`${a} ${op==='+'?'+':'−'} ${b} = ${res}`)});
    return steps;
  }
  // các bước xây bảng nhân n từng dòng (thêm một nhóm n mỗi lần)
  function bangNhanSteps(n,upTo){
    const steps=[];
    for(let k=1;k<=upTo;k++){
      steps.push({say: k===1 ? `<b>${n} × 1</b>: lấy ${n} một lần, được <b>${n}</b>.`
        : `<b>${n} × ${k}</b>: thêm 1 nhóm ${n} vào ${n} × ${k-1} = ${n*(k-1)}. Ta có ${n*(k-1)} + ${n} = <b>${n*k}</b>.`,
        vis:grp(n,k)+eq(`${n} × ${k} = ${n*k}`)});
    }
    steps.push({say:`Cứ mỗi lần thêm 1 nhóm, kết quả tăng thêm <b>${n}</b>. Tiếp tục ta được cả bảng nhân ${n}:`,
      vis:`<div class="st-say" style="margin-top:6px">${Array.from({length:10},(_,i)=>`${n} × ${i+1} = ${n*(i+1)}`).join(' &nbsp;·&nbsp; ')}</div>`});
    return steps;
  }
  // các bước suy ra bảng chia n từ bảng nhân n
  function bangChiaSteps(n,t){
    return [
      {say:`Nhớ lại bảng nhân ${n}: <b>${n} × ${t} = ${n*t}</b>. Ta có ${t} nhóm, mỗi nhóm ${n} chấm.`, vis:grp(n,t)+eq(`${n} × ${t} = ${n*t}`)},
      {say:`Gộp tất cả lại được <b>${n*t}</b> chấm. Nếu chia đều ${n*t} chấm vào các nhóm, <b>mỗi nhóm ${n} chấm</b> thì được <b>${t} nhóm</b>.`, vis:dots(n*t,'a')+eq(`${n*t} : ${n} = ${t}`)},
      {say:`Nếu chia ${n*t} chấm thành <b>${n} phần bằng nhau</b> thì mỗi phần có <b>${t}</b> chấm.`, vis:plates(rep(t,n),'b')+eq(`${n*t} : ${n} = ${t}`)},
      {say:`Cách tính nhanh: muốn tính <b>${n*t} : ${n}</b>, con nghĩ <b>"${n} nhân mấy bằng ${n*t}?"</b>. Vì ${n} × ${t} = ${n*t} nên ${n*t} : ${n} = ${t}.`},
    ];
  }
  const orig=(k,types)=>(CONTENT[k]&&CONTENT[k].learn.blocks||[]).filter(b=>types.includes(b.type));
  const LEARN={};
  const ghiNho=html=>({type:"example", html:`<b>Ghi nhớ:</b> ${html}`});

  /* ======================== TOÁN TẬP 1 — CHỦ ĐỀ 1 ======================== */
  LEARN.knt_on_so100={
    intro:"Số có hai chữ số gồm hàng chục và hàng đơn vị. Con xem từng bước cách đọc cấu tạo số, so sánh và sắp xếp nhé!",
    blocks:[
      {type:"stepper", title:"1. Số 56 gồm những gì?", steps:[
        {say:`Số <b>56</b> có hai chữ số: chữ số <b>5</b> ở hàng chục, chữ số <b>6</b> ở hàng đơn vị.`, vis:eq(`${N(5,'b')}${N(6,'c')}`)},
        {say:`Chữ số hàng chục là 5, nghĩa là có <b>5 chục</b> (mỗi thanh cam là 1 chục = 10).`, vis:pv(0,5,0)},
        {say:`Chữ số hàng đơn vị là 6, nghĩa là có thêm <b>6 đơn vị</b> (mỗi chấm xanh là 1 đơn vị).`, vis:pv(0,5,6)},
        {say:`5 chục là 50. Gộp 50 với 6 đơn vị ta được 56. Ta viết số thành tổng:`, vis:eq(`56 = ${N(50,'b')} + ${N(6,'c')}`)},
      ]},
      {type:"stepper", title:"2. So sánh 58 và 51", steps:[
        {say:`Muốn so sánh hai số có hai chữ số, ta so sánh <b>hàng chục</b> trước.`, vis:row('58',pvr(5,'pv-t')+pvr(8,'pv-u'))+row('51',pvr(5,'pv-t')+pvr(1,'pv-u'))},
        {say:`Hai số đều có <b>5 chục</b> — hàng chục bằng nhau. Vì vậy ta so sánh tiếp <b>hàng đơn vị</b>.`},
        {say:`Hàng đơn vị: <b>8</b> lớn hơn <b>1</b>. Vậy 58 lớn hơn 51.`, vis:eq(`58 &gt; 51`)},
        {say:`Nếu hàng chục khác nhau thì số có nhiều chục hơn là số lớn hơn, không cần xem đơn vị. Ví dụ: 49 &lt; 50 vì 4 chục &lt; 5 chục.`, vis:eq(`49 &lt; 50`)},
      ]},
      {type:"stepper", title:"3. Xếp 58, 51, 49, 50 từ bé đến lớn", steps:[
        {say:`Nhìn hàng chục: 49 có <b>4 chục</b> (ít nhất), các số còn lại có 5 chục. Vậy <b>49 là số bé nhất</b>.`},
        {say:`Còn 58, 51, 50 cùng có 5 chục. Ta so sánh hàng đơn vị: 0 &lt; 1 &lt; 8, nên 50 &lt; 51 &lt; 58.`},
        {say:`Xếp từ bé đến lớn:`, vis:eq(`49 &lt; 50 &lt; 51 &lt; 58`)},
      ]},
      {type:"barcompare", items:[{n:58},{n:51},{n:49},{n:50}]},
      ghiNho("Số có hai chữ số = (số chục × 10) + số đơn vị. So sánh: chục trước, đơn vị sau.")
    ]};

  LEARN.knt_tiaso={
    intro:"Tia số giúp ta thấy rõ thứ tự các số. Con xem từng bước, rồi tự bấm thử trên tia số bên dưới.",
    blocks:[
      {type:"stepper", title:"Tia số, số liền trước, số liền sau", steps:[
        {say:`<b>Tia số</b> là dãy các số xếp theo thứ tự từ bé đến lớn, bắt đầu từ số <b>0</b> và đi từ trái sang phải.`, vis:strip(0,11,{0:'edge'})},
        {say:`Mỗi lần đi sang phải <b>1 ô</b>, số lại <b>tăng thêm 1</b>: 0, 1, 2, 3, …`, vis:strip(0,11,{0:'in',1:'in',2:'in',3:'in'})},
        {say:`<b>Số liền sau</b> của một số là số nằm ngay bên <b>phải</b> nó, lớn hơn nó 1 đơn vị. Số liền sau của <b>4</b> là <b>5</b>.`, vis:strip(0,11,{4:'edge',5:'nxt'})+eq(`4 + 1 = 5`)},
        {say:`<b>Số liền trước</b> là số nằm ngay bên <b>trái</b> nó, bé hơn nó 1 đơn vị. Số liền trước của <b>4</b> là <b>3</b>.`, vis:strip(0,11,{4:'edge',3:'pre'})+eq(`4 − 1 = 3`)},
        {say:`Số <b>0</b> là số đầu tiên của tia số nên <b>không có số liền trước</b>. Số liền sau của 0 là 1.`, vis:strip(0,11,{0:'edge',1:'nxt'})},
      ]},
      {type:"concept", text:"Bây giờ con tự thử: bấm vào một số bất kỳ trên tia số.", big:""},
      {type:"numline", center:4},
      ghiNho("Số liền sau = số đã cho + 1. Số liền trước = số đã cho − 1.")
    ]};

  LEARN.knt_thanhphan={
    intro:"Mỗi số trong phép cộng và phép trừ đều có một tên gọi riêng. Con xem từng bước để nhớ tên gọi nhé!",
    blocks:[
      {type:"stepper", title:"Phép cộng: số hạng và tổng", steps:[
        {say:`Bể có 6 con cá, thêm 3 con cá nữa. Ta viết phép cộng:`, vis:row('Cá',dots(6,'a')+dots(3,'b'))+eq(`6 + 3 = 9`)},
        {say:`Hai số đem cộng với nhau là <b>6</b> và <b>3</b>. Chúng gọi là <b>số hạng</b>.`, vis:eq(`${N(6,'a')} + ${N(3,'b')} = 9`)+`<div style="text-align:center">${tag('số hạng','')} &nbsp; ${tag('số hạng','b')}</div>`},
        {say:`Kết quả của phép cộng là <b>9</b>. Nó gọi là <b>tổng</b>.`, vis:eq(`6 + 3 = ${N(9,'c')}`)+`<div style="text-align:center">${tag('tổng','c')}</div>`},
        {say:`Nhớ lại bằng một dòng:`, vis:eq(`Số hạng + Số hạng = Tổng`)},
      ]},
      {type:"groupcalc", op:"+", start:6, delta:3, icon:"🐟", deltaIcon:"🐟", scene:"tank", text:"Con tự xem: bể có 6 con cá, thêm 3 con cá nữa."},
      {type:"stepper", title:"Phép trừ: số bị trừ, số trừ và hiệu", steps:[
        {say:`Cành cây có 12 con chim, bay đi 2 con. Ta viết phép trừ:`, vis:row('Chim',dots(10,'a')+dots(2,'x'))+eq(`12 − 2 = 10`)},
        {say:`Số <b>12</b> là số lúc đầu, số bị bớt đi. Nó gọi là <b>số bị trừ</b>.`, vis:eq(`${N(12,'a')} − 2 = 10`)},
        {say:`Số <b>2</b> là số lượng lấy đi (bay đi). Nó gọi là <b>số trừ</b>.`, vis:eq(`12 − ${N(2,'r')} = 10`)},
        {say:`Kết quả <b>10</b> là số còn lại. Nó gọi là <b>hiệu</b>.`, vis:eq(`12 − 2 = ${N(10,'c')}`)},
        {say:`Nhớ lại bằng một dòng:`, vis:eq(`Số bị trừ − Số trừ = Hiệu`)},
      ]},
      {type:"groupcalc", op:"-", start:12, delta:2, icon:"🐦", scene:"branch", text:"Con tự xem: cành cây có 12 con chim, bay đi 2 con."},
    ]};

  LEARN.knt_honkem={
    intro:"Muốn biết số này hơn hoặc kém số kia bao nhiêu, ta ghép từng đôi rồi xem phần dư ra. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Đàn gà có 10 con, đàn vịt có 7 con. Gà hơn vịt mấy con?", steps:[
        {say:`Xếp gà và vịt thành hai hàng để so sánh.`, vis:row('Gà',dots(10,'a'))+row('Vịt',dots(7,'b'))},
        {say:`Ghép từng đôi <b>1 gà – 1 vịt</b>. Ghép được 7 đôi thì vịt hết, gà còn <b>dư 3 con</b> (màu đỏ).`, vis:row('Gà',dots(7,'a')+dots(3,'r'))+row('Vịt',dots(7,'b'))},
        {say:`Số gà dư ra chính là số gà <b>hơn</b> số vịt. Để tìm phần dư, ta lấy <b>số lớn trừ số bé</b>:`, vis:eq(`10 − 7 = 3`)},
        {say:`Trả lời: gà hơn vịt <b>3 con</b>. Ngược lại, vịt ít hơn gà, ta nói vịt <b>kém</b> gà 3 con (cũng tính 10 − 7 = 3).`},
      ]},
      {type:"compare", a:10, b:7, labelA:"Gà", labelB:"Vịt", iconA:"🐓", iconB:"🦆"},
      {type:"stepper", title:"Cách trình bày bài giải", steps:[
        {say:`Đề bài: Đàn ngỗng có 5 con, đàn vịt có 7 con. Số ngỗng <b>kém</b> số vịt mấy con?`},
        {say:`Hai số là 5 và 7. Lấy <b>số lớn trừ số bé</b>: 7 − 5 = 2.`, vis:row('Vịt',dots(5,'b')+dots(2,'r'))+row('Ngỗng',dots(5,'a'))},
        {say:`Viết bài giải:<br><i>Số ngỗng kém số vịt là:</i> 7 − 5 = 2 (con).<br><i>Đáp số:</i> 2 con.`},
      ]},
      ghiNho("Hơn hay kém đều tính bằng phép trừ: lấy số lớn trừ số bé.")
    ]};

  LEARN.knt_ontap_congtru100={
    intro:"Cộng, trừ không nhớ trong phạm vi 100: đặt tính thẳng cột, tính từ phải sang trái (đơn vị trước, chục sau).",
    blocks:[
      {type:"stepper", title:"Cộng: 35 + 42", steps:[
        {say:`<b>Đặt tính:</b> viết số hạng thứ nhất, rồi số hạng thứ hai ngay bên dưới sao cho hàng đơn vị thẳng hàng đơn vị, hàng chục thẳng hàng chục.`, vis:col(35,42,'+',0)},
        {say:`Tính <b>hàng đơn vị</b> trước: 5 + 2 = 7. Viết 7 ở hàng đơn vị.`, vis:col(35,42,'+',1)},
        {say:`Tính <b>hàng chục</b>: 3 + 4 = 7. Viết 7 ở hàng chục.`, vis:col(35,42,'+',2)},
        {say:`Đọc kết quả:`, vis:eq(`35 + 42 = 77`)},
      ]},
      {type:"stepper", title:"Trừ: 79 − 55", steps:[
        {say:`<b>Đặt tính:</b> số bị trừ 79 ở trên, số trừ 55 ở dưới, thẳng cột với nhau.`, vis:col(79,55,'-',0)},
        {say:`Trừ <b>hàng đơn vị</b>: 9 − 5 = 4. Viết 4.`, vis:col(79,55,'-',1)},
        {say:`Trừ <b>hàng chục</b>: 7 − 5 = 2. Viết 2.`, vis:col(79,55,'-',2)},
        {say:`Đọc kết quả:`, vis:eq(`79 − 55 = 24`)},
      ]},
      {type:"concept", text:"Con tự xem lại hoạt hình đặt tính, bấm từng bước:", big:""},
      {type:"vcalc"},
      ghiNho("Luôn tính từ <b>phải sang trái</b>: hàng đơn vị rồi hàng chục. Số cột phải thẳng hàng.")
    ]};

  /* ======================== TOÁN TẬP 1 — CHỦ ĐỀ 2 ======================== */
  LEARN.knt_cong_qua10={
    intro:"Khi cộng hai số mà tổng lớn hơn 10, ta làm cho đủ 10 trước rồi mới cộng phần còn lại. Con xem từng bước với khung 10 ô nhé!",
    blocks:[
      {type:"stepper", title:"Ví dụ 1: 9 + 5", steps:congQua10(9,5)},
      {type:"stepper", title:"Ví dụ 2: 8 + 6", steps:congQua10(8,6)},
      {type:"example", html:"<b>Cách làm (3 việc):</b><br>① Xem số thứ nhất còn thiếu mấy thì đủ 10.<br>② Tách số thứ hai thành (phần thiếu) + (phần còn lại).<br>③ Cộng cho đủ 10, rồi cộng thêm phần còn lại."}
    ]};

  LEARN.knt_bang_cong_qua10={
    intro:"Bảng cộng qua 10 không phải học vẹt: mọi phép cộng đều tìm được bằng cách làm đủ 10. Con xem quy luật rồi mới đến bảng nhé!",
    blocks:[
      {type:"stepper", title:"Quy luật của bảng cộng qua 10", steps:[
        {say:`Khi cộng với <b>9</b>, ta chỉ cần thêm <b>1</b> là đủ 10.`, vis:frames(rep('a',9),['b'])+eq(`9 + 1 = 10`)},
        {say:`Ví dụ <b>9 + 4</b>: lấy 1 trong số 4 để cùng 9 thành 10, còn lại 3. Vậy 9 + 4 = 10 + 3 = 13.`, vis:frames(rep('a',9).concat(['b']),rep('c',3))+eq(`9 + 4 = 10 + 3 = 13`)},
        {say:`Quy luật khi cộng với 9: <b>chữ số hàng đơn vị của kết quả bé hơn số hạng kia đúng 1 đơn vị</b>. Ví dụ: 9 + 4 = 13, chữ số hàng đơn vị là 3 (bé hơn 4 một đơn vị); 9 + 7 = 16, chữ số hàng đơn vị là 6 (bé hơn 7 một đơn vị).`},
        {say:`Với <b>8</b>: thiếu 2 để đủ 10. Ví dụ <b>8 + 5</b>: tách 5 = 2 + 3, rồi 8 + 2 = 10, 10 + 3 = 13.`, vis:eq(`8 + 5 = 8 + 2 + 3 = 13`)},
        {say:`Với <b>7</b>: thiếu 3 để đủ 10. Ví dụ <b>7 + 6</b>: tách 6 = 3 + 3, rồi 7 + 3 = 10, 10 + 3 = 13.`, vis:eq(`7 + 6 = 7 + 3 + 3 = 13`)},
        {say:`Vì đổi chỗ hai số hạng thì tổng không đổi, nên 9 + 4 = 4 + 9 = 13. Con chỉ cần nhớ các phép cộng có số thứ nhất lớn hơn hoặc bằng số thứ hai.`},
      ]},
      {type:"example", html:"<b>Cùng cộng với 9:</b> "+[2,3,4,5,6,7,8,9].map(b=>`9 + ${b} = ${9+b}`).join(' &nbsp;·&nbsp; ')},
      {type:"example", html:"<b>Cùng cộng với 8:</b> "+[3,4,5,6,7,8,9].map(b=>`8 + ${b} = ${8+b}`).join(' &nbsp;·&nbsp; ')},
      {type:"example", html:"<b>Cùng cộng với 7:</b> "+[4,5,6,7,8,9].map(b=>`7 + ${b} = ${7+b}`).join(' &nbsp;·&nbsp; ')},
      {type:"example", html:"<b>Cùng cộng với 6:</b> "+[5,6,7,8,9].map(b=>`6 + ${b} = ${6+b}`).join(' &nbsp;·&nbsp; ')},
      ghiNho("Quên kết quả thì không sao: làm đủ 10 là tìm lại được ngay.")
    ]};

  LEARN.knt_them_bot={
    intro:"'Thêm' và 'bớt' là hai từ cho ta biết nên làm phép cộng hay phép trừ. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Thêm → làm phép cộng", steps:[
        {say:`Có <b>8</b> quả táo xanh. <b>Thêm</b> <b>5</b> quả táo đỏ nữa. Hỏi có tất cả bao nhiêu quả?`, vis:row('Có sẵn',dots(8,'c'))+row('Thêm',dots(5,'r'))},
        {say:`<b>Thêm</b> nghĩa là gộp thêm vào, số lượng sẽ nhiều lên. Ta làm phép <b>cộng</b>.`, vis:eq(`8 + 5`)},
        {say:`Tính qua 10: 8 + 2 = 10; 5 = 2 + 3; 10 + 3 = 13.`, vis:eq(`8 + 5 = 13`)},
        {say:`Trả lời: có tất cả <b>13 quả</b> táo.`},
      ]},
      {type:"stepper", title:"Bớt → làm phép trừ", steps:[
        {say:`Có <b>15</b> cái kẹo, <b>cho bạn</b> <b>6</b> cái. Hỏi còn lại bao nhiêu cái?`, vis:frames(rep('a',9).concat(rep('x',6)))},
        {say:`<b>Cho đi, bớt đi</b> nghĩa là lấy ra khỏi số ban đầu, số lượng sẽ ít đi. Ta làm phép <b>trừ</b>.`, vis:eq(`15 − 6`)},
        {say:`Tính qua 10: tách 15 = 10 + 5; 10 − 6 = 4; 4 + 5 = 9.`, vis:eq(`15 − 6 = 9`)},
        {say:`Trả lời: còn lại <b>9 cái</b> kẹo.`},
      ]},
      {type:"example", html:"<b>Cách nhận biết:</b><br>• Các từ <b>thêm, gộp lại, tất cả</b> → phép <b>cộng</b>.<br>• Các từ <b>bớt, cho đi, bay đi, còn lại</b> → phép <b>trừ</b>."},
      {type:"compare", a:8, b:5, labelA:"Có sẵn", labelB:"Thêm vào", iconA:"🍎", iconB:"🍏"},
    ]};

  LEARN.knt_tru_qua10={
    intro:"Khi hàng đơn vị của số bị trừ nhỏ hơn số trừ, ta tách số bị trừ thành 10 và phần còn lại. Con xem từng bước với khung 10 ô nhé!",
    blocks:[
      {type:"stepper", title:"Ví dụ 1: 14 − 6", steps:truQua10(14,6)},
      {type:"stepper", title:"Ví dụ 2: 15 − 8", steps:truQua10(15,8)},
      {type:"example", html:"<b>Cách làm (3 việc):</b><br>① Tách số bị trừ thành <b>10 + số lẻ</b> (ví dụ 14 = 10 + 4).<br>② Lấy <b>10 trừ số trừ</b>.<br>③ Cộng kết quả với <b>số lẻ</b> đã tách."}
    ]};

  const truRows=[]; for(let t=11;t<=18;t++){ const a=[]; for(let b=t-9;b<=9;b++) a.push(`${t} − ${b} = ${t-b}`); truRows.push({type:"example", html:`<b>Số bị trừ ${t}:</b> `+a.join(' &nbsp;·&nbsp; ')}); }
  LEARN.knt_bang_tru_qua10={
    intro:"Phép trừ là phép làm ngược lại phép cộng. Biết bảng cộng qua 10 thì con tìm được ngay bảng trừ qua 10!",
    blocks:[
      {type:"stepper", title:"Từ bảng cộng suy ra bảng trừ", steps:[
        {say:`Ta biết phép cộng: <b>9 + 5 = 14</b>.`, vis:row('9 + 5',dots(9,'a')+dots(5,'b'))+eq(`9 + 5 = 14`)},
        {say:`Trong 14 chấm, nếu <b>lấy đi 9 chấm xanh</b> thì còn lại 5 chấm cam: <b>14 − 9 = 5</b>.`, vis:row('14 − 9',dots(9,'x')+dots(5,'b'))+eq(`14 − 9 = 5`)},
        {say:`Nếu <b>lấy đi 5 chấm cam</b> thì còn lại 9 chấm xanh: <b>14 − 5 = 9</b>.`, vis:row('14 − 5',dots(9,'a')+dots(5,'x'))+eq(`14 − 5 = 9`)},
        {say:`Vậy muốn tính <b>14 − 5</b>, con hỏi: "Số nào cộng với 5 bằng 14?" — đó là <b>9</b>. Từ một phép cộng ta có hai phép trừ.`},
      ]},
      ...truRows,
      ghiNho("Quên kết quả thì tìm lại bằng phép cộng, hoặc tách 10 như bài trước.")
    ]};

  LEARN.knt_nhieuhon_ithon={
    intro:"Bài toán 'nhiều hơn', 'ít hơn' cho biết một số lớn hơn hoặc bé hơn số kia bao nhiêu. Con xem từng bước để biết khi nào cộng, khi nào trừ.",
    blocks:[
      {type:"stepper", title:"Nhiều hơn → làm phép cộng", steps:[
        {say:`An có <b>7</b> viên bi. Bình có <b>nhiều hơn</b> An <b>4</b> viên. Bình có bao nhiêu viên?`, vis:row('An',dots(7,'a'))},
        {say:`Bình có <b>bằng số bi của An</b> (7 viên), và <b>thêm 4 viên nữa</b> (màu cam).`, vis:row('An',dots(7,'a'))+row('Bình',dots(7,'a')+dots(4,'b'))},
        {say:`Vì Bình có nhiều hơn nên ta lấy số của An <b>cộng</b> với phần nhiều hơn: 7 + 4 = 11.`, vis:eq(`7 + 4 = 11`)},
        {say:`Trả lời: Bình có <b>11 viên</b> bi.`},
      ]},
      {type:"stepper", title:"Ít hơn → làm phép trừ", steps:[
        {say:`Cam có <b>12</b> quyển vở. Táo có <b>ít hơn</b> Cam <b>3</b> quyển. Táo có bao nhiêu quyển?`, vis:row('Cam',dots(12,'a'))},
        {say:`Táo có <b>bớt đi 3 quyển</b> so với Cam (3 chấm nét đứt là phần ít hơn).`, vis:row('Cam',dots(12,'a'))+row('Táo',dots(9,'a')+dots(3,'x'))},
        {say:`Vì Táo ít hơn nên ta lấy số của Cam <b>trừ</b> đi phần ít hơn: 12 − 3 = 9.`, vis:eq(`12 − 3 = 9`)},
        {say:`Trả lời: Táo có <b>9 quyển</b> vở.`},
      ]},
      {type:"compare", a:11, b:7, labelA:"Bình", labelB:"An", iconA:"🔵", iconB:"🔵"},
      {type:"example", html:"<b>Cách nhớ:</b> <b>nhiều hơn → cộng</b>; <b>ít hơn → trừ</b>. Luôn bắt đầu từ số đã biết rồi mới thêm hoặc bớt."}
    ]};

  /* ======================== TOÁN TẬP 2 — CHỦ ĐỀ 8: PHÉP NHÂN, PHÉP CHIA ======================== */
  LEARN.knt_nhan={
    intro:"Khi cộng nhiều lần cùng một số, ta có thể viết gọn bằng phép nhân. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Từ phép cộng đến phép nhân", steps:[
        {say:`Có <b>3 đĩa</b>, mỗi đĩa có <b>2 quả táo</b>. Hỏi có tất cả bao nhiêu quả táo?`, vis:grp(2,3,'r')},
        {say:`Mỗi đĩa có 2 quả, có 3 đĩa, nên ta lấy 2 cộng 3 lần: <b>2 + 2 + 2 = 6</b>.`, vis:eq(`2 + 2 + 2 = 6`)},
        {say:`Cộng nhiều số giống nhau thì viết rất dài. Ta viết gọn bằng <b>phép nhân</b>: lấy <b>2</b>, lặp lại <b>3 lần</b>.`, vis:eq(`2 + 2 + 2 = ${N('2 × 3','b')} = 6`)},
        {say:`<b>2 × 3</b> đọc là "hai nhân ba". Dấu <b>×</b> gọi là dấu nhân. Số đứng trước (2) là số được lặp lại, số đứng sau (3) là số lần lặp.`, vis:eq(`2 × 3 = 6`)},
      ]},
      {type:"groupviz", mode:"mul", groups:3, per:2, icon:"🍎", text:"Con tự xem: 3 đĩa, mỗi đĩa 2 quả táo."},
      {type:"stepper", title:"Ngược lại: viết tổng thành phép nhân", steps:[
        {say:`Cho tổng <b>3 + 3 + 3 + 3</b>. Các số hạng đều bằng nhau.`, vis:grp(3,4,'b')},
        {say:`Đếm xem số <b>3</b> xuất hiện mấy lần: <b>4 lần</b>.`},
        {say:`Viết thành phép nhân: lấy 3, lặp 4 lần, được <b>3 × 4 = 12</b>. Kiểm tra: 3 + 3 + 3 + 3 = 12.`, vis:eq(`3 × 4 = 12`)},
      ]},
      ghiNho("Phép nhân là cách viết gọn của phép cộng các số giống nhau. <b>a × b</b> nghĩa là lấy a cộng b lần.")
    ]};

  LEARN.knt_nhan2={
    intro:"Bảng nhân 2 gồm các phép nhân có thừa số 2. Con tự xây bảng từng dòng, mỗi lần thêm 1 nhóm 2.",
    blocks:[
      {type:"stepper", title:"Cách xây bảng nhân 2", steps:bangNhanSteps(2,5)},
      {type:"example", html:"<b>Ghi nhớ:</b> Kết quả của bảng nhân 2 đều là <b>số chẵn</b> (tận cùng 0, 2, 4, 6, 8). Quên kết quả thì cộng dần: 2, 4, 6, 8, 10, …"},
      {type:"cuuchuong", nums:[2]}
    ]};

  LEARN.knt_thuaso_tich={
    intro:"Mỗi số trong phép nhân có tên gọi riêng: thừa số và tích. Con xem từng bước để nhớ tên nhé!",
    blocks:[
      {type:"stepper", title:"Thừa số và tích", steps:[
        {say:`Ta có phép nhân:`, vis:grp(2,3,'r')+eq(`2 × 3 = 6`)},
        {say:`<b>2</b> và <b>3</b> là hai số em đem nhân với nhau. Chúng gọi là <b>thừa số</b>.`, vis:eq(`${N(2,'a')} × ${N(3,'b')} = 6`)+`<div style="text-align:center">${tag('thừa số')} &nbsp; ${tag('thừa số','b')}</div>`},
        {say:`<b>6</b> là kết quả của phép nhân. Nó gọi là <b>tích</b>.`, vis:eq(`2 × 3 = ${N(6,'c')}`)+`<div style="text-align:center">${tag('tích','c')}</div>`},
        {say:`Nhớ lại bằng một dòng:`, vis:eq(`Thừa số × Thừa số = Tích`)},
        {say:`Thử với <b>5 × 4 = 20</b>: thừa số là 5 và 4, tích là 20. Ta cũng nói: "Tích của 5 và 4 là 20".`, vis:eq(`${N(5,'a')} × ${N(4,'b')} = ${N(20,'c')}`)},
      ]},
      ...orig('knt_thuaso_tich',['groupviz'])
    ]};

  LEARN.knt_nhan5={
    intro:"Bảng nhân 5 gồm các phép nhân có thừa số 5. Mỗi lần thêm 1 nhóm 5, kết quả tăng thêm 5.",
    blocks:[
      {type:"stepper", title:"Cách xây bảng nhân 5", steps:bangNhanSteps(5,4)},
      {type:"stepper", title:"Mẹo nhớ: bàn tay có 5 ngón", steps:[
        {say:`Mỗi bàn tay có <b>5 ngón</b>. Có 3 bàn tay thì có bao nhiêu ngón?`, vis:grp(5,3,'b')},
        {say:`Lấy 5 ngón, lặp 3 lần: <b>5 × 3 = 15</b>. Đếm cách 5: 5, 10, 15.`, vis:eq(`5 × 3 = 15`)},
      ]},
      {type:"example", html:"<b>Ghi nhớ:</b> Kết quả của bảng nhân 5 luôn tận cùng bằng <b>0 hoặc 5</b>. Quên kết quả thì đếm cách 5: 5, 10, 15, 20, 25, …"},
      {type:"cuuchuong", nums:[5]}
    ]};

  LEARN.knt_chia={
    intro:"Chia đều là chia thành các phần có số lượng bằng nhau. Con xem từng bước hai cách chia nhé!",
    blocks:[
      {type:"stepper", title:"Cách 1: Chia đều 6 quả táo vào 2 đĩa", steps:[
        {say:`Có <b>6 quả táo</b>. Cần chia <b>đều</b> vào <b>2 đĩa</b>, nghĩa là mỗi đĩa phải có số quả bằng nhau.`, vis:dots(6,'r')},
        {say:`<b>Lần 1:</b> đặt vào mỗi đĩa 1 quả.`, vis:plates([1,1],'r')+row('Còn lại',dots(4,'r'))},
        {say:`<b>Lần 2:</b> lại đặt vào mỗi đĩa 1 quả.`, vis:plates([2,2],'r')+row('Còn lại',dots(2,'r'))},
        {say:`<b>Lần 3:</b> đặt tiếp mỗi đĩa 1 quả. Táo hết, mỗi đĩa có <b>3 quả</b>.`, vis:plates([3,3],'r')},
        {say:`Ta viết phép chia: <b>6 : 2 = 3</b>. Đọc là "sáu chia hai bằng ba". Dấu <b>:</b> gọi là dấu chia.`, vis:eq(`6 : 2 = 3`)},
      ]},
      {type:"stepper", title:"Cách 2: 8 cái bánh, mỗi đĩa 4 cái. Xếp được mấy đĩa?", steps:[
        {say:`Có <b>8 cái bánh</b>. Mỗi đĩa xếp <b>4 cái</b>. Hỏi xếp được mấy đĩa?`, vis:dots(8,'b')},
        {say:`Đĩa thứ nhất: lấy 4 cái bánh.`, vis:plates([4],'b')+row('Còn lại',dots(4,'b'))},
        {say:`Đĩa thứ hai: lấy tiếp 4 cái. Bánh hết.`, vis:plates([4,4],'b')},
        {say:`Xếp được <b>2 đĩa</b>. Ta cũng dùng phép chia: <b>8 : 4 = 2</b>.`, vis:eq(`8 : 4 = 2`)},
      ]},
      ...orig('knt_chia',['groupviz']),
      ghiNho("Có hai kiểu bài chia: biết số phần → tìm mỗi phần có bao nhiêu; biết mỗi phần có bao nhiêu → tìm số phần. Cả hai đều dùng phép chia.")
    ]};

  LEARN.knt_chia_thanhphan={
    intro:"Mỗi số trong phép chia có tên gọi riêng. Con xem từng bước và để ý mối quan hệ với phép nhân nhé!",
    blocks:[
      {type:"stepper", title:"Tên gọi các số trong phép chia", steps:[
        {say:`Chia đều 6 chấm thành 2 phần:`, vis:plates([3,3],'a')+eq(`6 : 2 = 3`)},
        {say:`<b>6</b> là số đem đi chia. Nó gọi là <b>số bị chia</b>.`, vis:eq(`${N(6,'a')} : 2 = 3`)},
        {say:`<b>2</b> là số dùng để chia (chia thành 2 phần). Nó gọi là <b>số chia</b>.`, vis:eq(`6 : ${N(2,'b')} = 3`)},
        {say:`<b>3</b> là kết quả của phép chia. Nó gọi là <b>thương</b>.`, vis:eq(`6 : 2 = ${N(3,'c')}`)},
        {say:`Nhớ lại bằng một dòng:`, vis:eq(`Số bị chia : Số chia = Thương`)},
      ]},
      {type:"stepper", title:"Phép nhân và phép chia đi cùng nhau", steps:[
        {say:`Từ <b>2 × 3 = 6</b>: có 3 nhóm, mỗi nhóm 2 chấm, tất cả 6 chấm.`, vis:grp(2,3,'a')+eq(`2 × 3 = 6`)},
        {say:`Chia 6 chấm thành các nhóm 2 chấm, được 3 nhóm: <b>6 : 2 = 3</b>.`, vis:eq(`6 : 2 = 3`)},
        {say:`Chia 6 chấm thành 3 nhóm bằng nhau, mỗi nhóm 2 chấm: <b>6 : 3 = 2</b>. Vậy từ một phép nhân ta tìm được hai phép chia.`, vis:eq(`6 : 3 = 2`)},
      ]},
      ...orig('knt_chia_thanhphan',['groupviz'])
    ]};

  LEARN.knt_chia2={
    intro:"Bảng chia 2 được suy ra từ bảng nhân 2. Biết bảng nhân 2 là con tìm được bảng chia 2!",
    blocks:[
      {type:"stepper", title:"Từ bảng nhân 2 suy ra bảng chia 2", steps:bangChiaSteps(2,4)},
      {type:"example", html:"<b>Bảng chia 2:</b> "+Array.from({length:10},(_,i)=>`${2*(i+1)} : 2 = ${i+1}`).join(' &nbsp;·&nbsp; ')},
      ...orig('knt_chia2',['groupviz']),
      ghiNho("Chia cho 2 là chia đều thành 2 phần, mỗi phần là <b>một nửa</b>. Muốn tính 14 : 2, nghĩ \"2 nhân mấy bằng 14?\" → 2 × 7 = 14, nên 14 : 2 = 7.")
    ]};

  LEARN.knt_chia5={
    intro:"Bảng chia 5 được suy ra từ bảng nhân 5. Biết bảng nhân 5 là con tìm được bảng chia 5!",
    blocks:[
      {type:"stepper", title:"Từ bảng nhân 5 suy ra bảng chia 5", steps:bangChiaSteps(5,4)},
      {type:"example", html:"<b>Bảng chia 5:</b> "+Array.from({length:10},(_,i)=>`${5*(i+1)} : 5 = ${i+1}`).join(' &nbsp;·&nbsp; ')},
      ...orig('knt_chia5',['groupviz']),
      ghiNho("Muốn tính 35 : 5, nghĩ \"5 nhân mấy bằng 35?\" → 5 × 7 = 35, nên 35 : 5 = 7. Các số chia hết cho 5 đều tận cùng bằng 0 hoặc 5.")
    ]};

  LEARN.bang_cuu_chuong={
    intro:"Bảng cửu chương là các phép nhân từ 2 đến 9. Học theo mẹo dưới đây sẽ nhớ nhanh hơn học vẹt. (Đây là phần học thêm, SGK lớp 2 chỉ dạy bảng 2 và 5.)",
    blocks:[
      {type:"stepper", title:"Năm cách học thuộc bảng nhân", steps:[
        {say:`<b>Cách 1 — Cộng thêm một nhóm.</b> Biết 6 × 4 = 24 thì 6 × 5 = 24 + 6 = 30. Mỗi dòng sau hơn dòng trước đúng bằng số đang nhân.`, vis:eq(`6 × 4 = 24 &nbsp;→&nbsp; 6 × 5 = 24 + 6 = 30`)},
        {say:`<b>Cách 2 — Đổi chỗ hai thừa số.</b> Kết quả không đổi: 3 × 4 = 4 × 3 = 12. Biết 3 × 4 là biết luôn 4 × 3, nên chỉ cần học một nửa bảng.`, vis:grp(3,4,'a')+grp(4,3,'b')+eq(`3 × 4 = 4 × 3 = 12`)},
        {say:`<b>Cách 3 — Bảng 2 và bảng 5.</b> Kết quả bảng nhân 2 đều là số chẵn. Kết quả bảng nhân 5 luôn tận cùng 0 hoặc 5.`},
        {say:`<b>Cách 4 — Bảng 9.</b> Cộng các chữ số của kết quả luôn được 9: 9 × 2 = 18 (1 + 8 = 9), 9 × 3 = 27 (2 + 7 = 9), 9 × 4 = 36 (3 + 6 = 9).`, vis:eq(`9 × 5 = 45 &nbsp;(4 + 5 = 9)`)},
        {say:`<b>Cách 5 — Che kết quả, tự nhẩm.</b> Đọc to từng dòng, rồi lấy tay che kết quả, tự nói đáp án, bỏ tay ra kiểm tra. Mỗi ngày học 1 bảng là đủ.`},
      ]},
      {type:"cuuchuong", nums:[2,3,4,5,6,7,8,9]}
    ]};

  /* ======================== CHỦ ĐỀ 9: HÌNH KHỐI ======================== */
  LEARN.knt_khoi={
    intro:"Quanh em có rất nhiều đồ vật có hình dạng khối trụ hoặc khối cầu. Con xem từng bước cách nhận ra chúng nhé!",
    blocks:[
      {type:"stepper", title:"Nhận biết khối cầu và khối trụ", steps:[
        {say:`Nhìn quả bóng và quả cam: chúng <b>tròn đều mọi phía</b>, không có mặt phẳng. Hình dạng này gọi là <b>khối cầu</b>.`, vis:`<div class="st-pics">${ci('sphere')}${big('⚽')}${big('🍊')}</div>`},
        {say:`Nhìn cái lon nước: hai đầu là <b>hai mặt phẳng hình tròn</b> bằng nhau, xung quanh là mặt cong. Hình dạng này gọi là <b>khối trụ</b>.`, vis:`<div class="st-pics">${ci('cylinder')}${ci('can')}</div>`},
        {say:`<b>Cách phân biệt:</b> tìm xem vật có <b>mặt phẳng hình tròn</b> không. Có → <b>khối trụ</b>. Không có (tròn đều mọi phía) → <b>khối cầu</b>.`},
        {say:`<b>Thử lăn:</b> khối cầu lăn được về mọi hướng. Khối trụ đặt nằm thì lăn được, đặt đứng trên mặt đáy thì đứng yên.`},
      ]},
      ...orig('knt_khoi',['wordcards']),
      ghiNho("Quả bóng, quả cam, viên bi là <b>khối cầu</b>. Lon nước, cuộn giấy, hộp sữa tròn là <b>khối trụ</b>.")
    ]};

  LEARN.knt_luyentap_khoi={
    intro:"Ôn lại cách nhận ra khối trụ và khối cầu bằng cách tự hỏi hai câu hỏi đơn giản.",
    blocks:[
      {type:"stepper", title:"Phân loại các vật: quả bóng, lon nước, quả cam, cuộn giấy", steps:[
        {say:`Với mỗi vật, con hỏi: <b>"Có mặt phẳng hình tròn không?"</b>`},
        {say:`<b>Quả bóng:</b> tròn đều, không có mặt phẳng → <b>khối cầu</b>.`, vis:`<div class="st-pics">${big('⚽')}</div>`},
        {say:`<b>Lon nước:</b> có hai mặt phẳng hình tròn ở hai đầu → <b>khối trụ</b>.`, vis:`<div class="st-pics">${ci('can')}</div>`},
        {say:`<b>Quả cam:</b> tròn đều → <b>khối cầu</b>. <b>Cuộn giấy:</b> hai đầu là hình tròn → <b>khối trụ</b>.`, vis:`<div class="st-pics">${big('🍊')}</div>`},
        {say:`Đếm: khối cầu có 2 vật (quả bóng, quả cam); khối trụ có 2 vật (lon nước, cuộn giấy).`},
      ]},
      ...orig('knt_luyentap_khoi',['wordcards'])
    ]};

  /* ======================== CHỦ ĐỀ 10: CÁC SỐ TRONG PHẠM VI 1 000 ======================== */
  const arrow=`<span class="tf-plus">→</span>`;
  LEARN.knt_donvi_chuc_tram={
    intro:"Khi có đủ 10 thì ta gom lại thành một đơn vị lớn hơn: 10 đơn vị thành 1 chục, 10 chục thành 1 trăm, 10 trăm thành 1 nghìn.",
    blocks:[
      {type:"stepper", title:"Gom thành chục, trăm, nghìn", steps:[
        {say:`Có <b>10 đơn vị</b> (10 chấm xanh). Gom lại thành <b>1 chục</b> (1 thanh cam).`, vis:`<div class="vis-row">${dots(10,'c')}${arrow}${pvr(1,'pv-t')}</div>`},
        {say:`Có <b>10 chục</b> (10 thanh cam). Gom lại thành <b>1 trăm</b> (1 khối vuông xanh). <b>1 trăm = 100</b>.`, vis:`<div class="vis-row">${pvr(10,'pv-t')}${arrow}${pvr(1,'pv-h')}</div>`},
        {say:`Có <b>10 trăm</b> (10 khối vuông). Gom lại thành <b>1 nghìn</b> (khối tím). <b>1 nghìn = 1 000</b>.`, vis:`<div class="vis-row">${pvr(10,'pv-h')}${arrow}${pvr(1,'pv-th')}</div>`},
        {say:`Tóm lại:`, vis:eq(`10 đơn vị = 1 chục<br>10 chục = 1 trăm = 100<br>10 trăm = 1 nghìn = 1 000`)},
        {say:`<b>Đổi đơn vị:</b> 3 chục = 3 × 10 = <b>30</b> đơn vị. 4 trăm = 4 × 100 = <b>400</b> đơn vị, cũng bằng 40 chục.`, vis:eq(`3 chục = 30 &nbsp;·&nbsp; 4 trăm = 400`)},
      ]},
      ...orig('knt_donvi_chuc_tram',['placevalue'])
    ]};

  LEARN.knt_tron_tram_chuc={
    intro:"Số tròn chục và số tròn trăm là những số dễ đếm nhất. Con xem từng bước cách nhận ra và đếm chúng nhé!",
    blocks:[
      {type:"stepper", title:"Số tròn chục và số tròn trăm", steps:[
        {say:`<b>Số tròn chục</b> là số có hàng đơn vị bằng <b>0</b>: chỉ có các chục, không có đơn vị lẻ. Ví dụ 30 = 3 chục, 50 = 5 chục.`, vis:row('30',pvr(3,'pv-t'))+row('50',pvr(5,'pv-t'))},
        {say:`Đếm số tròn chục: mỗi lần đếm thêm <b>10</b>.`, vis:chips([10,20,30,40,50,60,70,80,90])},
        {say:`<b>Số tròn trăm</b> là số có <b>hai chữ số tận cùng đều bằng 0</b>: chỉ có các trăm. Ví dụ 200 = 2 trăm, 400 = 4 trăm.`, vis:row('200',pvr(2,'pv-h'))+row('400',pvr(4,'pv-h'))},
        {say:`Đếm số tròn trăm: mỗi lần đếm thêm <b>100</b>.`, vis:chips([100,200,300,400,500,600,700,800,900],'b')},
        {say:`Số tròn trăm cũng là số tròn chục (vì hàng đơn vị là 0). Ví dụ 300 gồm 30 chục.`},
      ]},
      ...orig('knt_tron_tram_chuc',['barcompare'])
    ]};

  LEARN.knt_sosanh_tron={
    intro:"Muốn so sánh các số tròn trăm, tròn chục, ta so sánh xem mỗi số có bao nhiêu trăm (hoặc bao nhiêu chục).",
    blocks:[
      {type:"stepper", title:"So sánh 300 và 500", steps:[
        {say:`Xếp hai số bằng các khối trăm: <b>300 = 3 trăm</b>, <b>500 = 5 trăm</b>.`, vis:row('300',pvr(3,'pv-h'))+row('500',pvr(5,'pv-h'))},
        {say:`500 có nhiều khối hơn, nên 500 lớn hơn. Số có <b>nhiều trăm hơn</b> thì lớn hơn.`, vis:eq(`300 &lt; 500`)},
      ]},
      {type:"stepper", title:"So sánh 70 và 40", steps:[
        {say:`<b>70 = 7 chục</b>, <b>40 = 4 chục</b>.`, vis:row('70',pvr(7,'pv-t'))+row('40',pvr(4,'pv-t'))},
        {say:`7 chục nhiều hơn 4 chục nên 70 lớn hơn 40.`, vis:eq(`70 &gt; 40`)},
        {say:`Hai số có số trăm (hoặc số chục) bằng nhau thì hai số <b>bằng nhau</b>: 600 = 600.`},
      ]},
      ...orig('knt_sosanh_tron',['barcompare'])
    ]};

  LEARN.knt_so3chuso={
    intro:"Số có ba chữ số gồm hàng trăm, hàng chục, hàng đơn vị. Con xem cách đọc, viết số rồi tự dựng số nhé!",
    blocks:[
      {type:"stepper", title:"Số 345", steps:[
        {say:`Có <b>3 trăm</b>, <b>4 chục</b> và <b>5 đơn vị</b>.`, vis:pv(3,4,5)},
        {say:`<b>Viết số:</b> viết chữ số hàng trăm, rồi hàng chục, rồi hàng đơn vị: <b>3 – 4 – 5</b> → số <b>345</b>.`, vis:eq(`${N(3,'a')}${N(4,'b')}${N(5,'c')}`)},
        {say:`<b>Đọc số:</b> đọc số trăm, rồi số chục, rồi số đơn vị: "ba trăm bốn mươi lăm".`, vis:eq(`345`)},
        {say:`<b>Có chữ số 0:</b> số 120 gồm 1 trăm, 2 chục, 0 đơn vị, đọc là "một trăm hai mươi". Số 305 gồm 3 trăm, 0 chục, 5 đơn vị, đọc là "ba trăm linh năm" (có nơi đọc là "ba trăm lẻ năm").`, vis:row('120',pvr(1,'pv-h')+pvr(2,'pv-t'))+row('305',pvr(3,'pv-h')+pvr(5,'pv-u'))},
      ]},
      {type:"concept", text:"Bây giờ con tự dựng số: bấm + và − ở từng hàng.", big:""},
      ...orig('knt_so3chuso',['placevalue']),
      ghiNho("Chữ số 0 ở hàng nào nghĩa là không có gì ở hàng đó, nhưng vẫn phải viết 0 để giữ đúng vị trí. 305 khác 35!")
    ]};

  LEARN.knt_viet_tong={
    intro:"Viết số thành tổng là tách số theo từng hàng: trăm, chục, đơn vị. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Viết số 345 thành tổng", steps:[
        {say:`Số <b>345</b> gồm 3 trăm, 4 chục, 5 đơn vị.`, vis:pv(3,4,5)},
        {say:`Đổi từng hàng ra số: <b>3 trăm = 300</b>, <b>4 chục = 40</b>, <b>5 đơn vị = 5</b>.`, vis:eq(`3 trăm = 300<br>4 chục = 40<br>5 đơn vị = 5`)},
        {say:`Viết các số vừa tìm được thành tổng:`, vis:eq(`345 = ${N(300,'a')} + ${N(40,'b')} + ${N(5,'c')}`)},
      ]},
      {type:"stepper", title:"Số có chữ số 0: 708", steps:[
        {say:`Số <b>708</b> gồm 7 trăm, <b>0 chục</b>, 8 đơn vị.`, vis:row('708',pvr(7,'pv-h')+pvr(8,'pv-u'))},
        {say:`0 chục là không có chục nào, nên khi viết tổng ta có thể bỏ số hạng 0:`, vis:eq(`708 = 700 + 0 + 8 = 700 + 8`)},
      ]},
      {type:"example", html:"<b>Ngược lại, từ tổng viết thành số:</b> 600 + 30 + 8 → viết chữ số hàng trăm là 6, hàng chục là 3, hàng đơn vị là 8, được số <b>638</b>."},
      ...orig('knt_viet_tong',['placevalue'])
    ]};

  LEARN.knt_sosanh_3cs={
    intro:"Muốn so sánh hai số có ba chữ số, ta so sánh từng hàng, bắt đầu từ bên trái (hàng trăm). Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"So sánh 526 và 518", steps:[
        {say:`Biểu diễn hai số bằng khối: <b>526</b> và <b>518</b>.`, vis:row('526',pvr(5,'pv-h')+pvr(2,'pv-t')+pvr(6,'pv-u'))+row('518',pvr(5,'pv-h')+pvr(1,'pv-t')+pvr(8,'pv-u'))},
        {say:`<b>Bước 1 — Hàng trăm:</b> cùng là 5 trăm, bằng nhau. Ta so sánh tiếp hàng chục.`},
        {say:`<b>Bước 2 — Hàng chục:</b> 2 chục lớn hơn 1 chục. Đã phân biệt được, không cần xét hàng đơn vị nữa.`},
        {say:`Vậy:`, vis:eq(`526 &gt; 518`)},
      ]},
      {type:"stepper", title:"Các trường hợp khác", steps:[
        {say:`<b>Hàng trăm khác nhau:</b> 708 và 699. 7 trăm lớn hơn 6 trăm nên <b>708 &gt; 699</b> (dù 699 có chục và đơn vị lớn).`, vis:eq(`708 &gt; 699`)},
        {say:`<b>Trăm bằng nhau, chục khác nhau:</b> 345 và 354. Cùng 3 trăm; 4 chục bé hơn 5 chục nên <b>345 &lt; 354</b>.`, vis:eq(`345 &lt; 354`)},
        {say:`<b>Trăm và chục bằng nhau:</b> 561 và 567. So sánh đơn vị: 1 bé hơn 7 nên <b>561 &lt; 567</b>.`, vis:eq(`561 &lt; 567`)},
      ]},
      ...orig('knt_sosanh_3cs',['barcompare']),
      ghiNho("So sánh từ <b>trái sang phải</b>: trăm → chục → đơn vị. Hàng nào khác nhau đầu tiên thì quyết định số nào lớn hơn.")
    ]};

  /* ======================== CHỦ ĐỀ 11: ĐỘ DÀI, TIỀN VIỆT NAM ======================== */
  LEARN.knt_dodai={
    intro:"Ngoài xăng-ti-mét (cm), ta còn dùng đề-xi-mét (dm), mét (m) và ki-lô-mét (km). Con xem từng bước các đơn vị này liên hệ với nhau thế nào nhé!",
    blocks:[
      {type:"stepper", title:"Các đơn vị đo độ dài", steps:[
        {say:`Trên thước kẻ, mỗi vạch cách nhau <b>1 xăng-ti-mét (cm)</b>. Từ vạch 0 đến vạch 10 dài <b>10 cm</b>.`, vis:strip(0,10,{0:'edge',1:'in',2:'in',3:'in',4:'in',5:'in',6:'in',7:'in',8:'in',9:'in',10:'edge'})},
        {say:`<b>10 cm</b> gộp lại thành <b>1 đề-xi-mét (dm)</b>.`, vis:eq(`1 dm = 10 cm`)},
        {say:`<b>10 dm</b> gộp lại thành <b>1 mét (m)</b>. Vì 1 dm = 10 cm nên 1 m = 10 × 10 = 100 cm.`, vis:eq(`1 m = 10 dm = 100 cm`)},
        {say:`Quãng đường dài ta dùng <b>ki-lô-mét (km)</b>: <b>1 km = 1 000 m</b>.`, vis:eq(`1 km = 1 000 m`)},
        {say:`<b>Cách đổi:</b> đổi đơn vị lớn ra đơn vị nhỏ thì nhân. Ví dụ <b>3 dm = ? cm</b>: 1 dm = 10 cm nên 3 dm = 3 × 10 = <b>30 cm</b>.`, vis:eq(`3 dm = 3 × 10 = 30 cm`)},
        {say:`<b>Chọn đơn vị phù hợp:</b> vật nhỏ như bút chì → cm; chiều cao cái bàn → dm; chiều dài lớp học, chiều cao cửa → m; quãng đường giữa hai thành phố → km.`},
      ]},
      ghiNho("1 dm = 10 cm &nbsp;·&nbsp; 1 m = 10 dm = 100 cm &nbsp;·&nbsp; 1 km = 1 000 m.")
    ]};

  LEARN.knt_tien={
    intro:"Đơn vị tiền Việt Nam là đồng. Con làm quen với các tờ 100 đồng, 200 đồng, 500 đồng và 1 000 đồng, rồi học cách đếm tiền và tính tiền trả lại.",
    blocks:[
      {type:"stepper", title:"Đếm tiền và trả lại tiền", steps:[
        {say:`Các tờ tiền con học: <b>100 đồng, 200 đồng, 500 đồng, 1 000 đồng</b>. (Hình vẽ chỉ để minh hoạ giá trị.)`, vis:`<div class="st-pics">${ci('note100')}${ci('note200')}${ci('note500')}${ci('note1000')}</div>`},
        {say:`<b>Đếm tiền:</b> cộng giá trị các tờ. Có 1 tờ 200 đồng và 1 tờ 500 đồng thì có 200 + 500 = <b>700 đồng</b>.`, vis:`<div class="st-pics">${ci('note200')}${ci('note500')}</div>`+eq(`200 + 500 = 700`)},
        {say:`<b>Đổi tiền:</b> 2 tờ 500 đồng đổi được 1 tờ 1 000 đồng (500 + 500 = 1 000). 10 tờ 100 đồng cũng đổi được 1 000 đồng.`, vis:`<div class="st-pics">${ci('note500')}${ci('note500')}</div>`+eq(`500 + 500 = 1 000`)},
        {say:`<b>Tiền trả lại:</b> Mẹ đưa <b>1 000 đồng</b>, mua đồ hết <b>600 đồng</b>. Số tiền được trả lại là phần còn lại, ta làm phép trừ.`, vis:eq(`1 000 − 600 = 400`)},
        {say:`<b>Cách nhẩm:</b> 600 đồng là 6 trăm, 1 000 đồng là 10 trăm. 10 trăm − 6 trăm = 4 trăm = <b>400 đồng</b>.`},
      ]},
      ...orig('knt_tien',['wordcards'])
    ]};

  LEARN.knt_thuchanh_dodai={
    intro:"Con học cách đo độ dài bằng thước kẻ và cách tính khi vật không bắt đầu từ vạch 0.",
    blocks:[
      {type:"stepper", title:"Cách đo bằng thước kẻ", steps:[
        {say:`<b>Bước 1:</b> đặt vạch <b>0</b> của thước trùng với một đầu của vật cần đo (ví dụ cái bút).`, vis:strip(0,12,{0:'edge'})},
        {say:`<b>Bước 2:</b> giữ thước thẳng, không xê dịch. Nhìn xem đầu kia của vật chỉ vào số nào trên thước. Ví dụ vạch 12.`, vis:strip(0,12,{0:'edge',1:'in',2:'in',3:'in',4:'in',5:'in',6:'in',7:'in',8:'in',9:'in',10:'in',11:'in',12:'edge'})},
        {say:`<b>Bước 3:</b> đọc kết quả kèm đơn vị: cái bút dài <b>12 cm</b>.`, vis:eq(`12 cm`)},
      ]},
      {type:"stepper", title:"Khi vật không bắt đầu từ vạch 0", steps:[
        {say:`Đoạn thẳng đặt từ vạch <b>3</b> đến vạch <b>10</b> (không bắt đầu từ vạch 0).`, vis:strip(0,12,{3:'edge',4:'in',5:'in',6:'in',7:'in',8:'in',9:'in',10:'edge'})},
        {say:`Độ dài là số khoảng cách giữa hai vạch: lấy số ở đầu kia <b>trừ</b> số ở đầu này.`, vis:eq(`10 − 3 = 7`)},
        {say:`Vậy đoạn thẳng dài <b>7 cm</b>.`},
      ]},
      ...orig('knt_thuchanh_dodai',['ruler'])
    ]};

  /* ======================== CHỦ ĐỀ 12: CỘNG, TRỪ TRONG PHẠM VI 1 000 ======================== */
  LEARN.knt_cong1000={
    intro:"Cộng các số có ba chữ số, không nhớ: đặt tính thẳng cột, cộng từ phải sang trái. Con xem từng cột nhé!",
    blocks:[
      {type:"stepper", title:"235 + 142", steps:tinhCot(235,142,'+')},
      {type:"stepper", title:"Thêm ví dụ: 421 + 336", steps:tinhCot(421,336,'+')},
      {type:"concept", text:"Con tự xem hoạt hình đặt tính và bấm từng bước:", big:""},
      {type:"vcalc"},
      ghiNho("Cộng <b>từ phải sang trái</b>: đơn vị → chục → trăm. Cột nào cộng được ít hơn 10 thì viết luôn, không cần nhớ.")
    ]};

  LEARN.knt_cong1000n={
    intro:"Cộng có nhớ: khi một cột cộng được 10 trở lên, ta viết chữ số hàng đơn vị của kết quả và nhớ 1 sang cột bên trái. Con xem từng cột nhé!",
    blocks:[
      {type:"stepper", title:"176 + 158 (nhớ ở hai cột)", steps:tinhCot(176,158,'+')},
      {type:"stepper", title:"Thêm ví dụ: 268 + 345", steps:tinhCot(268,345,'+')},
      {type:"concept", text:"Con tự xem hoạt hình đặt tính và bấm từng bước:", big:""},
      {type:"vcalc"},
      ghiNho("Nhớ 1 nghĩa là thêm 1 vào cột bên trái khi cộng cột đó. Đừng quên cộng số nhớ!")
    ]};

  LEARN.knt_tru1000={
    intro:"Trừ các số có ba chữ số, không nhớ (không phải mượn): đặt tính thẳng cột, trừ từ phải sang trái. Con xem từng cột nhé!",
    blocks:[
      {type:"stepper", title:"578 − 346", steps:tinhCot(578,346,'-')},
      {type:"stepper", title:"Thêm ví dụ: 849 − 325", steps:tinhCot(849,325,'-')},
      {type:"concept", text:"Con tự xem hoạt hình đặt tính và bấm từng bước:", big:""},
      {type:"vcalc"},
      ghiNho("Trừ <b>từ phải sang trái</b>: đơn vị → chục → trăm. Số bị trừ (ở trên) luôn lớn hơn số trừ (ở dưới).")
    ]};

  LEARN.knt_tru1000n={
    intro:"Trừ có nhớ (có mượn): khi chữ số ở trên nhỏ hơn chữ số ở dưới, ta mượn 1 ở hàng liền trước. Con xem từng cột nhé!",
    blocks:[
      {type:"stepper", title:"432 − 158 (mượn ở hai cột)", steps:tinhCot(432,158,'-')},
      {type:"stepper", title:"Thêm ví dụ: 625 − 287", steps:tinhCot(625,287,'-')},
      {type:"concept", text:"Con tự xem hoạt hình đặt tính và bấm từng bước:", big:""},
      {type:"vcalc"},
      ghiNho("Mượn 1 ở hàng liền trước nghĩa là 1 chục thành 10 đơn vị (hoặc 1 trăm thành 10 chục). Hàng đã cho mượn thì nhớ bớt đi 1 khi trừ.")
    ]};

  /* ======================== CHỦ ĐỀ 13: THỐNG KÊ, XÁC SUẤT ======================== */
  const fr=(icon,n)=>big(icon.repeat(n));
  LEARN.knt_kiemdem={
    intro:"Kiểm đếm là phân loại rồi đếm xem mỗi loại có bao nhiêu. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Kiểm đếm các quả và kẹo trong giỏ", steps:[
        {say:`Trong giỏ có nhiều thứ lẫn lộn. Ta muốn biết mỗi loại có bao nhiêu.`, vis:`<div class="st-pics">${big('🍎🍬🍊🍎🍬🍬🍊🍎🍬🍎🍊🍬')}</div>`},
        {say:`<b>Bước 1 — Phân loại:</b> xếp các đồ vật giống nhau vào cùng một hàng.`, vis:row('Táo',fr('🍎',4))+row('Cam',fr('🍊',3))+row('Kẹo',fr('🍬',5))},
        {say:`<b>Bước 2 — Đếm từng loại:</b> mỗi lần đếm gạch một vạch. Gom 5 vạch thành một nhóm cho dễ đếm.`, vis:row('Táo','| | | |')+row('Cam','| | |')+row('Kẹo','| | | | |')},
        {say:`<b>Bước 3 — Ghi kết quả:</b> táo 4, cam 3, kẹo 5.`, vis:eq(`4 &nbsp; 3 &nbsp; 5`)},
        {say:`<b>Bước 4 — Dùng số liệu:</b> tất cả có 4 + 3 + 5 = 12 đồ vật. Kẹo nhiều nhất (5), cam ít nhất (3).`, vis:eq(`4 + 3 + 5 = 12`)},
      ]},
      ...orig('knt_kiemdem',['pictochart'])
    ]};

  LEARN.knt_bieudo_tranh={
    intro:"Biểu đồ tranh dùng hình ảnh để cho biết số lượng. Mỗi hình thể hiện một số lượng nhất định (ví dụ 1 bạn). Con xem cách đọc biểu đồ nhé!",
    blocks:[
      ...orig('knt_bieudo_tranh',['pictochart']),
      {type:"stepper", title:"Cách đọc biểu đồ tranh", steps:[
        {say:`<b>Bước 1 — Đọc tên:</b> mỗi hàng là một loại (Mèo, Chó, Chim). Mỗi hình là 1 bạn.`},
        {say:`<b>Bước 2 — Đếm hình ở mỗi hàng:</b> Mèo có 4 hình, Chó có 6 hình, Chim có 3 hình. Nghĩa là 4 bạn thích mèo, 6 bạn thích chó, 3 bạn thích chim.`, vis:eq(`4 &nbsp; 6 &nbsp; 3`)},
        {say:`<b>Bước 3 — Tìm nhiều nhất, ít nhất:</b> hàng dài nhất là Chó (6) — nhiều nhất. Hàng ngắn nhất là Chim (3) — ít nhất.`},
        {say:`<b>Bước 4 — So sánh:</b> muốn biết chó hơn mèo mấy bạn, lấy số lớn trừ số bé.`, vis:eq(`6 − 4 = 2`)},
        {say:`<b>Bước 5 — Tính tổng:</b> muốn biết tất cả có bao nhiêu bạn, cộng các số lại.`, vis:eq(`4 + 6 + 3 = 13`)},
      ]}
    ]};

  LEARN.knt_chacchan={
    intro:"Khi lấy một quả bóng từ hộp, ta có thể nói: chắc chắn, có thể, hoặc không thể. Con xem từng bước cách quyết định nhé!",
    blocks:[
      {type:"stepper", title:"Lấy 1 quả bóng từ hộp (không nhìn)", steps:[
        {say:`<b>Hộp 1</b> chỉ có bóng đỏ. Lấy ra 1 quả: quả đó <b>chắc chắn</b> là bóng đỏ, và <b>không thể</b> là bóng xanh.`, vis:row('Hộp 1',fr('🔴',4))},
        {say:`<b>Hộp 2</b> có cả bóng đỏ và bóng xanh. Lấy ra 1 quả: <b>có thể</b> là bóng đỏ, <b>có thể</b> là bóng xanh (chưa biết chắc).`, vis:row('Hộp 2',fr('🔴',3)+fr('🔵',2))},
        {say:`Với hộp 2, lấy ra bóng vàng thì sao? Trong hộp không có bóng vàng nên <b>không thể</b>.`},
        {say:`<b>Cách nghĩ nhanh:</b> hỏi hai câu.<br>① Trong hộp <b>có màu đó</b> không? Không có → <b>không thể</b>.<br>② Nếu có, thì <b>toàn bộ</b> bóng đều là màu đó chứ? Đúng → <b>chắc chắn</b>; chưa phải → <b>có thể</b>.`},
      ]},
      {type:"example", html:"<b>Ví dụ khác:</b> Ngày mai mặt trời mọc ở hướng Đông — <b>chắc chắn</b>. Ngày mai trời mưa — <b>có thể</b>. Con cá bơi trên cây — <b>không thể</b>."}
    ]};

  LEARN.knt_thuchanh_kiemdem={
    intro:"Con cùng bạn làm một khảo sát nhỏ theo từng bước: hỏi, ghi, đếm, vẽ biểu đồ và nhận xét.",
    blocks:[
      {type:"stepper", title:"Khảo sát: Bạn thích ăn quả nào nhất?", steps:[
        {say:`<b>Bước 1 — Chọn điều muốn hỏi:</b> "Bạn thích ăn quả nào nhất: táo, cam hay kẹo?"`},
        {say:`<b>Bước 2 — Hỏi từng bạn và ghi bằng vạch:</b> mỗi bạn trả lời xong thì gạch 1 vạch vào hàng của loại đó.`, vis:row('Táo','| | | | |')+row('Cam','| | |')+row('Kẹo','| |')},
        {say:`<b>Bước 3 — Đếm vạch:</b> táo 5, cam 3, kẹo 2.`, vis:eq(`5 &nbsp; 3 &nbsp; 2`)},
        {say:`<b>Bước 4 — Vẽ biểu đồ tranh:</b> mỗi bạn là một hình.`, vis:row('Táo',fr('🍎',5))+row('Cam',fr('🍊',3))+row('Kẹo',fr('🍬',2))},
        {say:`<b>Bước 5 — Nhận xét:</b> táo được chọn nhiều nhất (5 bạn), kẹo ít nhất (2 bạn). Có tất cả 5 + 3 + 2 = 10 bạn trả lời.`, vis:eq(`5 + 3 + 2 = 10`)},
      ]}
    ]};

  /* ======================== TIẾNG VIỆT — TẬP 1 ======================== */
  const sentence=(parts)=>`<div class="st-eq" style="font-size:20px;line-height:1.9">${parts.map(p=>p[1]?`<span class="st-tag ${p[1]}">${p[0]}</span>`:p[0]).join(' ')}</div>`;

  const ABC_SAMPLE=["b","c","d","đ","g","h","k","q","x","y"];
  LEARN.tv_bang_chu_cai={
    intro:"Bảng chữ cái giúp ta đọc, viết và sắp xếp thứ tự. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Bảng chữ cái tiếng Việt", steps:[
        {say:`Bảng chữ cái tiếng Việt có <b>29 chữ cái</b>, xếp theo một thứ tự nhất định. Con đọc to từ trái sang phải:`, vis:chips(ALPHABET.map(a=>a[0]))},
        {say:`Mỗi chữ cái có một <b>tên gọi</b> riêng. Có những tên con cần nhớ kĩ vì khác với chữ viết:`, vis:chips(ALPHABET.filter(a=>ABC_SAMPLE.includes(a[0])).map(a=>`${a[0]} — ${a[1]}`),'b')},
        {say:`Ví dụ: chữ <b>c</b> có tên là "<b>xê</b>", chữ <b>đ</b> có tên là "<b>đê</b>" (khác chữ <b>d</b> là "dê"), chữ <b>y</b> có tên là "<b>i dài</b>".`},
        {say:`<b>Học bằng hình ảnh:</b> gắn mỗi chữ cái với một hình quen thuộc sẽ dễ nhớ hơn. Con xem các thẻ bên dưới.`},
        {say:`<b>Dùng bảng chữ cái để xếp thứ tự tên:</b> so sánh chữ cái đầu của mỗi tên. Ví dụ An, Bình, Chi: a đứng trước b, b đứng trước c nên xếp <b>An, Bình, Chi</b>. Nếu hai tên cùng chữ cái đầu thì so sánh chữ cái thứ hai.`, vis:chips(['An','Bình','Chi'],'c')},
      ]},
      ...orig('tv_bang_chu_cai',['wordcards']),
      ghiNho("Có 29 chữ cái. Học thuộc thứ tự bảng chữ cái giúp con tra từ điển và xếp tên theo thứ tự.")
    ]};

  LEARN.tv_trch={
    intro:"Hai âm tr và ch nghe gần giống nhau nên rất dễ viết nhầm. Muốn viết đúng, con phải nhớ mặt chữ của từng từ quen thuộc. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Cách chọn tr hay ch", steps:[
        {say:`<b>Bước 1 — Đọc to từ và nhìn hình</b> để biết đó là gì.`},
        {say:`<b>Bước 2 — Nhớ xem từ đó viết với tr hay ch.</b> Các từ viết với <b>tr</b>:`, vis:pics([["trâu","🐃"],["trứng","🥚"],["trường học","🏫"],["trăng","🌙"]])},
        {say:`Các từ viết với <b>ch</b>:`, vis:pics([["chim","🐦"],["chân","🦵"],["cha","👨"],["chợ","🛒"]])},
        {say:`<b>Mẹo nhớ:</b> các từ chỉ người thân trong gia đình thường viết với <b>ch</b>: cha, chú, chị. (Con vẫn phải nhớ từng từ nhé!)`},
        {say:`<b>Bước 3 — Điền thử:</b> con ___âu (có sừng, kéo cày): đó là con <b>trâu</b> → viết <b>tr</b>. Con ___im (bay trên trời, hót líu lo): đó là con <b>chim</b> → viết <b>ch</b>.`},
        {say:`<b>Bước 4 — Đọc lại và kiểm tra</b> xem từ vừa viết có quen mặt chữ không. Nếu chưa chắc, hỏi cô giáo hoặc tra từ điển.`},
      ]},
      ghiNho("<b>tr:</b> trâu, trứng, trường học, trăng &nbsp;·&nbsp; <b>ch:</b> chim, chân, cha, chợ.")
    ]};

  LEARN.tv_sx={
    intro:"Hai âm s và x cũng rất dễ viết nhầm. Con xem từng bước để nhớ các từ quen thuộc nhé!",
    blocks:[
      {type:"stepper", title:"Cách chọn s hay x", steps:[
        {say:`<b>Bước 1 — Đọc to từ và nhìn hình</b> để biết đó là gì.`},
        {say:`<b>Bước 2 — Nhớ xem từ đó viết với s hay x.</b> Các từ viết với <b>s</b>:`, vis:pics([["sách","📕"],["sông",""],["sao","⭐"],["sư tử","🦁"]])},
        {say:`Các từ viết với <b>x</b>:`, vis:pics([["xanh","🟢"],["xe đạp","🚲"],["xôi","🍚"],["xa",""]])},
        {say:`<b>Mẹo nhớ:</b> quả (lá) có màu của lá cây là màu <b>x</b>anh. Phương tiện có hai bánh em đạp để đi là <b>x</b>e đạp.`},
        {say:`<b>Bước 3 — Điền thử:</b> quyển ___ách (để đọc): quyển <b>sách</b> → viết <b>s</b>. Màu ___anh của lá cây: <b>xanh</b> → viết <b>x</b>.`},
        {say:`<b>Bước 4 — Đọc lại và kiểm tra.</b> Nếu chưa chắc, hỏi cô giáo hoặc tra từ điển.`},
      ]},
      ghiNho("<b>s:</b> sách, sông, sao, sư tử &nbsp;·&nbsp; <b>x:</b> xanh, xe đạp, xôi, xa.")
    ]};

  const wc=k=>orig(k,['wordcards']), ac=k=>orig(k,['actioncards']), sc=k=>orig(k,['scenecards']);
  LEARN.tv_su_vat_hoatdong_gioithieu={
    intro:"Con học phân biệt từ chỉ sự vật, từ chỉ hoạt động và cách đặt câu giới thiệu. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"1. Từ chỉ sự vật", steps:[
        {say:`<b>Từ chỉ sự vật</b> là từ <b>gọi tên</b> người, đồ vật, con vật, cây cối… Con nhìn thấy hoặc chạm vào được.`},
        {say:`Cách nhận ra: tự hỏi <b>"Đây là TÊN của ai, của cái gì?"</b> Ví dụ: học sinh, cặp sách, cô giáo, bác sĩ là tên của người và đồ vật.`, vis:pics([["học sinh","🧑‍🎓"],["cặp sách","🎒"],["cô giáo","👩‍🏫"],["bác sĩ","👩‍⚕️"]])},
        {say:`Từ chỉ sự vật là tên gọi nên khi nhìn vào <b>không có chuyển động</b>: đứng yên.`},
      ]},
      ...wc('tv_su_vat_hoatdong_gioithieu'),
      {type:"stepper", title:"2. Từ chỉ hoạt động", steps:[
        {say:`<b>Từ chỉ hoạt động</b> là từ chỉ <b>việc làm</b> của người hoặc con vật. Luôn có <b>chuyển động</b>.`},
        {say:`Cách nhận ra: tự hỏi <b>"Ai đó đang LÀM GÌ?"</b> Ví dụ: đi học, dạy học, khám bệnh. Con bấm vào các thẻ bên dưới để xem chuyển động thật nhé!`},
      ]},
      ...ac('tv_su_vat_hoatdong_gioithieu'),
      ...sc('tv_su_vat_hoatdong_gioithieu'),
      {type:"stepper", title:"3. Câu giới thiệu: Ai là gì?", steps:[
        {say:`Câu giới thiệu dùng để <b>giới thiệu</b> hoặc cho biết một người, một vật <b>là gì</b>. Câu có chữ <b>"là"</b>.`},
        {say:`Câu gồm hai phần: <b>Ai (cái gì)</b> + <b>là</b> + <b>gì</b>.`, vis:sentence([['Bạn Hà','b'],['là',''],['học sinh lớp 2A.','c']])},
        {say:`Muốn tìm hai phần, con đặt câu hỏi: <b>"Bạn Hà là gì?"</b> → học sinh lớp 2A. <b>"Ai là học sinh lớp 2A?"</b> → bạn Hà.`},
        {say:`Thêm ví dụ:`, vis:sentence([['Bố em','b'],['là',''],['bác sĩ.','c']])},
        {say:`Con tự đặt: "<b>Em</b> là <b>học sinh</b>." Đừng quên viết hoa chữ đầu câu và đặt dấu chấm cuối câu.`},
      ]},
      ghiNho("Sự vật = <b>tên gọi</b> (đứng yên). Hoạt động = <b>việc làm</b> (có chuyển động). Câu giới thiệu có dạng <b>Ai là gì?</b>")
    ]};

  LEARN.tv_hoatdong_neuhoatdong={
    intro:"Từ chỉ hoạt động cho biết ai đó đang làm gì. Con học cách tìm từ chỉ hoạt động và đặt câu 'Ai làm gì?'. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Câu nêu hoạt động: Ai làm gì?", steps:[
        {say:`<b>Từ chỉ hoạt động</b> là từ chỉ việc làm của người hoặc con vật, luôn có chuyển động: quét nhà, chạy, nhảy, bơi, ăn… Con bấm vào các thẻ bên dưới để xem chuyển động thật.`},
        {say:`<b>Câu nêu hoạt động</b> cho biết ai đó làm việc gì. Câu có hai phần: <b>Ai</b> (người, con vật) + <b>làm gì</b> (hoạt động).`, vis:sentence([['Em','b'],['quét nhà.','c']])},
        {say:`<b>Tìm từ chỉ hoạt động trong câu:</b> con hỏi <b>"... làm gì?"</b>. Câu "Bạn Lan viết bài." → hỏi "Bạn Lan làm gì?" → <b>viết bài</b>.`, vis:sentence([['Bạn Lan','b'],['viết bài.','c']])},
        {say:`<b>Đặt câu:</b> chọn người hoặc con vật, rồi chọn việc làm.`, vis:sentence([['Mẹ','b'],['nấu cơm.','c']])+sentence([['Chim','b'],['hót líu lo.','c']])},
        {say:`Nhớ viết hoa chữ cái đầu câu và đặt dấu chấm ở cuối câu.`},
      ]},
      ...ac('tv_hoatdong_neuhoatdong'),
      ghiNho("Câu nêu hoạt động: <b>Ai</b> + <b>làm gì</b>. Muốn tìm từ chỉ hoạt động, hỏi \"... làm gì?\".")
    ]};

  LEARN.tv_dacdiem_neudacdiem={
    intro:"Từ chỉ đặc điểm cho biết màu sắc, hình dáng, tính tình của người, vật. Con học cách tìm từ chỉ đặc điểm và đặt câu 'Ai thế nào?'. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Câu nêu đặc điểm: Ai thế nào?", steps:[
        {say:`<b>Từ chỉ đặc điểm</b> cho biết <b>màu sắc, hình dáng, tính chất, tính tình</b>. Ví dụ: <b>cao</b>, <b>đỏ</b>, <b>ngoan</b>, <b>đen láy</b>.`, vis:pics([["cao","🦒"],["đỏ","🔴"],["ngoan","😇"],["đen láy","👁️"]])},
        {say:`<b>Câu nêu đặc điểm</b> cho biết người, vật <b>như thế nào</b>. Câu có hai phần: <b>Ai (cái gì)</b> + <b>thế nào</b>.`, vis:sentence([['Đôi mắt','b'],['đen láy.','c']])},
        {say:`<b>Tìm từ chỉ đặc điểm:</b> con hỏi <b>"... như thế nào?"</b>. Câu "Mái tóc mượt mà." → hỏi "Mái tóc như thế nào?" → <b>mượt mà</b>.`, vis:sentence([['Mái tóc','b'],['mượt mà.','c']])},
        {say:`<b>Phân biệt:</b> "Bạn Lan viết bài." là câu nêu <b>hoạt động</b> (việc làm). "Bạn Lan rất ngoan." là câu nêu <b>đặc điểm</b> (tính cách).`, vis:sentence([['Bạn Lan','b'],['rất ngoan.','c']])},
      ]},
      ...wc('tv_dacdiem_neudacdiem'),
      ghiNho("Câu nêu đặc điểm: <b>Ai (cái gì)</b> + <b>thế nào</b>. Muốn tìm từ chỉ đặc điểm, hỏi \"... như thế nào?\".")
    ]};

  /* ======================== TIẾNG VIỆT — TẬP 2 ======================== */
  LEARN.tv2_chinhta_vankho={
    intro:"Có ba cặp vần rất dễ viết nhầm: ưa/ươ, ua/uô, iê/yê. Mỗi cặp có một quy tắc đơn giản để chọn đúng. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Quy tắc chọn vần", steps:[
        {say:`<b>ưa hay ươ?</b> Con xem tiếng đó có <b>âm cuối</b> không (âm đứng sau vần, ví dụ n, ng, m, t, c, p, i…).`, vis:`<div class="st-pics">${ci('rain')}</div>`},
        {say:`<b>Không có âm cuối → viết "ưa":</b> mưa, cưa, thưa. <b>Có âm cuối → viết "ươ":</b> mượn (có n), vườn (có n), thương (có ng).`, vis:chips(['mưa','cưa','thưa'],'c')+chips(['mượn','vườn','thương'],'b')},
        {say:`<b>ua hay uô?</b> Cũng xem âm cuối. <b>Không có âm cuối → "ua":</b> mua, cua, chua. <b>Có âm cuối → "uô":</b> muối (có i), chuông (có ng), cuốn (có n).`, vis:chips(['mua','cua','chua'],'c')+chips(['muối','chuông','cuốn'],'b')},
        {say:`<b>iê hay yê?</b> Xem tiếng có <b>âm đầu</b> không. <b>Có âm đầu → "iê":</b> tiên, biển, hiền. <b>Không có âm đầu → "yê":</b> yêu, yên.`, vis:chips(['tiên','biển','hiền'],'c')+chips(['yêu','yên'],'b')},
        {say:`<b>Cách làm bài:</b> ① Đọc to từ. ② Xem có âm cuối (hoặc âm đầu) không. ③ Chọn vần theo quy tắc. ④ Đọc lại xem đúng chưa. Ví dụ: "m__" (trời đổ nước) → không có âm cuối → <b>mưa</b>.`},
      ]},
      ...orig('tv2_chinhta_vankho',['wordcards'])
    ]};

  LEARN.tv2_von_tu_thiennhien={
    intro:"Muốn dùng đúng từ, con cần biết từ đó thuộc nhóm nào. Con xem từng bước cách xếp từ vào nhóm thiên nhiên, cây cối, con vật nhé!",
    blocks:[
      {type:"stepper", title:"Xếp từ vào nhóm", steps:[
        {say:`<b>Cảnh vật thiên nhiên</b> là những thứ có sẵn quanh ta, không do con người làm ra: mặt trời, mây, mưa, gió, núi, sông, biển, mặt trăng.`, vis:`<div class="st-pics">${ci('sun')}${ci('cloud')}${ci('rain')}${ci('mountain')}${ci('river')}</div>`},
        {say:`<b>Cây cối</b> gồm các loại cây và hoa: cây phượng, cây bàng, cây dừa, hoa hồng, hoa cúc.`, vis:`<div class="st-pics">${ci('tree')}${big('🌸')}</div>`},
        {say:`<b>Con vật</b> gồm các loài vật: con mèo, con chó, con trâu, con gà, con cá.`, vis:`<div class="st-pics">${big('🐱')}${big('🐕')}${big('🐃')}${big('🐔')}${big('🐟')}</div>`},
        {say:`<b>Cách làm bài:</b> gặp một từ, con tự hỏi: <i>Đây là cảnh vật trong thiên nhiên? Là một loài cây, loài hoa? Hay là con vật? Hay chỉ là đồ vật (cái bàn, quyển vở)?</i> Rồi chọn nhóm đúng.`},
      ]},
      ...orig('tv2_von_tu_thiennhien',['wordcards'])
    ]};

  LEARN.tv2_on_tu_loai={
    intro:"Muốn biết một từ chỉ sự vật, hoạt động hay đặc điểm, con chỉ cần hỏi đúng một câu hỏi. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Ba câu hỏi để phân loại từ", steps:[
        {say:`<b>Câu hỏi 1: "Đây là TÊN của ai, của cái gì?"</b> Nếu đúng, đó là từ chỉ <b>sự vật</b>: cô giáo, con mèo, quyển sách.`, vis:pics([["cô giáo","👩‍🏫"],["con mèo","🐱"],["quyển sách","📕"]])},
        {say:`<b>Câu hỏi 2: "Ai đó đang LÀM GÌ?"</b> Nếu đúng, đó là từ chỉ <b>hoạt động</b>: chạy, bơi, quét nhà (có chuyển động).`},
        {say:`<b>Câu hỏi 3: "Như THẾ NÀO?"</b> (màu sắc, hình dáng, tính chất) Nếu đúng, đó là từ chỉ <b>đặc điểm</b>: đỏ, cao, ngoan.`, vis:pics([["đỏ","🔴"],["cao","🦒"],["ngoan","😇"]])},
        {say:`<b>Thử với câu:</b> "Con mèo chạy nhanh." Con mèo → sự vật. Chạy → hoạt động. Nhanh → đặc điểm.`, vis:sentence([['Con mèo','b'],['chạy','c'],['nhanh.','r']])},
      ]},
      ...orig('tv2_on_tu_loai',['actioncards']),
      ghiNho("Tên gọi → <b>sự vật</b>. Việc làm → <b>hoạt động</b>. Màu sắc, hình dáng, tính chất → <b>đặc điểm</b>.")
    ]};

  LEARN.tv2_dau_phay={
    intro:"Dấu phẩy giúp ta ngắt hơi và tách các từ cùng loại trong câu. Con xem từng bước cách đặt dấu phẩy nhé!",
    blocks:[
      {type:"stepper", title:"Dấu phẩy ( , )", steps:[
        {say:`Con đọc câu không có dấu phẩy: <i>"Trong vườn có hoa hồng hoa cúc và hoa lan."</i> Đọc liền một hơi thì khó biết có mấy loại hoa.`},
        {say:`Dấu phẩy dùng để <b>ngăn cách các từ cùng chỉ sự vật</b> được kể ra:`, vis:sentence([['Trong vườn có','' ],['hoa hồng','b'],[',',''],['hoa cúc','b'],['và',''],['hoa lan','b'],['.','']])},
        {say:`<b>Đặt dấu phẩy ở đâu?</b> Giữa các từ được kể ra. Nhưng <b>trước chữ "và"</b> (nối từ cuối cùng) thì <b>không</b> đặt dấu phẩy.`},
        {say:`Dấu phẩy cũng dùng khi kể các <b>hoạt động</b>: <i>Em thích đọc sách, vẽ tranh và hát.</i>`, vis:sentence([['Em thích',''],['đọc sách','c'],[',',''],['vẽ tranh','c'],['và',''],['hát','c'],['.','']])},
        {say:`<b>Cách kiểm tra:</b> đọc câu to lên, chỗ nào ngắt hơi giữa hai từ cùng loại thì đặt dấu phẩy.`},
      ]},
      ghiNho("Câu kể ba thứ trở lên: <b>A, B và C.</b> — dấu phẩy sau A, chữ \"và\" trước C.")
    ]};

  LEARN.tv2_cac_loai_cau={
    intro:"Khi nói và viết, ta dùng nhiều loại câu khác nhau. Con học cách nhận ra từng loại qua ý nghĩa và dấu cuối câu. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Ba loại câu", steps:[
        {say:`<b>Câu kể</b> dùng để <b>kể, tả hoặc giới thiệu</b> sự việc. Cuối câu thường có <b>dấu chấm ( . )</b>.`, vis:sentence([['Mẹ em đang nấu cơm','b'],['.','c']])},
        {say:`<b>Câu hỏi</b> dùng để <b>hỏi</b> điều mình muốn biết. Thường có các từ: ai, gì, ở đâu, mấy, bao nhiêu… Cuối câu có <b>dấu chấm hỏi ( ? )</b>.`, vis:sentence([['Bạn tên là gì','b'],['?','c']])},
        {say:`<b>Câu bộc lộ cảm xúc</b> dùng để <b>thể hiện cảm xúc</b> như vui mừng, ngạc nhiên, khen ngợi. Thường có các từ: ôi, chà, quá, thật… Cuối câu có <b>dấu chấm than ( ! )</b>.`, vis:sentence([['Ôi, bông hoa đẹp quá','b'],['!','c']])},
        {say:`<b>Cách xác định loại câu:</b> ① Xem dấu cuối câu. ② Nghĩ xem câu <b>để làm gì</b>: kể? hỏi? hay bộc lộ cảm xúc?`},
      ]},
      ghiNho("Kể → dấu chấm ( . ) &nbsp;·&nbsp; Hỏi → dấu chấm hỏi ( ? ) &nbsp;·&nbsp; Cảm xúc → dấu chấm than ( ! )")
    ]};

  LEARN.tv2_dau_cham_than={
    intro:"Dấu chấm than đặt cuối câu để bộc lộ cảm xúc. Con học cách chọn đúng dấu cuối câu. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Dấu chấm than ( ! )", steps:[
        {say:`<b>Dấu chấm than</b> đặt cuối câu <b>bộc lộ cảm xúc</b>: vui mừng, ngạc nhiên, khen ngợi, sợ hãi, tiếc nuối…`, vis:sentence([['Ôi, bông hoa đẹp quá','b'],['!','c']])},
        {say:`Con đọc câu bằng giọng thể hiện cảm xúc: <b>"Hay quá!"</b> (vui mừng), <b>"Trời ơi, nóng quá!"</b> (than phiền). Giọng đọc lên xuống khác câu bình thường.`},
        {say:`<b>Chọn dấu cuối câu — hỏi 3 câu:</b><br>① Câu để <b>hỏi</b>? → <b>?</b><br>② Câu để <b>bộc lộ cảm xúc</b>? → <b>!</b><br>③ Câu để <b>kể</b>? → <b>.</b>`},
        {say:`<b>Thử:</b> "Bạn tên là gì" → hỏi → <b>?</b>. "Chà, bài toán này khó thật" → cảm xúc → <b>!</b>. "Em đang đọc sách" → kể → <b>.</b>`, vis:sentence([['Bạn tên là gì','b'],['?','r']])+sentence([['Chà, bài toán này khó thật','b'],['!','r']])+sentence([['Em đang đọc sách','b'],['.','r']])},
      ]},
      ghiNho("Cuối câu: kể → <b>.</b> &nbsp;·&nbsp; hỏi → <b>?</b> &nbsp;·&nbsp; bộc lộ cảm xúc → <b>!</b>")
    ]};

  LEARN.tv2_vontu_chudiem={
    intro:"Từ ngữ được xếp theo chủ điểm: Gia đình, Trường học, Quê hương. Con học cách xếp từ vào đúng chủ điểm và cách đọc hiểu đoạn văn ngắn. Con xem từng bước nhé!",
    blocks:[
      {type:"stepper", title:"Xếp từ theo chủ điểm", steps:[
        {say:`<b>Chủ điểm Gia đình</b> gồm các từ chỉ người trong nhà:`, vis:chips(['ông','bà','bố','mẹ','anh','chị','em bé'],'c')},
        {say:`<b>Chủ điểm Trường học</b> gồm các từ chỉ người và nơi ở trường:`, vis:chips(['cô giáo','lớp học','sân trường','thư viện','bảng đen','bạn bè'],'b')},
        {say:`<b>Chủ điểm Quê hương</b> gồm các từ chỉ cảnh vật ở làng quê:`, vis:chips(['cánh đồng','dòng sông','luỹ tre','mái đình','làng xóm','cây đa'],'r')},
        {say:`<b>Cách làm bài:</b> gặp một từ, con hỏi: <i>"Từ này nói về người thân trong nhà, về trường lớp, hay về làng quê?"</i> rồi chọn chủ điểm.`},
      ]},
      {type:"stepper", title:"Cách đọc hiểu đoạn văn ngắn", steps:[
        {say:`Đoạn văn: <i>"Lan có một chú cún con tên là Bông. Mỗi chiều, Lan dắt Bông ra sân chơi."</i>`},
        {say:`<b>Bước 1:</b> đọc kĩ cả đoạn một lần. <b>Bước 2:</b> đọc câu hỏi, ví dụ: <i>"Mỗi chiều Lan làm gì với cún?"</i>`},
        {say:`<b>Bước 3:</b> tìm câu có ý trả lời ngay trong đoạn: câu thứ hai nói "dắt Bông ra sân chơi".`},
        {say:`<b>Bước 4:</b> chọn đáp án giống với đoạn văn: <b>dắt ra sân chơi</b>. Đừng chọn theo đoán mò, hãy dựa vào đoạn văn.`},
      ]},
      ...orig('tv2_vontu_chudiem',['wordcards'])
    ]};

  LEARN.tv2_trai_nghia={
    intro:"Từ trái nghĩa là những từ có nghĩa ngược nhau. Con xem từng bước cách tìm từ trái nghĩa nhé!",
    blocks:[
      {type:"stepper", title:"Từ trái nghĩa", steps:[
        {say:`<b>Từ trái nghĩa</b> là hai từ có nghĩa <b>ngược nhau</b>. Ví dụ: <b>cao</b> – <b>thấp</b>; <b>nóng</b> – <b>lạnh</b>.`, vis:chips(['cao – thấp','nóng – lạnh','to – nhỏ','dài – ngắn'],'b')},
        {say:`<b>Cách tìm:</b> nghĩ xem điều <b>ngược lại</b> với từ đã cho là gì. Từ "<b>vui</b>" ngược lại là "<b>buồn</b>".`},
        {say:`<b>Kiểm tra bằng cách đặt câu:</b> "Cột cờ rất <b>cao</b>." — "Cái bàn rất <b>thấp</b>." Hai câu nói điều ngược nhau.`},
        {say:`Thêm các cặp từ trái nghĩa quen thuộc:`, vis:chips(['sáng – tối','vui – buồn','khóc – cười','mở – đóng','lên – xuống','sạch – bẩn','nặng – nhẹ','đúng – sai'],'c')},
      ]},
      ghiNho("Từ trái nghĩa có nghĩa <b>ngược nhau</b>. Muốn tìm, hãy nghĩ điều ngược lại.")
    ]};

  LEARN.tv2_viet_doan={
    intro:"Đoạn văn gồm nhiều câu cùng nói về một chủ đề. Con xem từng bước cách xây một đoạn văn ngắn, rồi tự nói hoặc viết cho bố mẹ nghe nhé!",
    blocks:[
      {type:"stepper", title:"Viết đoạn văn 3 câu về chú mèo", steps:[
        {say:`<b>Bước 1 — Chọn chủ đề:</b> Hôm nay con kể về <b>chú mèo nhà em</b>.`},
        {say:`<b>Bước 2 — Câu mở đầu (giới thiệu):</b> cho biết con vật nào, tên gì.`, vis:sentence([['Nhà em có một chú mèo tên là Mi.','b']])},
        {say:`<b>Bước 3 — Câu ở giữa (tả hoặc kể thêm):</b> nói về bộ lông, hoạt động…`, vis:sentence([['Nhà em có một chú mèo tên là Mi.',''],['Bộ lông của Mi trắng muốt như bông.','c']])},
        {say:`<b>Bước 4 — Câu kết (nói cảm xúc):</b> con yêu quý, thích thú…`, vis:sentence([['Nhà em có một chú mèo tên là Mi.',''],['Bộ lông của Mi trắng muốt như bông.',''],['Em rất yêu quý chú mèo của mình.','r']])},
        {say:`<b>Bước 5 — Đọc lại và kiểm tra:</b> ① Đầu câu viết hoa. ② Cuối câu có dấu chấm. ③ Các câu đều nói về chú mèo, không lạc sang chuyện khác.`},
      ]},
      {type:"example", html:"<b>Thử viết:</b> Con hãy nói (hoặc viết) 3 câu về một con vật mà con yêu thích — câu mở đầu, câu tả, câu cảm xúc — rồi đọc cho bố mẹ nghe."}
    ]};

/*__PART_END__*/

  Object.keys(LEARN).forEach(k=>{ if(CONTENT[k]) CONTENT[k].learn=LEARN[k]; else console.warn('learn-steps: thiếu CONTENT.'+k); });
})();
