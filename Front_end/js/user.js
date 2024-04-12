function  login(){
    let email = $('#useremail').val();
    let password = $('#userpassword').val();

    $.ajax({
        method:"POST",
        contentType:"application/json",
        url:"http://localhost:8080/api/v1/auth/authenticate",
        async:true,
        data:JSON.stringify({
            "email":email,
            "password":password,
        }),
        success:function (data) {
                if (data.content === "ROLE_ADMIN"){
                    window.location.href = "adminindex.html";
                }else if (data.content === "ROLE_SALES") {
                    window.location.href = "salesindex.html";
                }else if (data.content === "ROLE_ACCOUNTANT") {
                    window.location.href = "accountindex.html";
                }else {
                    alert("Email or password Incorrect");
                }
            let jwtToken = data.token;
            // Store the JWT token in localStorage
            localStorage.setItem('jwtToken', jwtToken);

        },
        error:function (jqXHR, textStatus, errorThrown) {

            var errorMessage = "An error occurred: ";
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage += jqXHR.responseJSON.message;
            } else {
                errorMessage += errorThrown;
            }
            alert(errorMessage);

        }
    })
}