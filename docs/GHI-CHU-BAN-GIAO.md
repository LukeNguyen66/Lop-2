# GHI CHÚ BÀN GIAO — APP "BÉ HỌC GIỎI"
### (Gửi kèm mỗi đoạn chat mới để trợ lý không quên yêu cầu)

---

## 0. TÓM TẮT DỰ ÁN

- App học tập lớp 2, **CHỈ bộ Kết nối tri thức** (đã chốt, không làm bộ khác).
- Một file HTML duy nhất chạy offline trên iPad/iPhone/MacBook (mở bằng Safari, Thêm vào MH chính).
- File app hiện tại: **be-hoc-gioi-v3.html**
- Cấu trúc điều hướng: **Chọn môn (Toán/Tiếng Việt) → danh sách bài theo chương, chia Tập 1/Tập 2 → chọn bài → Học / Luyện tập / Kiểm tra**.
- Khung chương đã dựng CHÍNH XÁC theo mục lục SGK thật: Toán 75 bài (14 chủ đề), Tiếng Việt theo chủ điểm.

---

## 1. ⭐ YÊU CẦU VỀ TÍNH SINH ĐỘNG & ANIMATION (QUAN TRỌNG — KHÔNG ĐƯỢC QUÊN)

Đây là các yêu cầu bố mẹ đã nêu, PHẢI giữ và áp dụng cho các bài mới:

### a) Animation phép tính cột dọc (ĐÃ LÀM cho phép cộng)
- Phép cộng đặt tính **theo cột dọc**, các chữ số **thẳng hàng** (trăm–chục–đơn vị).
- Cộng **từ phải sang trái**: đơn vị trước → chục → trăm. Cột đang tính **sáng vàng**.
- Xử lý **"nhớ 1"**: số nhớ màu đỏ bay lên đầu cột bên trái, có âm thanh.
- Có **cả hai nút**: "Bước tiếp" (bấm từng bước) + "Tự chạy" (tự động).
- Đã có sẵn trong bài "Phép cộng có nhớ / không nhớ trong phạm vi 1000" (key: knt_cong1000, knt_cong1000n). Code hàm: vBuild, vDoStep, vAuto, mountVCalc.

### b) 🔴 CÒN PHẢI LÀM: Animation phép TRỪ cột dọc (Bài 61, 62)
- Tương tự phép cộng nhưng có **"mượn 1"** (khó hơn — khi chữ số trên nhỏ hơn chữ số dưới).
- Phải thể hiện rõ việc mượn: chữ số bị mượn giảm đi 1, chữ số hiện tại được +10.
- Giữ nguyên cơ chế 2 nút (bước/tự chạy) như phép cộng.

### c) Nguyên tắc sinh động chung cho MỌI bài mới
- Nhân vật con vật ngộ nghĩnh (đổi ngẫu nhiên), nhảy khi trả lời đúng.
- Âm thanh: đúng (vui), sai (trầm), hoàn thành (nhạc thắng) — dùng Web Audio, KHÔNG cần file.
- Pháo hoa emoji khi hoàn thành. Sao ⭐ tích lũy, chuỗi đúng 🔥.
- Với dạng có thể minh họa: dùng emoji (🚲🍬🐔...) thay hình chụp.
- Bài học nên có ví dụ trực quan, không chỉ chữ. Ưu tiên animation/tương tác khi khái niệm có tính "quá trình" (phép tính, so sánh, đếm...).

### d) Ý tưởng animation nên làm dần cho các bài khác (gợi ý)
- **Bảng nhân/chia:** minh họa nhóm đồ vật (3 nhóm × 2 quả = 6).
- **So sánh số:** hai số "cân" lên bàn cân, bên lớn nghiêng xuống.
- **Tia số / số liền trước-sau:** con vật nhảy trên tia số.
- **Đồng hồ (giờ-phút):** kim đồng hồ quay.
- **Khối trụ/cầu:** hình 3D xoay được.
- **Tiền Việt Nam:** kéo thả tờ tiền cho đủ số.

---

## 2. KIẾN TRÚC KỸ THUẬT (để thêm nội dung đúng chỗ)

### Dữ liệu trong file, 3 phần:
1. **CURRICULUM** — khung chương (đã đầy đủ, chính xác theo SGK). Mỗi bài:
   `{t:"Bài 37. Phép nhân", key:"knt_nhan"}` — có `key` = đã có nội dung; không key = hiện khóa 🔒.
2. **CONTENT** — nội dung từng bài, tra theo `key`. Cấu trúc mỗi bài:
   ```
   key_bai: {
     title:"...",
     learn:{ intro:"...", blocks:[
        {type:"concept", text:"...", big:"..."},   // ô kiến thức
        {type:"example", html:"..."},              // ô ví dụ (viền xanh)
        {type:"vcalc"}                             // chèn animation cột dọc
     ]},
     practice:[ câu hỏi... ],   // có hint, không tính điểm gắt
     test:[ câu hỏi... ]        // chấm điểm
   }
   ```
