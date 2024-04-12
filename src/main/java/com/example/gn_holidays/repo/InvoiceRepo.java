package com.example.gn_holidays.repo;

import com.example.gn_holidays.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepo extends JpaRepository<Invoice,String> {
    List<Invoice> findAllByOrderByInvoiceNOAsc();

}
