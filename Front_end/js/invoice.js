const jwtToken = localStorage.getItem('jwtToken');
let updatedInvoiceNumber;

window.onload = function() {
    autoFilldate()
    getAllInvoice()
}

function getAllInvoice(){

    $.ajax({
        method:"GET",
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
        },
        url:"http://localhost:8080/api/v1/invoice/getAllInvoice",
        async:true,
        success:function (data){
            let lastInvoiceNo;
            if(data.code==="00"){
                $('#invoiceTable').empty();
                for(let invoice of data.content){

                    let date = invoice.date
                    let so = invoice.so
                    let customer = invoice.customer
                    let supplie = invoice.supplie
                    let amount = invoice.amount
                    let cost = invoice.cost
                    let ticketNO = invoice.ticketNO
                    let salesID = invoice.salesID
                    let tc_ID = invoice.tcID
                    let invoice_no = invoice.invoiceNO
                    let status = invoice.status
                    let rn = invoice.rn
                    let pv = invoice.pv
                    let xo =invoice.xo
                    let paid_supplie = invoice.paidSupplie
                    let remark = invoice.remark
                    lastInvoiceNo =invoice.invoiceNO

                    var row=`<tr><td>${date}</td><td>${so}</td><td>${invoice_no}</td><td>${customer}</td><td>${supplie}</td><td>${amount}</td><td>${rn}</td><td>${pv}</td><td>${ticketNO}</td><td>${salesID}</td><td>${tc_ID}</td><td>${status}</td><td>${cost}</td><td>${xo}</td><td>${paid_supplie}</td><td>${remark}</td><tr>`;
                    $('#invoiceTable').append(row);
                }
            }
            updatedInvoiceNumber = parseInt(lastInvoiceNo) + 1;
            autoFillInvoice(updatedInvoiceNumber);
        },
        error:function (jqXHR, textStatus, errorThrown) {

            var errorMessage = "An error occurred: ";
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage += jqXHR.responseJSON.message;
            } else {
                errorMessage += errorThrown;
            }
            alert(errorMessage);
            autoFilldate();
            autoFillInvoice(updatedInvoiceNumber);
        }
    })
}


function autoFillInvoice(updatedInvoiceNumber){
    $('#invoice_no').val(updatedInvoiceNumber);
}


function  autoFilldate(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;

    document.getElementById('date').value = formattedDate;

}

function saveInvoice(){

    let date = $('#date').val();
    let so = $('#so').val();
    if(so === ""){
        so = null;
    }
    let customer = $('#customer').val();
    let supplie = $('#supplie').val();
    let amount = parseFloat($('#amount').val());
    let cost = parseFloat($('#cost').val());
    let ticket_no = $('#ticket_no').val();
    let sales_ID = $('#sales_ID').val();
    let invoiceNo = parseInt($('#invoice_no').val());
    let tc_ID = $('#tc_ID').val();
    let status = $('#status').prop('checked');
    let rn = $('#rn').val();
    let pv = $('#pv').val();
    let xo =parseInt($('#xo').val());
    let paid_supplie = parseFloat($('#paid_supplie').val());
    let remark = $('#remark').val();


    $.ajax({
        method:"POST",
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
        },
        url:"http://localhost:8080/api/v1/invoice/saveInvoice",
        async:true,
        data:JSON.stringify({
            "date":date,
            "so":so,
            "customer":customer,
            "supplie":supplie,
            "amount":amount,
            "ticketNO":ticket_no,
            "salesID":sales_ID,
            "tcID":tc_ID,
            "invoiceNO":invoiceNo,
            "status":status,
            "rn":rn,
            "pv":pv,
            "cost":cost,
            "xo":xo,
            "paidSupplie":paid_supplie,
            "remark":remark
        }),
        success:function (data){
            alert("saved")
            clearInvoiceForm()
             autoFilldate()
            getAllInvoice()
        },
        error:function (jqXHR, textStatus, errorThrown) {

            var errorMessage = "An error occurred: ";
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage += jqXHR.responseJSON.message;
            } else {
                errorMessage += errorThrown;
            }
            alert(errorMessage);
            autoFilldate();
            autoFillInvoice(updatedInvoiceNumber);
        }
    })
}

