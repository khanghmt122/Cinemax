package UI;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

import Connect_DB.Connect_DB;
import dao.NhanVien_dao;
import dao.PhongBan_dao;
import entity.NhanVien_entity;
import entity.PhongBan_entity;

public class NhanVien_GUI extends JFrame implements ActionListener, MouseListener {

	private static final long serialVersionUID = 1L;

	private JTable tableNhanVien;
	private DefaultTableModel modelNhanVien;

	private JTextField txtMaNV;
	private JTextField txtHo;
	private JTextField txtTen;
	private JTextField txtTuoi;
	private JTextField txtTienLuong;
	private JTextField txtTim;
	private JButton bttTim;
	private JButton bttThem;
	private JButton bttXoa;
	private JButton bttLuu;
	private JButton bttXoaTrang;

	private JCheckBox chkNu;
	private JComboBox<String> cboPhongBan;

	private NhanVien_dao nv_dao;
	private PhongBan_dao pb_dao;

	public NhanVien_GUI() {
		// Khởi tạo kết nối đến CSDL
		try {
			Connect_DB.getInstance().connect();
			System.out.println("Connected!!!");
		} catch (SQLException e) {
			e.printStackTrace();
			JOptionPane.showMessageDialog(this,
					"Không kết nối được SQL Server.\nChạy sql/SQLQuery_1.sql và kiểm tra user/password trong Connect_DB.java",
					"Lỗi kết nối", JOptionPane.ERROR_MESSAGE);
		}

		nv_dao = new NhanVien_dao();
		pb_dao = new PhongBan_dao();

		setTitle("Quản lý nhân viên - JDBC");
		setSize(800, 500);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setLocationRelativeTo(null);

		JLabel lblTieuDe = new JLabel("THÔNG TIN NHÂN VIÊN");
		lblTieuDe.setFont(new Font("Arial", Font.BOLD, 20));
		lblTieuDe.setForeground(Color.BLUE);

		Box b = Box.createVerticalBox();
		Box b11, b1, b2, b3, b4;
		JLabel lblMaNV, lblHo, lblTuoi, lblPhai, lblTienLuong, lblTim;

		b.add(b11 = Box.createHorizontalBox());
		b11.add(lblTieuDe);
		b.add(b1 = Box.createHorizontalBox());
		b.add(Box.createVerticalStrut(10));
		b1.add(lblMaNV = new JLabel("Mã nhân viên:   "));
		b1.add(txtMaNV = new JTextField());

		b.add(b2 = Box.createHorizontalBox());
		b.add(Box.createVerticalStrut(10));
		b2.add(lblHo = new JLabel("Họ "));
		b2.add(txtHo = new JTextField());
		b2.add(new JLabel("Tên nhân viên: "));
		b2.add(txtTen = new JTextField());

		b.add(b3 = Box.createHorizontalBox());
		b.add(Box.createVerticalStrut(10));
		b3.add(lblTuoi = new JLabel("Tuổi: "));
		b3.add(txtTuoi = new JTextField());
		b3.add(lblPhai = new JLabel("Phái: "));
		b3.add(chkNu = new JCheckBox("Nữ"));

		b.add(b4 = Box.createHorizontalBox());
		b.add(Box.createVerticalStrut(10));
		b4.add(lblTienLuong = new JLabel("Tiền lương: "));
		b4.add(txtTienLuong = new JTextField());
		b4.add(new JLabel("Phòng Ban: "));

		// Tạo và đổ dữ liệu vào comboBox
		b4.add(cboPhongBan = new JComboBox<>());
		cboPhongBan.setEditable(true);
		ArrayList<PhongBan_entity> listPB = pb_dao.getalltbPhongBan_entity();
		for (PhongBan_entity p : listPB) {
			cboPhongBan.addItem(p.getMaPhongBan());
		}

		lblHo.setPreferredSize(lblMaNV.getPreferredSize());
		lblPhai.setPreferredSize(lblMaNV.getPreferredSize());
		lblTienLuong.setPreferredSize(lblMaNV.getPreferredSize());
		lblTuoi.setPreferredSize(lblMaNV.getPreferredSize());
		cboPhongBan.setPreferredSize(lblMaNV.getPreferredSize());
		b.add(Box.createVerticalStrut(10));
		add(b, BorderLayout.NORTH);

		String[] colHeader = { "Mã NV", "Họ NV", "Tên NV", "Tuổi", "Phái", "Lương", "Phòng ban" };
		modelNhanVien = new DefaultTableModel(colHeader, 0) {
			@Override
			public boolean isCellEditable(int row, int column) {
				return false;
			}
		};
		tableNhanVien = new JTable(modelNhanVien);
		add(new JScrollPane(tableNhanVien), BorderLayout.CENTER);

		// Đọc dữ liệu từ database SQL vào JTable
		DocDuLieuDatabaseVaoTable();

		JPanel p = new JPanel();
		add(p, BorderLayout.SOUTH);
		JPanel pnlLeft, pnlRight;
		p.add(pnlLeft = new JPanel());
		p.add(pnlRight = new JPanel());

		pnlLeft.add(lblTim = new JLabel("Nhập mã số cần tìm: "));
		pnlLeft.add(txtTim = new JTextField(10));
		pnlLeft.add(bttTim = new JButton("Tìm"));

		pnlRight.add(bttThem = new JButton("Thêm"));
		pnlRight.add(bttXoaTrang = new JButton("Xóa trắng"));
		pnlRight.add(bttXoa = new JButton("Xóa"));
		pnlRight.add(bttLuu = new JButton("Lọc theo Ph Ban"));

		bttTim.addActionListener(this);
		bttThem.addActionListener(this);
		bttXoa.addActionListener(this);
		bttXoaTrang.addActionListener(this);
		bttLuu.addActionListener(this);
		tableNhanVien.addMouseListener(this);
	}

