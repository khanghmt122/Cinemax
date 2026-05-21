package dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import Connect_DB.Connect_DB;
import entity.PhongBan_entity;

public class PhongBan_dao {
       public ArrayList<PhongBan_entity> getalltbPhongBan_entity(){
    	   ArrayList<PhongBan_entity> dsphongban =new ArrayList<PhongBan_entity>();
    	   try {
    		   Connect_DB.getInstance();
    		   Connection con = Connect_DB.getConnection();
    		   
    		   String sql = "Select * from PhongBan";
    		   
    		   Statement statement = con.createStatement();
    		   
    		   ResultSet rs = statement.executeQuery(sql);
    		   
    		   while(rs.next()) {
    			   String maPB = rs.getString("maPhong");
    			   String tenPB = rs.getString(2);
    			   PhongBan_entity p = new PhongBan_entity(maPB,tenPB);
    			   dsphongban.add(p);
    		   }
    		   
    		   
    	   } catch(SQLException e) {
    		   e.printStackTrace();
    	   }
    	   return dsphongban;
       }
       
}
