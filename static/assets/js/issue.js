// create issue
$(document).ready(function() {
    $("#issueadd").validate({
  rules: {
    issuetitle:{
      required:true,
         },
    issuedesc: {
      required: true,
    },

  },
  messages: {
    issuetitle:{
      required:"Issue name is required",
    },

    issuedesc:{
      required:'Issue description please',
    },
    },
    submitHandler: function(form) {

        createIssue(form);

      function createIssue(form) {
        let dataId = $(".breadcrumb .active").data('id');
        var formData = new FormData(form);
        formData.append('projectlist', dataId);
        $.ajax({
                url:'/create_issue/',
                type: 'POST',
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                  },
                data:formData,
                success: function (response) {
                    
                $('#Closebtn4').click()
                $('#issueadd')[0].reset();
                loadIssue();

                alertify.set('notifier','position', 'top-right');
                alertify.notify('Issue Added', 'custom', 2, function(){console.log('dismissed');});
            
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
  


// load Issue
function loadIssue() {
  $('#issuetable').DataTable().clear().destroy();
  let dataId = $(".breadcrumb .active").data('id');

  $.ajax({
    url: '/view_issuepagedata/',
    type: 'GET',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    data: {
        'projectlist': dataId,
    },
    success: function(data) {
     
      var tbody = $('#issuetable tbody');
      tbody.empty();
  
      $.each(data, function(index, item) {  
        var row = `<tr data-id="${item.id}">
                        <td>${item.issue_title}</td>
                        <td>${item.issue_desc}</td>
                        <td>${item.issue_assign}</td>
                        <td>${item.issue_status}</td>
                        <td>${item.issue_priority}</td>
                        <td> <button id='but1' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#basicModal2'><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-primary"><a href=""><i class="fa-solid fa-arrow-up"></i></a></button>
                        </td>
                      </tr>
                        `;
        tbody.append(row);
  
  
      });
  
      var dataTable = $('.datatable3').DataTable({
        "destroy": true,
        "retrieve": true,
        "info": false,
        "aaSorting": [],
        "language": {
            "emptyTable": "No Issues assigned to you yet"
          },

        drawCallback: function(settings) {
        var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
        pagination.toggle(this.api().page.info().pages > 1);
        },
        
      });

      dataTable.columns().every(function() {
        var column = this;
    
        $('.filter-column', this.footer()).on('keyup change', function() {
          if (column.search() !== this.value) {
            column
              .search(this.value)
              .draw();
            this.focus();
          }
        });
  
  
        });
      
  
    }
  
    
  });

}
  loadIssue();



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