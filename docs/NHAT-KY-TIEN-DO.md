# NHẬT KÝ TIẾN ĐỘ — APP "BÉ HỌC GIỎI"
### File này là "trí nhớ" giữa các đoạn chat. Mỗi đợt xong phải cập nhật lại và tải lại vào Project.

---

## TRẠNG THÁI HIỆN TẠI

**Đã chuyển sang git + deploy Vercel — không còn dùng file "vXX" đơn lẻ nữa.**
Repo: https://github.com/LukeNguyen66/Lop-2 (nhánh `main`) — mỗi lần push, Vercel tự
động build lại. Link app đang chạy: https://lop-2-chi.vercel.app/

**🆕 ĐỢT NÀY (Claude Code, phiên bàn giao đầu tiên) — khởi tạo git + Vercel, thêm video
AI thật cho cảnh "dạy học":**

1. **Hạ tầng:** `git init`, push code lên GitHub (`LukeNguyen66/Lop-2`), import + deploy
   trên Vercel qua giao diện web (không dùng CLI vì máy gặp lỗi PATH không nhận diện
   lệnh `vercel` ngay cả sau khi cài — đã né bằng cách deploy qua vercel.com/new, connect
   GitHub, từ đó auto-deploy mỗi lần push).
2. **Video AI thay cho icon ghép ở cảnh "dạy học":** bố mẹ gửi 1 video ảnh động AI
   (`images/dayhoc.mp4`, ~3MB), khai báo trong `IMAGE_ASSETS.dayhoc`. Engine
   (`mountScenecards`) giờ tự nhận diện đuôi file `.mp4/.webm/.mov` để render `<video>`
   thay vì `<img>` — cơ chế thêm ảnh/video vẫn y hệt cũ (chỉ cần 1 dòng trong
   `IMAGE_ASSETS`, không sửa gì khác).
3. **Cách xem video — làm qua 3 vòng chỉnh sửa theo phản hồi trực tiếp của bố mẹ:**
   - Vòng 1: video tự động autoplay+loop ngay trong thẻ nhỏ, bấm vào thẻ chỉ tạo hiệu
     ứng "lắc" (kế thừa hiệu ứng cũ của icon tĩnh) → bố mẹ chê "không cần lắc nữa".
   - Vòng 2: bỏ autoplay/loop, thẻ nhỏ chỉ hiện khung hình đầu + icon ▶, bấm vào mới
     phát video (dừng hẳn khi hết, bấm lại phát lại từ đầu) — nhưng vẫn phát ngay tại
     chỗ, kích thước nhỏ như cũ.
   - Vòng 3 (bản hiện tại): bấm "Bấm để xem" mở **modal lớn giữa màn hình**
     (`#videoModal` trong `index.html`, hàm `openSceneVideo`/`toggleSceneVideo`/
     `closeSceneModal` trong `engine.js`) — phát video cỡ lớn, có nút đóng ✕, bấm ra
     ngoài cũng đóng, bấm lại vào video sau khi hết sẽ phát lại từ đầu. Bỏ `muted` để
     có tiếng (video có âm thanh thật, phát nghe được khi bấm xem).
   - **Bài học:** khi thêm media thật (ảnh/video AI) thay cho icon SVG ghép, đừng giữ
     nguyên cơ chế tương tác cũ (hiệu ứng lắc, kích thước nhỏ) — media thật cần cách xem
     riêng (modal to, điều khiển play/stop rõ ràng) vì mục đích khác hẳn icon tĩnh minh
     hoạ. Cảnh "khám bệnh" (chưa có video, vẫn dùng icon ghép SVG cũ) vẫn giữ hiệu ứng
     lắc như trước — engine tự phân nhánh theo việc `IMAGE_ASSETS[sceneKey]` có video
     hay không, không cần sửa dữ liệu bài học.
4. **Kiểm tra trước khi giao:** `node --check` cú pháp OK cho mọi file JS sửa; test
   trực tiếp qua Browser preview (không chỉ đọc code) — xác nhận modal mở/đóng đúng,
   video dừng đúng lúc hết và phát lại đúng khi bấm lại, không có lỗi console; sau khi
   push, xác nhận lại trên bản deploy thật (`lop-2-chi.vercel.app`) bằng cách fetch
   trực tiếp file JS/HTML production để chắc Vercel đã build đúng bản mới, không chỉ tin
   theo "push xong là xong".

---

**File app gốc (mốc lịch sử, không còn cập nhật):** be-hoc-gioi-v14.html — xem đợt v14
bên dưới để biết lịch sử trước khi tách thành cấu trúc web.

**🆕 ĐỢT NÀY (v14) — sửa 6 lỗi "icon đồ vật thay cho đúng nghĩa từ", mở rộng engine:**

Bố mẹ gửi 3 ảnh chụp, chỉ ra 6 icon cùng loại lỗi với "bác sĩ" trước đó — icon là đồ vật
liên quan chung chung, không thể hiện đúng/rõ nghĩa của từ:

| Từ | Icon cũ (sai) | Vấn đề | Icon mới |
|---|---|---|---|
| đá bóng | ⚽ (chỉ quả bóng) | không có ai đá | 🦶+⚽ (chân + bóng, ghép) |
| ăn | 🍎 (chỉ quả táo) | không có ai ăn | 😋+🍎 (mặt thèm ăn + táo, ghép) |
| cao | 📏 (cái thước) | quá trừu tượng | 🦒 (hươu cao cổ — biểu tượng "cao" phổ biến) |
| đen láy | 👁️ (mắt thường) | không rõ "đen, lấp lánh" | 👁️+✨ (mắt + lấp lánh, ghép) |
| sông | 🌊 (sóng biển) | sóng ≠ sông | Icon tự vẽ: dòng nước uốn lượn giữa 2 bờ xanh |
| xa | 🏞️ (phong cảnh chung) | không rõ "xa" | Icon tự vẽ: con đường phối cảnh xa dần, có chấm đánh dấu ở cuối |

**Kỹ thuật mới (mở rộng engine để xử lý các trường hợp khó bằng emoji đơn):**
1. **Icon ghép (icon + đạo cụ phụ):** `wordcards` giờ hỗ trợ `icon2` (badge nhỏ góc dưới,
   dùng cho tính từ cần nhấn thêm sắc thái như "đen láy"), `actioncards` hỗ trợ `prop`
   (badge nhỏ, dùng cho hành động cần thêm vật thể như "đá bóng", "ăn"). Cả 2 hiển thị
   dạng huy hiệu tròn nhỏ đè lên góc dưới-phải icon chính, viền vàng nổi bật.
2. **Icon tự vẽ (`CUSTOM_ICONS`):** dùng khi KHÔNG CÓ emoji chuẩn nào diễn tả đúng nghĩa
   (sông, xa) — chỉ áp dụng cho hình khối đơn giản (không phải nhân vật người, để tránh
   rủi ro "vẽ xấu" như lần thử nhân vật trước đây). Khai báo qua field `custom:"tên"`
   thay vì `icon:"emoji"`.

