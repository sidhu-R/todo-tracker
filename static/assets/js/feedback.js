
$(document).ready(function() {
  $.validator.methods.email = function( value, element ) {   return this.optional( element ) || /^.+@.+\..+$/.test( value ); }
    $("#feedbform").validate({
    rules: {
      fname:{
        required:true,
           },
      email: {
        required: true,
        email:true,
      },
      subject: {
        required: true,
  
      },
      country:{
        required:true
      },
  
    },
    messages: {
      fname:{
        required:"your name is required",
      },
  
      email: 'enter a valid email',
      subject:{
        required:'Enter a feedback description please',
      },
      country:{
        required:'Please enter you country'
      },
  
    },
    submitHandler: function(form) {
      createData(form);
      return false;
    }
  
  
  
  
  
  
  });
  
  });
  
  
  function createData() {
    var name = $('#fname').val();
    var mail = $('#email').val();
    var country = $('#country').val();
    var desc = $('#subject').val();
  
    $.ajax({
  
      url: '/feed/',
      type: 'POST',
      dataType: 'json',
      data: {
        name: name,
        mail: mail,
        country:country,
        desc:desc
  
      },
      success: function(response) {
  
        $('#fname').val('');
        $('#email').val('');
        $('#duedate').val('');
        $('#country').val('');
        $('#subject').val('');
        // alert("THANK you very much")
        var msg=`
        <i class="fa fa-check"></i>
        Feedback Send!.
        `;
        $("#popupdiv").fadeIn(100,function(){$(this).addClass("success-msg", 2000);$("#popupdiv").append(msg);});
        $("#popupdiv").fadeOut(2000, function(){$(this).removeClass("success-msg", 2000);$("#popupdiv").empty();});
    
  
        
  
          
  
      }
    });
  }