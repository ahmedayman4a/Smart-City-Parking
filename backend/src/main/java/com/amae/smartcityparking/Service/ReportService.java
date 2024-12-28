package com.amae.smartcityparking.Service;

import net.sf.jasperreports.engine.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {
    private final JdbcTemplate jdbcTemplate;
//    private final String REPORTS_PATH = "src/main/resources/reports/";
    private final String reports_path;

    public ReportService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.reports_path = this.getClass().getClassLoader().getResource("reports/").getPath();
    }

    public byte[] generateReport(String reportTemplate, Map<String, Object> parameters) throws JRException {
        Connection conn = null;
        try {
            conn = jdbcTemplate.getDataSource().getConnection();
            JasperReport jasperReport = JasperCompileManager.compileReport(reports_path + reportTemplate);
            JasperPrint print = JasperFillManager.fillReport(jasperReport, parameters, conn);
            return JasperExportManager.exportReportToPdf(print);
        } catch (SQLException e) {
            throw new RuntimeException("Failed to generate report", e);
        } finally {
            try {
                if (conn != null) conn.close();
            } catch (SQLException e) {
                // Log error
            }
        }
    }
    public byte[] generateReport(String reportTemplate) throws JRException {
        return generateReport(reportTemplate, new HashMap<>());
    }
}
