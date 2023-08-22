// load Issue
function loadIssueDetail() {
  let dataId = $(".breadcrumb .active").data('id');

  $.ajax({
    url: '/view_issuedetailpagedata/',
    type: 'GET',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    data: {
        'issue': dataId,
    },
    success: function(data) {
     
      var tbody = $('#issuedetailtable tbody');
      tbody.empty();
  
      $.each(data, function(index, item) {  
        var row = `<tr data-id="${item.id}">
                        <td>${item.issue_title}</td>
                        <td>${item.issue_desc}</td>
                        <td>${item.issue_assign}</td>
                        <td>${item.issue_status}</td>
                        <td>${item.issue_priority}</td>
                      </tr>
                        `;
        tbody.append(row);
  
  
      });
  
    //   var dataTable = $('.datatable3').DataTable({
    //     "destroy": true,
    //     "retrieve": true,
    //     "info": false,
    //     "aaSorting": [],
    //     "language": {
    //         "emptyTable": "No Issues assigned to you yet"
    //       },

    //     drawCallback: function(settings) {
    //     var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
    //     pagination.toggle(this.api().page.info().pages > 1);
    //     },
        
    //   });

    //   dataTable.columns().every(function() {
    //     var column = this;
    
    //     $('.filter-column', this.footer()).on('keyup change', function() {
    //       if (column.search() !== this.value) {
    //         column
    //           .search(this.value)
    //           .draw();
    //         this.focus();
    //       }
    //     });
  
  
    //     });
      
  
    }
  
    
  });

}
loadIssueDetail();


// delete attachment
function deleteim(id){
  if (confirm('Are you sure you want to delete this image ?')) {

    $.ajax({
      url: '/issue_atatch_dlt/' + id + '/',  
      type: 'POST',
      headers: {
        "X-CSRFToken": getCookie("csrftoken")
      },
      dataType: 'json',
      success: function(response) {
    
        fetchattachement();
        alertify.set('notifier','position', 'top-right');
        alertify.notify('Attachement Deleted', 'custom', 2, function(){console.log('dismissed');});
    
      
    }
  });
  }
}


// fetch attachement
function fetchattachement() {
  let dataId = $(".breadcrumb .active").data('id');

  $.ajax({
    url: '/issue_attachement/',
    type: 'GET',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    data: {
        'issue': dataId,
    },
      success: function(data) {
          var cardsContainer = $('#attach');
          cardsContainer.empty();
          
          $.each(data, function(index, item) {
              var cardHtml = `
                  <div class="col" id="issueattachcard" data-id="">
                      <div class="card">
                          <img src="${item.image_url}" class="card-img-top" alt="News" height="250">
                          <button class="btn-danger" id="${item.id}" onClick="deleteim(this.id)">Delete</button>
                      </div>
                  </div>
              `;
              cardsContainer.append(cardHtml);
          });
          if(data==''){
              cardsContainer.append(`<h5>No Attachements added yet</h5>`);
          }
      }
  });
}
fetchattachement()


// add attachement
$(document).ready(function() {
  $("#attachmentform").validate({
  rules: {
    attachimg:{
      required: true,
    },

  },
  messages: {
    attachimg:{
      required:'Please select an image'
    },
  },
  submitHandler: function(form) {
      addAttach(form);
      // return false;
    function addAttach(form) {
      let dataId = $(".breadcrumb .active").data('id');
      var formData = new FormData(form);
      formData.append('issue', dataId);
      $.ajax({
              url:'/add_issue_attachement/',
              type: 'POST',
              headers: {
                  "X-CSRFToken": getCookie("csrftoken")
                },
              data: formData,
              success: function (response) {
                  
              $('#attachmentform')[0].reset();
              fetchattachement()

              $('#attachformclose').click()
              // location.reload()
              alertify.set('notifier','position', 'top-right');
              alertify.notify('Attachement Added', 'custom', 2, function(){console.log('dismissed');});
          
              },
              error: function (response) {
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