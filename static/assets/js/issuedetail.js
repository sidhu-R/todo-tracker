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



// // select a row and pass it
$(document).on('click', '#issuedetailtable tbody tr', function() {
    $('#issuedetailtable tbody tr').removeClass('selected');
    $(this).addClass('selected');
    
    var title = $(this).find('td:eq(0)').text();
    var desc = $(this).find('td:eq(1)').text();
    var assignee = $(this).find('td:eq(2)').text();
    var status = $(this).find('td:eq(3)').text();
    var prio = $(this).find('td:eq(4)').text();
    
    
    $('#issuetitle2').val(title);
    $('#issuedesc2').val(desc);
    $('#issueassign2').val(assignee);
    $('#issuestatus2').val(status);
    $('#issuepriority2').val(prio);
});
  



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
                  <div class="col">
                      <div class="card">
                          <img src="${item.image_url}" class="card-img-top" alt="News">
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