**Đã test trước khi giao (v14):**
- `node --check` cú pháp OK.
- Xác nhận bảng `EMOJI_SVG` đủ **69/69** emoji (thêm 🦒✨🦶😋), `CUSTOM_ICONS` có đủ
  `river`, `far`.
- Quét toàn bộ mọi trường văn bản + chạy 200 lần mỗi `gen` — 0 emoji nào bị thiếu SVG.
- Stress-test 500 lần × 10 bài `gen` (25.500 lượt) — 0 lỗi.
- Xác nhận logic badge (`icon2`/`prop`) đã chèn đúng vào cả `mountWordcards` và
  `mountActioncards`.

**🔧 NGUYÊN TẮC MỞ RỘNG cho bài sau — 3 loại icon, chọn đúng loại theo từ:**
1. **Danh từ/hành động có emoji chuẩn khớp nghĩa** → dùng thẳng `icon:"emoji"` (đa số
   trường hợp).
2. **Hành động/tính từ cần 2 yếu tố mới rõ nghĩa** (VD: "đá bóng" cần cả chân lẫn bóng,
   "đen láy" cần cả mắt lẫn sắc thái lấp lánh) → dùng `icon` + `icon2`(wordcards) hoặc
   `icon` + `prop`(actioncards) để ghép 2 emoji thành 1 cụm nghĩa rõ ràng, KHÔNG dùng
   1 emoji đơn lẻ chỉ thể hiện được một nửa nghĩa.
3. **Không có emoji nào phù hợp** (VD: "sông" khác "sóng biển", "xa" là khái niệm trừu
   tượng) → tự vẽ SVG đơn giản, đưa vào `CUSTOM_ICONS`, dùng qua field `custom:"tên"`.
   CHỈ tự vẽ hình khối/cảnh vật đơn giản — KHÔNG tự vẽ nhân vật người (rủi ro chất lượng
   cao, đã thử và bị chê ở đợt trước, chuyển sang Twemoji là quyết định đúng cho nhân
   vật).
- **Quy trình rà soát bắt buộc trước khi giao mỗi đợt có icon mới:** liệt kê TOÀN BỘ cặp
  từ-icon bằng code (không chỉ bài mới thêm), tự hỏi với từng cặp: "icon này có thực sự
  THỂ HIỆN ĐÚNG NGHĨA của từ, hay chỉ là một đồ vật LIÊN QUAN chung chung?" — đây là câu
  hỏi then chốt rút ra từ 2 đợt lỗi liên tiếp (bác sĩ, rồi 6 từ này).

---

**🆕 ĐỢT NÀY (v13) — sửa lỗi "đồ vật thay cho người" + quét triệt để mọi trường văn bản:**

**Lỗi bố mẹ phát hiện:** icon "bác sĩ" dùng 🩺 (ống nghe = ĐỒ VẬT), trong khi "bác sĩ" là
danh từ chỉ NGƯỜI — icon phải là hình người mặc áo blouse/cầm ống nghe, không phải chỉ
cái ống nghe trơ trọi. Đây là lỗi ngữ nghĩa thật (không phải lỗi chất lượng hiển thị
như đợt trước) — chọn sai loại icon cho loại từ.

**Đã sửa:**
1. Đổi icon "bác sĩ": 🩺 (ống nghe) → 👩‍⚕️ (người bác sĩ nữ, mặc áo blouse) — sửa ở cả
   thẻ từ vựng và câu ví dụ "Bố em là bác sĩ".
2. **Rà soát lại TOÀN BỘ 22 bài bằng code** (không chỉ chỗ bị chỉ ra) để tìm mọi cặp
   "từ chỉ người ↔ icon đồ vật không liên quan" khác — liệt kê hết ~25 cặp từ-icon
   trong toàn app, xác nhận "bác sĩ" là trường hợp DUY NHẤT bị lỗi này (cha, cô giáo,
   học sinh đã đúng là icon người từ trước).
3. **Phát hiện thêm lỗi phủ sót:** quét kỹ hơn thấy 2 emoji trang trí (🔑, 👇) trong
   đoạn văn bản "Ghi nhớ cách phân biệt" chưa được chuyển sang SVG (do khối `concept`/
   `example` trước đó in thẳng văn bản, không đi qua hàm `emo()`). Đã sửa: `emo()` giờ
   áp dụng cho CẢ văn bản tự do (concept/example), không chỉ icon/visual riêng lẻ.
   Bảng `EMOJI_SVG` giờ có đủ **65/65 emoji** dùng trong toàn app.

**Đã test trước khi giao (v13):**
- `node --check` cú pháp OK.
- Quét TOÀN BỘ mọi trường văn bản trong CONTENT (không chỉ icon/visual — cả text, html,
  intro, q, hint...) bằng hàm đệ quy `scan()`, kết hợp chạy 200 lần mỗi `gen` để bắt
  cả nội dung sinh động — xác nhận **65/65 emoji đều có SVG**, không sót emoji nào.
- Stress-test 500 lần × 10 bài `gen` (25.500 lượt) — 0 lỗi.
- Khớp key CURRICULUM↔CONTENT 22/22.

**Bài học rút ra (áp dụng cho các bài sau):** khi audit "icon có đúng nghĩa không", cần
phân biệt 2 loại lỗi riêng: (a) **lỗi hiển thị** — icon đúng nghĩa nhưng render xấu do
chưa qua SVG (đã sửa ở v12), và (b) **lỗi ngữ nghĩa** — chọn nhầm loại icon (đồ vật/hành
động thay vì người) cho một danh từ chỉ người. Cả hai loại đều cần rà bằng mắt từng cặp
từ-icon, không thể tự động phát hiện 100% bằng code (code chỉ giúp liệt kê đủ để rà,
không tự nhận biết "đây có phải là người bị gán nhầm icon đồ vật không").

---

**🆕 ĐỢT NÀY (v12) — sửa TRIỆT ĐỂ, không còn font-emoji nào trong app:**

**Phát hiện lỗi gốc:** đợt trước (v11) tôi chỉ áp dụng SVG Twemoji chất lượng cao cho
đúng 2 icon nằm trong scenecards (dạy học, khám bệnh), còn lại **toàn bộ ~50 icon khác
trong app vẫn là font-emoji thường** (phụ thuộc hệ điều hành hiển thị, có thể vỡ hình/
xấu tùy thiết bị — đúng như bố mẹ chụp màn hình cho thấy "học sinh" và "bác sĩ" hiển thị
xấu trong khi 2 icon dùng SVG lại đẹp). Đây là lỗi KHÔNG ĐỒNG NHẤT, không phải do chọn
sai icon.

**Đã sửa triệt để — chuyển 100% sang SVG Twemoji thật, không còn font-emoji:**
1. Quét toàn bộ code, trích xuất được **62 emoji khác nhau** đang dùng trong toàn app
   (wordcards, actioncards, compare, minh họa câu hỏi — kể cả trong các hàm `gen` sinh
   ngẫu nhiên).
