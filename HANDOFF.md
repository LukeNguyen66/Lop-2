# BÀN GIAO CHO CLAUDE CODE — DỰ ÁN "BÉ HỌC GIỎI"

**Đọc file này ĐẦU TIÊN.** Đây là bản tóm tắt để Claude Code (hoặc bất kỳ ai tiếp
quản dự án) nắm được bối cảnh nhanh, không cần đọc lại toàn bộ lịch sử hội thoại cũ.

---

## 1. DỰ ÁN NÀY LÀ GÌ

App học tập tương tác cho một bé học sinh lớp 2 (SGK Kết nối tri thức), gồm 2 môn
Toán và Tiếng Việt. Mỗi bài học có 3 phần: **Học** (kiến thức + hình minh hoạ/animation)
→ **Luyện tập** (10 câu, có gợi ý) → **Kiểm tra** (10 câu, chấm điểm). Bố mẹ (người
dùng) không phải lập trình viên — mọi trao đổi trước đây đều bằng tiếng Việt thông
thường, không có thuật ngữ kỹ thuật.

**Đọc thêm nếu cần bối cảnh sâu hơn** (theo thứ tự ưu tiên):
1. `docs/NHAT-KY-TIEN-DO.md` — **quan trọng nhất**, nhật ký đầy đủ mọi quyết định kỹ
   thuật, mọi lỗi đã sửa, mọi bài học rút ra qua các đợt làm việc trước (rất dài,
   nhưng là nguồn thông tin đáng tin cậy nhất, luôn cập nhật).
2. `docs/GHI-CHU-BAN-GIAO.md`, `docs/KE-HOACH-APP-BE-HOC-GIOI-v2.md` — tài liệu gốc
   từ đầu dự án (hơi cũ, tham khảo cho bối cảnh lịch sử, một số chi tiết đã lỗi thời
   so với `NHAT-KY-TIEN-DO.md`).
3. `docs/DANH-SACH-PROMPT-ANH-GEMINI.md` — danh sách prompt để bố mẹ tự tạo ảnh AI
   minh hoạ, đang dùng dần để thay thế icon Twemoji.

---

## 2. THAY ĐỔI KIẾN TRÚC QUAN TRỌNG NHẤT (đọc kỹ trước khi sửa bất cứ gì)

Dự án **BAN ĐẦU** được thiết kế là **1 file HTML DUY NHẤT chạy OFFLINE** trên iPad
(mở bằng Safari, không cần mạng, không cần server). Đây là lý do vì sao trước đây mọi
hình ảnh đều nhúng trực tiếp bằng SVG/base64 vào trong file thay vì dùng thẻ `<img
src="...">` trỏ ra file ngoài.

**Bây giờ bố mẹ đã quyết định chuyển sang deploy lên Vercel** (web thông thường, cần
mạng để mở) — vì lý do: cần dùng ảnh AI (Gemini) chất lượng cao để minh hoạ, không
tiện nhúng base64 hàng chục ảnh vào 1 file HTML khổng lồ. Đây là đánh đổi có chủ đích,
đã bàn bạc kỹ với bố mẹ, **không phải sai sót** — nếu thấy cấu trúc project khác với
"chuẩn offline app" đừng tự ý đổi lại.

Tôi (Claude, phiên bản chat) đã tách sẵn file HTML gốc (`be-hoc-gioi-v14.html`, để lại
trong thư mục gốc làm bản lưu tham khảo/rollback) thành cấu trúc dự án web chuẩn —
xem mục 3 bên dưới.

---

## 3. CẤU TRÚC DỰ ÁN HIỆN TẠI

