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

/*__PART_END__*/

  Object.keys(LEARN).forEach(k=>{ if(CONTENT[k]) CONTENT[k].learn=LEARN[k]; else console.warn('learn-steps: thiếu CONTENT.'+k); });
})();