2. Tải **62/62 file SVG gốc** từ Twemoji (CC-BY 4.0) về, nhúng thẳng vào file dưới dạng
   bảng tra cứu `EMOJI_SVG` (một `const` lớn ở đầu script).
3. Viết hàm `emo(str)` — quét chuỗi, thay mỗi emoji nhận diện được bằng SVG tương ứng
   (bọc trong `<span class="emo-ic">`), giữ nguyên nếu là emoji chưa có trong bảng (dự
   phòng an toàn, không vỡ app nếu sau này thêm nội dung mới).
4. CSS `.emo-ic{width:1em;height:1em}` — icon SVG tự co giãn theo `font-size` đã tinh
   chỉnh sẵn của từng khung chứa (thẻ từ vựng, thẻ hoạt động, minh họa câu hỏi, icon so
   sánh) — không cần chỉnh tay từng nơi.
5. Cập nhật 4 hàm render (`mountWordcards`, `mountActioncards`, `mountCompare`,
   `renderMC`/`renderFill`) gọi `emo()` thay vì in thẳng emoji ra HTML.

**Đã test trước khi giao (v12):**
- `node --check` cú pháp OK.
- **Độ phủ 100%:** chạy 200 lần mỗi hàm `gen` (bao trùm mọi khả năng random) để dò hết
  emoji có thể xuất hiện — xác nhận cả 62/62 đều có sẵn trong bảng `EMOJI_SVG`, không
  sót icon nào còn là font-emoji.
- Test hàm `emo()`: chuyển đổi đúng 1 emoji, đúng chuỗi nhiều emoji liền nhau (VD
  "🚲🚲🚲" dùng trong câu hỏi đếm bánh xe), và dự phòng an toàn cho emoji lạ không có
  trong bảng.
- Stress-test 500 lần × 10 bài có `gen` (25.500 lượt) — 0 lỗi, không ảnh hưởng hệ
  thống câu hỏi.
- Dựng bản render thử (`test-xem-truoc.html`, file phụ, không phải file app chính)
  cho riêng bài "Từ chỉ sự vật, hoạt động" để tự kiểm tra logic hiển thị trước khi giao.

**Kích thước file:** tăng từ ~120KB lên ~245KB (do nhúng 62 SVG, tổng ~120KB dữ liệu
ảnh) — vẫn rất nhẹ, không ảnh hưởng gì khi chạy offline trên iPad.

**🔧 NGUYÊN TẮC CHO BÀI SAU (áp dụng bắt buộc, không lặp lại lỗi cũ):** Từ đợt này,
**mọi icon mới thêm vào app ĐỀU PHẢI qua `emo()`** — không được viết thẳng ký tự emoji
vào HTML nữa. Quy trình thêm icon mới:
1. Tìm emoji phù hợp + tra codepoint (web_search "emoji unicode codepoint").
2. Tải SVG: `curl -sL -o ten.svg "https://raw.githubusercontent.com/jdecked/twemoji/main/assets/svg/{codepoint}.svg"`.
3. Thêm entry mới vào `EMOJI_SVG` (dán nguyên nội dung SVG).
4. Dùng bình thường trong `icon:"🎒"`, `visual:"🎒"` — hàm `emo()` sẽ tự động thay thế,
   KHÔNG cần sửa gì thêm ở nơi gọi.
5. Trước khi giao file, chạy lại đoạn kiểm tra "độ phủ" (stress-test gen + so khớp với
   `EMOJI_SVG`) để đảm bảo không sót icon nào.

---

**🆕 ĐỢT NÀY (v11) — rà soát TOÀN BỘ chương trình theo yêu cầu "áp dụng cho tất cả các mục", không chỉ vá riêng lẻ:**

**Bối cảnh:** Bố mẹ phản hồi ảnh "khám bệnh" chỉ có icon nhiệt kế đơn lẻ, không rõ là bác sĩ đang khám cho ai — và hỏi có nên mua ảnh trả phí (gửi kèm ảnh mẫu từ PNGtree) không. Đã tra giá thật: PNGtree ~$19-50/3 tháng, Freepik Premium ~$20/tháng ($14.50/tháng nếu trả năm). Bố mẹ sau đó yêu cầu **rà soát lại toàn bộ chương trình** (không chỉ sửa từng chỗ bị chỉ ra) và lập danh sách hình ảnh cần mua/tải.

**✅ Đã kiểm kê bằng code TOÀN BỘ 22 bài hiện có** (mọi wordcards/actioncards/compare/quiz-visual) để tìm mọi chỗ "icon đơn lẻ không rõ nghĩa hành động tương tác" — không chỉ chờ bố mẹ chỉ ra.

**Kết quả kiểm kê — chỉ có ĐÚNG 2 mục cần sửa** (trong tổng ~50 icon đang dùng):
- "dạy học" (đang dùng icon 📝 bút — không rõ ai dạy ai)
- "khám bệnh" (đang dùng icon 🌡️ nhiệt kế — bố mẹ đã chỉ ra)

Tất cả các mục còn lại (đồ vật, hành động 1 người: chạy/nhảy/bơi/quét nhà/viết bài..., so sánh nhóm gà-vịt...) đều đã đủ rõ nghĩa với 1 icon Twemoji đơn — **không cần mua thêm ảnh**.

**Quyết định (đã trao đổi và thống nhất):** Với chỉ 2 mục cần sửa, KHÔNG mua ảnh trả phí (không đáng chi phí/công sức đăng ký cho 2 ảnh) — dùng cách **ghép 2 nhân vật Twemoji miễn phí thành 1 "cảnh"** (đã thử nghiệm ở đợt trước, bố mẹ đồng ý). Đã triển khai:
- Thêm block/engine mới **`scenecards`** — thẻ cảnh ghép 2 nhân vật + 1 đạo cụ nối giữa (VD: bác sĩ + bệnh nhi + ống nghe; cô giáo + học sinh + quyển sách), bấm vào có animation `scenePulse` (rung nhẹ + xoay) để vẫn giữ đúng khái niệm "hoạt động = có chuyển động, bấm để xem".
- Áp dụng cho bài "Từ chỉ sự vật, chỉ hoạt động; Câu giới thiệu": "đi học" giữ nguyên actioncards (1 người, đã rõ), "dạy học" + "khám bệnh" chuyển sang scenecards (2 người).
- Toàn bộ SVG là Twemoji thật (đã tải về, nhúng thẳng vào file — vẫn offline 100%).

**Nếu muốn nâng cấp lên ảnh trả phí sau này:** chỉ nên cân nhắc nếu số lượng mục cần "cảnh 2 người" tăng lên nhiều (ví dụ khi làm tới Chủ điểm 3-4 Tiếng Việt có chủ đề "gia đình", "bạn bè chơi cùng nhau" — xem mục "Cần theo dõi" bên dưới). Với quy mô hiện tại (2 mục), cách ghép miễn phí là hợp lý nhất.

