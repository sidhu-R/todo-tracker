$(document).ready(function() {
  // $("#popup1").fadeOut(3000);
  // $("#popuptext").removeClass("popuptext");
  // $("#popup1").removeClass("overlay");
  // $("#popup2").removeClass("popup");
  
 });
 


//deactivate data
$('#deleteBtn1').click(deleteData);
function deleteData() {
  var selectedRow = $('#tasktable tbody tr.selected');
  if (selectedRow.length === 0) {
    alert('Please select a row to delete.');
    return;
  }
  if (confirm('Are you sure you want to deactivate this Task?')) {
  
  var id = selectedRow.data('id');
  
  $.ajax({
    url: '/data/delete/' + id + '/',  
    type: 'POST',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    dataType: 'json',
    success: function(response) {
  
      $('#tasktitle2').val('');
      $('#taskdesc2').val('');
      $('#duedate2').val('');
      $('#priority2').val('');
      $('#status2').val('');  
  
      // alert('Task Deactivated');
      // location.reload();
      loadData('','');
      fecthDeactive('All')
      $('#Closebtn2').click()
      var msg=`
      <i class="fa fa-check"></i>
      Task Deactivated.
      `;
      $("#popupdiv").fadeIn(100,function(){$(this).addClass("success-msg", 2000);$("#popupdiv").append(msg);});
      $("#popupdiv").fadeOut(3000, function(){$(this).removeClass("success-msg", 2000);$("#popupdiv").empty();});
  

    
    }
  });
  }
  }
  
  

