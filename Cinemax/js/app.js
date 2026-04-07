/* CinemaMax - Vanilla JS */
// Khi deploy frontend lên Vercel, cần gọi API từ backend deploy riêng (vd. Render/Railway/Fly)
(function () {
  var h = (typeof window !== 'undefined' && window.location && window.location.hostname) ? window.location.hostname : '';
  // Cho phép override thủ công: đặt window.API_BASE trước khi load file này (hoặc trong DevTools)
  if (typeof window !== 'undefined' && window.API_BASE !== undefined) return;
  if (h === 'localhost' || h === '127.0.0.1') window.API_BASE = '';
  else if (h && h.indexOf('vercel.app') !== -1) window.API_BASE = 'https://cinemax-jj8i.onrender.com';
  else window.API_BASE = '';
})();

var App = (function () {
  var data = null;
  var CUSTOMER = '/customer';

  function getBase() {
    var p = window.location.pathname;
    return (p.indexOf('/admin') !== -1 || p.indexOf('/customer') !== -1) ? '..' : '.';
  }

  function fetchData() {
    var base = getBase();
    var apiBase = window.API_BASE || '';
    return fetch(apiBase + '/api/data').then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .catch(function () { return fetch(base + '/js/data.json').then(function (r) { return r.json(); }); })
      .then(function (d) { data = d; return data; });
  }

  function formatPrice(n) { return Number(n).toLocaleString('vi-VN') + 'đ'; }
  function getQueryParam(name) { return new URLSearchParams(window.location.search).get(name) || ''; }

  function generateSeatMap(room, occupiedSeats) {
    occupiedSeats = occupiedSeats || [];
    var rows = 'ABCDEFGHIJ'.slice(0, room.rows).split('');
    return rows.map(function (row, rowIndex) {
      var rowSeats = [];
      for (var i = 1; i <= room.seatsPerRow; i++) {
        var seatId = row + i, type = 'standard', price = 80000;
        if (rowIndex >= room.rows - 2) { type = 'vip'; price = 120000; }
        if (rowIndex === room.rows - 1 && i >= 5 && i <= 8) { type = 'couple'; price = 150000; }
        rowSeats.push({ row: row, number: i, type: type, status: occupiedSeats.indexOf(seatId) !== -1 ? 'occupied' : 'available', price: price });
      }
      return rowSeats;
    });
  }

  function renderHeader(active) {
    var nav = document.getElementById('customer-header-nav');
    if (!nav) return;
    var user;
    try {
      user = sessionStorage.getItem('user') || localStorage.getItem('user');
      user = user ? JSON.parse(user) : null;
    } catch (e) {
      user = null;
    }
    var links = [
      { path: CUSTOMER + '/index.html', label: 'Trang chủ', key: 'home' },
      { path: CUSTOMER + '/movies.html', label: 'Phim', key: 'movies' },
      { path: CUSTOMER + '/theaters.html', label: 'Rạp chiếu', key: 'theaters' }
    ];
    nav.innerHTML = links.map(function (l) {
      var cls = (active === l.key || (l.key === 'home' && !active)) ? ' class="active"' : '';
      return '<a href="' + l.path + '"' + cls + '>' + l.label + '</a>';
    }).join('');
    // Cập nhật khu vực tài khoản ở header nếu có
    var headerEl = nav.parentNode && nav.parentNode.parentNode;
    if (headerEl) {
      var actions = headerEl.querySelector('.header-actions');
      if (actions) {
        if (user) {
          var name = user.name || user.email || 'Tài khoản';
          actions.innerHTML =
            '<div class="search-wrap"><input type="text" placeholder="Tìm phim..." aria-label="Tìm phim"></div>' +
            '<span class="btn btn-ghost btn-icon" aria-label="Tài khoản">👤 ' + name + '</span>' +
            '<button type="button" class="btn btn-ghost" id="btn-logout">Đăng xuất</button>';
          var logoutBtn = document.getElementById('btn-logout');
          if (logoutBtn) {
            logoutBtn.onclick = function () {
              try {
                sessionStorage.removeItem('user');
                localStorage.removeItem('user');
              } catch (e) {}
              window.location.href = CUSTOMER + '/login.html';
            };
          }
        } else {
          var loginBtn = actions.querySelector('a.btn[href*="login"], a.btn[href="/login.html"]');
          if (loginBtn) loginBtn.setAttribute('href', CUSTOMER + '/login.html');
        }
      }
    }
  }

  function renderFooter() {
    var el = document.getElementById('footer-text');
    if (el) el.textContent = '© 2026 CinemaMax. All rights reserved.';
  }

  function renderMovieCard(movie) {
    var statusText = movie.status === 'now-showing' ? 'Đang Chiếu' : 'Sắp Chiếu';
    var statusClass = movie.status === 'now-showing' ? 'badge-red' : 'badge-outline';
    var genres = (movie.genre.slice(0, 2) || []).map(function (g) { return '<span>' + g + '</span>'; }).join('');
    return '<div class="movie-card">' +
      '<a href="' + CUSTOMER + '/movie-detail.html?id=' + movie.id + '">' +
        '<div class="movie-card-poster">' +
          '<img src="' + movie.poster + '" alt="' + movie.titleVi + '">' +
          '<div class="rating-badge">★ ' + movie.rating + '</div>' +
          '<span class="badge status-badge ' + statusClass + '">' + statusText + '</span>' +
        '</div>' +
        '<div class="movie-card-info">' +
          '<h3>' + movie.titleVi + '</h3>' +
          '<div class="movie-card-genres">' + genres + '</div>' +
          '<div class="movie-card-meta"><span>🕐 ' + movie.duration + ' phút</span><span>📅 ' + movie.ageRating + '</span></div>' +
          '<a href="' + CUSTOMER + '/booking.html?movieId=' + movie.id + '" class="btn btn-primary btn-block" onclick="event.stopPropagation()">Đặt vé</a>' +
        '</div>' +
      '</a></div>';
  }

  function renderHeroSlide(movie) {
    var statusText = movie.status === 'now-showing' ? 'Đang Chiếu' : 'Sắp Chiếu';
    var genres = (movie.genre || []).map(function (g) { return '<span>' + g + '</span>'; }).join('');
    return '<div class="hero-slide" style="background-image:url(' + movie.poster + ')">' +
      '<div class="hero-content"><div class="container"><div class="hero-inner">' +
        '<div class="hero-badges"><span class="badge badge-red">' + statusText + '</span>' +
        '<span class="hero-meta">★ ' + movie.rating + '/10</span><span class="hero-meta">🕐 ' + movie.duration + ' phút</span></div>' +
        '<h1>' + movie.titleVi + '</h1><p>' + movie.descriptionVi + '</p>' +
        '<div class="hero-genres">' + genres + '</div>' +
        '<div class="hero-actions">' +
          '<a href="' + CUSTOMER + '/booking.html?movieId=' + movie.id + '" class="btn btn-primary btn-lg">Đặt vé ngay</a>' +
          '<a href="' + CUSTOMER + '/movie-detail.html?id=' + movie.id + '" class="btn btn-ghost btn-lg">▶ Xem trailer</a>' +
        '</div></div></div></div></div>';
  }

  return {
    get data() { return data; },
    fetchData: fetchData,
    formatPrice: formatPrice,
    getQueryParam: getQueryParam,
    generateSeatMap: generateSeatMap,
    renderHeader: renderHeader,
    renderFooter: renderFooter,
    renderMovieCard: renderMovieCard,
    renderHeroSlide: renderHeroSlide
  };
})();