**⚠️ CẦN THEO DÕI cho các bài SẼ LÀM sau này** (nguyên tắc rút ra từ đợt rà soát, áp dụng khi xây bài mới):
- Chỉ những từ/khái niệm có **2+ người TƯƠNG TÁC** với nhau mới cần scenecards (hoặc cân nhắc mua ảnh nếu số lượng nhiều). Danh từ đơn, hành động 1 người luôn dùng Twemoji đơn (nhanh, đủ rõ, miễn phí).
- Các chủ đề SẮP TỚI có khả năng cần scenecards: TV Chủ điểm 3 "Niềm vui tuổi thơ" (bạn bè chơi cùng nhau), TV Chủ điểm 4+ (gia đình sum vầy — bố mẹ con), có thể vài bài toán có lời văn dạng "hai bạn cùng làm gì đó". Sẽ đánh giá cụ thể khi đọc trang sách thật của các bài này.

**Đã test trước khi giao (v11):**
- `node --check` cú pháp OK.
- Kiểm tra SCENES: cả 2 cảnh (khambenh, dayhoc) có SVG hợp lệ, đúng cấu trúc.
- Stress-test 300 lần × các bài có `gen` (15.300 lượt) — 0 lỗi, xác nhận thay đổi không ảnh hưởng hệ thống câu hỏi.
- Kiểm tra mọi block-type hợp lệ trên toàn bộ 22 bài.

**🔧 KỸ THUẬT MỚI — khuôn mẫu cho bài sau:**
```js
// Trong CONTENT, khai báo block:
{type:"scenecards", items:[{word:"...", sceneKey:"..."}]}
// Trong SCENES (đầu file, gần ALPHABET), khai báo cảnh:
sceneKey: { left: `<svg...nhân vật 1...>`, right: `<svg...nhân vật 2...>`,
            prop: `<svg...đạo cụ...>`, propStyle: 'left:56px; top:34px; transform:rotate(15deg);' }
```
Cách lấy SVG Twemoji thật: `curl -sL -o ten.svg "https://raw.githubusercontent.com/jdecked/twemoji/main/assets/svg/{codepoint}.svg"` (domain này nằm trong danh sách được phép truy cập mạng của môi trường làm việc). Tra codepoint qua Emojipedia hoặc web_search. Giấy phép Twemoji: CC-BY 4.0 — **đã ghi nguồn** ở cuối màn hình chọn môn ("Một số hình minh họa: Twemoji by Twitter, Inc — CC-BY 4.0").

---

**🆕 ĐỢT NÀY (v10) — nâng cấp SƯ PHẠM theo phản hồi sâu của bố mẹ:**

Bố mẹ chỉ ra vấn đề gốc rễ: bé **chưa hiểu khái niệm** "sự vật" (đứng yên) khác
"hoạt động" (có chuyển động), nên icon tĩnh dù đẹp đến đâu cũng không giúp bé phân
biệt được — cần: (1) hình sự vật cụ thể/rõ ràng hơn, (2) hoạt động phải có
**animation thật khi bấm vào** (đá bóng, chạy, nhảy, ăn...).

**Đã làm:**
1. **Thẻ "hoạt động" giờ TƯƠNG TÁC thật sự** — khối mới `actioncards`: bé bấm vào ô
   là icon **chuyển động ngay lập tức** (không phải chỉ đứng yên như trước). Đã lập
   trình 14 kiểu chuyển động CSS riêng biệt, mỗi kiểu mô phỏng đúng dáng vẻ hành động:
   `actWalk` (đi bộ, lắc người tiến/lùi), `actRun` (chạy, di chuyển nhanh + giãn),
   `actJump` (nhảy bật lên cao rồi hạ), `actKick` (đá — xoay + bay ra như sút bóng),
   `actEat` (ăn — co giãn như đang nhai), `actWrite` (viết — lắc nhẹ mô phỏng nét
   bút), `actSwim` (bơi), `actSing` (hát), `actSweep` (quét), `actCheck` (khám —
   xoay lắc như đang kiểm tra), v.v. Đã áp dụng cho các từ hoạt động cụ thể bố mẹ nêu
   ví dụ: **đá bóng, chạy, nhảy, ăn** (bài "Từ chỉ hoạt động; Câu nêu hoạt động").
2. **Thẻ "sự vật" được làm to, rõ hơn:** icon đặt trong khung tròn trắng nổi bật
   (84×84px, có đổ bóng nhẹ) thay vì icon nhỏ nằm trơ trên nền — nhìn "cụ thể" hơn,
   giống một hình minh họa thật sự thay vì icon bàn phím.
3. **Thêm câu giải thích khái niệm ngay đầu bài** "Từ chỉ sự vật, chỉ hoạt động; Câu
   giới thiệu": nêu rõ **sự vật = TÊN GỌI, đứng yên không đổi** ↔ **hoạt động = VIỆC
   ĐANG LÀM, luôn có CHUYỂN ĐỘNG** — dạy đúng khái niệm gốc trước khi vào ví dụ, thay
   vì chỉ liệt kê ví dụ và hi vọng bé tự suy ra quy luật.
4. Bài "Từ chỉ hoạt động; Câu nêu hoạt động" giờ có 6 thẻ hoạt động tương tác đa dạng
   và vui hơn: quét nhà🧹, chạy🏃, nhảy🤸, đá bóng⚽, ăn🍎, bơi🏊 — đúng các ví dụ bố mẹ
   đề xuất.

