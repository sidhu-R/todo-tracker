// Upload project
$(document).ready(function() {
  $("#projectuploadform").validate({
  rules: {
    ulpoadfile:{
      required: true,
    },

  },
  messages: {
    ulpoadfile:{
      required:'Please select a file'
    },
  },
  submitHandler: function(form) {
      uploadProject(form);

    function uploadProject(form) {
      var formData = new FormData(form);

      $.ajax({
            url:'/upload_project/',
            type: 'POST',
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            },
            data: formData,
            success: function (response) {
              loadProject('', '');
            $('#projectuploadform')[0].reset();

            $('#fileuploadclose').click()

            alertify.set('notifier','position', 'top-right');
            alertify.notify('Project Uploaded', 'custom', 2, function(){console.log('dismissed');});
        
            },
            error: function (response) {
                alert(response.responseJSON.error)
                alert('error')
            },
            cache: false,
            contentType: false,
            processData: false
      });
      };
       
      
  }
});

});