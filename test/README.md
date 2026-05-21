# Quản lý nhân viên — JDBC (Java Swing)

Project ôn thi JDBC: kết nối SQL Server, DAO, GUI quản lý nhân viên.

## Chạy nhanh

1. Chạy `sql/SQLQuery_1.sql` trên SQL Server (database `QLNVIEN`).
2. Sửa user/password trong `src/Connect_DB/Connect_DB.java` nếu cần.
3. Eclipse: import project → Run `UI.NhanVien_GUI`.

## Cấu trúc

- `src/Connect_DB` — kết nối DB
- `src/entity` — NhanVien, PhongBan
- `src/dao` — truy vấn SQL
- `src/UI` — giao diện Swing
- `ON_TAP.md` — ghi chú ôn thi