**Kỹ thuật (để dùng lại cho các bài sau):**
```js
{type:"actioncards", items:[{word:"chạy", icon:"🏃", anim:"actRun"}, ...]}
```
Engine tự gọi `mountActioncards()` khi vào bài Học; mỗi thẻ bấm vào gọi `playAction()`
— dùng `el.style.animation='none'` rồi ép reflow (`void el.offsetWidth`) trước khi gán
animation mới, để bấm nhiều lần liên tục vẫn chạy lại được từ đầu (không bị "đứng
hình" do trình duyệt không restart animation trùng tên). 14 animation có sẵn trong CSS
(xem danh sách `@keyframes act...`), có thể thêm animation mới nếu cần từ vựng khác.

**Đã test trước khi giao (v10):**
- `node --check` cú pháp OK.
- Kiểm tra toàn bộ block `actioncards`: đúng cấu trúc, mọi tên animation đều khớp với
  CSS đã định nghĩa (không có animation "ma" bị gọi nhưng không tồn tại).
- Stress-test 500 lần × 22 bài có `gen` = 25.500 lượt — 0 lỗi (xác nhận thay đổi
  không làm hỏng hệ thống sinh câu hỏi đã có).

**Vẫn còn có thể làm thêm nếu bố mẹ muốn:**
- Áp dụng `actioncards` cho các bài Toán có khái niệm "hành động" tương tự (ví dụ Bài
  "thêm/bớt" có thể minh họa "thêm vào" bằng animation vật rơi vào giỏ).
- Có thể làm một bài "mini game" phân loại: bé kéo/bấm phân loại một loạt từ vào 2 cột
  "Sự vật" (đứng yên) / "Hoạt động" (chuyển động) — luyện tập trực tiếp khái niệm vừa
  học, thay vì chỉ làm trắc nghiệm. Đây là hướng nâng cấp lớn hơn, cần thêm thời gian.
- Sự vật vẫn dùng emoji (dù đã to/rõ hơn) — nếu bố mẹ vẫn thấy chưa đủ "cụ thể", có
  thể nâng cấp tiếp lên SVG tự vẽ như đã trao đổi ở đợt trước.

---

**🆕 ĐỢT NÀY (v9) — rà soát và sửa TOÀN DIỆN, không chỉ vá theo ví dụ cụ thể:**

Bố mẹ nhắc đúng: các yêu cầu trước (đủ câu hỏi, animation sinh động, đúng hình ảnh)
là yêu cầu CHUNG cho toàn app, không phải chỉ sửa từng chỗ bị chỉ ra. Đợt này đã kiểm
kê lại **toàn bộ 22 bài bằng code** để tìm mọi chỗ còn thiếu, thay vì chờ bố mẹ tự
phát hiện từng lỗi.

**Phát hiện qua kiểm kê:** 12/22 bài (hơn một nửa!) vẫn "tụt hậu" — chưa có `gen`
(chỉ 2-3 câu cố định, y hệt khi bấm "Làm lại"), chưa có animation/hình ảnh minh họa
mới. Đã sửa TẤT CẢ:

1. **Lỗi biểu đồ cột (Bài 1) bố mẹ vừa chỉ ra:** 4 cột (58,51,49,50) cao gần bằng
   nhau, không phân biệt được — do công thức tính chiều cao so với 0 trong khi các số
   đều gần 50-60 nên chênh lệch bị "nén" lại. Đã sửa: tính chiều cao dựa trên khoảng
   min-max của CHÍNH bộ số đó (số bé nhất luôn 30px, số lớn nhất luôn 140px) → chênh
   lệch luôn rõ ràng dù các số gần nhau hay xa nhau.
2. **Thêm `gen` cho toàn bộ 12 bài còn thiếu** — giờ **22/22 bài (100%) đã có sinh câu
   hỏi ngẫu nhiên**, không còn bài nào chỉ có 2-3 câu cố định:
   - 4 bài Toán cũ: Phép nhân, Bảng nhân 2, Cộng không nhớ/có nhớ 1000.
   - 2 bài Tiếng Việt cũ: Phân biệt tr/ch, s/x — kèm thêm **thẻ từ vựng minh họa**
     (trâu🐃, chim🐦, sách📕, xe đạp🚲...) giống 4 bài Chủ điểm 1.
   - 6 bài Toán Chủ đề 2 (phạm vi 20): Cộng qua 10, Bảng cộng qua 10, Thêm/bớt, Trừ
     qua 10, Bảng trừ qua 10, Nhiều hơn/ít hơn — 2 bài toán có lời văn (Thêm/bớt,
     Nhiều hơn/ít hơn) được thêm animation `compare` (so sánh nhóm đồ vật bằng icon).
3. **Sửa thêm 1 lỗi cũ phát hiện khi rà soát:** câu hỏi "Tổng của 535 và 244" có đáp
   án **779 bị lặp 2 lần** trong 4 lựa chọn (lỗi có từ bản đầu, chưa ai phát hiện) —
   đã sửa thành 1 đáp án đúng + 3 đáp án nhiễu khác nhau.

**Đã test trước khi giao (v9):**
- `node --check` cú pháp OK.
- Kiểm kê 22/22 bài bằng code: xác nhận 100% có `gen`, 0 câu hỏi cố định bị lỗi (trùng
  đáp án, đáp án ngoài phạm vi).
- Stress-test 800 lần × 22 bài có `gen` = **40.800 lượt sinh câu hỏi — 0 lỗi**.
- Xác nhận công thức biểu đồ cột mới tạo chênh lệch chiều cao rõ ràng (30-140px) với
  cả bộ số gần nhau lẫn xa nhau.

**Vẫn còn thiếu (thành thật với bố mẹ):**
- Toán Chủ đề 2 (Bài 7-14) và 4 bài Toán cũ (nhân, cộng 1000): số liệu ví dụ trong
  phần Học vẫn CHƯA đối chiếu với trang sách thật (chỉ Chủ đề 1 đã đối chiếu). Nội
  dung đúng về mặt kỹ năng toán học nhưng câu chữ/ví dụ cụ thể có thể không khớp 100%
  với cách sách trình bày.
- 2 bài Tiếng Việt cũ (tr/ch, s/x): tương tự, danh sách từ chưa đối chiếu đầy đủ với
  sách (sách còn ghép thêm c/k, v/d, g/gh, hỏi/ngã mà app chưa có).
- Chưa có animation mới (numline/compare/barcompare) cho các khái niệm "làm tròn 10"
  (Bài 7,8,11,12) — các bài này vẫn dùng khối `concept` chữ, animation cho "làm tròn
  10" khó trực quan hóa hơn (không đơn giản như so sánh 2 nhóm đồ vật).

---

**🆕 ĐỢT NÀY (v8) — sửa lỗi hình ảnh minh họa phát hiện qua ảnh chụp thực tế:**

1. **Lỗi sai emoji:** 🪑 là icon "cái GHẾ" (chair) chứ không phải "cái bàn" — bản v7 gán
   nhầm `["cái bàn","🪑"]` trong ngân hàng câu hỏi. Đã sửa thành `["cái ghế","🪑"]`
   (đổi TỪ cho khớp đúng ICON, vì Unicode không có icon "cái bàn" rõ ràng).
2. **Lỗi trùng icon giữa danh từ và động từ:** bài "Từ chỉ sự vật, chỉ hoạt động; Câu
   giới thiệu" dùng CÙNG icon 👩‍🏫 cho cả "cô giáo" (danh từ) và "dạy học" (động từ),
   cùng icon 🩺 cho cả "bác sĩ" và "khám bệnh" → khiến 2 nhóm từ trông giống hệt nhau,
   mất tác dụng phân biệt. Đã đổi: "dạy học" → 📝, "khám bệnh" → 🌡️ (giữ nguyên chữ,
   chỉ đổi icon cho khác biệt). Đã rà soát lại TOÀN BỘ 4 bài Tiếng Việt bằng code, xác
   nhận không còn icon nào bị dùng chung giữa 2 nhóm sự vật/hoạt động.
3. **Icon minh họa được phóng to:** thẻ từ vựng 32px→46px, icon trên câu hỏi 36px→60px,
   icon so sánh nhóm đồ vật (Bài 4) 22px→28px.

**Về câu hỏi "có hạn chế làm hình ảnh không / có cần thiết kế rồi đẩy qua đây không?"
(bố mẹ hỏi trực tiếp — trả lời để đợt sau nếu cần thì làm tiếp):**
- Không cần công cụ thiết kế riêng — mọi hình ảnh trong app (kể cả animation) đều được
  viết trực tiếp bằng code (HTML/CSS/SVG) ngay trong file, không qua bước "vẽ rồi
  đẩy qua". Emoji hiện tại là lựa chọn NHANH và AN TOÀN vì: (a) app phải chạy OFFLINE
  hoàn toàn trên iPad (đã chốt từ đầu dự án — xem GHI-CHU-BAN-GIAO.md), nên không thể
  tải ảnh thật từ mạng vào mỗi lần mở bài; (b) ảnh chụp/scan từ SGK dính bản quyền NXB
  Giáo dục (đã ghi rõ trong nguyên tắc dự án), không thể sao chép trực tiếp vào app.
- **Nếu muốn hình ảnh giống sách hơn emoji:** hướng khả thi là tự VẼ minh họa bằng SVG
  (đồ họa vector) ngay trong code — giống cách app đã "vẽ" các animation tia số/so
  sánh/biểu đồ cột hiện tại (đều là SVG/CSS tự vẽ, không phải ảnh chụp). Có thể làm
  cho một số từ vựng quan trọng nếu bố mẹ muốn nâng cấp thêm — sẽ mất công hơn emoji
  (mỗi hình cần vẽ tay từng chi tiết) nhưng cho ra hình ảnh chính xác, đúng phong cách
  minh họa như trong sách, và vẫn 100% offline, không vi phạm bản quyền.

**Đã test trước khi giao (v8):**
- `node --check` cú pháp OK.
- Stress-test 800 lần × 10 bài có `gen` = 27.200 lượt — 0 lỗi.
- Kiểm tra riêng bằng code: chạy 500 lần mỗi generator của bài "Từ chỉ sự vật/hoạt
  động", xác nhận **0 icon trùng lặp** giữa 2 nhóm từ loại.

---

**🆕 ĐỢT NÀY (v7) — phản hồi trực tiếp từ bố mẹ kèm ảnh chụp màn hình:**

1. Tăng số câu mỗi lượt Luyện tập/Kiểm tra từ 8 → **10 câu**.

2. **Tia số hóa tương tác thật sự:** trước đây chỉ auto-play 1 lần rồi có nút "Xem lại"
   phát lại ĐÚNG số cũ. Giờ bé có thể **bấm vào bất kỳ số nào** trên dải 0-11, app tự
   động làm nổi bật số đã chọn (xanh dương) → số liền trước (cam) → số liền sau (xanh
   lá), có xử lý ca đặc biệt khi bé chọn số 0 (không có số liền trước).

3. **Animation cột dọc (đã chốt trước đây) nay áp dụng cho Bài 5** (Ôn tập cộng trừ
   không nhớ phạm vi 100) — trước đó bài này chỉ có chữ mô tả suông. Để làm được, đã
   **tổng quát hóa toàn bộ engine `vcalc`**:
   - Hỗ trợ cả **PHÉP TRỪ** (trước đây chỉ có phép cộng) kèm cơ chế "mượn 1" đầy đủ —
     đã test 2000 lần ngẫu nhiên, đúng 100%, kể cả trường hợp mượn nhiều cột. **Sẵn
     sàng dùng ngay cho Bài 22/23 "phép trừ có nhớ" ở đợt sau mà không cần viết lại.**
   - Hỗ trợ **cả số 2 chữ số lẫn 3 chữ số** (trước đây cứng 3 cột Trăm/Chục/Đơn vị,
     giờ tự ẩn cột Trăm khi số chỉ có 2 chữ số).
   - Đã regression-test: animation cộng cũ (knt_cong1000, knt_cong1000n) vẫn chạy
     đúng sau khi tổng quát hóa.

4. **Tiếng Việt có hình ảnh minh họa (emoji) đi kèm từ vựng:** thêm khối `wordcards` —
   mỗi từ (học sinh, cặp sách, khám bệnh, quét nhà, đen láy...) hiển thị kèm icon emoji
   lớn, hiệu ứng xuất hiện lần lượt. Áp dụng cho cả 4 bài Tiếng Việt Chủ điểm 1, kể cả
   bài "Bảng chữ cái" (a-táo🍎, b-bóng⚽, c-cá🐟...). Nhiều câu hỏi trắc nghiệm cũng có
   icon minh họa (`visual`) phía trên đáp án.

5. **Bổ sung thêm bài tập thật từ sách** cho Bài 5 (câu "phép tính cùng kết quả",
   "kết quả bé hơn 50" — lấy đúng số liệu từ trang sách, đã kiểm tra kỹ để chỉ có MỘT
   đáp án đúng duy nhất, tránh mập mờ).

6. Thêm `gen` cho cả 4 bài Tiếng Việt Chủ điểm 1 (trước đây chỉ Toán có `gen`). Tiếng
   Việt khó random tự do như số học nên cách làm là chuẩn bị **ngân hàng từ/câu mẫu
   lớn hơn** (8-10 mục kèm icon), rồi `gen` chọn ngẫu nhiên + trộn đáp án nhiễu bằng
   `distinctOptions` — đảm bảo luôn đúng ngữ pháp, không tự bịa câu. Riêng bài **Bảng
   chữ cái** random hoàn toàn tự do vì dựa trên bảng dữ liệu chuẩn 29 chữ cái có thật
   (hằng số `ALPHABET`), không phải tự sinh câu tiếng Việt.

**Đã test trước khi giao (v7):**
- `node --check` cú pháp OK.
- Stress-test 800 lần × 10 bài có `gen` = 27.200 lượt sinh câu hỏi — **0 lỗi**.
- Test riêng engine `vBuild` (cộng/trừ, 2-3 chữ số, có/không mượn) với số liệu thật +
  2000 lần ngẫu nhiên — khớp 100% với phép tính tay.
- Kiểm tra cấu trúc: 22/22 bài khớp CURRICULUM↔CONTENT, mọi block-type hợp lệ, mọi
  VCALC_PROBLEMS có `op` hợp lệ.

**🔧 KỸ THUẬT MỚI — khuôn mẫu để áp dụng cho các bài sau:**
- `{type:"wordcards", items:[{word,icon}]}` — thẻ từ vựng minh họa (`mountWordcards`).
- `vcalc` giờ TỰ ĐỘNG nhận diện 2 hay 3 chữ số, cộng hay trừ dựa trên field `op:"+"`
  hoặc `op:"-"` trong từng entry của `VCALC_PROBLEMS[key]` — chỉ cần khai báo đúng
  `op`, KHÔNG cần sửa engine.
- `numline` giờ luôn hiển thị dải cố định 0-11, cho bấm chọn tự do (`center` chỉ còn
  là số gợi ý mặc định lúc mới vào bài).
- Tiếng Việt: mẫu "ngân hàng + random pick + `distinctOptions`" ở 4 bài Chủ điểm 1 là
  khuôn mẫu chuẩn để áp dụng cho Chủ điểm 2 trở đi.
- Hệ `gen` + `buildQuizList` (từ đợt v6): mỗi bài khai báo `gen:[...]` gồm hàm JS sinh
  câu hỏi ngẫu nhiên có kiểm chứng đáp án; engine gộp câu SGK thật + câu sinh ra đủ 10
  câu/lượt, xáo trộn, làm mới mỗi khi "Làm lại". Dùng `randInt(a,b)` để random số,
  `distinctOptions(correct,n,fn)` để sinh đáp án nhiễu không trùng nhau. LUÔN
  stress-test bằng Node (gọi hàm gen 500-1000+ lần) trước khi giao file.

**✅ SGK ĐÃ ĐỌC THẬT:** Toan-2-KNTT-tap-1.pdf (142tr) — đã đọc kỹ Bài 1-6 (Chủ đề 1
trọn vẹn). TiengViet-2-KNTT-tap-1.pdf (145tr) — đã đọc kỹ Bài 2, 4, 6 (Chủ điểm 1 trọn
vẹn) + xem mục lục đầy đủ Tuần 1-11. Chưa upload Toán/Tiếng Việt tập 2 (chưa cần cho
Giai đoạn 1).

**Đã hoàn thành (22 bài có nội dung, Học · Luyện tập · Kiểm tra):**
- *Toán Chủ đề 1 (6/6 bài — ĐÃ ĐỐI CHIẾU SÁCH THẬT + animation đầy đủ + `gen`):*
  Bài 1-6. Bài 5 có animation cột dọc cộng VÀ trừ.
- *Toán Chủ đề 2 (6 bài — CHƯA đối chiếu sách thật, CHƯA có animation/wordcards mới):*
  Bài 7,8,9,11,12,13 (đã có `gen` từ đợt v6, nhưng số liệu ví dụ là tự soạn chưa đối
  chiếu trang sách).
- *Toán Chủ đề 8, 12 (4 bài cũ — chưa đối chiếu, chưa có `gen`):* Bài 37,39,59,60.
- *Tiếng Việt Chủ điểm 1 (4/4 bài — ĐÃ ĐỐI CHIẾU SÁCH THẬT + wordcards + `gen`):* Bảng
  chữ cái, Từ chỉ sự vật/hoạt động+Câu giới thiệu, Từ chỉ hoạt động+Câu nêu hoạt động,
  Từ chỉ đặc điểm+Câu nêu đặc điểm.
- *Tiếng Việt Chủ điểm 2 (2 bài — nhãn đúng nhưng nội dung CHƯA đối chiếu chi tiết,
  CHƯA có wordcards/`gen`):* tr/ch (sách còn phân biệt thêm c/k, v/d — chưa bổ sung),
  s/x (sách còn thêm g/gh, hỏi/ngã — chưa bổ sung).

**Chưa làm (ưu tiên theo thứ tự đề xuất):**
1. Đồng bộ trải nghiệm (wordcards, animation, `gen` mới) cho Toán Chủ đề 2 (Bài 7-14)
   và 2 bài Tiếng Việt cũ (tr/ch, s/x) — các bài này đang "tụt hậu" so với 10 bài mới.
2. Đọc trang sách thật để đối chiếu số liệu: Toán Bài 7-14 (trang 26-56), Tiếng Việt
   Bài 10,12,14,16 (Chủ điểm 2, trang ~43-70).
3. Toán Chủ đề 3, 4 (Bài 15-24: Ki-lô-gam, Lít, cộng trừ CÓ NHỚ phạm vi 100) — engine
   `vcalc` đã hỗ trợ sẵn "mượn 1", chỉ cần khai báo đúng `VCALC_PROBLEMS` với `op:"-"`
   và số liệu có mượn thật.
4. Toán Chủ đề 5, 6 (Bài 25-32: hình phẳng, ngày giờ) — cần animation mới (hình học,
   đồng hồ quay).
5. Tiếng Việt Chủ điểm 3 (Tuần 10-13), Chủ điểm 4 trở đi — chưa đọc trang, Chủ điểm 4+
   còn chưa xem mục lục thật.

---

## LỊCH SỬ CÁC ĐỢT

### Đợt "Sửa lỗi hình ảnh minh họa" (be-hoc-gioi-v8.html)
- Bố mẹ gửi 2 ảnh chụp phát hiện lỗi thật: (1) icon 🪑 gán nhầm cho "cái bàn" (thực ra
  là icon cái ghế), (2) icon 👩‍🏫/🩺 dùng trùng cho cả danh từ (cô giáo/bác sĩ) lẫn động
  từ (dạy học/khám bệnh) khiến 2 nhóm từ trông giống nhau. Bố mẹ cũng hỏi về khả năng
  làm hình ảnh của trợ lý và có cần công cụ thiết kế riêng không.
- Đã sửa: đổi "cái bàn"→"cái ghế" cho khớp icon 🪑; đổi icon "dạy học"→📝, "khám
  bệnh"→🌡️ để không trùng với danh từ cùng nghĩa; rà soát bằng code toàn bộ 4 bài TV
  xác nhận hết trùng icon; phóng to toàn bộ icon minh họa (thẻ từ vựng, icon câu hỏi,
  icon so sánh).
- Trả lời câu hỏi của bố mẹ: không cần thiết kế ngoài — mọi hình ảnh (kể cả animation)
  đều viết bằng code SVG/CSS trực tiếp trong file. Emoji được chọn vì app phải chạy
  offline hoàn toàn + tránh vi phạm bản quyền ảnh SGK. Có thể nâng cấp lên SVG tự vẽ
  cho từng từ vựng nếu muốn giống sách hơn (mất công hơn nhưng khả thi).
- Đáp án: stress-test 800 lần/generator (27.200 lượt) — 0 lỗi. Kiểm tra riêng 500
  lần bài "Từ chỉ sự vật/hoạt động" xác nhận 0 icon trùng lặp giữa 2 nhóm.
- Còn dang dở: Toán Chủ đề 2 + 2 bài TV cũ (tr/ch, s/x) vẫn chưa đồng bộ nâng cấp (xem
  mục "Chưa làm" ở trên). Nếu làm SVG tự vẽ, cần làm cho toàn bộ từ vựng đang dùng
  emoji, không chỉ 4 bài Chủ điểm 1.
- Đề xuất đợt sau: hỏi bố mẹ có muốn nâng cấp lên SVG tự vẽ hay giữ emoji (đã sửa
  đúng + phóng to); nếu giữ emoji, ưu tiên đồng bộ hóa các bài còn "tụt hậu".

### (Khởi tạo) — Dựng khung + hạ tầng
- Dựng app, khung chương theo SGK thật, animation cộng, 6 bài mẫu.

### Đợt "Giai đoạn 1 — nháp lần 1" (be-hoc-gioi-v4.html)
- Số hóa 15 bài dựa trên kiến thức chuẩn chương trình vì 4 file SGK trong Project lúc
  đó là file rỗng/lỗi (~280 byte, không đọc được). Toàn bộ đánh dấu "bản nháp".

### Đợt "Giai đoạn 1 — đối chiếu SGK thật, Chặng 1" (be-hoc-gioi-v5.html)
- Bố mẹ tải lại đúng 2 file PDF thật (142tr + 145tr). Đọc trực tiếp bằng ảnh: Toán
  Bài 1-6 (trọn Chủ đề 1) + Tiếng Việt Bài 2,4,6 (trọn Chủ điểm 1) + xem mục lục đầy
  đủ 2 cuốn.
- Viết lại 5 bài Toán Chủ đề 1 bằng số liệu thật, thêm Bài 6.
- **Sửa lỗi cấu trúc quan trọng:** bản nháp trước gán sai — "Câu giới thiệu (Ai là
  gì?)" và "Từ chỉ đặc điểm" bị đặt nhầm Chủ điểm 2/3, thực ra cả hai đều thuộc Chủ
  điểm 1 (Tuần 1-4). Đã dựng lại đúng 4 bài Chủ điểm 1, sửa nhãn Chủ điểm 2/3. Thêm
  bài mới "Bảng chữ cái" (trước đây bỏ sót).
