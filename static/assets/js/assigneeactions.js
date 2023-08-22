$('#assignbtn').click(assigneeadd);
function assigneeadd() {
  let dataId = $(".breadcrumb .active").data('id');
  var selectedRow = $('#selectassignee').val();
  alert(selectedRow)
  if (selectedRow === null) {
    alert('Please select an assignee.');
    $('#selectassignee').focus();
    return;
  }
  $.ajax({
    url: '/assignee_add',
    type: 'POST',
    data: {
      name:selectedRow,
      project:dataId
    },
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    dataType: 'json',
    success: function(response) {
  
      alert('Assignees added')
      location.reload();
      // alertify.set('notifier','position', 'top-right');
      // alertify.notify('Assignees added', 'custom', 2, function(){console.log('dismissed');});
  

    
    }
  });

}
  


// assignee task and details
$(document).ready(function() {
  let dataId = $(".breadcrumb .active").data('id');
  assigneeDetail()
  function assigneeDetail(){
  let dataId = $(".breadcrumb .active").data('id');
  $.ajax({
    url: '/assigneetask/' + dataId + '/',
    method: 'GET',
    dataType: 'json',
    success: function(data) {

      var taskList = $('#task-list');

      data.forEach(function(assigneeData) {
        var assigneeUsername = assigneeData.assignee_username;
        var tasks = JSON.parse(assigneeData.tasks);

        var assigneeCard = $('<div class="assignee-card">');

        var assigneeContainer = $('<div class="assignee-container">');

        var assigneeTitle = $('<h2>').text(assigneeUsername);
        assigneeContainer.append(assigneeTitle); 

        var assigneeCheckbox = $('<input type="checkbox" class="myCheckbox" checked>');
        assigneeCheckbox.attr('data-id', assigneeData.assignee_id);
        assigneeContainer.append(assigneeCheckbox);

        assigneeCard.append(assigneeContainer);

        var assigneeTable = $('<table class="table table-borderless assigneetable">');
        var tableHead = `
          <thead>
            <tr>
              <th scope="col">Task Title</th>
              <th scope="col">Description</th>
              <th scope="col">Due Date</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
        `;
        assigneeTable.append(tableHead);

        var assigneeTbody = $('<tbody>');

        tasks.forEach(function(task) {
          var taskRow = `
            <tr data-id="${task.pk}">
              <td>${task.fields.task_title1}</td>
              <td>${task.fields.task_desc1}</td>
              <td>${task.fields.task_due1}</td>
              <td>
              <select class="form-select assignpriority" aria-label="Default select example" id="assignpriority${task.pk}" data-id="${task.pk}" onChange="Priochanges(this.id)">
                <option value="${task.fields.task_priority1}">${task.fields.task_priority1}</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              </td>

              <td>
            <select class="form-select" aria-label="Default select example" name="" id="assignstatus${task.pk}"  data-id="${task.pk}" onChange="Statuschanges(this.id)">
              <option value="${task.fields.task_status1}">${task.fields.task_status1}</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Finished">Finished</option>
            </select>
              </td>
            </tr>
          `;
          
          assigneeTbody.append(taskRow);

        });

        assigneeTable.append(assigneeTbody);
        assigneeCard.append(assigneeTable);
        taskList.append(assigneeCard);
      });
      
      var dataTable = $('.assigneetable').DataTable({
        "info": false,
        drawCallback: function(settings) {
          var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
          pagination.toggle(this.api().page.info().pages > 1);
          },
          
      })

    },
    error: function(xhr, status, error) {
      console.error('Error fetching data:', error);
    }
  });
  }
  $(document).on('change', '.myCheckbox', function() {
    if (!this.checked) {
      if (!confirm("Are you sure you want remove this asignee ?")) {
        this.checked = true;
        return;
      }
      var id = $(this).data('id');
      myFunction(id);
    }
  });

  function myFunction(id) {
    // alert("ID: " + id);

    $.ajax({
      url: '/assignee_dlt',  
      type: 'POST',
      data: {
        assignee_id:id,
        project:dataId
      },
      headers: {
        "X-CSRFToken": getCookie("csrftoken")
      },
      dataType: 'json',
      success: function(response) {
    
        alert('Assignee removed')
        location.reload();

    
  
      
      }
    });

  }

  
});


function Priochanges(id) {
  // console.log('Select option changed');
  var boxvalue=$('#'+id).val()
  var taskId=$('#'+id).data('id')

  $.ajax({
    url: '/priority_change',
    type: 'POST',
    dataType: 'json',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    data: {
      task_id: taskId,
      priority:boxvalue,
    },
    success: function(response) {
  
      alertify.set('notifier','position', 'top-right');
      alertify.notify('Task priority Updated', 'custom', 2, function(){console.log('dismissed');});
      
  
  
    }
  });

}


function Statuschanges(id) {
  // console.log('Select option changed');
  var boxvalue=$('#'+id).val()
  var taskId=$('#'+id).data('id')

  $.ajax({
    url: '/status_change',
    type: 'POST',
    dataType: 'json',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    data: {
      task_id: taskId,
      status:boxvalue,
    },
    success: function(response) {
  
      
      alertify.set('notifier','position', 'top-right');
      alertify.notify('Task Status Updated', 'custom', 2, function(){console.log('dismissed');});
      
  
  
    }
  });

}
