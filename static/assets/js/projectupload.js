// Upload project from csv
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
            
            if(response!=0){
              alert(response+' Already existing projects detected and skipped')
            }

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



// function initdata(callback) {
//   $.ajax({
//     url: '/',
//     type: 'POST',
//     data: {
//       name:"name",
//     },
//       success: function(result) { // or just success: callback,
//           callback(result);
//       }
//   });
// }

// $(document).ready(function() {
//   initdata(function(data) {
//       console.log(data.length);
//       console.log(data[0]);
//   });
// })