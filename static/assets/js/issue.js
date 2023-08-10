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
                        <td>
                        <button id='but1' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#basicModal2'><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-primary" id="pageopenbtn"><a href="/issuedetailpage/${item.id}/"><i class="fa-solid fa-arrow-up"></i></a></button>
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



// //update issue
$(document).ready(function() {
  $("#editissuedetail").validate({
  rules: {
    issuetitle2:{
      required:true,
         },
    issuedesc2: {
      required: true,
    },

  },
  messages: {
    issuetitle2:{
      required:"Issue Title is required",
    },

    issuedesc2:{
      required:'Issue description please',
    },
    },
    submitHandler: function(form) {
    updateIssue(form);
    return false;
    
  }

});

});


function updateIssue() {
  var selectedRow = $('#issuetable tbody tr.selected');
  if (selectedRow.length === 0) {
    alert('Please select a row to update.');
    return;
  }
  
  var id = selectedRow.data('id');
  var title = $('#issuetitle2').val();
  var desc = $('#issuedesc2').val();
  var assign = $('#issueassign2').val();
  var status = $('#issuestatus2').val();
  var priority = $('#issuepriority2').val();
  
  
  $.ajax({
  
  url: '/issue_update/' + id + '/',
  type: 'POST',
  dataType: 'json',
  headers: {
    "X-CSRFToken": getCookie("csrftoken"),
  },
  data: {
    title:title,
    desc:desc,
    status:status,
    priority:priority,
    assign:assign,
  },
  success: function(response) {
  
    $('#issuetitle2').val('');
    $('#issuedesc2').val('');

    // alert('Task updated');
    $('#issueupclose').click();
    loadIssue();
    // location.reload()
    
    alertify.set('notifier','position', 'top-right');
    alertify.notify('Issue Updated', 'custom', 2, function(){console.log('dismissed');});
      
  
  }
});
}




$('#issuedeactivate').click(deactivateissue);
  function deactivateissue() {
    var selectedRow = $('#issuetable tbody tr.selected');
    if (selectedRow.length === 0) {
      alert('Please select a row to delete.');
      return;
    }
    if (confirm('Are you sure you want to deactivate this Issue ?')) {
    
    var id = selectedRow.data('id');
    
    $.ajax({
      url: '/issue_deactivate/' + id + '/',  
      type: 'POST',
      headers: {
        "X-CSRFToken": getCookie("csrftoken")
      },
      dataType: 'json',
      success: function(response) {
    
        fetchIssueDeactive('All');
        loadIssue();
        $('#issueupclose').click()
        alertify.set('notifier','position', 'top-right');
        alertify.notify('Issue Deactivated', 'custom', 2, function(){console.log('dismissed');});
    
  
      
    }
  });
  }
}
  

$(document).on('click', '#issuetable tbody tr', function() {
  $('#issuetable tbody tr').removeClass('selected');
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




//deativated issues
function fetchIssueDeactive(sortBy) {
  let dataId = $(".breadcrumb .active").data('id');
    $.ajax({
        url: '/view_deactiveissues/',
        type: 'POST',
        headers: {
          "X-CSRFToken": getCookie("csrftoken")
        },
        data: {
            'sort_by': sortBy,
            'projectlist':dataId,
        },
        success: function(data) {
            var cardsContainer = $('#issuedeactive-table');
            cardsContainer.empty();
            let num=1;
            $.each(data, function(index, item) {
                var cardHtml = `
                    <tr>
                    <td>${item.issue_title}</td>
                    <td>${item.issue_desc}</td>
                    <td>${item.issue_assign}</td>
                    <td>${item.issue_status}</td>
                    <td>${item.issue_priority}</td>
                    </tr>
                `;
                cardsContainer.append(cardHtml);
                num++;
                $('#issuedeactive-table td').css('color', 'red');
                // $('#deactive-table td').css('text-decoration', 'line-through');
            });
        }
    });
}

fetchIssueDeactive('All');

var newsfilter=$('#issuedeactfilter');
newsfilter.empty();
newshtml=`| All `;
newsfilter.append(newshtml);



$(".issuedeactbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchIssueDeactive(sortBy);
    var newsfilter=$('#issuedeactfilter');
    newsfilter.empty();
    newshtml=`| Today `;
    newsfilter.append(newshtml);

});

$(".issuedeactbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchIssueDeactive(sortBy);
    var newsfilter=$('#issuedeactfilter');
    newsfilter.empty();
    newshtml=`| This Month `;
    newsfilter.append(newshtml);

});

$(".issuedeactbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchIssueDeactive(sortBy);
    var newsfilter=$('#issuedeactfilter');
    newsfilter.empty();
    newshtml=`| This year `;
    newsfilter.append(newshtml);

      
});

$(".issuedeactbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchIssueDeactive(sortBy);
    var newsfilter=$('#issuedeactfilter');
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