function updateInvoice(){

    let date = $('#date').val();
    let so = $('#so').val();
    let customer = $('#customer').val();
    let supplie = $('#supplie').val();
    let amount = parseFloat($('#amount').val());
    let cost = parseFloat($('#cost').val());
    let ticket_no = $('#ticket_no').val();
    let sales_ID = $('#sales_ID').val();
    let tc_ID = $('#tc_ID').val();
    let invoiceNo = parseInt($('#invoice_no').val());
    let status = $('#status').prop('checked');
    let rn = $('#rn').val();
    let pv = $('#pv').val();
    let xo =parseInt($('#xo').val());
    let paid_supplie = parseFloat($('#paid_supplie').val());
    let remark = $('#remark').val();

    $.ajax({
        method:"PUT",
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
        },
        url:"http://localhost:8080/api/v1/invoice/updateInvoice",
        async:true,
        data:JSON.stringify({
            "date":date,
            "so":so,
            "customer":customer,
            "supplie":supplie,
            "amount":amount,
            "ticketNO":ticket_no,
            "salesID":sales_ID,
            "tcID":tc_ID,
            "invoiceNO":invoiceNo,
            "status":status,
            "rn":rn,
            "pv":pv,
            "cost":cost,
            "xo":xo,
            "paidSupplie":paid_supplie,
            "remark":remark
        }),
        success:function (data){
            alert("Updated")
            clearInvoiceForm()
            autoFilldate()
            getAllInvoice()
        },
        error:function (jqXHR, textStatus, errorThrown) {

            var errorMessage = "An error occurred: ";
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage += jqXHR.responseJSON.message;
            } else {
                errorMessage += errorThrown;
            }
            alert(errorMessage);
            autoFilldate();
            autoFillInvoice(updatedInvoiceNumber);
        }
    })
}

function deleteInvoice(){
    let so = $('#so').val();

    $.ajax({
        method:"DELETE",
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
        },
        url:"http://localhost:8080/api/v1/invoice/deleteInvoice/"+so,
        async:true,
        success:function (data){
            alert("Deleted")
            clearInvoiceForm()
            autoFilldate()
            getAllInvoice()
        },
        error:function (jqXHR, textStatus, errorThrown) {

            var errorMessage = "An error occurred: ";
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage += jqXHR.responseJSON.message;
            } else {
                errorMessage += errorThrown;
            }
            alert(errorMessage);
            autoFilldate();
            autoFillInvoice(updatedInvoiceNumber);
        }
    })
}





function seachBySo(){
    let so =$('#seachBySo').val();
    $.ajax({
        method:"GET",
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
        },
        url:"http://localhost:8080/api/v1/invoice/getInvoiceById/"+so,
        async:true,
        success:function (data){
            if(data.code==="00"){
                $('#invoiceTable').empty();
                let invoice = data.content

                    let date = invoice.date
                    let so = invoice.so
                    let customer = invoice.customer
                    let supplie = invoice.supplie
                    let amount = invoice.amount
                    let cost = invoice.cost
                    let ticketNO = invoice.ticketNO
                    let salesID = invoice.salesID
                    let tc_ID = invoice.tcID
                    let invoice_no = invoice.invoiceNO
                    let status = invoice.status
                    let rn = invoice.rn
                    let pv = invoice.pv
                    let xo =invoice.xo
                    let paid_supplie = invoice.paidSupplie
                    let remark = invoice.remark


                    var row=`<tr class="selected"><td>${date}</td><td>${so}</td><td>${invoice_no}</td><td>${customer}</td><td>${supplie}</td><td>${amount}</td><td>${rn}</td><td>${pv}</td><td>${ticketNO}</td><td>${salesID}</td><td>${tc_ID}</td><td>${status}</td><td>${cost}</td><td>${xo}</td><td>${paid_supplie}</td><td>${remark}</td><tr>`;
                    $('#invoiceTable').append(row);
                }
            $('#seachBySo').val("");
         },
        error:function (jqXHR, textStatus, errorThrown) {

            var errorMessage = "An error occurred: ";
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage += jqXHR.responseJSON.message;
            } else {
                errorMessage += errorThrown;
            }
            alert(errorMessage);
            autoFilldate();
            autoFillInvoice(updatedInvoiceNumber);
        }
    })
}