// load task
// $(document).ready(function() {
  function loadData(sortBy,sortBy2) {
  $('#tasktable').DataTable().clear().destroy();

  $.ajax({
    url: '/data_task_view/',
    type: 'POST',
    headers: {
      "X-CSRFToken": getCookie("csrftoken")
    },
    data: {
      'sort_by': sortBy,
      'sort_by2':sortBy2,
  },
    success: function(data) {
     
      var tbody = $('#tasktable tbody');
      tbody.empty();
  
      let num=1;
      $.each(data, function(index, item) {  
        var row = `<tr data-id="${item.id}">
                        <td>${num}</td>
                        <td>${item.task_title}</td>
                        <td>${item.task_desc}</td>
                        <td>${item.task_due}</td>
                        <td>${item.task_priority}</td>
                        <td>${item.task_status}</td>
                        <td> <button id='but1' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#basicModal2'><i class="fa-solid fa-pen-to-square"></i></button></td>
                      </tr>
                        `;
        tbody.append(row);
  
        
        num++;
  
      });
  
      var dataTable = $('.datatable').DataTable({
        "destroy": true,
        "retrieve": true,
        "info": false,

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
  
  loadData('','');
  $('#task_date_submit').click(function() {
    var sortBy = $('#min').val();
    var sortBy2 = $('#max').val();
    loadData(sortBy,sortBy2);
  });
  

  
  
   
  // });





//create
$(document).ready(function() {
   
  $("#addform").validate({
  rules: {
    tasktitle:{
      required:true,
         },
    taskdesc: {
      required: true,
    },
    duedate: {
      required: true,
    },

  },
  messages: {
    tasktitle:{
      required:"Task title is required",
    },

    taskdesc:{
      required:'Task  description please',
    },
    duedate: {
      required:'Enter Due date please',
    },
  },
  submitHandler: function(form) {
    createData(form);
    return false;
  }

});

});


function createData() {
var title = $('#tasktitle').val();
var desc = $('#taskdesc').val();
var dte = $('#duedate').val();
var prio = $('#priority').val();
var status = $('#status').val();  

$.ajax({
  url: '/data/create/',
  type: 'POST',
  dataType: 'json',
  headers: {
    "X-CSRFToken": getCookie("csrftoken")
  },
  data: {
    title: title,
    desc: desc,
    dte:dte,
    prio:prio,
    status:status

  },
  success: function(response,) {

    $('#tasktitle').val('');
    $('#taskdesc').val('');
    $('#duedate').val('');
    // $('#priority').val('');
    // $('#status').val('');  

    // alert('Task added');
    $('#Closebtn1').click()
    // location.reload()
    var msg=`
    <i class="fa fa-check"></i>
    Task Created.
    `;
    $("#popupdiv").fadeIn(100,function(){$(this).addClass("success-msg", 2000);$("#popupdiv").append(msg);});
    $("#popupdiv").fadeOut(3000, function(){$(this).removeClass("success-msg", 2000);$("#popupdiv").empty();});

    loadData('','');
  }
});
}




//update
$(document).ready(function() {
   
  $("#editform").validate({
  rules: {
    tasktitle2:{
      required:true,
         },
    taskdesc2: {
      required: true,
    },
    duedate2: {
      required: true,
    },

  },
  messages: {
    tasktitle:{
      required:"Task title is required",
    },

    taskdesc:{
      required:'Task  description please',
    },
    duedate: {
      required:'Enter Due date please',
    },
  },
  submitHandler: function(form) {
    updateData(form);
    return false;
  }

});

});

function updateData() {
var selectedRow = $('#tasktable tbody tr.selected');
if (selectedRow.length === 0) {
  alert('Please select a row to update.');
  return;
}

var id = selectedRow.data('id');
var title = $('#tasktitle2').val();
var desc = $('#taskdesc2').val();
var dte = $('#duedate2').val();
var prio = $('#priority2').val();
var status = $('#status2').val();  


$.ajax({
  url: '/data/update/' + id + '/',
  type: 'POST',
  dataType: 'json',
  headers: {
    "X-CSRFToken": getCookie("csrftoken")
  },
  data: {
    title: title,
    desc: desc,
    dte:dte,
    prio:prio,
    status:status,
  },
  success: function(response) {

    $('#tasktitle2').val('');
    $('#taskdesc2').val('');
    $('#duedate2').val('');
    $('#priority2').val('');
    $('#status2').val('');  

    // alert('Task updated');
    $('#Closebtn2').click();
    // location.reload()
    

    var msg=`
    <i class="fa fa-check"></i>
    Task updated.
    `;
    $("#popupdiv").fadeIn(100,function(){$(this).addClass("success-msg", 2000);$("#popupdiv").append(msg);});
    $("#popupdiv").fadeOut(3000, function(){$(this).removeClass("success-msg", 2000);$("#popupdiv").empty();});

    loadData('','');


  }
});
}




//select a row and pass it
$(document).on('click', '#tasktable tbody tr', function() {
$('#tasktable tbody tr').removeClass('selected');
$(this).addClass('selected');

var title = $(this).find('td:eq(1)').text();
var desc = $(this).find('td:eq(2)').text();
var dte = $(this).find('td:eq(3)').text();
var prio = $(this).find('td:eq(4)').text();
var status = $(this).find('td:eq(5)').text();

$('#tasktitle2').val(title);
$('#taskdesc2').val(desc);
$('#duedate2').val(dte);
$('#priority2').val(prio);
$('#status2').val(status);
});







//deativated tasks

function fecthDeactive(sortBy) {
    $.ajax({
        url: '/data/deactive',
        type: 'POST',
        headers: {
          "X-CSRFToken": getCookie("csrftoken")
        },
        data: {
            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#deactive-table');
            cardsContainer.empty();
            let num=1;
            $.each(data, function(index, item) {
                var cardHtml = `
                    <tr>
                      <th scope="row">${num}</th>
                      <td>${item.task_title}</td>
                      <td>${item.task_desc}</td>
                      <td>${item.task_due}</td>
                      <td><span class="badg">${item.task_priority}</span></td>
                      <td><span class="badg">${item.task_status}</span></td>
                    </tr>
                `;
                cardsContainer.append(cardHtml);
                num++;
                $('#deactive-table td').css('color', 'red');
                // $('#deactive-table td').css('text-decoration', 'line-through');
            });
        }
    });
}

fecthDeactive('All');

var newsfilter=$('#deactfilter');
newsfilter.empty();
newshtml=`| All `;
newsfilter.append(newshtml);



$(".deactbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fecthDeactive(sortBy);
    var newsfilter=$('#deactfilter');
    newsfilter.empty();
    newshtml=`| Today `;
    newsfilter.append(newshtml);

});

$(".deactbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fecthDeactive(sortBy);
    var newsfilter=$('#deactfilter');
    newsfilter.empty();
    newshtml=`| This Month `;
    newsfilter.append(newshtml);

});

$(".deactbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fecthDeactive(sortBy);
    var newsfilter=$('#deactfilter');
    newsfilter.empty();
    newshtml=`| This year `;
    newsfilter.append(newshtml);

      
});

$(".deactbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fecthDeactive(sortBy);
    var newsfilter=$('#deactfilter');
    newsfilter.empty();
    newshtml=`| All `;
    newsfilter.append(newshtml);

      
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
