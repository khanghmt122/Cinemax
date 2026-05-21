package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import Connect_DB.Connect_DB;
import entity.NhanVien_entity;
import entity.PhongBan_entity;

public class NhanVien_dao {

	public NhanVien_dao() {
	}

	public ArrayList<NhanVien_entity> getalltbNhanVien_entity() {
		ArrayList<NhanVien_entity> dsnv = new ArrayList<>();
		try {
			Connect_DB.getInstance();
			Connection con = Connect_DB.getConnection();
			String sql = "Select * from NhanVien";
			Statement statement = con.createStatement();
			ResultSet rs = statement.executeQuery(sql);
			while (rs.next()) {
				dsnv.add(mapRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return dsnv;
	}

	public ArrayList<NhanVien_entity> getNhanVienTheoMaNV(String id) {
		ArrayList<NhanVien_entity> dsnv = new ArrayList<>();
		PreparedStatement statement = null;
		try {
			Connect_DB.getInstance();
			Connection con = Connect_DB.getConnection();
			String sql = "Select * from NhanVien where maNV = ?";
			statement = con.prepareStatement(sql);
			statement.setString(1, id);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				dsnv.add(mapRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			closeStatement(statement);
		}
		return dsnv;
	}

	public ArrayList<NhanVien_entity> getNhanVienTheoPhongBan(String idpb) {
		ArrayList<NhanVien_entity> dsnv = new ArrayList<>();
		PreparedStatement statement = null;
		try {
			Connect_DB.getInstance();
			Connection con = Connect_DB.getConnection();
			String sql = "Select * from NhanVien where maPhong = ?";
			statement = con.prepareStatement(sql);
			statement.setString(1, idpb);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				dsnv.add(mapRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			closeStatement(statement);
		}
		return dsnv;
	}

	public boolean create(NhanVien_entity nv) {
		PreparedStatement stmt = null;
		int n = 0;
		try {
			Connect_DB.getInstance();
			Connection con = Connect_DB.getConnection();
			String sql = "insert into NhanVien values(?, ?, ?, ?, ?, ?, ?)";
			stmt = con.prepareStatement(sql);
			stmt.setString(1, nv.getMaNV());
			stmt.setString(2, nv.getHoNV());
			stmt.setString(3, nv.getTenNV());
			stmt.setInt(4, nv.getTuoi());
			stmt.setBoolean(5, nv.getPhai());
			stmt.setString(6, nv.getPhong().getMaPhongBan());
			stmt.setDouble(7, nv.getLuong());
			n = stmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			closeStatement(stmt);
		}
		return n > 0;
	}

	public boolean update(NhanVien_entity nv) {
		PreparedStatement stmt = null;
		int n = 0;
		try {
			Connect_DB.getInstance();
			Connection con = Connect_DB.getConnection();
			String sql = "update NhanVien set ho=?, ten=?, tuoi=?, phai=?, tienLuong=?, maPhong=? where maNV=?";
			stmt = con.prepareStatement(sql);
			stmt.setString(1, nv.getHoNV());
			stmt.setString(2, nv.getTenNV());
			stmt.setInt(3, nv.getTuoi());
			stmt.setBoolean(4, nv.getPhai());
			stmt.setDouble(5, nv.getLuong());
			stmt.setString(6, nv.getPhong().getMaPhongBan());
			stmt.setString(7, nv.getMaNV());
			n = stmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			closeStatement(stmt);
		}
		return n > 0;
	}

	public boolean delete(String maNV) {
		PreparedStatement stmt = null;
		int n = 0;
		try {
			Connect_DB.getInstance();
			Connection con = Connect_DB.getConnection();
			String sql = "delete from NhanVien where maNV=?";
			stmt = con.prepareStatement(sql);
			stmt.setString(1, maNV);
			n = stmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			closeStatement(stmt);
		}
		return n > 0;
	}

	private NhanVien_entity mapRow(ResultSet rs) throws SQLException {
		String maNV = rs.getString("maNV");
		String hoNV = rs.getString("ho");
		String tenNV = rs.getString("ten");
		int tuoi = rs.getInt("tuoi");
		boolean phai = rs.getBoolean("phai");
		double luong = rs.getDouble("tienLuong");
		PhongBan_entity pBan = new PhongBan_entity(rs.getString("maPhong"));
		return new NhanVien_entity(maNV, hoNV, tenNV, tuoi, phai, luong, pBan);
	}

	private void closeStatement(PreparedStatement stmt) {
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
