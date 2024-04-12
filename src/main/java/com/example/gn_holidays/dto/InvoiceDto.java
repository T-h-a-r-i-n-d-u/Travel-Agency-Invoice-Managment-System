package com.example.gn_holidays.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class InvoiceDto {
    private String date;
    private String so;
    private String customer;
    private String supplie;
    private float amount;
    private String ticketNO;
    private String salesID;
    private String tcID;
    private int invoiceNO;
    private boolean status;
    private String rn;
    private String pv;
    private float cost;
    private int xo;
    private float paidSupplie;
    private String remark;
}
