package Connect_DB;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Connect_DB {
	private static Connection con = null;
	private static Connect_DB instance = new Connect_DB();

	public static Connect_DB getInstance() {
		return instance;
	}

	public static Connection getConnection() {
		return con;
	}

	public void connect() throws SQLException {
		String url = "jdbc:sqlserver://localhost:1433;databaseName=QLNVIEN;encrypt=true;trustServerCertificate=true";
		String user = "sa";
		String password = "sapassword";
		con = DriverManager.getConnection(url, user, password);
	}

	public void disconnect() {
		if (con != null) {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
