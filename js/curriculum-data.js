/* ===== KHUNG CHƯƠNG TRÌNH (nhúng từ curriculum.js) ===== */
const CURRICULUM = {
  toan: {
    name:"Toán",
    chapters:[
      // ===== TẬP 1 =====
      { ch:"Chủ đề 1: Ôn tập và bổ sung", tap:1, bai:[
        {t:"Bài 1. Ôn tập các số đến 100", key:"knt_on_so100"},
        {t:"Bài 2. Tia số. Số liền trước, số liền sau", key:"knt_tiaso"},
        {t:"Bài 3. Các thành phần của phép cộng, phép trừ", key:"knt_thanhphan"},
        {t:"Bài 4. Hơn, kém nhau bao nhiêu", key:"knt_honkem"},
        {t:"Bài 5. Ôn tập phép cộng, phép trừ (không nhớ) trong phạm vi 100", key:"knt_ontap_congtru100"},
        {t:"Bài 6. Luyện tập chung", key:"knt_luyentapchung1"},
      ]},
      { ch:"Chủ đề 2: Phép cộng, phép trừ trong phạm vi 20", tap:1, bai:[
        {t:"Bài 7. Phép cộng (qua 10) trong phạm vi 20", key:"knt_cong_qua10"},
        {t:"Bài 8. Bảng cộng (qua 10)", key:"knt_bang_cong_qua10"},
        {t:"Bài 9. Bài toán về thêm, bớt một số đơn vị", key:"knt_them_bot"},
        {t:"Bài 10. Luyện tập chung"},
        {t:"Bài 11. Phép trừ (qua 10) trong phạm vi 20", key:"knt_tru_qua10"},
        {t:"Bài 12. Bảng trừ (qua 10)", key:"knt_bang_tru_qua10"},
        {t:"Bài 13. Bài toán về nhiều hơn, ít hơn một số đơn vị", key:"knt_nhieuhon_ithon"},
        {t:"Bài 14. Luyện tập chung"},
      ]},
      { ch:"Chủ đề 3: Làm quen với khối lượng, dung tích", tap:1, bai:[
        {t:"Bài 15. Ki-lô-gam"},
        {t:"Bài 16. Lít"},
        {t:"Bài 17. Thực hành và trải nghiệm với ki-lô-gam, lít"},
        {t:"Bài 18. Luyện tập chung"},
      ]},
      { ch:"Chủ đề 4: Phép cộng, phép trừ (có nhớ) trong phạm vi 100", tap:1, bai:[
        {t:"Bài 19. Phép cộng (có nhớ) số có hai chữ số với số có một chữ số"},
        {t:"Bài 20. Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số"},
        {t:"Bài 21. Luyện tập chung"},
        {t:"Bài 22. Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số"},
        {t:"Bài 23. Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số"},
        {t:"Bài 24. Luyện tập chung"},
      ]},
      { ch:"Chủ đề 5: Làm quen với hình phẳng", tap:1, bai:[
        {t:"Bài 25. Điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng"},
        {t:"Bài 26. Đường gấp khúc. Hình tứ giác"},
        {t:"Bài 27. Thực hành gấp, cắt, ghép, xếp hình. Vẽ đoạn thẳng"},
        {t:"Bài 28. Luyện tập chung"},
      ]},
      { ch:"Chủ đề 6: Ngày – giờ, giờ – phút, ngày – tháng", tap:1, bai:[
        {t:"Bài 29. Ngày – giờ, giờ – phút"},
        {t:"Bài 30. Ngày – tháng"},
        {t:"Bài 31. Thực hành và trải nghiệm xem đồng hồ, xem lịch"},
        {t:"Bài 32. Luyện tập chung"},
      ]},
      { ch:"Chủ đề 7: Ôn tập học kì 1", tap:1, bai:[
        {t:"Bài 33. Ôn tập phép cộng, phép trừ trong phạm vi 20, 100"},
        {t:"Bài 34. Ôn tập hình phẳng"},
        {t:"Bài 35. Ôn tập đo lường"},
        {t:"Bài 36. Ôn tập chung"},
      ]},
      // ===== TẬP 2 =====
      { ch:"Chủ đề 8: Phép nhân, phép chia", tap:2, bai:[
        {t:"Bài 37. Phép nhân", key:"knt_nhan"},
        {t:"Bài 38. Thừa số, tích"},
        {t:"Bài 39. Bảng nhân 2", key:"knt_nhan2"},
        {t:"Bài 40. Bảng nhân 5"},
        {t:"Bài 41. Phép chia"},
        {t:"Bài 42. Số bị chia, số chia, thương"},
        {t:"Bài 43. Bảng chia 2"},
        {t:"Bài 44. Bảng chia 5"},
        {t:"Bài 45. Luyện tập chung"},
      ]},
      { ch:"Chủ đề 9: Làm quen với hình khối", tap:2, bai:[
        {t:"Bài 46. Khối trụ, khối cầu"},
        {t:"Bài 47. Luyện tập chung"},
      ]},
      { ch:"Chủ đề 10: Các số trong phạm vi 1 000", tap:2, bai:[
        {t:"Bài 48. Đơn vị, chục, trăm, nghìn"},
        {t:"Bài 49. Các số tròn trăm, tròn chục"},
        {t:"Bài 50. So sánh các số tròn trăm, tròn chục"},
        {t:"Bài 51. Số có ba chữ số"},
        {t:"Bài 52. Viết số thành tổng các trăm, chục, đơn vị"},
        {t:"Bài 53. So sánh các số có ba chữ số"},
        {t:"Bài 54. Luyện tập chung"},
      ]},
      { ch:"Chủ đề 11: Độ dài và đơn vị đo độ dài. Tiền Việt Nam", tap:2, bai:[
        {t:"Bài 55. Đề-xi-mét. Mét. Ki-lô-mét"},
        {t:"Bài 56. Giới thiệu tiền Việt Nam"},
        {t:"Bài 57. Thực hành và trải nghiệm đo độ dài"},
        {t:"Bài 58. Luyện tập chung"},
      ]},
      { ch:"Chủ đề 12: Phép cộng, phép trừ trong phạm vi 1 000", tap:2, bai:[
        {t:"Bài 59. Phép cộng (không nhớ) trong phạm vi 1 000", key:"knt_cong1000"},
        {t:"Bài 60. Phép cộng (có nhớ) trong phạm vi 1 000", key:"knt_cong1000n"},
        {t:"Bài 61. Phép trừ (không nhớ) trong phạm vi 1 000"},
        {t:"Bài 62. Phép trừ (có nhớ) trong phạm vi 1 000"},
        {t:"Bài 63. Luyện tập chung"},
      ]},
      { ch:"Chủ đề 13: Làm quen với yếu tố thống kê, xác suất", tap:2, bai:[
        {t:"Bài 64. Thu thập, phân loại, kiểm đếm số liệu"},
        {t:"Bài 65. Biểu đồ tranh"},
        {t:"Bài 66. Chắc chắn, có thể, không thể"},
        {t:"Bài 67. Thực hành và trải nghiệm thu thập, phân loại, kiểm đếm số liệu"},
      ]},
      { ch:"Chủ đề 14: Ôn tập cuối năm", tap:2, bai:[
        {t:"Bài 68. Ôn tập các số trong phạm vi 1 000"},
        {t:"Bài 69. Ôn tập phép cộng, phép trừ trong phạm vi 100"},
        {t:"Bài 70. Ôn tập phép cộng, phép trừ trong phạm vi 1 000"},
        {t:"Bài 71. Ôn tập phép nhân, phép chia"},
        {t:"Bài 72. Ôn tập hình học"},
        {t:"Bài 73. Ôn tập đo lường"},
        {t:"Bài 74. Ôn tập kiểm đếm số liệu và lựa chọn khả năng"},
        {t:"Bài 75. Ôn tập chung"},
      ]},
    ]
  },
  tv: {
    name:"Tiếng Việt",
    chapters:[
      // ===== TẬP 1 — 8 chủ điểm (đã đối chiếu mục lục sách thật) =====
      { ch:"Tập 1 · Chủ điểm 1: Em lớn lên từng ngày (Tuần 1-4)", tap:1, bai:[
        {t:"Bảng chữ cái", key:"tv_bang_chu_cai"},
        {t:"Từ chỉ sự vật, chỉ hoạt động; Câu giới thiệu (Ai là gì?)", key:"tv_su_vat_hoatdong_gioithieu"},
        {t:"Từ chỉ hoạt động; Câu nêu hoạt động (Ai làm gì?)", key:"tv_hoatdong_neuhoatdong"},
        {t:"Từ chỉ đặc điểm; Câu nêu đặc điểm (Ai thế nào?)", key:"tv_dacdiem_neudacdiem"},
      ]},
      { ch:"Tập 1 · Chủ điểm 2: Đi học vui sao (Tuần 5-8)", tap:1, bai:[
        {t:"Chính tả: Phân biệt c/k, ch/tr, v/d; Từ ngữ, câu nêu hoạt động", key:"tv_trch"},
        {t:"Chính tả: Phân biệt g/gh, s/x, hỏi/ngã; Từ ngữ, câu nêu đặc điểm", key:"tv_sx"},
        {t:"Chính tả: Phân biệt ng/ngh, r/d/gi, an/ang; Dấu chấm, dấu chấm hỏi"},
        {t:"Chính tả: Phân biệt l/n, ăn/ăng, ân/âng; Từ ngữ, câu nêu đặc điểm"},
      ]},
      { ch:"Tập 1 · Chủ điểm 3: Niềm vui tuổi thơ (Tuần 10-13)", tap:1, bai:[
        {t:"Mở rộng vốn từ: Tình cảm bạn bè; Dấu chấm, dấu chấm hỏi, dấu chấm than"},
        {t:"Từ ngữ chỉ đặc điểm, hoạt động; Câu nêu hoạt động"},
      ]},
      { ch:"Tập 1 · Chủ điểm 4-8 (chưa đối chiếu mục lục sách thật)", tap:1, bai:[
        {t:"Mở rộng vốn từ theo chủ điểm"},
        {t:"Câu nêu đặc điểm (Ai thế nào?)"},
        {t:"Ôn tập dấu câu tập 1"},
      ]},
      // ===== TẬP 2 — 8 chủ điểm =====
      { ch:"Tập 2 · Chủ điểm 1: Vẻ đẹp quanh em", tap:2, bai:[
        {t:"Chính tả: vần khó, phân biệt âm dễ nhầm"},
        {t:"Mở rộng vốn từ: Thiên nhiên, cây cối"},
      ]},
      { ch:"Tập 2 · Chủ điểm 2: Hành tinh xanh của em", tap:2, bai:[
        {t:"Từ chỉ sự vật, hoạt động, đặc điểm (ôn)"},
        {t:"Dấu phẩy"},
      ]},
      { ch:"Tập 2 · Chủ điểm 3: Giao tiếp và kết nối", tap:2, bai:[
        {t:"Câu và các loại câu"},
        {t:"Dấu chấm than"},
      ]},
      { ch:"Tập 2 · Chủ điểm 4-8 (Con người, Đất nước, Trái đất...)", tap:2, bai:[
        {t:"Mở rộng vốn từ theo chủ điểm"},
        {t:"Từ trái nghĩa"},
        {t:"Luyện viết đoạn văn ngắn"},
        {t:"Ôn tập cuối năm Tiếng Việt"},
      ]},
    ]
  }
};

