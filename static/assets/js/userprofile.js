     
     $(document).ready(function() {
      $("#wrongpass").fadeOut(3000);
     })
     
     // change pass validate
     $(document).ready(function() {
    
        $('#changeform').validate({
        rules: {
          password: {
            required: true,
            minlength: 8,
          },
          newpassword: {
            required: true,
            minlength: 8,
          },
          renewpassword:{
        required:true,
        equalTo:newpassword
      }    
        },
        messages: {
          password: {
            required:'Old password is required',
            minlength: 'Password must be at least 8 characters long'
          },
          newpassword: {
            required:'New password is required',
            minlength: 'Password must be at least 8 characters long'
          },
          renewpassword:{
        required:"Please re-enter password",
        equalTo:"Password must be same"
      }
      
        },
  
        submitHandler: function(form) {
          form.submit();
        }
      });
      
      });
  
  
  
      // user profile validate
      $(document).ready(function() {
        $.validator.methods.email = function( value, element ) {   return this.optional( element ) || /^.+@.+\..+$/.test( value ); }
        $("#aboutform").validate({
        rules: {
          name: {
            required: true,
          },
          // img:{
          //   accept:"image/*",
          // },
          email: {
            required: true,
            email: true,
          },
          phone:{
            digits:true
          },
          twitter:{
            url:true,
          },
          facebook:{
            url:true,
          },
          instagram:{
            url:true,
          },
          linkedin:{
            url:true,
          },
  
        },
        messages: {
          name: {
            required: 'name is required'
          },
          email: "Enter a valid email"
        },
        submitHandler: function(form) {
          
          form.submit();
          alert('Changes saved successfully')
        }
      });
      
      
      });
  
  
  
  
  $(document).ready(function() {
      $('.delete-image').on('click', function() {
        if (confirm('Are you sure you want to delete this image?')) {
          $.ajax({
            url: '/deleteim/',
            type: 'POST',
            headers: {'X-CSRFToken': csrftoken},
            success: function(response) {
              alert(response.message);
              location.reload();
            },
            error: function(xhr, status, error) {
              alert('An error occurred while deleting the image.');
            }
          });
        }
      });
    });

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');