```
be-hoc-gioi-web/
├── index.html              ← khung HTML, link tới css/js bên dưới
├── css/
│   └── style.css            ← toàn bộ CSS (tách nguyên vẹn từ file gốc)
├── js/
│   ├── curriculum-data.js   ← CURRICULUM (khung chương trình) + CONTENT (nội dung
│   │                           từng bài: Học/Luyện tập/Kiểm tra/generator câu hỏi)
│   ├── icons-data.js        ← EMOJI_SVG (69 icon Twemoji nhúng sẵn), CUSTOM_ICONS
│   │                           (2 icon tự vẽ), SCENES (2 cảnh ghép nhân vật), hàm
│   │                           emo(), và bảng IMAGE_ASSETS (xem mục 4)
│   └── engine.js            ← toàn bộ logic app: điều hướng, quiz engine, animation,
│                                render các loại thẻ (wordcards/actioncards/scenecards/
│                                vcalc/numline/compare/barcompare)
├── images/
│   └── README.md             ← hướng dẫn quy ước thêm ảnh AI (xem mục 4)
├── docs/                     ← tài liệu tham khảo (xem mục 1)
├── package.json
├── vercel.json               ← cấu hình tối thiểu, site tĩnh không cần build
├── .gitignore
├── be-hoc-gioi-v14.html      ← bản gốc 1-file trước khi tách (giữ lại để đối chiếu/
│                                rollback nếu cần, KHÔNG dùng để deploy)
└── HANDOFF.md                 ← chính là file bạn đang đọc
```

**Đã kiểm tra kỹ trước khi bàn giao:** tải 3 file JS theo đúng thứ tự
(curriculum-data → icons-data → engine) trong môi trường mô phỏng — toàn bộ 22 bài,
69 icon, hệ thống sinh câu hỏi ngẫu nhiên (15.300+ lượt test) đều hoạt động đúng y hệt
bản gốc, không có gì bị hỏng khi tách file.

---

## 4. CƠ CHẾ THAY ẢNH AI (quan trọng — đây là việc SẼ LÀM TIẾP)

Bố mẹ đang tự tạo ảnh minh hoạ bằng Gemini (theo `docs/DANH-SACH-PROMPT-ANH-GEMINI.md`)
để thay dần cho icon Twemoji ở những chỗ cần thể hiện HÀNH ĐỘNG/TƯƠNG TÁC rõ ràng hơn
(ví dụ "khám bệnh", "dạy học", "đá bóng"...).

Cơ chế đã dựng sẵn, **không cần sửa code khi thêm ảnh mới** — chỉ cần:
1. Bố mẹ gửi file ảnh → đặt vào `images/`.
2. Thêm 1 dòng vào bảng `IMAGE_ASSETS` trong `js/icons-data.js`:
   - `wordcards`/`actioncards` (thẻ từ vựng, thẻ hành động 1 người): khoá = đúng chữ
     trong trường `word` (ví dụ `"bác sĩ": "images/bacsi.png"`).
   - `scenecards` (thẻ cảnh ghép 2 người — hiện chỉ có "dạy học", "khám bệnh"): khoá
     = `sceneKey` (ví dụ `dayhoc: "images/dayhoc.png"`, không có dấu ngoặc kép quanh
     `dayhoc`).
3. Xong — `engine.js` (hàm `iconHtml`, `mountWordcards`, `mountActioncards`,
   `mountScenecards`) tự động ưu tiên hiển thị ảnh nếu có, tự fallback về icon cũ nếu
   chưa có. Xem chi tiết trong `images/README.md`.

**Việc cần làm:** khi bố mẹ gửi ảnh, hãy nén/resize ảnh cho gọn (khuyến nghị dưới
150-200KB/ảnh, định dạng PNG hoặc WebP) trước khi đưa vào `images/`, để trang web tải
nhanh.

---

## 5. TRIỂN KHAI LÊN VERCEL — CÁC BƯỚC CỤ THỂ

Đây là site tĩnh thuần (không backend, không build step), Vercel deploy được ngay:

```bash
# 1. Vào thư mục dự án
cd be-hoc-gioi-web

# 2. Khởi tạo git (nếu chưa có)
git init
git add .
git commit -m "Khởi tạo dự án Bé Học Giỏi - chuyển sang cấu trúc web"

# 3. Cài Vercel CLI (nếu máy chưa có)
npm install -g vercel

# 4. Đăng nhập Vercel (sẽ mở trình duyệt để đăng nhập/tạo tài khoản)
vercel login

# 5. Deploy (làm theo hướng dẫn trên màn hình — chọn "N" khi hỏi link tới project
#    có sẵn nếu đây là lần đầu, đặt tên project tuỳ ý, ví dụ "be-hoc-gioi")
vercel

# 6. Sau khi hài lòng với bản xem thử (preview URL), deploy bản chính thức:
vercel --prod
```

