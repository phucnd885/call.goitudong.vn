  $(document).ready(function(){
	      $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    })
	
	  $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

     function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }
	
	  $("#api-form").submit(function(event){
	   event.preventDefault();
	    var key = $('#secretKey').val().trim();
		 var phone = $('#customerPhone').val().trim();
		 var name = $('#customerName').val().trim();
		 var gender = $('#customerGender').val().trim();
		 var info = $('#customerInfo').val().trim();
		 var id = $('#callId').val().trim();
		 var apiUrl = $('#apiCallbackUrl').val().trim();
		 
		 //Validate
		  var check = true;
		  var input = $('.validate-input .input100');
		    for(var i=0; i<input.length; i++) {
             if(validate(input[i]) == false){
                 showValidate(input[i]);
                 check=false;
             }
         }
		 if(check == false){
			 return check;
		 } 
		
		 alert("ahha");
		$.ajax({
			url: "https://api.goitudong.vn/campaign/callone/",
			type: "POST",
			data: { secretKey: key, customerPhone: phone, customerName: name, customerGender: gender, customerInfo: info, callId: id, apiCallbackUrl: apiUrl },
			success: function (data) {
				alert(phone);
				if (data.hasError) {
					alert("L???i: Kh??ng th??? g???i ??i???n -> m?? l???i: "+ data.errorCode);
				} else {
				   alert("???? g???i y??u c???u g???i th??nh c??ng ?????n s??? ??i???n tho???i: "+ phone);
				}
			},
			error: function () {
				alert("L???i: Kh??ng g???i ???????c y??u c???u");
			}
		});
			return false;
		});
});