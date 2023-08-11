// load task detail
function loadTaskDetail() {
    let dataId = $(".breadcrumb .active").data('id');
  
    $.ajax({
      url: '/viewtaskdetailpage_data/',
      type: 'GET',
      headers: {
        "X-CSRFToken": getCookie("csrftoken")
      },
      data: {
        'task': dataId,
      },
      success: function(data) {
        var tbody = $('#taskdetailtable tbody');
        tbody.empty();
    
        $.each(data, function(index, item) {  
        var row = `<tr data-id="${item.id}">
                        <td>${item.task_title}</td>
                        <td>${item.task_desc}</td>
                        <td>${item.assignee}</td>
                        <td>${item.task_due}</td>
                        <td>${item.task_priority}</td>
                        <td>${item.task_status}</td>
                        </tr>
                          `;
          tbody.append(row);
    
    
        });
    
      }
    
      
    });
  
}
loadTaskDetail();




// add attachement
$(document).ready(function() {
  $("#taskattachform").validate({
  rules: {
    taskimg:{
      required: true,
    },

  },
  messages: {
    taskimg:{
      required:'Please select an image'
    },
  },
  submitHandler: function(form) {
      addTaskAttach(form);
      // return false;
    function addTaskAttach(form) {
      let dataId = $(".breadcrumb .active").data('id');
      var formData = new FormData(form);
      formData.append('task', dataId);

      $.ajax({
            url:'/add_task_attachement/',
            type: 'POST',
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            },
            data: formData,
            success: function (response) {
            fetchTaskattachement();
            $('#taskattachform')[0].reset();

            $('#taskattachclose').click()
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


// fetch attachement
function fetchTaskattachement() {
  let dataId = $(".breadcrumb .active").data('id');

  $.ajax({
    url: '/task_attachement/',
    type: 'GET',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    data: {
        'task': dataId,
    },
      success: function(data) {
          var cardsContainer = $('#taskattach');
          cardsContainer.empty();
          
          $.each(data, function(index, item) {
              var cardHtml = `
                  <div class="col">
                      <div class="card">
                          <img src="${item.image_url}" class="card-img-top" alt="News">
                          <button class="btn-danger" id="${item.id}" onClick="deletetaskim(this.id)">Delete</button>
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
fetchTaskattachement();


// fetch subtasks
function loadSubtask() {
  let dataId = $(".breadcrumb .active").data('id');
  $('#subtasktable').DataTable().clear().destroy();

  $.ajax({
    url: '/subtask_data/',
    type: 'GET',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    data: {

      'task': dataId,
  },
    success: function(data) {
     
      var tbody = $('#subtasktable tbody');
      tbody.empty();
  
      let num=1;
      $.each(data, function(index, item) {  
        var row = `<tr data-id="${item.id}">
                        <td>${num}</td>
                        <td>${item.subtask_title}</td>
                        <td>${item.subtask_status}</td>
                        <td> <button id='but1' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#basicModal3'><i class="fa-solid fa-pen-to-square"></i></button>
                        </td>
                      </tr>
                        `;
        tbody.append(row);
  
        
        num++;
  
      });
  
      var dataTable = $('.datatable6').DataTable({
        "destroy": true,
        "retrieve": true,
        "info": false,
        // "pageLength":5,
        // "lengthMenu": [[5, 10, 20, -1], [5, 10, 20,]],
        "language": {
          "emptyTable": "No Subtasks added yet"
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
loadSubtask();



// add subtask
$(document).ready(function() {
  $("#subtaskform").validate({
  rules: {
    subtasktitle:{
      required: true,
    },

  },
  messages: {
    subtasktitle:{
      required:'Please add a title'
    },
  },
  submitHandler: function(form) {
      addTaskAttach(form);
      // return false;
    function addTaskAttach(form) {
      let dataId = $(".breadcrumb .active").data('id');
      var formData = new FormData(form);
      formData.append('task', dataId);

      $.ajax({
            url:'/add_subtask/',
            type: 'POST',
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            },
            data: formData,
            success: function (response) {
            loadSubtask();
            $('#subtaskform')[0].reset();

            $('#subtaskformclose').click()
            // location.reload()
            alertify.set('notifier','position', 'top-right');
            alertify.notify('Subtask created', 'custom', 2, function(){console.log('dismissed');});
        
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





// //update subtask
$(document).ready(function() {
  $("#subtaskedit").validate({
  rules: {
    subtasktitle2: {
      required: true,
    },

  },
  messages: {
    subtasktitle2:{
      required:"Subtask Title is required",
    },

    },
    submitHandler: function(form) {
    updateSubtask(form);
    return false;
    
  }

});

});


function updateSubtask() {
  var selectedRow = $('#subtasktable tbody tr.selected');
  if (selectedRow.length === 0) {
    alert('Please select a row to update.');
    return;
  }
  
  var id = selectedRow.data('id');
  var title = $('#subtasktitle2').val();
  var status = $('#subtaskstatus2').val();
  
  $.ajax({
  
  url: '/subtask_update/' + id + '/',
  type: 'POST',
  dataType: 'json',
  headers: {
    "X-CSRFToken": getCookie("csrftoken"),
  },
  data: {
    title:title,
    status:status,
  },
  success: function(response) {
  
    $('#subtasktitle2').val('');
    $('#subtaskstatus2').val('');

    // alert('Task updated');
    $('#subtaskeditclose').click();
    loadSubtask();
    fetchTaskattachement();
    // location.reload()
    
    alertify.set('notifier','position', 'top-right');
    alertify.notify('Subtask Updated', 'custom', 2, function(){console.log('dismissed');});
      
  
  }
});
}


// // select a row and pass it
$(document).on('click', '#subtasktable tbody tr', function() {
    $('#subtasktable tbody tr').removeClass('selected');
    $(this).addClass('selected');
    
    var title = $(this).find('td:eq(1)').text();;
    var status = $(this).find('td:eq(2)').text();

    
    $('#subtasktitle2').val(title);
    $('#subtaskstatus2').val(status);

});
  


// delete attachment
function deletetaskim(id){
  if (confirm('Are you sure you want to delete this image ?')) {

    $.ajax({
      url: '/task_atatch_dlt/' + id + '/',  
      type: 'POST',
      headers: {
        "X-CSRFToken": getCookie("csrftoken")
      },
      dataType: 'json',
      success: function(response) {
    
        fetchTaskattachement();
        alertify.set('notifier','position', 'top-right');
        alertify.notify('Attachement Deleted', 'custom', 2, function(){console.log('dismissed');});
    
      
    }
  });
  }
}



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