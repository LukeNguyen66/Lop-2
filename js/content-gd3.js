/* ===== GIAI ĐOẠN 3 — MỞ KHOÁ CÁC BÀI CÒN LẠI =====
   Toán Tập 1 (Bài 10, 14–36), Toán Chủ đề 14 (Bài 68–75), Tiếng Việt Tập 1 (7 bài còn khoá).
   Nạp SAU learn-steps.js (dùng window.LS, window.CH), TRƯỚC engine.js.
   Phần Học luôn viết theo kiểu hướng dẫn từng bước (stepper) hoặc lật trang (flipbook).
   Toán: đáp án tính bằng code. Tiếng Việt: tự soạn, không chép bài đọc SGK. Mọi bài giữ nhãn "bản nháp". */
(function(){
  const {rep,dots,row,N,eq,tag,frames,strip,pvr,pv,col,grp,plates,ci,big,chips,pics,sentence,tinhCot,congQua10,truQua10,ghiNho,clockSvg,GEO}=window.LS;
  const {R,P,near,mcNum,mcText,fillQ,fmt,SYM,cmpSymbol,pickN}=window.CH;
  const G={};                                   // nội dung các bài mới
  const gens=(...keys)=>[].concat(...keys.map(k=>(CONTENT[k]&&CONTENT[k].gen)||[]));
  const mc3=(q,opts,ans,extra)=>Object.assign({type:"mc",q,options:opts,answer:ans},extra||{});
  const two=(q,opts,ans,extra)=>mc3(q,opts,ans,Object.assign({two:true},extra||{}));
  const pageOf=(title,blocks)=>({title,blocks});
  const FLIP=(intro,pages)=>({intro,pages});
  const LIKELY3=["Chắc chắn","Có thể","Không thể"];

  /* ---------------------------------------------------------------------------------------
     CHỦ ĐỀ 2 — LUYỆN TẬP CHUNG (Bài 10, 14)
     --------------------------------------------------------------------------------------- */
  G.knt_ltc_cong_qua10={
    title:"Luyện tập chung (Cộng qua 10, bảng cộng, thêm bớt)",
    learn:FLIP("Lật từng trang để ôn lại 3 bài: cộng qua 10, bảng cộng qua 10, bài toán thêm bớt.",[
      pageOf("Bài 7. Phép cộng (qua 10) trong phạm vi 20",[
        {type:"stepper", title:"Ví dụ 7 + 5", steps:congQua10(7,5)},
        ghiNho("Làm đủ 10 trước, rồi cộng phần còn lại.")]),
      pageOf("Bài 8. Bảng cộng (qua 10)",[
        {type:"example", html:"<b>Cùng cộng với 9:</b> "+[2,3,4,5,6,7,8,9].map(b=>`9 + ${b} = ${9+b}`).join(' &nbsp;·&nbsp; ')},
        {type:"example", html:"<b>Cùng cộng với 8:</b> "+[3,4,5,6,7,8,9].map(b=>`8 + ${b} = ${8+b}`).join(' &nbsp;·&nbsp; ')},
        ghiNho("Quên kết quả thì làm đủ 10: 9 + 4 → lấy 1 của số 4 cho đủ 10, còn 3, được 13.")]),
      pageOf("Bài 9. Bài toán về thêm, bớt",[
        {type:"stepper", title:"Thêm → cộng, bớt → trừ", steps:[
          {say:`Có <b>8</b> quả táo, <b>thêm</b> <b>5</b> quả nữa. <b>Thêm</b> nghĩa là nhiều lên → làm phép <b>cộng</b>.`, vis:eq(`8 + 5 = 13`)},
          {say:`Có <b>15</b> cái kẹo, <b>cho bạn</b> <b>6</b> cái. <b>Cho đi</b> nghĩa là ít đi → làm phép <b>trừ</b>.`, vis:eq(`15 − 6 = 9`)}]}]),
    ]),
    practice:[
      {type:"fill", q:"Tính:", expr:"9 + 4", answer:13, hint:"9 + 1 + 3"},
      {type:"fill", q:"Có 8 quả táo, thêm 5 quả nữa. Có tất cả bao nhiêu quả?", answer:13, hint:"8 + 5"},
      {type:"mc", q:"7 + 6 = ?", options:["13","12","14","11"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"8 + 7", answer:15},
      {type:"fill", q:"Lan có 9 viên bi, được cho thêm 4 viên. Lan có tất cả bao nhiêu viên bi?", answer:13},
      {type:"mc", q:"6 + 9 = ?", options:["15","14","16","13"], answer:0},
    ],
    gen:gens('knt_cong_qua10','knt_bang_cong_qua10','knt_them_bot')
  };
  G.knt_ltc_tru_qua10={
    title:"Luyện tập chung (Trừ qua 10, bảng trừ, nhiều hơn – ít hơn)",
    learn:FLIP("Lật từng trang để ôn lại 3 bài: trừ qua 10, bảng trừ qua 10, bài toán nhiều hơn – ít hơn.",[
      pageOf("Bài 11. Phép trừ (qua 10) trong phạm vi 20",[
        {type:"stepper", title:"Ví dụ 14 − 6", steps:truQua10(14,6)},
        ghiNho("Tách số bị trừ thành 10 + số lẻ; lấy 10 trừ số trừ, rồi cộng số lẻ.")]),
      pageOf("Bài 12. Bảng trừ (qua 10)",[
        {type:"stepper", title:"Từ phép cộng suy ra phép trừ", steps:[
          {say:`Biết <b>9 + 5 = 14</b>.`, vis:eq(`9 + 5 = 14`)},
          {say:`Thì <b>14 − 9 = 5</b> và <b>14 − 5 = 9</b>. Từ một phép cộng ta có hai phép trừ.`, vis:eq(`14 − 9 = 5<br>14 − 5 = 9`)}]}]),
      pageOf("Bài 13. Nhiều hơn, ít hơn",[
        {type:"example", html:"<b>Nhiều hơn → cộng.</b> An có 7 viên bi, Bình nhiều hơn An 4 viên: 7 + 4 = 11 viên."},
        {type:"example", html:"<b>Ít hơn → trừ.</b> Cam có 12 quyển, Táo ít hơn Cam 3 quyển: 12 − 3 = 9 quyển."}]),
    ]),
    practice:[
      {type:"fill", q:"Tính:", expr:"13 − 5", answer:8, hint:"10 − 5 + 3"},
      {type:"fill", q:"An có 7 viên bi, Bình có nhiều hơn An 4 viên. Bình có bao nhiêu viên?", answer:11},
      {type:"mc", q:"15 − 8 = ?", options:["7","8","6","9"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"16 − 9", answer:7},
      {type:"fill", q:"Cam có 12 quyển vở, Táo ít hơn Cam 3 quyển. Táo có bao nhiêu quyển?", answer:9},
      {type:"mc", q:"14 − 7 = ?", options:["7","6","8","5"], answer:0},
    ],
    gen:gens('knt_tru_qua10','knt_bang_tru_qua10','knt_nhieuhon_ithon')
  };

  /* ---------------------------------------------------------------------------------------
     CHỦ ĐỀ 3 — KHỐI LƯỢNG, DUNG TÍCH
     --------------------------------------------------------------------------------------- */
  const KG_PAIRS=[["bao gạo","bao ngô"],["quả dưa","quả bí"],["túi cam","túi táo"],["con gà","con vịt"],["bao đường","bao muối"]];
  const L_PAIRS=[["thùng nước","can dầu"],["bình nước","chai sữa"],["xô nước","chậu nước"]];
  const kgAdd=()=>{ const p=P(KG_PAIRS), a=R(2,9), b=R(2,9);
    return fillQ(`${p[0][0].toUpperCase()+p[0].slice(1)} nặng ${a} kg, ${p[1]} nặng ${b} kg. Cả hai nặng bao nhiêu ki-lô-gam?`, a+b, {hint:`${a} + ${b}`}); };
  const kgSub=()=>{ const t=R(11,40), s=R(2,t-3); return fillQ(`Cửa hàng có ${t} kg gạo, đã bán ${s} kg. Còn lại bao nhiêu ki-lô-gam gạo?`, t-s, {hint:`${t} − ${s}`}); };
  const kgDiff=()=>{ const p=P(KG_PAIRS), a=R(8,25), b=R(2,a-2);
    return fillQ(`${p[0][0].toUpperCase()+p[0].slice(1)} nặng ${a} kg, ${p[1]} nặng ${b} kg. ${p[0][0].toUpperCase()+p[0].slice(1)} nặng hơn ${p[1]} mấy ki-lô-gam?`, a-b, {hint:`${a} − ${b}`}); };
  const kgMore=()=>{ const a=R(3,15), b=R(2,9); return fillQ(`Bao thứ nhất nặng ${a} kg. Bao thứ hai nặng hơn bao thứ nhất ${b} kg. Bao thứ hai nặng bao nhiêu ki-lô-gam?`, a+b, {hint:`${a} + ${b}`}); };
  const kgExpr=()=>{ const a=R(3,30), b=R(2,19); const add=Math.random()<0.5;
    return fillQ(add?`${a} kg + ${b} kg = ? kg`:`${a+b} kg − ${b} kg = ? kg`, add?a+b:a, {hint:add?`${a} + ${b}`:`${a+b} − ${b}`}); };
  const unitKg=()=>{ const o=shuffleArr(["ki-lô-gam (kg)","xăng-ti-mét (cm)","lít (l)"]); return mc3("Đơn vị đo khối lượng là:",o,o.indexOf("ki-lô-gam (kg)")); };
  const unitL=()=>{ const o=shuffleArr(["lít (l)","ki-lô-gam (kg)","xăng-ti-mét (cm)"]); return mc3("Đơn vị đo dung tích (lượng nước chứa được) là:",o,o.indexOf("lít (l)")); };
  const lAdd=()=>{ const p=P(L_PAIRS), a=R(2,9), b=R(2,9);
    return fillQ(`${p[0][0].toUpperCase()+p[0].slice(1)} chứa ${a} l, ${p[1]} chứa ${b} l. Cả hai chứa bao nhiêu lít?`, a+b, {hint:`${a} + ${b}`}); };
  const lSub=()=>{ const t=R(10,40), s=R(2,t-3); return fillQ(`Thùng có ${t} l nước, đã dùng ${s} l. Còn lại bao nhiêu lít nước?`, t-s, {hint:`${t} − ${s}`}); };
  const lDiff=()=>{ const a=R(8,30), b=R(2,a-2); return fillQ(`Can thứ nhất đựng ${a} l dầu, can thứ hai đựng ${b} l dầu. Can thứ nhất đựng nhiều hơn can thứ hai mấy lít?`, a-b, {hint:`${a} − ${b}`}); };
  const lExpr=()=>{ const a=R(3,30), b=R(2,19); const add=Math.random()<0.5;
    return fillQ(add?`${a} l + ${b} l = ? l`:`${a+b} l − ${b} l = ? l`, add?a+b:a, {hint:add?`${a} + ${b}`:`${a+b} − ${b}`}); };

  G.knt_kg={
    title:"Ki-lô-gam",
    learn:{ intro:"Ki-lô-gam là đơn vị đo khối lượng (độ nặng của vật). Con xem từng bước cách dùng cân và tính với ki-lô-gam nhé!",
      blocks:[
        {type:"stepper", title:"Đo độ nặng bằng ki-lô-gam", steps:[
          {say:`Muốn biết một vật <b>nặng hay nhẹ</b>, ta dùng <b>cân</b>. Đơn vị đo khối lượng ta học hôm nay là <b>ki-lô-gam</b>, viết tắt là <b>kg</b>.`, vis:`<div class="st-pics">${ci('scale')}</div>`},
          {say:`Đây là một bao gạo nặng <b>1 kg</b>. Đọc là "một ki-lô-gam".`, vis:`<div class="st-pics">${ci('bag1kg')}</div>`},
          {say:`<b>Cân thăng bằng:</b> khi hai đĩa cân ngang nhau, hai bên nặng <b>bằng nhau</b>. Đĩa nào bị chúi xuống là bên <b>nặng hơn</b>.`},
          {say:`<b>Đọc kết quả cân:</b> kim chỉ số nào thì vật nặng bấy nhiêu ki-lô-gam. Ví dụ quả dưa nặng <b>3 kg</b>, viết là 3 kg.`, vis:eq(`3 kg`)},
          {say:`<b>Tính với ki-lô-gam:</b> cộng, trừ các số như bình thường, rồi nhớ viết <b>kg</b> sau kết quả. Bao gạo 5 kg và bao ngô 3 kg: 5 + 3 = 8 nên cả hai nặng <b>8 kg</b>.`, vis:eq(`5 kg + 3 kg = 8 kg`)},
          {say:`Có 15 kg gạo, bán đi 6 kg: 15 − 6 = 9, còn lại <b>9 kg</b>.`, vis:eq(`15 kg − 6 kg = 9 kg`)},
        ]},
        ghiNho("Ki-lô-gam viết tắt là kg. Kết quả bài toán về khối lượng phải có đơn vị kg.")
      ]},
    practice:[
      {type:"mc", q:"Đơn vị đo khối lượng là:", options:["ki-lô-gam (kg)","xăng-ti-mét (cm)","lít (l)"], answer:0},
      {type:"fill", q:"Bao gạo nặng 5 kg, bao ngô nặng 3 kg. Cả hai bao nặng bao nhiêu ki-lô-gam?", answer:8, hint:"5 + 3"},
      {type:"fill", q:"Có 15 kg gạo, đã bán 6 kg. Còn lại bao nhiêu ki-lô-gam?", answer:9, hint:"15 − 6"},
    ],
    test:[
      {type:"fill", q:"Quả dưa nặng 4 kg, quả bí nặng 2 kg. Cả hai quả nặng bao nhiêu ki-lô-gam?", answer:6},
      {type:"fill", q:"Bao thứ nhất nặng 12 kg, bao thứ hai nặng 7 kg. Bao thứ nhất nặng hơn bao thứ hai mấy ki-lô-gam?", answer:5},
      {type:"fill", q:"10 kg + 8 kg = ? kg", answer:18},
    ],
    gen:[kgAdd,kgSub,kgDiff,kgMore,kgExpr,unitKg]
  };
  G.knt_lit={
    title:"Lít",
    learn:{ intro:"Lít là đơn vị đo dung tích (lượng nước, sữa, dầu… một cái bình chứa được). Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"Đo lượng nước bằng lít", steps:[
          {say:`Muốn biết một cái chai, cái can <b>chứa được bao nhiêu nước</b>, ta dùng đơn vị <b>lít</b>, viết tắt là <b>l</b>.`, vis:`<div class="st-pics">${ci('bottle1l')}</div>`},
          {say:`Chai trong hình chứa <b>1 lít</b> nước. Đọc là "một lít", viết là <b>1 l</b>.`},
          {say:`Muốn đong nhiều nước, ta đổ <b>từng chai 1 lít</b>. Đổ 3 chai thì được <b>3 l</b>.`, vis:`<div class="st-pics">${ci('bottle1l')}${ci('bottle1l')}${ci('bottle1l')}</div>`+eq(`1 l + 1 l + 1 l = 3 l`)},
          {say:`<b>Tính với lít:</b> cộng, trừ như bình thường rồi viết <b>l</b> sau kết quả. Can A chứa 5 l, can B chứa 4 l: 5 + 4 = 9, cả hai chứa <b>9 l</b>.`, vis:eq(`5 l + 4 l = 9 l`)},
          {say:`Thùng có 12 l nước, dùng hết 5 l: 12 − 5 = 7, còn lại <b>7 l</b>.`, vis:eq(`12 l − 5 l = 7 l`)},
        ]},
        ghiNho("Lít viết tắt là l. Ki-lô-gam đo độ nặng, lít đo lượng nước chứa được — đừng nhầm hai đơn vị.")
      ]},
    practice:[
      {type:"mc", q:"Đơn vị đo dung tích (lượng nước chứa được) là:", options:["lít (l)","ki-lô-gam (kg)","xăng-ti-mét (cm)"], answer:0},
      {type:"fill", q:"Can A chứa 5 l, can B chứa 4 l. Cả hai can chứa bao nhiêu lít?", answer:9, hint:"5 + 4"},
      {type:"fill", q:"Thùng có 12 l nước, đã dùng 5 l. Còn lại bao nhiêu lít?", answer:7, hint:"12 − 5"},
    ],
    test:[
      {type:"fill", q:"Bình nước chứa 6 l, chai sữa chứa 2 l. Cả hai chứa bao nhiêu lít?", answer:8},
      {type:"fill", q:"Can thứ nhất đựng 14 l dầu, can thứ hai đựng 9 l dầu. Can thứ nhất đựng nhiều hơn mấy lít?", answer:5},
      {type:"fill", q:"7 l + 8 l = ? l", answer:15},
    ],
    gen:[lAdd,lSub,lDiff,lExpr,unitL]
  };
  G.knt_thuchanh_kg_lit={
    title:"Thực hành và trải nghiệm với ki-lô-gam, lít",
    learn:{ intro:"Con thực hành cân, đong và giải các bài toán có ki-lô-gam, lít. Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"Cách cân một vật", steps:[
          {say:`<b>Bước 1:</b> Đặt cân trên mặt phẳng, kim chỉ số <b>0</b>.`},
          {say:`<b>Bước 2:</b> Đặt vật cần cân lên đĩa cân. Chờ kim đứng yên.`, vis:`<div class="st-pics">${ci('scale')}</div>`},
          {say:`<b>Bước 3:</b> Nhìn xem kim chỉ vào vạch số mấy, rồi đọc số đó kèm đơn vị. Ví dụ kim chỉ số 2 thì vật nặng <b>2 kg</b>.`},
        ]},
        {type:"stepper", title:"Cách đong nước bằng chai 1 lít", steps:[
          {say:`<b>Bước 1:</b> Chuẩn bị chai 1 lít và một cái xô.`, vis:`<div class="st-pics">${ci('bottle1l')}</div>`},
          {say:`<b>Bước 2:</b> Đổ đầy chai rồi rót vào xô. Mỗi lần rót là <b>1 lít</b>.`},
          {say:`<b>Bước 3:</b> Đếm số lần rót. Rót 4 lần thì xô có <b>4 l</b> nước.`, vis:eq(`1 l + 1 l + 1 l + 1 l = 4 l`)},
        ]},
        {type:"example", html:"<b>Bài toán ví dụ:</b> Mẹ mua 5 kg gạo và 3 kg đường. Mẹ mua tất cả 5 + 3 = 8 kg. &nbsp; Bình có 10 l nước, rót ra 4 l, còn 10 − 4 = 6 l."}
      ]},
    practice:[
      {type:"fill", q:"Mẹ mua 5 kg gạo và 3 kg đường. Mẹ mua tất cả bao nhiêu ki-lô-gam?", answer:8},
      {type:"fill", q:"Bình có 10 l nước, rót ra 4 l. Còn lại bao nhiêu lít?", answer:6},
      {type:"mc", q:"Khi cân vật, ta đọc số mà kim cân chỉ vào, kèm theo đơn vị:", options:["kg","l","cm"], answer:0},
    ],
    test:[
      {type:"fill", q:"Rót 6 chai 1 lít vào xô. Xô có bao nhiêu lít nước?", answer:6},
      {type:"fill", q:"Túi cam nặng 4 kg, túi táo nặng 6 kg. Cả hai túi nặng bao nhiêu ki-lô-gam?", answer:10},
      {type:"fill", q:"Can có 15 l dầu, đã dùng 8 l. Còn lại bao nhiêu lít dầu?", answer:7},
    ],
    gen:[kgAdd,kgSub,lAdd,lSub,kgDiff,lDiff,
      ()=>{ const n=R(2,9); return fillQ(`Rót ${n} chai 1 lít vào xô. Xô có bao nhiêu lít nước?`, n); }]
  };
  G.knt_ltc_kg_lit={
    title:"Luyện tập chung (Ki-lô-gam, lít)",
    learn:FLIP("Lật từng trang để ôn lại ki-lô-gam và lít.",[
      pageOf("Bài 15. Ki-lô-gam",[
        {type:"stepper", title:"Ôn: ki-lô-gam", steps:[
          {say:`<b>kg</b> là đơn vị đo <b>khối lượng</b> (độ nặng).`, vis:`<div class="st-pics">${ci('bag1kg')}</div>`},
          {say:`Bao gạo 5 kg, bao ngô 3 kg: cả hai nặng 5 + 3 = <b>8 kg</b>.`, vis:eq(`5 kg + 3 kg = 8 kg`)}]}]),
      pageOf("Bài 16. Lít",[
        {type:"stepper", title:"Ôn: lít", steps:[
          {say:`<b>l</b> là đơn vị đo <b>dung tích</b> (lượng nước chứa được).`, vis:`<div class="st-pics">${ci('bottle1l')}</div>`},
          {say:`Thùng có 12 l nước, dùng 5 l: còn 12 − 5 = <b>7 l</b>.`, vis:eq(`12 l − 5 l = 7 l`)}]}]),
      pageOf("Bài 17. Thực hành",[
        {type:"example", html:"<b>Cân:</b> đọc số kim chỉ, viết thêm <b>kg</b>. <b>Đong:</b> mỗi chai 1 lít rót vào xô, đếm số lần rót."}]),
    ]),
    practice:[
      {type:"fill", q:"Bao thứ nhất nặng 9 kg, bao thứ hai nặng 6 kg. Cả hai nặng bao nhiêu ki-lô-gam?", answer:15},
      {type:"fill", q:"Thùng có 13 l nước, đã dùng 5 l. Còn lại bao nhiêu lít?", answer:8},
      {type:"mc", q:"Muốn biết lượng nước một cái can chứa được, ta dùng đơn vị:", options:["lít (l)","ki-lô-gam (kg)","xăng-ti-mét (cm)"], answer:0},
    ],
    test:[
      {type:"fill", q:"8 kg + 7 kg = ? kg", answer:15},
      {type:"fill", q:"Can có 16 l dầu, đã dùng 9 l. Còn lại bao nhiêu lít dầu?", answer:7},
      {type:"mc", q:"Muốn biết một vật nặng bao nhiêu, ta dùng đơn vị:", options:["ki-lô-gam (kg)","lít (l)","xăng-ti-mét (cm)"], answer:0},
    ],
    gen:[kgAdd,kgSub,kgDiff,kgExpr,unitKg,lAdd,lSub,lDiff,lExpr,unitL]
  };

  /* ---------------------------------------------------------------------------------------
     CHỦ ĐỀ 4 — CỘNG, TRỪ (CÓ NHỚ) TRONG PHẠM VI 100
     --------------------------------------------------------------------------------------- */
  VCALC_PROBLEMS.knt_cong_nho_21=[{a:38,b:5,note:"có nhớ",op:"+"},{a:47,b:6,note:"có nhớ",op:"+"}];
  VCALC_PROBLEMS.knt_cong_nho_22=[{a:46,b:28,note:"có nhớ",op:"+"},{a:57,b:35,note:"có nhớ",op:"+"}];
  VCALC_PROBLEMS.knt_tru_nho_21=[{a:42,b:7,note:"có mượn",op:"-"},{a:51,b:8,note:"có mượn",op:"-"}];
  VCALC_PROBLEMS.knt_tru_nho_22=[{a:52,b:18,note:"có mượn",op:"-"},{a:73,b:46,note:"có mượn",op:"-"}];

  // số đơn vị của a cộng b ≥ 10 và tổng ≤ 100
  const addCarry1=()=>{ for(let g=0;g<300;g++){ const b=R(2,9), a=R(11,95); if(a%10+b>=10 && a+b<=100) return [a,b]; } return [38,5]; };
  const addCarry2=()=>{ for(let g=0;g<300;g++){ const a=R(11,89), b=R(11,89); if(a%10+b%10>=10 && a+b<=100) return [a,b]; } return [46,28]; };
  const subBorrow1=()=>{ for(let g=0;g<300;g++){ const b=R(2,9), a=R(11,99); if(a%10<b) return [a,b]; } return [42,7]; };
  const subBorrow2=()=>{ for(let g=0;g<300;g++){ const a=R(21,99), b=R(11,a-1); if(a%10<b%10) return [a,b]; } return [52,18]; };
  const addMental=(a,b)=>{ const need=10-(a%10), rest=b-need, near10=a+need;
    return [
      {say:`Ta tính nhẩm <b>${a} + ${b}</b> bằng cách <b>làm tròn chục</b> trước.`},
      {say:`Số ${a} còn thiếu <b>${need}</b> để tròn chục (${a} + ${need} = ${near10}). Ta tách <b>${b} = ${need} + ${rest}</b>.`, vis:eq(`${b} = ${N(need,'b')} + ${N(rest,'c')}`)},
      {say:`Cộng ${need} trước: <b>${a} + ${need} = ${near10}</b>. Rồi cộng ${rest}: <b>${near10} + ${rest} = ${a+b}</b>.`, vis:eq(`${a} + ${b} = ${a} + ${need} + ${rest} = ${near10} + ${rest} = ${a+b}`)},
    ]; };
  const subMental=(a,b)=>{ const u=a%10, tens=a-u, rest=b-u;
    return [
      {say:`Ta tính nhẩm <b>${a} − ${b}</b> bằng cách <b>trừ về tròn chục</b> trước.`},
      {say:`Số ${a} gồm ${tens} và ${u}. Ta tách <b>${b} = ${u} + ${rest}</b>: trừ ${u} để về tròn chục, rồi trừ tiếp ${rest}.`, vis:eq(`${b} = ${N(u,'b')} + ${N(rest,'c')}`)},
      {say:`<b>${a} − ${u} = ${tens}</b>, rồi <b>${tens} − ${rest} = ${a-b}</b>.`, vis:eq(`${a} − ${b} = ${a} − ${u} − ${rest} = ${tens} − ${rest} = ${a-b}`)},
    ]; };
  const tinh=(op)=>(a,b)=>({type:"fill", q:"Tính:", expr:`${a} ${op==='+'?'+':'−'} ${b}`, answer:op==='+'?a+b:a-b});
  const addGens=(pairFn,hint)=>[
    ()=>{ const [a,b]=pairFn(); return {type:"fill", q:"Tính:", expr:`${a} + ${b}`, answer:a+b, hint}; },
    ()=>{ const [a,b]=pairFn(); return mcNum(`${a} + ${b} = ?`, a+b, near(a+b)); },
    ()=>{ const [a,b]=pairFn(); return fillQ(`Lớp 2A có ${a} bạn, lớp 2B có ${b} bạn. Hai lớp có tất cả bao nhiêu bạn?`, a+b, {hint:`${a} + ${b}`}); },
    ()=>{ const [a,b]=pairFn(); return fillQ(`Tính tổng, biết các số hạng là ${a} và ${b}`, a+b, {hint:`${a} + ${b}`}); },
  ];
  const subGens2=(pairFn,hint)=>[
    ()=>{ const [a,b]=pairFn(); return {type:"fill", q:"Tính:", expr:`${a} − ${b}`, answer:a-b, hint}; },
    ()=>{ const [a,b]=pairFn(); return mcNum(`${a} − ${b} = ?`, a-b, near(a-b)); },
    ()=>{ const [a,b]=pairFn(); return fillQ(`Một cửa hàng có ${a} quyển vở, đã bán ${b} quyển. Cửa hàng còn lại bao nhiêu quyển?`, a-b, {hint:`${a} − ${b}`}); },
    ()=>{ const [a,b]=pairFn(); return fillQ(`Tính hiệu, biết số bị trừ là ${a} và số trừ là ${b}`, a-b, {hint:`${a} − ${b}`}); },
  ];

  G.knt_cong_nho_21={
    title:"Phép cộng (có nhớ) số có hai chữ số với số có một chữ số",
    learn:{ intro:"Khi cộng hai số mà hàng đơn vị cộng được 10 trở lên, ta viết chữ số hàng đơn vị của kết quả và nhớ 1 sang hàng chục. Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"Đặt tính 38 + 5", steps:tinhCot(38,5,'+')},
        {type:"stepper", title:"Cách nhẩm", steps:addMental(38,5)},
        {type:"concept", text:"Con tự xem hoạt hình đặt tính và bấm từng bước:", big:""},
        {type:"vcalc"},
        ghiNho("Hàng đơn vị cộng được từ 10 trở lên thì <b>viết số lẻ, nhớ 1</b> sang hàng chục và cộng thêm 1 vào hàng chục.")
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"38 + 5", answer:43, hint:"8 + 5 = 13, viết 3 nhớ 1"},
      {type:"fill", q:"Tính:", expr:"47 + 6", answer:53},
      {type:"mc", q:"Tổng của 29 và 4 là:", options:["33","23","32","34"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"56 + 7", answer:63},
      {type:"fill", q:"Tính:", expr:"69 + 8", answer:77},
      {type:"fill", q:"Tổ em có 25 bạn, hôm nay thêm 6 bạn. Tổ em có bao nhiêu bạn?", answer:31},
    ],
    gen:addGens(addCarry1,"Hàng đơn vị cộng được từ 10: viết số lẻ, nhớ 1")
  };
  G.knt_cong_nho_22={
    title:"Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số",
    learn:{ intro:"Cộng hai số có hai chữ số, hàng đơn vị cộng được 10 trở lên thì nhớ 1 sang hàng chục. Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"Đặt tính 46 + 28", steps:tinhCot(46,28,'+')},
        {type:"stepper", title:"Thêm ví dụ: 57 + 35", steps:tinhCot(57,35,'+')},
        {type:"concept", text:"Con tự xem hoạt hình đặt tính và bấm từng bước:", big:""},
        {type:"vcalc"},
        ghiNho("Đừng quên cộng số <b>nhớ</b> khi tính hàng chục. Kết quả trong phạm vi 100.")
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"46 + 28", answer:74, hint:"6 + 8 = 14, viết 4 nhớ 1"},
      {type:"fill", q:"Tính:", expr:"57 + 35", answer:92},
      {type:"mc", q:"Tổng của 38 và 25 là:", options:["63","53","62","73"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"29 + 36", answer:65},
      {type:"fill", q:"Tính:", expr:"48 + 27", answer:75},
      {type:"fill", q:"Lớp 2A có 38 bạn, lớp 2B có 45 bạn. Hai lớp có tất cả bao nhiêu bạn?", answer:83},
    ],
    gen:addGens(addCarry2,"Cộng đơn vị trước, nhớ 1 sang hàng chục")
  };
  G.knt_ltc_cong_nho={
    title:"Luyện tập chung (Cộng có nhớ trong phạm vi 100)",
    learn:FLIP("Lật từng trang để ôn lại phép cộng có nhớ trong phạm vi 100.",[
      pageOf("Bài 19. Số có hai chữ số + số có một chữ số",[{type:"stepper", title:"47 + 6", steps:tinhCot(47,6,'+')}]),
      pageOf("Bài 20. Số có hai chữ số + số có hai chữ số",[{type:"stepper", title:"39 + 24", steps:tinhCot(39,24,'+')}]),
    ]),
    practice:[
      {type:"fill", q:"Tính:", expr:"47 + 6", answer:53},
      {type:"fill", q:"Tính:", expr:"39 + 24", answer:63},
      {type:"mc", q:"68 + 7 = ?", options:["75","65","76","74"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"58 + 9", answer:67},
      {type:"fill", q:"Tính:", expr:"37 + 45", answer:82},
      {type:"fill", q:"Có 27 quả cam và 36 quả quýt. Có tất cả bao nhiêu quả?", answer:63},
    ],
    gen:[].concat(addGens(addCarry1,"Hàng đơn vị cộng được từ 10: viết số lẻ, nhớ 1"), addGens(addCarry2,"Cộng đơn vị trước, nhớ 1"))
  };
  G.knt_tru_nho_21={
    title:"Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số",
    learn:{ intro:"Khi chữ số hàng đơn vị của số bị trừ nhỏ hơn số trừ, ta mượn 1 chục (bằng 10 đơn vị) rồi trừ. Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"Đặt tính 42 − 7", steps:tinhCot(42,7,'-')},
        {type:"stepper", title:"Cách nhẩm", steps:subMental(42,7)},
        {type:"concept", text:"Con tự xem hoạt hình đặt tính và bấm từng bước:", big:""},
        {type:"vcalc"},
        ghiNho("2 nhỏ hơn 7 không trừ được thì <b>mượn 1 chục</b> → 12 − 7 = 5; hàng chục còn <b>4 − 1 = 3</b>.")
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"42 − 7", answer:35, hint:"12 − 7 = 5, hàng chục 4 − 1 = 3"},
      {type:"fill", q:"Tính:", expr:"51 − 8", answer:43},
      {type:"mc", q:"Hiệu của 63 và 5 là:", options:["58","57","68","48"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"34 − 6", answer:28},
      {type:"fill", q:"Tính:", expr:"80 − 9", answer:71},
      {type:"fill", q:"Một sợi dây dài 45 cm, cắt đi 8 cm. Còn lại bao nhiêu xăng-ti-mét?", answer:37},
    ],
    gen:subGens2(subBorrow1,"Mượn 1 chục thành 10 đơn vị rồi trừ")
  };
  G.knt_tru_nho_22={
    title:"Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số",
    learn:{ intro:"Trừ hai số có hai chữ số, khi hàng đơn vị không đủ trừ thì mượn 1 chục. Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"Đặt tính 52 − 18", steps:tinhCot(52,18,'-')},
        {type:"stepper", title:"Thêm ví dụ: 73 − 46", steps:tinhCot(73,46,'-')},
        {type:"concept", text:"Con tự xem hoạt hình đặt tính và bấm từng bước:", big:""},
        {type:"vcalc"},
        ghiNho("Hàng chục đã cho mượn 1 thì phải <b>bớt đi 1</b> khi trừ hàng chục.")
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"52 − 18", answer:34, hint:"12 − 8 = 4; 5 − 1 − 1 = 3"},
      {type:"fill", q:"Tính:", expr:"73 − 46", answer:27},
      {type:"mc", q:"Hiệu của 81 và 35 là:", options:["46","56","54","44"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"64 − 29", answer:35},
      {type:"fill", q:"Tính:", expr:"90 − 47", answer:43},
      {type:"fill", q:"Lớp có 41 bạn, 17 bạn là nữ. Lớp có bao nhiêu bạn nam?", answer:24},
    ],
    gen:subGens2(subBorrow2,"Đơn vị không đủ trừ thì mượn 1 chục")
  };
  G.knt_ltc_tru_nho={
    title:"Luyện tập chung (Trừ có nhớ trong phạm vi 100)",
    learn:FLIP("Lật từng trang để ôn lại phép trừ có nhớ trong phạm vi 100.",[
      pageOf("Bài 22. Số có hai chữ số trừ số có một chữ số",[{type:"stepper", title:"61 − 8", steps:tinhCot(61,8,'-')}]),
      pageOf("Bài 23. Số có hai chữ số trừ số có hai chữ số",[{type:"stepper", title:"84 − 37", steps:tinhCot(84,37,'-')}]),
    ]),
    practice:[
      {type:"fill", q:"Tính:", expr:"61 − 8", answer:53},
      {type:"fill", q:"Tính:", expr:"84 − 37", answer:47},
      {type:"mc", q:"72 − 5 = ?", options:["67","77","66","68"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"93 − 7", answer:86},
      {type:"fill", q:"Tính:", expr:"75 − 48", answer:27},
      {type:"fill", q:"Có 52 quả táo, đã bán 29 quả. Còn lại bao nhiêu quả?", answer:23},
    ],
    gen:[].concat(subGens2(subBorrow1,"Mượn 1 chục thành 10 đơn vị"), subGens2(subBorrow2,"Đơn vị không đủ trừ thì mượn 1 chục"))
  };

  /* ---------------------------------------------------------------------------------------
     CHỦ ĐỀ 5 — LÀM QUEN VỚI HÌNH PHẲNG
     --------------------------------------------------------------------------------------- */
  const FIG3=["Đoạn thẳng","Đường thẳng","Đường cong"];
  const figQ=()=>{ const k=R(0,2); const v=[GEO.segment('A','B'),GEO.line(),GEO.curve()][k];
    return mc3(P(["Hình vẽ dưới đây là gì?","Đây là hình gì?","Con hãy gọi tên hình dưới đây:","Hình nào được vẽ dưới đây?"]), FIG3.slice(), k, {visual:v}); };
  const colQ=()=>{ const yes=Math.random()<0.5, o=["Thẳng hàng","Không thẳng hàng"], L=P([['A','B','C'],['M','N','P'],['D','E','G'],['X','Y','Z']]);
    return mc3(`Ba điểm ${L[0]}, ${L[1]}, ${L[2]} trong hình có thẳng hàng không?`, o, yes?0:1, {visual:GEO.three(yes,L), hint:"Ba điểm cùng nằm trên một đường thẳng thì thẳng hàng"}); };
  const lenQ=()=>{ const n=R(2,3), lens=Array.from({length:n},()=>R(2,9)), labs=['A','B','C','D'].slice(0,n+1);
    return fillQ(`Đường gấp khúc ${labs.join('')} có độ dài các đoạn thẳng như hình. Đường gấp khúc dài bao nhiêu xăng-ti-mét?`, lens.reduce((a,b)=>a+b,0),
      {visual:GEO.poly(labs,lens), hint:lens.join(' + ')}); };
  const segCountQ=()=>{ const n=R(2,3), labs=['A','B','C','D'].slice(0,n+1);
    return fillQ(`Đường gấp khúc ${labs.join('')} gồm mấy đoạn thẳng?`, n, {visual:GEO.poly(labs), hint:"Đếm các đoạn nối liên tiếp"}); };
  const sideQ=()=>{ const n=P([3,4,5]); return fillQ("Hình dưới đây có mấy cạnh?", n, {visual:GEO.shape(n), hint:"Đếm các đoạn thẳng bao quanh hình"}); };
  const pointQ=()=>{ const n=R(2,5), labs=['A','B','C','D','E'].slice(0,n); return fillQ(P(["Hình vẽ dưới đây có mấy điểm?","Em hãy đếm: hình có bao nhiêu điểm?","Có tất cả mấy điểm trong hình dưới đây?"]), n, {visual:GEO.points(labs)}); };
  const rulerSegQ=()=>{ const a=R(0,4), len=R(3,9); return fillQ(`Vẽ đoạn thẳng từ vạch ${a} đến vạch ${a+len} của thước. Đoạn thẳng dài mấy xăng-ti-mét?`, len, {hint:`${a+len} − ${a}`}); };
  const rulerZeroQ=()=>{ const len=R(4,12); return fillQ(`Vẽ đoạn thẳng AB dài ${len} cm. Đặt vạch 0 của thước trùng điểm A thì điểm B nằm ở vạch số mấy?`, len); };
  const quadQ=()=>{ const o=shuffleArr(["4","3","5"]); return mc3("Hình tứ giác có mấy cạnh?", o, o.indexOf("4")); };
  const cutQ=()=>{ const o=shuffleArr(["2","3","4"]); return mc3("Cắt một hình chữ nhật theo đường chéo thì được mấy hình tam giác?", o, o.indexOf("2")); };

  G.knt_hinh_co_ban={
    title:"Điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng",
    learn:{ intro:"Con làm quen với các hình đơn giản nhất: điểm, đoạn thẳng, đường thẳng, đường cong. Con xem từng bước và nhìn hình thật kĩ nhé!",
      blocks:[
        {type:"stepper", title:"Các hình cơ bản", steps:[
          {say:`<b>Điểm:</b> chấm nhỏ trên giấy. Ta đặt tên điểm bằng <b>chữ cái in hoa</b>: điểm A, điểm B.`, vis:GEO.points(['A','B'])},
          {say:`<b>Đoạn thẳng:</b> nối <b>hai điểm</b> bằng một nét thẳng. Đoạn thẳng có <b>hai đầu</b> (điểm đầu và điểm cuối). Đây là đoạn thẳng AB.`, vis:GEO.segment('A','B')},
          {say:`<b>Đường thẳng:</b> thẳng và <b>kéo dài mãi về hai phía</b>, không có điểm đầu, điểm cuối. Ta vẽ hai đầu có mũi tên.`, vis:GEO.line()},
          {say:`<b>Đường cong:</b> đường <b>không thẳng</b>, uốn cong.`, vis:GEO.curve()},
          {say:`<b>Ba điểm thẳng hàng:</b> ba điểm cùng nằm trên <b>một đường thẳng</b>. Ba điểm A, B, C bên dưới thẳng hàng.`, vis:GEO.three(true)},
          {say:`Còn ba điểm này <b>không thẳng hàng</b> vì điểm B nằm lệch ra ngoài đường thẳng nối A và C.`, vis:GEO.three(false)},
          {say:`<b>Cách kiểm tra:</b> đặt thước nối hai điểm đầu và cuối. Nếu điểm thứ ba nằm sát thước thì thẳng hàng.`},
        ]},
        ghiNho("Đoạn thẳng có 2 đầu. Đường thẳng không có đầu cuối. Đường cong thì không thẳng. Ba điểm cùng nằm trên một đường thẳng là ba điểm thẳng hàng.")
      ]},
    practice:[
      {type:"mc", q:"Hình vẽ dưới đây là gì?", options:FIG3, answer:0, visual:GEO.segment('A','B')},
      {type:"mc", q:"Hình vẽ dưới đây là gì?", options:FIG3, answer:2, visual:GEO.curve()},
      {type:"mc", q:"Ba điểm A, B, C trong hình có thẳng hàng không?", options:["Thẳng hàng","Không thẳng hàng"], answer:0, two:true, visual:GEO.three(true)},
    ],
    test:[
      {type:"mc", q:"Hình vẽ dưới đây là gì?", options:FIG3, answer:1, visual:GEO.line()},
      {type:"mc", q:"Ba điểm A, B, C trong hình có thẳng hàng không?", options:["Thẳng hàng","Không thẳng hàng"], answer:1, two:true, visual:GEO.three(false)},
      {type:"fill", q:"Hình vẽ dưới đây có mấy điểm?", answer:3, visual:GEO.points(['A','B','C'])},
    ],
    gen:[figQ,colQ,pointQ]
  };
  G.knt_gapkhuc_tugiac={
    title:"Đường gấp khúc. Hình tứ giác",
    learn:{ intro:"Đường gấp khúc gồm các đoạn thẳng nối liền nhau. Hình tứ giác có bốn cạnh. Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"Đường gấp khúc và hình tứ giác", steps:[
          {say:`<b>Đường gấp khúc</b> gồm các <b>đoạn thẳng nối liền nhau</b>, đầu đoạn này là cuối đoạn kia. Hình bên là đường gấp khúc ABC gồm 2 đoạn thẳng AB và BC.`, vis:GEO.poly(['A','B','C'])},
          {say:`<b>Tính độ dài đường gấp khúc:</b> cộng độ dài các đoạn thẳng. Ví dụ AB = 5 cm, BC = 4 cm.`, vis:GEO.poly(['A','B','C'],[5,4])},
          {say:`Độ dài đường gấp khúc ABC là <b>5 + 4 = 9 (cm)</b>.`, vis:eq(`5 + 4 = 9 (cm)`)},
          {say:`Đường gấp khúc ABCD có 3 đoạn thẳng. Nếu AB = 3 cm, BC = 4 cm, CD = 2 cm thì dài 3 + 4 + 2 = <b>9 cm</b>.`, vis:GEO.poly(['A','B','C','D'],[3,4,2])+eq(`3 + 4 + 2 = 9 (cm)`)},
          {say:`<b>Hình tứ giác</b> là hình có <b>4 cạnh</b> và <b>4 đỉnh</b>. Ví dụ hình bên (đếm: 4 cạnh).`, vis:GEO.shape(4)},
          {say:`Để so sánh: hình có <b>3 cạnh</b> là hình tam giác, hình có <b>5 cạnh</b> là hình ngũ giác. Con luôn đếm số cạnh để biết đó là hình gì.`, vis:GEO.shape(3)+GEO.shape(5)},
        ]},
        ghiNho("Đường gấp khúc dài = tổng độ dài các đoạn thẳng. Hình tứ giác có 4 cạnh, 4 đỉnh.")
      ]},
    practice:[
      {type:"fill", q:"Đường gấp khúc ABC có AB = 5 cm, BC = 4 cm. Đường gấp khúc dài bao nhiêu xăng-ti-mét?", answer:9, hint:"5 + 4", visual:GEO.poly(['A','B','C'],[5,4])},
      {type:"fill", q:"Đường gấp khúc ABCD gồm mấy đoạn thẳng?", answer:3, visual:GEO.poly(['A','B','C','D'])},
      {type:"fill", q:"Hình tứ giác có mấy cạnh?", answer:4},
    ],
    test:[
      {type:"fill", q:"Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 2 cm. Dài bao nhiêu xăng-ti-mét?", answer:9, visual:GEO.poly(['A','B','C','D'],[3,4,2])},
      {type:"fill", q:"Hình dưới đây có mấy cạnh?", answer:4, visual:GEO.shape(4)},
      {type:"fill", q:"Hình dưới đây có mấy cạnh?", answer:3, visual:GEO.shape(3)},
    ],
    gen:[lenQ,segCountQ,sideQ,quadQ]
  };
  G.knt_thuchanh_hinh={
    title:"Thực hành gấp, cắt, ghép, xếp hình. Vẽ đoạn thẳng",
    learn:{ intro:"Con thực hành vẽ đoạn thẳng bằng thước kẻ, gấp và cắt giấy để tạo hình mới. Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"Vẽ đoạn thẳng bằng thước kẻ", steps:[
          {say:`<b>Bước 1:</b> Chấm hai điểm A và B trên giấy.`, vis:GEO.points(['A','B'])},
          {say:`<b>Bước 2:</b> Đặt thước sao cho mép thước đi qua cả hai điểm A và B. Giữ chặt thước.`},
          {say:`<b>Bước 3:</b> Dùng bút kẻ <b>một nét thẳng</b> từ A đến B, sát mép thước.`, vis:GEO.segment('A','B')},
          {say:`<b>Vẽ đoạn thẳng dài 5 cm:</b> chấm điểm A trùng vạch 0 của thước, chấm điểm B ở vạch số <b>5</b>, rồi nối A với B.`, vis:strip(0,8,{0:'edge',1:'in',2:'in',3:'in',4:'in',5:'edge'})},
        ]},
        {type:"stepper", title:"Gấp, cắt, ghép hình", steps:[
          {say:`<b>Gấp đôi</b> một tờ giấy hình chữ nhật rồi cắt theo nét gấp, ta được <b>2 hình chữ nhật bằng nhau</b>.`},
          {say:`Cắt một hình chữ nhật theo <b>đường chéo</b> (nối hai đỉnh đối diện), ta được <b>2 hình tam giác</b>.`},
          {say:`Ghép hai hình tam giác đó lại theo cạnh dài nhất, ta lại được hình chữ nhật. Cắt rồi ghép như vậy giúp con thấy một hình có thể tạo từ nhiều hình nhỏ.`},
        ]},
      ]},
    practice:[
      {type:"fill", q:"Vẽ đoạn thẳng AB dài 5 cm. Đặt vạch 0 của thước trùng điểm A thì điểm B nằm ở vạch số mấy?", answer:5},
      {type:"mc", q:"Cắt một hình chữ nhật theo đường chéo thì được mấy hình tam giác?", options:["2","3","4"], answer:0},
      {type:"fill", q:"Vẽ đoạn thẳng từ vạch 2 đến vạch 8 của thước. Đoạn thẳng dài mấy xăng-ti-mét?", answer:6, hint:"8 − 2"},
    ],
    test:[
      {type:"fill", q:"Vẽ đoạn thẳng CD dài 7 cm. Đặt vạch 0 trùng điểm C thì điểm D nằm ở vạch số mấy?", answer:7},
      {type:"fill", q:"Vẽ đoạn thẳng từ vạch 1 đến vạch 9 của thước. Đoạn thẳng dài mấy xăng-ti-mét?", answer:8},
      {type:"mc", q:"Muốn vẽ đoạn thẳng, ta dùng dụng cụ nào?", options:["Thước kẻ","Cái kéo","Cái cân"], answer:0},
    ],
    gen:[rulerSegQ,rulerZeroQ,cutQ,lenQ]
  };
  G.knt_ltc_hinh_phang={
    title:"Luyện tập chung (Hình phẳng)",
    learn:FLIP("Lật từng trang để ôn lại các hình phẳng đã học.",[
      pageOf("Bài 25. Điểm, đoạn thẳng, đường thẳng, đường cong",[
        {type:"stepper", title:"Phân biệt các hình", steps:[
          {say:`<b>Đoạn thẳng</b> có hai đầu.`, vis:GEO.segment('A','B')},
          {say:`<b>Đường thẳng</b> kéo dài mãi, không có đầu cuối.`, vis:GEO.line()},
          {say:`<b>Đường cong</b> không thẳng.`, vis:GEO.curve()}]}]),
      pageOf("Bài 26. Đường gấp khúc, hình tứ giác",[
        {type:"stepper", title:"Ôn đường gấp khúc", steps:[
          {say:`Đường gấp khúc ABC: AB = 6 cm, BC = 3 cm. Độ dài = 6 + 3 = <b>9 cm</b>.`, vis:GEO.poly(['A','B','C'],[6,3])},
          {say:`Hình tứ giác có <b>4 cạnh</b>.`, vis:GEO.shape(4)}]}]),
      pageOf("Bài 27. Thực hành vẽ đoạn thẳng",[
        {type:"example", html:"<b>Vẽ đoạn thẳng dài 6 cm:</b> điểm A ở vạch 0, điểm B ở vạch 6, nối A với B bằng nét thẳng."}]),
    ]),
    practice:[
      {type:"mc", q:"Hình vẽ dưới đây là gì?", options:FIG3, answer:1, visual:GEO.line()},
      {type:"fill", q:"Đường gấp khúc ABC có AB = 6 cm, BC = 3 cm. Dài bao nhiêu xăng-ti-mét?", answer:9},
      {type:"fill", q:"Hình tứ giác có mấy cạnh?", answer:4},
    ],
    test:[
      {type:"mc", q:"Hình vẽ dưới đây là gì?", options:FIG3, answer:0, visual:GEO.segment('A','B')},
      {type:"fill", q:"Đường gấp khúc ABC có AB = 8 cm, BC = 5 cm. Dài bao nhiêu xăng-ti-mét?", answer:13},
      {type:"fill", q:"Hình dưới đây có mấy cạnh?", answer:5, visual:GEO.shape(5)},
    ],
    gen:[figQ,colQ,lenQ,segCountQ,sideQ,rulerSegQ]
  };

  /* ---------------------------------------------------------------------------------------
     CHỦ ĐỀ 6 — NGÀY – GIỜ, GIỜ – PHÚT, NGÀY – THÁNG
     --------------------------------------------------------------------------------------- */
  const WD=['Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy','Chủ nhật'];
  const tmTxt=(h,m)=>m===0?`${h} giờ`:`${h} giờ ${m} phút`;
  const clockRead=()=>{ const h=R(1,12), m=P([0,15,30]); const right=tmTxt(h,m);
    const pool=[tmTxt(h,m===0?15:0), tmTxt(h,m===30?15:30), tmTxt(h%12+1,m), tmTxt((h+10)%12+1,m), tmTxt(h%12+1,m===0?30:0)].filter((x,i,a)=>x!==right&&a.indexOf(x)===i);
    const o=shuffleArr([right].concat(shuffleArr(pool).slice(0,3)));
    return mc3("Đồng hồ chỉ mấy giờ?", o, o.indexOf(right), {visual:clockSvg(h,m,150), hint:"Kim ngắn chỉ giờ, kim dài chỉ phút"}); };
  const clockHourOnly=()=>{ const h=R(1,12); return fillQ("Đồng hồ chỉ mấy giờ đúng? (Trả lời bằng số giờ)", h, {visual:clockSvg(h,0,150), hint:"Kim dài chỉ số 12, kim ngắn chỉ số giờ"}); };
  const hourDiff=()=>{ const a=R(1,8), b=R(a+1,12); return fillQ(`Bạn Nam bắt đầu học bài lúc ${a} giờ và học xong lúc ${b} giờ. Nam học bài trong mấy giờ?`, b-a, {hint:`${b} − ${a}`}); };
  const hourAfter=()=>{ const a=R(1,8), k=R(1,12-a); return fillQ(`Bây giờ là ${a} giờ. Sau ${k} giờ nữa là mấy giờ?`, a+k, {hint:`${a} + ${k}`}); };
  const minuteFacts=()=>{ const q=P([["1 giờ bằng bao nhiêu phút?",60],["Kim phút đi hết một vòng đồng hồ là bao nhiêu phút?",60],["Một ngày có bao nhiêu giờ?",24]]); return fillQ(q[0],q[1]); };
  const hour24=()=>{ const h=R(1,9); return fillQ(`${h+12} giờ còn gọi là mấy giờ chiều (hoặc tối)?`, h, {hint:`${h+12} − 12`}); };
  const weekdayNext=()=>{ const i=R(0,6), nxt=P([true,false]); const j=(i+(nxt?1:6))%7;
    const o=shuffleArr([WD[j]].concat(shuffleArr(WD.filter(x=>x!==WD[j])).slice(0,3)));
    return mc3(nxt?`Sau ${WD[i]} là ngày nào?`:`Trước ${WD[i]} là ngày nào?`, o, o.indexOf(WD[j])); };
  const weekdayCalc=()=>{ const d1=R(1,14), k=R(1,13), d2=d1+k, w=R(0,6), r=(w+k)%7;
    const o=shuffleArr([WD[r]].concat(shuffleArr(WD.filter(x=>x!==WD[r])).slice(0,3)));
    return mc3(`Ngày ${d1} tháng này là ${WD[w]}. Vậy ngày ${d2} là thứ mấy?`, o, o.indexOf(WD[r]), {hint:`Từ ngày ${d1} đến ngày ${d2} là ${k} ngày; cứ 7 ngày thì lặp lại thứ cũ`}); };
  const daysOfMonth=()=>{ const m=P([1,3,4,5,6,7,8,9,10,11,12]); const d=[1,3,5,7,8,10,12].includes(m)?31:30;
    const o=["30 ngày","31 ngày"]; return two(`Tháng ${m} có bao nhiêu ngày?`, o, o.indexOf(d+' ngày'), {hint:"Các tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày; các tháng 4, 6, 9, 11 có 30 ngày"}); };
  const monthFacts=()=>{ const q=P([["Một tuần có bao nhiêu ngày?",7],["Một năm có bao nhiêu tháng?",12]]); return fillQ(q[0],q[1]); };
  const monthNext=()=>{ const m=R(1,11); return fillQ(`Sau tháng ${m} là tháng mấy? (Trả lời bằng số)`, m+1); };
  const clockGens=[clockRead,clockHourOnly,hourDiff,hourAfter,minuteFacts,hour24,clockRead,clockRead];
  const calGens=[weekdayNext,weekdayCalc,daysOfMonth,monthFacts,monthNext,weekdayCalc];

  G.knt_ngay_gio={
    title:"Ngày – giờ, giờ – phút",
    learn:{ intro:"Con học xem đồng hồ: kim ngắn chỉ giờ, kim dài chỉ phút. Con xem từng bước rồi tự xoay kim thử nhé!",
      blocks:[
        {type:"stepper", title:"Ngày, giờ, phút", steps:[
          {say:`<b>1 ngày có 24 giờ</b>: gồm buổi sáng, buổi trưa, buổi chiều, buổi tối và ban đêm.`},
          {say:`Đồng hồ có <b>2 kim</b>: <b>kim ngắn</b> chỉ <b>giờ</b>, <b>kim dài</b> chỉ <b>phút</b>.`, vis:clockSvg(4,0,130)},
          {say:`<b>Giờ đúng:</b> kim dài chỉ số <b>12</b>, kim ngắn chỉ số mấy thì đó là mấy giờ. Hình này là <b>3 giờ</b>.`, vis:clockSvg(3,0,130)},
          {say:`<b>1 giờ = 60 phút.</b> Kim dài đi hết một vòng đồng hồ là 60 phút, bằng 1 giờ.`, vis:eq(`1 giờ = 60 phút`)},
          {say:`<b>15 phút:</b> kim dài chỉ số <b>3</b>. Hình này là <b>3 giờ 15 phút</b>.`, vis:clockSvg(3,15,130)},
          {say:`<b>30 phút:</b> kim dài chỉ số <b>6</b>. Hình này là <b>3 giờ 30 phút</b> (còn nói là <b>3 giờ rưỡi</b>).`, vis:clockSvg(3,30,130)},
          {say:`<b>Giờ buổi chiều, tối:</b> sau 12 giờ trưa, đồng hồ điện tử đếm tiếp 13 giờ, 14 giờ… Vì vậy <b>13 giờ = 1 giờ chiều</b>, <b>15 giờ = 3 giờ chiều</b>. (Muốn đổi, lấy số giờ trừ đi 12.)`, vis:eq(`15 giờ = 15 − 12 = 3 giờ chiều`)},
        ]},
        {type:"clock", h:3, m:0, text:"Con tự xoay kim: bấm + giờ / − giờ và chọn số phút."},
        ghiNho("Kim ngắn chỉ giờ, kim dài chỉ phút. 1 giờ = 60 phút. 1 ngày = 24 giờ.")
      ]},
    practice:[
      {type:"fill", q:"1 giờ bằng bao nhiêu phút?", answer:60},
      {type:"mc", q:"Đồng hồ chỉ mấy giờ?", options:["3 giờ","12 giờ","6 giờ","9 giờ"], answer:0, visual:clockSvg(3,0,150), hint:"Kim dài chỉ số 12, kim ngắn chỉ số 3"},
      {type:"mc", q:"Đồng hồ chỉ mấy giờ?", options:["5 giờ 30 phút","5 giờ 15 phút","6 giờ 30 phút","5 giờ"], answer:0, visual:clockSvg(5,30,150), hint:"Kim dài chỉ số 6 là 30 phút"},
    ],
    test:[
      {type:"fill", q:"Một ngày có bao nhiêu giờ?", answer:24},
      {type:"mc", q:"Đồng hồ chỉ mấy giờ?", options:["8 giờ 15 phút","8 giờ","9 giờ 15 phút","8 giờ 30 phút"], answer:0, visual:clockSvg(8,15,150)},
      {type:"fill", q:"15 giờ còn gọi là mấy giờ chiều?", answer:3},
    ],
    gen:clockGens
  };
  G.knt_ngay_thang={
    title:"Ngày – tháng",
    learn:{ intro:"Con học xem lịch: một tuần có mấy ngày, một tháng có bao nhiêu ngày, một năm có mấy tháng. Con xem từng bước rồi bấm vào lịch nhé!",
      blocks:[
        {type:"stepper", title:"Tuần, tháng, năm", steps:[
          {say:`<b>1 tuần có 7 ngày</b>: Thứ hai, Thứ ba, Thứ tư, Thứ năm, Thứ sáu, Thứ bảy, Chủ nhật. Hết Chủ nhật lại đến Thứ hai của tuần sau.`, vis:chips(WD)},
          {say:`<b>1 năm có 12 tháng</b>: tháng 1, tháng 2, …, tháng 12.`, vis:chips(Array.from({length:12},(_,i)=>`T${i+1}`),'b')},
          {say:`Các tháng có <b>31 ngày</b> là: <b>1, 3, 5, 7, 8, 10, 12</b>.`, vis:chips(['1','3','5','7','8','10','12'],'c')},
          {say:`Các tháng có <b>30 ngày</b> là: <b>4, 6, 9, 11</b>.`, vis:chips(['4','6','9','11'],'b')},
          {say:`<b>Tháng 2</b> chỉ có <b>28 ngày</b> (năm nhuận thì có 29 ngày).`},
          {say:`<b>Tìm thứ của một ngày:</b> cứ cách <b>7 ngày</b> thì lặp lại cùng một thứ. Nếu ngày 5 là Thứ năm thì ngày 12 (cách 7 ngày) cũng là Thứ năm, ngày 13 là Thứ sáu.`, vis:eq(`ngày 5 và ngày 12 cùng là Thứ năm<br>ngày 13 là Thứ sáu`)},
        ]},
        {type:"calendar", start:2, days:31, title:"Lịch một tháng có 31 ngày (ví dụ). Bấm vào một ngày:"},
        ghiNho("Tuần 7 ngày. Năm 12 tháng. Tháng 1,3,5,7,8,10,12 có 31 ngày; tháng 4,6,9,11 có 30 ngày; tháng 2 có 28 (hoặc 29) ngày.")
      ]},
    practice:[
      {type:"fill", q:"Một tuần có bao nhiêu ngày?", answer:7},
      {type:"mc", q:"Tháng 4 có bao nhiêu ngày?", options:["30 ngày","31 ngày"], answer:0, two:true},
      {type:"mc", q:"Sau Thứ ba là ngày nào?", options:["Thứ tư","Thứ hai","Thứ năm","Thứ sáu"], answer:0},
    ],
    test:[
      {type:"fill", q:"Một năm có bao nhiêu tháng?", answer:12},
      {type:"mc", q:"Tháng 7 có bao nhiêu ngày?", options:["30 ngày","31 ngày"], answer:1, two:true},
      {type:"mc", q:"Ngày 3 tháng này là Thứ hai. Vậy ngày 10 là thứ mấy?", options:["Thứ hai","Thứ ba","Thứ tư","Chủ nhật"], answer:0, hint:"Cách 7 ngày thì cùng thứ"},
    ],
    gen:calGens
  };
  G.knt_thuchanh_dongho_lich={
    title:"Thực hành và trải nghiệm xem đồng hồ, xem lịch",
    learn:{ intro:"Con thực hành xem giờ trên đồng hồ và xem lịch để biết ngày, thứ. Con xem từng bước rồi tự thử nhé!",
      blocks:[
        {type:"stepper", title:"Xem giờ trên đồng hồ — 3 bước", steps:[
          {say:`<b>Bước 1:</b> Nhìn <b>kim ngắn</b> chỉ vào số nào: đó là số giờ. (Kim ngắn nằm gần số 4 → khoảng 4 giờ.)`, vis:clockSvg(4,30,130)},
          {say:`<b>Bước 2:</b> Nhìn <b>kim dài</b> chỉ vào số nào. Chỉ số 12 → giờ đúng. Chỉ số 3 → 15 phút. Chỉ số 6 → 30 phút (rưỡi).`},
          {say:`<b>Bước 3:</b> Đọc giờ trước, phút sau. Hình trên: kim ngắn qua 4, kim dài chỉ số 6 → <b>4 giờ 30 phút</b>.`, vis:eq(`4 giờ 30 phút`)},
        ]},
        {type:"clock", h:7, m:0, text:"Con tự chỉnh đồng hồ: 7 giờ sáng là giờ em đi học."},
        {type:"stepper", title:"Xem lịch — 3 bước", steps:[
          {say:`<b>Bước 1:</b> Tìm <b>ngày</b> cần xem trong bảng lịch.`},
          {say:`<b>Bước 2:</b> Nhìn lên đầu cột: đó là <b>thứ</b> của ngày đó (T2 = Thứ hai, …, CN = Chủ nhật).`},
          {say:`<b>Bước 3:</b> Muốn biết <b>một tuần sau</b>, cộng thêm 7 ngày. Ngày 8 hôm nay là Thứ tư thì ngày 15 cũng là Thứ tư.`, vis:eq(`8 + 7 = 15`)},
        ]},
        {type:"calendar", start:4, days:30, title:"Lịch một tháng có 30 ngày (ví dụ). Bấm vào một ngày:"},
      ]},
    practice:[
      {type:"mc", q:"Đồng hồ chỉ mấy giờ?", options:["4 giờ 30 phút","4 giờ","5 giờ 30 phút","4 giờ 15 phút"], answer:0, visual:clockSvg(4,30,150)},
      {type:"fill", q:"Em đi học lúc 7 giờ và tan học lúc 11 giờ. Em học ở trường mấy giờ?", answer:4, hint:"11 − 7"},
      {type:"mc", q:"Ngày 8 là Thứ tư. Vậy ngày 15 là thứ mấy?", options:["Thứ tư","Thứ năm","Thứ ba","Thứ hai"], answer:0},
    ],
    test:[
      {type:"mc", q:"Đồng hồ chỉ mấy giờ?", options:["10 giờ","10 giờ 30 phút","11 giờ","9 giờ"], answer:0, visual:clockSvg(10,0,150)},
      {type:"fill", q:"Bây giờ là 3 giờ. Sau 4 giờ nữa là mấy giờ?", answer:7},
      {type:"mc", q:"Ngày 2 là Thứ hai. Vậy ngày 9 là thứ mấy?", options:["Thứ hai","Thứ ba","Chủ nhật","Thứ bảy"], answer:0},
    ],
    gen:[].concat(clockGens,calGens)
  };
  G.knt_ltc_thoigian={
    title:"Luyện tập chung (Giờ, ngày, tháng)",
    learn:FLIP("Lật từng trang để ôn lại cách xem đồng hồ và xem lịch.",[
      pageOf("Bài 29. Ngày – giờ, giờ – phút",[
        {type:"stepper", title:"Ôn xem đồng hồ", steps:[
          {say:`Kim ngắn chỉ <b>giờ</b>, kim dài chỉ <b>phút</b>. Kim dài chỉ 12: giờ đúng.`, vis:clockSvg(9,0,130)},
          {say:`Kim dài chỉ 6 là <b>30 phút</b>: <b>9 giờ 30 phút</b>.`, vis:clockSvg(9,30,130)}]},
        ghiNho("1 giờ = 60 phút. 1 ngày = 24 giờ.")]),
      pageOf("Bài 30. Ngày – tháng",[
        {type:"example", html:"<b>1 tuần</b> có 7 ngày. <b>1 năm</b> có 12 tháng. Tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày; tháng 4, 6, 9, 11 có 30 ngày."},
        {type:"calendar", start:0, days:30, title:"Bấm vào một ngày trên lịch:"}]),
      pageOf("Bài 31. Thực hành xem đồng hồ, xem lịch",[
        {type:"clock", h:2, m:15, text:"Con tự chỉnh giờ:"}]),
    ]),
    practice:[
      {type:"mc", q:"Đồng hồ chỉ mấy giờ?", options:["9 giờ 30 phút","9 giờ","10 giờ 30 phút","9 giờ 15 phút"], answer:0, visual:clockSvg(9,30,150)},
      {type:"fill", q:"1 giờ bằng bao nhiêu phút?", answer:60},
      {type:"mc", q:"Tháng 6 có bao nhiêu ngày?", options:["30 ngày","31 ngày"], answer:0, two:true},
    ],
    test:[
      {type:"mc", q:"Đồng hồ chỉ mấy giờ?", options:["2 giờ 15 phút","2 giờ","3 giờ 15 phút","2 giờ 30 phút"], answer:0, visual:clockSvg(2,15,150)},
      {type:"fill", q:"Một năm có bao nhiêu tháng?", answer:12},
      {type:"mc", q:"Sau Thứ bảy là ngày nào?", options:["Chủ nhật","Thứ hai","Thứ sáu","Thứ năm"], answer:0},
    ],
    gen:[].concat(clockGens,calGens)
  };

  const gg=(...keys)=>[].concat(...keys.map(k=>((G[k]||CONTENT[k]||{}).gen)||[]));

  /* ---------------------------------------------------------------------------------------
     CHỦ ĐỀ 7 — ÔN TẬP HỌC KÌ 1
     --------------------------------------------------------------------------------------- */
  G.knt_on_hk1_congtru={
    title:"Ôn tập phép cộng, phép trừ trong phạm vi 20, 100",
    learn:FLIP("Lật từng trang để ôn lại phép cộng, phép trừ trong phạm vi 20 và 100.",[
      pageOf("Cộng, trừ qua 10 (phạm vi 20)",[
        {type:"stepper", title:"8 + 5", steps:congQua10(8,5)},
        {type:"stepper", title:"15 − 8", steps:truQua10(15,8)}]),
      pageOf("Cộng, trừ không nhớ (phạm vi 100)",[
        {type:"stepper", title:"35 + 42", steps:tinhCot(35,42,'+')},
        ghiNho("Tính từ phải sang trái: đơn vị trước, chục sau.")]),
      pageOf("Cộng, trừ có nhớ (phạm vi 100)",[
        {type:"stepper", title:"46 + 28", steps:tinhCot(46,28,'+')},
        {type:"stepper", title:"52 − 18", steps:tinhCot(52,18,'-')}]),
    ]),
    practice:[
      {type:"fill", q:"Tính:", expr:"8 + 5", answer:13},
      {type:"fill", q:"Tính:", expr:"46 + 28", answer:74},
      {type:"fill", q:"Tính:", expr:"52 − 18", answer:34},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"15 − 8", answer:7},
      {type:"fill", q:"Tính:", expr:"35 + 42", answer:77},
      {type:"fill", q:"Tính:", expr:"61 − 24", answer:37},
    ],
    gen:gg('knt_ltc_cong_qua10','knt_ltc_tru_qua10','knt_ltc_cong_nho','knt_ltc_tru_nho','knt_ontap_congtru100')
  };
  G.knt_on_hk1_hinh={
    title:"Ôn tập hình phẳng",
    learn:FLIP("Lật từng trang để ôn lại các hình phẳng đã học.",[
      pageOf("Điểm, đoạn thẳng, đường thẳng, đường cong",[
        {type:"stepper", title:"Nhớ lại", steps:[
          {say:`<b>Đoạn thẳng</b>: có hai đầu.`, vis:GEO.segment('A','B')},
          {say:`<b>Đường thẳng</b>: kéo dài mãi, không có đầu cuối.`, vis:GEO.line()},
          {say:`<b>Đường cong</b>: không thẳng.`, vis:GEO.curve()}]}]),
      pageOf("Ba điểm thẳng hàng",[
        {type:"stepper", title:"Nhớ lại", steps:[
          {say:`Ba điểm A, B, C <b>cùng nằm trên một đường thẳng</b> thì thẳng hàng.`, vis:GEO.three(true)},
          {say:`Nếu một điểm lệch ra ngoài thì <b>không thẳng hàng</b>.`, vis:GEO.three(false)}]}]),
      pageOf("Đường gấp khúc, hình tứ giác",[
        {type:"stepper", title:"Nhớ lại", steps:[
          {say:`Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 2 cm dài 3 + 4 + 2 = <b>9 cm</b>.`, vis:GEO.poly(['A','B','C','D'],[3,4,2])},
          {say:`Hình tứ giác có <b>4 cạnh</b>.`, vis:GEO.shape(4)}]}]),
    ]),
    practice:[
      {type:"mc", q:"Hình vẽ dưới đây là gì?", options:FIG3, answer:0, visual:GEO.segment('A','B')},
      {type:"fill", q:"Đường gấp khúc ABC có AB = 4 cm, BC = 5 cm. Dài bao nhiêu xăng-ti-mét?", answer:9},
      {type:"fill", q:"Hình tứ giác có mấy cạnh?", answer:4},
    ],
    test:[
      {type:"mc", q:"Ba điểm A, B, C trong hình có thẳng hàng không?", options:["Thẳng hàng","Không thẳng hàng"], answer:1, two:true, visual:GEO.three(false)},
      {type:"fill", q:"Hình dưới đây có mấy cạnh?", answer:3, visual:GEO.shape(3)},
      {type:"fill", q:"Đường gấp khúc ABC có AB = 7 cm, BC = 6 cm. Dài bao nhiêu xăng-ti-mét?", answer:13},
    ],
    gen:gg('knt_ltc_hinh_phang')
  };
  G.knt_on_hk1_dolung={
    title:"Ôn tập đo lường",
    learn:FLIP("Lật từng trang để ôn lại ki-lô-gam, lít, giờ và lịch.",[
      pageOf("Ki-lô-gam, lít",[
        {type:"example", html:"<b>kg</b> đo khối lượng (độ nặng). <b>l</b> đo dung tích (lượng nước chứa được)."},
        {type:"stepper", title:"Ví dụ", steps:[
          {say:`Bao gạo 6 kg, bao ngô 4 kg: nặng tất cả 6 + 4 = <b>10 kg</b>.`, vis:eq(`6 kg + 4 kg = 10 kg`)},
          {say:`Thùng có 12 l nước, dùng 5 l: còn 12 − 5 = <b>7 l</b>.`, vis:eq(`12 l − 5 l = 7 l`)}]}]),
      pageOf("Giờ, phút",[
        {type:"clock", h:6, m:30, text:"Con tự chỉnh đồng hồ:"},
        ghiNho("Kim ngắn chỉ giờ, kim dài chỉ phút. 1 giờ = 60 phút.")]),
      pageOf("Ngày, tháng",[
        {type:"example", html:"<b>1 tuần</b> có 7 ngày. <b>1 năm</b> có 12 tháng. Tháng 4, 6, 9, 11 có 30 ngày; tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày."}]),
    ]),
    practice:[
      {type:"fill", q:"Bao gạo nặng 6 kg, bao ngô nặng 4 kg. Cả hai bao nặng bao nhiêu ki-lô-gam?", answer:10},
      {type:"mc", q:"Đồng hồ chỉ mấy giờ?", options:["6 giờ 30 phút","6 giờ","7 giờ 30 phút","6 giờ 15 phút"], answer:0, visual:clockSvg(6,30,150)},
      {type:"fill", q:"Một tuần có bao nhiêu ngày?", answer:7},
    ],
    test:[
      {type:"fill", q:"Thùng có 12 l nước, đã dùng 5 l. Còn lại bao nhiêu lít?", answer:7},
      {type:"mc", q:"Tháng 9 có bao nhiêu ngày?", options:["30 ngày","31 ngày"], answer:0, two:true},
      {type:"fill", q:"1 giờ bằng bao nhiêu phút?", answer:60},
    ],
    gen:gg('knt_ltc_kg_lit','knt_ltc_thoigian')
  };
  G.knt_on_hk1_chung={
    title:"Ôn tập chung (Học kì 1)",
    learn:FLIP("Lật 4 trang để ôn lại toàn bộ kiến thức Toán học kì 1.",[
      pageOf("Các số đến 100, tia số",[
        {type:"stepper", title:"Nhớ lại", steps:[
          {say:`Số có hai chữ số = chục × 10 + đơn vị. Ví dụ <b>56 = 50 + 6</b>.`, vis:eq(`56 = 50 + 6`)},
          {say:`Số liền sau = số đã cho + 1; số liền trước = số đã cho − 1. Số liền sau của 29 là <b>30</b>, số liền trước của 29 là <b>28</b>.`, vis:eq(`29 + 1 = 30 &nbsp;·&nbsp; 29 − 1 = 28`)}]}]),
      pageOf("Cộng, trừ; hơn, kém",[
        {type:"stepper", title:"Nhớ lại", steps:[
          {say:`Cộng, trừ qua 10, cộng trừ có nhớ trong phạm vi 100 đều tính <b>từ phải sang trái</b>.`, vis:eq(`38 + 5 = 43`)},
          {say:`Hơn, kém: lấy <b>số lớn trừ số bé</b>. Gà 10 con, vịt 7 con: gà hơn vịt 10 − 7 = <b>3 con</b>.`, vis:eq(`10 − 7 = 3`)}]}]),
      pageOf("Hình phẳng",[
        {type:"stepper", title:"Nhớ lại", steps:[
          {say:`Đoạn thẳng có hai đầu; đường thẳng kéo dài mãi; đường cong không thẳng.`, vis:GEO.segment('A','B')},
          {say:`Đường gấp khúc dài = tổng độ dài các đoạn thẳng. Hình tứ giác có 4 cạnh.`, vis:GEO.poly(['A','B','C'],[5,4])}]}]),
      pageOf("Đo lường",[
        {type:"example", html:"<b>kg</b> đo khối lượng, <b>l</b> đo dung tích. 1 giờ = 60 phút. 1 tuần = 7 ngày. 1 năm = 12 tháng."}]),
    ]),
    practice:[
      {type:"fill", q:"Số liền sau của 29 là", answer:30},
      {type:"fill", q:"Tính:", expr:"38 + 5", answer:43},
      {type:"fill", q:"Đàn gà có 10 con, đàn vịt có 7 con. Gà nhiều hơn vịt mấy con?", answer:3},
    ],
    test:[
      {type:"fill", q:"Viết số thành tổng: 74 = 70 + ?", answer:4},
      {type:"fill", q:"Tính:", expr:"61 − 24", answer:37},
      {type:"fill", q:"Đường gấp khúc ABC có AB = 5 cm, BC = 4 cm. Dài bao nhiêu xăng-ti-mét?", answer:9},
    ],
    gen:[].concat(gens('knt_luyentapchung1'), gg('knt_on_hk1_congtru','knt_on_hk1_hinh','knt_on_hk1_dolung'))
  };

  /* ---------------------------------------------------------------------------------------
     CHỦ ĐỀ 14 — ÔN TẬP CUỐI NĂM
     --------------------------------------------------------------------------------------- */
  G.knt_on_cuoi_so1000={
    title:"Ôn tập các số trong phạm vi 1 000",
    learn:FLIP("Lật từng trang để ôn lại các số trong phạm vi 1 000.",[
      pageOf("Đơn vị, chục, trăm, nghìn",[
        {type:"placevalue", thousand:true, h:4, t:2, u:7, text:"Con tự dựng số bằng nút + và −:"},
        ghiNho("10 đơn vị = 1 chục; 10 chục = 1 trăm; 10 trăm = 1 nghìn.")]),
      pageOf("Đọc, viết số và viết thành tổng",[
        {type:"stepper", title:"Số 538", steps:[
          {say:`<b>538</b> gồm 5 trăm, 3 chục, 8 đơn vị.`, vis:pv(5,3,8)},
          {say:`Viết thành tổng: <b>538 = 500 + 30 + 8</b>.`, vis:eq(`538 = ${N(500,'a')} + ${N(30,'b')} + ${N(8,'c')}`)}]}]),
      pageOf("So sánh các số",[
        {type:"barcompare", items:[{n:526},{n:518},{n:493}]},
        ghiNho("So sánh từ trái sang phải: trăm → chục → đơn vị. 526 &gt; 518 &gt; 493.")]),
    ]),
    practice:[
      {type:"fill", q:"Số gồm 5 trăm 3 chục 8 đơn vị là số nào?", answer:538},
      {type:"mc", q:"So sánh: 526 ? 518", options:SYM, answer:1},
      {type:"fill", q:"Viết số thành tổng: 538 = 500 + 30 + ?", answer:8},
    ],
    test:[
      {type:"fill", q:"8 chục bằng bao nhiêu đơn vị?", answer:80},
      {type:"mc", q:"So sánh: 345 ? 354", options:SYM, answer:0},
      {type:"fill", q:"Điền số: 300, 400, 500, ?", answer:600},
    ],
    gen:gens('knt_luyentap_1000','knt_donvi_chuc_tram','knt_so3chuso','knt_viet_tong','knt_sosanh_3cs')
  };
  G.knt_on_cuoi_congtru100={
    title:"Ôn tập phép cộng, phép trừ trong phạm vi 100",
    learn:FLIP("Lật từng trang để ôn lại 4 dạng cộng, trừ trong phạm vi 100.",[
      pageOf("Cộng không nhớ, trừ không nhớ",[
        {type:"stepper", title:"35 + 42", steps:tinhCot(35,42,'+')},
        {type:"stepper", title:"79 − 55", steps:tinhCot(79,55,'-')}]),
      pageOf("Cộng có nhớ",[
        {type:"stepper", title:"38 + 5", steps:tinhCot(38,5,'+')},
        {type:"stepper", title:"46 + 28", steps:tinhCot(46,28,'+')}]),
      pageOf("Trừ có nhớ",[
        {type:"stepper", title:"42 − 7", steps:tinhCot(42,7,'-')},
        {type:"stepper", title:"52 − 18", steps:tinhCot(52,18,'-')}]),
    ]),
    practice:[
      {type:"fill", q:"Tính:", expr:"35 + 42", answer:77},
      {type:"fill", q:"Tính:", expr:"38 + 5", answer:43},
      {type:"fill", q:"Tính:", expr:"52 − 18", answer:34},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"79 − 55", answer:24},
      {type:"fill", q:"Tính:", expr:"46 + 28", answer:74},
      {type:"fill", q:"Tính:", expr:"42 − 7", answer:35},
    ],
    gen:gg('knt_ltc_cong_nho','knt_ltc_tru_nho','knt_ontap_congtru100')
  };
  G.knt_on_cuoi_congtru1000={
    title:"Ôn tập phép cộng, phép trừ trong phạm vi 1 000",
    learn:FLIP("Lật từng trang để ôn lại 4 dạng cộng, trừ trong phạm vi 1 000.",[
      pageOf("Cộng không nhớ",[{type:"stepper", title:"235 + 142", steps:tinhCot(235,142,'+')}]),
      pageOf("Cộng có nhớ",[{type:"stepper", title:"176 + 158", steps:tinhCot(176,158,'+')}]),
      pageOf("Trừ không nhớ",[{type:"stepper", title:"578 − 346", steps:tinhCot(578,346,'-')}]),
      pageOf("Trừ có nhớ",[{type:"stepper", title:"432 − 158", steps:tinhCot(432,158,'-')}]),
    ]),
    practice:[
      {type:"fill", q:"Tính:", expr:"235 + 142", answer:377},
      {type:"fill", q:"Tính:", expr:"578 − 346", answer:232},
      {type:"fill", q:"Tính:", expr:"432 − 158", answer:274},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"176 + 158", answer:334},
      {type:"fill", q:"Tính:", expr:"625 − 287", answer:338},
      {type:"fill", q:"Tính:", expr:"314 + 275", answer:589},
    ],
    gen:gens('knt_luyentap_congtru1000','knt_cong1000','knt_cong1000n','knt_tru1000','knt_tru1000n')
  };
  G.knt_on_cuoi_nhanchia={
    title:"Ôn tập phép nhân, phép chia",
    learn:FLIP("Lật từng trang để ôn lại phép nhân, phép chia, bảng nhân và bảng chia 2, 5.",[
      pageOf("Phép nhân, thừa số – tích",[
        {type:"groupviz", mode:"mul", groups:3, per:4, icon:"⭐", text:"3 hộp, mỗi hộp 4 ngôi sao:"},
        ghiNho("Thừa số × Thừa số = Tích. 4 × 3 = 12.")]),
      pageOf("Bảng nhân 2 và bảng nhân 5",[
        {type:"cuuchuong", nums:[2,5]}]),
      pageOf("Phép chia, bảng chia 2 và 5",[
        {type:"groupviz", mode:"div", total:10, groups:2, icon:"🍪", text:"Chia đều 10 cái bánh vào 2 đĩa:"},
        ghiNho("Số bị chia : Số chia = Thương. 10 : 2 = 5. Nghĩ đến bảng nhân: 2 × 5 = 10.")]),
    ]),
    practice:[
      {type:"fill", q:"Tính:", expr:"5 × 7", answer:35},
      {type:"fill", q:"Tính:", expr:"18 : 2", answer:9},
      {type:"mc", q:"Trong phép chia 15 : 5 = 3, số 3 gọi là gì?", options:["Thương","Số chia","Số bị chia","Tích"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"2 × 9", answer:18},
      {type:"fill", q:"Tính:", expr:"40 : 5", answer:8},
      {type:"fill", q:"Mỗi hộp có 5 cái bánh. 6 hộp có bao nhiêu cái bánh?", answer:30},
    ],
    gen:gens('knt_ontap_nhanchia')
  };
  G.knt_on_cuoi_hinh={
    title:"Ôn tập hình học",
    learn:FLIP("Lật từng trang để ôn lại các hình đã học trong năm.",[
      pageOf("Điểm, đoạn thẳng, đường thẳng, đường cong",[
        {type:"stepper", title:"Phân biệt", steps:[
          {say:`<b>Đoạn thẳng</b> có hai đầu.`, vis:GEO.segment('A','B')},
          {say:`<b>Đường thẳng</b> kéo dài mãi.`, vis:GEO.line()},
          {say:`<b>Đường cong</b> không thẳng.`, vis:GEO.curve()}]}]),
      pageOf("Đường gấp khúc, hình tứ giác",[
        {type:"stepper", title:"Nhớ lại", steps:[
          {say:`Đường gấp khúc ABC: AB = 6 cm, BC = 3 cm dài 6 + 3 = <b>9 cm</b>.`, vis:GEO.poly(['A','B','C'],[6,3])},
          {say:`Hình tứ giác có 4 cạnh, 4 đỉnh.`, vis:GEO.shape(4)}]}]),
      pageOf("Khối trụ, khối cầu",[
        {type:"wordcards", items:[{word:"khối trụ", custom:"cylinder"},{word:"lon nước", custom:"can"},{word:"khối cầu", custom:"sphere"},{word:"quả bóng", icon:"⚽"}]},
        ghiNho("Khối cầu tròn đều mọi phía. Khối trụ có hai mặt đáy là hình tròn.")]),
    ]),
    practice:[
      {type:"mc", q:"Hình vẽ dưới đây là gì?", options:FIG3, answer:2, visual:GEO.curve()},
      {type:"fill", q:"Hình tứ giác có mấy cạnh?", answer:4},
      {type:"mc", q:"Quả bóng có dạng khối gì?", options:["Khối cầu","Khối trụ"], answer:0, two:true},
    ],
    test:[
      {type:"fill", q:"Đường gấp khúc ABC có AB = 8 cm, BC = 7 cm. Dài bao nhiêu xăng-ti-mét?", answer:15},
      {type:"mc", q:"Lon nước có dạng khối gì?", options:["Khối trụ","Khối cầu"], answer:0, two:true},
      {type:"mc", q:"Ba điểm A, B, C trong hình có thẳng hàng không?", options:["Thẳng hàng","Không thẳng hàng"], answer:0, two:true, visual:GEO.three(true)},
    ],
    gen:[].concat(gg('knt_ltc_hinh_phang'), gens('knt_khoi','knt_luyentap_khoi'))
  };
  G.knt_on_cuoi_dolung={
    title:"Ôn tập đo lường",
    learn:FLIP("Lật từng trang để ôn lại các đơn vị đo: độ dài, khối lượng, dung tích, tiền, thời gian.",[
      pageOf("Độ dài",[
        {type:"concept", text:"Nhớ các đơn vị độ dài:", big:"1 m = 10 dm = 100 cm"},
        ghiNho("1 dm = 10 cm. 1 km = 1 000 m.")]),
      pageOf("Khối lượng, dung tích",[
        {type:"example", html:"<b>kg</b> đo khối lượng; <b>l</b> đo dung tích. 5 kg + 3 kg = 8 kg. 12 l − 5 l = 7 l."}]),
      pageOf("Tiền Việt Nam",[
        {type:"wordcards", items:[{word:"100 đồng", custom:"note100"},{word:"200 đồng", custom:"note200"},{word:"500 đồng", custom:"note500"},{word:"1 000 đồng", custom:"note1000"}]},
        ghiNho("200 + 500 = 700 đồng. 2 tờ 500 đồng = 1 000 đồng.")]),
      pageOf("Thời gian",[
        {type:"clock", h:9, m:0, text:"Con tự chỉnh đồng hồ:"},
        ghiNho("1 giờ = 60 phút. 1 ngày = 24 giờ. 1 tuần = 7 ngày. 1 năm = 12 tháng.")]),
    ]),
    practice:[
      {type:"fill", q:"3 dm bằng bao nhiêu cm?", answer:30},
      {type:"fill", q:"Có 1 tờ 500 đồng và 1 tờ 200 đồng. Tất cả bao nhiêu đồng?", answer:700},
      {type:"mc", q:"Đồng hồ chỉ mấy giờ?", options:["9 giờ","3 giờ","12 giờ","6 giờ"], answer:0, visual:clockSvg(9,0,150)},
    ],
    test:[
      {type:"fill", q:"2 m bằng bao nhiêu dm?", answer:20},
      {type:"fill", q:"Mẹ đưa 1 000 đồng, mua hết 600 đồng. Được trả lại bao nhiêu đồng?", answer:400},
      {type:"fill", q:"Bao gạo nặng 7 kg, bao ngô nặng 5 kg. Cả hai bao nặng bao nhiêu ki-lô-gam?", answer:12},
    ],
    gen:[].concat(gg('knt_ltc_kg_lit','knt_ltc_thoigian'), gens('knt_dodai','knt_tien','knt_thuchanh_dodai'))
  };
  G.knt_on_cuoi_kiemdem={
    title:"Ôn tập kiểm đếm số liệu và lựa chọn khả năng",
    learn:FLIP("Lật từng trang để ôn lại kiểm đếm, biểu đồ tranh và chắc chắn – có thể – không thể.",[
      pageOf("Kiểm đếm số liệu",[
        {type:"pictochart", title:"Em phân loại và đếm:", rows:[{label:"Táo", icon:"🍎", n:4},{label:"Cam", icon:"🍊", n:3},{label:"Kẹo", icon:"🍬", n:5}]},
        ghiNho("Phân loại → đếm từng loại → ghi số. Tất cả: 4 + 3 + 5 = 12.")]),
      pageOf("Biểu đồ tranh",[
        {type:"pictochart", title:"Số bạn thích mỗi con vật (mỗi hình là 1 bạn):", rows:[{label:"Mèo", icon:"🐱", n:4},{label:"Chó", icon:"🐕", n:6},{label:"Chim", icon:"🐦", n:3}]},
        ghiNho("Hàng dài nhất là nhiều nhất. Chó hơn mèo: 6 − 4 = 2 bạn.")]),
      pageOf("Chắc chắn, có thể, không thể",[
        {type:"example", html:"Hộp chỉ có bóng đỏ: lấy ra bóng đỏ là <b>chắc chắn</b>, bóng xanh là <b>không thể</b>. Hộp có bóng đỏ và xanh: bóng đỏ <b>có thể</b> xuất hiện."}]),
    ]),
    practice:[
      {type:"fill", q:"Giỏ có 4 quả táo, 3 quả cam, 5 cái kẹo. Tất cả có bao nhiêu đồ vật?", answer:12},
      {type:"mc", q:"Hộp chỉ có 5 quả bóng đỏ. Lấy ra 1 quả. Quả bóng đó là bóng đỏ.", options:LIKELY3, answer:0},
      {type:"fill", q:"Mèo có 4 hình, chó có 6 hình (mỗi hình là 1 bạn). Chó hơn mèo mấy bạn?", answer:2},
    ],
    test:[
      {type:"mc", q:"Hộp có 3 quả bóng đỏ và 2 quả bóng xanh. Lấy ra 1 quả. Quả bóng đó là bóng xanh.", options:LIKELY3, answer:1},
      {type:"mc", q:"Hộp có 3 quả bóng đỏ và 2 quả bóng xanh. Lấy ra 1 quả. Quả bóng đó là bóng vàng.", options:LIKELY3, answer:2},
      {type:"fill", q:"6 bạn thích đá bóng, 4 bạn thích bơi, 3 bạn thích chạy. Có tất cả bao nhiêu bạn?", answer:13},
    ],
    gen:gens('knt_kiemdem','knt_bieudo_tranh','knt_chacchan','knt_thuchanh_kiemdem')
  };
  G.knt_on_cuoi_chung={
    title:"Ôn tập chung (Cả năm)",
    learn:FLIP("Lật 5 trang để ôn lại toàn bộ kiến thức Toán lớp 2.",[
      pageOf("Số và phép tính trong phạm vi 100",[
        {type:"stepper", title:"Nhớ lại", steps:[
          {say:`Cộng, trừ có nhớ: tính từ phải sang trái, nhớ 1 hoặc mượn 1.`, vis:col(46,28,'+',2)},
          {say:`<b>46 + 28 = 74</b>; <b>52 − 18 = 34</b>.`, vis:eq(`46 + 28 = 74<br>52 − 18 = 34`)}]}]),
      pageOf("Số và phép tính trong phạm vi 1 000",[
        {type:"stepper", title:"Nhớ lại", steps:[
          {say:`Số có ba chữ số: trăm, chục, đơn vị. <b>538 = 500 + 30 + 8</b>.`, vis:pv(5,3,8)},
          {say:`Cộng, trừ trong phạm vi 1 000 cũng đặt tính thẳng cột: <b>432 − 158 = 274</b>.`, vis:eq(`432 − 158 = 274`)}]}]),
      pageOf("Phép nhân, phép chia",[
        {type:"example", html:"<b>Thừa số × Thừa số = Tích.</b> 5 × 4 = 20. <b>Số bị chia : Số chia = Thương.</b> 20 : 5 = 4. Bảng nhân và bảng chia 2, 5."}]),
      pageOf("Hình học và đo lường",[
        {type:"example", html:"Đoạn thẳng, đường thẳng, đường cong, đường gấp khúc, hình tứ giác; khối trụ, khối cầu. 1 m = 10 dm = 100 cm. 1 giờ = 60 phút."}]),
      pageOf("Thống kê, xác suất",[
        {type:"example", html:"Biểu đồ tranh: đếm hình ở mỗi hàng. Chắc chắn – có thể – không thể: tự hỏi trong hộp có những gì."}]),
    ]),
    practice:[
      {type:"fill", q:"Tính:", expr:"46 + 28", answer:74},
      {type:"fill", q:"Tính:", expr:"5 × 4", answer:20},
      {type:"fill", q:"Tính:", expr:"432 − 158", answer:274},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"20 : 5", answer:4},
      {type:"fill", q:"Tính:", expr:"52 − 18", answer:34},
      {type:"mc", q:"So sánh: 526 ? 518", options:SYM, answer:1},
    ],
    gen:[].concat(gg('knt_on_cuoi_so1000','knt_on_cuoi_congtru100','knt_on_cuoi_congtru1000','knt_on_cuoi_nhanchia','knt_on_cuoi_hinh','knt_on_cuoi_dolung','knt_on_cuoi_kiemdem'))
  };

  /* ---------------------------------------------------------------------------------------
     TIẾNG VIỆT — TẬP 1 (7 bài còn khoá)
     --------------------------------------------------------------------------------------- */
  // ngân hàng điền khuyết: [câu có "__", các lựa chọn, đáp án, gợi ý]
  const blankGen=(bank)=>()=>{ const it=P(bank); const o=shuffleArr(it[1].slice()); return {type:"mc", q:it[0], options:o, answer:o.indexOf(it[2]), two:o.length===2, hint:it[3]}; };
  const NG2=["ng","ngh"], RDG=["r","d","gi"], AN2=["an","ang"], LN2=["l","n"], AN3=["ăn","ăng"], ANN=["ân","âng"];
  const NGBANK=[
    ["Em __e cô giáo giảng bài.",NG2,"ngh","ngh chỉ viết trước e, ê, i"], ["Bố em làm __ề dạy học.",NG2,"ngh","ngh chỉ viết trước e, ê, i"],
    ["Giờ ra chơi, em __ỉ ngơi một lát.",NG2,"ngh","ngh chỉ viết trước e, ê, i"], ["Em __ĩ về bài toán khó.",NG2,"ngh","ngh chỉ viết trước e, ê, i"],
    ["Cô giáo __iêng đầu mỉm cười.",NG2,"ngh","ngh chỉ viết trước e, ê, i"],
    ["Hôm nay là __ày đầu tiên đi học.",NG2,"ng","Trước a thì viết ng"], ["Món canh này rất __on.",NG2,"ng","Trước o thì viết ng"],
    ["Em bé __ủ rất ngoan.",NG2,"ng","Trước u thì viết ng"], ["Bắp __ô nướng rất thơm.",NG2,"ng","Trước ô thì viết ng"],
    ["Bạn Lan rất __oan.",NG2,"ng","Trước o thì viết ng"], ["Con __ựa chạy rất nhanh.",NG2,"ng","Trước ự thì viết ng"], ["Bé __ắm những bông hoa đẹp.",NG2,"ng","Trước ắ thì viết ng"],
  ];
  const RDGBANK=[
    ["Mẹ nhặt __au ngoài vườn.",RDG,"r","rau"], ["Trên núi có nhiều __ừng cây.",RDG,"r","rừng"], ["Mẹ đựng cam vào cái __ổ.",RDG,"r","rổ"], ["Con __ồng trong truyện cổ tích rất lớn.",RDG,"r","rồng"],
    ["Con __ê ăn cỏ trên đồi.",RDG,"d","dê"], ["Cô giáo __ạy em tập viết.",RDG,"d","dạy"], ["Mẹ trồng cây __ừa trước nhà.",RDG,"d","dừa"], ["Em __ọn bàn học cho gọn gàng.",RDG,"d","dọn"],
    ["Cả __a đình em đi chơi công viên.",RDG,"gi","gia đình"], ["Bạn Nam học rất __ỏi.",RDG,"gi","giỏi"], ["Em __úp mẹ quét nhà.",RDG,"gi","giúp"], ["Bây __ờ là bảy giờ sáng.",RDG,"gi","giờ"],
  ];
  const ANBANK=[
    ["Em ngồi vào cái b__ để học bài.",AN2,"an","bàn"], ["Bé tập chơi đ__ ghi-ta.",AN2,"an","đàn"], ["Cô giáo __ ủi bạn khi bạn buồn.",AN2,"an","an ủi"], ["Em lau s__ nhà cho sạch.",AN2,"an","sàn"],
    ["Cái th__ dùng để leo lên mái nhà.",AN2,"ang","thang"], ["Quả chuối chín có màu v__.",AN2,"ang","vàng"], ["Em m__ cặp đến trường.",AN2,"ang","mang"],
  ];
  const PUNCT12=[
    [".","Mẹ đang nấu cơm"],[".","Bạn Nam học lớp 2A"],[".","Em đang đọc sách"],[".","Bố em là bác sĩ"],[".","Chim hót trên cành cây"],
    ["?","Hôm nay bạn đi học bằng gì"],["?","Quyển sách này của ai"],["?","Mẹ đang làm gì vậy"],["?","Bạn tên là gì"],["?","Bạn Nam học lớp mấy"],
  ];
  const punct2=()=>{ const it=P(PUNCT12); const o=[".","?"]; return two(`Điền dấu câu: ${it[1]}__`, o, o.indexOf(it[0]), {hint:"Câu kể → dấu chấm; câu hỏi → dấu chấm hỏi"}); };
  const SUBJPRED=[["Mẹ","nấu cơm"],["Bạn Lan","đọc sách"],["Con chim","hót líu lo"],["Em","quét nhà"],["Bố","đưa em đi học"],["Chị","tưới cây"],["Bạn Nam","đá bóng"],["Cô giáo","giảng bài"]];
  const SUBJDD=[["Bông hoa","rất đẹp"],["Bạn Nam","cao hơn bạn Lan"],["Quả cam","rất ngọt"],["Con mèo","rất ngoan"],["Mái tóc","đen mượt"],["Đôi mắt","đen láy"]];
  const wherePred=()=>{ const it=P(SUBJPRED); const others=shuffleArr(SUBJPRED.filter(x=>x!==it)).slice(0,3);
    const o=shuffleArr([it[1]].concat(others.map(x=>x[1])));
    return mc3(`Câu: “${it[0]} ${it[1]}.” Bộ phận nào trả lời cho câu hỏi “làm gì?”`, o, o.indexOf(it[1])); };
  const whoSubj=()=>{ const it=P(SUBJPRED); const others=shuffleArr(SUBJPRED.filter(x=>x!==it)).slice(0,3);
    const o=shuffleArr([it[0]].concat(others.map(x=>x[0])));
    return mc3(`Câu: “${it[0]} ${it[1]}.” Bộ phận nào trả lời cho câu hỏi “Ai?”`, o, o.indexOf(it[0])); };
  const whatDD=()=>{ const it=P(SUBJDD); const others=shuffleArr(SUBJDD.filter(x=>x!==it)).slice(0,3);
    const o=shuffleArr([it[1]].concat(others.map(x=>x[1])));
    return mc3(`Câu: “${it[0]} ${it[1]}.” Bộ phận nào trả lời cho câu hỏi “thế nào?”`, o, o.indexOf(it[1])); };
  const typeSent=()=>{ const hd=P(SUBJPRED), dd=P(SUBJDD); const useHd=Math.random()<0.5; const s=useHd?hd:dd;
    const o=["Câu nêu hoạt động (Ai làm gì?)","Câu nêu đặc điểm (Ai thế nào?)"];
    return two(`Câu “${s[0]} ${s[1]}.” là loại câu nào?`, o, useHd?0:1); };

  G.tv1_chinhta_ngngh={
    title:"Chính tả: ng/ngh, r/d/gi, an/ang; dấu chấm, dấu chấm hỏi",
    learn:{ intro:"Có một số âm, vần rất dễ viết nhầm. Mỗi cặp có cách nhớ riêng. Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"ng hay ngh?", steps:[
          {say:`<b>ngh</b> chỉ viết khi đứng trước các chữ <b>e, ê, i</b>: nghe, nghề, nghỉ, nghĩ, nghiêng.`, vis:chips(['nghe','nghề','nghỉ','nghĩ','nghiêng'],'c')},
          {say:`<b>ng</b> viết trước tất cả các chữ còn lại (a, o, ô, ơ, u, ư…): ngày, ngon, ngô, ngủ, ngoan.`, vis:chips(['ngày','ngon','ngô','ngủ','ngoan'],'b')},
          {say:`<b>Cách làm:</b> nhìn chữ đứng ngay sau chỗ trống. Là e, ê, i → <b>ngh</b>. Không phải → <b>ng</b>. Ví dụ "__e cô giảng" → e → <b>ngh</b>e.`},
        ]},
        {type:"stepper", title:"r, d hay gi?", steps:[
          {say:`Ba âm <b>r, d, gi</b> nghe gần giống nhau, con phải <b>nhớ mặt chữ</b> của từng từ quen thuộc.`},
          {say:`Từ viết với <b>r</b>:`, vis:chips(['rau','rổ','rừng','rồng'],'c')},
          {say:`Từ viết với <b>d</b>:`, vis:chips(['dê','dạy','dừa','dọn'],'b')},
          {say:`Từ viết với <b>gi</b>:`, vis:chips(['gia đình','giỏi','giúp','giờ'],'r')},
          {say:`Gặp từ chưa chắc, con hỏi cô giáo hoặc tra từ điển rồi nhớ lại.`},
        ]},
        {type:"stepper", title:"an hay ang?", steps:[
          {say:`<b>an</b> kết thúc bằng chữ <b>n</b>; <b>ang</b> kết thúc bằng <b>ng</b>. Hai vần khác nhau khi đọc: "an" ngậm miệng, "ang" mở miệng rộng.`},
          {say:`Từ viết với <b>an</b>:`, vis:chips(['bàn','đàn','an ủi','sàn'],'c')},
          {say:`Từ viết với <b>ang</b>:`, vis:chips(['thang','vàng','mang'],'b')},
        ]},
        {type:"stepper", title:"Dấu chấm và dấu chấm hỏi", steps:[
          {say:`<b>Dấu chấm ( . )</b> đặt cuối <b>câu kể</b> (câu kể lại, tả, giới thiệu).`, vis:sentence([['Mẹ đang nấu cơm','b'],['.','c']])},
          {say:`<b>Dấu chấm hỏi ( ? )</b> đặt cuối <b>câu hỏi</b> (câu dùng để hỏi).`, vis:sentence([['Bạn tên là gì','b'],['?','c']])},
          {say:`<b>Cách chọn:</b> hỏi mình "Câu này để kể hay để hỏi?". Kể → dấu chấm. Hỏi → dấu chấm hỏi.`},
        ]},
      ]},
    practice:[
      {type:"mc", q:"Em __e cô giáo giảng bài.", options:NG2, answer:1, two:true, hint:"ngh chỉ viết trước e, ê, i"},
      {type:"mc", q:"Bạn Nam học rất __ỏi.", options:RDG, answer:2},
      {type:"mc", q:"Điền dấu câu: Bạn tên là gì__", options:[".","?"], answer:1, two:true},
    ],
    test:[
      {type:"mc", q:"Món canh này rất __on.", options:NG2, answer:0, two:true},
      {type:"mc", q:"Con __ê ăn cỏ trên đồi.", options:RDG, answer:1},
      {type:"mc", q:"Cái th__ dùng để leo lên mái nhà.", options:AN2, answer:1, two:true},
    ],
    gen:[blankGen(NGBANK),blankGen(RDGBANK),blankGen(ANBANK),punct2]
  };
  const LNBANK=[
    ["Chiếc __ón che nắng cho bà.",LN2,"n","nón"], ["Mẹ __ấu cơm trong bếp.",LN2,"n","nấu"], ["Trời __ắng, em đội mũ.",LN2,"n","nắng"], ["Em uống __ước mát.",LN2,"n","nước"], ["Bé tập __ói cho rõ.",LN2,"n","nói"],
    ["Em học ở __ớp 2A.",LN2,"l","lớp"], ["Cây có nhiều __á xanh.",LN2,"l","lá"], ["Bố cày ruộng trồng __úa.",LN2,"l","lúa"], ["Em __àm bài tập.",LN2,"l","làm"], ["Chim bay __ên trời cao.",LN2,"l","lên"],
  ];
  const ANBANK2=[
    ["Trời lạnh, bé đắp ch__ ấm.",AN3,"ăn","chăn"], ["Em lau mặt bằng cái kh__ sạch.",AN3,"ăn","khăn"], ["Cái ng__ bàn đựng sách vở.",AN3,"ăn","ngăn"],
    ["Đêm rằm, tr__ rất sáng.",AN3,"ăng","trăng"], ["Hôm nay trời n__ đẹp.",AN3,"ăng","nắng"], ["M__ non mọc từ gốc tre.",AN3,"ăng","măng"],
    ["Con gà có hai ch__ nhỏ.",ANN,"ân","chân"], ["Mẹ dùng c__ để cân gạo.",ANN,"ân","cân"], ["Hai bạn rất th__ nhau.",ANN,"ân","thân"],
    ["Ngôi nhà có ba t__.",ANN,"âng","tầng"], ["Dạ, v__ ạ!",ANN,"âng","vâng"],
  ];
  G.tv1_chinhta_lnan={
    title:"Chính tả: l/n, ăn/ăng, ân/âng; từ ngữ, câu nêu đặc điểm",
    learn:{ intro:"Con học cách viết đúng l/n, ăn/ăng, ân/âng, và nhắc lại cách tìm từ, câu nêu đặc điểm. Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"l hay n?", steps:[
          {say:`<b>l</b> và <b>n</b> dễ viết nhầm vì nhiều bạn đọc giống nhau. Con phải nhớ mặt chữ của từng từ.`},
          {say:`Từ viết với <b>l</b>:`, vis:chips(['lá','lúa','lớp','lên','làm'],'c')},
          {say:`Từ viết với <b>n</b>:`, vis:chips(['nón','nước','nắng','nấu','nói'],'b')},
          {say:`<b>Mẹo:</b> đọc to từ và nhìn hình hoặc nghĩ đến vật thật (nón lá, nước uống) để nhớ chữ cái đầu.`},
        ]},
        {type:"stepper", title:"ăn hay ăng? ân hay âng?", steps:[
          {say:`Cuối vần là chữ <b>n</b> → <b>ăn, ân</b> (ngậm miệng). Cuối vần là chữ <b>ng</b> → <b>ăng, âng</b> (mở miệng).`},
          {say:`<b>ăn:</b> chăn, khăn, ngăn. &nbsp; <b>ăng:</b> trăng, nắng, măng.`, vis:chips(['chăn','khăn','ngăn'],'c')+chips(['trăng','nắng','măng'],'b')},
          {say:`<b>ân:</b> chân, cân, thân. &nbsp; <b>âng:</b> tầng, vâng.`, vis:chips(['chân','cân','thân'],'c')+chips(['tầng','vâng'],'b')},
        ]},
        {type:"stepper", title:"Từ ngữ và câu nêu đặc điểm", steps:[
          {say:`<b>Từ chỉ đặc điểm</b> cho biết màu sắc, hình dáng, tính chất: đẹp, cao, ngoan, thơm…`},
          {say:`<b>Câu nêu đặc điểm</b> trả lời câu hỏi <b>"... thế nào?"</b>: <b>Ai (cái gì)</b> + <b>thế nào</b>.`, vis:sentence([['Bông hoa','b'],['rất đẹp.','c']])},
          {say:`Muốn tìm từ chỉ đặc điểm trong câu, con hỏi: <b>"Bông hoa thế nào?"</b> → <b>rất đẹp</b>.`},
        ]},
      ]},
    practice:[
      {type:"mc", q:"Chiếc __ón che nắng cho bà.", options:LN2, answer:1, two:true},
      {type:"mc", q:"Đêm rằm, tr__ rất sáng.", options:AN3, answer:1, two:true},
      {type:"mc", q:"Câu: “Bông hoa rất đẹp.” Bộ phận nào trả lời cho câu hỏi “thế nào?”", options:["rất đẹp","Bông hoa","Bông","hoa rất"], answer:0},
    ],
    test:[
      {type:"mc", q:"Cây có nhiều __á xanh.", options:LN2, answer:0, two:true},
      {type:"mc", q:"Con gà có hai ch__ nhỏ.", options:ANN, answer:0, two:true},
      {type:"mc", q:"Câu: “Con mèo rất ngoan.” Bộ phận nào trả lời cho câu hỏi “thế nào?”", options:["rất ngoan","Con mèo","Con","mèo rất"], answer:0},
    ],
    gen:[blankGen(LNBANK),blankGen(ANBANK2),whatDD,whatDD]
  };
  const FR_POS=["thân thiết","yêu quý","quý mến","gắn bó","quan tâm","giúp đỡ","chia sẻ","nhường nhịn","vui vẻ"];
  const FR_NEG=["bàn ghế","chạy nhảy","quyển vở","con mèo","tưới cây","cái cặp"];
  const FRIEND_GOOD=["giúp bạn nhặt bút","chia bánh cho bạn","hỏi thăm khi bạn ốm","cho bạn mượn sách","nhường bạn chỗ ngồi","an ủi khi bạn buồn"];
  const FRIEND_BAD=["giành đồ chơi của bạn","nói xấu bạn","xô bạn ngã","nói dối bạn","lấy đồ của bạn không xin phép"];
  G.tv1_vontu_tinhcam={
    title:"Mở rộng vốn từ: Tình cảm bạn bè; dấu chấm, dấu chấm hỏi, dấu chấm than",
    learn:{ intro:"Con học các từ chỉ tình cảm bạn bè, cách cư xử tốt với bạn và cách chọn dấu cuối câu. Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"Tình cảm bạn bè", steps:[
          {say:`Bạn bè thương yêu, gắn bó với nhau. Các từ chỉ <b>tình cảm bạn bè</b>:`, vis:chips(['thân thiết','yêu quý','quý mến','gắn bó','quan tâm'],'c')},
          {say:`Các từ chỉ <b>việc làm tốt</b> giữa bạn bè:`, vis:chips(['giúp đỡ','chia sẻ','nhường nhịn'],'b')},
          {say:`<b>Cách nhận ra:</b> con hỏi "Từ này nói về cách bạn bè thương yêu, giúp nhau không?" Có → từ chỉ tình cảm bạn bè.`},
          {say:`Việc làm thể hiện tình bạn: giúp bạn nhặt bút, chia bánh cho bạn, hỏi thăm khi bạn ốm. Việc không tốt: giành đồ chơi, nói xấu bạn, xô bạn ngã.`},
        ]},
        {type:"stepper", title:"Dấu chấm, dấu chấm hỏi, dấu chấm than", steps:[
          {say:`<b>Dấu chấm ( . )</b>: cuối câu kể. <b>Dấu chấm hỏi ( ? )</b>: cuối câu hỏi. <b>Dấu chấm than ( ! )</b>: cuối câu bộc lộ cảm xúc.`},
          {say:`Ví dụ:`, vis:sentence([['Bạn Lan cho em mượn bút','b'],['.','c']])+sentence([['Bạn có thích đá bóng không','b'],['?','c']])+sentence([['Bạn thật tốt bụng','b'],['!','c']])},
          {say:`<b>Cách chọn:</b> kể → <b>.</b> &nbsp; hỏi → <b>?</b> &nbsp; cảm xúc → <b>!</b>`},
        ]},
      ]},
    practice:[
      {type:"mc", q:"Từ nào chỉ tình cảm bạn bè?", options:["thân thiết","bàn ghế","chạy nhảy","quyển vở"], answer:0},
      {type:"mc", q:"Việc làm nào thể hiện tình bạn tốt đẹp?", options:["giúp bạn nhặt bút","giành đồ chơi của bạn","nói xấu bạn","xô bạn ngã"], answer:0},
      {type:"mc", q:"Điền dấu câu: Bạn thật tốt bụng__", options:[".","?","!"], answer:2},
    ],
    test:[
      {type:"mc", q:"Từ nào chỉ tình cảm bạn bè?", options:["yêu quý","con mèo","cái cặp","tưới cây"], answer:0},
      {type:"mc", q:"Việc làm nào thể hiện tình bạn tốt đẹp?", options:["chia bánh cho bạn","nói dối bạn","xô bạn ngã","giành đồ chơi của bạn"], answer:0},
      {type:"mc", q:"Điền dấu câu: Bạn có thích đá bóng không__", options:[".","?","!"], answer:1},
    ],
    gen:[
      ()=>mcText("Từ nào chỉ tình cảm bạn bè?", P(FR_POS), FR_NEG),
      ()=>mcText("Việc làm nào thể hiện tình bạn tốt đẹp?", P(FRIEND_GOOD), FRIEND_BAD),
      ()=>mcText("Việc làm nào KHÔNG nên làm với bạn?", P(FRIEND_BAD), FRIEND_GOOD),
      ...gens('tv2_dau_cham_than')
    ]
  };
  G.tv1_dacdiem_hoatdong={
    title:"Từ ngữ chỉ đặc điểm, hoạt động; câu nêu hoạt động",
    learn:{ intro:"Con ôn cách phân biệt từ chỉ hoạt động, từ chỉ đặc điểm và cách tìm các bộ phận của câu nêu hoạt động. Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"Từ chỉ hoạt động và từ chỉ đặc điểm", steps:[
          {say:`<b>Từ chỉ hoạt động</b> là <b>việc làm</b>: chạy, đọc, viết, nấu cơm, quét nhà…`, vis:chips(['chạy','đọc','viết','nấu cơm','quét nhà'],'c')},
          {say:`<b>Từ chỉ đặc điểm</b> cho biết <b>màu sắc, hình dáng, tính chất</b>: đỏ, cao, ngoan, đẹp…`, vis:chips(['đỏ','cao','ngoan','đẹp'],'b')},
          {say:`<b>Cách phân biệt:</b> hỏi <b>"làm gì?"</b> → hoạt động; hỏi <b>"thế nào?"</b> → đặc điểm.`},
        ]},
        {type:"stepper", title:"Câu nêu hoạt động: Ai làm gì?", steps:[
          {say:`Câu nêu hoạt động có hai bộ phận: <b>Ai</b> (người, con vật) và <b>làm gì</b> (việc làm).`, vis:sentence([['Mẹ','b'],['nấu cơm.','c']])},
          {say:`Muốn tìm bộ phận <b>Ai</b>, hỏi <b>"Ai nấu cơm?"</b> → <b>Mẹ</b>. Muốn tìm bộ phận <b>làm gì</b>, hỏi <b>"Mẹ làm gì?"</b> → <b>nấu cơm</b>.`},
          {say:`Ví dụ khác:`, vis:sentence([['Bạn Lan','b'],['đọc sách.','c']])+sentence([['Con chim','b'],['hót líu lo.','c']])},
        ]},
      ]},
    practice:[
      {type:"mc", q:"Câu: “Mẹ nấu cơm.” Bộ phận nào trả lời cho câu hỏi “làm gì?”", options:["nấu cơm","Mẹ","nấu","cơm"], answer:0},
      {type:"mc", q:"Từ nào là từ chỉ hoạt động?", options:["chạy","đỏ","cao","ngoan"], answer:0},
      {type:"mc", q:"Từ nào là từ chỉ đặc điểm?", options:["ngoan","đọc","viết","bơi"], answer:0},
    ],
    test:[
      {type:"mc", q:"Câu: “Bạn Lan đọc sách.” Bộ phận nào trả lời cho câu hỏi “Ai?”", options:["Bạn Lan","đọc sách","đọc","sách"], answer:0},
      {type:"mc", q:"Từ nào là từ chỉ hoạt động?", options:["viết","đẹp","xanh","cao"], answer:0},
      {type:"mc", q:"Câu “Em quét nhà.” là loại câu nào?", options:["Câu nêu hoạt động (Ai làm gì?)","Câu nêu đặc điểm (Ai thế nào?)"], answer:0, two:true},
    ],
    gen:[wherePred,whoSubj,typeSent,...gens('tv2_on_tu_loai','tv_hoatdong_neuhoatdong')]
  };
  const GROUPS1={
    "Người thân trong gia đình":["ông","bà","bố","mẹ","anh","chị","em bé","cô","chú"],
    "Thầy cô và bạn bè":["cô giáo","thầy giáo","bạn bè","lớp trưởng","bạn cùng bàn"],
    "Thời gian trong ngày":["sáng","trưa","chiều","tối","đêm"],
  };
  G.tv1_vontu_chudiem={
    title:"Mở rộng vốn từ theo chủ điểm (Tập 1)",
    learn:{ intro:"Con học xếp từ vào nhóm: người thân, thầy cô và bạn bè, thời gian trong ngày. (Nhóm từ do trợ lý chọn theo các chủ điểm quen thuộc, chưa đối chiếu mục lục SGK.) Con xem từng bước nhé!",
      blocks:[
        {type:"stepper", title:"Ba nhóm từ", steps:[
          {say:`<b>Người thân trong gia đình:</b> các từ chỉ người sống cùng hoặc gần gũi với em.`, vis:chips(GROUPS1["Người thân trong gia đình"],'c')},
          {say:`<b>Thầy cô và bạn bè:</b> các từ chỉ người ở trường lớp.`, vis:chips(GROUPS1["Thầy cô và bạn bè"],'b')},
          {say:`<b>Thời gian trong ngày:</b> các từ chỉ buổi trong ngày.`, vis:chips(GROUPS1["Thời gian trong ngày"],'r')},
          {say:`<b>Cách làm bài:</b> gặp một từ, con hỏi: "Từ này nói về người thân, người ở trường, hay buổi trong ngày?" rồi chọn nhóm.`},
        ]},
        {type:"example", html:"<b>Ví dụ:</b> “ông” → người thân; “lớp trưởng” → thầy cô và bạn bè; “chiều” → thời gian trong ngày."}
      ]},
    practice:[
      {type:"mc", q:"Từ nào thuộc nhóm “Người thân trong gia đình”?", options:["bà","cô giáo","sáng","bạn bè"], answer:0},
      {type:"mc", q:"Từ nào thuộc nhóm “Thời gian trong ngày”?", options:["chiều","ông","lớp trưởng","bố"], answer:0},
      {type:"mc", q:"Từ nào thuộc nhóm “Thầy cô và bạn bè”?", options:["thầy giáo","trưa","mẹ","chị"], answer:0},
    ],
    test:[
      {type:"mc", q:"Từ nào thuộc nhóm “Người thân trong gia đình”?", options:["chú","đêm","bạn bè","lớp trưởng"], answer:0},
      {type:"mc", q:"Từ nào thuộc nhóm “Thời gian trong ngày”?", options:["tối","cô","anh","thầy giáo"], answer:0},
      {type:"mc", q:"Từ nào thuộc nhóm “Thầy cô và bạn bè”?", options:["bạn cùng bàn","sáng","bà","em bé"], answer:0},
    ],
    gen:Object.keys(GROUPS1).map(k=>()=>{ const others=[].concat(...Object.keys(GROUPS1).filter(x=>x!==k).map(x=>GROUPS1[x]));
      return mcText(`Từ nào thuộc nhóm “${k}”?`, P(GROUPS1[k]), others); })
  };
  G.tv1_cau_dacdiem={
    title:"Câu nêu đặc điểm (Ai thế nào?)",
    learn:{ intro:"Câu nêu đặc điểm cho biết người, vật, con vật có đặc điểm gì. Con xem từng bước cách nhận ra và đặt câu nhé!",
      blocks:[
        {type:"stepper", title:"Ai thế nào?", steps:[
          {say:`Câu nêu đặc điểm có hai bộ phận: <b>Ai (cái gì, con gì)</b> và <b>thế nào</b>.`, vis:sentence([['Bông hoa','b'],['rất đẹp.','c']])},
          {say:`Bộ phận <b>thế nào</b> nói về <b>màu sắc, hình dáng, tính chất</b> hoặc <b>tính tình</b>: rất đẹp, cao, đen mượt, ngoan…`},
          {say:`<b>Tìm bộ phận "thế nào":</b> con hỏi "Bông hoa <b>thế nào</b>?" → <b>rất đẹp</b>. <b>Tìm bộ phận "Ai":</b> hỏi "<b>Cái gì</b> rất đẹp?" → <b>Bông hoa</b>.`},
          {say:`<b>Phân biệt với câu nêu hoạt động:</b> câu “Bạn Lan đọc sách.” (làm gì?) khác câu “Bạn Lan rất ngoan.” (thế nào?).`, vis:sentence([['Bạn Lan','b'],['đọc sách.','c']])+sentence([['Bạn Lan','b'],['rất ngoan.','r']])},
          {say:`<b>Đặt câu:</b> chọn một vật hoặc người, rồi nói đặc điểm của nó. Ví dụ: “Quả cam rất ngọt.”`, vis:sentence([['Quả cam','b'],['rất ngọt.','c']])},
        ]},
        ghiNho("Câu nêu đặc điểm: <b>Ai (cái gì)</b> + <b>thế nào</b>. Câu nêu hoạt động: <b>Ai</b> + <b>làm gì</b>.")
      ]},
    practice:[
      {type:"mc", q:"Câu: “Con mèo rất ngoan.” Bộ phận nào trả lời cho câu hỏi “thế nào?”", options:["rất ngoan","Con mèo","mèo","Con"], answer:0},
      {type:"mc", q:"Câu “Quả cam rất ngọt.” là loại câu nào?", options:["Câu nêu đặc điểm (Ai thế nào?)","Câu nêu hoạt động (Ai làm gì?)"], answer:0, two:true},
      {type:"mc", q:"Câu nào là câu nêu đặc điểm?", options:["Bông hoa rất đẹp.","Mẹ nấu cơm.","Em quét nhà.","Chị tưới cây."], answer:0},
    ],
    test:[
      {type:"mc", q:"Câu: “Mái tóc đen mượt.” Bộ phận nào trả lời cho câu hỏi “thế nào?”", options:["đen mượt","Mái tóc","tóc","Mái"], answer:0},
      {type:"mc", q:"Câu “Bố đưa em đi học.” là loại câu nào?", options:["Câu nêu hoạt động (Ai làm gì?)","Câu nêu đặc điểm (Ai thế nào?)"], answer:0, two:true},
      {type:"mc", q:"Câu nào là câu nêu đặc điểm?", options:["Đôi mắt đen láy.","Bố đọc báo.","Em quét nhà.","Chim hót líu lo."], answer:0},
    ],
    gen:[whatDD,typeSent,
      ()=>{ const dd=P(SUBJDD), hd=shuffleArr(SUBJPRED).slice(0,3); const s=x=>`${x[0]} ${x[1]}.`; const o=shuffleArr([s(dd)].concat(hd.map(s)));
        return mc3("Câu nào là câu nêu đặc điểm?", o, o.indexOf(s(dd))); },
      ...gens('tv_dacdiem_neudacdiem')]
  };
  G.tv1_on_daucau={
    title:"Ôn tập dấu câu (Tập 1)",
    learn:{ intro:"Ôn lại ba dấu câu: dấu chấm, dấu chấm hỏi, dấu chấm than. Con xem từng bước cách chọn đúng dấu nhé!",
      blocks:[
        {type:"stepper", title:"Chọn dấu cuối câu", steps:[
          {say:`Muốn chọn dấu cuối câu, con hỏi mình: <b>"Câu này để làm gì?"</b>`},
          {say:`<b>Để kể, tả, giới thiệu</b> → dấu chấm <b>( . )</b>.`, vis:sentence([['Em đang đọc sách','b'],['.','c']])},
          {say:`<b>Để hỏi</b> → dấu chấm hỏi <b>( ? )</b>. Thường có các từ: ai, gì, đâu, nào, mấy, không…`, vis:sentence([['Bạn tên là gì','b'],['?','c']])},
          {say:`<b>Để bộc lộ cảm xúc</b> (vui, ngạc nhiên, khen…) → dấu chấm than <b>( ! )</b>.`, vis:sentence([['Ôi, bông hoa đẹp quá','b'],['!','c']])},
          {say:`<b>Nhớ:</b> đầu câu luôn viết hoa; cuối câu luôn có một dấu câu.`},
        ]},
        ghiNho("Kể → <b>.</b> &nbsp;·&nbsp; Hỏi → <b>?</b> &nbsp;·&nbsp; Cảm xúc → <b>!</b>")
      ]},
    practice:[
      {type:"mc", q:"Điền dấu câu: Em đang đọc sách__", options:[".","?","!"], answer:0},
      {type:"mc", q:"Điền dấu câu: Bạn tên là gì__", options:[".","?","!"], answer:1},
      {type:"mc", q:"Điền dấu câu: Ôi, bông hoa đẹp quá__", options:[".","?","!"], answer:2},
    ],
    test:[
      {type:"mc", q:"Điền dấu câu: Mẹ đang nấu cơm__", options:[".","?","!"], answer:0},
      {type:"mc", q:"Điền dấu câu: Bạn Nam học lớp mấy__", options:[".","?","!"], answer:1},
      {type:"mc", q:"Điền dấu câu: Chà, bài toán này khó thật__", options:[".","?","!"], answer:2},
    ],
    gen:[punct2,...gens('tv2_dau_cham_than','tv2_cac_loai_cau')]
  };

  Object.assign(CONTENT,G);

  /* ---- bổ sung ngân hàng câu hỏi cho 2 bài chính tả cũ (trước đây chỉ sinh được 8–9 câu khác nhau) ---- */
  const TRCH_MORE=[["Cây __e xanh mọc ở bờ ao.",["tr","ch"],"tr","tre"],["Cái __ổi dùng để quét nhà.",["tr","ch"],"ch","chổi"],
    ["Mẹ nấu __áo cho bé ăn.",["tr","ch"],"ch","cháo"],["__ời hôm nay rất đẹp.",["tr","ch"],"tr","trời"],["Bé __ơi đồ chơi cùng bạn.",["tr","ch"],"ch","chơi"]];
  const SX_MORE=[["Quả __oài ngọt thơm.",["s","x"],"x","xoài"],["Cái __ô đựng nước.",["s","x"],"x","xô"],
    ["Chim __áo hót trên cành.",["s","x"],"s","sáo"],["Mùa __uân, hoa nở khắp nơi.",["s","x"],"x","xuân"],["Hôm nay là __inh nhật của bạn Lan.",["s","x"],"s","sinh nhật"]];
  CONTENT.tv_trch.gen.push(blankGen(TRCH_MORE));
  CONTENT.tv_sx.gen.push(blankGen(SX_MORE));

  /* ---- gắn khoá vào khung chương (bài nào thiếu `key` thì tự gắn theo tiêu đề) ---- */
  const KEYMAP=[
    ["Bài 10. Luyện tập chung","knt_ltc_cong_qua10"],["Bài 14. Luyện tập chung","knt_ltc_tru_qua10"],
    ["Bài 15. Ki-lô-gam","knt_kg"],["Bài 16. Lít","knt_lit"],["Bài 17.","knt_thuchanh_kg_lit"],["Bài 18. Luyện tập chung","knt_ltc_kg_lit"],
    ["Bài 19.","knt_cong_nho_21"],["Bài 20.","knt_cong_nho_22"],["Bài 21. Luyện tập chung","knt_ltc_cong_nho"],
    ["Bài 22.","knt_tru_nho_21"],["Bài 23.","knt_tru_nho_22"],["Bài 24. Luyện tập chung","knt_ltc_tru_nho"],
    ["Bài 25.","knt_hinh_co_ban"],["Bài 26.","knt_gapkhuc_tugiac"],["Bài 27.","knt_thuchanh_hinh"],["Bài 28. Luyện tập chung","knt_ltc_hinh_phang"],
    ["Bài 29.","knt_ngay_gio"],["Bài 30.","knt_ngay_thang"],["Bài 31.","knt_thuchanh_dongho_lich"],["Bài 32. Luyện tập chung","knt_ltc_thoigian"],
    ["Bài 33.","knt_on_hk1_congtru"],["Bài 34.","knt_on_hk1_hinh"],["Bài 35.","knt_on_hk1_dolung"],["Bài 36.","knt_on_hk1_chung"],
    ["Bài 68.","knt_on_cuoi_so1000"],["Bài 69.","knt_on_cuoi_congtru100"],["Bài 70.","knt_on_cuoi_congtru1000"],["Bài 71.","knt_on_cuoi_nhanchia"],
    ["Bài 72.","knt_on_cuoi_hinh"],["Bài 73.","knt_on_cuoi_dolung"],["Bài 74.","knt_on_cuoi_kiemdem"],["Bài 75.","knt_on_cuoi_chung"],
    ["Chính tả: Phân biệt ng/ngh","tv1_chinhta_ngngh"],["Chính tả: Phân biệt l/n","tv1_chinhta_lnan"],
    ["Mở rộng vốn từ: Tình cảm bạn bè","tv1_vontu_tinhcam"],["Từ ngữ chỉ đặc điểm, hoạt động; Câu nêu hoạt động","tv1_dacdiem_hoatdong"],
    ["Câu nêu đặc điểm (Ai thế nào?)","tv1_cau_dacdiem"],["Ôn tập dấu câu tập 1","tv1_on_daucau"],
  ];
  const TV1_VONTU="tv1_vontu_chudiem";
  Object.values(CURRICULUM).forEach(sub=>sub.chapters.forEach(ch=>ch.bai.forEach(b=>{
    if(b.key) return;
    const hit=KEYMAP.find(([pre])=>b.t.startsWith(pre));
    if(hit && CONTENT[hit[1]]) b.key=hit[1];
    else if(b.t==="Mở rộng vốn từ theo chủ điểm" && ch.ch.startsWith("Tập 1")) b.key=TV1_VONTU;
  })));
})();
