package com.example.gn_holidays.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Invoice_Sheet")
public class Invoice{
    private String date;
    @Id
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