- Đáp án: tự kiểm bằng code (Python đối chiếu số liệu chụp từ sách + Node kiểm tra
  cấu trúc/khớp key) — khớp 100%.

### Đợt "Nâng cấp animation + sinh câu hỏi ngẫu nhiên" (be-hoc-gioi-v6.html)
- Bố mẹ phản hồi: bài học Toán cần animation/sinh động hơn; chỉ có 3 câu luyện
  tập/kiểm tra là quá ít, bấm "Làm lại" ra y hệt câu cũ → nhàm chán.
- Xây dựng hệ thống `gen` (sinh câu hỏi ngẫu nhiên có kiểm chứng đáp án bằng code) +
  `buildQuizList` gộp câu SGK thật + câu sinh ngẫu nhiên thành 8 câu/lượt, xáo trộn.
- Thêm 3 loại animation mới: `numline`, `compare`, `barcompare`. Áp dụng cho Bài 1,2,4.
  Thêm hiệu ứng pop-in/fade cho mọi khối kiến thức ở tất cả các bài.
- Áp dụng `gen` đầy đủ cho 6 bài Toán Chủ đề 1.
- Đáp án: stress-test 1000 lần/generator (24.000 lượt) — phát hiện & sửa 3 lỗi trùng
  đáp án nhiễu bằng hàm `distinctOptions` — chạy lại 0 lỗi.

