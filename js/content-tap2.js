/* ===== GIAI ĐOẠN 2 — NỘI DUNG HỌC KỲ 2 (Toán Chủ đề 8–13, Tiếng Việt tập 2) =====
   Nạp SAU curriculum-data.js và icons-data.js, TRƯỚC engine.js (hàm randInt/distinctOptions/
   shuffleArr/emo chỉ được gọi lúc chạy nên dùng được ở đây).
   - Toán: mọi đáp án tính bằng code, câu hỏi sinh ngẫu nhiên (gen).
   - Tiếng Việt: tự soạn luyện tập (không chép nguyên văn bài đọc trong SGK).
   - Mọi bài giữ nhãn "bản nháp" cho đến khi bố mẹ đối chiếu SGK tập 2. */
(function(){
  const R=(a,b)=>randInt(a,b);
  const P=arr=>arr[Math.floor(Math.random()*arr.length)];
  const near=c=>()=>c+(R(0,1)?1:-1)*R(1,5);
  const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
  const SYM=["<",">","="];

  function mcNum(q,correct,nearFn,extra){
    const o=distinctOptions(correct,3,nearFn||near(correct));
    return Object.assign({type:"mc",q,options:o,answer:o.indexOf(String(correct))},extra||{});
  }
  function mcText(q,correct,pool,extra){
    const wrong=shuffleArr(Array.from(new Set(pool)).filter(x=>x!==correct)).slice(0,3);
    const o=shuffleArr([correct].concat(wrong));
    return Object.assign({type:"mc",q,options:o,answer:o.indexOf(correct)},extra||{});
  }
  const fillQ=(q,answer,extra)=>Object.assign({type:"fill",q,answer},extra||{});
  const tableList=(n,to)=>Array.from({length:to||10},(_,i)=>`${n} × ${i+1} = ${n*(i+1)}`).join(' &nbsp;·&nbsp; ');
  const divList=(n,to)=>Array.from({length:to||10},(_,i)=>`${n*(i+1)} : ${n} = ${i+1}`).join(' &nbsp;·&nbsp; ');
  const cmpSymbol=(a,b)=>a<b?0:(a>b?1:2);
  const DIG=["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"];
  function readNum(n){
    const h=Math.floor(n/100), t=Math.floor(n/10)%10, u=n%10;
    let s=DIG[h]+" trăm";
    if(t===0 && u===0) return s;
    if(t===0) return s+" linh "+DIG[u];
    s+= t===1 ? " mười" : " "+DIG[t]+" mươi";
    if(u===0) return s;
    if(u===5) return s+" lăm";
    if(u===1 && t>1) return s+" mốt";
    if(u===4 && t>1) return s+" tư";
    return s+" "+DIG[u];
  }
  // số 3 chữ số đọc không gây tranh cãi (không có "linh/lẻ", không "mốt/tư")
  function safeReadNum(){
    let h,t,u;
    do{ h=R(1,9); t=R(1,9); u=R(0,9); }while(t>1 && (u===1||u===4));
    return h*100+t*10+u;
  }
  const picRows=rows=>rows.map(r=>`<div class="pcq-row"><span class="pcq-l">${r.label}</span><span class="pcq-i">${emo(r.icon.repeat(r.n))}</span></div>`).join('');

  const T={};   // Toán — Tập 2
  const V={};   // Tiếng Việt — Tập 2

  /* ======================== CHỦ ĐỀ 8: PHÉP NHÂN, PHÉP CHIA ======================== */
  T.knt_thuaso_tich={
    title:"Thừa số, tích",
    learn:{ intro:"Trong phép nhân, các số đem nhân với nhau gọi là thừa số. Kết quả của phép nhân gọi là tích.",
      blocks:[
        {type:"concept", text:"Ta có phép nhân:", big:"2 × 3 = 6"},
        {type:"example", html:"<b>2</b> và <b>3</b> là <b>thừa số</b>, <b>6</b> là <b>tích</b>."},
        {type:"groupviz", mode:"mul", groups:3, per:2, icon:"🍎", text:"3 đĩa, mỗi đĩa 2 quả táo. Tất cả có bao nhiêu quả táo?"},
        {type:"example", html:"<b>Nhớ nhé:</b> Thừa số × Thừa số = Tích. Ví dụ: 5 × 4 = 20 — 5 và 4 là thừa số, 20 là tích."}
      ]},
    practice:[
      {type:"mc", q:"Trong phép nhân 4 × 5 = 20, số 20 gọi là gì?", options:["Tích","Thừa số","Tổng","Hiệu"], answer:0, hint:"Kết quả của phép nhân gọi là tích"},
      {type:"fill", q:"Tính tích của 3 và 4", answer:12, hint:"3 × 4"},
      {type:"mc", q:"Trong phép nhân 5 × 2 = 10, hai thừa số là:", options:["5 và 2","5 và 10","2 và 10","10"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính tích của 2 và 7", answer:14},
      {type:"mc", q:"Trong phép nhân 3 × 6 = 18, số 18 gọi là gì?", options:["Tích","Thừa số","Hiệu","Tổng"], answer:0},
      {type:"mc", q:"Tích của 5 và 3 là:", options:["15","8","53","12"], answer:0},
    ],
    gen:[
      ()=>{ const a=R(2,5), b=R(2,5); return fillQ(`Tính tích của ${a} và ${b}`, a*b, {hint:`${a} × ${b}`}); },
      ()=>{ const a=R(2,5), b=R(2,5);
        return mcText(`Trong phép nhân ${a} × ${b} = ${a*b}, số ${a*b} gọi là gì?`,"Tích",["Thừa số","Tổng","Hiệu"],{hint:"Kết quả của phép nhân gọi là tích"}); },
      ()=>{ const a=R(2,5), b=R(2,5), c=a*b;
        return mcNum(`Trong phép nhân ${a} × ${b} = ${c}, số nào là tích?`, c, ()=>P([a,b,a+b,c+R(1,3)])); },
      ()=>{ const a=R(2,5), b=R(2,5);
        return mcText(`Trong phép nhân ${a} × ${b} = ${a*b}, hai thừa số là:`, `${a} và ${b}`, [`${a} và ${a*b}`,`${b} và ${a*b}`,`${a*b}`,`${a+b}`]); },
    ]
  };

  T.knt_nhan5={
    title:"Bảng nhân 5",
    learn:{ intro:"Bảng nhân 5 gồm các phép nhân có một thừa số là 5. Mỗi lần thêm 1 nhóm, kết quả tăng thêm 5.",
      blocks:[
        {type:"concept", text:"5 × 3 nghĩa là lấy số 5 cộng 3 lần:", big:"5 + 5 + 5 = 15"},
        {type:"groupviz", mode:"mul", groups:3, per:5, icon:"⭐", text:"3 hộp, mỗi hộp 5 ngôi sao:"},
        {type:"example", html:"<b>Bảng nhân 5:</b> "+tableList(5)},
        {type:"example", html:"<b>Mẹo:</b> Kết quả trong bảng nhân 5 luôn tận cùng bằng 0 hoặc 5."}
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"5 × 4", answer:20, hint:"5 + 5 + 5 + 5"},
      {type:"mc", q:"5 × 6 = ?", options:["25","30","35","11"], answer:1, hint:"Đếm cách 5: 5, 10, 15, 20, 25, 30"},
      {type:"fill", q:"Mỗi bàn tay có 5 ngón tay. 3 bàn tay có bao nhiêu ngón tay?", answer:15, hint:"5 × 3"},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"5 × 7", answer:35},
      {type:"mc", q:"5 × 9 = ?", options:["45","40","14","54"], answer:0},
      {type:"fill", q:"Mỗi hộp có 5 cái bánh. 8 hộp có bao nhiêu cái bánh?", answer:40},
    ],
    gen:[
      ()=>{ const t=R(1,10); return {type:"fill", q:"Tính:", expr:`5 × ${t}`, answer:5*t, hint:Array(t).fill(5).join('+')}; },
      ()=>{ const t=R(2,10); return mcNum(`5 × ${t} = ?`, 5*t, near(5*t)); },
      ()=>{ const t=R(2,10); return fillQ(`Mỗi bàn tay có 5 ngón tay. ${t} bàn tay có bao nhiêu ngón tay?`, 5*t, {hint:`5 × ${t}`}); },
      ()=>{ const t=R(2,6); return fillQ(`Mỗi hộp có 5 cái bánh. Có ${t} hộp. Tất cả có bao nhiêu cái bánh?`, 5*t,
        {visual:"🍪".repeat(t), vsmall:true, hint:`5 × ${t}`}); },
      ()=>{ const t=R(1,10); const c=5*t;
        return mcNum("Số nào có trong bảng nhân 5?", c, ()=>{ let x; do{ x=R(6,48); }while(x%5===0); return x; }); },
    ]
  };

  T.knt_chia={
    title:"Phép chia",
    learn:{ intro:"Khi chia đều một số đồ vật thành các nhóm bằng nhau, ta dùng phép chia. Dấu chia viết là dấu hai chấm ( : ).",
      blocks:[
        {type:"groupviz", mode:"div", total:6, groups:2, icon:"🍎", text:"Chia đều 6 quả táo vào 2 đĩa. Mỗi đĩa có mấy quả?"},
        {type:"example", html:"<b>6 : 2 = 3</b> — đọc là: sáu chia hai bằng ba."},
        {type:"groupviz", mode:"div", total:8, per:4, icon:"🍪", text:"Có 8 cái bánh, xếp mỗi đĩa 4 cái. Xếp được mấy đĩa?"},
        {type:"example", html:"<b>8 : 4 = 2</b> — chia 8 cái bánh, mỗi đĩa 4 cái thì được 2 đĩa."}
      ]},
    practice:[
      {type:"fill", q:"Có 8 quả cam chia đều vào 2 đĩa. Mỗi đĩa có mấy quả?", answer:4, hint:"8 : 2"},
      {type:"mc", q:"6 : 2 = ?", options:["3","4","8","2"], answer:0},
      {type:"fill", q:"Có 10 cái kẹo, mỗi túi 5 cái. Được mấy túi kẹo?", answer:2, hint:"10 : 5"},
    ],
    test:[
      {type:"fill", q:"Có 12 quả táo chia đều vào 3 đĩa. Mỗi đĩa có mấy quả?", answer:4},
      {type:"mc", q:"15 : 5 = ?", options:["3","10","20","5"], answer:0},
      {type:"fill", q:"Có 9 quyển vở, mỗi bạn 3 quyển. Chia được cho mấy bạn?", answer:3},
    ],
    gen:[
      ()=>{ const g=R(2,5), per=R(1,5), tot=g*per;
        return fillQ(`Có ${tot} quả cam chia đều vào ${g} đĩa. Mỗi đĩa có mấy quả?`, per,
          Object.assign({hint:`${tot} : ${g}`}, tot<=10?{visual:"🍊".repeat(tot), vsmall:true}:{})); },
      ()=>{ const g=R(2,5), per=R(2,5), tot=g*per;
        return fillQ(`Có ${tot} cái bánh, xếp mỗi đĩa ${per} cái. Xếp được mấy đĩa?`, g, {hint:`${tot} : ${per}`}); },
      ()=>{ const g=R(2,5), per=R(1,5), tot=g*per;
        return {type:"fill", q:"Tính:", expr:`${tot} : ${g}`, answer:per, hint:`${g} × ? = ${tot}`}; },
      ()=>{ const g=R(2,5), per=R(1,5), tot=g*per;
        return mcNum(`${tot} : ${g} = ?`, per, near(per)); },
    ]
  };

  T.knt_chia_thanhphan={
    title:"Số bị chia, số chia, thương",
    learn:{ intro:"Trong phép chia, số đem chia gọi là số bị chia, số dùng để chia gọi là số chia, kết quả gọi là thương.",
      blocks:[
        {type:"concept", text:"Ta có phép chia:", big:"6 : 2 = 3"},
        {type:"example", html:"<b>6</b> là <b>số bị chia</b>, <b>2</b> là <b>số chia</b>, <b>3</b> là <b>thương</b>."},
        {type:"groupviz", mode:"div", total:10, groups:5, icon:"⭐", text:"Chia đều 10 ngôi sao vào 5 hộp. Mỗi hộp có mấy ngôi sao?"},
        {type:"example", html:"<b>Mối quan hệ:</b> Từ 2 × 3 = 6 ta có 6 : 2 = 3 và 6 : 3 = 2."}
      ]},
    practice:[
      {type:"mc", q:"Trong phép chia 12 : 3 = 4, số 4 gọi là gì?", options:["Thương","Số bị chia","Số chia","Tích"], answer:0},
      {type:"fill", q:"Tính thương, biết số bị chia là 20 và số chia là 5", answer:4, hint:"20 : 5"},
      {type:"mc", q:"Trong phép chia 15 : 5 = 3, số 15 gọi là gì?", options:["Số bị chia","Số chia","Thương","Thừa số"], answer:0},
    ],
    test:[
      {type:"mc", q:"Trong phép chia 18 : 2 = 9, số 2 gọi là gì?", options:["Số chia","Số bị chia","Thương","Tích"], answer:0},
      {type:"fill", q:"Từ phép nhân 5 × 4 = 20, ta có 20 : 5 = ?", answer:4},
      {type:"fill", q:"Tính thương, biết số bị chia là 16 và số chia là 2", answer:8},
    ],
    gen:[
      ()=>{ const b=R(2,5), c=R(2,9), a=b*c; const role=P([["số bị chia",a],["số chia",b],["thương",c]]);
        return mcNum(`Trong phép chia ${a} : ${b} = ${c}, số nào là ${role[0]}?`, role[1], ()=>P([a,b,c,b+c,a+1])); },
      ()=>{ const b=R(2,5), c=R(2,9), a=b*c;
        return fillQ(`Tính thương, biết số bị chia là ${a} và số chia là ${b}`, c, {hint:`${a} : ${b}`}); },
      ()=>{ const b=R(2,5), c=R(2,9), a=b*c;
        return fillQ(`Từ phép nhân ${b} × ${c} = ${a}, ta có ${a} : ${b} = ?`, c); },
      ()=>{ const b=R(2,5), c=R(2,9), a=b*c; const role=P([["thương","Thương"],["số chia","Số chia"],["số bị chia","Số bị chia"]]);
        const val=role[0]==="thương"?c:(role[0]==="số chia"?b:a);
        return mcText(`Trong phép chia ${a} : ${b} = ${c}, số ${val} gọi là gì?`, role[1], ["Thương","Số chia","Số bị chia","Tích"]); },
    ]
  };

  function chiaBang(n){
    const per=(n===2?4:3);
    return {
      title:`Bảng chia ${n}`,
      learn:{ intro:`Bảng chia ${n} được lập từ bảng nhân ${n}: vì ${n} × 4 = ${n*4} nên ${n*4} : ${n} = 4.`,
        blocks:[
          {type:"concept", text:`Từ phép nhân ${n} × 4 = ${n*4} ta có phép chia:`, big:`${n*4} : ${n} = 4`},
          {type:"groupviz", mode:"div", total:n*per, groups:n, icon:n===2?"🍪":"⭐", text:`Chia đều ${n*per} ${n===2?"cái bánh":"ngôi sao"} vào ${n} nhóm. Mỗi nhóm có mấy?`},
          {type:"example", html:`<b>Bảng chia ${n}:</b> `+divList(n)},
          {type:"example", html:`<b>Mẹo:</b> Muốn chia cho ${n}, hãy nghĩ đến bảng nhân ${n}.`}
        ]},
      practice:[
        {type:"fill", q:"Tính:", expr:`${n*3} : ${n}`, answer:3, hint:`${n} × ? = ${n*3}`},
        {type:"mc", q:`${n*5} : ${n} = ?`, options:["5",String(n*5),"4","6"], answer:0},
        {type:"fill", q:`Có ${n*2} cái kẹo chia đều cho ${n} bạn. Mỗi bạn được mấy cái?`, answer:2, hint:`${n*2} : ${n}`},
      ],
      test:[
        {type:"fill", q:"Tính:", expr:`${n*6} : ${n}`, answer:6},
        {type:"fill", q:`Có ${n*7} quả cam chia đều vào ${n} đĩa. Mỗi đĩa có mấy quả?`, answer:7},
        {type:"fill", q:"Tính:", expr:`${n*9} : ${n}`, answer:9},
      ],
      gen:[
        ()=>{ const t=R(1,10); return {type:"fill", q:"Tính:", expr:`${n*t} : ${n}`, answer:t, hint:`${n} × ? = ${n*t}`}; },
        ()=>{ const t=R(1,10); return mcNum(`${n*t} : ${n} = ?`, t, near(t)); },
        ()=>{ const t=R(2,10); return fillQ(`Có ${n*t} cái kẹo chia đều cho ${n} bạn. Mỗi bạn được mấy cái?`, t, {hint:`${n*t} : ${n}`}); },
        ()=>{ const t=R(2,10); return fillQ(`Từ phép nhân ${n} × ${t} = ${n*t}, ta có ${n*t} : ${n} = ?`, t); },
      ]
    };
  }
  T.knt_chia2=chiaBang(2);
  T.knt_chia5=chiaBang(5);

  T.knt_ontap_nhanchia={
    title:"Luyện tập chung (Phép nhân, phép chia)",
    learn:{ intro:"Lật từng trang để ôn lại phép nhân, phép chia, bảng nhân 2, 5 và bảng chia 2, 5 nhé!",
      pages:[
        { title:"Bài 37–38. Phép nhân, thừa số – tích", blocks:[
          {type:"groupviz", mode:"mul", groups:2, per:3, icon:"🍪", text:"2 đĩa, mỗi đĩa 3 cái bánh:"},
          {type:"example", html:"<b>3 × 2 = 6</b>: 3 và 2 là thừa số, 6 là tích."}
        ]},
        { title:"Bài 39–40. Bảng nhân 2 và bảng nhân 5", blocks:[
          {type:"cuuchuong", nums:[2,5]},
          {type:"example", html:"<b>Mẹo:</b> Bảng nhân 2: kết quả là số chẵn. Bảng nhân 5: kết quả tận cùng 0 hoặc 5."}
        ]},
        { title:"Bài 41–42. Phép chia, số bị chia – số chia – thương", blocks:[
          {type:"groupviz", mode:"div", total:6, groups:3, icon:"🍎", text:"Chia đều 6 quả táo vào 3 đĩa:"},
          {type:"example", html:"<b>6 : 3 = 2</b>: 6 là số bị chia, 3 là số chia, 2 là thương."}
        ]},
        { title:"Bài 43–44. Bảng chia 2 và bảng chia 5", blocks:[
          {type:"concept", text:"Từ 2 × 5 = 10 ta có:", big:"10 : 2 = 5"},
          {type:"concept", text:"Từ 5 × 4 = 20 ta có:", big:"20 : 5 = 4"},
          {type:"example", html:"<b>Ghi nhớ:</b> Muốn chia cho 2 hoặc 5, nghĩ đến bảng nhân 2 hoặc bảng nhân 5."}
        ]},
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"2 × 8", answer:16},
      {type:"fill", q:"Tính:", expr:"20 : 5", answer:4},
      {type:"mc", q:"Trong phép chia 14 : 2 = 7, số 7 gọi là gì?", options:["Thương","Số chia","Số bị chia","Tích"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"5 × 6", answer:30},
      {type:"fill", q:"Tính:", expr:"18 : 2", answer:9},
      {type:"mc", q:"Trong phép nhân 5 × 4 = 20, số 20 gọi là gì?", options:["Tích","Thừa số","Thương","Hiệu"], answer:0},
    ],
    gen:[]   // gắn ở cuối file từ các bài thành phần
  };

  /* ======================== CHỦ ĐỀ 9: LÀM QUEN VỚI HÌNH KHỐI ======================== */
  const KHOI_CAU=[["quả bóng đá","⚽"],["quả cam","🍊"],["viên bi",""],["quả bóng bàn",""],["quả địa cầu",""],["quả bóng rổ",""]];
  const KHOI_TRU=[["lon nước ngọt",""],["cuộn giấy",""],["hộp sữa tròn",""],["khúc gỗ tròn",""],["cây nến to",""],["cái trống",""]];
  T.knt_khoi={
    title:"Khối trụ, khối cầu",
    learn:{ intro:"Xung quanh ta có nhiều vật có dạng khối trụ hoặc khối cầu. Ta học nhận biết hai khối này.",
      blocks:[
        {type:"wordcards", items:[
          {word:"khối trụ", custom:"cylinder"}, {word:"lon nước", custom:"can"},
          {word:"khối cầu", custom:"sphere"}, {word:"quả bóng", icon:"⚽"}
        ]},
        {type:"example", html:"<b>Khối trụ</b> có hai mặt đáy là hai hình tròn ở hai đầu, như cái lon nước."},
        {type:"example", html:"<b>Khối cầu</b> tròn đều mọi phía, như quả bóng, quả cam."}
      ]},
    practice:[
      {type:"mc", q:"Quả bóng có dạng khối gì?", options:["Khối cầu","Khối trụ"], answer:0, two:true, visual:"⚽"},
      {type:"mc", q:"Lon nước ngọt có dạng khối gì?", options:["Khối trụ","Khối cầu"], answer:0, two:true},
      {type:"mc", q:"Khối nào có hai mặt đáy là hai hình tròn?", options:["Khối trụ","Khối cầu"], answer:0, two:true},
    ],
    test:[
      {type:"mc", q:"Quả cam có dạng khối gì?", options:["Khối cầu","Khối trụ"], answer:0, two:true, visual:"🍊"},
      {type:"mc", q:"Cuộn giấy có dạng khối gì?", options:["Khối trụ","Khối cầu"], answer:0, two:true},
      {type:"mc", q:"Viên bi có dạng khối gì?", options:["Khối cầu","Khối trụ"], answer:0, two:true},
    ],
    gen:[
      ()=>{ const it=P(KHOI_CAU); const opts=shuffleArr(["Khối cầu","Khối trụ"]);
        return Object.assign({type:"mc", q:`${it[0][0].toUpperCase()+it[0].slice(1)} có dạng khối gì?`, options:opts, answer:opts.indexOf("Khối cầu"), two:true}, it[1]?{visual:it[1]}:{}); },
      ()=>{ const it=P(KHOI_TRU); const opts=shuffleArr(["Khối cầu","Khối trụ"]);
        return {type:"mc", q:`${it[0][0].toUpperCase()+it[0].slice(1)} có dạng khối gì?`, options:opts, answer:opts.indexOf("Khối trụ"), two:true}; },
      ()=>{ const isTru=Math.random()<0.5; const opts=shuffleArr(["Khối cầu","Khối trụ"]);
        return {type:"mc", q:isTru?"Khối nào có hai mặt đáy là hai hình tròn?":"Khối nào tròn đều mọi phía, lăn được theo mọi hướng?",
          options:opts, answer:opts.indexOf(isTru?"Khối trụ":"Khối cầu"), two:true}; },
    ]
  };

  T.knt_luyentap_khoi={
    title:"Luyện tập chung (Hình khối)",
    learn:{ intro:"Ôn lại khối trụ và khối cầu: nhận ra các vật có dạng khối trụ, khối cầu quanh em.",
      blocks:[
        {type:"wordcards", items:[
          {word:"khối trụ", custom:"cylinder"}, {word:"khối cầu", custom:"sphere"},
          {word:"quả cam", icon:"🍊"}, {word:"lon nước", custom:"can"}
        ]},
        {type:"example", html:"<b>Ghi nhớ:</b> Quả bóng, quả cam, viên bi là <b>khối cầu</b>. Lon nước, cuộn giấy, hộp sữa tròn là <b>khối trụ</b>."}
      ]},
    practice:[
      {type:"mc", q:"Trong các vật: quả bóng, lon nước, quả cam, cuộn giấy — có mấy vật là khối cầu?", options:["2","1","3","4"], answer:0, hint:"Quả bóng và quả cam"},
      {type:"mc", q:"Trong các vật: viên bi, hộp sữa tròn, khúc gỗ tròn — có mấy vật là khối trụ?", options:["2","1","3","0"], answer:0},
      {type:"mc", q:"Quả địa cầu có dạng khối gì?", options:["Khối cầu","Khối trụ"], answer:0, two:true},
    ],
    test:[
      {type:"mc", q:"Trong các vật: lon nước, cuộn giấy, cây nến to, quả bóng — có mấy vật là khối trụ?", options:["3","1","2","4"], answer:0},
      {type:"mc", q:"Quả bóng rổ có dạng khối gì?", options:["Khối cầu","Khối trụ"], answer:0, two:true},
      {type:"mc", q:"Hộp sữa tròn có dạng khối gì?", options:["Khối trụ","Khối cầu"], answer:0, two:true},
    ],
    gen:[
      ()=>{ const k=R(1,3); const cau=shuffleArr(KHOI_CAU).slice(0,k), tru=shuffleArr(KHOI_TRU).slice(0,4-k);
        const items=shuffleArr(cau.concat(tru)).map(x=>x[0]);
        return mcNum(`Trong các vật: ${items.join(", ")} — có mấy vật là khối cầu?`, k, ()=>R(0,4)); },
      ()=>{ const k=R(1,3); const tru=shuffleArr(KHOI_TRU).slice(0,k), cau=shuffleArr(KHOI_CAU).slice(0,4-k);
        const items=shuffleArr(cau.concat(tru)).map(x=>x[0]);
        return mcNum(`Trong các vật: ${items.join(", ")} — có mấy vật là khối trụ?`, k, ()=>R(0,4)); },
    ]
  };

  /* ======================== CHỦ ĐỀ 10: CÁC SỐ TRONG PHẠM VI 1 000 ======================== */
  T.knt_donvi_chuc_tram={
    title:"Đơn vị, chục, trăm, nghìn",
    learn:{ intro:"10 đơn vị là 1 chục. 10 chục là 1 trăm. 10 trăm là 1 nghìn. Con tự dựng số bằng nút + và − nhé!",
      blocks:[
        {type:"placevalue", thousand:true, h:1, t:2, u:3, text:"Bấm + / − ở từng hàng để dựng số:"},
        {type:"concept", text:"10 đơn vị = 1 chục, 10 chục = 1 trăm:", big:"10 chục = 100"},
        {type:"example", html:"<b>1 trăm</b> = 10 chục = 100 đơn vị. <b>10 trăm</b> = <b>1 nghìn</b> = 1 000."}
      ]},
    practice:[
      {type:"fill", q:"5 chục bằng bao nhiêu đơn vị?", answer:50, hint:"1 chục = 10 đơn vị"},
      {type:"fill", q:"30 đơn vị bằng mấy chục?", answer:3},
      {type:"fill", q:"2 trăm bằng bao nhiêu chục?", answer:20, hint:"1 trăm = 10 chục"},
    ],
    test:[
      {type:"fill", q:"7 chục bằng bao nhiêu đơn vị?", answer:70},
      {type:"fill", q:"4 trăm bằng bao nhiêu đơn vị?", answer:400},
      {type:"mc", q:"10 trăm bằng bao nhiêu?", options:["1 nghìn","1 chục","100","10"], answer:0},
    ],
    gen:[
      ()=>{ const n=R(2,9); return fillQ(`${n} chục bằng bao nhiêu đơn vị?`, n*10, {hint:"1 chục = 10 đơn vị"}); },
      ()=>{ const n=R(2,9); return fillQ(`${n*10} đơn vị bằng mấy chục?`, n); },
      ()=>{ const n=R(2,9); return fillQ(`${n} trăm bằng bao nhiêu chục?`, n*10, {hint:"1 trăm = 10 chục"}); },
      ()=>{ const n=R(1,9); return fillQ(`${n} trăm bằng bao nhiêu đơn vị?`, n*100, {hint:"1 trăm = 100 đơn vị"}); },
      ()=>{ const n=R(2,9); return fillQ(`${n*10} chục bằng mấy trăm?`, n, {hint:"10 chục = 1 trăm"}); },
    ]
  };

  T.knt_tron_tram_chuc={
    title:"Các số tròn trăm, tròn chục",
    learn:{ intro:"Số tròn chục là số có chữ số hàng đơn vị bằng 0. Số tròn trăm là số có hai chữ số tận cùng đều bằng 0.",
      blocks:[
        {type:"concept", text:"Các số tròn chục:", big:"10, 20, 30, 40, 50 …"},
        {type:"concept", text:"Các số tròn trăm:", big:"100, 200, 300, 400, 500 …"},
        {type:"barcompare", items:[{n:100},{n:200},{n:300},{n:400}]},
        {type:"example", html:"<b>Nhớ nhé:</b> Số tròn trăm cũng là số tròn chục (ví dụ 300 = 30 chục)."}
      ]},
    practice:[
      {type:"fill", q:"Điền số: 100, 200, 300, ?", answer:400},
      {type:"fill", q:"Điền số: 10, 20, 30, ?", answer:40},
      {type:"mc", q:"Số nào là số tròn trăm?", options:["500","450","505","55"], answer:0},
    ],
    test:[
      {type:"fill", q:"Điền số: 600, 700, ?, 900", answer:800},
      {type:"mc", q:"Số nào là số tròn chục?", options:["80","85","8","108"], answer:0},
      {type:"fill", q:"Điền số: 50, 60, 70, ?", answer:80},
    ],
    gen:[
      ()=>{ const s=R(1,6)*10; return fillQ(`Điền số: ${s}, ${s+10}, ${s+20}, ?`, s+30); },
      ()=>{ const s=R(1,5)*100; return fillQ(`Điền số: ${s}, ${s+100}, ${s+200}, ?`, s+300); },
      ()=>{ const c=R(1,9)*100; return mcNum("Số nào là số tròn trăm?", c, ()=>{ let x; do{ x=R(101,999); }while(x%100===0); return x; }); },
      ()=>{ const c=R(1,98)*10; return mcNum("Số nào là số tròn chục?", c, ()=>{ let x; do{ x=R(11,999); }while(x%10===0); return x; }); },
      ()=>{ const n=R(1,98)*10; return fillQ(`Số tròn chục liền sau số ${n} là số nào?`, n+10); },
    ]
  };

  T.knt_sosanh_tron={
    title:"So sánh các số tròn trăm, tròn chục",
    learn:{ intro:"Muốn so sánh các số tròn trăm, ta so sánh số trăm. Muốn so sánh các số tròn chục, ta so sánh số chục.",
      blocks:[
        {type:"concept", text:"3 trăm bé hơn 5 trăm, nên:", big:"300 < 500"},
        {type:"barcompare", items:[{n:300},{n:500},{n:200},{n:400}]},
        {type:"example", html:"<b>Ví dụ:</b> 70 &gt; 40 vì 7 chục lớn hơn 4 chục. 600 = 600 vì cùng 6 trăm."}
      ]},
    practice:[
      {type:"mc", q:"So sánh: 300 ? 500", options:SYM, answer:0},
      {type:"mc", q:"So sánh: 80 ? 60", options:SYM, answer:1},
      {type:"mc", q:"Số nào lớn nhất: 200, 700, 500?", options:["700","200","500","không có"], answer:0},
    ],
    test:[
      {type:"mc", q:"So sánh: 400 ? 400", options:SYM, answer:2},
      {type:"mc", q:"Số nào bé nhất: 90, 30, 60?", options:["30","90","60","không có"], answer:0},
      {type:"mc", q:"So sánh: 900 ? 800", options:SYM, answer:1},
    ],
    gen:[
      ()=>{ const a=R(1,9)*100, b=Math.random()<0.2?a:R(1,9)*100; return {type:"mc", q:`So sánh: ${a} ? ${b}`, options:SYM, answer:cmpSymbol(a,b)}; },
      ()=>{ const a=R(1,99)*10, b=Math.random()<0.2?a:R(1,99)*10; return {type:"mc", q:`So sánh: ${a} ? ${b}`, options:SYM, answer:cmpSymbol(a,b)}; },
      ()=>{ const s=shuffleArr([1,2,3,4,5,6,7,8,9]).slice(0,3).map(x=>x*100), c=Math.max(...s);
        return mcNum(`Số nào lớn nhất trong các số ${s.join(", ")}?`, c, ()=>P(s.concat([R(1,9)*100]))); },
      ()=>{ const s=shuffleArr([1,2,3,4,5,6,7,8,9]).slice(0,3).map(x=>x*10), c=Math.min(...s);
        return mcNum(`Số nào bé nhất trong các số ${s.join(", ")}?`, c, ()=>P(s.concat([R(1,9)*10]))); },
    ]
  };

  T.knt_so3chuso={
    title:"Số có ba chữ số",
    learn:{ intro:"Số có ba chữ số gồm hàng trăm, hàng chục và hàng đơn vị. Con hãy dựng thử các số bằng nút + và −.",
      blocks:[
        {type:"placevalue", h:3, t:4, u:5, text:"Số có 3 trăm, 4 chục, 5 đơn vị. Con thử đổi các hàng nhé:"},
        {type:"concept", text:"Số gồm 3 trăm 4 chục 5 đơn vị là:", big:"345"},
        {type:"example", html:"<b>Đọc số:</b> 345 đọc là <b>"+readNum(345)+"</b>."},
        {type:"example", html:"<b>Cách viết:</b> Viết chữ số hàng trăm, rồi hàng chục, rồi hàng đơn vị."}
      ]},
    practice:[
      {type:"fill", q:"Số gồm 2 trăm 5 chục 6 đơn vị là số nào?", answer:256},
      {type:"fill", q:"Số 438 có chữ số hàng trăm là:", answer:4},
      {type:"mc", q:"Số 120 đọc là:", options:["Một trăm hai mươi","Một trăm linh hai","Một trăm mười hai","Hai trăm mười"], answer:0},
    ],
    test:[
      {type:"fill", q:"Số gồm 7 trăm 1 chục 8 đơn vị là số nào?", answer:718},
      {type:"fill", q:"Số 905 có chữ số hàng đơn vị là:", answer:5},
      {type:"mc", q:"Số 350 đọc là:", options:["Ba trăm năm mươi","Ba trăm linh năm","Ba trăm mười lăm","Năm trăm ba mươi"], answer:0},
    ],
    gen:[
      ()=>{ const h=R(1,9), t=R(0,9), u=R(0,9);
        return fillQ(`Số gồm ${h} trăm ${t} chục ${u} đơn vị là số nào?`, h*100+t*10+u); },
      ()=>{ const n=R(100,999), k=R(0,2); const name=["hàng trăm","hàng chục","hàng đơn vị"][k];
        const ans=[Math.floor(n/100), Math.floor(n/10)%10, n%10][k];
        return fillQ(`Số ${n} có chữ số ${name} là:`, ans); },
      ()=>{ const n=safeReadNum(); const pool=[]; for(let i=0;i<8;i++){ pool.push(readNum(safeReadNum())); }
        return mcText(`Số ${n} đọc là:`, readNum(n), pool); },
      ()=>{ const n=safeReadNum(); const h=Math.floor(n/100), t=Math.floor(n/10)%10, u=n%10;
        return mcNum(`Số "${readNum(n)}" viết là:`, n, ()=>P([h*100+u*10+t, t*100+h*10+u, (h%9+1)*100+t*10+u, h*100+((t+1)%10)*10+u])); },
    ]
  };

  T.knt_viet_tong={
    title:"Viết số thành tổng các trăm, chục, đơn vị",
    learn:{ intro:"Mỗi số có ba chữ số có thể viết thành tổng của số trăm, số chục và số đơn vị.",
      blocks:[
        {type:"placevalue", h:3, t:4, u:5, fixed:true, text:"Số 345 gồm:"},
        {type:"concept", text:"Viết số thành tổng:", big:"345 = 300 + 40 + 5"},
        {type:"example", html:"<b>Ví dụ:</b> 728 = 700 + 20 + 8. &nbsp; 905 = 900 + 0 + 5 = 900 + 5."}
      ]},
    practice:[
      {type:"fill", q:"Viết số thành tổng: 456 = 400 + 50 + ?", answer:6},
      {type:"fill", q:"Viết số thành tổng: 273 = 200 + ? + 3", answer:70},
      {type:"fill", q:"Tính: 600 + 30 + 8 = ?", answer:638},
    ],
    test:[
      {type:"fill", q:"Viết số thành tổng: 582 = 500 + 80 + ?", answer:2},
      {type:"fill", q:"Tính: 900 + 10 + 7 = ?", answer:917},
      {type:"fill", q:"Viết số thành tổng: 361 = ? + 60 + 1", answer:300},
    ],
    gen:[
      ()=>{ const h=R(1,9), t=R(1,9), u=R(1,9); return fillQ(`Viết số thành tổng: ${h*100+t*10+u} = ${h*100} + ${t*10} + ?`, u); },
      ()=>{ const h=R(1,9), t=R(1,9), u=R(1,9); return fillQ(`Viết số thành tổng: ${h*100+t*10+u} = ${h*100} + ? + ${u}`, t*10); },
      ()=>{ const h=R(1,9), t=R(1,9), u=R(1,9); return fillQ(`Viết số thành tổng: ${h*100+t*10+u} = ? + ${t*10} + ${u}`, h*100); },
      ()=>{ const h=R(1,9), t=R(1,9), u=R(1,9); return fillQ(`Tính: ${h*100} + ${t*10} + ${u} = ?`, h*100+t*10+u); },
    ]
  };

  T.knt_sosanh_3cs={
    title:"So sánh các số có ba chữ số",
    learn:{ intro:"Muốn so sánh hai số có ba chữ số, ta so sánh từng hàng từ trái sang phải: hàng trăm, rồi hàng chục, rồi hàng đơn vị.",
      blocks:[
        {type:"concept", text:"Cùng 5 trăm, 2 chục lớn hơn 1 chục nên:", big:"526 > 518"},
        {type:"barcompare", items:[{n:526},{n:518},{n:493}]},
        {type:"example", html:"<b>Cách so sánh:</b> Số nào có nhiều trăm hơn thì lớn hơn. Cùng số trăm thì so sánh số chục. Cùng số chục thì so sánh số đơn vị."}
      ]},
    practice:[
      {type:"mc", q:"So sánh: 345 ? 354", options:SYM, answer:0, hint:"Cùng 3 trăm, so sánh chục: 4 chục < 5 chục"},
      {type:"mc", q:"So sánh: 708 ? 699", options:SYM, answer:1, hint:"7 trăm > 6 trăm"},
      {type:"mc", q:"Số nào lớn nhất: 432, 423, 342?", options:["432","423","342","bằng nhau"], answer:0},
    ],
    test:[
      {type:"mc", q:"So sánh: 561 ? 567", options:SYM, answer:0},
      {type:"mc", q:"So sánh: 250 ? 250", options:SYM, answer:2},
      {type:"mc", q:"Số nào bé nhất: 819, 891, 189?", options:["189","819","891","bằng nhau"], answer:0},
    ],
    gen:[
      ()=>{ const h=R(1,9), t=R(0,9), u=R(0,9); const a=h*100+t*10+u; let b;
        const m=Math.random();
        if(m<0.4){ b=h*100+R(0,9)*10+u; } else if(m<0.7){ b=h*100+t*10+R(0,9); } else { b=R(100,999); }
        return {type:"mc", q:`So sánh: ${a} ? ${b}`, options:SYM, answer:cmpSymbol(a,b)}; },
      ()=>{ const s=shuffleArr(Array.from({length:50},()=>R(100,999))).filter((x,i,arr)=>arr.indexOf(x)===i).slice(0,3);
        return mcNum(`Số nào lớn nhất trong các số ${s.join(", ")}?`, Math.max(...s), ()=>P(s.concat([R(100,999)]))); },
      ()=>{ const s=shuffleArr(Array.from({length:50},()=>R(100,999))).filter((x,i,arr)=>arr.indexOf(x)===i).slice(0,3);
        return mcNum(`Số nào bé nhất trong các số ${s.join(", ")}?`, Math.min(...s), ()=>P(s.concat([R(100,999)]))); },
    ]
  };

  T.knt_luyentap_1000={
    title:"Luyện tập chung (Các số trong phạm vi 1 000)",
    learn:{ intro:"Lật từng trang để ôn lại các số trong phạm vi 1 000 nhé!",
      pages:[
        { title:"Bài 48. Đơn vị, chục, trăm, nghìn", blocks:[
          {type:"placevalue", thousand:true, h:2, t:0, u:0, text:"Dựng thử số có hàng nghìn, trăm, chục, đơn vị:"},
          {type:"example", html:"<b>Ghi nhớ:</b> 10 đơn vị = 1 chục; 10 chục = 1 trăm; 10 trăm = 1 nghìn."}
        ]},
        { title:"Bài 49–50. Số tròn trăm, tròn chục; so sánh", blocks:[
          {type:"barcompare", items:[{n:200},{n:500},{n:300},{n:700}]},
          {type:"example", html:"<b>Ghi nhớ:</b> 200 &lt; 300 &lt; 500 &lt; 700. Số nào có nhiều trăm hơn thì lớn hơn."}
        ]},
        { title:"Bài 51–52. Số có ba chữ số, viết thành tổng", blocks:[
          {type:"placevalue", h:6, t:3, u:8, fixed:true, text:"Số 638 gồm:"},
          {type:"concept", text:"Viết số thành tổng:", big:"638 = 600 + 30 + 8"}
        ]},
        { title:"Bài 53. So sánh số có ba chữ số", blocks:[
          {type:"barcompare", items:[{n:526},{n:518},{n:493}]},
          {type:"example", html:"<b>Ghi nhớ:</b> So sánh hàng trăm trước, rồi hàng chục, rồi hàng đơn vị. 526 &gt; 518 &gt; 493."}
        ]},
      ]},
    practice:[
      {type:"fill", q:"Số gồm 4 trăm 0 chục 7 đơn vị là số nào?", answer:407},
      {type:"mc", q:"So sánh: 250 ? 520", options:SYM, answer:0},
      {type:"fill", q:"Điền số: 300, 400, 500, ?", answer:600},
    ],
    test:[
      {type:"fill", q:"Viết số thành tổng: 764 = 700 + 60 + ?", answer:4},
      {type:"mc", q:"Số nào lớn nhất: 380, 308, 830?", options:["830","380","308","bằng nhau"], answer:0},
      {type:"fill", q:"6 chục bằng bao nhiêu đơn vị?", answer:60},
    ],
    gen:[]
  };

  /* ======================== CHỦ ĐỀ 11: ĐỘ DÀI VÀ TIỀN VIỆT NAM ======================== */
  const UNIT_CHOICES=["cm","dm","m","km"];
  const UNIT_BANK=[
    ["Cái bút chì dài khoảng 15 …","cm"], ["Cửa ra vào của lớp cao khoảng 2 …","m"],
    ["Quãng đường từ Hà Nội đến Hải Phòng dài khoảng 100 …","km"], ["Cái bàn học cao khoảng 7 …","dm"],
    ["Chiều dài lớp học khoảng 8 …","m"], ["Quyển vở dài khoảng 24 …","cm"],
    ["Quãng đường từ nhà bạn Lan đến trường dài khoảng 2 …","km"], ["Chiều dài cái thước kẻ là 20 …","cm"],
  ];
  T.knt_dodai={
    title:"Đề-xi-mét, Mét, Ki-lô-mét",
    learn:{ intro:"Ngoài xăng-ti-mét (cm), ta còn dùng đề-xi-mét (dm), mét (m) và ki-lô-mét (km) để đo độ dài.",
      blocks:[
        {type:"ruler", start:0, end:10, max:12, unit:"cm", text:"Trên thước kẻ, từ vạch 0 đến vạch 10 dài 10 cm."},
        {type:"concept", text:"10 xăng-ti-mét bằng 1 đề-xi-mét:", big:"1 dm = 10 cm"},
        {type:"concept", text:"10 đề-xi-mét bằng 1 mét:", big:"1 m = 10 dm = 100 cm"},
        {type:"concept", text:"1 000 mét bằng 1 ki-lô-mét:", big:"1 km = 1 000 m"},
        {type:"example", html:"<b>Cách dùng:</b> đo vật nhỏ dùng cm, dm; đo chiều cao, chiều dài lớp học dùng m; đo quãng đường dài dùng km."}
      ]},
    practice:[
      {type:"fill", q:"3 dm bằng bao nhiêu cm?", answer:30, hint:"1 dm = 10 cm"},
      {type:"fill", q:"2 m bằng bao nhiêu dm?", answer:20, hint:"1 m = 10 dm"},
      {type:"mc", q:"Quãng đường từ Hà Nội đến Hải Phòng dài khoảng 100 …", options:UNIT_CHOICES, answer:3},
    ],
    test:[
      {type:"fill", q:"1 m bằng bao nhiêu cm?", answer:100},
      {type:"fill", q:"4 km bằng bao nhiêu m?", answer:4000},
      {type:"mc", q:"Cái bút chì dài khoảng 15 …", options:UNIT_CHOICES, answer:0},
    ],
    gen:[
      ()=>{ const n=R(2,9); return fillQ(`${n} dm bằng bao nhiêu cm?`, n*10, {hint:"1 dm = 10 cm"}); },
      ()=>{ const n=R(2,9); return fillQ(`${n} m bằng bao nhiêu dm?`, n*10, {hint:"1 m = 10 dm"}); },
      ()=>{ const n=R(1,9); return fillQ(`${n} m bằng bao nhiêu cm?`, n*100, {hint:"1 m = 100 cm"}); },
      ()=>{ const n=R(1,9); return fillQ(`${n} km bằng bao nhiêu m?`, n*1000, {hint:"1 km = 1 000 m"}); },
      ()=>{ const n=R(2,9); return fillQ(`${n*10} cm bằng bao nhiêu dm?`, n, {hint:"10 cm = 1 dm"}); },
      ()=>{ const it=P(UNIT_BANK); return {type:"mc", q:it[0], options:UNIT_CHOICES, answer:UNIT_CHOICES.indexOf(it[1])}; },
    ]
  };

  T.knt_tien={
    title:"Giới thiệu tiền Việt Nam",
    learn:{ intro:"Đơn vị tiền Việt Nam là đồng. Con làm quen với các tờ tiền 100 đồng, 200 đồng, 500 đồng và 1 000 đồng.",
      blocks:[
        {type:"wordcards", items:[
          {word:"100 đồng", custom:"note100"}, {word:"200 đồng", custom:"note200"},
          {word:"500 đồng", custom:"note500"}, {word:"1 000 đồng", custom:"note1000"}
        ]},
        {type:"example", html:"<b>Ví dụ:</b> 1 tờ 200 đồng và 1 tờ 500 đồng là 200 + 500 = 700 đồng."},
        {type:"example", html:"<b>Đổi tiền:</b> 2 tờ 500 đồng đổi được 1 tờ 1 000 đồng (500 + 500 = 1 000)."}
      ]},
    practice:[
      {type:"fill", q:"Có 1 tờ 200 đồng và 1 tờ 500 đồng. Tất cả có bao nhiêu đồng?", answer:700, hint:"200 + 500"},
      {type:"fill", q:"Mẹ đưa 1 000 đồng, mua bút hết 600 đồng. Được trả lại bao nhiêu đồng?", answer:400, hint:"1 000 − 600"},
      {type:"mc", q:"Tờ tiền nào có giá trị lớn nhất?", options:["500 đồng","200 đồng","100 đồng","50 đồng"], answer:0},
    ],
    test:[
      {type:"fill", q:"Có 3 tờ 100 đồng. Tất cả có bao nhiêu đồng?", answer:300},
      {type:"fill", q:"An có 500 đồng, mua tẩy hết 200 đồng. An còn bao nhiêu đồng?", answer:300},
      {type:"mc", q:"2 tờ 500 đồng là bao nhiêu đồng?", options:["1 000 đồng","700 đồng","500 đồng","1 500 đồng"], answer:0},
    ],
    gen:[
      ()=>{ const a=P([100,200,500]), b=P([100,200,500]);
        return fillQ(`Có 1 tờ ${a} đồng và 1 tờ ${b} đồng. Tất cả có bao nhiêu đồng?`, a+b, {hint:`${a} + ${b}`}); },
      ()=>{ const x=R(1,9)*100;
        return fillQ(`Mẹ đưa 1 000 đồng, mua đồ hết ${x} đồng. Được trả lại bao nhiêu đồng?`, 1000-x, {hint:`1 000 − ${x}`}); },
      ()=>{ const n=R(2,9); return fillQ(`Có ${n} tờ 100 đồng. Tất cả có bao nhiêu đồng?`, n*100, {hint:`100 × ${n}`}); },
      ()=>{ const vals=shuffleArr([100,200,500,1000]).slice(0,3), c=Math.max(...vals);
        const opts=vals.map(v=>fmt(v)+" đồng");
        return {type:"mc", q:"Tờ tiền nào có giá trị lớn nhất?", options:opts, answer:vals.indexOf(c)}; },
      ()=>{ const have=P([500,1000]), cost=R(1,have/100-1)*100;
        return fillQ(`Bạn Nam có ${fmt(have)} đồng, mua quyển vở hết ${cost} đồng. Nam còn lại bao nhiêu đồng?`, have-cost); },
    ]
  };

  T.knt_thuchanh_dodai={
    title:"Thực hành và trải nghiệm đo độ dài",
    learn:{ intro:"Muốn đo độ dài một vật bằng thước kẻ, con đặt vạch 0 của thước trùng với một đầu của vật, rồi đọc số ở đầu kia.",
      blocks:[
        {type:"ruler", start:0, end:12, max:15, unit:"cm", text:"Cái bút đặt từ vạch 0 đến vạch 12. Bút dài 12 cm."},
        {type:"ruler", start:3, end:10, max:15, unit:"cm", text:"Đoạn thẳng đặt từ vạch 3 đến vạch 10. Muốn biết dài bao nhiêu, ta lấy 10 − 3."},
        {type:"example", html:"<b>Các bước:</b> (1) Đặt vạch 0 trùng đầu vật. (2) Giữ thước thẳng, không xê dịch. (3) Nhìn số ở đầu kia của vật."}
      ]},
    practice:[
      {type:"fill", q:"Cái bút đặt từ vạch 0 đến vạch 14. Bút dài mấy cm?", answer:14},
      {type:"fill", q:"Đoạn thẳng đặt từ vạch 2 đến vạch 9 của thước. Đoạn thẳng dài mấy cm?", answer:7, hint:"9 − 2"},
      {type:"mc", q:"Khi đo độ dài, ta đặt vạch 0 của thước trùng với:", options:["một đầu của vật","giữa vật","vạch số 5","mép bàn"], answer:0},
    ],
    test:[
      {type:"fill", q:"Đoạn thẳng đặt từ vạch 4 đến vạch 13. Đoạn thẳng dài mấy cm?", answer:9},
      {type:"fill", q:"Cái thước đặt từ vạch 0 đến vạch 20. Dài mấy cm?", answer:20},
      {type:"fill", q:"Bút A dài 12 cm, bút B dài 9 cm. Bút A dài hơn bút B mấy cm?", answer:3},
    ],
    gen:[
      ()=>{ const a=R(0,6), len=R(2,9);
        return fillQ(`Đoạn thẳng đặt từ vạch ${a} đến vạch ${a+len} của thước. Đoạn thẳng dài mấy cm?`, len, {hint:`${a+len} − ${a}`}); },
      ()=>{ const b=R(6,20); return fillQ(`Cái bút đặt từ vạch 0 đến vạch ${b}. Bút dài mấy cm?`, b); },
      ()=>{ const x=R(8,20), y=R(3,x-1);
        return fillQ(`Sợi dây xanh dài ${x} cm, sợi dây đỏ dài ${y} cm. Sợi dây xanh dài hơn sợi dây đỏ mấy cm?`, x-y, {hint:`${x} − ${y}`}); },
      ()=>{ const x=R(4,12), y=R(4,12);
        return fillQ(`Đoạn thẳng AB dài ${x} cm, đoạn thẳng BC dài ${y} cm. Đường gấp khúc ABC dài mấy cm?`, x+y, {hint:`${x} + ${y}`}); },
    ]
  };

  T.knt_luyentap_dodai_tien={
    title:"Luyện tập chung (Độ dài, tiền Việt Nam)",
    learn:{ intro:"Lật từng trang để ôn lại đơn vị đo độ dài, tiền Việt Nam và cách đo bằng thước kẻ.",
      pages:[
        { title:"Bài 55. Đề-xi-mét, mét, ki-lô-mét", blocks:[
          {type:"concept", text:"Nhớ các đổi đơn vị:", big:"1 m = 10 dm = 100 cm"},
          {type:"example", html:"<b>1 dm</b> = 10 cm. &nbsp; <b>1 km</b> = 1 000 m."}
        ]},
        { title:"Bài 56. Tiền Việt Nam", blocks:[
          {type:"wordcards", items:[{word:"100 đồng", custom:"note100"},{word:"200 đồng", custom:"note200"},{word:"500 đồng", custom:"note500"},{word:"1 000 đồng", custom:"note1000"}]},
          {type:"example", html:"<b>Ví dụ:</b> 500 + 200 = 700 đồng. &nbsp; 2 tờ 500 đồng = 1 000 đồng."}
        ]},
        { title:"Bài 57. Đo độ dài bằng thước kẻ", blocks:[
          {type:"ruler", start:2, end:9, max:12, unit:"cm", text:"Đoạn thẳng từ vạch 2 đến vạch 9:"},
          {type:"example", html:"<b>Ghi nhớ:</b> độ dài = số ở đầu kia − số ở đầu này (khi không đặt vạch 0 trùng đầu vật)."}
        ]},
      ]},
    practice:[
      {type:"fill", q:"5 dm bằng bao nhiêu cm?", answer:50},
      {type:"fill", q:"Có 1 tờ 500 đồng và 1 tờ 200 đồng. Tất cả bao nhiêu đồng?", answer:700},
      {type:"fill", q:"Đoạn thẳng đặt từ vạch 1 đến vạch 8. Dài mấy cm?", answer:7},
    ],
    test:[
      {type:"fill", q:"3 m bằng bao nhiêu dm?", answer:30},
      {type:"fill", q:"Mẹ đưa 1 000 đồng, mua hết 300 đồng. Được trả lại bao nhiêu đồng?", answer:700},
      {type:"mc", q:"Quãng đường từ nhà đến trường dài khoảng 2 …", options:UNIT_CHOICES, answer:3},
    ],
    gen:[]
  };

  /* ======================== CHỦ ĐỀ 12: CỘNG, TRỪ TRONG PHẠM VI 1 000 ======================== */
  VCALC_PROBLEMS.knt_tru1000=[{a:578,b:346,note:"không mượn",op:"-"},{a:849,b:325,note:"không mượn",op:"-"}];
  VCALC_PROBLEMS.knt_tru1000n=[{a:432,b:158,note:"có mượn",op:"-"},{a:625,b:287,note:"có mượn",op:"-"}];

  function subNoBorrow(){
    const a2=R(2,9), b2=R(1,a2), a1=R(0,9), b1=R(0,a1), a0=R(0,9), b0=R(0,a0);
    return [a2*100+a1*10+a0, b2*100+b1*10+b0];
  }
  function subBorrow(){
    for(let g=0; g<200; g++){
      const a=R(200,999), b=R(100,a-1);
      if((a%10)<(b%10) || (Math.floor(a/10)%10)<(Math.floor(b/10)%10)) return [a,b];
    }
    return [432,158];
  }
  const subGens=(pairFn,hint)=>[
    ()=>{ const [a,b]=pairFn(); return {type:"fill", q:"Tính:", expr:`${a} − ${b}`, answer:a-b, hint}; },
    ()=>{ const [a,b]=pairFn(); return fillQ(`Một cửa hàng có ${a} kg gạo, đã bán ${b} kg. Cửa hàng còn lại bao nhiêu ki-lô-gam gạo?`, a-b, {hint:`${a} − ${b}`}); },
    ()=>{ const [a,b]=pairFn(); return mcNum(`${a} − ${b} = ?`, a-b, near(a-b)); },
    ()=>{ const [a,b]=pairFn(); return fillQ(`Tìm hiệu, biết số bị trừ là ${a} và số trừ là ${b}`, a-b, {hint:`${a} − ${b}`}); },
  ];
  T.knt_tru1000={
    title:"Phép trừ (không nhớ) trong phạm vi 1 000",
    learn:{ intro:"Khi trừ các số có ba chữ số, ta đặt tính thẳng cột rồi trừ từ phải sang trái: đơn vị, chục, trăm.",
      blocks:[
        {type:"vcalc"},
        {type:"example", html:"<b>Ví dụ 578 − 346:</b> 8 − 6 = 2, 7 − 4 = 3, 5 − 3 = 2. Vậy 578 − 346 = 232."}
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"578 − 346", answer:232, hint:"8−6, 7−4, 5−3"},
      {type:"fill", q:"Tính:", expr:"849 − 325", answer:524},
      {type:"mc", q:"Hiệu của 697 và 245 là:", options:["452","442","462","942"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"765 − 432", answer:333},
      {type:"fill", q:"Tính:", expr:"980 − 460", answer:520},
      {type:"fill", q:"Một kho có 586 kg thóc, đã chuyển đi 234 kg. Còn lại bao nhiêu ki-lô-gam?", answer:352},
    ],
    gen:subGens(subNoBorrow,"Trừ từ phải sang trái: đơn vị, chục, trăm")
  };
  T.knt_tru1000n={
    title:"Phép trừ (có nhớ) trong phạm vi 1 000",
    learn:{ intro:"Trừ có nhớ: khi chữ số ở số bị trừ bé hơn chữ số ở số trừ, ta mượn 1 ở hàng liền trước (10 đơn vị) rồi trừ. Xem từng bước bên dưới.",
      blocks:[
        {type:"vcalc"},
        {type:"example", html:"<b>Ví dụ 432 − 158:</b> đơn vị 2 &lt; 8, mượn 1 chục: 12 − 8 = 4; chục 3 − 1 = 2 &lt; 5, mượn 1 trăm: 12 − 5 = 7; trăm 4 − 1 − 1 = 2. Vậy 432 − 158 = 274."}
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"432 − 158", answer:274, hint:"2 < 8 nên mượn 1 chục"},
      {type:"fill", q:"Tính:", expr:"625 − 287", answer:338},
      {type:"mc", q:"Hiệu của 511 và 237 là:", options:["274","284","374","264"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"743 − 258", answer:485},
      {type:"fill", q:"Tính:", expr:"500 − 164", answer:336},
      {type:"fill", q:"Một đội có 361 bạn, 175 bạn là nữ. Có bao nhiêu bạn nam?", answer:186},
    ],
    gen:subGens(subBorrow,"Không đủ trừ thì mượn 1 ở hàng liền trước")
  };

  T.knt_luyentap_congtru1000={
    title:"Luyện tập chung (Cộng, trừ trong phạm vi 1 000)",
    learn:{ intro:"Lật từng trang để ôn lại 4 loại phép tính: cộng và trừ, không nhớ và có nhớ, trong phạm vi 1 000.",
      pages:[
        { title:"Bài 59. Cộng không nhớ", blocks:[
          {type:"concept", text:"Cộng các số hạng cùng hàng:", big:"235 + 142 = 377"},
          {type:"example", html:"<b>Cách làm:</b> 5 + 2 = 7, 3 + 4 = 7, 2 + 1 = 3."}
        ]},
        { title:"Bài 60. Cộng có nhớ", blocks:[
          {type:"concept", text:"Cột nào được 10 trở lên thì nhớ 1 sang cột bên trái:", big:"176 + 158 = 334"},
          {type:"example", html:"<b>Cách làm:</b> 6 + 8 = 14 (viết 4, nhớ 1); 7 + 5 + 1 = 13 (viết 3, nhớ 1); 1 + 1 + 1 = 3."}
        ]},
        { title:"Bài 61. Trừ không nhớ", blocks:[
          {type:"concept", text:"Trừ từng hàng, từ phải sang trái:", big:"578 − 346 = 232"},
          {type:"example", html:"<b>Cách làm:</b> 8 − 6 = 2, 7 − 4 = 3, 5 − 3 = 2."}
        ]},
        { title:"Bài 62. Trừ có nhớ", blocks:[
          {type:"concept", text:"Không đủ trừ thì mượn 1 ở hàng liền trước:", big:"432 − 158 = 274"},
          {type:"example", html:"<b>Cách làm:</b> mượn 1 chục: 12 − 8 = 4; mượn 1 trăm: 12 − 5 = 7; 4 − 1 − 1 = 2."}
        ]},
      ]},
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
    gen:[
      ()=>{ const a=R(100,600), b=R(100,999-a); return {type:"fill", q:"Tính:", expr:`${a} + ${b}`, answer:a+b, hint:"Cộng từ phải sang trái, nhớ 1 nếu cột được 10 trở lên"}; },
    ]
  };

  /* ======================== CHỦ ĐỀ 13: THỐNG KÊ, XÁC SUẤT ======================== */
  const FRUITS=[{label:"Táo",icon:"🍎"},{label:"Cam",icon:"🍊"},{label:"Kẹo",icon:"🍬"},{label:"Bánh",icon:"🍪"}];
  const PETS=[{label:"Mèo",icon:"🐱"},{label:"Chó",icon:"🐕"},{label:"Chim",icon:"🐦"},{label:"Cá",icon:"🐟"}];
  function chartRows(bank,k){
    const cats=shuffleArr(bank).slice(0,k);
    const counts=shuffleArr([1,2,3,4,5,6,7]).slice(0,k);   // khác nhau để có nhiều nhất / ít nhất duy nhất
    return cats.map((c,i)=>({label:c.label, icon:c.icon, n:counts[i]}));
  }
  const chartGens=bank=>[
    ()=>{ const rows=chartRows(bank,3), c=P(rows);
      return fillQ(`Biểu đồ tranh (mỗi hình là 1 bạn):<br>${picRows(rows)}Có bao nhiêu bạn chọn ${c.label}?`, c.n); },
    ()=>{ const rows=chartRows(bank,3), mx=rows.reduce((a,b)=>b.n>a.n?b:a);
      return mcText(`Biểu đồ tranh (mỗi hình là 1 bạn):<br>${picRows(rows)}Loại nào được chọn nhiều nhất?`, mx.label, rows.map(r=>r.label).concat(["Không loại nào"])); },
    ()=>{ const rows=chartRows(bank,3), a=rows[0], b=rows[1];
      return fillQ(`Biểu đồ tranh (mỗi hình là 1 bạn):<br>${picRows(rows)}${a.label} và ${b.label} hơn kém nhau mấy bạn?`, Math.abs(a.n-b.n), {hint:"Lấy số lớn trừ số bé"}); },
    ()=>{ const rows=chartRows(bank,3);
      return fillQ(`Biểu đồ tranh (mỗi hình là 1 bạn):<br>${picRows(rows)}Tất cả có bao nhiêu bạn đã chọn?`, rows.reduce((s,r)=>s+r.n,0), {hint:"Cộng số hình của các hàng"}); },
  ];
  const countGens=[
    ()=>{ const cats=shuffleArr(FRUITS).slice(0,3), counts=[R(1,5),R(1,5),R(1,5)];
      let seq=[]; cats.forEach((c,i)=>{ for(let k=0;k<counts[i];k++) seq.push(c.icon); });
      const i=R(0,2);
      return fillQ(`Đếm xem có mấy ${emo(cats[i].icon)}?`, counts[i], {visual:shuffleArr(seq).join(""), vsmall:true}); },
    ()=>{ const cats=shuffleArr(FRUITS).slice(0,3), counts=shuffleArr([2,3,4,5,6]).slice(0,3);
      let seq=[]; cats.forEach((c,i)=>{ for(let k=0;k<counts[i];k++) seq.push(c.icon); });
      const mx=counts.indexOf(Math.max(...counts));
      const opts=cats.map(c=>emo(c.icon));
      return {type:"mc", q:"Loại nào có nhiều nhất?", options:opts, answer:mx, visual:shuffleArr(seq).join(""), vsmall:true}; },
  ];
  T.knt_kiemdem={
    title:"Thu thập, phân loại, kiểm đếm số liệu",
    learn:{ intro:"Muốn biết có bao nhiêu đồ vật mỗi loại, ta phân loại rồi đếm (kiểm đếm) từng loại, và ghi lại kết quả.",
      blocks:[
        {type:"pictochart", title:"Em phân loại và đếm số quả, kẹo trong giỏ:", rows:[
          {label:"Táo", icon:"🍎", n:4},{label:"Cam", icon:"🍊", n:3},{label:"Kẹo", icon:"🍬", n:5}], note:"Mỗi hình là 1 đồ vật."},
        {type:"example", html:"<b>Cách làm:</b> (1) Chia các đồ vật thành từng loại. (2) Đếm từng loại, mỗi lần đếm gạch 1 vạch: | | | | (3) Ghi số lượng mỗi loại vào bảng."},
        {type:"example", html:"<b>Kết quả:</b> táo 4, cam 3, kẹo 5. Tất cả có 4 + 3 + 5 = 12 đồ vật."}
      ]},
    practice:[
      {type:"fill", q:"Đếm xem có mấy "+emo("🍎")+"?", answer:3, visual:"🍎🍊🍎🍬🍊🍎", vsmall:true},
      {type:"mc", q:"Loại nào có nhiều nhất?", options:[emo("🍎"),emo("🍊"),emo("🍬")], answer:0, visual:"🍎🍎🍎🍊🍊🍬", vsmall:true},
      {type:"fill", q:"Giỏ có 4 quả táo, 3 quả cam và 5 cái kẹo. Tất cả có bao nhiêu đồ vật?", answer:12, hint:"4 + 3 + 5"},
    ],
    test:[
      {type:"fill", q:"Đếm xem có mấy "+emo("🍊")+"?", answer:4, visual:"🍊🍎🍊🍬🍊🍎🍊", vsmall:true},
      {type:"mc", q:"Loại nào có ít nhất?", options:[emo("🍬"),emo("🍎"),emo("🍊")], answer:0, visual:"🍎🍎🍎🍊🍊🍬", vsmall:true},
      {type:"fill", q:"Trong lớp có 12 bạn nam và 15 bạn nữ. Lớp có tất cả bao nhiêu bạn?", answer:27},
    ],
    gen:countGens
  };
  T.knt_bieudo_tranh={
    title:"Biểu đồ tranh",
    learn:{ intro:"Biểu đồ tranh dùng các hình ảnh để biểu diễn số liệu. Mỗi hình thể hiện một số lượng nhất định.",
      blocks:[
        {type:"pictochart", title:"Số bạn thích mỗi con vật (mỗi hình là 1 bạn):", rows:[
          {label:"Mèo", icon:"🐱", n:4},{label:"Chó", icon:"🐕", n:6},{label:"Chim", icon:"🐦", n:3}]},
        {type:"example", html:"<b>Đọc biểu đồ:</b> Chó có 6 hình nên 6 bạn thích chó — nhiều nhất. Chim có 3 hình — ít nhất."},
        {type:"example", html:"<b>So sánh:</b> Chó hơn mèo 6 − 4 = 2 bạn."}
      ]},
    practice:[
      {type:"fill", q:`Biểu đồ tranh (mỗi hình là 1 bạn):<br>${picRows([{label:"Mèo",icon:"🐱",n:4},{label:"Chó",icon:"🐕",n:6},{label:"Chim",icon:"🐦",n:3}])}Có bao nhiêu bạn thích chó?`, answer:6},
      {type:"mc", q:`Biểu đồ tranh (mỗi hình là 1 bạn):<br>${picRows([{label:"Mèo",icon:"🐱",n:4},{label:"Chó",icon:"🐕",n:6},{label:"Chim",icon:"🐦",n:3}])}Con vật nào được thích ít nhất?`, options:["Chim","Mèo","Chó"], answer:0},
      {type:"fill", q:`Biểu đồ tranh (mỗi hình là 1 bạn):<br>${picRows([{label:"Mèo",icon:"🐱",n:4},{label:"Chó",icon:"🐕",n:6},{label:"Chim",icon:"🐦",n:3}])}Tất cả có bao nhiêu bạn?`, answer:13, hint:"4 + 6 + 3"},
    ],
    test:[
      {type:"fill", q:`Biểu đồ tranh (mỗi hình là 1 bạn):<br>${picRows([{label:"Táo",icon:"🍎",n:5},{label:"Cam",icon:"🍊",n:2},{label:"Kẹo",icon:"🍬",n:4}])}Táo hơn cam mấy bạn chọn?`, answer:3},
      {type:"mc", q:`Biểu đồ tranh (mỗi hình là 1 bạn):<br>${picRows([{label:"Táo",icon:"🍎",n:5},{label:"Cam",icon:"🍊",n:2},{label:"Kẹo",icon:"🍬",n:4}])}Loại nào được chọn nhiều nhất?`, options:["Táo","Cam","Kẹo"], answer:0},
      {type:"fill", q:`Biểu đồ tranh (mỗi hình là 1 bạn):<br>${picRows([{label:"Táo",icon:"🍎",n:5},{label:"Cam",icon:"🍊",n:2},{label:"Kẹo",icon:"🍬",n:4}])}Có bao nhiêu bạn chọn kẹo?`, answer:4},
    ],
    gen:chartGens(PETS).concat(chartGens(FRUITS))
  };

  const BALL_COLORS=[["đỏ","red"],["xanh","blue"],["vàng","yellow"]];
  const LIKELY=["Chắc chắn","Có thể","Không thể"];
  const LIKELY_FIXED=[
    ["Ngày mai mặt trời mọc ở hướng Đông.","Chắc chắn"],
    ["Một con cá sống và bơi trên cây.","Không thể"],
    ["Ngày mai trời có mưa.","Có thể"],
    ["Tung 1 con xúc xắc 6 mặt, mặt xuất hiện có 7 chấm.","Không thể"],
    ["Tung 1 con xúc xắc 6 mặt, mặt xuất hiện có số chấm từ 1 đến 6.","Chắc chắn"],
    ["Tung 1 con xúc xắc 6 mặt, mặt xuất hiện có 3 chấm.","Có thể"],
    ["Em bé mới sinh biết đọc sách.","Không thể"],
    ["Sau ngày thứ Hai là ngày thứ Ba.","Chắc chắn"],
  ];
  T.knt_chacchan={
    title:"Chắc chắn, có thể, không thể",
    learn:{ intro:"Khi nói về một sự việc, ta có thể nói nó chắc chắn xảy ra, có thể xảy ra hoặc không thể xảy ra.",
      blocks:[
        {type:"pictochart", title:"Hộp 1 chỉ có 4 quả bóng đỏ:", rows:[{label:"Bóng đỏ", icon:"🔴", n:4}]},
        {type:"example", html:"Lấy ra 1 quả: <b>chắc chắn</b> là bóng đỏ; <b>không thể</b> là bóng xanh."},
        {type:"pictochart", title:"Hộp 2 có 3 bóng đỏ và 2 bóng xanh:", rows:[{label:"Bóng đỏ", icon:"🔴", n:3},{label:"Bóng xanh", icon:"🔵", n:2}]},
        {type:"example", html:"Lấy ra 1 quả: <b>có thể</b> là bóng đỏ, <b>có thể</b> là bóng xanh; <b>không thể</b> là bóng vàng."}
      ]},
    practice:[
      {type:"mc", q:"Hộp chỉ có 5 quả bóng đỏ. Lấy ra 1 quả. Quả bóng đó là bóng đỏ.", options:LIKELY, answer:0, hint:"Trong hộp toàn bóng đỏ"},
      {type:"mc", q:"Hộp có 3 quả bóng đỏ và 2 quả bóng xanh. Lấy ra 1 quả. Quả bóng đó là bóng xanh.", options:LIKELY, answer:1},
      {type:"mc", q:"Hộp có 3 quả bóng đỏ và 2 quả bóng xanh. Lấy ra 1 quả. Quả bóng đó là bóng vàng.", options:LIKELY, answer:2},
    ],
    test:[
      {type:"mc", q:"Ngày mai mặt trời mọc ở hướng Đông.", options:LIKELY, answer:0},
      {type:"mc", q:"Hộp có 4 quả bóng xanh và 1 quả bóng đỏ. Lấy ra 1 quả. Quả bóng đó là bóng đỏ.", options:LIKELY, answer:1},
      {type:"mc", q:"Một con cá sống và bơi trên cây.", options:LIKELY, answer:2},
    ],
    gen:[
      ()=>{ let r,b; do{ r=R(0,5); b=R(0,5); }while(r+b===0);
        const ev=P(BALL_COLORS), cnt=ev[1]==="red"?r:(ev[1]==="blue"?b:0), tot=r+b;
        const desc=[r?`${r} quả bóng đỏ`:null, b?`${b} quả bóng xanh`:null].filter(Boolean).join(" và ");
        const ans=cnt===tot?0:(cnt===0?2:1);
        return {type:"mc", q:`Hộp có ${desc}. Lấy ra 1 quả. Quả bóng đó là bóng ${ev[0]}.`, options:LIKELY, answer:ans}; },
      ()=>{ const it=P(LIKELY_FIXED); return {type:"mc", q:it[0], options:LIKELY, answer:LIKELY.indexOf(it[1])}; },
    ]
  };

  T.knt_thuchanh_kiemdem={
    title:"Thực hành và trải nghiệm: thu thập, phân loại, kiểm đếm",
    learn:{ intro:"Con cùng bạn làm một cuộc khảo sát nhỏ: hỏi các bạn, ghi lại, kiểm đếm và vẽ biểu đồ tranh.",
      blocks:[
        {type:"example", html:"<b>Bước 1:</b> Chọn điều muốn hỏi, ví dụ: “Bạn thích ăn quả nào nhất?”"},
        {type:"example", html:"<b>Bước 2:</b> Hỏi từng bạn và ghi lại bằng vạch: | | | |"},
        {type:"example", html:"<b>Bước 3:</b> Đếm số vạch của từng loại, ghi số vào bảng."},
        {type:"pictochart", title:"Bước 4: Vẽ biểu đồ tranh (mỗi hình là 1 bạn):", rows:[
          {label:"Táo", icon:"🍎", n:5},{label:"Cam", icon:"🍊", n:3},{label:"Kẹo", icon:"🍬", n:2}]},
        {type:"example", html:"<b>Nhận xét:</b> Táo được chọn nhiều nhất (5 bạn). Kẹo ít nhất (2 bạn). Tất cả có 5 + 3 + 2 = 10 bạn."}
      ]},
    practice:[
      {type:"fill", q:"Trong khảo sát: 5 bạn chọn táo, 3 bạn chọn cam, 2 bạn chọn kẹo. Có tất cả bao nhiêu bạn?", answer:10, hint:"5 + 3 + 2"},
      {type:"mc", q:"Sau khi hỏi các bạn và ghi lại bằng vạch, bước tiếp theo là gì?", options:["Đếm số vạch từng loại","Xoá hết vạch","Hỏi lại từ đầu","Không làm gì"], answer:0},
      {type:"fill", q:"Táo có 5 bạn chọn, cam có 3 bạn chọn. Táo hơn cam mấy bạn?", answer:2},
    ],
    test:[
      {type:"fill", q:"6 bạn thích đá bóng, 4 bạn thích bơi, 3 bạn thích chạy. Có tất cả bao nhiêu bạn?", answer:13},
      {type:"fill", q:"8 bạn thích mèo, 5 bạn thích chó. Mèo hơn chó mấy bạn?", answer:3},
      {type:"mc", q:"Biểu đồ tranh dùng gì để biểu diễn số liệu?", options:["Các hình ảnh","Chỉ có chữ","Chỉ có dấu +","Không dùng gì"], answer:0},
    ],
    gen:chartGens(FRUITS).concat(countGens)
  };

  /* Bài luyện tập chung nhân chia: dùng lại các bộ sinh câu hỏi của các bài thành phần */
  T.knt_ontap_nhanchia.gen=[].concat(CONTENT.knt_nhan2.gen, T.knt_nhan5.gen, T.knt_chia.gen, T.knt_chia2.gen, T.knt_chia5.gen, T.knt_thuaso_tich.gen);
  T.knt_luyentap_1000.gen=[].concat(T.knt_donvi_chuc_tram.gen, T.knt_tron_tram_chuc.gen, T.knt_sosanh_tron.gen, T.knt_so3chuso.gen, T.knt_viet_tong.gen, T.knt_sosanh_3cs.gen);
  T.knt_luyentap_dodai_tien.gen=[].concat(T.knt_dodai.gen, T.knt_tien.gen, T.knt_thuchanh_dodai.gen);

  /* ======================== TIẾNG VIỆT — TẬP 2 ======================== */
  const pickN=(arr,n)=>shuffleArr(arr).slice(0,n);

  /* --- Chính tả: vần khó (ưa/ươ, ua/uô, iê/yê) --- */
  const VANKHO=[
    ["Trời đổ m__ rào rào.",["ưa","ươ"],"ưa","mưa: không có âm cuối nên viết ưa"],
    ["Em m__n bạn quyển truyện.",["ưa","ươ"],"ươ","mượn: có âm cuối n nên viết ươ"],
    ["Cái c__ dùng để cắt gỗ.",["ưa","ươ"],"ưa","cưa: không có âm cuối"],
    ["Mẹ đi m__ rau ngoài chợ.",["ua","uô"],"ua","mua: không có âm cuối nên viết ua"],
    ["Con c__ bò ngang rất nhanh.",["ua","uô"],"ua","cua: không có âm cuối"],
    ["Hạt m__i dùng để nấu ăn.",["ua","uô"],"uô","muối: có âm cuối i nên viết uô"],
    ["Cái ch__ng kêu leng keng.",["ua","uô"],"uô","chuông: có âm cuối ng nên viết uô"],
    ["Mẹ __u em rất nhiều.",["yê","iê"],"yê","yêu: không có âm đầu nên viết yê"],
    ["Bãi b__n xanh biếc, sóng vỗ rì rào.",["yê","iê"],"iê","biển: có âm đầu b nên viết iê"],
    ["Căn phòng thật __n tĩnh.",["yê","iê"],"yê","yên: không có âm đầu nên viết yê"],
    ["Cô t__n trong truyện cổ tích rất hiền.",["yê","iê"],"iê","tiên: có âm đầu t nên viết iê"],
  ];
  V.tv2_chinhta_vankho={
    title:"Chính tả: vần khó, phân biệt âm dễ nhầm",
    learn:{ intro:"Một số vần rất dễ viết nhầm: ưa/ươ, ua/uô, iê/yê. Ta nhớ quy tắc qua các từ quen thuộc.",
      blocks:[
        {type:"wordcards", items:[{word:"mưa", custom:"rain"},{word:"biển", icon:"🌊"}]},
        {type:"example", html:"<b>ưa / ươ:</b> <b>ưa</b> khi không có âm cuối (mưa, cưa, thưa). <b>ươ</b> khi có âm cuối (mượn, vườn, thương)."},
        {type:"example", html:"<b>ua / uô:</b> <b>ua</b> khi không có âm cuối (mua, cua, chua). <b>uô</b> khi có âm cuối (muối, chuông, cuốn)."},
        {type:"example", html:"<b>iê / yê:</b> <b>yê</b> khi không có âm đầu (yêu, yên). <b>iê</b> khi có âm đầu (tiên, biển, hiền)."}
      ]},
    practice:VANKHO.slice(0,3).map(v=>({type:"mc", q:v[0], options:v[1], answer:v[1].indexOf(v[2]), two:true, hint:v[3]})),
    test:VANKHO.slice(3,6).map(v=>({type:"mc", q:v[0], options:v[1], answer:v[1].indexOf(v[2]), two:true})),
    gen:[
      ()=>{ const v=P(VANKHO); const o=shuffleArr(v[1]); return {type:"mc", q:v[0], options:o, answer:o.indexOf(v[2]), two:true, hint:v[3]}; },
    ]
  };

  /* --- Mở rộng vốn từ: Thiên nhiên, cây cối --- */
  const TREES=["cây phượng","cây bàng","cây dừa","cây xoài","cây tre","hoa hồng","hoa cúc"];
  const NATURE=["mặt trời","mây","mưa","gió","núi","sông","biển","mặt trăng"];
  const ANIMALS=["con mèo","con chó","con trâu","con ếch","con gà","con cá"];
  const THINGS=["cái bàn","quyển vở","cái cặp","cái bút"];
  V.tv2_von_tu_thiennhien={
    title:"Mở rộng vốn từ: Thiên nhiên, cây cối",
    learn:{ intro:"Thiên nhiên quanh em có mặt trời, mây, mưa, núi, sông… và rất nhiều loài cây, loài hoa.",
      blocks:[
        {type:"wordcards", items:[
          {word:"mặt trời", custom:"sun"},{word:"mây", custom:"cloud"},{word:"mưa", custom:"rain"},
          {word:"cây", custom:"tree"},{word:"núi", custom:"mountain"},{word:"sông", custom:"river"},
          {word:"trăng", icon:"🌙"},{word:"sao", icon:"⭐"},{word:"hoa", icon:"🌸"}
        ]},
        {type:"example", html:"<b>Cảnh vật thiên nhiên:</b> mặt trời, mây, mưa, gió, núi, sông, biển. <b>Cây cối:</b> cây phượng, cây bàng, cây dừa, hoa hồng, hoa cúc."}
      ]},
    practice:[
      {type:"mc", q:"Từ nào chỉ cây cối?", options:["cây phượng","con mèo","cái bàn","quyển vở"], answer:0},
      {type:"mc", q:"Từ nào chỉ cảnh vật thiên nhiên?", options:["dòng sông","cái cặp","con gà","quyển vở"], answer:0},
      {type:"mc", q:"Từ nào chỉ con vật?", options:["con trâu","mặt trời","cây bàng","cái bút"], answer:0},
    ],
    test:[
      {type:"mc", q:"Từ nào chỉ cây cối?", options:["hoa cúc","con chó","đám mây","cái bàn"], answer:0},
      {type:"mc", q:"Từ nào chỉ cảnh vật thiên nhiên?", options:["ngọn núi","con cá","cây dừa","cái cặp"], answer:0},
      {type:"mc", q:"Từ nào chỉ con vật?", options:["con ếch","cơn mưa","hoa hồng","cái bàn"], answer:0},
    ],
    gen:[
      ()=>mcText("Từ nào chỉ cây cối?", P(TREES), NATURE.concat(ANIMALS,THINGS)),
      ()=>mcText("Từ nào chỉ cảnh vật thiên nhiên?", P(NATURE), ANIMALS.concat(THINGS)),
      ()=>mcText("Từ nào chỉ con vật?", P(ANIMALS), TREES.concat(THINGS,NATURE)),
    ]
  };

  /* --- Từ chỉ sự vật, hoạt động, đặc điểm (ôn) --- */
  const W_SV=["cô giáo","con mèo","quyển sách","bông hoa","dòng sông","ngôi trường","cái bàn"];
  const W_HD=["chạy","đọc","viết","hát","bơi","quét nhà","nấu cơm","vẽ tranh"];
  const W_DD=["đỏ","cao","xanh","ngoan","đẹp","nhanh","chăm chỉ","thơm"];
  const SENT_HD=[
    ["Em quét nhà.","quét",["Em","nhà","đẹp"]], ["Chim hót líu lo.","hót",["Chim","líu lo","cành"]],
    ["Bố đọc báo.","đọc",["Bố","báo","mới"]], ["Mẹ nấu cơm.","nấu",["Mẹ","cơm","thơm"]],
    ["Bạn Lan vẽ tranh.","vẽ",["Bạn Lan","tranh","đẹp"]],
  ];
  V.tv2_on_tu_loai={
    title:"Từ chỉ sự vật, hoạt động, đặc điểm (ôn)",
    learn:{ intro:"Từ chỉ sự vật là tên người, vật, con vật. Từ chỉ hoạt động là việc làm. Từ chỉ đặc điểm là màu sắc, hình dáng, tính chất.",
      blocks:[
        {type:"concept", text:"Từ chỉ sự vật — gọi tên:", big:"con mèo, quyển sách"},
        {type:"wordcards", items:[{word:"con mèo", icon:"🐱"},{word:"quyển sách", icon:"📕"},{word:"cô giáo", icon:"👩‍🏫"}]},
        {type:"concept", text:"Từ chỉ hoạt động — bấm để xem chuyển động:", big:"chạy, bơi, quét nhà"},
        {type:"actioncards", items:[{word:"chạy", icon:"🏃", anim:"actRun"},{word:"bơi", icon:"🏊", anim:"actSwim"},{word:"quét nhà", icon:"🧹", anim:"actSweep"}]},
        {type:"concept", text:"Từ chỉ đặc điểm — màu sắc, tính chất:", big:"đỏ, xanh, cao"},
        {type:"wordcards", items:[{word:"đỏ", icon:"🔴"},{word:"xanh", icon:"🟢"},{word:"cao", icon:"🦒"}]}
      ]},
    practice:[
      {type:"mc", q:"Từ nào là từ chỉ sự vật?", options:["cô giáo","chạy","đỏ","hát"], answer:0},
      {type:"mc", q:"Từ nào là từ chỉ hoạt động?", options:["bơi","bông hoa","xanh","quyển sách"], answer:0},
      {type:"mc", q:"Từ nào là từ chỉ đặc điểm?", options:["đẹp","con mèo","viết","dòng sông"], answer:0},
    ],
    test:[
      {type:"mc", q:"Từ nào là từ chỉ hoạt động?", options:["nấu cơm","cái bàn","cao","ngoan"], answer:0},
      {type:"mc", q:"Từ nào là từ chỉ đặc điểm?", options:["chăm chỉ","vẽ tranh","ngôi trường","chạy"], answer:0},
      {type:"mc", q:"Trong câu “Em quét nhà.”, từ chỉ hoạt động là:", options:["quét","Em","nhà","đẹp"], answer:0},
    ],
    gen:[
      ()=>mcText("Từ nào là từ chỉ sự vật?", P(W_SV), W_HD.concat(W_DD)),
      ()=>mcText("Từ nào là từ chỉ hoạt động?", P(W_HD), W_SV.concat(W_DD)),
      ()=>mcText("Từ nào là từ chỉ đặc điểm?", P(W_DD), W_SV.concat(W_HD)),
      ()=>{ const s=P(SENT_HD); const o=shuffleArr([s[1]].concat(s[2])); return {type:"mc", q:`Trong câu “${s[0]}”, từ chỉ hoạt động là:`, options:o, answer:o.indexOf(s[1])}; },
    ]
  };

  /* --- Dấu phẩy --- */
  const LISTS=[
    ["Trong vườn có","hoa hồng","hoa cúc","hoa lan"], ["Trên bàn có","quyển sách","quyển vở","cái bút"],
    ["Em thích ăn","táo","cam","chuối"], ["Ở sân trường, các bạn chơi","nhảy dây","đá cầu","kéo co"],
    ["Mẹ mua cho em","vở","bút","thước kẻ"], ["Trong rổ có","cà chua","rau muống","cà tím"],
  ];
  V.tv2_dau_phay={
    title:"Dấu phẩy",
    learn:{ intro:"Dấu phẩy ( , ) dùng để ngăn cách các từ cùng chỉ sự vật hoặc cùng chỉ hoạt động trong câu.",
      blocks:[
        {type:"concept", text:"Dấu phẩy đặt giữa các sự vật được kể ra:", big:"hoa hồng, hoa cúc và hoa lan"},
        {type:"example", html:"<b>Ví dụ:</b> Trong vườn có hoa hồng, hoa cúc và hoa lan. &nbsp; Em thích đọc sách, vẽ tranh và hát."},
        {type:"example", html:"<b>Nhớ nhé:</b> Từ cuối cùng thường có chữ “và” đứng trước, không đặt dấu phẩy ngay trước “và”."}
      ]},
    practice:[
      {type:"mc", q:"Điền dấu thích hợp: Trong vườn có hoa hồng __ hoa cúc và hoa lan.", options:[",",".","?"], answer:0, two:false, hint:"Ngăn cách hai sự vật được kể ra"},
      {type:"mc", q:"Câu nào đặt dấu phẩy đúng?", options:["Trên bàn có quyển sách, quyển vở và cái bút.","Trên bàn có quyển sách quyển vở, và cái bút.","Trên bàn, có quyển sách quyển vở và cái bút."], answer:0},
      {type:"mc", q:"Điền dấu thích hợp: Mẹ mua cho em vở __ bút và thước kẻ.", options:[",",".","!"], answer:0},
    ],
    test:[
      {type:"mc", q:"Điền dấu thích hợp: Em thích ăn táo __ cam và chuối.", options:[",",".","?"], answer:0},
      {type:"mc", q:"Câu nào đặt dấu phẩy đúng?", options:["Em thích đọc sách, vẽ tranh và hát.","Em thích đọc sách vẽ tranh, và hát.","Em, thích đọc sách vẽ tranh và hát."], answer:0},
      {type:"mc", q:"Dấu phẩy dùng để làm gì?", options:["Ngăn cách các từ cùng chỉ sự vật hoặc hoạt động","Kết thúc câu hỏi","Kết thúc câu kể","Bộc lộ cảm xúc"], answer:0},
    ],
    gen:[
      ()=>{ const [p,a,b,c]=P(LISTS);
        const right=`${p} ${a}, ${b} và ${c}.`;
        const wrong=[`${p} ${a} ${b}, và ${c}.`,`${p}, ${a} ${b} và ${c}.`,`${p} ${a} ${b} ${c}.`];
        const o=shuffleArr([right].concat(pickN(wrong,2)));
        return {type:"mc", q:"Câu nào đặt dấu phẩy đúng?", options:o, answer:o.indexOf(right)}; },
      ()=>{ const [p,a,b,c]=P(LISTS);
        return mcText(`Điền dấu thích hợp: ${p} ${a} __ ${b} và ${c}.`, ",", [".","?","!"], {hint:"Ngăn cách hai từ cùng chỉ sự vật"}); },
    ]
  };

  /* --- Câu và các loại câu --- */
  const S_KE=["Mẹ em đang nấu cơm.","Bé Lan là học sinh lớp 2A.","Hoa hồng nở đỏ rực.","Chim hót trên cành cây.","Bố em đi làm từ sáng sớm."];
  const S_HOI=["Bạn tên là gì?","Hôm nay bạn đi học bằng gì?","Mẹ đang làm gì vậy?","Quyển sách này của ai?","Bạn Nam học lớp mấy?"];
  const S_CAM=["Ôi, bông hoa đẹp quá!","Chà, bài toán này khó thật!","Trời ơi, nóng quá!","Hay quá!","Ôi, con mèo đáng yêu quá!"];
  V.tv2_cac_loai_cau={
    title:"Câu và các loại câu",
    learn:{ intro:"Khi nói và viết, ta dùng nhiều loại câu: câu kể để kể, tả, giới thiệu; câu hỏi để hỏi; câu bộc lộ cảm xúc để thể hiện cảm xúc.",
      blocks:[
        {type:"concept", text:"Câu kể — thường kết thúc bằng dấu chấm ( . ):", big:"Mẹ em đang nấu cơm."},
        {type:"concept", text:"Câu hỏi — kết thúc bằng dấu chấm hỏi ( ? ):", big:"Bạn tên là gì?"},
        {type:"concept", text:"Câu bộc lộ cảm xúc — thường kết thúc bằng dấu chấm than ( ! ):", big:"Ôi, bông hoa đẹp quá!"}
      ]},
    practice:[
      {type:"mc", q:"Câu nào là câu hỏi?", options:["Bạn tên là gì?","Mẹ em đang nấu cơm.","Ôi, đẹp quá!","Hoa hồng nở đỏ rực."], answer:0},
      {type:"mc", q:"Câu nào là câu kể?", options:["Chim hót trên cành cây.","Quyển sách này của ai?","Trời ơi, nóng quá!","Bạn tên là gì?"], answer:0},
      {type:"mc", q:"Câu nào là câu bộc lộ cảm xúc?", options:["Chà, bài toán này khó thật!","Bé Lan là học sinh lớp 2A.","Mẹ đang làm gì vậy?","Bố em đi làm từ sáng sớm."], answer:0},
    ],
    test:[
      {type:"mc", q:"Câu “Hôm nay bạn đi học bằng gì?” là loại câu nào?", options:["Câu hỏi","Câu kể","Câu bộc lộ cảm xúc"], answer:0},
      {type:"mc", q:"Câu “Bố em đi làm từ sáng sớm.” là loại câu nào?", options:["Câu kể","Câu hỏi","Câu bộc lộ cảm xúc"], answer:0},
      {type:"mc", q:"Câu “Hay quá!” là loại câu nào?", options:["Câu bộc lộ cảm xúc","Câu kể","Câu hỏi"], answer:0},
    ],
    gen:[
      ()=>mcText("Câu nào là câu hỏi?", P(S_HOI), S_KE.concat(S_CAM)),
      ()=>mcText("Câu nào là câu kể?", P(S_KE), S_HOI.concat(S_CAM)),
      ()=>mcText("Câu nào là câu bộc lộ cảm xúc?", P(S_CAM), S_KE.concat(S_HOI)),
      ()=>{ const t=P([[S_KE,"Câu kể"],[S_HOI,"Câu hỏi"],[S_CAM,"Câu bộc lộ cảm xúc"]]); const s=P(t[0]);
        const o=["Câu kể","Câu hỏi","Câu bộc lộ cảm xúc"]; return {type:"mc", q:`Câu “${s}” là loại câu nào?`, options:o, answer:o.indexOf(t[1])}; },
    ]
  };

  /* --- Dấu chấm than --- */
  const PUNCT_BANK=[
    [".","Mẹ đang nấu cơm"],[".","Bạn Nam học lớp 2A"],[".","Em đang đọc sách"],[".","Bố em là bác sĩ"],
    ["?","Hôm nay bạn đi học bằng gì"],["?","Quyển sách này của ai"],["?","Mẹ đang làm gì vậy"],["?","Bạn tên là gì"],
    ["!","Ôi, bông hoa đẹp quá"],["!","Chà, bài toán này khó thật"],["!","Trời ơi, nóng quá"],["!","Hay quá"],
  ];
  V.tv2_dau_cham_than={
    title:"Dấu chấm than",
    learn:{ intro:"Dấu chấm than ( ! ) đặt cuối câu để bộc lộ cảm xúc như vui mừng, ngạc nhiên, khen ngợi, tiếc nuối…",
      blocks:[
        {type:"concept", text:"Câu bộc lộ cảm xúc kết thúc bằng dấu chấm than:", big:"Ôi, bông hoa đẹp quá!"},
        {type:"example", html:"<b>Phân biệt:</b> Câu kể kết thúc bằng dấu chấm ( . ). Câu hỏi kết thúc bằng dấu chấm hỏi ( ? ). Câu bộc lộ cảm xúc kết thúc bằng dấu chấm than ( ! )."}
      ]},
    practice:[
      {type:"mc", q:"Điền dấu câu: Ôi, bông hoa đẹp quá__", options:[".","?","!"], answer:2, hint:"Câu bộc lộ cảm xúc"},
      {type:"mc", q:"Điền dấu câu: Bạn đang làm gì__", options:[".","?","!"], answer:1},
      {type:"mc", q:"Điền dấu câu: Em đang đọc sách__", options:[".","?","!"], answer:0},
    ],
    test:[
      {type:"mc", q:"Điền dấu câu: Chà, bài toán này khó thật__", options:[".","?","!"], answer:2},
      {type:"mc", q:"Điền dấu câu: Quyển sách này của ai__", options:[".","?","!"], answer:1},
      {type:"mc", q:"Điền dấu câu: Mẹ đang nấu cơm__", options:[".","?","!"], answer:0},
    ],
    gen:[
      ()=>{ const it=P(PUNCT_BANK); const o=[".","?","!"]; return {type:"mc", q:`Điền dấu câu: ${it[1]}__`, options:o, answer:o.indexOf(it[0])}; },
    ]
  };

  /* --- Mở rộng vốn từ theo chủ điểm: gia đình, trường học, quê hương --- */
  const CD={
    "Gia đình":["ông","bà","bố","mẹ","anh","chị","em bé"],
    "Trường học":["cô giáo","lớp học","sân trường","thư viện","bảng đen","bạn bè"],
    "Quê hương":["cánh đồng","dòng sông","luỹ tre","mái đình","làng xóm","cây đa"],
  };
  const DOC=[
    {t:"Sáng nay, Nam dậy sớm giúp mẹ quét sân. Mẹ khen Nam chăm chỉ. Nam rất vui.",
      qa:[["Sáng nay Nam giúp mẹ làm gì?","quét sân",["nấu cơm","tưới cây","rửa bát"]],["Mẹ khen Nam như thế nào?","chăm chỉ",["lười biếng","nhanh nhảu","ồn ào"]]]},
    {t:"Bầu trời hôm nay xanh trong. Từng đàn chim bay về phía núi. Gió thổi nhẹ làm những cánh đồng lúa xào xạc.",
      qa:[["Bầu trời hôm nay thế nào?","xanh trong",["xám xịt","đầy mây đen","tối đen"]],["Đàn chim bay về phía nào?","phía núi",["phía biển","phía thành phố","phía sông"]]]},
    {t:"Lan có một chú cún con tên là Bông. Mỗi chiều, Lan dắt Bông ra sân chơi. Bông rất thích chạy nhảy.",
      qa:[["Chú cún tên là gì?","Bông",["Mi","Lu","Vàng"]],["Mỗi chiều Lan làm gì với cún?","dắt ra sân chơi",["cho đi tắm","cho ăn cơm","nhốt trong nhà"]]]},
    {t:"Trường em có một thư viện nhỏ. Giờ ra chơi, nhiều bạn vào đọc truyện. Em thích nhất những cuốn truyện tranh.",
      qa:[["Giờ ra chơi, nhiều bạn vào thư viện để làm gì?","đọc truyện",["ngủ trưa","chơi đá bóng","ăn bánh"]],["Em thích nhất loại sách nào?","truyện tranh",["sách toán","từ điển","báo"]]]},
    {t:"Mùa thu, lá vàng rơi đầy sân trường. Các bạn nhỏ cùng nhau nhặt lá làm thiệp. Ai cũng cười thật tươi.",
      qa:[["Các bạn nhỏ nhặt lá để làm gì?","làm thiệp",["đốt lửa","nấu ăn","ném nhau"]],["Mùa nào lá vàng rơi đầy sân trường?","mùa thu",["mùa hè","mùa xuân","mùa đông"]]]},
  ];
  const docGen=()=>{ const d=P(DOC), qa=P(d.qa); const o=shuffleArr([qa[1]].concat(qa[2]));
    return {type:"mc", q:`<div class="rd-passage">${d.t}</div>${qa[0]}`, options:o, answer:o.indexOf(qa[1])}; };
  V.tv2_vontu_chudiem={
    title:"Mở rộng vốn từ theo chủ điểm (Gia đình, Trường học, Quê hương)",
    learn:{ intro:"Các từ ngữ được xếp theo chủ điểm: Gia đình, Trường học, Quê hương. Con làm quen và đọc hiểu đoạn văn ngắn.",
      blocks:[
        {type:"concept", text:"Chủ điểm Gia đình:", big:"ông, bà, bố, mẹ, anh, chị, em"},
        {type:"wordcards", items:[{word:"cha", icon:"👨"},{word:"em bé", icon:"😊"}]},
        {type:"concept", text:"Chủ điểm Trường học:", big:"cô giáo, lớp học, sân trường"},
        {type:"wordcards", items:[{word:"cô giáo", icon:"👩‍🏫"},{word:"học sinh", icon:"🧑‍🎓"},{word:"cặp sách", icon:"🎒"},{word:"trường học", icon:"🏫"}]},
        {type:"concept", text:"Chủ điểm Quê hương:", big:"cánh đồng, dòng sông, luỹ tre"},
        {type:"wordcards", items:[{word:"dòng sông", custom:"river"},{word:"cánh đồng", icon:"🏞️"},{word:"cây đa", custom:"tree"}]}
      ]},
    practice:[
      {type:"mc", q:"Từ nào thuộc chủ điểm Gia đình?", options:["bà","cô giáo","dòng sông","sân trường"], answer:0},
      {type:"mc", q:"Từ nào thuộc chủ điểm Trường học?", options:["thư viện","mái đình","ông","cánh đồng"], answer:0},
      {type:"mc", q:"Từ nào thuộc chủ điểm Quê hương?", options:["luỹ tre","bảng đen","chị","lớp học"], answer:0},
    ],
    test:[
      {type:"mc", q:"Từ nào thuộc chủ điểm Gia đình?", options:["anh","cô giáo","làng xóm","bạn bè"], answer:0},
      {type:"mc", q:"Từ nào thuộc chủ điểm Quê hương?", options:["cây đa","cô giáo","bố","lớp học"], answer:0},
      {type:"mc", q:"Từ nào thuộc chủ điểm Trường học?", options:["lớp học","dòng sông","mẹ","mái đình"], answer:0},
    ],
    gen:[
      ()=>{ const k=P(Object.keys(CD)); const others=Object.keys(CD).filter(x=>x!==k);
        const pool=[].concat(...others.map(x=>CD[x]));
        return mcText(`Từ nào thuộc chủ điểm ${k}?`, P(CD[k]), pool); },
      docGen,
    ]
  };

  /* --- Từ trái nghĩa --- */
  const TRAINGHIA=[["cao","thấp"],["to","nhỏ"],["nóng","lạnh"],["dài","ngắn"],["đẹp","xấu"],["nhanh","chậm"],
    ["sáng","tối"],["vui","buồn"],["già","trẻ"],["ngày","đêm"],["khóc","cười"],["mở","đóng"],["lên","xuống"],
    ["nặng","nhẹ"],["sạch","bẩn"],["béo","gầy"],["khen","chê"],["ngoan","hư"],["đúng","sai"],["trong","ngoài"]];
  const ALL_TN=[].concat(...TRAINGHIA);
  const TN_AMBIG=["sáng","tối","ngày","đêm"];
  V.tv2_trai_nghia={
    title:"Từ trái nghĩa",
    learn:{ intro:"Từ trái nghĩa là những từ có nghĩa trái ngược nhau, ví dụ: cao – thấp, nóng – lạnh.",
      blocks:[
        {type:"concept", text:"Cặp từ trái nghĩa:", big:"cao – thấp"},
        {type:"example", html:"<b>Thêm ví dụ:</b> to – nhỏ, nóng – lạnh, dài – ngắn, sáng – tối, ngày – đêm, vui – buồn, khóc – cười, mở – đóng, lên – xuống."},
        {type:"example", html:"<b>Dùng trong câu:</b> Mặt trời mọc, trời <b>sáng</b>. Mặt trời lặn, trời <b>tối</b>."}
      ]},
    practice:[
      {type:"mc", q:"Từ trái nghĩa với “cao” là:", options:["thấp","to","dài","nhanh"], answer:0},
      {type:"mc", q:"Từ trái nghĩa với “nóng” là:", options:["lạnh","ấm","sáng","vui"], answer:0},
      {type:"mc", q:"Từ trái nghĩa với “ngày” là:", options:["đêm","sáng","nắng","giờ"], answer:0},
    ],
    test:[
      {type:"mc", q:"Từ trái nghĩa với “vui” là:", options:["buồn","cười","mừng","hát"], answer:0},
      {type:"mc", q:"Từ trái nghĩa với “mở” là:", options:["đóng","cửa","lên","vào"], answer:0},
      {type:"mc", q:"Từ trái nghĩa với “sạch” là:", options:["bẩn","thơm","mới","đẹp"], answer:0},
    ],
    gen:[
      ()=>{ const pr=P(TRAINGHIA), flip=Math.random()<0.5, w=flip?pr[1]:pr[0], ans=flip?pr[0]:pr[1];
        const ambig=TN_AMBIG.includes(w)||TN_AMBIG.includes(ans);
        return mcText(`Từ trái nghĩa với “${w}” là:`, ans, ALL_TN.filter(x=>x!==w&&x!==ans&&!(ambig&&TN_AMBIG.includes(x)))); },
    ]
  };

  /* --- Luyện viết đoạn văn ngắn (sắp xếp, chọn câu — không chấm bài tự viết) --- */
  const PARAS=[
    {topic:"chú mèo nhà em", s:["Nhà em có một chú mèo tên là Mi.","Bộ lông của Mi trắng muốt như bông.","Em rất yêu quý chú mèo của mình."], end:true},
    {topic:"buổi sáng đi học", s:["Sáng nào em cũng đến trường thật sớm.","Sân trường rộng và đầy tiếng cười của các bạn.","Em cảm thấy rất vui khi được đi học."], end:true},
    {topic:"bà ngoại", s:["Bà ngoại em năm nay đã bảy mươi tuổi.","Tóc bà bạc trắng như cước.","Em luôn nhớ những lời dạy dịu dàng của bà."], end:true},
    {topic:"cây phượng ở sân trường", s:["Giữa sân trường có một cây phượng rất to.","Mùa hè đến, hoa phượng nở đỏ rực một góc trời.","Dưới gốc cây, các bạn thường ngồi đọc sách."], end:false},
    {topic:"ngày chủ nhật", s:["Chủ nhật, em giúp mẹ quét nhà và tưới cây.","Buổi chiều, em cùng bố đi công viên.","Em rất thích những ngày nghỉ như thế."], end:true},
  ];
  V.tv2_viet_doan={
    title:"Luyện viết đoạn văn ngắn",
    learn:{ intro:"Đoạn văn gồm nhiều câu cùng nói về một chủ đề. Câu đầu giới thiệu, các câu sau kể hoặc tả thêm, câu cuối nói cảm xúc.",
      blocks:[
        {type:"concept", text:"Một đoạn văn ngắn về chú mèo:", big:"3 câu"},
        {type:"example", html:"Nhà em có một chú mèo tên là Mi. Bộ lông của Mi trắng muốt như bông. Em rất yêu quý chú mèo của mình."},
        {type:"example", html:"<b>Nhớ nhé:</b> Đầu câu viết hoa, cuối câu có dấu chấm. Các câu trong đoạn phải cùng nói về một chủ đề."},
        {type:"example", html:"<b>Thử viết:</b> Con hãy nói (hoặc viết) 3 câu về một con vật mà con yêu thích rồi đọc cho bố mẹ nghe."}
      ]},
    practice:[
      {type:"mc", q:"Đoạn văn nói về chú mèo. Câu nào nên đứng đầu đoạn?", options:["Nhà em có một chú mèo tên là Mi.","Em rất yêu quý chú mèo của mình.","Bộ lông của Mi trắng muốt như bông."], answer:0},
      {type:"mc", q:"Câu nào KHÔNG nói về chú mèo?", options:["Sân trường rộng và đầy tiếng cười.","Bộ lông của Mi trắng muốt.","Nhà em có một chú mèo tên là Mi."], answer:0},
      {type:"mc", q:"Cuối câu kể, ta đặt dấu gì?", options:["Dấu chấm","Dấu chấm hỏi","Dấu phẩy"], answer:0},
    ],
    test:[
      {type:"mc", q:"Đoạn văn nói về bà ngoại. Câu nào nên đứng đầu đoạn?", options:["Bà ngoại em năm nay đã bảy mươi tuổi.","Em luôn nhớ những lời dạy dịu dàng của bà.","Tóc bà bạc trắng như cước."], answer:0},
      {type:"mc", q:"Câu nào KHÔNG nói về bà ngoại?", options:["Chủ nhật, em cùng bố đi công viên.","Tóc bà bạc trắng như cước.","Bà ngoại em năm nay đã bảy mươi tuổi."], answer:0},
      {type:"mc", q:"Chữ cái đầu của câu phải viết như thế nào?", options:["Viết hoa","Viết thường","Viết cách điệu"], answer:0},
    ],
    gen:[
      ()=>{ const p=P(PARAS); const o=shuffleArr(p.s.slice());
        return {type:"mc", q:`Đoạn văn nói về ${p.topic}. Câu nào nên đứng đầu đoạn?`, options:o, answer:o.indexOf(p.s[0])}; },
      ()=>{ const p=P(PARAS); const other=P(PARAS.filter(x=>x!==p)); const intr=P(other.s);
        const o=shuffleArr(pickN(p.s,2).concat([intr]));
        return {type:"mc", q:`Câu nào KHÔNG nói về ${p.topic}?`, options:o, answer:o.indexOf(intr)}; },
      ()=>{ const p=P(PARAS.filter(x=>x.end)); const o=shuffleArr(p.s.slice());
        return {type:"mc", q:`Đoạn văn nói về ${p.topic}. Câu nào nên đứng cuối đoạn (nói về cảm xúc)?`, options:o, answer:o.indexOf(p.s[2])}; },
    ]
  };

  /* --- Ôn tập cuối năm Tiếng Việt (flipbook) --- */
  V.tv2_on_tap_cuoi_nam={
    title:"Ôn tập cuối năm Tiếng Việt",
    learn:{ intro:"Lật từng trang để ôn lại những điều đã học trong học kì 2: từ trái nghĩa, dấu câu, các loại câu, vốn từ.",
      pages:[
        { title:"Từ trái nghĩa", blocks:[
          {type:"concept", text:"Từ trái nghĩa có nghĩa ngược nhau:", big:"nóng – lạnh"},
          {type:"example", html:"<b>Ví dụ:</b> cao – thấp, vui – buồn, ngày – đêm, mở – đóng."}
        ]},
        { title:"Dấu phẩy, dấu chấm than", blocks:[
          {type:"concept", text:"Dấu phẩy ngăn cách các từ cùng chỉ sự vật:", big:"hoa hồng, hoa cúc và hoa lan"},
          {type:"example", html:"<b>Dấu chấm than</b> đặt cuối câu bộc lộ cảm xúc: <i>Ôi, bông hoa đẹp quá!</i>"}
        ]},
        { title:"Các loại câu", blocks:[
          {type:"concept", text:"Ba loại câu thường gặp:", big:"kể · hỏi · bộc lộ cảm xúc"},
          {type:"example", html:"Câu kể: <i>Mẹ đang nấu cơm.</i> &nbsp; Câu hỏi: <i>Bạn tên là gì?</i> &nbsp; Câu cảm: <i>Hay quá!</i>"}
        ]},
        { title:"Từ ngữ theo chủ điểm, đọc hiểu", blocks:[
          {type:"wordcards", items:[{word:"cô giáo", icon:"👩‍🏫"},{word:"cặp sách", icon:"🎒"},{word:"dòng sông", custom:"river"},{word:"cây đa", custom:"tree"}]},
          {type:"example", html:"<b>Ghi nhớ:</b> Đọc kĩ đoạn văn rồi mới trả lời câu hỏi. Tìm câu trả lời ngay trong đoạn văn."}
        ]},
      ]},
    practice:[
      {type:"mc", q:"Từ trái nghĩa với “nặng” là:", options:["nhẹ","to","dài","cao"], answer:0},
      {type:"mc", q:"Câu nào là câu hỏi?", options:["Bạn tên là gì?","Mẹ đang nấu cơm.","Hay quá!"], answer:0},
      {type:"mc", q:"Điền dấu thích hợp: Em thích ăn táo __ cam và chuối.", options:[",",".","?"], answer:0},
    ],
    test:[
      {type:"mc", q:"Từ trái nghĩa với “đẹp” là:", options:["xấu","cao","sạch","vui"], answer:0},
      {type:"mc", q:"Điền dấu câu: Chà, bài toán này khó thật__", options:[".","?","!"], answer:2},
      {type:"mc", q:"Từ nào thuộc chủ điểm Quê hương?", options:["luỹ tre","cô giáo","bố","lớp học"], answer:0},
    ],
    gen:[]
  };
  V.tv2_on_tap_cuoi_nam.gen=[].concat(V.tv2_trai_nghia.gen, V.tv2_dau_phay.gen, V.tv2_dau_cham_than.gen,
    V.tv2_cac_loai_cau.gen, V.tv2_vontu_chudiem.gen, V.tv2_on_tu_loai.gen, V.tv2_von_tu_thiennhien.gen, V.tv2_viet_doan.gen, [docGen]);

  window.CH={R,P,near,mcNum,mcText,fillQ,fmt,SYM,cmpSymbol,pickN};
  Object.assign(CONTENT, T, V);
})();
