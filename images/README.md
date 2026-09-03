# Thư mục ảnh minh hoạ

Thư mục này chứa ảnh AI (do bố mẹ tạo bằng Gemini theo file
`DANH-SACH-PROMPT-ANH-GEMINI.md`) để thay dần cho icon Twemoji hiện tại.

## Cách thêm ảnh mới

1. Đặt file ảnh vào đây, tên file tuỳ ý (khuyến nghị dùng đúng mã trong dấu
   `[...]` ở file danh sách prompt, ví dụ `dayhoc.png`, `khambenh.png`,
   `bacsi.png`...).
2. Mở `js/icons-data.js`, tìm bảng `IMAGE_ASSETS`, thêm 1 dòng:
   - Với **wordcards/actioncards** (thẻ từ vựng, thẻ hoạt động 1 người):
     khoá là **đúng chữ tiếng Việt** trong trường `word` của mục đó trong
     `js/curriculum-data.js`. Ví dụ:
     ```js
     "bác sĩ": "images/bacsi.png",
     ```
   - Với **scenecards** (thẻ cảnh ghép 2 người — hiện chỉ có "dạy học" và
     "khám bệnh"): khoá là **sceneKey** (không có dấu ngoặc kép), tra trong
     `js/icons-data.js` phần `const SCENES = {...}` hoặc trong
     `js/curriculum-data.js` chỗ khai báo `{type:"scenecards", items:[...]}`.
     Ví dụ:
     ```js
     dayhoc: "images/dayhoc.png",
     khambenh: "images/khambenh.png",
     ```
3. Lưu file, không cần sửa gì thêm — engine tự nhận ảnh mới và hiển thị
   thay cho icon cũ ngay lập tức.

## Không cần làm gì nếu chưa có ảnh

Mọi mục CHƯA có trong `IMAGE_ASSETS` sẽ tự động hiển thị bằng icon
Twemoji/tự vẽ như hiện tại — không có gì bị vỡ hay thiếu khi chưa đủ ảnh.

## Định dạng khuyến nghị

- PNG hoặc WebP, nền trong suốt nếu có (để khớp khung tròn của wordcards/
  actioncards).
- Kích thước gốc không cần quá lớn — ảnh sẽ hiển thị trong khung ~84px
  (wordcards/actioncards) hoặc ~150×92px (scenecards). Khuyến nghị nén/resize
  ảnh trước khi đưa vào đây để giữ dung lượng trang web nhẹ (mỗi ảnh nên dưới
  150-200KB).