3. **VCALC_PROBLEMS** — các phép cho animation, tra theo key bài.

### Dạng câu hỏi hiện hỗ trợ:
- `{type:"mc", q, options:[...], answer:index, visual:"emoji", hint, two:true}` — trắc nghiệm (two=2 cột cho lựa chọn ngắn).
- `{type:"fill", q, expr:"...", answer:số, visual, hint}` — điền số, có bàn phím số.

### 🔴 Dạng câu hỏi CÒN THIẾU, nên bổ sung khi gặp bài cần (đề thi của trường có):
- **Nối cột** (matching) — đã từng làm ở engine đề thi cũ, cần port sang.
- **Đúng/Sai (Đ-S)**.
- **Sơ đồ máy tính** (hình → phép tính → hình).
- **Chắc chắn / có thể / không thể**.
- (Tham khảo file engine đề thi cũ nếu cần: các hàm renderMatch, renderTF, renderMachine.)

### Quy tắc thêm bài mới:
1. Đọc SGK, soạn nội dung → thêm 1 khối vào **CONTENT** với key mới.
2. Vào **CURRICULUM**, thêm `key:"..."` vào đúng bài đó (bài sẽ tự mở khóa).
3. Nếu bài cần animation → thêm block `{type:"vcalc"}` + dữ liệu vào VCALC_PROBLEMS.
4. LUÔN chạy kiểm tra: cú pháp JS + tự tính lại đáp án + mô phỏng luồng (như đã làm).

---

## 3. NGUYÊN TẮC NỘI DUNG (BẮT BUỘC)

- **KHÔNG bịa, KHÔNG suy diễn.** Chỉ số hóa theo đúng SGK. Bài nào không chắc → đánh dấu "bản nháp" để bố mẹ kiểm tra.
- **Toán:** số hóa chính xác được ngay (kỹ năng tính chuẩn). Tự tính lại mọi đáp án bằng code.
- **Tiếng Việt:** KHÔNG chép nguyên văn bài đọc (bản quyền NXB Giáo dục — sách ghi rõ cấm sao chép). Chỉ số hóa phần LUYỆN TẬP: chính tả, từ ngữ, câu, dấu câu, đọc hiểu qua câu hỏi tự soạn.
- Mọi bài đều gắn nhãn "bản nháp" cho đến khi bố mẹ đối chiếu sách xác nhận.

---

## 4. SGK ĐÃ CÓ (bố mẹ gửi kèm khi cần)
- SGK Toán 2 Kết nối tập 1 (142 tr, scan ảnh)
- SGK Toán 2 Kết nối tập 2 (142 tr, scan ảnh)
- SGK Tiếng Việt 2 Kết nối tập 1 (145 tr, scan ảnh)
- SGK Tiếng Việt 2 Kết nối tập 2 (146 tr, scan ảnh)
→ Đều là bản scan, phải đọc bằng cách render ảnh từng trang (nặng). Mỗi đợt chỉ đọc trang của bài đang làm.

---

## 5. CÂU LỆNH MẪU CHO ĐỢT MỚI

> "Đây là app học lớp 2 Kết nối tri thức tôi đang xây (gửi kèm **be-hoc-gioi-v3.html**, **file ghi chú bàn giao này**, và **SGK [tên cuốn]**).
> Hãy đọc GHI CHÚ BÀN GIAO trước để nắm yêu cầu (nhất là phần animation & sinh động).
> Sau đó số hóa chi tiết **[tên bài/chương]** vào app, đúng nội dung sách, không bịa, bài không chắc thì đánh dấu.
> Nhớ chạy kiểm tra đáp án và luồng trước khi giao file."

---

## 6. TRẠNG THÁI HIỆN TẠI

- ✅ Khung chương chính xác theo SGK thật (Toán 75 bài, TV theo chủ điểm).
- ✅ Bỏ tầng chọn sách, vào thẳng chọn môn.
- ✅ Animation cộng cột dọc (có nhớ + không nhớ).
- ✅ 6 bài có nội dung mẫu: Phép nhân, Bảng nhân 2, Cộng 1000 (×2), tr/ch, s/x.
- 🔴 Còn lại ~90 bài chờ đổ nội dung (hiện khóa 🔒).
- 🔴 Chưa làm: animation phép trừ, các dạng câu hỏi nối/Đ-S/máy tính.
- ⏳ Đề thi trường: bố mẹ cấp sau, sẽ số hóa thành "phòng thi".
