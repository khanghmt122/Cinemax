# CinemaMax - Phiên bản HTML/CSS/JSON

Phiên bản thuần **HTML, CSS và JSON**, cấu trúc gọn tương tự project `src`.

## Cấu trúc

```
Cinemax/
├── customer/          # Trang khách (gom chung)
│   ├── index.html     # Trang chủ
│   ├── login.html     # Đăng nhập / Đăng ký
│   ├── movies.html    # Danh sách phim
│   ├── movie-detail.html
│   ├── booking.html
│   ├── seat-selection.html
│   ├── payment.html
│   └── theaters.html
├── admin/             # Trang quản trị
│   ├── index.html
│   ├── movies.html
│   ├── schedules.html
│   ├── transactions.html
│   ├── theaters.html
│   └── statistics.html
├── css/style.css
├── js/app.js
├── js/data.json
├── index.html         # Redirect → customer/index.html
├── package.json       # Script chạy (giống src)
└── server/           # Backend (tùy chọn)
```

## Cách chạy

### Cách 1: Static (nhanh, giống `npm run dev` của src)
```bash
cd Cinemax
npm run dev
```
Mở http://localhost:8080 → tự redirect sang customer.

### Cách 2: Có Backend (API, đăng nhập)
```bash
cd Cinemax
npm start
```
Mở http://localhost:3000 (trang khách), http://localhost:3000/admin/ (admin).

### Cách 3: Python
```bash
cd Cinemax
python -m http.server 8080
```

## URL

- **Trang khách:** `/` hoặc `/customer/index.html`
- **Đăng nhập:** `/customer/login.html`
- **Admin:** `/admin/`

## Deploy để vẫn lưu MongoDB (Vercel + Backend riêng)

Vercel chỉ host **static** (HTML/CSS/JS). Muốn **đăng ký/đăng nhập lưu MongoDB** thì bạn phải deploy backend Node (Express) chạy ở nơi khác (vd. Render/Railway/Fly) và để frontend gọi sang đó.

### Bước 1: Deploy backend lên Render

- Vào [Render](https://render.com) → **New** → **Web Service**
- Connect GitHub repo
- **Root Directory**: `Cinemax/server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `MONGO_URI`: connection string MongoDB Atlas
- Deploy xong bạn sẽ có URL dạng `https://<service-name>.onrender.com`

### Bước 2: Trỏ frontend sang backend

Trong `js/app.js` đã có `window.API_BASE`:
- Localhost: `API_BASE = ''` (gọi cùng domain)
- Domain `vercel.app`: mặc định `API_BASE = 'https://cinemax-jj8i.onrender.com'`

Nếu URL backend của bạn khác, hãy sửa trong `js/app.js` dòng:
- `window.API_BASE = 'https://cinemax-jj8i.onrender.com';`
thành URL thật của backend (Render/Railway/Fly) của bạn.

### Bước 3: Deploy frontend lên Vercel

Deploy folder `Cinemax/` lên Vercel như bình thường. Sau đó mở site Vercel và thử **Đăng ký** → dữ liệu sẽ được lưu vào MongoDB Atlas thông qua backend.