### Đợt "Tương tác hóa + hình ảnh minh họa + animation trừ" (be-hoc-gioi-v7.html)
- Bố mẹ gửi 3 ảnh chụp màn hình thực tế + phản hồi: (1) tăng lên 10 câu, (2) tia số
  cần cho bé BẤM CHỌN thay vì chỉ xem, phép cộng/trừ Bài 5 cần animation cột dọc như
  đã chốt, Tiếng Việt cần hình ảnh minh họa kể cả trong bài tập, (3) bám sát SGK, đủ
  hoặc nhiều bài tập hơn sách.
- Đã làm: tia số tương tác (bấm chọn số bất kỳ trong dải 0-11); tổng quát hóa engine
  `vcalc` để hỗ trợ CẢ phép trừ (có mượn) LẪN số 2 chữ số, áp dụng animation cột dọc
  cho Bài 5; thêm khối `wordcards` (thẻ từ vựng + emoji) cho cả 4 bài Tiếng Việt Chủ
  điểm 1 + icon minh họa trong nhiều câu hỏi; thêm `gen` cho Tiếng Việt (ngân hàng +
  random pick, riêng Bảng chữ cái random hoàn toàn tự do từ bảng 29 chữ cái chuẩn);
  bổ sung thêm câu hỏi thật từ trang sách cho Bài 5; QUIZ_TARGET 8→10.
