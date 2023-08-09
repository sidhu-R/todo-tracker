// create list
$(document).ready(function() {
    $("#createlist").validate({
  rules: {
    listname:{
      required:true,
         },
    listdesc: {
      required: true,
    },

  },
  messages: {
    listname:{
      required:"List name is required",
    },

    listdesc:{
      required:'List description please',
    },
    },
    submitHandler: function(form) {

        createList(form);

      function createList(form) {
        let dataId = $(".breadcrumb .active").data('id');
        var formData = new FormData(form);
        formData.append('project', dataId);
        $.ajax({
                url:'/create_list/',
                type: 'POST',
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                  },
                data:formData,
                success: function (response) {
                    
                $('#Closebtn3').click()
                $('#createlist')[0].reset();
                loadList();

                alertify.set('notifier','position', 'top-right');
                alertify.notify('List Added', 'custom', 2, function(){console.log('dismissed');});
            
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
  


// load list
function loadList() {
  $('#projecttable').DataTable().clear().destroy();
  let dataId = $(".breadcrumb .active").data('id');

  $.ajax({
    url: '/view_projectlistdata/',
    type: 'GET',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    data: {
        'project': dataId,
    },
    success: function(data) {
     
      var tbody = $('#listtable tbody');
      tbody.empty();
  
      $.each(data, function(index, item) {  
        var row = `<tr data-id="${item.id}">
                        <td>${item.list_name}</td>
                        <td>${item.list_desc}</td>
                        <td> <button id='but1' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#basicModal2'><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-primary">Task</button>
                        <button class="btn btn-primary"><a href="/issuepage/${item.id}/">Issue</a></button>
                        </td>
                      </tr>
                        `;
        tbody.append(row);
  
  
      });
  
      var dataTable = $('.datatable2').DataTable({
        "destroy": true,
        "retrieve": true,
        "info": false,
        "aaSorting": [],
        "language": {
          "emptyTable": "No Lists created for this project yet"
        },

        drawCallback: function(settings) {
        var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
        pagination.toggle(this.api().page.info().pages > 1);
        },
        

  
      });
      
  
    }
  
    
  });

  }
  loadList();



// //update list
$(document).ready(function() {
  $("#editlist").validate({
  rules: {
    listname:{
      required:true,
         },
    listdesc: {
      required: true,
    },

  },
  messages: {
    listname:{
      required:"List name is required",
    },

    listdesc:{
      required:'List description please',
    },
    },
    submitHandler: function(form) {
    updateList(form);
    return false;
    
  }

});

});


function updateList() {
  var selectedRow = $('#listtable tbody tr.selected');
  if (selectedRow.length === 0) {
    alert('Please select a row to update.');
    return;
  }
  
  var id = selectedRow.data('id');
  var name = $('#listname2').val();
  var desc = $('#listdesc2').val();
  
  
  $.ajax({
  
  url: '/list_update/' + id + '/',
  type: 'POST',
  dataType: 'json',
  headers: {
    "X-CSRFToken": getCookie("csrftoken"),
  },
  data: {
    name:name,
    desc:desc,
  },
  success: function(response) {
  
    $('#listname2').val('');
    $('#listdesc2').val('');

    // alert('Task updated');
    $('#listupclose').click();
    loadList();
    // location.reload()
    
    alertify.set('notifier','position', 'top-right');
    alertify.notify('List Updated', 'custom', 2, function(){console.log('dismissed');});
      
  
  }
});
}







// // select a row and pass it
$(document).on('click', '#listtable tbody tr', function() {
  $('#listtable tbody tr').removeClass('selected');
  $(this).addClass('selected');
  
  var name = $(this).find('td:eq(0)').text();
  var desc = $(this).find('td:eq(1)').text();
  
  
  $('#listname2').val(name);
  $('#listdesc2').val(desc);
});



$('#listdeactivate').click(deactivatelist);
function deactivatelist() {
  var selectedRow = $('#listtable tbody tr.selected');
  if (selectedRow.length === 0) {
    alert('Please select a row to delete.');
    return;
  }
  if (confirm('Are you sure you want to deactivate this List ?')) {
  
  var id = selectedRow.data('id');
  
  $.ajax({
    url: '/list_deactivate/' + id + '/',  
    type: 'POST',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    dataType: 'json',
    success: function(response) {
  
      $('#listname2').val('');
      $('#listdesc2').val('');

      loadList();
      $('#listupclose').click()
      alertify.set('notifier','position', 'top-right');
      alertify.notify('List Deactivated', 'custom', 2, function(){console.log('dismissed');});
  

    
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