$(document).ready(function () {
    $(document).on('click', '#invoiceTable tr', function () {

        var col0 = $(this).find('td:eq(0)').text();
        var col1 = $(this).find('td:eq(1)').text();
        var col2 = $(this).find('td:eq(2)').text();
        var col3 = $(this).find('td:eq(3)').text();
        var col4 = $(this).find('td:eq(4)').text();
        var col5 = $(this).find('td:eq(5)').text();
        var col6 = $(this).find('td:eq(6)').text();
        var col7 = $(this).find('td:eq(7)').text();
        var col8 = $(this).find('td:eq(8)').text();
        var col9 = $(this).find('td:eq(9)').text();
        var col10 = $(this).find('td:eq(10)').text();
        var col11 = $(this).find('td:eq(11)').text();
        var col12 = $(this).find('td:eq(12)').text();
        var col13 = $(this).find('td:eq(13)').text();
        var col14 = $(this).find('td:eq(14)').text();
        var col15 = $(this).find('td:eq(15)').text();

        var col11Boolean = col11.toLowerCase() === 'true';

        $('#date').val(col0);
        $('#so').val(col1);
        $('#invoice_no').val(col2);
        $('#customer').val(col3);
        $('#supplie').val(col4);
        $('#amount').val(col5);
        $('#rn').val(col6);
        $('#pv').val(col7);
        $('#ticket_no').val(col8);
        $('#sales_ID').val(col9);
        $('#tc_ID').val(col10);
        $('#status').prop('checked', col11Boolean);
        $('#cost').val(col12);
        $('#xo').val(col13);
        $('#paid_supplie').val(col14)
        $('#remark').val(col15);

    })
})

function saveUser(){
    let email = $('#email').val();
    let password = $('#password').val();
    let role = $('#role').val();
    if(role === 'ROLE_ADMIN'){
    $.ajax({
        method:"POST",
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
        },
        url:"http://localhost:8080/api/v1/invoice/registerAdmin",
        async:true,
        data:JSON.stringify({
            "email":email,
            "password":password,
            "roleType":role,
        }),
        success:function (data){
            alert("saved")
            clearUserForm()
            toggleUserForm()
            autoFilldate()
            incrementInvoiceNum()
        },
        error:function (jqXHR, textStatus, errorThrown) {

            var errorMessage = "An error occurred: ";
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage += jqXHR.responseJSON.message;
            } else {
                errorMessage += errorThrown;
            }
            alert(errorMessage);
            autoFilldate();
            autoFillInvoice(updatedInvoiceNumber);
        }
    })
    }else if(role === 'ROLE_SALES'){
        $.ajax({
            method:"POST",
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            url:"http://localhost:8080/api/v1/invoice/registerSales",
            async:true,
            data:JSON.stringify({
                "email":email,
                "password":password,
                "roleType":role,
            }),
            success:function (data){
                alert("saved")
                clearUserForm()
                toggleUserForm()
                autoFilldate()
                incrementInvoiceNum()
            },
            error:function (jqXHR, textStatus, errorThrown) {

                var errorMessage = "An error occurred: ";
                if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                    errorMessage += jqXHR.responseJSON.message;
                } else {
                    errorMessage += errorThrown;
                }
                alert(errorMessage);
                autoFilldate();
                autoFillInvoice(updatedInvoiceNumber);
            }
        })
    }else if(role === 'ROLE_ACCOUNTANT'){
        $.ajax({
            method:"POST",
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            url:"http://localhost:8080/api/v1/invoice/registerAccountant",
            async:true,
            data:JSON.stringify({
                "email":email,
                "password":password,
                "roleType":role,
            }),
            success:function (data){
                alert("saved")
                clearUserForm()
                toggleUserForm()
                autoFilldate()
                incrementInvoiceNum()
            },
            error:function (jqXHR, textStatus, errorThrown) {

                var errorMessage = "An error occurred: ";
                if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                    errorMessage += jqXHR.responseJSON.message;
                } else {
                    errorMessage += errorThrown;
                }
                alert(errorMessage);
                autoFilldate();
                autoFillInvoice(updatedInvoiceNumber);
            }
        })
    }else {
      alert("User Role Not Define!");
    }
}

function toggleUserForm() {
    var userForm = document.getElementById("userForm");
    if (userForm.style.display === "none") {
        userForm.style.display = "block";
    } else {
        userForm.style.display = "none";
    }
}

function clearUserForm(){
     $('#email').val("");
     $('#password').val("");
     $('#role').val("");
}

function clearInvoiceForm(){

    $('#so').val("");
    $('#customer').val("");
    $('#supplie').val("");
    $('#amount').val(null);
    $('#cost').val(null);
    $('#ticket_no').val("");
    $('#sales_ID').val("");
    $('#tc_ID').val("");
    $('#status').prop('checked', false);
    $('#rn').val("");
    $('#pv').val("");
    $('#xo').val(null);
    $('#paid_supplie').val(null);
    $('#remark').val("");
}






