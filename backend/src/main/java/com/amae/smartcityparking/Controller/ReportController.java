package com.amae.smartcityparking.Controller;

import com.amae.smartcityparking.Service.ReportService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

//    @GetMapping("/occupancy")
//    public ResponseEntity<byte[]> getOccupancyReport() throws JRException {
//        byte[] report = reportService.generateOccupancyReport();
//        return ResponseEntity.ok()
//                .header("Content-Type", "application/pdf")
//                .header("Content-Disposition", "inline; filename=occupancy_report.pdf")
//                .body(report);
//    }

    @GetMapping("/occupancy")
    public ResponseEntity<byte[]> getOccupancyReport() throws JRException, SQLException {
        byte[] report = reportService.generateReport("occupancy_report.jrxml");
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "inline; filename=occupancy_report.pdf")
                .body(report);
    }
    @GetMapping("/occupancy/{ownerId}")
    public ResponseEntity<byte[]> getLotFullReport(@PathVariable Integer ownerId) throws JRException {

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("ParkingLotId", ownerId);
        byte[] report = reportService.generateReport("occupancy_owner.jrxml", parameters);
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "inline; filename=occupancy_full_report.pdf")
                .body(report);
    }


    @GetMapping("/revenue")
    public ResponseEntity<byte[]> getRevenueReport() throws JRException {
        byte[] report = reportService.generateReport("revenue.jrxml");
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "inline; filename=revenue_report.pdf")
                .body(report);
    }
}