	public void DocDuLieuDatabaseVaoTable() {
		modelNhanVien.setRowCount(0);
		List<NhanVien_entity> list = nv_dao.getalltbNhanVien_entity();
		for (NhanVien_entity nv : list) {
			themDongVaoBang(nv);
		}
	}

	public void DocDuLieuListVaoTable(List<NhanVien_entity> list) {
		modelNhanVien.setRowCount(0);
		for (NhanVien_entity nv : list) {
			themDongVaoBang(nv);
		}
	}

	private void themDongVaoBang(NhanVien_entity nv) {
		modelNhanVien.addRow(new Object[] {
				nv.getMaNV(),
				nv.getHoNV(),
				nv.getTenNV(),
				nv.getTuoi(),
				nv.getPhai() ? "Nữ" : "Nam",
				nv.getLuong(),
				nv.getPhong().getMaPhongBan()
		});
	}

	private void xoaTrangForm() {
		txtMaNV.setText("");
		txtHo.setText("");
		txtTen.setText("");
		txtTuoi.setText("");
		txtTienLuong.setText("");
		chkNu.setSelected(false);
		if (cboPhongBan.getItemCount() > 0) {
			cboPhongBan.setSelectedIndex(0);
		}
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		Object o = e.getSource();
		if (o.equals(bttThem)) {
			try {
				String ma = txtMaNV.getText().trim();
				if (ma.isEmpty()) {
					JOptionPane.showMessageDialog(this, "Mã nhân viên không được để trống!");
					return;
				}
				String ho = txtHo.getText().trim();
				String ten = txtTen.getText().trim();
				int tuoi = Integer.parseInt(txtTuoi.getText().trim());
				boolean phai = chkNu.isSelected();
				double luong = Double.parseDouble(txtTienLuong.getText().trim());
				String phongban = cboPhongBan.getSelectedItem().toString();

				PhongBan_entity phban = new PhongBan_entity(phongban);
				NhanVien_entity nv = new NhanVien_entity(ma, ho, ten, tuoi, phai, luong, phban);
				if (nv_dao.create(nv)) {
					themDongVaoBang(nv);
				} else {
					JOptionPane.showMessageDialog(this, "Thêm thất bại!");
				}
			} catch (Exception ex) {
				JOptionPane.showMessageDialog(this, "Trùng mã hoặc dữ liệu không hợp lệ!");
			}
		} else if (o.equals(bttTim)) {
			String ma = txtTim.getText().trim();
			if (ma.isEmpty()) {
				JOptionPane.showMessageDialog(this, "Nhập mã cần tìm!");
				return;
			}
			List<NhanVien_entity> list = nv_dao.getNhanVienTheoMaNV(ma);
			DocDuLieuListVaoTable(list);
		} else if (o.equals(bttLuu)) {
			String phongban = cboPhongBan.getSelectedItem().toString();
			List<NhanVien_entity> list = nv_dao.getNhanVienTheoPhongBan(phongban);
			DocDuLieuListVaoTable(list);
		} else if (o.equals(bttXoaTrang)) {
			xoaTrangForm();
		} else if (o.equals(bttXoa)) {
			String ma = txtMaNV.getText().trim();
			if (ma.isEmpty()) {
				JOptionPane.showMessageDialog(this, "Chọn dòng hoặc nhập mã NV!");
				return;
			}
			if (nv_dao.delete(ma)) {
				int row = tableNhanVien.getSelectedRow();
				if (row >= 0) {
					modelNhanVien.removeRow(row);
				} else {
					DocDuLieuDatabaseVaoTable();
				}
				xoaTrangForm();
			} else {
				JOptionPane.showMessageDialog(this, "Xóa thất bại!");
			}
		}
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		int row = tableNhanVien.getSelectedRow();
		if (row >= 0) {
			txtMaNV.setText(modelNhanVien.getValueAt(row, 0).toString());
			txtHo.setText(modelNhanVien.getValueAt(row, 1).toString());
			txtTen.setText(modelNhanVien.getValueAt(row, 2).toString());
			txtTuoi.setText(modelNhanVien.getValueAt(row, 3).toString());
			chkNu.setSelected("Nữ".equals(modelNhanVien.getValueAt(row, 4).toString()));
			txtTienLuong.setText(modelNhanVien.getValueAt(row, 5).toString());
			cboPhongBan.setSelectedItem(modelNhanVien.getValueAt(row, 6).toString());
		}
	}

	@Override
	public void mousePressed(MouseEvent e) {
	}

	@Override
	public void mouseReleased(MouseEvent e) {
	}

	@Override
	public void mouseEntered(MouseEvent e) {
	}

	@Override
	public void mouseExited(MouseEvent e) {
	}

	public static void main(String[] args) {
		new NhanVien_GUI().setVisible(true);
	}
}
