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
  



$(document).ready(function() {
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

        var assigneeTable = $('<table class="table table-borderless datable">');
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
            <tr data-id="${task.fields.task_id}">
              <td>${task.fields.task_title1}</td>
              <td>${task.fields.task_desc1}</td>
              <td>${task.fields.task_due1}</td>
              <td>${task.fields.task_priority1}</td>
              <td>${task.fields.task_status1}</td>
            </tr>
          `;
          assigneeTbody.append(taskRow);
        });

        assigneeTable.append(assigneeTbody);
        assigneeCard.append(assigneeTable);
        taskList.append(assigneeCard);
      });
    },
    error: function(xhr, status, error) {
      console.error('Error fetching data:', error);
    }
  });

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