- Đáp án: stress-test 800 lần × 10 bài `gen` (27.200 lượt) — 0 lỗi. Test riêng engine
  `vBuild` cộng/trừ với 2000 lần ngẫu nhiên — khớp 100%. Regression-test animation
  cộng cũ vẫn đúng sau khi tổng quát hóa.
- Còn dang dở: Toán Chủ đề 2 và 2 bài TV cũ (tr/ch, s/x) chưa được đồng bộ hóa
  wordcards/animation/gen mới — đang "tụt hậu" so với 10 bài vừa nâng cấp.
- Đề xuất đợt sau: ưu tiên đồng bộ hóa Toán Chủ đề 2 + 2 bài TV cũ trước (để trải
  nghiệm nhất quán toàn app), sau đó đọc tiếp SGK thật cho Chặng 2 (Toán Bài 7-14,
  Tiếng Việt Bài 10,12,14,16), rồi làm Chủ đề 3-4 Toán (có sẵn animation trừ-có-mượn
  để dùng ngay).

---

## CÁCH GHI NHẬT KÝ (cho trợ lý mỗi đợt)

Mỗi đợt, thêm một mục vào "LỊCH SỬ CÁC ĐỢT" theo mẫu:
```
### Đợt [số] — [tên] (ngày ...)
- Đã số hóa: [danh sách bài + key]
- Quyết định/lưu ý: [gì đặc biệt]
- Đáp án: đã tự kiểm bằng code (khớp/không)
- Còn dang dở: [nếu có]
- Đề xuất đợt sau: [gì]
```
Rồi cập nhật lại phần "TRẠNG THÁI HIỆN TẠI" ở đầu file.

---

## GHI NHỚ QUAN TRỌNG
- Các đoạn chat KHÔNG tự đọc được nhau. File này + file app là cách DUY NHẤT giữ
  thông tin qua các đoạn.
- Mỗi đợt xong: tải app mới + nhật ký mới, THAY vào Project (xóa bản cũ).
- Khi cần đối chiếu tiếp Chặng 2-4, gửi kèm lại 2 file SGK tập 1 (đã đúng, không cần
  tải lại) — trợ lý sẽ tự đọc đúng trang cần thiết dựa vào mục lục đã ghi trong nhật
  ký này.
- Khi thêm bài mới, LUÔN áp dụng đủ bộ 3: `gen` (câu hỏi ngẫu nhiên, xem hướng dẫn kỹ
  thuật ở trên) + animation/wordcards phù hợp + bám sát số liệu SGK thật — để tránh
  lặp lại phản hồi "quá đơn giản, nhàm chán, thiếu hình ảnh".
- Nếu bài có phép trừ cần animation, dùng luôn `vcalc` với `op:"-"` trong
  `VCALC_PROBLEMS` — KHÔNG cần viết engine mới, kể cả phép trừ có nhớ (mượn 1).
