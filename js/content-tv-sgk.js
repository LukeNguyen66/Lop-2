/* ===== TIẾNG VIỆT — BÀI HỌC THEO MỤC LỤC SGK THẬT (Kết nối tri thức, lớp 2) =====
   Mỗi bài trong khung chương ứng với phần LUYỆN TẬP của đúng "Bài N" trong sách (cặp chính tả, vốn từ,
   dấu câu, kiểu câu, bài viết). Nạp SAU content-gd3.js. KHÔNG chép bài đọc của SGK: các câu ví dụ,
   câu điền chỗ trống, đoạn mẫu đều do trợ lý tự soạn; chỉ dùng lại những CẶP chính tả và CHỦ ĐỀ vốn từ
   mà mục lục/trang "Viết" - "Luyện tập" của sách nêu. Mọi bài giữ nhãn "bản nháp". */
(function(){
  const {chips,sentence,ghiNho}=window.LS;
  const {R,P,mcText,pickN}=window.CH;
  const mc=(q,opts,ans,extra)=>Object.assign({type:"mc",q,options:opts,answer:ans},extra||{});
  const G={};

  /* ---------- ngân hàng dùng chung ---------- */
  // mục: [câu có "__", lựa chọn, đáp án, từ đầy đủ (làm gợi ý)]
  const SP=(opts,rows)=>rows.map(r=>[r[0],opts,r[1],r[2]]);
  const spellQ=(bank)=>()=>{ const it=P(bank); const o=shuffleArr(it[1].slice());
    return {type:"mc", q:it[0], options:o, answer:o.indexOf(it[2]), two:o.length===2, hint:`Từ đúng là “${it[3]}”`}; };
  const groupQ=(groups)=>()=>{ const names=Object.keys(groups), k=P(names);
    const others=[].concat(...names.filter(x=>x!==k).map(x=>groups[x]));
    return mcText(`Từ nào thuộc nhóm “${k}”?`, P(groups[k]), others); };
  const PUNCT_ALL=[
    [".","Mẹ đang nấu cơm"],[".","Bạn Nam học lớp 2A"],[".","Em đang đọc sách"],[".","Chim hót trên cành cây"],[".","Con mèo đang trèo cây cau"],
    ["?","Con gì có cái vòi rất dài"],["?","Hôm nay bạn đi học bằng gì"],["?","Mẹ đang làm gì vậy"],["?","Bạn tên là gì"],["?","Con gì phi nhanh như gió"],
    ["!","Ôi, con công múa đẹp quá"],["!","Chà, bài toán này khó thật"],["!","Trời ơi, nóng quá"],["!","Hay quá"],
  ];
  const punctQ=(marks)=>()=>{ const it=P(PUNCT_ALL.filter(x=>marks.includes(x[0]))); const o=marks.slice();
    return {type:"mc", q:`Điền dấu câu: ${it[1]}__`, options:o, answer:o.indexOf(it[0]), two:o.length===2, hint:"Kể → dấu chấm; hỏi → dấu chấm hỏi; cảm xúc → dấu chấm than"}; };
  const LISTS=[["Trong vườn có","hoa hồng","hoa cúc","hoa lan"],["Trên bàn có","quyển sách","quyển vở","cái bút"],["Em thích ăn","táo","cam","chuối"],
    ["Ở sân trường, các bạn chơi","nhảy dây","đá cầu","kéo co"],["Mẹ mua cho em","vở","bút","thước kẻ"],["Trong rổ có","cà chua","rau muống","cà tím"]];
  const phayQ=()=>{ const [p,a,b,c]=P(LISTS); const right=`${p} ${a}, ${b} và ${c}.`;
    const wrong=[`${p} ${a} ${b}, và ${c}.`,`${p}, ${a} ${b} và ${c}.`,`${p} ${a} ${b} ${c}.`]; const o=shuffleArr([right].concat(pickN(wrong,2)));
    return mc("Câu nào đặt dấu phẩy đúng?", o, o.indexOf(right)); };
  const SUBJPRED=[["Mẹ","nấu cơm"],["Bạn Lan","đọc sách"],["Con chim","hót líu lo"],["Em","quét nhà"],["Bố","đưa em đi học"],["Chị","tưới cây"],["Bạn Nam","đá bóng"],["Cô giáo","giảng bài"]];
  const SUBJDD=[["Bông hoa","rất đẹp"],["Bạn Nam","cao hơn bạn Lan"],["Quả cam","rất ngọt"],["Con mèo","rất ngoan"],["Mái tóc","đen mượt"],["Đôi mắt","đen láy"]];
  const hdQ=()=>{ const it=P(SUBJPRED), o=shuffleArr([it[1]].concat(pickN(SUBJPRED.filter(x=>x!==it).map(x=>x[1]),3)));
    return mc(`Câu: “${it[0]} ${it[1]}.” Bộ phận nào trả lời cho câu hỏi “làm gì?”`, o, o.indexOf(it[1])); };
  const ddQ=()=>{ const it=P(SUBJDD), o=shuffleArr([it[1]].concat(pickN(SUBJDD.filter(x=>x!==it).map(x=>x[1]),3)));
    return mc(`Câu: “${it[0]} ${it[1]}.” Bộ phận nào trả lời cho câu hỏi “thế nào?”`, o, o.indexOf(it[1])); };
  const gtQ=()=>{ const G3=[["Bạn Hà","học sinh lớp 2A"],["Bố em","bác sĩ"],["Hà Nội","thủ đô của nước ta"],["Chú Tư","thợ mộc"],["Cái nón lá","đồ dùng che nắng, che mưa"],["Cô Lan","giáo viên của em"]];
    const it=P(G3), right=`${it[0]} là ${it[1]}.`; const wrong=shuffleArr(SUBJPRED).slice(0,2).map(x=>`${x[0]} ${x[1]}.`).concat(shuffleArr(SUBJDD).slice(0,1).map(x=>`${x[0]} ${x[1]}.`));
    const o=shuffleArr([right].concat(wrong)); return mc("Câu nào là câu giới thiệu (Ai là gì?)", o, o.indexOf(right)); };
  const NAMEQ=()=>{ const names=["Nguyễn Thị Hoa","Trần Văn Nam","Lê Minh Anh","Phạm Thu Hà","Hoàng Gia Bảo","Đỗ Mai Phương"]; const n=P(names);
    const low=n.toLowerCase(), words=n.split(' ');
    const w1=words[0]+' '+words.slice(1).map(x=>x.toLowerCase()).join(' ');
    const w2=low; const w3=words.map((x,i)=>i===1?x.toLowerCase():x).join(' ');
    const o=shuffleArr([n,w1,w2,w3].filter((x,i,a)=>a.indexOf(x)===i)).slice(0,4);
    if(!o.includes(n)) o[0]=n;
    return mc("Cách viết tên người nào đúng?", o, o.indexOf(n), {hint:"Viết hoa chữ cái đầu của mỗi tiếng trong tên người"}); };
  const PLACES=["Hà Nội","Hải Phòng","Đà Nẵng","Cần Thơ","Cà Mau","Sa Pa","Huế","Nha Trang","Đà Lạt","Quảng Ninh","Lạng Sơn","Hà Giang"];
  const PLACEQ=()=>{ const n=P(PLACES), words=n.split(' ');
    const lowFirst=words.map((x,i)=>i===0?x.toLowerCase():x).join(' '), allLow=n.toLowerCase(), lowRest=words.map((x,i)=>i===0?x:x.toLowerCase()).join(' ');
    const o=shuffleArr([n,lowFirst,allLow,lowRest].filter((x,i,a)=>a.indexOf(x)===i));
    if(o.length<3) return NAMEQ();
    return mc("Cách viết tên riêng địa lí nào đúng?", o.slice(0,4).includes(n)?o.slice(0,4):[n].concat(o.slice(0,3)), (o.slice(0,4).includes(n)?o.slice(0,4):[n].concat(o.slice(0,3))).indexOf(n), {hint:"Viết hoa chữ cái đầu của mỗi tiếng trong tên riêng địa lí"}); };
  // câu hỏi về cách viết (thứ tự các bước) — kiểm tra hiểu cấu trúc bài viết
  const writeQ=(w)=>()=>{ const i=R(0,w.steps.length-1); const o=shuffleArr(w.steps.map(s=>s.q));
    return mc(`Khi viết ${w.what}, ý nào dưới đây là việc cần nói/viết?`, o, o.indexOf(w.steps[i].q), {hint:w.steps[i].hint||""}); };

  /* ---------- nhà máy tạo bài ---------- */
  // spell: [{head, rule, chips:[[nhãn,[từ...],màu]...], bank}]; vocab:{head,groups,say}; punct:{head,steps,vis}; writing:{head,what,steps,sample}
  function lesson(spec){
    const blocks=[], gens=[], pra=[], tes=[];
    (spec.spell||[]).forEach(sp=>{
      const steps=[{say:sp.rule}];
      (sp.chips||[]).forEach(c=>steps.push({say:c[0], vis:chips(c[1],c[2]||'c')}));
      steps.push({say:`<b>Cách làm bài:</b> đọc to câu, nghĩ đến từ đúng, nhớ lại mặt chữ rồi chọn. Chưa chắc thì hỏi cô giáo hoặc tra từ điển.`});
      blocks.push({type:"stepper", title:sp.head, steps});
      gens.push(spellQ(sp.bank));
      pra.push(...sp.bank.slice(0,1).map(it=>mc(it[0],it[1].slice(),it[1].indexOf(it[2]),{two:it[1].length===2,hint:`Từ đúng là “${it[3]}”`})));
      tes.push(...sp.bank.slice(-1).map(it=>mc(it[0],it[1].slice(),it[1].indexOf(it[2]),{two:it[1].length===2})));
    });
    if(spec.vocab){
      const v=spec.vocab, names=Object.keys(v.groups);
      const steps=names.map((n,i)=>({say:`<b>${n}:</b> ${v.say&&v.say[n]?v.say[n]:'các từ thuộc nhóm này.'}`, vis:chips(v.groups[n],['c','b','r'][i%3])}));
      steps.push({say:`<b>Cách làm bài:</b> gặp một từ, con tự hỏi: “Từ này nói về điều gì?” rồi xếp vào đúng nhóm.`});
      blocks.push({type:"stepper", title:v.head, steps});
      gens.push(groupQ(v.groups));
      const k0=names[0], k1=names[names.length-1];
      const mk=(k)=>{ const others=[].concat(...names.filter(x=>x!==k).map(x=>v.groups[x])); const right=v.groups[k][0]; const wrong=[others[0],others[Math.floor(others.length/2)],others[others.length-1]].filter((x,i,arr)=>arr.indexOf(x)===i); // cố định (shuffleArr của engine chưa nạp lúc này)
        const o=[right].concat(wrong); return mc(`Từ nào thuộc nhóm “${k}”?`, o, 0); };
      pra.push(mk(k0)); tes.push(mk(k1));
    }
    if(spec.punct){
      const p=spec.punct;
      blocks.push({type:"stepper", title:p.head, steps:p.steps});
      if(p.kind==='phay'){ gens.push(phayQ); pra.push(mc("Câu nào đặt dấu phẩy đúng?",["Em thích đọc sách, vẽ tranh và hát.","Em thích đọc sách vẽ tranh, và hát.","Em thích, đọc sách vẽ tranh và hát."],0)); tes.push(mc("Điền dấu thích hợp: Em thích ăn táo __ cam và chuối.",[",",".","?"],0)); }
      else { gens.push(punctQ(p.marks)); pra.push(mc("Điền dấu câu: Em đang đọc sách__",p.marks.slice(),p.marks.indexOf("."),{two:p.marks.length===2})); tes.push(mc("Điền dấu câu: Bạn tên là gì__",p.marks.slice(),p.marks.indexOf("?"),{two:p.marks.length===2})); }
    }
    if(spec.sent){
      const s=spec.sent;
      blocks.push({type:"stepper", title:s.head, steps:s.steps});
      (s.kinds||[]).forEach(k=>{ gens.push({hd:hdQ,dd:ddQ,gt:gtQ,name:NAMEQ,place:PLACEQ}[k]); });
      if(s.kinds&&s.kinds.includes('hd')){ pra.push(mc("Câu: “Mẹ nấu cơm.” Bộ phận nào trả lời cho câu hỏi “làm gì?”",["nấu cơm","Mẹ","nấu","cơm"],0)); tes.push(mc("Câu: “Bạn Lan đọc sách.” Bộ phận nào trả lời cho câu hỏi “Ai?”",["Bạn Lan","đọc sách","đọc","sách"],0)); }
      if(s.kinds&&s.kinds.includes('dd')){ pra.push(mc("Câu: “Con mèo rất ngoan.” Bộ phận nào trả lời cho câu hỏi “thế nào?”",["rất ngoan","Con mèo","mèo","Con"],0)); tes.push(mc("Câu: “Mái tóc đen mượt.” Bộ phận nào trả lời cho câu hỏi “thế nào?”",["đen mượt","Mái tóc","tóc","Mái"],0)); }
      if(s.kinds&&s.kinds.includes('gt')){ pra.push(mc("Câu nào là câu giới thiệu (Ai là gì?)",["Bố em là bác sĩ.","Mẹ nấu cơm.","Em quét nhà.","Bông hoa rất đẹp."],0)); tes.push(mc("Câu nào là câu giới thiệu (Ai là gì?)",["Hà Nội là thủ đô của nước ta.","Chim hót líu lo.","Bạn Nam đá bóng.","Quả cam rất ngọt."],0)); }
      if(s.kinds&&s.kinds.includes('name')){ pra.push(mc("Cách viết tên người nào đúng?",["Nguyễn Thị Hoa","nguyễn thị hoa","Nguyễn thị hoa","nguyễn Thị Hoa"],0)); tes.push(mc("Cách viết tên người nào đúng?",["Trần Văn Nam","trần văn nam","Trần văn nam","Trần Văn nam"],0)); }
      if(s.kinds&&s.kinds.includes('place')){ pra.push(mc("Cách viết tên riêng địa lí nào đúng?",["Hà Nội","hà nội","Hà nội","hà Nội"],0)); tes.push(mc("Cách viết tên riêng địa lí nào đúng?",["Cần Thơ","cần thơ","Cần thơ","cần Thơ"],0)); }
    }
    if(spec.writing){
      const w=spec.writing;
      blocks.push({type:"stepper", title:w.head, steps:w.steps.map(s=>({say:s.say, vis:s.vis}))
        .concat(w.sample?[{say:`<b>Đoạn mẫu</b> (con có thể viết khác, theo ý riêng của con):<br><i>${w.sample}</i>`}]:[])
        .concat([{say:`<b>Đọc lại và kiểm tra:</b> đầu câu viết hoa, cuối câu có dấu câu; các câu đều nói về cùng một chủ đề.`}])});
      if(w.what && w.qs){ gens.push(writeQ({what:w.what, steps:w.qs}));
        pra.push(mc(`Khi viết ${w.what}, ý nào dưới đây là việc cần nói/viết?`, [w.qs[0].q].concat(w.noise||["Viết thật dài, càng nhiều chữ càng tốt","Chép nguyên văn của bạn","Chỉ viết một từ"]), 0));
        tes.push(mc(`Khi viết ${w.what}, ý nào dưới đây là việc cần nói/viết?`, [w.qs[w.qs.length-1].q].concat(w.noise||["Viết thật dài, càng nhiều chữ càng tốt","Chép nguyên văn của bạn","Chỉ viết một từ"]), 0)); }
    }
    (spec.extraGens||[]).forEach(g=>gens.push(g));
    const fix=a=>a.filter(Boolean).slice(0,3);
    const practice=fix(pra), test=fix(tes.length>=3?tes:tes.concat(pra.slice(1)));
    return {title:spec.title, learn:{intro:spec.intro, blocks}, practice, test, gen:gens};
  }
  window.TVF={lesson,SP,spellQ,groupQ,punctQ,phayQ,hdQ,ddQ,gtQ,NAMEQ,PLACEQ,G};

  const S2=(a,b)=>[a,b];             // cặp lựa chọn
  const cKC=["c","k"], ngNgh=["ng","ngh"], trCh=["ch","tr"], sX=["s","x"], gGh=["g","gh"], rdgi=["r","d","gi"], dGi=["d","gi"], lN=["l","n"];
  const wr=(say,vis)=>({say,vis});
  const PUNCT3=[".","?","!"], PUNCT2=[".","?"];
  const punctSteps=(extra)=>[
    wr(`<b>Dấu chấm ( . )</b> đặt cuối <b>câu kể</b>: kể, tả hoặc giới thiệu.`, sentence([['Mẹ đang nấu cơm','b'],['.','c']])),
    wr(`<b>Dấu chấm hỏi ( ? )</b> đặt cuối <b>câu hỏi</b>.`, sentence([['Bạn tên là gì','b'],['?','c']])),
  ].concat(extra?[wr(`<b>Dấu chấm than ( ! )</b> đặt cuối câu <b>bộc lộ cảm xúc</b> (vui mừng, ngạc nhiên, khen…).`, sentence([['Ôi, bông hoa đẹp quá','b'],['!','c']]))]:[])
   .concat([wr(`<b>Cách chọn:</b> hỏi mình “Câu này để kể, để hỏi hay để bộc lộ cảm xúc?” rồi chọn dấu cuối câu.`)]);
  const hdSteps=[wr(`<b>Từ chỉ hoạt động</b> là từ chỉ <b>việc làm</b>: chạy, đọc, viết, nấu cơm, quét nhà…`, chips(['chạy','đọc','viết','nấu cơm','quét nhà'],'c')),
    wr(`<b>Câu nêu hoạt động</b> trả lời câu hỏi <b>“làm gì?”</b>: <b>Ai</b> + <b>làm gì</b>.`, sentence([['Mẹ','b'],['nấu cơm.','c']])),
    wr(`Muốn tìm bộ phận “làm gì”, hỏi: <b>“Mẹ làm gì?”</b> → nấu cơm. Muốn tìm bộ phận “Ai”, hỏi: <b>“Ai nấu cơm?”</b> → Mẹ.`)];
  const ddSteps=[wr(`<b>Từ chỉ đặc điểm</b> cho biết <b>màu sắc, hình dáng, tính chất, tính tình</b>: đẹp, cao, ngoan, đen láy…`, chips(['đẹp','cao','ngoan','đen láy'],'b')),
    wr(`<b>Câu nêu đặc điểm</b> trả lời câu hỏi <b>“thế nào?”</b>: <b>Ai (cái gì)</b> + <b>thế nào</b>.`, sentence([['Bông hoa','b'],['rất đẹp.','c']])),
    wr(`Muốn tìm bộ phận “thế nào”, hỏi: <b>“Bông hoa thế nào?”</b> → rất đẹp.`)];
  const gtSteps=[wr(`<b>Câu giới thiệu</b> cho biết người, vật <b>là gì</b>: <b>Ai (cái gì)</b> + <b>là</b> + <b>gì</b>.`, sentence([['Bố em','b'],['là','' ],['bác sĩ.','c']])),
    wr(`Muốn tìm hai bộ phận, hỏi: <b>“Bố em là gì?”</b> → bác sĩ. <b>“Ai là bác sĩ?”</b> → Bố em.`)];
  const nameSteps=[wr(`<b>Viết hoa tên người:</b> viết hoa <b>chữ cái đầu của mỗi tiếng</b> trong tên (họ, tên đệm, tên).`, chips(['Nguyễn Thị Hoa','Trần Văn Nam','Lê Minh Anh'],'c')),
    wr(`Không viết: <b>nguyễn thị hoa</b> hay <b>Nguyễn thị hoa</b>. Mỗi tiếng đều phải viết hoa chữ đầu.`)];
  const placeSteps=[wr(`<b>Viết hoa tên riêng địa lí:</b> viết hoa <b>chữ cái đầu của mỗi tiếng</b> trong tên.`, chips(['Hà Nội','Hải Phòng','Cần Thơ','Cà Mau','Sa Pa','Đà Nẵng'],'b')),
    wr(`Không viết: <b>hà nội</b> hay <b>Hà nội</b>. Với tên có hai tiếng như Hà Nội, cả hai tiếng đều viết hoa.`)];

  /* ===== TẬP 1 ===== */
  G.tv1_b08=lesson({title:"Bài 8 · Từ chỉ sự vật; Câu nêu hoạt động; Viết hoa tên người; Viết đoạn kể về một hoạt động thể thao, trò chơi",
    intro:"Con học cách viết hoa tên người, tìm từ chỉ sự vật và câu nêu hoạt động, rồi tập kể về một trò chơi. Con xem từng bước nhé!",
    sent:{head:"Viết hoa tên người; Câu nêu hoạt động", steps:nameSteps.concat(hdSteps), kinds:['name','hd']},
    vocab:{head:"Từ chỉ sự vật trong thể thao, trò chơi", groups:{"Đồ dùng chơi thể thao":["quả bóng","vợt","dây nhảy","lưới","quả cầu"],"Nơi chơi":["sân bóng","sân trường","công viên","bể bơi"]}, say:{"Đồ dùng chơi thể thao":"các đồ vật dùng khi chơi.","Nơi chơi":"các nơi em có thể chơi, tập luyện."}},
    writing:{head:"Viết đoạn kể một hoạt động thể thao, trò chơi", what:"đoạn kể về một trò chơi", qs:[
      {q:"Em chơi trò chơi (hoạt động) gì?"},{q:"Em chơi cùng những bạn nào?"},{q:"Em và các bạn làm những việc gì?"},{q:"Em cảm thấy thế nào sau khi chơi?"}],
      steps:[wr(`<b>Nghĩ:</b> em muốn kể về trò chơi hay môn thể thao nào? (nhảy dây, đá cầu, đá bóng…)`),wr(`<b>Nói và viết lần lượt:</b> ① Em chơi gì? ② Chơi cùng ai? ③ Mọi người làm những việc gì? ④ Em cảm thấy thế nào?`)],
      sample:"Giờ ra chơi, em cùng Lan và Mai chơi nhảy dây. Hai bạn quay dây, em nhảy qua dây thật nhanh. Chúng em cười vui vẻ. Em rất thích trò chơi này."}});

  G.tv1_b22=lesson({title:"Bài 22 · Chính tả: ng/ngh, ch/tr, uôn/uông; Từ chỉ sự vật; Câu nêu đặc điểm; Viết đoạn giới thiệu một đồ chơi",
    intro:"Con học các cặp chính tả ng/ngh, ch/tr, uôn/uông, từ chỉ đồ chơi, câu nêu đặc điểm và cách giới thiệu một đồ chơi. Con xem từng bước nhé!",
    spell:[
      {head:"ng hay ngh?", rule:`<b>ngh</b> chỉ viết trước <b>e, ê, i</b>; <b>ng</b> viết trước các chữ còn lại.`, chips:[[`Từ viết với <b>ngh</b>:`,['nghe','nghề','nghỉ','nghĩ'],'c'],[`Từ viết với <b>ng</b>:`,['ngày','ngon','ngủ','ngô'],'b']],
        bank:SP(ngNgh,[["Em __e cô giáo kể chuyện.","ngh","nghe"],["Bố làm __ề lái xe.","ngh","nghề"],["Cả nhà __ỉ hè ở biển.","ngh","nghỉ"],["Hôm nay là __ày vui.","ng","ngày"],["Món canh này rất __on.","ng","ngon"],["Em bé __ủ say.","ng","ngủ"]])},
      {head:"ch hay tr?", rule:`<b>ch</b> và <b>tr</b> dễ viết nhầm; con phải nhớ mặt chữ của từng từ.`, chips:[[`Từ viết với <b>ch</b>:`,['chợ','chơi','chín','chổi'],'c'],[`Từ viết với <b>tr</b>:`,['trời','trường','trâu','trồng'],'b']],
        bank:SP(trCh,[["Bố đưa em đi __ợ.","ch","chợ"],["Em đang __ơi với bạn.","ch","chơi"],["Quả na đã __ín.","ch","chín"],["Bầu __ời trong xanh.","tr","trời"],["Sân __ường rộng rãi.","tr","trường"],["Con __âu cày ruộng.","tr","trâu"]])},
      {head:"uôn hay uông?", rule:`<b>uôn</b> kết thúc bằng chữ <b>n</b>; <b>uông</b> kết thúc bằng chữ <b>ng</b>.`, chips:[[`Từ viết với <b>uôn</b>:`,['muốn','buồn','cuốn','luôn'],'c'],[`Từ viết với <b>uông</b>:`,['uống','chuông','xuống','muống'],'b']],
        bank:SP(["uôn","uông"],[["Em m__ ăn kẹo.","uôn","muốn"],["Bé khóc vì b__.","uôn","buồn"],["Nước __ đã đun sôi.","uông","uống"],["Chiếc ch__ kêu leng keng.","uông","chuông"],["Chạy xu__ cầu thang.","uông","xuống"],["Mẹ nấu rau m__.","uông","muống"]])}],
    vocab:{head:"Từ chỉ sự vật: đồ chơi", groups:{"Đồ chơi":["búp bê","ô tô","gấu bông","xếp hình","con quay"],"Đồ vật trong nhà":["cái bàn","cái ghế","cái tủ","cái giường"]}, say:{"Đồ chơi":"các đồ vật em chơi.","Đồ vật trong nhà":"các đồ dùng trong nhà."}},
    sent:{head:"Câu nêu đặc điểm (Ai thế nào?)", steps:ddSteps, kinds:['dd']},
    writing:{head:"Viết đoạn giới thiệu một đồ chơi", what:"đoạn giới thiệu một đồ chơi", qs:[{q:"Đồ chơi đó là gì, ai tặng em?"},{q:"Đồ chơi có hình dáng, màu sắc thế nào?"},{q:"Em chơi đồ chơi đó như thế nào?"},{q:"Em có yêu quý đồ chơi đó không?"}],
      steps:[wr(`<b>Chọn:</b> một đồ chơi em thích nhất.`),wr(`<b>Nói và viết lần lượt:</b> ① Đồ chơi gì? ② Hình dáng, màu sắc? ③ Em chơi thế nào? ④ Em cảm thấy ra sao?`)],
      sample:"Em có một chú gấu bông màu nâu. Bộ lông của gấu rất mềm, đôi mắt tròn đen láy. Tối nào em cũng ôm gấu ngủ. Em rất yêu quý gấu bông."}});

  G.tv1_b24=lesson({title:"Bài 24 · Chính tả: d/gi, s/x, ươn/ương; Dấu phẩy; Viết đoạn văn tả đồ chơi",
    intro:"Con học các cặp chính tả d/gi, s/x, ươn/ương, dấu phẩy và cách tả một đồ chơi. Con xem từng bước nhé!",
    spell:[
      {head:"d hay gi?", rule:`<b>d</b> và <b>gi</b> nghe gần giống nhau; con nhớ mặt chữ của từ.`, chips:[[`Từ viết với <b>d</b>:`,['dê','dạy','dừa','dọn'],'c'],[`Từ viết với <b>gi</b>:`,['giỏi','giúp','giờ','gia đình'],'b']],
        bank:SP(dGi,[["Con __ê ăn cỏ.","d","dê"],["Cô __ạy em tập viết.","d","dạy"],["Cây __ừa cao vút.","d","dừa"],["Bạn Lan học __ỏi.","gi","giỏi"],["Em __úp mẹ quét nhà.","gi","giúp"],["Đến __ờ ra chơi rồi.","gi","giờ"]])},
      {head:"s hay x?", rule:`<b>s</b> và <b>x</b> nghe gần giống nhau; con nhớ mặt chữ của từ.`, chips:[[`Từ viết với <b>s</b>:`,['sao','sách','sáo','sạch'],'c'],[`Từ viết với <b>x</b>:`,['xanh','xe','xôi','xoài'],'b']],
        bank:SP(sX,[["Trên trời có nhiều __ao.","s","sao"],["Quyển __ách mới.","s","sách"],["Chim __áo hót trên cành.","s","sáo"],["Cây __anh tốt tươi.","x","xanh"],["Bố đi làm bằng __e máy.","x","xe"],["Quả __oài ngọt thơm.","x","xoài"]])},
      {head:"ươn hay ương?", rule:`<b>ươn</b> kết thúc bằng chữ <b>n</b>; <b>ương</b> kết thúc bằng chữ <b>ng</b>.`, chips:[[`Từ viết với <b>ươn</b>:`,['vườn','mượn','lươn','vươn'],'c'],[`Từ viết với <b>ương</b>:`,['thương','hương','mương','nương'],'b']],
        bank:SP(["ươn","ương"],[["Mẹ trồng rau trong v__.","ươn","vườn"],["Chị m__ sách của bạn.","ươn","mượn"],["Cô giáo th__ học sinh.","ương","thương"],["Mùi h__ thơm ngát.","ương","hương"],["Nước chảy trong m__.","ương","mương"],["Bà ra n__ trồng ngô.","ương","nương"]])}],
    punct:{head:"Dấu phẩy ( , )", kind:'phay', steps:[wr(`Dấu phẩy <b>ngăn cách các từ cùng chỉ sự vật</b> hoặc cùng chỉ hoạt động được kể ra.`, sentence([['Em thích','' ],['ăn táo','b'],[',',''],['ăn cam','b'],['và',''],['ăn chuối','b'],['.','']])),
      wr(`<b>Đặt dấu phẩy ở đâu?</b> Giữa các từ được kể ra. Trước chữ <b>“và”</b> (nối từ cuối cùng) thì <b>không</b> đặt dấu phẩy.`)]},
    writing:{head:"Viết đoạn văn tả đồ chơi", what:"đoạn tả đồ chơi", qs:[{q:"Em tả đồ chơi gì?"},{q:"Đồ chơi có hình dáng, màu sắc, bộ phận nào nổi bật?"},{q:"Đồ chơi dùng để chơi như thế nào?"},{q:"Tình cảm của em với đồ chơi đó ra sao?"}],
      steps:[wr(`<b>Quan sát:</b> nhìn kĩ đồ chơi: hình dáng, màu sắc, các bộ phận.`),wr(`<b>Viết lần lượt:</b> ① Giới thiệu đồ chơi. ② Tả hình dáng, màu sắc. ③ Cách chơi. ④ Tình cảm của em.`)],
      sample:"Chiếc ô tô đồ chơi của em màu đỏ. Thân xe bóng loáng, bốn bánh tròn đen. Em đẩy xe chạy khắp nhà. Em rất thích chiếc ô tô này."}});

  const FAM=["ông","bà","bố","mẹ","anh","chị","em bé","cô","chú","dì"];
  const FAMGROUPS={"Người thân trong gia đình":FAM,"Việc làm trong gia đình":["nấu cơm","quét nhà","giặt quần áo","tưới cây","rửa bát"],"Tính chất, đặc điểm của người thân":["hiền hậu","chăm chỉ","vui vẻ","tốt bụng"]};
  G.tv1_b26=lesson({title:"Bài 26 · Chính tả: iên/yên/uyên, r/d/gi, ai/ay; Vốn từ về gia đình, từ chỉ đặc điểm; Câu nêu đặc điểm; Viết đoạn kể việc người thân đã làm cho em",
    intro:"Con học các cặp chính tả iên/yên/uyên, r/d/gi, ai/ay, các từ về gia đình và câu nêu đặc điểm. Con xem từng bước nhé!",
    spell:[
      {head:"iên, yên hay uyên?", rule:`<b>iên</b> (có âm đầu): biển, hiền. <b>yên</b> (không có âm đầu): yên tĩnh. <b>uyên</b>: chuyện, thuyền.`, chips:[[`<b>iên:</b>`,['biển','hiền','tiên','miền'],'c'],[`<b>yên:</b>`,['yên tĩnh','yên lặng','yên tâm'],'b'],[`<b>uyên:</b>`,['chuyện','thuyền','nguyên','khuyên'],'r']],
        bank:SP(["iên","yên","uyên"],[["Chiếc th__ nhỏ lướt trên sông.","uyên","thuyền"],["Cô giáo rất h__ hậu.","iên","hiền"],["Phòng học rất __ tĩnh.","yên","yên"],["Bạn Nam kể c__ rất hay.","uyên","chuyện"],["Sóng vỗ ngoài b__ cả.","iên","biển"],["Mẹ nói em cứ __ tâm làm bài.","yên","yên"]])},
      {head:"r, d hay gi?", rule:`<b>r, d, gi</b> nghe gần giống nhau; con nhớ mặt chữ của từ.`, chips:[[`<b>r:</b>`,['rau','rổ','rừng','rửa'],'c'],[`<b>d:</b>`,['dê','dạy','dừa','dế'],'b'],[`<b>gi:</b>`,['giỏi','giúp','giờ','gió'],'r']],
        bank:SP(rdgi,[["Mẹ nhặt __au ngoài vườn.","r","rau"],["Chị __ửa bát sạch.","r","rửa"],["Con __ế kêu trong đêm.","d","dế"],["Bé __ọn bàn học.","d","dọn"],["Hoa xoan bay theo __ó.","gi","gió"],["Em __úp mẹ quét nhà.","gi","giúp"]])},
      {head:"ai hay ay?", rule:`Hai vần <b>ai</b> và <b>ay</b> khác nhau ở âm cuối: <b>ai</b> (cuối là i), <b>ay</b> (cuối là y).`, chips:[[`<b>ai:</b>`,['hai','bài','mái','vải'],'c'],[`<b>ay:</b>`,['tay','bay','may','máy'],'b']],
        bank:SP(["ai","ay"],[["Bàn t__ nhỏ xinh.","ay","tay"],["Chim b__ trên trời.","ay","bay"],["Mẹ m__ áo cho em.","ay","may"],["H__ bạn chơi cùng nhau.","ai","hai"],["Em làm b__ tập về nhà.","ai","bài"],["M__ nhà lợp ngói đỏ.","ai","mái"]])}],
    vocab:{head:"Mở rộng vốn từ về gia đình", groups:FAMGROUPS, say:{"Người thân trong gia đình":"những người sống trong gia đình, họ hàng gần gũi.","Việc làm trong gia đình":"những việc cả nhà cùng làm.","Tính chất, đặc điểm của người thân":"từ chỉ tính tình, phẩm chất."}},
    sent:{head:"Câu nêu đặc điểm (Ai thế nào?)", steps:ddSteps, kinds:['dd']},
    writing:{head:"Viết đoạn kể việc người thân đã làm cho em", what:"đoạn kể việc người thân đã làm cho em", qs:[{q:"Người thân đó là ai?"},{q:"Người ấy đã làm gì cho em?"},{q:"Việc đó xảy ra khi nào, ở đâu?"},{q:"Em cảm thấy thế nào và muốn nói gì với người thân?"}],
      steps:[wr(`<b>Chọn:</b> một việc người thân (ông, bà, bố, mẹ…) đã làm cho em.`),wr(`<b>Nói và viết lần lượt:</b> ① Người đó là ai? ② Đã làm gì cho em? ③ Khi nào, ở đâu? ④ Em cảm thấy thế nào?`)],
      sample:"Tối qua, em bị sốt. Mẹ ở bên cạnh lau mát cho em và nấu cháo cho em ăn. Bàn tay mẹ rất dịu dàng. Em thấy mẹ thật yêu thương em."}});

  const FAMLOVE=["yêu thương","quan tâm","chăm sóc","hiếu thảo","kính trọng","nhớ nhung"];
  G.tv1_b28=lesson({title:"Bài 28 · Viết hoa tên riêng địa lí; Chính tả: l/n, ao/au; Vốn từ về tình cảm gia đình; Dấu chấm, chấm hỏi, chấm than; Viết đoạn thể hiện tình cảm với người thân",
    intro:"Con học viết hoa tên riêng địa lí, các cặp chính tả l/n, ao/au, từ chỉ tình cảm gia đình và ba dấu cuối câu. Con xem từng bước nhé!",
    sent:{head:"Viết hoa tên riêng địa lí", steps:placeSteps, kinds:['place']},
    spell:[
      {head:"l hay n?", rule:`<b>l</b> và <b>n</b> dễ viết nhầm; con nhớ mặt chữ của từ.`, chips:[[`<b>l:</b>`,['lá','lúa','lớp','lên'],'c'],[`<b>n:</b>`,['nón','nước','nắng','nấu'],'b']],
        bank:SP(lN,[["Cây có nhiều __á xanh.","l","lá"],["Em học ở __ớp 2A.","l","lớp"],["Bố trồng __úa ngoài đồng.","l","lúa"],["Chiếc __ón che nắng.","n","nón"],["Em uống __ước mát.","n","nước"],["Mẹ __ấu cơm trong bếp.","n","nấu"]])},
      {head:"ao hay au?", rule:`<b>ao</b> (cuối là o) và <b>au</b> (cuối là u) là hai vần khác nhau.`, chips:[[`<b>ao:</b>`,['sao','cháo','báo','bao'],'c'],[`<b>au:</b>`,['cau','cháu','sau','màu'],'b']],
        bank:SP(["ao","au"],[["Ngôi s__ lấp lánh trên trời.","ao","sao"],["Mẹ nấu ch__ cho bé ăn.","ao","cháo"],["Bà ăn trầu có quả c__.","au","cau"],["Ông bà rất yêu quý các ch__.","au","cháu"],["Em vẽ tranh bằng nhiều m__ đẹp.","au","màu"],["Ăn xong, em đánh răng, s__ đó đi ngủ.","au","sau"]])}],
    vocab:{head:"Vốn từ về tình cảm gia đình", groups:{"Tình cảm gia đình":FAMLOVE,"Đồ vật trong nhà":["cái bàn","cái ghế","cái tủ","cái giường"]}, say:{"Tình cảm gia đình":"từ chỉ tình cảm giữa những người thân.","Đồ vật trong nhà":"các đồ dùng trong nhà."}},
    punct:{head:"Dấu chấm, dấu chấm hỏi, dấu chấm than", marks:PUNCT3, steps:punctSteps(true)},
    writing:{head:"Viết đoạn thể hiện tình cảm với người thân", what:"đoạn nói về tình cảm với người thân", qs:[{q:"Em muốn nói về người thân nào?"},{q:"Người đó có điều gì đáng yêu, đáng quý?"},{q:"Em đã làm gì thể hiện tình cảm với người đó?"},{q:"Em mong muốn điều gì cho người thân?"}],
      steps:[wr(`<b>Chọn:</b> một người thân em yêu quý nhất.`),wr(`<b>Nói và viết lần lượt:</b> ① Người đó là ai? ② Điều em yêu quý ở người đó. ③ Em đã làm gì để thể hiện tình cảm? ④ Em mong gì?`)],
      sample:"Em yêu bà ngoại nhất. Bà luôn kể chuyện cổ tích cho em nghe. Em thường đấm lưng cho bà. Em mong bà luôn khoẻ mạnh."}});

  G.tv1_b30=lesson({title:"Bài 30 · Chính tả: ch/tr, at/ac; Từ chỉ sự vật, hoạt động; Câu nêu hoạt động; Viết đoạn kể việc đã làm cùng người thân",
    intro:"Con học các cặp chính tả ch/tr, at/ac, từ chỉ sự vật và hoạt động, câu nêu hoạt động, rồi kể việc đã làm cùng người thân. Con xem từng bước nhé!",
    spell:[
      {head:"ch hay tr?", rule:`<b>ch</b> và <b>tr</b> dễ viết nhầm; con nhớ mặt chữ của từ.`, chips:[[`<b>ch:</b>`,['chợ','chơi','chín','chiều'],'c'],[`<b>tr:</b>`,['trời','trường','trâu','trồng'],'b']],
        bank:SP(trCh,[["Bố đưa em đi __ợ.","ch","chợ"],["Em __ơi với bạn.","ch","chơi"],["__iều nay em đi học về sớm.","ch","chiều"],["Bầu __ời trong xanh.","tr","trời"],["Ông em __ồng cây trước nhà.","tr","trồng"],["Con __âu cày ruộng.","tr","trâu"]])},
      {head:"at hay ac?", rule:`<b>at</b> (cuối là t) và <b>ac</b> (cuối là c) là hai vần khác nhau.`, chips:[[`<b>at:</b>`,['cát','hát','mát','bát'],'c'],[`<b>ac:</b>`,['thác','nhạc','bác','các'],'b']],
        bank:SP(["at","ac"],[["Bãi c__ vàng mịn.","at","cát"],["Bạn Lan h__ rất hay.","at","hát"],["Chị mua cái b__ mới.","at","bát"],["Dòng th__ đổ xuống từ núi cao.","ac","thác"],["Em thích nghe nh__.","ac","nhạc"],["Chú ấy là b__ sĩ.","ac","bác"]])}],
    vocab:{head:"Từ chỉ sự vật, từ chỉ hoạt động", groups:{"Từ chỉ sự vật":["chổi","nồi cơm","bình tưới","quyển truyện"],"Từ chỉ hoạt động":["quét nhà","nấu cơm","tưới cây","đọc truyện"]}, say:{"Từ chỉ sự vật":"tên đồ vật, con vật…","Từ chỉ hoạt động":"việc làm của người, con vật."}},
    sent:{head:"Câu nêu hoạt động (Ai làm gì?)", steps:hdSteps, kinds:['hd']},
    writing:{head:"Viết đoạn kể việc đã làm cùng người thân", what:"đoạn kể việc đã làm cùng người thân", qs:[{q:"Em đã làm việc gì, cùng với ai?"},{q:"Việc đó diễn ra khi nào, ở đâu?"},{q:"Em và người thân làm những gì?"},{q:"Em cảm thấy thế nào sau khi làm xong?"}],
      steps:[wr(`<b>Chọn:</b> một việc em đã làm cùng người thân (nấu ăn, trồng cây, dọn nhà…).`),wr(`<b>Nói và viết lần lượt:</b> ① Việc gì, cùng ai? ② Khi nào, ở đâu? ③ Làm những gì? ④ Em cảm thấy thế nào?`)],
      sample:"Chủ nhật, em cùng bố trồng cây trước sân. Bố đào hố, em tưới nước cho cây. Cây nhỏ đứng thẳng giữa nắng. Em rất vui vì đã giúp bố."}});

  G.tv1_b32=lesson({title:"Bài 32 · Chính tả: iu/ưu, ât/âc; Vốn từ về tình cảm gia đình; Dấu phẩy; Viết tin nhắn",
    intro:"Con học các cặp chính tả iu/ưu, ât/âc, dấu phẩy và cách viết một tin nhắn. Con xem từng bước nhé!",
    spell:[
      {head:"iu hay ưu?", rule:`<b>iu</b> và <b>ưu</b> là hai vần khác nhau; con nhớ mặt chữ của từ.`, chips:[[`<b>iu:</b>`,['ríu rít','trĩu cành','dịu dàng','chịu khó'],'c'],[`<b>ưu:</b>`,['cứu hoả','hưu trí','lưu luyến','bưu điện'],'b']],
        bank:SP(["iu","ưu"],[["Chim hót r__ rít trong vòm cây.","iu","ríu"],["Cây bưởi sai tr__ cành.","iu","trĩu"],["Cô giáo nói năng d__ dàng.","iu","dịu"],["Xe c__ hoả chạy nhanh.","ưu","cứu"],["Bác đã về h__.","ưu","hưu"],["Em gửi thư ở b__ điện.","ưu","bưu"]])},
      {head:"ât hay âc?", rule:`<b>ât</b> (cuối là t) và <b>âc</b> (cuối là c) là hai vần khác nhau.`, chips:[[`<b>ât:</b>`,['mật','thật','gật','vật'],'c'],[`<b>âc:</b>`,['gấc','bậc','nhấc','nấc'],'b']],
        bank:SP(["ât","âc"],[["Hũ m__ ong ngọt lịm.","ât","mật"],["Quả na ăn th__ ngon.","ât","thật"],["Bạn Hà g__ đầu đồng ý.","ât","gật"],["Xôi g__ đỏ thơm ngon.","âc","gấc"],["Em bước lên b__ thang.","âc","bậc"],["Bé nh__ chiếc ghế lên.","âc","nhấc"]])}],
    vocab:{head:"Vốn từ về tình cảm gia đình", groups:{"Tình cảm gia đình":FAMLOVE,"Đồ dùng học tập":["bút chì","thước kẻ","quyển vở","cặp sách"]}, say:{"Tình cảm gia đình":"từ chỉ tình cảm giữa những người thân.","Đồ dùng học tập":"các đồ dùng em mang đến lớp."}},
    punct:{head:"Dấu phẩy ( , )", kind:'phay', steps:[wr(`Dấu phẩy <b>ngăn cách các từ cùng chỉ sự vật</b> hoặc cùng chỉ hoạt động được kể ra.`, sentence([['Mẹ mua cho em','' ],['vở','b'],[',',''],['bút','b'],['và',''],['thước kẻ','b'],['.','']])),
      wr(`Không đặt dấu phẩy ngay <b>trước chữ “và”</b> nối từ cuối cùng.`)]},
    writing:{head:"Viết tin nhắn", what:"tin nhắn", qs:[{q:"Em nhắn cho ai?"},{q:"Em muốn nhắn điều gì?"},{q:"Em chào hoặc cảm ơn như thế nào?"},{q:"Em kết thúc tin nhắn ra sao?"}],
      steps:[wr(`<b>Nghĩ:</b> em nhắn cho ai, nói điều gì?`),wr(`<b>Viết ngắn gọn:</b> ① Chào hỏi. ② Nội dung muốn nhắn. ③ Lời chào cuối. Ví dụ nhắn cho bà.`)],
      sample:"Bà ơi, hôm nay cả nhà em sẽ về quê thăm bà. Bà nhớ giữ gìn sức khoẻ nhé. Cháu chào bà! (Hà)"}});

  /* ===== TẬP 2 ===== */
  // ngân hàng dùng lại giữa các bài (điền chỗ trống; khung chữ gạch dưới che phần vần/âm đầu, gợi ý hiện cả từ)
  const BK={
    ck:SP(cKC,[["Con __iến bò trên cành.","k","kiến"],["Em __ể chuyện cho bé nghe.","k","kể"],["Mẹ dùng __éo cắt vải.","k","kéo"],["Con __á bơi dưới nước.","c","cá"],["__ô giáo dạy em học.","c","cô"],["Cái __ửa ra vào đang mở.","c","cửa"]]),
    trch:SP(trCh,[["Bố đưa em đi __ợ.","ch","chợ"],["Em đang __ơi với bạn.","ch","chơi"],["Quả na đã __ín.","ch","chín"],["Bầu __ời trong xanh.","tr","trời"],["Sân __ường rộng rãi.","tr","trường"],["Con __âu cày ruộng.","tr","trâu"]]),
    atac:SP(["at","ac"],[["Bãi c__ vàng mịn.","at","cát"],["Bạn Lan h__ rất hay.","at","hát"],["Chị mua cái b__ mới.","at","bát"],["Dòng th__ đổ xuống từ núi cao.","ac","thác"],["Em thích nghe nh__.","ac","nhạc"],["Chú ấy là b__ sĩ.","ac","bác"]]),
    ggh:SP(gGh,[["Em ngồi trên chiếc __ế.","gh","ghế"],["Em __i bài vào vở.","gh","ghi"],["Cả nhà __é thăm ông bà.","gh","ghé"],["Mẹ nấu cơm bằng __ạo tẻ.","g","gạo"],["Con __à gáy ò ó o.","g","gà"],["Chiếc bàn làm bằng __ỗ.","g","gỗ"]]),
    sx:SP(sX,[["Trên trời có nhiều __ao.","s","sao"],["Quyển __ách mới.","s","sách"],["Chim __áo hót trên cành.","s","sáo"],["Cây __anh tốt tươi.","x","xanh"],["Bố đi làm bằng __e máy.","x","xe"],["Quả __oài ngọt thơm.","x","xoài"]]),
    ucut:SP(["uc","ut"],[["Em ch__ mừng sinh nhật bạn.","uc","chúc"],["Mẹ m__ canh ra bát.","uc","múc"],["Hoa c__ vàng nở rộ.","uc","cúc"],["Bạn Nam s__ bóng vào lưới.","ut","sút"],["Mẹ làm hũ m__ dừa.","ut","mứt"],["Em viết bằng cây b__ chì.","ut","bút"]]),
    ngngh:SP(ngNgh,[["Em __e cô giáo kể chuyện.","ngh","nghe"],["Bố làm __ề lái xe.","ngh","nghề"],["Cả nhà __ỉ hè ở biển.","ngh","nghỉ"],["Hôm nay là __ày vui.","ng","ngày"],["Món canh này rất __on.","ng","ngon"],["Em bé __ủ say.","ng","ngủ"]]),
    rdgi:SP(rdgi,[["Mẹ nhặt __au ngoài vườn.","r","rau"],["Chị __ửa bát sạch.","r","rửa"],["Con __ế kêu trong đêm.","d","dế"],["Bé __ọn bàn học.","d","dọn"],["Hoa xoan bay theo __ó.","gi","gió"],["Em __úp mẹ quét nhà.","gi","giúp"]]),
    dgi:SP(dGi,[["Con __ê ăn cỏ.","d","dê"],["Cô __ạy em tập viết.","d","dạy"],["Cây __ừa cao vút.","d","dừa"],["Bạn Lan học __ỏi.","gi","giỏi"],["Em __úp mẹ quét nhà.","gi","giúp"],["Đến __ờ ra chơi rồi.","gi","giờ"]]),
    ln:SP(lN,[["Cây có nhiều __á xanh.","l","lá"],["Em học ở __ớp 2A.","l","lớp"],["Bố trồng __úa ngoài đồng.","l","lúa"],["Chiếc __ón che nắng.","n","nón"],["Em uống __ước mát.","n","nước"],["Mẹ __ấu cơm trong bếp.","n","nấu"]]),
    iuuu:SP(["iu","ưu"],[["Chim hót r__ rít trong vòm cây.","iu","ríu"],["Cây bưởi sai tr__ cành.","iu","trĩu"],["Cô giáo nói năng d__ dàng.","iu","dịu"],["Xe c__ hoả chạy nhanh.","ưu","cứu"],["Bác đã về h__.","ưu","hưu"],["Em gửi thư ở b__ điện.","ưu","bưu"]]),
    // hỏi / ngã: mỗi mục tự có cặp lựa chọn (cả từ)
    hn:[["Em uống __ tươi mỗi sáng.",["sữa","sửa"],"sữa","sữa"],["Mẹ luộc __ khoai cho cả nhà.",["củ","cũ"],"củ","củ"],["Chiếc cặp đã __ rồi.",["củ","cũ"],"cũ","cũ"],
      ["Em thích __ tranh.",["vẻ","vẽ"],"vẽ","vẽ"],["Bạn Lan có __ mặt vui tươi.",["vẻ","vẽ"],"vẻ","vẻ"],["Mẹ đựng rau trong cái __.",["rổ","rõ"],"rổ","rổ"],
      ["Bạn Nam đọc rất to và __ ràng.",["rổ","rõ"],"rõ","rõ"],["Cả nhà __ hè ở biển.",["nghỉ","nghĩ"],"nghỉ","nghỉ"],["Em __ về mẹ và thấy nhớ mẹ.",["nghỉ","nghĩ"],"nghĩ","nghĩ"],
      ["Em dùng thước __ đường thẳng.",["kẻ","kẽ"],"kẻ","kẻ"],["Mẹ xếp bát và __ lên giá.",["đĩa","đỉa"],"đĩa","đĩa"]]
  };
  const hnBank=BK.hn;
  const hnSteps=(w)=>({head:"Dấu hỏi hay dấu ngã?", rule:`Cặp từ này chỉ khác nhau ở <b>dấu thanh</b>: dấu hỏi ( ̉ ) hay dấu ngã ( ̃ ). Nghĩa của từ cũng khác hẳn, nên con phải đọc cả câu để chọn.`,
    chips:[[`<b>Dấu hỏi:</b>`,['sửa','củ','vẻ','rổ','nghỉ','kẻ'],'c'],[`<b>Dấu ngã:</b>`,['sữa','cũ','vẽ','rõ','nghĩ','kẽ'],'b']], bank:hnBank});
  const sp1=(head,rule,ch,bank)=>({head,rule,chips:ch,bank});
  const pairSp=(a,b,ra,rb,A,B,bank)=>sp1(`${a} hay ${b}?`,`${a} và ${b} dễ viết nhầm; con nhớ mặt chữ của từng từ.`,[[`Từ viết với <b>${a}</b>:`,A,'c'],[`Từ viết với <b>${b}</b>:`,B,'b']],bank);
  const SPELL={
    ck:sp1("c hay k?",`<b>k</b> chỉ viết trước <b>e, ê, i</b>; <b>c</b> viết trước các chữ còn lại.`,[[`Viết với <b>k</b>:`,['kiến','kể','kéo','kính'],'c'],[`Viết với <b>c</b>:`,['cá','cô','cửa','cơm'],'b']],BK.ck),
    trch:pairSp("ch","tr",0,0,['chợ','chơi','chín','chiều'],['trời','trường','trâu','trồng'],BK.trch),
    atac:sp1("at hay ac?",`<b>at</b> (cuối là t) và <b>ac</b> (cuối là c) là hai vần khác nhau.`,[[`<b>at:</b>`,['cát','hát','mát','bát'],'c'],[`<b>ac:</b>`,['thác','nhạc','bác','các'],'b']],BK.atac),
    ggh:sp1("g hay gh?",`<b>gh</b> chỉ viết trước <b>e, ê, i</b>; <b>g</b> viết trước các chữ còn lại.`,[[`Viết với <b>gh</b>:`,['ghế','ghi','ghé','ghê'],'c'],[`Viết với <b>g</b>:`,['gà','gạo','gỗ','gió'],'b']],BK.ggh),
    sx:pairSp("s","x",0,0,['sao','sách','sáo','sạch'],['xanh','xe','xôi','xoài'],BK.sx),
    ucut:sp1("uc hay ut?",`<b>uc</b> (cuối là c) và <b>ut</b> (cuối là t) là hai vần khác nhau.`,[[`<b>uc:</b>`,['chúc','múc','cúc','dục'],'c'],[`<b>ut:</b>`,['sút','mứt','bút','vút'],'b']],BK.ucut),
    ngngh:sp1("ng hay ngh?",`<b>ngh</b> chỉ viết trước <b>e, ê, i</b>; <b>ng</b> viết trước các chữ còn lại.`,[[`Viết với <b>ngh</b>:`,['nghe','nghề','nghỉ','nghĩ'],'c'],[`Viết với <b>ng</b>:`,['ngày','ngon','ngủ','ngô'],'b']],BK.ngngh),
    rdgi:sp1("r, d hay gi?",`<b>r, d, gi</b> nghe gần giống nhau; con nhớ mặt chữ của từ.`,[[`<b>r:</b>`,['rau','rổ','rừng','rửa'],'c'],[`<b>d:</b>`,['dê','dạy','dừa','dế'],'b'],[`<b>gi:</b>`,['giỏi','giúp','giờ','gió'],'r']],BK.rdgi),
    dgi:pairSp("d","gi",0,0,['dê','dạy','dừa','dọn'],['giỏi','giúp','giờ','gia đình'],BK.dgi),
    ln:pairSp("l","n",0,0,['lá','lúa','lớp','lên'],['nón','nước','nắng','nấu'],BK.ln),
    iuuu:sp1("iu hay ưu?",`<b>iu</b> và <b>ưu</b> là hai vần khác nhau; con nhớ mặt chữ của từ.`,[[`<b>iu:</b>`,['ríu rít','trĩu cành','dịu dàng','chịu khó'],'c'],[`<b>ưu:</b>`,['cứu hoả','hưu trí','lưu luyến','bưu điện'],'b']],BK.iuuu),
    hn:hnSteps(),
    ưcưt:sp1("ưc hay ưt?",`<b>ưc</b> (cuối là c) và <b>ưt</b> (cuối là t) là hai vần khác nhau.`,[[`<b>ưc:</b>`,['sức khoẻ','bức tranh','mực','thức dậy'],'c'],[`<b>ưt:</b>`,['mứt','nứt','đứt','bứt'],'b']],
      SP(["ưc","ưt"],[["Em có s__ khoẻ tốt.","ưc","sức"],["Em vẽ b__ tranh đẹp.","ưc","bức"],["Cô giáo viết bằng m__ đen.","ưc","mực"],["Hũ m__ Tết ngon lắm.","ưt","mứt"],["Chiếc bát bị n__ một đường.","ưt","nứt"]])),
    uynh:sp1("uynh hay uych?",`<b>uynh</b> (cuối là nh) và <b>uych</b> (cuối là ch) là hai vần khác nhau, đều rất ít gặp.`,[[`<b>uynh:</b>`,['phụ huynh','huynh đệ','hoa quỳnh'],'c'],[`<b>uych:</b>`,['huỵch','huỳnh huỵch'],'b']],
      SP(["uynh","uych"],[["Bố mẹ là phụ h__ của em.","uynh","huynh"],["Hoa q__ nở về đêm.","uynh","quỳnh"],["Bạn Nam ngã đánh h__ một cái.","uych","huỵch"],["Bạn chạy huỳnh h__ trên sàn.","uych","huỵch"]])),
    iêtiêc:sp1("iêt hay iêc?",`<b>iêt</b> (cuối là t) và <b>iêc</b> (cuối là c) là hai vần khác nhau.`,[[`<b>iêt:</b>`,['viết','tiết','tiết kiệm','biết'],'c'],[`<b>iêc:</b>`,['việc','biếc','tiếc','xiếc'],'b']],
      SP(["iêt","iêc"],[["Em v__ bài vào vở.","iêt","viết"],["Tiết học hôm nay t__ học rất vui.","iêt","tiết"],["Mẹ làm nhiều v__ trong nhà.","iêc","việc"],["Bầu trời xanh b__.","iêc","biếc"],["Em t__ quả bóng bị hỏng.","iêc","tiếc"]])),
    uyauyu:sp1("uya hay uyu?",`<b>uya</b> và <b>uyu</b> là hai vần khác nhau, ít gặp.`,[[`<b>uya:</b>`,['khuya','đêm khuya'],'c'],[`<b>uyu:</b>`,['khuỷu tay','khuỵu gối'],'b']],
      SP(["uya","uyu"],[["Đêm đã kh__, cả nhà đi ngủ.","uya","khuya"],["Em chống kh__ tay lên bàn.","uyu","khuỷu"],["Mẹ thức kh__ để làm việc.","uya","khuya"],["Bạn Nam kh__ gối xuống buộc dây giày.","uyu","khuỵu"]])),
    ieuuou:sp1("iêu hay ươu?",`<b>iêu</b> và <b>ươu</b> là hai vần khác nhau; con nhớ mặt chữ của từ.`,[[`<b>iêu:</b>`,['hiểu','nhiều','diều','chiều'],'c'],[`<b>ươu:</b>`,['hươu','khướu','bướu','rượu'],'b']],
      SP(["iêu","ươu"],[["Con h__ có đôi sừng đẹp.","ươu","hươu"],["Chim kh__ hót rất hay.","ươu","khướu"],["Em h__ bài rồi.","iêu","hiểu"],["Mẹ nấu nh__ món ngon.","iêu","nhiều"],["Con d__ bay cao trên trời.","iêu","diều"]])),
    uôtuôc:sp1("uôt hay uôc?",`<b>uôt</b> (cuối là t) và <b>uôc</b> (cuối là c) là hai vần khác nhau.`,[[`<b>uôt:</b>`,['chuột','tuốt','ruột'],'c'],[`<b>uôc:</b>`,['thuộc','thuốc','buộc','cuộc'],'b']],
      SP(["uôt","uôc"],[["Con ch__ nhắt chạy nhanh.","uôt","chuột"],["Bạn ấy học th__ bài.","uôc","thuộc"],["Bé uống th__ cho khỏi ho.","uôc","thuốc"],["Mẹ b__ tóc cho em.","uôc","buộc"],["Tối nay có c__ họp lớp.","uôc","cuộc"]])),
    ươcươt:sp1("ươc hay ươt?",`<b>ươc</b> (cuối là c) và <b>ươt</b> (cuối là t) là hai vần khác nhau.`,[[`<b>ươc:</b>`,['thước','nước','bước','được'],'c'],[`<b>ươt:</b>`,['mượt','trượt','lướt','vượt'],'b']],
      SP(["ươc","ươt"],[["Em dùng th__ kẻ.","ươc","thước"],["Em uống n__ cam.","ươc","nước"],["Bạn ấy b__ lên bậc thang.","ươc","bước"],["Mái tóc đen m__.","ươt","mượt"],["Bạn Nam bị tr__ chân.","ươt","trượt"],["Thuyền l__ trên sóng.","ươt","lướt"]])),
    êtêch:sp1("êt hay êch?",`<b>êt</b> (cuối là t) và <b>êch</b> (cuối là ch) là hai vần khác nhau.`,[[`<b>êt:</b>`,['Tết','hết','kết bạn','mệt'],'c'],[`<b>êch:</b>`,['ếch','lệch','chếch'],'b']],
      SP(["êt","êch"],[["Sắp đến T__ rồi.","êt","Tết"],["Em đã làm h__ bài.","êt","hết"],["Em muốn k__ bạn với Lan.","êt","kết"],["Em chạy m__ quá.","êt","mệt"],["Con __ ngồi trên lá sen.","êch","ếch"],["Chiếc cặp bị l__ về một phía.","êch","lệch"]])),
    oanhoach:sp1("oanh hay oach?",`<b>oanh</b> (cuối là nh) và <b>oach</b> (cuối là ch) là hai vần khác nhau.`,[[`<b>oanh:</b>`,['chim oanh','mới toanh','loanh quanh','khoanh tay'],'c'],[`<b>oach:</b>`,['thu hoạch','kế hoạch','xoạch','loạch xoạch'],'b']],
      SP(["oanh","oach"],[["Bác nông dân thu h__ lúa.","oach","hoạch"],["Em lập kế h__ học tập.","oach","hoạch"],["Con chim __ hót líu lo.","oanh","oanh"],["Chiếc áo mới t__.","oanh","toanh"],["Mèo chạy l__ quanh sân.","oanh","loanh"],["Bé kh__ tay chào cô.","oanh","khoanh"]])),
    eooe:sp1("eo hay oe?",`<b>eo</b> và <b>oe</b> là hai vần khác nhau; con nhớ mặt chữ của từ.`,[[`<b>eo:</b>`,['mèo','kéo','leo','treo'],'c'],[`<b>oe:</b>`,['khoẻ','xoè','loe','chích choè'],'b']],
      SP(["eo","oe"],[["Con m__ bắt chuột.","eo","mèo"],["Bạn Nam l__ cây rất nhanh.","eo","leo"],["Mẹ tr__ áo lên mắc.","eo","treo"],["Em rất kh__.","oe","khoẻ"],["Chiếc váy x__ ra như bông hoa.","oe","xoè"]])),
    ênênh:sp1("ên hay ênh?",`<b>ên</b> (cuối là n) và <b>ênh</b> (cuối là nh) là hai vần khác nhau.`,[[`<b>ên:</b>`,['bên','nền','lên','trên'],'c'],[`<b>ênh:</b>`,['mênh mông','thênh thang','kênh','bênh vực'],'b']],
      SP(["ên","ênh"],[["Em ngồi b__ cạnh bạn.","ên","bên"],["Chị lau n__ nhà.","ên","nền"],["Em chạy l__ cầu thang.","ên","lên"],["Biển rộng m__ mông.","ênh","mênh"],["Đường rộng th__ thang.","ênh","thênh"],["Nước chảy trong con k__.","ênh","kênh"]])),
    ipiêp:sp1("ip hay iêp?",`<b>ip</b> và <b>iêp</b> là hai vần khác nhau, cùng cuối bằng chữ p.`,[[`<b>ip:</b>`,['kịp','nhịp','dịp','chíp'],'c'],[`<b>iêp:</b>`,['tiếp','hiệp','tiếp tục','hiệp sĩ'],'b']],
      SP(["ip","iêp"],[["Em chạy cho k__ giờ học.","ip","kịp"],["Tiếng trống đều nh__.","ip","nhịp"],["Nhân d__ Tết, cả nhà sum họp.","ip","dịp"],["Chúng ta t__ tục học bài.","iêp","tiếp"],["Trận bóng có hai h__.","iêp","hiệp"]])),
    imiêm:sp1("im hay iêm?",`<b>im</b> và <b>iêm</b> là hai vần khác nhau, cùng cuối bằng chữ m.`,[[`<b>im:</b>`,['chim','kim','nhím','tim'],'c'],[`<b>iêm:</b>`,['điểm','tiêm','khiêm tốn','hiểm'],'b']],
      SP(["im","iêm"],[["Con ch__ hót líu lo.","im","chim"],["Cây k__ dùng để khâu áo.","im","kim"],["Con nh__ có nhiều gai.","im","nhím"],["Em được mười đ__ môn Toán.","iêm","điểm"],["Y tá t__ cho bé.","iêm","tiêm"],["Bạn Hoa rất kh__ tốn.","iêm","khiêm"]])),
    iuiêu:sp1("iu hay iêu?",`<b>iu</b> và <b>iêu</b> là hai vần khác nhau; con nhớ mặt chữ của từ.`,[[`<b>iu:</b>`,['chịu','dịu','trĩu','hiu hiu'],'c'],[`<b>iêu:</b>`,['diều','chiều','nhiều','yêu'],'b']],
      SP(["iu","iêu"],[["Em ch__ khó học bài.","iu","chịu"],["Cô giáo nói d__ dàng.","iu","dịu"],["Cây bưởi sai tr__ cành.","iu","trĩu"],["Con d__ bay trên trời.","iêu","diều"],["Buổi ch__ em đi học.","iêu","chiều"],["Em có nh__ bạn tốt.","iêu","nhiều"]])),
    ituyt:sp1("it hay uyt?",`<b>it</b> và <b>uyt</b> là hai vần khác nhau; <b>uyt</b> ít gặp hơn.`,[[`<b>it:</b>`,['mít','vịt','bịt','nít'],'c'],[`<b>uyt:</b>`,['quýt','huýt sáo','xe buýt'],'b']],
      SP(["it","uyt"],[["Quả m__ chín thơm.","it","mít"],["Con v__ bơi dưới ao.","it","vịt"],["Mẹ bóc quả qu__.","uyt","quýt"],["Bạn Nam h__ sáo.","uyt","huýt"],["Đi học bằng xe b__.","uyt","buýt"]])),
    ininh:sp1("in hay inh?",`<b>in</b> (cuối là n) và <b>inh</b> (cuối là nh) là hai vần khác nhau.`,[[`<b>in:</b>`,['tin','nín','chín','mình'],'c'],[`<b>inh:</b>`,['xinh','kính','sinh','bình'],'b']],
      SP(["in","inh"],[["Chị gái em rất x__ đẹp.","inh","xinh"],["Em bé nh__ khóc.","in","nín"],["Quả cam đã ch__.","in","chín"],["Em đeo k__ để nhìn rõ.","inh","kính"],["Hôm nay là s__ nhật của em.","inh","sinh"],["Em nghe t__ vui.","in","tin"]])),
    // quay lại các cặp ở tập 1 dùng chung
  };
  const moreSp=(arr)=>arr.map(k=>SPELL[k]);
  const writing=(head,what,qs,steps,sample)=>({head,what,qs:qs.map(q=>({q})),steps,sample});
  const sNghi=(t)=>wr(t);

  G.tv2_b02=lesson({title:"Bài 2 · Chính tả: c/k, ch/tr, ac/at; Vốn từ về các mùa; Dấu chấm, dấu chấm hỏi; Viết đoạn văn tả đồ vật",
    intro:"Con ôn các cặp chính tả c/k, ch/tr, ac/at, các từ về bốn mùa, dấu chấm – dấu chấm hỏi, rồi tập tả một đồ vật. Con xem từng bước nhé!",
    spell:moreSp(['ck','trch','atac']),
    vocab:{head:"Vốn từ về các mùa", groups:{"Mùa xuân":["hoa đào","lộc non","mưa phùn","tết"],"Mùa hạ":["nắng nóng","ve kêu","hoa phượng","bơi lội"],"Mùa thu":["trăng rằm","lá vàng","hoa cúc","trung thu"],"Mùa đông":["rét buốt","áo ấm","gió lạnh","sương muối"]},
      say:{"Mùa xuân":"cây cối đâm chồi, nảy lộc.","Mùa hạ":"trời nắng nóng, cây lá xanh tốt.","Mùa thu":"trời mát, lá bắt đầu vàng.","Mùa đông":"trời lạnh, người ta mặc áo ấm."}},
    punct:{head:"Dấu chấm, dấu chấm hỏi", marks:PUNCT2, steps:punctSteps(false)},
    writing:writing("Viết đoạn văn tả đồ vật","đoạn tả đồ vật",["Em tả đồ vật gì?","Đồ vật có hình dáng, màu sắc thế nào?","Đồ vật có ích lợi gì?","Em cảm thấy thế nào về đồ vật đó?"],
      [wr(`<b>Quan sát:</b> nhìn kĩ đồ vật em chọn: hình dáng, màu sắc, các bộ phận.`),wr(`<b>Viết lần lượt:</b> ① Giới thiệu đồ vật. ② Tả hình dáng, màu sắc. ③ Ích lợi. ④ Tình cảm của em.`)],
      "Chiếc cặp sách của em màu xanh. Cặp có hai quai đeo vai và một ngăn lớn. Em dùng cặp để đựng sách vở. Em rất yêu quý chiếc cặp của mình.")});

  G.tv2_b04=lesson({title:"Bài 4 · Chính tả: g/gh, s/x, uc/ut; Vốn từ về ngày Tết; Dấu chấm, dấu chấm hỏi; Viết thiệp chúc Tết",
    intro:"Con ôn các cặp chính tả g/gh, s/x, uc/ut, các từ về ngày Tết và cách viết thiệp chúc Tết. Con xem từng bước nhé!",
    spell:moreSp(['ggh','sx','ucut']),
    vocab:{head:"Vốn từ về ngày Tết", groups:{"Món ăn ngày Tết":["bánh chưng","mứt","giò chả","dưa hành"],"Hoạt động ngày Tết":["chúc Tết","lì xì","dọn nhà","gói bánh"],"Cây, hoa ngày Tết":["hoa đào","hoa mai","cây quất","hoa cúc"]},
      say:{"Món ăn ngày Tết":"các món ăn quen thuộc trong dịp Tết.","Hoạt động ngày Tết":"những việc mọi người làm vào dịp Tết.","Cây, hoa ngày Tết":"các loại cây, hoa người ta chưng ngày Tết."}},
    punct:{head:"Dấu chấm, dấu chấm hỏi", marks:PUNCT2, steps:punctSteps(false)},
    writing:writing("Viết thiệp chúc Tết","thiệp chúc Tết",["Em viết thiệp cho ai?","Em chúc người đó điều gì?","Em kết thúc thiệp ra sao, ghi tên ai?","Mở đầu thiệp, em chào hỏi thế nào?"],
      [wr(`<b>Nghĩ:</b> em tặng thiệp cho ai (ông bà, bố mẹ, thầy cô, bạn)?`),wr(`<b>Viết lần lượt:</b> ① Lời chào/gọi người nhận. ② Lời chúc Tết. ③ Lời hứa hoặc lời cảm ơn. ④ Tên người gửi.`)],
      "Chúc mừng năm mới! Cháu chúc ông bà luôn mạnh khoẻ, sống lâu trăm tuổi. Cháu hứa sẽ học thật giỏi. Cháu của ông bà: Hà.")});

  G.tv2_b06=lesson({title:"Bài 6 · Chính tả: ng/ngh, r/d/gi, ưc/ưt; Vốn từ về cây cối; Câu nêu đặc điểm; Viết đoạn kể việc chăm sóc cây cối",
    intro:"Con ôn các cặp chính tả ng/ngh, r/d/gi, ưc/ưt, các từ về cây cối, câu nêu đặc điểm và cách kể việc chăm sóc cây. Con xem từng bước nhé!",
    spell:moreSp(['ngngh','rdgi','ưcưt']),
    vocab:{head:"Vốn từ về cây cối", groups:{"Các bộ phận của cây":["rễ","thân","cành","lá","hoa","quả"],"Tên một số loại cây":["cây cam","cây dừa","cây tre","cây bàng"],"Việc chăm sóc cây":["tưới nước","bón phân","nhổ cỏ","bắt sâu"]},
      say:{"Các bộ phận của cây":"các phần tạo nên một cái cây.","Tên một số loại cây":"tên các loại cây quen thuộc.","Việc chăm sóc cây":"những việc làm để cây lớn nhanh."}},
    sent:{head:"Câu nêu đặc điểm (Ai thế nào?)", steps:ddSteps, kinds:['dd']},
    writing:writing("Viết đoạn kể việc chăm sóc cây cối","đoạn kể việc chăm sóc cây",["Em chăm sóc cây nào, ở đâu?","Em đã làm những việc gì cho cây?","Cây lớn lên như thế nào?","Em cảm thấy thế nào khi chăm cây?"],
      [wr(`<b>Nhớ lại:</b> em hoặc người nhà đã chăm sóc một cái cây nào?`),wr(`<b>Viết lần lượt:</b> ① Cây gì, ở đâu? ② Em làm những việc gì (tưới nước, nhổ cỏ…)? ③ Cây thay đổi thế nào? ④ Em thấy thế nào?`)],
      "Trước sân nhà em có một chậu hoa hồng. Sáng nào em cũng tưới nước và nhổ cỏ cho hoa. Mấy hôm sau, cây đâm chồi non. Em rất vui vì cây lớn lên từng ngày.")});

  G.tv2_b08=lesson({title:"Bài 8 · Chính tả: uynh/uych, l/n, iêt/iêc; Vốn từ về thiên nhiên; Câu nêu đặc điểm; Viết đoạn kể một sự việc em đã chứng kiến",
    intro:"Con ôn các cặp chính tả uynh/uych, l/n, iêt/iêc, các từ về thiên nhiên và cách kể một sự việc em đã thấy. Con xem từng bước nhé!",
    spell:moreSp(['uynh','ln','iêtiêc']),
    vocab:{head:"Vốn từ về thiên nhiên", groups:{"Hiện tượng thiên nhiên":["mưa","gió","sấm chớp","cầu vồng"],"Cảnh vật thiên nhiên":["núi","sông","biển","rừng"]},
      say:{"Hiện tượng thiên nhiên":"những điều xảy ra trong thiên nhiên.","Cảnh vật thiên nhiên":"các cảnh vật có sẵn trong thiên nhiên."}},
    sent:{head:"Câu nêu đặc điểm (Ai thế nào?)", steps:ddSteps, kinds:['dd']},
    writing:writing("Viết đoạn kể một sự việc em đã chứng kiến","đoạn kể một sự việc em chứng kiến",["Em chứng kiến sự việc gì?","Sự việc xảy ra khi nào, ở đâu?","Ai tham gia, họ làm gì?","Em nghĩ gì về sự việc đó?"],
      [wr(`<b>Nhớ lại:</b> một việc em tận mắt nhìn thấy (một việc tốt, một sự kiện ở trường…).`),wr(`<b>Viết lần lượt:</b> ① Việc gì? ② Khi nào, ở đâu? ③ Ai làm gì? ④ Em nghĩ gì?`)],
      "Hôm qua, trên đường đi học, em thấy một bạn nhỏ nhặt chiếc mũ bị gió thổi rơi trả cho bác bảo vệ. Bác khen bạn ngoan. Em rất cảm động và muốn học tập bạn.")});

  G.tv2_b10=lesson({title:"Bài 10 · Chính tả: uya/uyu, iêu/ươu, uôt/uôc; Vốn từ về muông thú; Dấu chấm, dấu chấm hỏi, dấu chấm than; Viết đoạn giới thiệu tranh, ảnh về con vật",
    intro:"Con ôn các cặp chính tả uya/uyu, iêu/ươu, uôt/uôc, các từ về muông thú và ba dấu cuối câu. Con xem từng bước nhé!",
    spell:moreSp(['uyauyu','ieuuou','uôtuôc']),
    vocab:{head:"Vốn từ về muông thú", groups:{"Thú dữ":["hổ","sư tử","báo","sói"],"Thú hiền lành":["hươu","nai","thỏ","voi"]},
      say:{"Thú dữ":"thú to khoẻ, hay săn các con vật khác.","Thú hiền lành":"thú ăn cỏ, lá, ít khi làm hại con vật khác."}},
    punct:{head:"Dấu chấm, dấu chấm hỏi, dấu chấm than", marks:PUNCT3, steps:punctSteps(true)},
    writing:writing("Viết đoạn giới thiệu tranh, ảnh về con vật","đoạn giới thiệu tranh ảnh về con vật",["Em giới thiệu tranh (ảnh) con vật nào?","Con vật có hình dáng, màu sắc thế nào?","Con vật đang làm gì trong tranh?","Em thích điều gì ở bức tranh?"],
      [wr(`<b>Quan sát:</b> nhìn tranh hoặc ảnh con vật: hình dáng, màu sắc, nó đang làm gì.`),wr(`<b>Viết lần lượt:</b> ① Tên con vật. ② Hình dáng, màu sắc. ③ Hoạt động. ④ Em thích gì?`)],
      "Bức ảnh chụp một chú voi con. Voi có đôi tai to, cái vòi dài. Chú đang đi bên mẹ trên thảo nguyên. Em rất thích dáng đi chậm rãi của chú voi.")});

  G.tv2_b12=lesson({title:"Bài 12 · Chính tả: d/gi, iu/ưu, ươc/ươt; Vốn từ về vật nuôi; Câu nêu đặc điểm của các loài vật; Viết đoạn kể hoạt động của con vật",
    intro:"Con ôn các cặp chính tả d/gi, iu/ưu, ươc/ươt, các từ về vật nuôi, câu nêu đặc điểm loài vật và cách kể hoạt động của con vật. Con xem từng bước nhé!",
    spell:moreSp(['dgi','iuuu','ươcươt']),
    vocab:{head:"Vốn từ về vật nuôi", groups:{"Gia súc":["trâu","bò","lợn","dê"],"Gia cầm":["gà","vịt","ngan","ngỗng"]},
      say:{"Gia súc":"vật nuôi có bốn chân.","Gia cầm":"vật nuôi có hai chân, có cánh, đẻ trứng."}},
    sent:{head:"Câu nêu đặc điểm của loài vật", steps:[wr(`<b>Từ chỉ đặc điểm của loài vật:</b> nhanh nhẹn, hiền lành, to khoẻ, lông mượt…`, chips(['nhanh nhẹn','hiền lành','to khoẻ','lông mượt'],'b'))].concat(ddSteps.slice(1)), kinds:['dd']},
    writing:writing("Viết đoạn kể hoạt động của con vật","đoạn kể hoạt động của con vật",["Em kể về con vật nào?","Con vật làm những việc gì?","Con vật làm việc đó như thế nào?","Em cảm thấy thế nào về con vật?"],
      [wr(`<b>Nhớ lại:</b> một con vật em thấy hoặc nuôi (chó, mèo, gà…).`),wr(`<b>Viết lần lượt:</b> ① Con vật gì? ② Nó làm những việc gì? ③ Làm như thế nào? ④ Em thấy thế nào?`)],
      "Nhà em có một chú mèo tên là Mun. Sáng nào Mun cũng vươn vai rồi nhảy lên bậu cửa sưởi nắng. Chú liếm lông và kêu meo meo. Em rất quý chú mèo này.")});

  G.tv2_b14=lesson({title:"Bài 14 · Chính tả: ng/ngh, tr/ch, êt/êch; Vốn từ về bảo vệ môi trường; Dấu phẩy; Viết lời xin lỗi",
    intro:"Con ôn các cặp chính tả ng/ngh, tr/ch, êt/êch, các từ về bảo vệ môi trường, dấu phẩy và cách viết lời xin lỗi. Con xem từng bước nhé!",
    spell:moreSp(['ngngh','trch','êtêch']),
    vocab:{head:"Vốn từ về bảo vệ môi trường", groups:{"Việc nên làm":["trồng cây","nhặt rác","tiết kiệm nước","tắt đèn khi ra khỏi phòng"],"Việc không nên làm":["vứt rác bừa bãi","chặt phá cây","xả nước bẩn ra sông","đốt rác"]},
      say:{"Việc nên làm":"việc làm giúp môi trường sạch, đẹp.","Việc không nên làm":"việc làm gây hại cho môi trường."}},
    punct:{head:"Dấu phẩy ( , )", kind:'phay', steps:[wr(`Dấu phẩy <b>ngăn cách các từ cùng chỉ sự vật</b> hoặc cùng chỉ hoạt động được kể ra.`, sentence([['Chúng em','' ],['nhặt rác','b'],[',',''],['tưới cây','b'],['và',''],['quét lớp','b'],['.','']])),
      wr(`Giữa các từ được kể ra thì đặt dấu phẩy. Trước chữ <b>“và”</b> nối từ cuối cùng thì không đặt.`)]},
    writing:writing("Viết lời xin lỗi","lời xin lỗi",["Em xin lỗi ai?","Em đã làm điều gì chưa đúng?","Em nói lời xin lỗi như thế nào?","Em hứa điều gì để không lặp lại?"],
      [wr(`<b>Nghĩ:</b> em đã làm gì khiến người khác buồn hoặc thiệt hại?`),wr(`<b>Viết lần lượt:</b> ① Gọi người nhận. ② Nói rõ việc em làm chưa đúng. ③ Lời xin lỗi chân thành. ④ Lời hứa sửa lỗi.`)],
      "Cô ơi, em xin lỗi cô vì hôm nay em đã vứt giấy ra sân trường. Em biết làm vậy là chưa đúng. Em hứa từ nay sẽ bỏ rác vào thùng. Em xin lỗi cô ạ.")});

  G.tv2_b16=lesson({title:"Bài 16 · Chính tả: oanh/oach, s/x, hỏi/ngã; Vốn từ về loài vật nhỏ bé; Dấu chấm, dấu chấm hỏi; Viết đoạn nói về việc làm bảo vệ môi trường",
    intro:"Con ôn các cặp chính tả oanh/oach, s/x, hỏi/ngã, các từ về loài vật nhỏ bé và cách viết về việc bảo vệ môi trường. Con xem từng bước nhé!",
    spell:moreSp(['oanhoach','sx','hn']),
    vocab:{head:"Vốn từ về loài vật nhỏ bé", groups:{"Côn trùng":["kiến","ong","bướm","chuồn chuồn"],"Loài vật sống dưới nước":["cá","tôm","cua","ốc"]},
      say:{"Côn trùng":"các con vật nhỏ, có sáu chân, thường bay hoặc bò.","Loài vật sống dưới nước":"các con vật sống trong sông, ao, biển."}},
    punct:{head:"Dấu chấm, dấu chấm hỏi", marks:PUNCT2, steps:punctSteps(false)},
    writing:writing("Viết đoạn nói về việc làm bảo vệ môi trường","đoạn nói về việc bảo vệ môi trường",["Em hoặc mọi người đã làm việc gì để bảo vệ môi trường?","Việc đó diễn ra khi nào, ở đâu?","Việc đó có ích lợi gì?","Em cảm thấy thế nào?"],
      [wr(`<b>Chọn:</b> một việc làm bảo vệ môi trường mà em hoặc lớp em đã làm.`),wr(`<b>Viết lần lượt:</b> ① Việc gì? ② Khi nào, ở đâu? ③ Ích lợi. ④ Cảm nghĩ.`)],
      "Sáng thứ bảy, cả lớp em cùng nhặt rác ở sân trường. Các bạn nhặt giấy và vỏ bim bim bỏ vào thùng. Sân trường trở nên sạch đẹp. Em thấy thật vui.")});

  G.tv2_b18=lesson({title:"Bài 18 · Chính tả: d/gi, ch/tr, hỏi/ngã; Luyện tập dấu câu (dấu chấm, dấu chấm than, dấu phẩy); Viết đoạn giới thiệu một đồ dùng học tập",
    intro:"Con ôn các cặp chính tả d/gi, ch/tr, hỏi/ngã, các dấu câu và cách giới thiệu một đồ dùng học tập. Con xem từng bước nhé!",
    spell:moreSp(['dgi','trch','hn']),
    punct:{head:"Dấu chấm, dấu chấm than, dấu phẩy", marks:PUNCT3, steps:punctSteps(true).concat([wr(`<b>Dấu phẩy ( , )</b> ngăn cách các từ cùng chỉ sự vật được kể ra: <i>Trong cặp có sách, vở và bút.</i>`)])},
    extraGens:[phayQ],
    sent:{head:"Câu giới thiệu (Ai là gì?)", steps:gtSteps, kinds:['gt']},
    writing:writing("Viết đoạn giới thiệu một đồ dùng học tập","đoạn giới thiệu đồ dùng học tập",["Đồ dùng đó là gì?","Đồ dùng có hình dáng, màu sắc thế nào?","Đồ dùng giúp em làm gì?","Em giữ gìn đồ dùng ra sao?"],
      [wr(`<b>Chọn:</b> một đồ dùng học tập em hay dùng (bút, thước, hộp bút…).`),wr(`<b>Viết lần lượt:</b> ① Tên đồ dùng. ② Hình dáng, màu sắc. ③ Công dụng. ④ Cách giữ gìn.`)],
      "Đây là chiếc hộp bút của em. Hộp màu hồng, nắp đậy có hình chú thỏ. Em dùng hộp để đựng bút chì và thước kẻ. Em luôn giữ hộp bút sạch sẽ.")});

  G.tv2_b20=lesson({title:"Bài 20 · Chính tả: eo/oe, l/n, ên/ênh; Vốn từ về giao tiếp, kết nối; Dấu chấm, dấu phẩy; Viết đoạn tả đồ dùng trong gia đình",
    intro:"Con ôn các cặp chính tả eo/oe, l/n, ên/ênh, các từ về giao tiếp, dấu chấm – dấu phẩy và cách tả một đồ dùng trong nhà. Con xem từng bước nhé!",
    spell:moreSp(['eooe','ln','ênênh']),
    vocab:{head:"Vốn từ về giao tiếp, kết nối", groups:{"Cách giao tiếp, kết nối":["gọi điện thoại","viết thư","nhắn tin","gặp mặt trò chuyện"],"Đồ vật giúp kết nối":["điện thoại","máy tính","phong bì","tem thư"]},
      say:{"Cách giao tiếp, kết nối":"những cách để nói chuyện, gửi lời tới người khác.","Đồ vật giúp kết nối":"các vật giúp chúng ta liên lạc."}},
    punct:{head:"Dấu chấm, dấu phẩy", kind:'phay', steps:[wr(`<b>Dấu chấm ( . )</b> đặt cuối câu kể.`, sentence([['Em gọi điện cho bà','b'],['.','c']])),
      wr(`<b>Dấu phẩy ( , )</b> ngăn cách các từ cùng chỉ sự vật hoặc hoạt động.`, sentence([['Em gửi thư','b'],[',',''],['gọi điện','b'],['và',''],['nhắn tin','b'],['.','']]))]},
    writing:writing("Viết đoạn tả đồ dùng trong gia đình","đoạn tả đồ dùng trong gia đình",["Em tả đồ dùng nào trong nhà?","Đồ dùng có hình dáng, màu sắc thế nào?","Đồ dùng có ích lợi gì cho gia đình?","Em giữ gìn đồ dùng đó thế nào?"],
      [wr(`<b>Chọn:</b> một đồ dùng trong nhà (nồi cơm điện, quạt, ti vi…).`),wr(`<b>Viết lần lượt:</b> ① Tên đồ dùng. ② Hình dáng, màu sắc. ③ Ích lợi. ④ Cách giữ gìn.`)],
      "Nhà em có một chiếc quạt điện màu trắng. Quạt có ba cánh tròn, quay vù vù. Mùa hè, quạt giúp cả nhà mát mẻ. Em không nghịch quạt để giữ cho quạt bền.")});

  G.tv2_b22=lesson({title:"Bài 22 · Chính tả: d/gi, s/x, ip/iêp; Vốn từ về nghề nghiệp; Viết lời cảm ơn",
    intro:"Con ôn các cặp chính tả d/gi, s/x, ip/iêp, các từ về nghề nghiệp và cách viết lời cảm ơn. Con xem từng bước nhé!",
    spell:moreSp(['dgi','sx','ipiêp']),
    vocab:{head:"Vốn từ về nghề nghiệp", groups:{"Tên nghề nghiệp":["bác sĩ","thợ xây","giáo viên","nông dân"],"Công việc":["khám bệnh","xây nhà","dạy học","cấy lúa"]},
      say:{"Tên nghề nghiệp":"tên những người làm một nghề.","Công việc":"việc người làm nghề đó thực hiện."}},
    writing:writing("Viết lời cảm ơn","lời cảm ơn",["Em cảm ơn ai?","Người đó đã giúp em việc gì?","Em nói lời cảm ơn như thế nào?","Em mong muốn điều gì cho người đó?"],
      [wr(`<b>Nghĩ:</b> ai vừa giúp đỡ em? Họ đã làm gì?`),wr(`<b>Viết lần lượt:</b> ① Gọi người được cảm ơn. ② Nói rõ việc họ đã giúp. ③ Lời cảm ơn chân thành. ④ Lời chúc.`)],
      "Cô Hoa ơi, em cảm ơn cô đã giảng lại bài toán cho em. Nhờ cô, em đã hiểu bài. Em xin chúc cô luôn khoẻ mạnh và vui vẻ.")});

  G.tv2_b24=lesson({title:"Bài 24 · Viết hoa tên người; Chính tả: iu/ưu, im/iêm; Vốn từ về Bác Hồ và nhân dân; Viết đoạn kể một sự việc",
    intro:"Con ôn cách viết hoa tên người, các cặp chính tả iu/ưu, im/iêm, các từ về Bác Hồ và nhân dân và cách kể một sự việc. Con xem từng bước nhé!",
    sent:{head:"Viết hoa tên người", steps:nameSteps, kinds:['name']},
    spell:moreSp(['iuuu','imiêm']),
    vocab:{head:"Vốn từ về Bác Hồ và nhân dân", groups:{"Từ chỉ tình cảm":["kính yêu","biết ơn","tin tưởng","nhớ ơn"],"Từ chỉ việc làm của Bác":["thăm hỏi","dạy bảo","chăm lo","động viên"]},
      say:{"Từ chỉ tình cảm":"những tình cảm nhân dân dành cho Bác Hồ.","Từ chỉ việc làm của Bác":"những việc Bác quan tâm tới nhân dân."}},
    writing:writing("Viết đoạn kể một sự việc","đoạn kể một sự việc",["Em kể sự việc gì?","Sự việc xảy ra khi nào, ở đâu?","Những ai tham gia, họ làm gì?","Kết quả ra sao, em nghĩ gì?"],
      [wr(`<b>Chọn:</b> một sự việc em nhớ nhất (một chuyến đi, một buổi lễ ở trường…).`),wr(`<b>Viết lần lượt:</b> ① Sự việc gì? ② Khi nào, ở đâu? ③ Ai làm gì? ④ Kết quả và cảm nghĩ.`)],
      "Tuần trước, lớp em tổ chức buổi văn nghệ chào mừng ngày Nhà giáo. Các bạn lần lượt lên hát và múa. Cô giáo vỗ tay khen cả lớp. Em rất vui và tự hào.")});

  G.tv2_b26=lesson({title:"Bài 26 · Viết hoa tên riêng địa lí; Chính tả: ch/tr, iu/iêu; Vốn từ về sản phẩm truyền thống; Câu giới thiệu; Viết đoạn giới thiệu đồ vật làm từ tre, gỗ",
    intro:"Con ôn cách viết hoa tên riêng địa lí, các cặp chính tả ch/tr, iu/iêu, các từ về sản phẩm truyền thống, câu giới thiệu. Con xem từng bước nhé!",
    sent:{head:"Viết hoa tên riêng địa lí; Câu giới thiệu", steps:placeSteps.concat(gtSteps), kinds:['place','gt']},
    spell:moreSp(['trch','iuiêu']),
    vocab:{head:"Vốn từ về sản phẩm truyền thống", groups:{"Đồ làm từ tre":["rổ","rá","giần","sàng"],"Đồ làm từ gỗ":["bàn","ghế","tủ","giường"]},
      say:{"Đồ làm từ tre":"đồ đan, chế tác từ cây tre.","Đồ làm từ gỗ":"đồ do thợ mộc làm từ gỗ."}},
    writing:writing("Viết đoạn giới thiệu một đồ vật làm từ tre hoặc gỗ","đoạn giới thiệu đồ vật làm từ tre, gỗ",["Đồ vật đó là gì, làm từ gì?","Đồ vật có hình dáng, màu sắc thế nào?","Đồ vật dùng để làm gì?","Em cảm thấy thế nào về đồ vật đó?"],
      [wr(`<b>Chọn:</b> một đồ vật làm từ tre hoặc gỗ ở nhà em.`),wr(`<b>Viết lần lượt:</b> ① Tên đồ vật, làm từ gì. ② Hình dáng, màu sắc. ③ Công dụng. ④ Cảm nghĩ.`)],
      "Đây là chiếc rổ tre của bà em. Rổ đan thưa, màu vàng nhạt, miệng tròn. Bà dùng rổ để đựng rau. Em thấy chiếc rổ rất bền và đẹp.")});

  G.tv2_b28=lesson({title:"Bài 28 · Chính tả: it/uyt, ươu/iêu, in/inh; Vốn từ về loài vật dưới đáy biển; Dấu chấm, dấu phẩy; Viết đoạn kể một buổi đi chơi",
    intro:"Con ôn các cặp chính tả it/uyt, ươu/iêu, in/inh, các từ về loài vật dưới biển, dấu chấm – dấu phẩy và cách kể một buổi đi chơi. Con xem từng bước nhé!",
    spell:moreSp(['ituyt','ieuuou','ininh']),
    vocab:{head:"Vốn từ về loài vật dưới đáy biển", groups:{"Loài có vỏ cứng":["cua","ốc","sò","tôm hùm"],"Loài không có vỏ":["cá","mực","sứa","bạch tuộc"]},
      say:{"Loài có vỏ cứng":"cơ thể có lớp vỏ cứng bảo vệ bên ngoài.","Loài không có vỏ":"cơ thể mềm hoặc có vảy, không có vỏ cứng."}},
    punct:{head:"Dấu chấm, dấu phẩy", kind:'phay', steps:[wr(`<b>Dấu chấm ( . )</b> đặt cuối câu kể.`, sentence([['Em đi biển cùng gia đình','b'],['.','c']])),
      wr(`<b>Dấu phẩy ( , )</b> ngăn cách các từ cùng chỉ sự vật được kể ra.`, sentence([['Dưới biển có','' ],['cá','b'],[',',''],['tôm','b'],['và',''],['cua','b'],['.','']]))]},
    writing:writing("Viết đoạn kể một buổi đi chơi","đoạn kể một buổi đi chơi",["Em đi chơi ở đâu, cùng ai?","Em đi vào lúc nào?","Em thấy và làm những gì?","Em cảm thấy thế nào sau buổi đi chơi?"],
      [wr(`<b>Nhớ lại:</b> một buổi đi chơi em thích (công viên, biển, thăm ông bà…).`),wr(`<b>Viết lần lượt:</b> ① Đi đâu, cùng ai, khi nào? ② Em thấy gì? ③ Em làm gì? ④ Cảm nghĩ.`)],
      "Chủ nhật, em cùng bố mẹ đi công viên. Em thả diều và chơi cầu trượt. Bố mua cho em một que kem. Em rất vui và mong sớm được đi chơi nữa.")});

  G.tv2_b30=lesson({title:"Bài 30 · Viết hoa tên riêng địa lí; Chính tả: r/d/gi, hỏi/ngã; Vốn từ về nghề nghiệp; Viết đoạn kể về công việc của một người",
    intro:"Con ôn cách viết hoa tên riêng địa lí, các cặp chính tả r/d/gi, hỏi/ngã, các từ về nghề nghiệp và cách kể về công việc của một người. Con xem từng bước nhé!",
    sent:{head:"Viết hoa tên riêng địa lí", steps:placeSteps, kinds:['place']},
    spell:moreSp(['rdgi','hn']),
    vocab:{head:"Vốn từ về nghề nghiệp", groups:{"Người làm nghề":["bác sĩ","công an","đầu bếp","thợ may"],"Việc họ làm":["chữa bệnh","giữ gìn trật tự","nấu ăn","may quần áo"]},
      say:{"Người làm nghề":"tên các nghề nghiệp quen thuộc.","Việc họ làm":"công việc của người làm nghề."}},
    writing:writing("Viết đoạn kể về công việc của một người","đoạn kể về công việc của một người",["Em kể về công việc của ai?","Người đó làm nghề gì?","Hằng ngày người đó làm những việc gì?","Công việc đó có ích gì, em cảm thấy thế nào?"],
      [wr(`<b>Chọn:</b> một người em biết rõ (bố, mẹ, cô giáo, bác hàng xóm…).`),wr(`<b>Viết lần lượt:</b> ① Người đó là ai, làm nghề gì? ② Công việc hằng ngày. ③ Ích lợi của công việc. ④ Cảm nghĩ.`)],
      "Mẹ em là cô giáo. Hằng ngày, mẹ soạn bài và giảng bài cho học sinh. Công việc của mẹ giúp các bạn nhỏ biết đọc, biết viết. Em rất tự hào về mẹ.")});


  /* ===== TẬP 1 (tiếp): Bài 10, 12, 18, 20 — làm lại cho đúng cặp chính tả trong sách ===== */
  const VD=SP(["v","d"],[["Em __ui chơi cùng bạn.","v","vui"],["Em đi học __ề nhà.","v","về"],["Em ghi bài vào __ở.","v","vở"],["Cô giáo __ạy em học.","d","dạy"],["Em đi __ép đến lớp.","d","dép"],["Cây __ừa cao vút.","d","dừa"]]);
  const IEUUU=SP(["iêu","ưu"],[["Buổi ch__ em đi học.","iêu","chiều"],["Con d__ bay cao trên trời.","iêu","diều"],["Em h__ bài rồi.","iêu","hiểu"],["Xe c__ hoả chạy nhanh.","ưu","cứu"],["Em gửi thư ở b__ điện.","ưu","bưu"],["Bác đã về h__.","ưu","hưu"]]);
  const ENENG=SP(["en","eng"],[["Hoa s__ nở rộ trong ao.","en","sen"],["Bố bật đ__ lên cho sáng.","en","đèn"],["Em đã qu__ với trường mới.","en","quen"],["Chiếc x__ dùng để xúc đất.","eng","xẻng"],["Tiếng k__ báo giờ ra chơi vang lên.","eng","kẻng"],["Mẹ đan chiếc áo l__ cho em.","en","len"]]);
  const IENIENG=SP(["iên","iêng"],[["Sóng vỗ ngoài b__ cả.","iên","biển"],["Em nghe t__ chim hót.","iêng","tiếng"],["Mẹ cho em m__ bánh.","iêng","miếng"],["Bạn Nam rất s__ năng.","iêng","siêng"],["Con k__ bò trên cành.","iên","kiến"],["Bà t__ hiện ra trong truyện cổ tích.","iên","tiên"]]);
  const SPX={
    vd:sp1("v hay d?",`<b>v</b> và <b>d</b> nghe gần giống nhau; con nhớ mặt chữ của từ.`,[[`Từ viết với <b>v</b>:`,['vui','về','vở','vườn'],'c'],[`Từ viết với <b>d</b>:`,['dạy','dép','dừa','dòng'],'b']],VD),
    ieuuu:sp1("iêu hay ưu?",`<b>iêu</b> và <b>ưu</b> là hai vần khác nhau; con nhớ mặt chữ của từ.`,[[`<b>iêu:</b>`,['chiều','diều','hiểu','nhiều'],'c'],[`<b>ưu:</b>`,['cứu hoả','bưu điện','hưu trí','lưu luyến'],'b']],IEUUU),
    eneng:sp1("en hay eng?",`<b>en</b> (cuối là n) và <b>eng</b> (cuối là ng) là hai vần khác nhau.`,[[`<b>en:</b>`,['sen','đèn','quen','len'],'c'],[`<b>eng:</b>`,['xẻng','kẻng','leng keng'],'b']],ENENG),
    ieniêng:sp1("iên hay iêng?",`<b>iên</b> (cuối là n) và <b>iêng</b> (cuối là ng) là hai vần khác nhau.`,[[`<b>iên:</b>`,['biển','kiến','tiên','hiền'],'c'],[`<b>iêng:</b>`,['tiếng','miếng','siêng năng','chiêng'],'b']],IENIENG)};

  G.tv1_b10=lesson({title:"Bài 10 · Chính tả: c/k, ch/tr, v/d; Từ chỉ sự vật, hoạt động; Câu nêu hoạt động; Viết thời gian biểu",
    intro:"Con ôn các cặp chính tả c/k, ch/tr, v/d, từ chỉ sự vật – hoạt động, câu nêu hoạt động và cách viết thời gian biểu. Con xem từng bước nhé!",
    spell:[SPELL.ck,SPELL.trch,SPX.vd],
    vocab:{head:"Từ chỉ sự vật, từ chỉ hoạt động", groups:{"Từ chỉ sự vật":["bàn","sách","bút","thước"],"Từ chỉ hoạt động":["đọc","viết","vẽ","tính"]}, say:{"Từ chỉ sự vật":"tên đồ vật, con vật, cây cối…","Từ chỉ hoạt động":"việc làm của người, con vật."}},
    sent:{head:"Câu nêu hoạt động (Ai làm gì?)", steps:hdSteps, kinds:['hd']},
    writing:{head:"Viết thời gian biểu", what:"thời gian biểu", qs:[{q:"Mỗi việc làm vào giờ nào trong ngày?"},{q:"Em làm những việc gì trong ngày?"},{q:"Các việc được xếp theo thứ tự nào?"},{q:"Thời gian biểu của ngày nào?"}], noise:["Chỉ viết một việc rồi dừng","Viết ngẫu nhiên, không cần giờ","Chép lại nguyên thời khoá biểu của lớp"],
      steps:[wr(`<b>Nghĩ:</b> hằng ngày em làm những việc gì, vào lúc nào?`),wr(`<b>Viết thành từng dòng:</b> ghi <b>giờ</b> rồi ghi <b>việc làm</b>, xếp theo thứ tự trong ngày.`)],
      sample:"6 giờ: thức dậy, đánh răng. 7 giờ: ăn sáng. 7 giờ 30: đến trường. 11 giờ: về nhà ăn cơm. 8 giờ tối: đi ngủ."}});

  G.tv1_b12=lesson({title:"Bài 12 · Chính tả: g/gh, s/x, hỏi/ngã; Từ chỉ sự vật, đặc điểm; Câu nêu đặc điểm; Lập danh sách học sinh",
    intro:"Con ôn các cặp chính tả g/gh, s/x, dấu hỏi – dấu ngã, từ chỉ sự vật – đặc điểm, câu nêu đặc điểm và cách lập danh sách. Con xem từng bước nhé!",
    spell:[SPELL.ggh,SPELL.sx,SPELL.hn],
    vocab:{head:"Từ chỉ sự vật, từ chỉ đặc điểm", groups:{"Từ chỉ sự vật":["hoa","lá","cây","bàn"],"Từ chỉ đặc điểm":["đẹp","xanh","cao","thơm"]}, say:{"Từ chỉ sự vật":"tên đồ vật, cây cối, con vật…","Từ chỉ đặc điểm":"màu sắc, hình dáng, tính chất."}},
    sent:{head:"Câu nêu đặc điểm (Ai thế nào?)", steps:ddSteps, kinds:['dd']},
    writing:{head:"Lập danh sách học sinh", what:"danh sách học sinh", qs:[{q:"Danh sách ghi những cột nào (số thứ tự, họ và tên)?"},{q:"Tên mỗi bạn viết thế nào?"},{q:"Danh sách của tổ nào, lớp nào?"},{q:"Các tên được xếp theo thứ tự nào?"}], noise:["Chỉ ghi tên, không cần số thứ tự","Viết tên không cần viết hoa","Viết liền một dòng, không chia hàng"],
      steps:[wr(`<b>Ghi tiêu đề:</b> Danh sách học sinh tổ … lớp ….`),wr(`<b>Kẻ cột:</b> số thứ tự, họ và tên. Viết mỗi bạn một dòng, nhớ <b>viết hoa chữ cái đầu mỗi tiếng</b> của tên.`)],
      sample:"Danh sách học sinh tổ 1 — 1. Nguyễn Văn An. 2. Trần Thị Bình. 3. Lê Minh Châu."}});

  G.tv1_b18=lesson({title:"Bài 18 · Chính tả: c/k, iêu/ưu, en/eng; Mở rộng vốn từ về tình cảm bạn bè; Dấu chấm, dấu chấm hỏi, dấu chấm than; Viết đoạn kể một hoạt động em tham gia cùng bạn",
    intro:"Con ôn các cặp chính tả c/k, iêu/ưu, en/eng, các từ về tình cảm bạn bè, ba dấu cuối câu và cách kể một hoạt động cùng bạn. Con xem từng bước nhé!",
    spell:[SPELL.ck,SPX.ieuuu,SPX.eneng],
    vocab:{head:"Mở rộng vốn từ: Tình cảm bạn bè", groups:{"Từ chỉ tình cảm bạn bè":["thân thiết","quý mến","yêu quý","gắn bó"],"Việc làm giữa bạn bè":["giúp đỡ","chia sẻ","chơi cùng","nhường nhịn"]}, say:{"Từ chỉ tình cảm bạn bè":"từ nói về tình cảm giữa những người bạn.","Việc làm giữa bạn bè":"những việc bạn bè làm cho nhau."}},
    punct:{head:"Dấu chấm, dấu chấm hỏi, dấu chấm than", marks:PUNCT3, steps:punctSteps(true)},
    writing:{head:"Viết đoạn kể một hoạt động em tham gia cùng bạn", what:"đoạn kể một hoạt động cùng bạn", qs:[{q:"Em tham gia hoạt động gì, cùng những bạn nào?"},{q:"Hoạt động diễn ra khi nào, ở đâu?"},{q:"Em và các bạn làm những việc gì?"},{q:"Em cảm thấy thế nào?"}],
      steps:[wr(`<b>Nhớ lại:</b> một hoạt động em làm cùng bạn (trực nhật, tập văn nghệ, trồng cây…).`),wr(`<b>Viết lần lượt:</b> ① Hoạt động gì, cùng ai? ② Khi nào, ở đâu? ③ Làm những việc gì? ④ Cảm nghĩ.`)],
      sample:"Hôm qua, em cùng Lan và Hà trực nhật. Lan quét lớp, Hà lau bảng, em xếp lại bàn ghế. Lớp học trở nên sạch sẽ. Em thấy rất vui vì được làm việc cùng các bạn."}});

  G.tv1_b20=lesson({title:"Bài 20 · Chính tả: g/gh, iu/ưu, iên/iêng; Từ chỉ đặc điểm, hoạt động; Câu nêu hoạt động; Viết đoạn kể một giờ chơi",
    intro:"Con ôn các cặp chính tả g/gh, iu/ưu, iên/iêng, từ chỉ đặc điểm – hoạt động, câu nêu hoạt động và cách kể một giờ chơi. Con xem từng bước nhé!",
    spell:[SPELL.ggh,SPELL.iuuu,SPX.ieniêng],
    vocab:{head:"Từ chỉ hoạt động, từ chỉ đặc điểm", groups:{"Từ chỉ hoạt động":["chạy","nhảy","đọc","vẽ"],"Từ chỉ đặc điểm":["nhanh","cao","xinh","ngoan"]}, say:{"Từ chỉ hoạt động":"việc làm của người, con vật.","Từ chỉ đặc điểm":"màu sắc, hình dáng, tính chất, tính tình."}},
    sent:{head:"Câu nêu hoạt động (Ai làm gì?)", steps:hdSteps, kinds:['hd']},
    writing:{head:"Viết đoạn kể một giờ chơi", what:"đoạn kể một giờ chơi", qs:[{q:"Giờ chơi diễn ra khi nào, ở đâu?"},{q:"Em chơi với những bạn nào?"},{q:"Các bạn chơi trò gì, làm những việc gì?"},{q:"Em cảm thấy thế nào sau giờ chơi?"}],
      steps:[wr(`<b>Nhớ lại:</b> một giờ chơi vui ở trường.`),wr(`<b>Viết lần lượt:</b> ① Khi nào, ở đâu? ② Chơi với ai? ③ Chơi trò gì? ④ Cảm nghĩ.`)],
      sample:"Giờ ra chơi, sân trường rất vui. Em cùng các bạn chơi kéo co. Hai đội cùng nắm dây và hô thật to. Em thấy khoẻ và vui sau giờ chơi."}});

  /* ===== BÀI ÔN TẬP (lật trang) ===== */
  const page=(title,blocks)=>({title,blocks});
  const cx=(text,big)=>({type:"concept",text,big});
  const ex=(html)=>({type:"example",html});
  const reviewGens=(keys)=>[].concat(...keys.map(k=>G[k].gen));
  G.tv1_on_giuaki1={title:"Tuần 9 · Ôn tập giữa học kì 1",
    learn:{intro:"Lật từng trang để ôn lại những điều đã học trong 8 bài đầu: bảng chữ cái, từ chỉ sự vật – hoạt động – đặc điểm, các kiểu câu, chính tả.",
      pages:[
        page("Từ chỉ sự vật, hoạt động, đặc điểm",[cx("Ba loại từ cần nhớ:","sự vật · hoạt động · đặc điểm"),ex("<b>Ví dụ:</b> <i>quả bóng</i> (sự vật), <i>chạy</i> (hoạt động), <i>đẹp</i> (đặc điểm).")]),
        page("Ba kiểu câu",[cx("Ba kiểu câu đã học:","Ai là gì? · Ai làm gì? · Ai thế nào?"),ex("<i>Bố em là bác sĩ.</i> &nbsp; <i>Mẹ nấu cơm.</i> &nbsp; <i>Bông hoa rất đẹp.</i>")]),
        page("Viết hoa tên người",[cx("Tên người viết hoa chữ cái đầu của mỗi tiếng:","Nguyễn Thị Hoa"),ex("Không viết: <i>nguyễn thị hoa</i> hay <i>Nguyễn thị hoa</i>.")]),
        page("Chính tả dễ nhầm",[cx("Nhớ quy tắc:","c/k · g/gh · ng/ngh"),ex("<b>k, gh, ngh</b> chỉ viết trước <b>e, ê, i</b>. Ví dụ: <i>kể, ghế, nghe</i>; còn <i>cá, gà, ngày</i> viết c, g, ng.")]),
      ]},
    practice:[
      {type:"mc",q:"Câu nào là câu nêu hoạt động (Ai làm gì?)",options:["Mẹ nấu cơm.","Bông hoa rất đẹp.","Bố em là bác sĩ.","Trời rất xanh."],answer:0},
      {type:"mc",q:"Từ nào là từ chỉ đặc điểm?",options:["đẹp","chạy","quả bóng","đọc"],answer:0},
      {type:"mc",q:"Cách viết tên người nào đúng?",options:["Trần Văn Nam","trần văn nam","Trần văn nam","Trần Văn nam"],answer:0}],
    test:[
      {type:"mc",q:"Em __e cô giáo kể chuyện. Chọn ng hay ngh?",options:["ngh","ng"],answer:0,two:true},
      {type:"mc",q:"Câu nào là câu giới thiệu (Ai là gì?)",options:["Chú Tư là thợ mộc.","Chim hót líu lo.","Quả cam rất ngọt.","Bạn Nam đá bóng."],answer:0},
      {type:"mc",q:"Từ nào là từ chỉ hoạt động?",options:["nấu cơm","cái bàn","xinh xắn","quyển sách"],answer:0}],
    gen:[]};
  G.tv1_on_cuoiki1={title:"Tuần 18 · Ôn tập và Đánh giá cuối học kì 1",
    learn:{intro:"Lật từng trang để ôn lại cả học kì 1: các kiểu câu, các dấu câu, vốn từ gia đình – bạn bè – đồ chơi, và cách viết đoạn.",
      pages:[
        page("Các kiểu câu",[cx("Ba kiểu câu đã học:","Ai là gì? · Ai làm gì? · Ai thế nào?"),ex("Tìm bộ phận trả lời bằng cách hỏi: <b>là gì? làm gì? thế nào?</b>")]),
        page("Dấu câu",[cx("Dấu cuối câu:","dấu chấm · chấm hỏi · chấm than"),ex("Dấu phẩy ngăn cách các từ cùng chỉ sự vật hoặc hoạt động: <i>Em thích ăn táo, cam và chuối.</i>")]),
        page("Viết hoa",[cx("Viết hoa chữ cái đầu mỗi tiếng của:","tên người · tên riêng địa lí"),ex("<i>Nguyễn Thị Hoa</i>, <i>Hà Nội</i>, <i>Cần Thơ</i>.")]),
        page("Vốn từ về gia đình, bạn bè, đồ chơi",[ex("<b>Ghi nhớ:</b> yêu thương, quan tâm, chăm sóc, kính trọng… là các từ chỉ tình cảm gia đình.")]),
        page("Viết đoạn",[cx("Viết đoạn theo thứ tự:","mở đầu · nội dung · cảm nghĩ"),ex("Đầu câu viết hoa, cuối câu có dấu câu. Các câu đều nói về cùng một chủ đề.")]),
      ]},
    practice:[
      {type:"mc",q:"Điền dấu câu: Bạn tên là gì__",options:[".","?","!"],answer:1},
      {type:"mc",q:"Cách viết tên riêng địa lí nào đúng?",options:["Hà Nội","hà nội","Hà nội","hà Nội"],answer:0},
      {type:"mc",q:"Câu nào đặt dấu phẩy đúng?",options:["Em thích đọc sách, vẽ tranh và hát.","Em thích đọc sách vẽ tranh, và hát.","Em thích, đọc sách vẽ tranh và hát."],answer:0}],
    test:[
      {type:"mc",q:"Câu: “Con mèo rất ngoan.” Bộ phận nào trả lời cho câu hỏi “thế nào?”",options:["rất ngoan","Con mèo","mèo","Con"],answer:0},
      {type:"mc",q:"Điền dấu câu: Ôi, bông hoa đẹp quá__",options:[".","?","!"],answer:2},
      {type:"mc",q:"Từ nào là từ chỉ tình cảm gia đình?",options:["yêu thương","cái bàn","chạy","xanh"],answer:0}],
    gen:[]};
  G.tv2_on_giuaki2={title:"Tuần 27 · Ôn tập giữa học kì 2",
    learn:{intro:"Lật từng trang để ôn lại những điều đã học từ bài 1 đến bài 16 của học kì 2: vốn từ, dấu câu, câu nêu đặc điểm, chính tả.",
      pages:[
        page("Vốn từ theo chủ điểm",[cx("Hai chủ điểm đã học:","Vẻ đẹp quanh em · Hành tinh xanh của em"),ex("Các mùa: xuân, hạ, thu, đông; cây cối; thiên nhiên; muông thú; vật nuôi; bảo vệ môi trường.")]),
        page("Dấu câu",[cx("Dấu cuối câu:","chấm · chấm hỏi · chấm than"),ex("Dấu phẩy ngăn cách các từ cùng chỉ sự vật: <i>Em thích hoa hồng, hoa cúc và hoa lan.</i>")]),
        page("Câu nêu đặc điểm",[cx("Câu trả lời cho câu hỏi “thế nào?”:","Ai (cái gì) + thế nào"),ex("<i>Chú voi to lớn.</i> &nbsp; <i>Bông hoa rất đẹp.</i>")]),
        page("Chính tả",[cx("Nhớ những cặp dễ nhầm:","tr/ch · s/x · d/gi · hỏi/ngã"),ex("Đọc cả câu rồi chọn từ đúng nghĩa. Ví dụ: <i>thước kẻ</i>, <i>vẽ tranh</i>, <i>mứt Tết</i>.")]),
      ]},
    practice:[
      {type:"mc",q:"Từ nào thuộc nhóm “Mùa xuân”?",options:["hoa đào","hoa phượng","sương muối","trung thu"],answer:0},
      {type:"mc",q:"Điền dấu câu: Chà, bạn vẽ đẹp quá__",options:[".","?","!"],answer:2},
      {type:"mc",q:"Câu nào đặt dấu phẩy đúng?",options:["Em thích ăn táo, cam và chuối.","Em thích ăn táo cam, và chuối.","Em thích, ăn táo cam và chuối."],answer:0}],
    test:[
      {type:"mc",q:"Em thích __ tranh. Chọn từ đúng:",options:["vẽ","vẻ"],answer:0,two:true},
      {type:"mc",q:"Câu: “Con voi to lớn.” Bộ phận nào trả lời cho câu hỏi “thế nào?”",options:["to lớn","Con voi","voi","Con"],answer:0},
      {type:"mc",q:"Từ nào thuộc nhóm “Gia cầm”?",options:["gà","trâu","bò","lợn"],answer:0}],
    gen:[]};
  G.tv2_on_tap_cuoi_nam={title:"Tuần 35 · Ôn tập và Đánh giá cuối học kì 2",
    learn:{intro:"Lật từng trang để ôn lại cả học kì 2: vốn từ theo chủ điểm, dấu câu, các kiểu câu, viết hoa, cách viết đoạn và viết thiệp, lời xin lỗi, lời cảm ơn.",
      pages:[
        page("Vốn từ theo chủ điểm",[cx("Năm chủ điểm của học kì 2:","Vẻ đẹp quanh em · Hành tinh xanh · Giao tiếp và kết nối · Con người Việt Nam · Việt Nam quê hương em"),ex("Tự hỏi: từ này nói về mùa, cây, con vật, nghề nghiệp hay quê hương?")]),
        page("Dấu câu",[cx("Dấu cuối câu và dấu phẩy:","chấm · chấm hỏi · chấm than · phẩy"),ex("Kể → dấu chấm; hỏi → chấm hỏi; cảm xúc → chấm than.")]),
        page("Viết hoa",[cx("Viết hoa chữ cái đầu mỗi tiếng:","tên người · tên riêng địa lí"),ex("<i>Lê Minh Anh</i>, <i>Hải Phòng</i>, <i>Sa Pa</i>.")]),
        page("Các kiểu câu",[cx("Ba kiểu câu:","Ai là gì? · Ai làm gì? · Ai thế nào?"),ex("<i>Cô Lan là giáo viên.</i> &nbsp; <i>Bố đưa em đi học.</i> &nbsp; <i>Quả cam rất ngọt.</i>")]),
        page("Viết thiệp, lời xin lỗi, lời cảm ơn",[cx("Gồm bốn phần:","gọi người nhận · nội dung · lời chúc/xin lỗi/cảm ơn · tên người viết"),ex("Viết ngắn gọn, lịch sự, đúng điều em muốn nói.")]),
      ]},
    practice:[
      {type:"mc",q:"Cách viết tên riêng địa lí nào đúng?",options:["Sa Pa","sa pa","Sa pa","sa Pa"],answer:0},
      {type:"mc",q:"Từ nào thuộc nhóm “Gia súc”?",options:["trâu","gà","vịt","ngan"],answer:0},
      {type:"mc",q:"Điền dấu câu: Bạn thích môn học nào__",options:[".","?","!"],answer:1}],
    test:[
      {type:"mc",q:"Câu nào là câu giới thiệu (Ai là gì?)",options:["Cô Lan là giáo viên.","Bố đưa em đi học.","Quả cam rất ngọt.","Chim hót líu lo."],answer:0},
      {type:"mc",q:"Mẹ đựng rau trong cái __. Chọn từ đúng:",options:["rổ","rõ"],answer:0,two:true},
      {type:"mc",q:"Từ nào thuộc nhóm “Việc nên làm” để bảo vệ môi trường?",options:["trồng cây","vứt rác bừa bãi","chặt phá cây","đốt rác"],answer:0}],
    gen:[]};
  G.tv1_on_giuaki1.gen=reviewGens(['tv1_b08','tv1_b10','tv1_b12']).concat(CONTENT.tv1_chinhta_ngngh.gen,CONTENT.tv1_chinhta_lnan.gen,[hdQ,ddQ,gtQ,NAMEQ]);
  G.tv1_on_cuoiki1.gen=reviewGens(['tv1_b18','tv1_b20','tv1_b22','tv1_b24','tv1_b26','tv1_b28','tv1_b30','tv1_b32']).concat([hdQ,ddQ,NAMEQ,PLACEQ,punctQ(PUNCT3),phayQ]);
  G.tv2_on_giuaki2.gen=reviewGens(['tv2_b02','tv2_b04','tv2_b06','tv2_b08','tv2_b10','tv2_b12','tv2_b14','tv2_b16']);
  G.tv2_on_tap_cuoi_nam.gen=reviewGens(['tv2_b18','tv2_b20','tv2_b22','tv2_b24','tv2_b26','tv2_b28','tv2_b30']).concat([gtQ,ddQ,hdQ,PLACEQ,NAMEQ,punctQ(PUNCT3),phayQ]);

  Object.assign(CONTENT,G);
})();
