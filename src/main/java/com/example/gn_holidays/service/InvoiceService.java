package com.example.gn_holidays.service;

import com.example.gn_holidays.dto.InvoiceDto;
import com.example.gn_holidays.entity.Invoice;
import com.example.gn_holidays.repo.InvoiceRepo;
import com.example.gn_holidays.util.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class InvoiceService {

    @Autowired
    private InvoiceRepo invoiceRepo;

    @Autowired
    private ModelMapper modelMapper;

    public String saveInvoice(InvoiceDto invoiceDto) {
        if (invoiceRepo.existsById(invoiceDto.getSo())) {
            return VarList.RSP_DUPLICATED;
        } else {
            invoiceRepo.save(modelMapper.map(invoiceDto, Invoice.class));
            return VarList.RSP_SUCCESS;
        }
    }

    public String updateInvoice(InvoiceDto invoiceDto) {
        if (invoiceRepo.existsById(invoiceDto.getSo())) {
            invoiceRepo.save(modelMapper.map(invoiceDto, Invoice.class));
            return VarList.RSP_SUCCESS;
        } else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }


    public List<InvoiceDto> getAllInvoice() {
        List<Invoice> invoiceList = invoiceRepo.findAllByOrderByInvoiceNOAsc();
        return modelMapper.map(invoiceList, new TypeToken<ArrayList<InvoiceDto>>() {
        }.getType());
    }


    public InvoiceDto getinvoiceById(String so) {
        if (invoiceRepo.existsById(so)) {
            Invoice invoice = invoiceRepo.findById(so).orElse(null);
            return modelMapper.map(invoice, InvoiceDto.class);
        } else {
            return null;
        }
    }

    public String deleteInvoice(String invoiceId) {
        if (invoiceRepo.existsById(invoiceId)) {
            invoiceRepo.deleteById(invoiceId);
            return VarList.RSP_SUCCESS;
        } else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }

}