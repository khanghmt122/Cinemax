package entity;

public class NhanVien_entity {
	private String maNV;
	private String hoNV;
	private String tenNV;
	private int tuoi;
	private boolean phai;
	private double luong;
	private PhongBan_entity phong;

	public NhanVien_entity() {
	}

	public NhanVien_entity(String maNV) {
		this.maNV = maNV;
	}

	public NhanVien_entity(String maNV, String hoNV, String tenNV, int tuoi, boolean phai, double luong,
			PhongBan_entity phong) {
		this.maNV = maNV;
		this.hoNV = hoNV;
		this.tenNV = tenNV;
		this.tuoi = tuoi;
		this.phai = phai;
		this.luong = luong;
		this.phong = phong;
	}

	public String getMaNV() {
		return maNV;
	}

	public void setMaNV(String maNV) {
		this.maNV = maNV;
	}

	public String getHoNV() {
		return hoNV;
	}

	public void setHoNV(String hoNV) {
		this.hoNV = hoNV;
	}

	public String getTenNV() {
		return tenNV;
	}

	public void setTenNV(String tenNV) {
		this.tenNV = tenNV;
	}

	public int getTuoi() {
		return tuoi;
	}

	public void setTuoi(int tuoi) {
		this.tuoi = tuoi;
	}

	public boolean getPhai() {
		return phai;
	}

	public void setPhai(boolean phai) {
		this.phai = phai;
	}

	public double getLuong() {
		return luong;
	}

	public void setLuong(double luong) {
		this.luong = luong;
	}

	public PhongBan_entity getPhong() {
		return phong;
	}

	public void setPhong(PhongBan_entity phong) {
		this.phong = phong;
	}
}