/* ===== NỘI DUNG BÀI (mẫu) — dùng chung qua "key" ===== */
const CONTENT = {
  knt_nhan2: {
    title:"Bảng nhân 2",
    learn:{ intro:"Phép nhân là cách cộng nhiều lần một số giống nhau cho nhanh.",
      blocks:[
        {type:"concept", text:"2 × 3 nghĩa là lấy số 2 cộng 3 lần:", big:"2 + 2 + 2 = 6"},
        {type:"concept", text:"Vậy ta viết gọn là:", big:"2 × 3 = 6"},
        {type:"example", html:"<b>Ví dụ:</b> Mỗi xe đạp có 2 bánh. 4 xe đạp có 2 × 4 = 8 bánh."},
        {type:"example", html:"<b>Nhớ nhé:</b> 2×1=2, 2×2=4, 2×3=6, 2×4=8, 2×5=10..."}
      ]},
    practice:[
      {type:"mc", q:"2 × 3 = ?", options:["5","6","8","4"], answer:1, hint:"2 + 2 + 2 = ?"},
      {type:"mc", q:"Mỗi xe đạp có 2 bánh. 5 xe có mấy bánh?", visual:"🚲🚲🚲🚲🚲", options:["7","10","12","5"], answer:1, hint:"Đếm 2 một: 2,4,6,8,10"},
      {type:"fill", q:"Điền kết quả:", expr:"2 × 4", answer:8, hint:"2+2+2+2"},
    ],
    test:[
      {type:"mc", q:"2 × 6 = ?", options:["8","10","12","14"], answer:2},
      {type:"mc", q:"2 × 7 = ?", options:["14","12","16","9"], answer:0},
      {type:"fill", q:"Điền kết quả:", expr:"2 × 8", answer:16},
    ],
    gen:[
      ()=>{ const t=randInt(1,10); return {type:"fill", q:"Tính:", expr:`2 × ${t}`, answer:2*t, hint:Array(t).fill(2).join('+')}; },
      ()=>{ const t=randInt(2,10); const correct=2*t;
        const opts=distinctOptions(correct,3,()=>correct+(randInt(0,1)?1:-1)*randInt(1,4));
        return {type:"mc", q:`2 × ${t} = ?`, options:opts, answer:opts.indexOf(String(correct))}; },
      ()=>{ const t=randInt(2,10);
        return {type:"fill", q:`Mỗi xe đạp có 2 bánh. ${t} xe đạp có mấy bánh?`, answer:2*t, visual:"🚲".repeat(Math.min(t,8)), hint:`Đếm 2 một đến ${2*t}`}; },
    ]
  },
  knt_nhan: {
    title:"Làm quen với phép nhân",
    learn:{ intro:"Khi có nhiều nhóm bằng nhau, ta dùng phép nhân cho nhanh.",
      blocks:[
        {type:"concept", text:"Có 3 nhóm, mỗi nhóm 2 quả:", big:"2 + 2 + 2 = 2 × 3 = 6"},
        {type:"example", html:"<b>Dấu nhân</b> viết là ×. Đọc: 'hai nhân ba bằng sáu'."}
      ]},
    practice:[
      {type:"mc", q:"3 + 3 + 3 + 3 viết thành phép nhân là:", options:["3 × 4","4 × 4","3 × 3","3 + 4"], answer:0, hint:"Số 3 lấy 4 lần"},
      {type:"fill", q:"Điền kết quả:", expr:"5 × 2", answer:10, hint:"5 + 5"},
    ],
    test:[
      {type:"mc", q:"2 + 2 + 2 + 2 + 2 viết gọn là:", options:["2 × 4","2 × 5","5 × 5","2 + 5"], answer:1},
      {type:"fill", q:"Điền kết quả:", expr:"4 × 2", answer:8},
    ],
    gen:[
      ()=>{ const n=randInt(2,5), times=randInt(2,5); const correct=`${n} × ${times}`;
        const addStr=Array(times).fill(n).join(' + ');
        const opts=distinctOptions(correct,3,()=>`${randInt(2,5)} × ${randInt(2,5)}`);
        return {type:"mc", q:`${addStr} viết thành phép nhân là:`, options:opts, answer:opts.indexOf(correct)}; },
      ()=>{ const n=randInt(2,9), times=randInt(2,5);
        return {type:"fill", q:"Điền kết quả:", expr:`${n} × ${times}`, answer:n*times, hint:Array(times).fill(n).join('+')}; },
    ]
  },
  /* Mục tra cứu/luyện riêng (KHÔNG nằm trong CURRICULUM.toan.chapters — không tính là 1 "Bài" SGK).
     SGK Kết nối tri thức lớp 2 chỉ dạy chính thức Bảng nhân 2 và Bảng nhân 5 (Chủ đề 8);
     đây là nội dung BỔ SUNG/MỞ RỘNG bố mẹ yêu cầu thêm cho đủ bảng 2-9, ghi rõ trong phần Học. */
  bang_cuu_chuong: {
    title:"Bảng cửu chương (2–9)",
    learn:{ intro:"Đây là bảng nhân MỞ RỘNG từ 2 đến 9 để con luyện thuộc sớm. Lưu ý: sách giáo khoa lớp 2 (Kết nối tri thức) chỉ dạy chính thức Bảng nhân 2 và Bảng nhân 5 — các bảng còn lại (3,4,6,7,8,9) là phần bố mẹ bổ sung thêm, không phải nội dung trong sách.",
      blocks:[
        {type:"cuuchuong", nums:[2,3,4,5,6,7,8,9]},
        {type:"example", html:"<b>Mẹo học thuộc:</b> Đọc to từng dòng nhiều lần: 'hai nhân một bằng hai, hai nhân hai bằng bốn...', rồi che kết quả lại và tự đoán trước khi xem đáp án."}
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"3 × 4", answer:12, hint:"3+3+3+3"},
      {type:"mc", q:"6 × 2 = ?", options:["10","12","14","8"], answer:1, hint:"6+6"},
      {type:"fill", q:"Tính:", expr:"7 × 3", answer:21, hint:"7+7+7"},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"4 × 6", answer:24},
      {type:"mc", q:"8 × 3 = ?", options:["24","21","27","18"], answer:0},
      {type:"fill", q:"Tính:", expr:"9 × 4", answer:36},
    ],
    gen:[
      ()=>{ const n=randInt(2,9), k=randInt(1,10);
        return {type:"fill", q:"Tính:", expr:`${n} × ${k}`, answer:n*k, hint:Array(k).fill(n).join('+')}; },
      ()=>{ const n=randInt(2,9), k=randInt(1,10); const correct=n*k;
        const opts=distinctOptions(correct,3,()=>correct+(randInt(0,1)?1:-1)*randInt(1,5));
        return {type:"mc", q:`${n} × ${k} = ?`, options:opts, answer:opts.indexOf(String(correct))}; },
      ()=>{ const n=randInt(2,9), k=randInt(2,10);
        return {type:"fill", q:`Mỗi hộp có ${n} chiếc bánh. ${k} hộp như thế có tất cả mấy chiếc bánh?`, answer:n*k, hint:`Tính ${n} × ${k}`}; },
    ]
  },
  knt_cong1000: {
    title:"Phép cộng (không nhớ) trong phạm vi 1000",
    learn:{ intro:"Khi cộng số có ba chữ số, ta đặt tính thẳng cột và cộng từ phải sang trái: đơn vị → chục → trăm.",
      blocks:[
        {type:"vcalc"}, /* animation cột dọc chèn vào đây */
        {type:"example", html:"<b>Mẹo:</b> Nếu cộng một cột được 10 trở lên thì viết chữ số hàng đơn vị và <b>nhớ 1</b> sang cột bên trái."}
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"255 + 204", answer:459, hint:"5+4=9, 5+0=5, 2+2=4"},
      {type:"fill", q:"Tính:", expr:"121 + 338", answer:459, hint:"Cộng từng cột từ phải"},
      {type:"mc", q:"Tổng của 535 và 244 là:", options:["779","769","789","719"], answer:0, hint:"5+4, 3+4, 5+2"},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"535 + 244", answer:779},
      {type:"fill", q:"Tính:", expr:"412 + 356", answer:768},
      {type:"fill", q:"Tính:", expr:"203 + 105", answer:308},
    ],
    gen:[
      ()=>{ const a2=randInt(1,8),a1=randInt(0,8),a0=randInt(0,8);
        const b0=randInt(0,9-a0), b1=randInt(0,9-a1), b2=randInt(1,9-a2);
        const a=a2*100+a1*10+a0, b=b2*100+b1*10+b0;
        return {type:"fill", q:"Tính:", expr:`${a} + ${b}`, answer:a+b}; },
    ]
  },
  knt_cong1000n: {
    title:"Phép cộng (có nhớ) trong phạm vi 1000",
    learn:{ intro:"Cộng có nhớ: khi một cột có tổng từ 10 trở lên, ta viết chữ số hàng đơn vị và nhớ 1 sang cột bên trái. Xem từng bước bên dưới.",
      blocks:[
        {type:"vcalc"},
        {type:"example", html:"<b>Ví dụ 176 + 158:</b> cột đơn vị 6+8=14 (viết 4 nhớ 1), cột chục 7+5+1=13 (viết 3 nhớ 1), cột trăm 1+1+1=3."}
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"176 + 158", answer:334, hint:"Nhớ 1 ở cột đơn vị và cột chục"},
      {type:"fill", q:"Tính:", expr:"265 + 127", answer:392, hint:"5+7=12, viết 2 nhớ 1"},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"148 + 236", answer:384},
      {type:"fill", q:"Tính:", expr:"357 + 128", answer:485},
    ],
    gen:[
      ()=>{ const a=randInt(120,600), b=randInt(120,999-a);
        return {type:"fill", q:"Tính:", expr:`${a} + ${b}`, answer:a+b}; },
    ]
  },
  tv_trch: {
    title:"Phân biệt tr / ch",
    learn:{ intro:"Nhiều tiếng bắt đầu bằng 'tr' hoặc 'ch' dễ viết nhầm. Ta học qua các từ quen thuộc.",
      blocks:[
        {type:"wordcards", items:[
          {word:"trâu", icon:"🐃"}, {word:"trứng", icon:"🥚"}, {word:"trường học", icon:"🏫"}, {word:"trăng", icon:"🌙"}
        ]},
        {type:"wordcards", items:[
          {word:"chim", icon:"🐦"}, {word:"chân", icon:"🦵"}, {word:"cha", icon:"👨"}, {word:"chợ", icon:"🛒"}
        ]},
        {type:"example", html:"<b>Mẹo nhỏ:</b> Từ chỉ người trong gia đình thường viết 'ch' (cha, chú, chị)."}
      ]},
    practice:[
      {type:"mc", q:"Con vật có sừng, kéo cày: con __âu", options:["tr","ch"], answer:0, two:true, visual:"🐃", hint:"con tr...âu"},
      {type:"mc", q:"Loài bay trên trời, hót líu lo: con __im", options:["tr","ch"], answer:1, two:true, visual:"🐦", hint:"con ch...im"},
      {type:"mc", q:"Nơi em đến học mỗi ngày: __ường học", options:["tr","ch"], answer:0, two:true, visual:"🏫", hint:"tr...ường"},
    ],
    test:[
      {type:"mc", q:"Uống mỗi sáng, lá màu xanh: __à", options:["tr","ch"], answer:0, two:true, visual:"🍵"},
      {type:"mc", q:"Bộ phận để đi, đứng: cái __ân", options:["tr","ch"], answer:1, two:true, visual:"🦵"},
      {type:"mc", q:"Ánh sáng ban đêm trên trời: __ăng", options:["tr","ch"], answer:0, two:true, visual:"🌙"},
    ],
    gen:[
      ()=>{ const bank=[
          ["Con vật có sừng, kéo cày: con __âu","tr","🐃"],
          ["Loài bay trên trời, hót líu lo: con __im","ch","🐦"],
          ["Nơi em đến học mỗi ngày: __ường học","tr","🏫"],
          ["Uống mỗi sáng, lá màu xanh: __à","tr","🍵"],
          ["Bộ phận để đi, đứng: cái __ân","ch","🦵"],
          ["Ánh sáng ban đêm trên trời: __ăng","tr","🌙"],
          ["Nơi bán rau, thịt, cá: đi __ợ","ch","🛒"],
          ["Con vật sủa gâu gâu: con __ó","ch","🐕"],
          ["Quả có vỏ cứng, gà đẻ ra: quả __ứng","tr","🥚"],
        ];
        const item=bank[randInt(0,bank.length-1)];
        return {type:"mc", q:item[0], options:["tr","ch"], answer:item[1]==="tr"?0:1, two:true, visual:item[2]}; },
    ]
  },
  tv_sx: {
    title:"Phân biệt s / x",
    learn:{ intro:"'s' và 'x' cũng hay bị viết nhầm. Ta ghi nhớ qua các từ thường gặp.",
      blocks:[
        {type:"wordcards", items:[
          {word:"sách", icon:"📕"}, {word:"sông", custom:"river"}, {word:"sao", icon:"⭐"}, {word:"sư tử", icon:"🦁"}
        ]},
        {type:"wordcards", items:[
          {word:"xanh", icon:"🟢"}, {word:"xe đạp", icon:"🚲"}, {word:"xôi", icon:"🍚"}, {word:"xa", custom:"far"}
        ]},
        {type:"example", html:"<b>Ví dụ:</b> Quả có màu của lá cây → màu <b>x</b>anh."}
      ]},
    practice:[
      {type:"mc", q:"Quyển để đọc và học: quyển __ách", options:["s","x"], answer:0, two:true, visual:"📕", hint:"s...ách"},
      {type:"mc", q:"Màu của lá cây: màu __anh", options:["s","x"], answer:1, two:true, visual:"🟢", hint:"x...anh"},
      {type:"mc", q:"Dòng nước lớn chảy ra biển: dòng __ông", options:["s","x"], answer:0, two:true, visual:"🌊", hint:"s...ông"},
    ],
    test:[
      {type:"mc", q:"Phương tiện có bánh để đi: __e đạp", options:["s","x"], answer:1, two:true, visual:"🚲"},
      {type:"mc", q:"Ngôi lấp lánh trên trời đêm: ngôi __ao", options:["s","x"], answer:0, two:true, visual:"⭐"},
      {type:"mc", q:"Món ăn từ gạo nếp: __ôi", options:["s","x"], answer:1, two:true, visual:"🍚"},
    ],
    gen:[
      ()=>{ const bank=[
          ["Quyển để đọc và học: quyển __ách","s","📕"],
          ["Màu của lá cây: màu __anh","x","🟢"],
          ["Dòng nước lớn chảy ra biển: dòng __ông","s","🌊"],
          ["Phương tiện có bánh để đi: __e đạp","x","🚲"],
          ["Ngôi lấp lánh trên trời đêm: ngôi __ao","s","⭐"],
          ["Món ăn từ gạo nếp: __ôi","x","🍚"],
          ["Con vật chúa tể rừng xanh: __ư tử","s","🦁"],
          ["Nơi cách rất xa: đường __a","x","🏞️"],
        ];
        const item=bank[randInt(0,bank.length-1)];
        return {type:"mc", q:item[0], options:["s","x"], answer:item[1]==="s"?0:1, two:true, visual:item[2]}; },
    ]
  },

  /* ===== GIAI ĐOẠN 1 · CHẶNG 1 — Đợt 1 (Toán): Ôn tập đầu năm ===== */
  knt_on_so100: {
    title:"Ôn tập các số đến 100",
    learn:{ intro:"Số có hai chữ số được tạo bởi số chục và số đơn vị. Ta viết số thành tổng của chục và đơn vị, rồi so sánh, sắp xếp các số theo thứ tự.",
      blocks:[
        {type:"concept", text:"Số 57 gồm 5 chục và 7 đơn vị, viết là:", big:"57 = 50 + 7"},
        {type:"concept", text:"Số 91 gồm 9 chục và 1 đơn vị, viết là:", big:"91 = 90 + 1"},
        {type:"barcompare", items:[{n:58},{n:51},{n:49},{n:50}]},
        {type:"example", html:"<b>Sắp xếp:</b> Các số 58, 51, 49, 50 xếp từ bé đến lớn là: 49, 50, 51, 58."}
      ]},
    practice:[
      {type:"fill", q:"Số gồm 7 chục và 5 đơn vị là số nào?", answer:75, hint:"7 chục = 70, thêm 5 đơn vị"},
      {type:"fill", q:"63 = 60 + ? Số cần điền là", answer:3},
      {type:"mc", q:"Số nào bé hơn 50?", options:["49","58","69","89"], answer:0},
      {type:"mc", q:"Sắp xếp các số 15, 22, 14, 19 theo thứ tự từ bé đến lớn, số đứng đầu tiên là số nào?", options:["14","15","19","22"], answer:0},
    ],
    test:[
      {type:"fill", q:"Số gồm 4 chục và 8 đơn vị là số nào?", answer:48},
      {type:"fill", q:"91 = 90 + ? Số cần điền là", answer:1},
      {type:"mc", q:"Số nào lớn hơn 60?", options:["58","49","69","29"], answer:2},
      {type:"fill", q:"63 gồm 6 chục và mấy đơn vị?", answer:3},
    ],
    gen:[
      ()=>{ const chuc=randInt(1,9), dv=randInt(0,9); const n=chuc*10+dv;
        return {type:"fill", q:`Số gồm ${chuc} chục và ${dv} đơn vị là số nào?`, answer:n, hint:`${chuc} chục = ${chuc*10}, thêm ${dv} đơn vị`}; },
      ()=>{ const n=randInt(10,99); const chuc=Math.floor(n/10), dv=n%10;
        return {type:"fill", q:`${n} = ${chuc*10} + ? Số cần điền là`, answer:dv}; },
      ()=>{ let a=randInt(10,99), b=randInt(10,99); while(b===a) b=randInt(10,99);
        return {type:"mc", q:"Số nào lớn hơn?", options:[String(a),String(b)], answer:a>b?0:1, two:true}; },
      ()=>{ let a=randInt(10,99), b=randInt(10,99); while(b===a) b=randInt(10,99);
        return {type:"mc", q:"Số nào bé hơn?", options:[String(a),String(b)], answer:a<b?0:1, two:true}; },
      ()=>{ let n,chuc,dv; do{ n=randInt(10,99); chuc=Math.floor(n/10); dv=n%10; }while(dv===0||dv===chuc);
        const opts=[`${chuc} chục ${dv} đơn vị`,`${dv} chục ${chuc} đơn vị`,`${chuc} chục 0 đơn vị`,`0 chục ${dv} đơn vị`];
        return {type:"mc", q:`${n} gồm mấy chục mấy đơn vị?`, options:opts, answer:0}; },
    ]
  },
  knt_tiaso: {
    title:"Tia số. Số liền trước, số liền sau",
    learn:{ intro:"Trên tia số, các số được sắp xếp theo thứ tự từ bé đến lớn, số 0 ở vị trí đầu tiên. Số liền trước kém số đã cho 1 đơn vị, số liền sau hơn số đã cho 1 đơn vị.",
      blocks:[
        {type:"numline", center:4},
        {type:"example", html:"<b>Ví dụ:</b> Số liền trước của 4 là 3. Số liền sau của 4 là 5."}
      ]},
    practice:[
      {type:"mc", q:"Số liền trước của 16 là 15. Đúng hay sai?", options:["Đúng","Sai"], answer:0, two:true, hint:"16 − 1 = 15"},
      {type:"mc", q:"Số liền sau của 18 là 17. Đúng hay sai?", options:["Đúng","Sai"], answer:1, two:true, hint:"Số liền sau phải LỚN hơn 18"},
      {type:"fill", q:"Số liền trước của 1 là", answer:0},
    ],
    test:[
      {type:"fill", q:"Số liền sau của 9 là", answer:10},
      {type:"mc", q:"Số liền trước của 20 là 19. Đúng hay sai?", options:["Đúng","Sai"], answer:0, two:true},
      {type:"fill", q:"Số liền trước của 13 là", answer:12},
      {type:"mc", q:"Ghép hai trong ba thẻ số 4, 5, 0 được tất cả bao nhiêu số có hai chữ số?", options:["6","5","4","3"], answer:2},
    ],
    gen:[
      ()=>{ const n=randInt(1,98); return {type:"fill", q:`Số liền sau của ${n} là`, answer:n+1}; },
      ()=>{ const n=randInt(2,99); return {type:"fill", q:`Số liền trước của ${n} là`, answer:n-1}; },
      ()=>{ const n=randInt(2,98); const claimTrue=Math.random()<0.5; const real=n-1;
        const shown=claimTrue?real:(Math.random()<0.5?n:n-2);
        return {type:"mc", q:`Số liền trước của ${n} là ${shown}. Đúng hay sai?`, options:["Đúng","Sai"], answer:(shown===real)?0:1, two:true}; },
      ()=>{ const n=randInt(1,97); const claimTrue=Math.random()<0.5; const real=n+1;
        const shown=claimTrue?real:(Math.random()<0.5?n:n+2);
        return {type:"mc", q:`Số liền sau của ${n} là ${shown}. Đúng hay sai?`, options:["Đúng","Sai"], answer:(shown===real)?0:1, two:true}; },
    ]
  },
  knt_thanhphan: {
    title:"Các thành phần của phép cộng, phép trừ",
    learn:{ intro:"Trong phép cộng có số hạng và tổng: Số hạng + Số hạng = Tổng. Trong phép trừ có số bị trừ, số trừ và hiệu: Số bị trừ − Số trừ = Hiệu.",
      blocks:[
        {type:"groupcalc", op:"+", start:6, delta:3, icon:"🐟", deltaIcon:"🐟", scene:"tank",
          text:"Bể có 6 con cá, thêm 3 con cá nữa:"},
        {type:"example", html:"<b>6</b> và <b>3</b> là số hạng, <b>9</b> là tổng."},
        {type:"groupcalc", op:"-", start:12, delta:2, icon:"🐦", scene:"branch",
          text:"Cành cây có 12 con chim, bay đi 2 con:"},
        {type:"example", html:"<b>12</b> là số bị trừ, <b>2</b> là số trừ, <b>10</b> là hiệu."}
      ]},
    practice:[
      {type:"fill", q:"Tính tổng, biết các số hạng là 42 và 35", answer:77, hint:"42 + 35"},
      {type:"fill", q:"Tính hiệu, biết số bị trừ là 49, số trừ là 16", answer:33, hint:"49 − 16"},
      {type:"mc", q:"Trong phép tính 57 − 24 = 33, số nào là hiệu?", options:["33","57","24","81"], answer:0},
    ],
    test:[
      {type:"fill", q:"Một bến xe có 15 ô tô, sau đó có 3 xe rời bến. Bến xe còn lại bao nhiêu ô tô?", answer:12, hint:"15 − 3"},
      {type:"fill", q:"Tính tổng, biết các số hạng là 24 và 52", answer:76},
      {type:"mc", q:"Trong phép tính 90 − 40 = 50, số nào là số bị trừ?", options:["90","40","50","130"], answer:0},
    ],
    gen:[
      ()=>{ const a=randInt(10,60); const b=randInt(5,Math.min(35,99-a));
        return {type:"fill", q:`Tính tổng, biết các số hạng là ${a} và ${b}`, answer:a+b, hint:`${a} + ${b}`}; },
      ()=>{ const sbt=randInt(20,99); const st=randInt(5,sbt-1);
        return {type:"fill", q:`Tính hiệu, biết số bị trừ là ${sbt}, số trừ là ${st}`, answer:sbt-st, hint:`${sbt} − ${st}`}; },
      ()=>{ const a=randInt(10,60); const b=randInt(5,Math.min(35,99-a)); const sum=a+b;
        const opts=distinctOptions(sum,3,()=>{ const pool=[a,b,sum+randInt(1,9),sum-randInt(1,9),a+randInt(1,5),b+randInt(2,6)]; return pool[randInt(0,pool.length-1)]; });
        return {type:"mc", q:`Trong phép tính ${a} + ${b} = ${sum}, số nào là tổng?`, options:opts, answer:opts.indexOf(String(sum))}; },
      ()=>{ const sbt=randInt(30,99); const st=randInt(5,sbt-5); const hieu=sbt-st;
        const opts=distinctOptions(sbt,3,()=>{ const pool=[st,hieu,sbt+randInt(1,9),sbt-randInt(1,9),st+randInt(2,6),hieu+randInt(2,6)]; return pool[randInt(0,pool.length-1)]; });
        return {type:"mc", q:`Trong phép tính ${sbt} − ${st} = ${hieu}, số nào là số bị trừ?`, options:opts, answer:opts.indexOf(String(sbt))}; },
    ]
  },
  knt_honkem: {
    title:"Hơn, kém nhau bao nhiêu",
    learn:{ intro:"Muốn biết số này hơn (hoặc kém) số kia bao nhiêu đơn vị, ta lấy số lớn trừ số bé.",
      blocks:[
        {type:"concept", text:"Đàn gà có 10 con, đàn vịt có 7 con. Số gà hơn số vịt mấy con?", big:"10 − 7 = 3 (con)"},
        {type:"compare", a:10, b:7, labelA:"Gà", labelB:"Vịt", iconA:"🐓", iconB:"🦆"},
        {type:"example", html:"<b>Bài giải:</b> Số gà hơn số vịt là: 10 − 7 = 3 (con). Đáp số: 3 con."},
        {type:"concept", text:"Đàn ngỗng có 5 con, đàn vịt có 7 con. Số ngỗng kém số vịt mấy con?", big:"7 − 5 = 2 (con)"}
      ]},
    practice:[
      {type:"fill", q:"Lớp 2A có 32 học sinh, lớp 2B có 28 học sinh. Lớp 2A hơn lớp 2B bao nhiêu học sinh?", answer:4, hint:"32 − 28"},
      {type:"fill", q:"Vườn nhà có 18 cây cam, 12 cây bưởi. Số cây cam hơn số cây bưởi bao nhiêu cây?", answer:6},
      {type:"mc", q:"Tổ 1 có 9 bạn, tổ 2 có 6 bạn. Tổ 2 kém tổ 1 bao nhiêu bạn?", options:["3","15","4","5"], answer:0},
    ],
    test:[
      {type:"fill", q:"Sân có 14 con gà, 9 con vịt. Số gà hơn số vịt bao nhiêu con?", answer:5},
      {type:"fill", q:"Rổ có 20 quả cam, 13 quả quýt. Số quýt kém số cam bao nhiêu quả?", answer:7},
      {type:"mc", q:"Bể có 16 con cá vàng, 9 con cá chép. Số cá vàng hơn số cá chép bao nhiêu con?", options:["7","25","6","8"], answer:0},
    ],
    gen:[
      ()=>{ const items=[["Lớp 2A","Lớp 2B","học sinh"],["Rổ táo","Rổ cam","quả"],["Đàn gà","Đàn vịt","con"],["Tổ 1","Tổ 2","bạn"]];
        const it=items[randInt(0,items.length-1)]; const a=randInt(15,40), b=randInt(5,a-3);
        return {type:"fill", q:`${it[0]} có ${a} ${it[2]}, ${it[1]} có ${b} ${it[2]}. ${it[0]} hơn ${it[1]} bao nhiêu ${it[2]}?`, answer:a-b, hint:`${a} − ${b}`}; },
      ()=>{ const items=[["Vườn cam","Vườn bưởi","cây"],["Bể cá vàng","Bể cá chép","con"],["Rổ quýt","Rổ cam","quả"]];
        const it=items[randInt(0,items.length-1)]; const a=randInt(15,40), b=randInt(5,a-3);
        return {type:"fill", q:`${it[0]} có ${a} ${it[2]}, ${it[1]} có ${b} ${it[2]}. Hỏi ${it[1]} kém ${it[0]} bao nhiêu ${it[2]}?`, answer:a-b, hint:`${a} − ${b}`}; },
      ()=>{ const a=randInt(10,50), b=randInt(5,a-2); const diff=a-b;
        const opts=distinctOptions(diff,3,()=>{ const pool=[a+b,diff+randInt(1,8),diff-randInt(1,3),a,b]; return pool[randInt(0,pool.length-1)]; });
        return {type:"mc", q:`Số A là ${a}, số B là ${b}. A hơn B bao nhiêu đơn vị?`, options:opts, answer:opts.indexOf(String(diff))}; },
    ]
  },
  knt_ontap_congtru100: {
    title:"Ôn tập phép cộng, phép trừ (không nhớ) trong phạm vi 100",
    learn:{ intro:"Cộng, trừ các số trong phạm vi 100 không nhớ: tính từng cột đơn vị rồi đến cột chục. Xem hoạt hình đặt tính cột dọc bên dưới để hiểu rõ từng bước.",
      blocks:[
        {type:"concept", text:"Tính nhẩm theo chục:", big:"60 + 40 = 100"},
        {type:"vcalc"},
        {type:"concept", text:"Thuyền có 12 khách, thêm 3 khách lên thuyền:", big:"12 + 3 = 15 (khách)"}
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"35 + 4", answer:39},
      {type:"fill", q:"Tính:", expr:"68 − 6", answer:62},
      {type:"fill", q:"Tính:", expr:"52 + 37", answer:89},
      {type:"mc", q:"Phép tính nào có cùng kết quả với 40 + 20?", options:["20 + 40","34 + 1","30 + 5","60 − 40"], answer:0},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"79 − 55", answer:24},
      {type:"fill", q:"Trên thuyền có 12 hành khách, đến bến có 3 hành khách lên thuyền. Hỏi lúc đó trên thuyền có tất cả bao nhiêu hành khách?", answer:15},
      {type:"mc", q:"Phép tính nào có kết quả bằng 60?", options:["40 + 20","34 + 1","30 + 5","60 − 30"], answer:0},
      {type:"mc", q:"Phép tính nào có kết quả bé hơn 50?", options:["40 + 8","32 + 20","30 + 40","86 − 6"], answer:0},
    ],
    gen:[
      ()=>{ const a1=randInt(1,8), a0=randInt(0,8); const b0=randInt(0,9-a0); const b1=randInt(1,9-a1);
        const a=a1*10+a0, b=b1*10+b0; return {type:"fill", q:"Tính:", expr:`${a} + ${b}`, answer:a+b}; },
      ()=>{ const a1=randInt(2,9), a0=randInt(0,9); const b1=randInt(1,a1-1); const b0=randInt(0,a0);
        const a=a1*10+a0, b=b1*10+b0; return {type:"fill", q:"Tính:", expr:`${a} − ${b}`, answer:a-b}; },
      ()=>{ const t1=randInt(1,9)*10; const maxT2=Math.max(1,Math.floor((100-t1)/10)); const t2=randInt(1,maxT2)*10;
        return {type:"fill", q:"Tính nhẩm:", expr:`${t1} + ${t2}`, answer:t1+t2}; },
      ()=>{ const a=randInt(10,60), b=randInt(1,9);
        return {type:"fill", q:`Trên xe có ${a} hành khách, đến bến có ${b} hành khách lên xe. Hỏi xe có tất cả bao nhiêu hành khách?`, answer:a+b, hint:`${a} + ${b}`}; },
    ]
  },
  knt_luyentapchung1: {
    title:"Luyện tập chung (Chủ đề 1)",
    learn:{ intro:"Bài luyện tập chung giúp con ôn lại các kĩ năng đã học ở Chủ đề 1: đọc viết số, tia số, số liền trước/sau, thành phần phép cộng-trừ, hơn kém nhau.",
      blocks:[
        {type:"concept", text:"Ôn viết số thành tổng:", big:"56 = 50 + 6"},
        {type:"example", html:"<b>Ôn số liền trước/sau:</b> Số liền trước của 40 là 39. Số liền sau của 40 là 41."}
      ]},
    practice:[
      {type:"fill", q:"Số liền sau của 21 là", answer:22},
      {type:"fill", q:"Viết số 84 thành tổng chục và đơn vị: 84 = 80 + ?", answer:4},
      {type:"mc", q:"Trong các số 23, 45, 18, số nào bé nhất?", options:["18","23","45","không có"], answer:0},
    ],
    test:[
      {type:"fill", q:"Số liền trước của 50 là", answer:49},
      {type:"fill", q:"Trong các số 62, 38, 71, 19, lấy số lớn nhất cộng với số bé nhất được bao nhiêu?", answer:90, hint:"71 + 19"},
      {type:"mc", q:"77 gồm mấy chục mấy đơn vị?", options:["7 chục 7 đơn vị","7 chục 0 đơn vị","0 chục 7 đơn vị","77 chục"], answer:0},
    ],
    gen:[
      ()=>{ const n=randInt(1,98); return {type:"fill", q:`Số liền sau của ${n} là`, answer:n+1}; },
      ()=>{ const n=randInt(2,99); return {type:"fill", q:`Số liền trước của ${n} là`, answer:n-1}; },
      ()=>{ const n=randInt(10,99); const chuc=Math.floor(n/10), dv=n%10;
        return {type:"fill", q:`Viết số ${n} thành tổng chục và đơn vị: ${n} = ${chuc*10} + ?`, answer:dv}; },
      ()=>{ let nums=[randInt(10,99),randInt(10,99),randInt(10,99)];
        while(new Set(nums).size<3){ nums=[randInt(10,99),randInt(10,99),randInt(10,99)]; }
        const minN=Math.min(...nums); const opts=shuffleArr(nums.map(String));
        return {type:"mc", q:`Trong các số ${nums.join(", ")}, số nào bé nhất?`, options:opts, answer:opts.indexOf(String(minN))}; },
    ]
  },

  /* ===== GIAI ĐOẠN 1 · CHẶNG 1 — Đợt 2 (Tiếng Việt) — Chủ điểm 1: Em lớn lên từng ngày (Tuần 1-4) ===== */
  tv_bang_chu_cai: {
    title:"Bảng chữ cái",
    learn:{ intro:"Bảng chữ cái tiếng Việt có 29 chữ cái, mỗi chữ cái có một tên gọi riêng. Học thuộc thứ tự và tên các chữ cái giúp con tra từ điển, xếp thứ tự tên, sách...",
      blocks:[
        {type:"wordcards", items:[
          {word:"a — quả táo", icon:"🍎"}, {word:"b — quả bóng", icon:"⚽"}, {word:"c — con cá", icon:"🐟"},
          {word:"d — con dê", icon:"🐐"}, {word:"e — con ếch", icon:"🐸"}, {word:"g — con gà", icon:"🐔"}
        ]},
        {type:"example", html:"<b>Tên gọi:</b> chữ 'b' đọc là 'bê', chữ 'c' đọc là 'xê', chữ 'x' đọc là 'ích-xì'."}
      ]},
    practice:[
      {type:"mc", q:"Tên gọi của chữ cái 'c' là gì?", options:["xê","cê","xì","kê"], answer:0},
      {type:"mc", q:"Chữ cái nào đứng ngay sau chữ 'a' trong bảng chữ cái?", options:["ă","b","â","e"], answer:0},
      {type:"mc", q:"Tên gọi của chữ cái 'đ' là gì?", options:["đê","đờ","d","đì"], answer:0},
      {type:"mc", q:"Tên gọi của chữ cái 'b' là gì?", options:["bê","bờ","pê","bi"], answer:0},
    ],
    test:[
      {type:"mc", q:"Tên gọi của chữ cái 'x' là gì?", options:["ích-xì","xờ","xê","ít-xì"], answer:0},
      {type:"mc", q:"Sắp xếp theo bảng chữ cái, tên nào đứng trước?", options:["An","Bình"], answer:0, two:true, hint:"Chữ 'A' đứng trước chữ 'B'"},
      {type:"mc", q:"Chữ cái nào đứng ngay trước chữ 'ê' trong bảng chữ cái?", options:["e","d","g","i"], answer:0},
      {type:"mc", q:"Tên gọi của chữ cái 'đ' là gì?", options:["đê","dê","đì","đờ"], answer:0},
    ],
    gen:[
      ()=>{ const idx=randInt(0,ALPHABET.length-1); const [letter,name]=ALPHABET[idx];
        const opts=distinctOptions(name,3,()=>ALPHABET[randInt(0,ALPHABET.length-1)][1]);
        return {type:"mc", q:`Tên gọi của chữ cái '${letter}' là gì?`, options:opts, answer:opts.indexOf(name)}; },
      ()=>{ const idx=randInt(0,ALPHABET.length-2); const letter=ALPHABET[idx][0]; const next=ALPHABET[idx+1][0];
        const opts=distinctOptions(next,3,()=>ALPHABET[randInt(0,ALPHABET.length-1)][0]);
        return {type:"mc", q:`Chữ cái nào đứng ngay sau chữ '${letter}' trong bảng chữ cái?`, options:opts, answer:opts.indexOf(next)}; },
      ()=>{ const idx=randInt(1,ALPHABET.length-1); const letter=ALPHABET[idx][0]; const prev=ALPHABET[idx-1][0];
        const opts=distinctOptions(prev,3,()=>ALPHABET[randInt(0,ALPHABET.length-1)][0]);
        return {type:"mc", q:`Chữ cái nào đứng ngay trước chữ '${letter}' trong bảng chữ cái?`, options:opts, answer:opts.indexOf(prev)}; },
    ]
  },
  tv_su_vat_hoatdong_gioithieu: {
    title:"Từ chỉ sự vật, chỉ hoạt động; Câu giới thiệu",
    learn:{ intro:"Từ chỉ sự vật gọi tên người, đồ vật, con vật... Từ chỉ hoạt động chỉ việc làm. Câu giới thiệu theo mẫu 'Ai (cái gì) là gì?' dùng để giới thiệu người, vật.",
      blocks:[
        {type:"example", html:"🔑 <b>Ghi nhớ cách phân biệt:</b> Từ chỉ <b>sự vật</b> là TÊN GỌI — con vật/đồ vật/con người luôn đứng yên, không đổi. Từ chỉ <b>hoạt động</b> là VIỆC ĐANG LÀM — luôn có CHUYỂN ĐỘNG! Bấm vào từng ô hoạt động bên dưới để xem chuyển động thật nhé 👇"},
        {type:"concept", text:"Từ chỉ sự vật — chỉ là TÊN GỌI, đứng yên không đổi:"},
        {type:"wordcards", items:[
          {word:"học sinh", icon:"🧑‍🎓"}, {word:"cặp sách", icon:"🎒"}, {word:"cô giáo", icon:"👩‍🏫"}, {word:"bác sĩ", icon:"👩‍⚕️"}
        ]},
        {type:"concept", text:"Từ chỉ hoạt động — có CHUYỂN ĐỘNG, bấm vào để xem:"},
        {type:"actioncards", items:[
          {word:"đi học", icon:"🚶‍♂️", anim:"actWalk"}
        ]},
        {type:"concept", text:"Có hoạt động cần 2 người — bấm vào để xem cảnh:"},
        {type:"scenecards", items:[
          {word:"dạy học", sceneKey:"dayhoc"}, {word:"khám bệnh", sceneKey:"khambenh"}
        ]},
        {type:"example", html:"<b>Câu giới thiệu:</b> Bạn Hà 🧑‍🎓 là học sinh lớp 2A. Bố em 👩‍⚕️ là bác sĩ."}
      ]},
    practice:[
      {type:"mc", q:"Từ nào là từ chỉ sự vật?", options:["đi học","cặp sách","chăm chỉ","nhanh"], answer:1, visual:"🎒", hint:"Từ chỉ sự vật gọi tên đồ vật, người..."},
      {type:"mc", q:"Từ nào là từ chỉ hoạt động?", options:["học sinh","cô giáo","dạy học","cái mũ"], answer:2, visual:"📝"},
      {type:"mc", q:"Câu nào là câu giới thiệu 'Ai là gì?'?", options:["Em đi học.","Bố em là công nhân.","Trời rất đẹp.","Em chạy nhanh."], answer:1},
      {type:"mc", q:"Từ nào chỉ người?", options:["cô giáo","quyển vở","con gà","hoa hồng"], answer:0, visual:"👩‍🏫"},
    ],
    test:[
      {type:"mc", q:"Từ nào là từ chỉ sự vật?", options:["chạy nhảy","con mèo","xinh đẹp","học bài"], answer:1, visual:"🐱"},
      {type:"mc", q:"Từ nào là từ chỉ hoạt động?", options:["con chim","hót","cao","đỏ"], answer:1, visual:"🐦"},
      {type:"mc", q:"Câu nào là câu giới thiệu?", options:["Bà em là giáo viên.","Em đang học bài.","Trời hôm nay nắng.","Con chó chạy nhanh."], answer:0},
      {type:"mc", q:"Từ nào chỉ đồ vật?", options:["bạn Nam","cái cặp","con trâu","cây dừa"], answer:1, visual:"🎒"},
    ],
    gen:[
      ()=>{ const bank=[["cặp sách","🎒"],["cô giáo","👩‍🏫"],["bác sĩ","🩺"],["học sinh","🧑‍🎓"],["quyển vở","📓"],["cái ghế","🪑"],["con mèo","🐱"],["bông hoa","🌸"]];
        const dd=["chăm chỉ","xinh đẹp","nhanh nhẹn","vui vẻ"]; const hd=["đi học","chạy nhảy","hát","vẽ tranh"];
        const pick=bank[randInt(0,bank.length-1)];
        const opts=distinctOptions(pick[0],3,()=>Math.random()<0.5?dd[randInt(0,dd.length-1)]:hd[randInt(0,hd.length-1)]);
        return {type:"mc", q:"Từ nào là từ chỉ sự vật?", options:opts, answer:opts.indexOf(pick[0]), visual:pick[1]}; },
      ()=>{ const bank=[["đi học","🚶"],["dạy học","📝"],["khám bệnh","🌡️"],["chạy nhảy","🏃"],["hát","🎤"],["vẽ tranh","🎨"],["đọc sách","📖"]];
        const sv=["cặp sách","cô giáo","con mèo","bông hoa"]; const dd=["chăm chỉ","xinh đẹp","cao lớn"];
        const pick=bank[randInt(0,bank.length-1)];
        const opts=distinctOptions(pick[0],3,()=>Math.random()<0.5?sv[randInt(0,sv.length-1)]:dd[randInt(0,dd.length-1)]);
        return {type:"mc", q:"Từ nào là từ chỉ hoạt động?", options:opts, answer:opts.indexOf(pick[0]), visual:pick[1]}; },
      ()=>{ const bank=[["Mẹ em là bác sĩ.","🩺"],["Bà em là giáo viên.","👵"],["Bạn Lan là học sinh lớp 2.","🧑‍🎓"],["Chú em là công nhân.","👷"]];
        const sai=["Trời hôm nay rất đẹp.","Em đang chạy nhảy.","Bông hoa nở rất to.","Con mèo chạy nhanh."];
        const pick=bank[randInt(0,bank.length-1)];
        const opts=distinctOptions(pick[0],3,()=>sai[randInt(0,sai.length-1)]);
        return {type:"mc", q:"Câu nào là câu giới thiệu 'Ai là gì?'?", options:opts, answer:opts.indexOf(pick[0])}; },
    ]
  },
  tv_hoatdong_neuhoatdong: {
    title:"Từ chỉ hoạt động; Câu nêu hoạt động (Ai làm gì?)",
    learn:{ intro:"Câu nêu hoạt động theo mẫu 'Ai làm gì?' dùng để kể một việc ai đó đang làm. Từ chỉ hoạt động luôn có CHUYỂN ĐỘNG — bấm vào từng ô bên dưới để xem chuyển động thật!",
      blocks:[
        {type:"actioncards", items:[
          {word:"quét nhà", icon:"🧹", anim:"actSweep"}, {word:"chạy", icon:"🏃", anim:"actRun"},
          {word:"nhảy", icon:"🤸", anim:"actJump"}, {word:"đá bóng", icon:"🦶", prop:"⚽", anim:"actKick"},
          {word:"ăn", icon:"😋", prop:"🍎", anim:"actEat"}, {word:"bơi", icon:"🏊", anim:"actSwim"}
        ]},
        {type:"example", html:"<b>Câu nêu hoạt động:</b> Em 🧹 quét nhà. Bạn Nam 🦶⚽ đá bóng."}
      ]},
    practice:[
      {type:"mc", q:"Từ nào là từ chỉ hoạt động?", options:["đẹp","con mèo","quét nhà","xanh"], answer:2, visual:"🧹"},
      {type:"mc", q:"Câu nào đúng mẫu 'Ai làm gì?'?", options:["Em quét nhà.","Bông hoa đẹp.","Trời rất nắng.","Con mèo là bạn em."], answer:0, visual:"🧹"},
      {type:"mc", q:"Trong câu 'Bạn Lan viết bài', từ chỉ hoạt động là gì?", options:["Bạn Lan","viết","bài","không có"], answer:1, visual:"✏️"},
      {type:"mc", q:"Từ nào chỉ hoạt động của con cá?", options:["bơi","to","vàng","đẹp"], answer:0, visual:"🐟"},
    ],
    test:[
      {type:"mc", q:"Từ nào là từ chỉ hoạt động?", options:["cái chổi","quét nhà","sạch sẽ","cái bàn"], answer:1, visual:"🧹"},
      {type:"mc", q:"Câu nào đúng mẫu 'Ai làm gì?'?", options:["Mẹ nấu cơm.","Mẹ em là bác sĩ.","Bầu trời trong xanh.","Em rất ngoan."], answer:0, visual:"🍳"},
      {type:"mc", q:"Từ nào chỉ hoạt động của con cá?", options:["bơi","to","vàng","đẹp"], answer:0, visual:"🐟"},
      {type:"mc", q:"Tìm 3-5 từ chỉ hoạt động gắn với 'cái chổi'. Từ nào đúng?", options:["quét nhà","nấu cơm","viết bài","tưới cây"], answer:0, visual:"🧹"},
    ],
    gen:[
      ()=>{ const bank=[["quét nhà","🧹"],["nấu cơm","🍳"],["viết bài","✏️"],["bơi","🏊"],["hót","🐦"],["đọc sách","📖"],["tưới cây","🪴"],["vẽ tranh","🎨"]];
        const dd=["sạch sẽ","cao","đỏ","xanh"]; const sv=["cái chổi","cái bàn","con mèo"];
        const pick=bank[randInt(0,bank.length-1)];
        const opts=distinctOptions(pick[0],3,()=>Math.random()<0.5?dd[randInt(0,dd.length-1)]:sv[randInt(0,sv.length-1)]);
        return {type:"mc", q:"Từ nào là từ chỉ hoạt động?", options:opts, answer:opts.indexOf(pick[0]), visual:pick[1]}; },
      ()=>{ const bank=[["Mẹ nấu cơm.","🍳"],["Em quét nhà.","🧹"],["Bố đọc báo.","📰"],["Bạn Lan viết bài.","✏️"]];
        const sai=["Mẹ em là bác sĩ.","Bầu trời trong xanh.","Em rất ngoan.","Bông hoa rất đẹp."];
        const pick=bank[randInt(0,bank.length-1)];
        const opts=distinctOptions(pick[0],3,()=>sai[randInt(0,sai.length-1)]);
        return {type:"mc", q:"Câu nào đúng mẫu 'Ai làm gì?'?", options:opts, answer:opts.indexOf(pick[0]), visual:pick[1]}; },
    ]
  },
  tv_dacdiem_neudacdiem: {
    title:"Từ chỉ đặc điểm; Câu nêu đặc điểm (Ai thế nào?)",
    learn:{ intro:"Từ chỉ đặc điểm miêu tả hình dáng, màu sắc, tính chất. Câu nêu đặc điểm theo mẫu 'Ai thế nào?'.",
      blocks:[
        {type:"wordcards", items:[
          {word:"cao", icon:"🦒"}, {word:"đỏ", icon:"🔴"}, {word:"ngoan", icon:"😇"}, {word:"đen láy", icon:"👁️", icon2:"✨"}
        ]},
        {type:"example", html:"<b>Câu nêu đặc điểm:</b> Đôi mắt 👁️ đen láy. Mái tóc mượt mà."}
      ]},
    practice:[
      {type:"mc", q:"Từ nào là từ chỉ đặc điểm?", options:["khuôn mặt","bầu bĩnh","đôi mắt","mái tóc"], answer:1, hint:"Đâu là từ tả tính chất, không phải tên gọi sự vật?"},
      {type:"mc", q:"Câu nào đúng mẫu 'Ai thế nào?'?", options:["Đôi mắt đen láy.","Em đi học.","Mẹ nấu cơm.","Con mèo là bạn em."], answer:0, visual:"👁️"},
      {type:"mc", q:"Từ nào tả tính cách?", options:["ngoan","cao","đỏ","to"], answer:0, visual:"😇"},
      {type:"mc", q:"Từ nào tả màu sắc?", options:["đỏ","cao","ngoan","to"], answer:0, visual:"🔴"},
    ],
    test:[
      {type:"mc", q:"Từ nào là từ chỉ đặc điểm?", options:["vầng trán","cao","mái tóc","đôi mắt"], answer:1},
      {type:"mc", q:"Câu nào đúng mẫu 'Ai thế nào?'?", options:["Mái tóc mượt mà.","Em quét nhà.","Bố là bác sĩ.","Chim hót líu lo."], answer:0},
      {type:"mc", q:"Trong câu 'Bạn Nam rất chăm chỉ', từ chỉ đặc điểm là gì?", options:["Bạn Nam","rất","chăm chỉ","cả câu"], answer:2},
      {type:"mc", q:"Từ nào tả màu sắc?", options:["vàng","nhanh","ngoan","cao"], answer:0, visual:"🟡"},
    ],
    gen:[
      ()=>{ const bank=[["cao","📏"],["đỏ","🔴"],["ngoan","😇"],["mượt mà","💇"],["bầu bĩnh","😊"],["xinh đẹp","🌸"],["chăm chỉ","📚"],["vàng","🟡"]];
        const sv=["khuôn mặt","mái tóc","đôi mắt","vầng trán"];
        const pick=bank[randInt(0,bank.length-1)];
        const opts=distinctOptions(pick[0],3,()=>sv[randInt(0,sv.length-1)]);
        return {type:"mc", q:"Từ nào là từ chỉ đặc điểm?", options:opts, answer:opts.indexOf(pick[0]), visual:pick[1]}; },
      ()=>{ const bank=[["Đôi mắt đen láy.","👁️"],["Mái tóc mượt mà.","💇"],["Bạn Lan rất ngoan.","😇"],["Bông hoa xinh đẹp.","🌸"]];
        const sai=["Em quét nhà.","Mẹ nấu cơm.","Bố là bác sĩ.","Chim hót líu lo."];
        const pick=bank[randInt(0,bank.length-1)];
        const opts=distinctOptions(pick[0],3,()=>sai[randInt(0,sai.length-1)]);
        return {type:"mc", q:"Câu nào đúng mẫu 'Ai thế nào?'?", options:opts, answer:opts.indexOf(pick[0]), visual:pick[1]}; },
    ]
  },

  /* ===== GIAI ĐOẠN 1 · CHẶNG 2 — Đợt 3 (Toán, phạm vi 20) ===== */
  knt_cong_qua10: {
    title:"Phép cộng (qua 10) trong phạm vi 20",
    learn:{ intro:"Khi cộng hai số có tổng lớn hơn 10, ta tách số để 'làm tròn chục' cho dễ tính.",
      blocks:[
        {type:"concept", text:"Ví dụ 9 + 5: Tách 5 = 1 + 4", big:"9 + 1 + 4 = 10 + 4 = 14"},
        {type:"example", html:"<b>Cách làm:</b> Lấy số thứ nhất cộng thêm để tròn 10, rồi cộng phần còn lại."},
        {type:"concept", text:"Ví dụ khác: 8 + 6", big:"8 + 2 + 4 = 10 + 4 = 14"}
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"9 + 4", answer:13, hint:"9 + 1 + 3"},
      {type:"fill", q:"Tính:", expr:"7 + 6", answer:13, hint:"7 + 3 + 3"},
      {type:"fill", q:"Tính:", expr:"8 + 5", answer:13, hint:"8 + 2 + 3"},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"9 + 7", answer:16},
      {type:"fill", q:"Tính:", expr:"6 + 8", answer:14},
      {type:"fill", q:"Tính:", expr:"5 + 9", answer:14},
    ],
    gen:[
      ()=>{ let a,b; do{ a=randInt(2,9); b=randInt(2,9); }while(a+b<11||a+b>18);
        const toTen=10-a;
        return {type:"fill", q:"Tính:", expr:`${a} + ${b}`, answer:a+b, hint:`${a} + ${toTen} + ${b-toTen}`}; },
    ]
  },
  knt_bang_cong_qua10: {
    title:"Bảng cộng (qua 10)",
    learn:{ intro:"Ghi nhớ bảng cộng qua 10 giúp tính nhanh hơn, không cần đếm tay.",
      blocks:[
        {type:"concept", text:"Một số phép cộng qua 10 cần nhớ:", big:"9+2=11, 9+3=12, 8+4=12, 7+5=12"},
        {type:"example", html:"<b>Mẹo:</b> Học thuộc bảng cộng giúp làm bài nhanh và chính xác hơn."}
      ]},
    practice:[
      {type:"mc", q:"9 + 6 = ?", options:["14","15","16","13"], answer:1},
      {type:"mc", q:"8 + 7 = ?", options:["14","15","16","13"], answer:1},
      {type:"fill", q:"Tính:", expr:"7 + 7", answer:14},
    ],
    test:[
      {type:"mc", q:"9 + 8 = ?", options:["16","17","15","18"], answer:1},
      {type:"mc", q:"6 + 9 = ?", options:["14","15","16","13"], answer:1},
      {type:"fill", q:"Tính:", expr:"8 + 8", answer:16},
    ],
    gen:[
      ()=>{ let a,b; do{ a=randInt(3,9); b=randInt(3,9); }while(a+b<11||a+b>18);
        const correct=a+b;
        const opts=distinctOptions(correct,3,()=>correct+(randInt(0,1)?1:-1)*randInt(1,3));
        return {type:"mc", q:`${a} + ${b} = ?`, options:opts, answer:opts.indexOf(String(correct))}; },
    ]
  },
  knt_them_bot: {
    title:"Bài toán về thêm, bớt một số đơn vị",
    learn:{ intro:"'Thêm' một số đơn vị nghĩa là cộng thêm; 'bớt' một số đơn vị nghĩa là trừ đi.",
      blocks:[
        {type:"concept", text:"Có 8 quả táo, thêm 5 quả nữa. Hỏi có tất cả bao nhiêu quả?", big:"8 + 5 = 13"},
        {type:"compare", a:8, b:5, labelA:"Có sẵn", labelB:"Thêm vào", iconA:"🍎", iconB:"🍏"},
        {type:"example", html:"<b>Bớt:</b> Có 15 cái kẹo, cho bạn 6 cái. Còn lại: 15 − 6 = 9 cái."}
      ]},
    practice:[
      {type:"fill", q:"Có 9 con gà, thêm 7 con nữa. Hỏi có tất cả bao nhiêu con gà?", answer:16, hint:"9 + 7"},
      {type:"fill", q:"Có 14 quả bóng, cho đi 5 quả. Còn lại bao nhiêu quả?", answer:9, hint:"14 − 5"},
      {type:"mc", q:"Lan có 6 bút chì, mẹ cho thêm 8 cái. Lan có tất cả bao nhiêu cái?", options:["14","13","15","12"], answer:0},
    ],
    test:[
      {type:"fill", q:"Có 8 con vịt, thêm 9 con nữa. Hỏi có tất cả bao nhiêu con?", answer:17},
      {type:"fill", q:"Có 16 cái bánh, ăn hết 7 cái. Còn lại bao nhiêu cái?", answer:9},
      {type:"mc", q:"Hà có 12 nhãn vở, cho bạn 5 cái. Hà còn lại bao nhiêu cái?", options:["7","8","6","17"], answer:0},
    ],
    gen:[
      ()=>{ const items=[["con gà","🐔"],["quả bóng","⚽"],["cái kẹo","🍬"],["quyển vở","📓"],["con cá","🐟"]];
        const it=items[randInt(0,items.length-1)]; const a=randInt(6,15), b=randInt(2,9);
        return {type:"fill", q:`Có ${a} ${it[0]}, thêm ${b} ${it[0]} nữa. Hỏi có tất cả bao nhiêu ${it[0]}?`, answer:a+b, visual:it[1], hint:`${a} + ${b}`}; },
      ()=>{ const items=[["cái bánh","🍪"],["quả cam","🍊"],["cái kẹo","🍬"],["bông hoa","🌸"]];
        const it=items[randInt(0,items.length-1)]; const a=randInt(10,18), b=randInt(2,9);
        if(b>=a) return {type:"fill", q:`Có ${a} ${it[0]}, cho đi ${Math.min(b,a-1)} ${it[0]}. Còn lại bao nhiêu ${it[0]}?`, answer:a-Math.min(b,a-1), visual:it[1]};
        return {type:"fill", q:`Có ${a} ${it[0]}, cho đi ${b} ${it[0]}. Còn lại bao nhiêu ${it[0]}?`, answer:a-b, visual:it[1], hint:`${a} − ${b}`}; },
    ]
  },
  knt_tru_qua10: {
    title:"Phép trừ (qua 10) trong phạm vi 20",
    learn:{ intro:"Khi trừ mà chữ số hàng đơn vị của số bị trừ nhỏ hơn số trừ, ta tách số bị trừ thành 10 và phần còn lại để tính.",
      blocks:[
        {type:"concept", text:"Ví dụ 14 − 6: Tách 14 = 10 + 4", big:"10 − 6 + 4 = 4 + 4 = 8"},
        {type:"example", html:"<b>Cách làm:</b> Lấy 10 trừ số trừ trước, rồi cộng thêm phần dư của số bị trừ."}
      ]},
    practice:[
      {type:"fill", q:"Tính:", expr:"13 − 5", answer:8, hint:"10 − 5 + 3"},
      {type:"fill", q:"Tính:", expr:"15 − 7", answer:8, hint:"10 − 7 + 5"},
      {type:"fill", q:"Tính:", expr:"16 − 9", answer:7, hint:"10 − 9 + 6"},
    ],
    test:[
      {type:"fill", q:"Tính:", expr:"14 − 8", answer:6},
      {type:"fill", q:"Tính:", expr:"17 − 9", answer:8},
      {type:"fill", q:"Tính:", expr:"12 − 5", answer:7},
    ],
    gen:[
      ()=>{ let a,b; do{ a=randInt(11,18); b=randInt(2,9); }while(a-b<2 || a-b>9 || b<=a-10);
        const donvi=a-10;
        return {type:"fill", q:"Tính:", expr:`${a} − ${b}`, answer:a-b, hint:`10 − ${b} + ${donvi}`}; },
    ]
  },
  knt_bang_tru_qua10: {
    title:"Bảng trừ (qua 10)",
    learn:{ intro:"Ghi nhớ bảng trừ qua 10 giúp tính nhanh hơn.",
      blocks:[
        {type:"concept", text:"Một số phép trừ qua 10 cần nhớ:", big:"11−2=9, 12−4=8, 13−5=8, 15−7=8"},
        {type:"example", html:"<b>Mẹo:</b> Bảng trừ liên quan tới bảng cộng: nếu 9+2=11 thì 11−2=9."}
      ]},
    practice:[
      {type:"mc", q:"11 − 4 = ?", options:["6","7","8","5"], answer:1},
      {type:"mc", q:"14 − 6 = ?", options:["7","8","9","6"], answer:1},
      {type:"fill", q:"Tính:", expr:"13 − 4", answer:9},
    ],
    test:[
      {type:"mc", q:"16 − 8 = ?", options:["7","8","9","6"], answer:1},
      {type:"mc", q:"12 − 3 = ?", options:["8","9","10","7"], answer:1},
      {type:"fill", q:"Tính:", expr:"15 − 6", answer:9},
    ],
    gen:[
      ()=>{ let a,b; do{ a=randInt(11,18); b=randInt(2,9); }while(a-b<2 || a-b>9 || b<=a-10);
        const correct=a-b;
        const opts=distinctOptions(correct,3,()=>correct+(randInt(0,1)?1:-1)*randInt(1,3));
        return {type:"mc", q:`${a} − ${b} = ?`, options:opts, answer:opts.indexOf(String(correct))}; },
    ]
  },
  knt_nhieuhon_ithon: {
    title:"Bài toán về nhiều hơn, ít hơn một số đơn vị",
    learn:{ intro:"'Nhiều hơn' nghĩa là cộng thêm, 'ít hơn' nghĩa là trừ bớt so với số đã biết.",
      blocks:[
        {type:"concept", text:"An có 7 viên bi. Bình có nhiều hơn An 4 viên. Bình có bao nhiêu viên?", big:"7 + 4 = 11"},
        {type:"compare", a:11, b:7, labelA:"Bình", labelB:"An", iconA:"🔵", iconB:"🔵"},
        {type:"example", html:"<b>Ít hơn:</b> Cam có 12 quyển vở. Táo có ít hơn Cam 3 quyển. Táo có: 12 − 3 = 9 quyển."}
      ]},
    practice:[
      {type:"fill", q:"Hoa có 8 cái kẹo. Lan có nhiều hơn Hoa 5 cái. Lan có bao nhiêu cái kẹo?", answer:13, hint:"8 + 5"},
      {type:"fill", q:"Nam có 15 viên bi. Đức có ít hơn Nam 6 viên. Đức có bao nhiêu viên bi?", answer:9, hint:"15 − 6"},
      {type:"mc", q:"Gà có 9 con. Vịt nhiều hơn gà 4 con. Vịt có mấy con?", options:["13","5","14","12"], answer:0},
    ],
    test:[
      {type:"fill", q:"Mai có 6 bông hoa. Hà có nhiều hơn Mai 7 bông. Hà có bao nhiêu bông hoa?", answer:13},
      {type:"fill", q:"Bố có 18 quyển sách. Mẹ có ít hơn bố 9 quyển. Mẹ có bao nhiêu quyển sách?", answer:9},
      {type:"mc", q:"Lớp 2A có 14 bạn nam, số bạn nữ ít hơn nam 5 bạn. Lớp có bao nhiêu bạn nữ?", options:["9","19","8","10"], answer:0},
    ],
    gen:[
      ()=>{ const names=[["Hoa","Lan","cái kẹo","🍬"],["Nam","Đức","viên bi","🔵"],["Mai","Hà","bông hoa","🌸"],["An","Bình","quyển sách","📕"]];
        const nm=names[randInt(0,names.length-1)]; const a=randInt(5,15), b=randInt(2,9);
        return {type:"fill", q:`${nm[0]} có ${a} ${nm[2]}. ${nm[1]} có nhiều hơn ${nm[0]} ${b} ${nm[2]}. ${nm[1]} có bao nhiêu ${nm[2]}?`, answer:a+b, visual:nm[3], hint:`${a} + ${b}`}; },
      ()=>{ const names=[["Nam","Đức","viên bi","🔵"],["Bố","Mẹ","quyển sách","📕"],["Cam","Táo","quyển vở","📓"]];
        const nm=names[randInt(0,names.length-1)]; const a=randInt(10,18), b=randInt(2,9);
        if(b>=a) return {type:"fill", q:`${nm[0]} có ${a} ${nm[2]}. ${nm[1]} có ít hơn ${nm[0]} ${Math.min(b,a-1)} ${nm[2]}. ${nm[1]} có bao nhiêu ${nm[2]}?`, answer:a-Math.min(b,a-1), visual:nm[3]};
        return {type:"fill", q:`${nm[0]} có ${a} ${nm[2]}. ${nm[1]} có ít hơn ${nm[0]} ${b} ${nm[2]}. ${nm[1]} có bao nhiêu ${nm[2]}?`, answer:a-b, visual:nm[3], hint:`${a} − ${b}`}; },
    ]
  },
};
