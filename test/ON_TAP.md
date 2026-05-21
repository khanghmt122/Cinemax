# Ôn thi JDBC — Quản lý nhân viên (bản hoàn chỉnh)

## Cấu trúc project `test`

```
test/
├── lib/sqljdbc42.jar          ← driver SQL Server
├── sql/SQLQuery_1.sql         ← tạo DB + bảng + dữ liệu mẫu
└── src/
    ├── Connect_DB/Connect_DB.java
    ├── entity/NhanVien_entity.java, PhongBan_entity.java
    ├── dao/NhanVien_dao.java, PhongBan_dao.java
    └── UI/NhanVien_GUI.java   ← chạy main ở đây
```

## Trước khi chạy (5 phút)

1. Mở **SQL Server Management Studio** → chạy toàn bộ file `sql/SQLQuery_1.sql`.
2. Sửa `Connect_DB.java` nếu khác máy bạn:
   - `user` / `password` (mặc định `sa` / `sapassword`)
   - `localhost:1433`
3. Eclipse: **Project → Properties → Java Build Path → Libraries** → kiểm tra `sqljdbc42.jar`.
4. Run: `NhanVien_GUI` → `Run As → Java Application`.

## HD_JDBC_1 — Nhớ thuộc lòng

| Bước | File | Ý chính |
|------|------|---------|
| 1 | `Connect_DB` | Singleton: `getInstance()`, `connect()`, `getConnection()` |
| 2 | Entity | `NhanVien_entity`, `PhongBan_entity` — field + constructor + getter/setter |
| 3 | `PhongBan_dao.getalltbPhongBan_entity()` | `Select * from PhongBan` → `ArrayList` |
| 4 | `NhanVien_dao.getalltbNhanVien_entity()` | `Select * from NhanVien`, `rs.getInt`, `getString`, `getBoolean`, `getDouble` |
| 5 | GUI ComboBox | `for (PhongBan_entity p : listPB) cboPhongBan.addItem(p.getMaPhongBan())` |
| 6 | `DocDuLieuDatabaseVaoTable()` | `nv_dao.getalltb...` → `modelNhanVien.addRow(...)` |
| 7 | Hiển thị phái | `nv.getPhai() ? "Nữ" : "Nam"` |

## HD_JDBC_2 — CRUD + tìm + lọc

| Nút / chức năng | DAO | SQL gợi nhớ |
|-----------------|-----|-------------|
| **Thêm** | `create(nv)` | `insert into NhanVien values(?,?,?,?,?,?,?)` + `PreparedStatement` |
| **Tìm** | `getNhanVienTheoMaNV(id)` | `... where maNV = ?` + `setString(1,id)` |
| **Lọc PB** | `getNhanVienTheoPhongBan(idpb)` | `... where maPhong = ?` + `setString(1,idpb)` |
| **Xóa** | `delete(maNV)` | `delete from NhanVien where maNV=?` |
| **Click bảng** | `mouseClicked` | Lấy `getSelectedRow()` → đổ vào `txt...`, `chkNu`, `cboPhongBan` |

**Lỗi hay gặp khi thi:**

- `executeQuery(sql)` với PreparedStatement → phải gọi `executeQuery()` **không** truyền lại `sql`.
- So sánh chuỗi: dùng `"Nữ".equals(...)` không dùng `==`.
- Đóng `PreparedStatement` trong `finally`.
- `create` trùng khóa → `JOptionPane.showMessageDialog(this, "Trùng")`.

## Mẫu code ngắn — Connect_DB

```java
public void connect() throws SQLException {
    String url = "jdbc:sqlserver://localhost:1433;databaseName=QLNVIEN;encrypt=true;trustServerCertificate=true";
    con = DriverManager.getConnection(url, user, password);
}
```

## Mẫu code ngắn — Đọc 1 dòng ResultSet

```java
while (rs.next()) {
    String maNV = rs.getString("maNV");
    String ho = rs.getString("ho");
    PhongBan_entity pb = new PhongBan_entity(rs.getString("maPhong"));
    NhanVien_entity nv = new NhanVien_entity(maNV, ho, ten, tuoi, phai, luong, pb);
    dsnv.add(nv);
}
```

## Mẫu code ngắn — Thêm (PreparedStatement)

```java
stmt = con.prepareStatement("insert into NhanVien values(?,?,?,?,?,?,?)");
stmt.setString(1, nv.getMaNV());
stmt.setString(2, nv.getHoNV());
// ... set các tham số còn lại
n = stmt.executeUpdate();
return n > 0;
```

## Thứ tự làm bài thi (gợi ý)

1. SQL: `PhongBan`, `NhanVien`, INSERT mẫu  
2. `Connect_DB` → test in "Connected"  
3. Entity → DAO PhongBan → DAO NhanVien `getAll`  
4. GUI khung + ComboBox + `DocDuLieuDatabaseVaoTable`  
5. `create`, tìm, lọc, xóa, `mouseClicked`  

Chúc bạn thi tốt mai nhé.
