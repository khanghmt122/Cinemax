(function () {
  try {
    var raw = sessionStorage.getItem('user') || localStorage.getItem('user');
    var user = raw ? JSON.parse(raw) : null;
    if (!user || user.role !== 'admin') {
      window.location.href = '../customer/login.html?redirect=' + encodeURIComponent(window.location.pathname + window.location.search);
    }
  } catch (e) {
    window.location.href = '../customer/login.html';
  }
})();