Sau bước 6, Vercel trả về 1 địa chỉ web (dạng `https://be-hoc-gioi-xxx.vercel.app`)
— đây là link bố mẹ và bé sẽ dùng để mở app hằng ngày. Mỗi lần sau này sửa code xong,
chỉ cần chạy lại `vercel --prod` để cập nhật.

**Lưu ý:** đăng nhập/tạo tài khoản Vercel và bấm deploy là hành động CẦN BỐ MẸ TỰ LÀM
(qua trình duyệt của họ) — Claude Code có thể chạy lệnh giúp nhưng bước xác thực tài
khoản cần chính chủ thực hiện.

---

## 6. NHỮNG GÌ CHƯA HOÀN THÀNH (để tiếp tục đúng hướng)

Tóm tắt nhanh — **chi tiết đầy đủ nằm ở `docs/NHAT-KY-TIEN-DO.md`, mục "Chưa làm"**:

- Mới hoàn thành đầy đủ (đối chiếu SGK thật + animation + generator câu hỏi):
  Toán Chủ đề 1 (Bài 1-6), Tiếng Việt Chủ điểm 1 (4 bài) + tr/ch + s/x.
- Còn ~90 bài Toán và nhiều chủ điểm Tiếng Việt CHƯA có nội dung (hiện khoá 🔒 trong
  app) — cần đọc tiếp SGK thật (2 file PDF Toán/Tiếng Việt tập 1 đã có, tập 2 CHƯA có)
  và số hoá theo đúng quy trình đã thiết lập (xem `docs/GHI-CHU-BAN-GIAO.md` mục
  "Quy tắc thêm bài mới").
- Animation phép trừ CÓ NHỚ (mượn 1) — engine đã hỗ trợ sẵn kỹ thuật (`vcalc` với
  `op:"-"`), chỉ cần khai báo đúng dữ liệu bài khi làm tới Chủ đề 4.
- Ảnh AI: mới có prompt cho 2 cảnh ưu tiên cao nhất, bố mẹ đang tạo dần.

**QUAN TRỌNG:** khi thêm bài mới hoặc icon mới, PHẢI áp dụng đủ bộ nguyên tắc đã đúc
kết qua nhiều lần sửa lỗi trước đây (đọc kỹ `docs/NHAT-KY-TIEN-DO.md` phần "Nguyên
tắc"/"Kỹ thuật mới" ở mỗi mục lịch sử đợt) — đặc biiệt:
1. Mọi bài luyện tập/kiểm tra PHẢI có `gen` (sinh câu hỏi ngẫu nhiên), không chỉ vài
   câu cố định.
2. Mọi icon PHẢI tự hỏi: "icon này có THỰC SỰ thể hiện đúng nghĩa từ, hay chỉ là đồ
   vật liên quan chung chung?" — đã có 2 đợt sửa lỗi vì bỏ qua câu hỏi này (icon
   "bác sĩ" dùng ống nghe thay vì người, "đá bóng" dùng quả bóng thay vì người đá).
3. Trước khi giao bất kỳ bản cập nhật nào, chạy lại bộ kiểm tra: `node --check` cú
   pháp, đối chiếu key CURRICULUM↔CONTENT, stress-test toàn bộ hàm `gen` (500+
   lần/hàm), và quét toàn bộ emoji dùng trong text để đảm bảo đều có trong
   `EMOJI_SVG`.

---

## 7. NGUYÊN TẮC NỘI DUNG (bắt buộc, không đổi)

- KHÔNG bịa nội dung. Toán tự tính lại đáp án bằng code trước khi đưa vào. Tiếng Việt
  KHÔNG chép nguyên văn bài đọc trong SGK (bản quyền NXB Giáo dục) — chỉ số hoá phần
  luyện tập (chính tả, từ ngữ, câu, dấu câu) tự soạn dựa trên đúng chủ điểm/từ khoá
  sách đưa ra.
- Bài chưa đối chiếu được với trang sách thật thì giữ nhãn "bản nháp".
