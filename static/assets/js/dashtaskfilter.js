

// fetch task
$(document).ready(function() {
  
function fetchTask(sortBy) {
    $.ajax({
        url: '/sort_task_table/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#dash-table');
            cardsContainer.empty();
            let num=1;
            $.each(data, function(index, item) {
                var cardHtml = `
                    <tr>
                        <th scope="row"><a href="#">${num}</a></th>
                        <td>${item.task_title}</td>
                        <td><a href="#" class="text-primary">${item.task_desc}</a></td>
                        <td><a href="#" class="text-primary">${item.assignee}</a></td>
                        <td>${item.task_due}</td>
                        <td><span class="badg">${item.task_priority}</span></td>
                        <td><span class="badg">${item.task_status}</span></td>
                    </tr>
                `;
                cardsContainer.append(cardHtml);
                num++;
                $('td:contains("Pending")').css('color', 'red');
                $('td:contains("Finished")').css('color', 'green'); 
            });
        }
    });
}

fetchTask('Today');

var newsfilter=$('#taskspan');
newsfilter.empty();
newshtml=`| Today`;
newsfilter.append(newshtml);



$(".taskbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchTask(sortBy);
    var newsfilter=$('#taskspan');
    newsfilter.empty();
    newshtml=`| Today`;
    newsfilter.append(newshtml);

});

$(".taskbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchTask(sortBy);
    var newsfilter=$('#taskspan');
    newsfilter.empty();
    newshtml=`| This Month`;
    newsfilter.append(newshtml);

});

$(".taskbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchTask(sortBy);
    var newsfilter=$('#taskspan');
    newsfilter.empty();
    newshtml=`| This year`;
    newsfilter.append(newshtml);

        
});

$(".taskbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchTask(sortBy);
    var newsfilter=$('#taskspan');
    newsfilter.empty();
    newshtml=`| All`;
    newsfilter.append(newshtml);

        
});



});


// // fetch finished task
$(document).ready(function() {
  
function fetchFin(sortBy) {
    $.ajax({
        url: '/sort_task_fin/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {

            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#taskfin');
            cardsContainer.empty();
            
            $.each(data, function(index, item) {
                var cardHtml = `
                        <h6>${item.count}</h6>
                `;
                cardsContainer.append(cardHtml);
            });
        }
    });
}

fetchFin('All');

var newsfilter=$('#finspan');
newsfilter.empty();
newshtml=`| All`;
newsfilter.append(newshtml);



$(".finbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchFin(sortBy);
    var taskfilter=$('#finspan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".finbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchFin(sortBy);
    var taskfilter=$('#finspan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".finbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchFin(sortBy);
    var taskfilter=$('#finspan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".finbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchFin(sortBy);
    var taskfilter=$('#finspan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});



});



// fetch no:of projects
$(document).ready(function() {

function projectnum(sortBy) {
    $.ajax({
        url: '/sort_project_num/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#projectnum');
            cardsContainer.empty();
            
            $.each(data, function(index, item) {
                var cardHtml = `
                        <h6>${item.count}</h6>
                `;
                cardsContainer.append(cardHtml);
            });
        }
    });
}

projectnum('All');

var taskfilter=$('#prospan');
taskfilter.empty();
newshtml=`| All`;
taskfilter.append(newshtml);



$(".probtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectnum(sortBy);
    var taskfilter=$('#prospan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".probtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectnum(sortBy);
    var taskfilter=$('#prospan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".probtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectnum(sortBy);
    var taskfilter=$('#prospan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".probtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectnum(sortBy);
    var taskfilter=$('#prospan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});


});




// fetch no:of task
$(document).ready(function() {

function fetchNum(sortBy) {
    $.ajax({
        url: '/sort_task_num/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#taskNum');
            cardsContainer.empty();
            
            $.each(data, function(index, item) {
                var cardHtml = `
                        <h6>${item.count}</h6>
                `;
                cardsContainer.append(cardHtml);
            });
        }
    });
}

fetchNum('All');

var taskfilter=$('#numspan');
taskfilter.empty();
newshtml=`| All`;
taskfilter.append(newshtml);



$(".numbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchNum(sortBy);
    var taskfilter=$('#numspan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".numbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchNum(sortBy);
    var taskfilter=$('#numspan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".numbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchNum(sortBy);
    var taskfilter=$('#numspan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".numbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchNum(sortBy);
    var taskfilter=$('#numspan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});



});




// // fetch pending task
$(document).ready(function() {

function fetchPen(sortBy) {
    $.ajax({
        url: '/sort_task_pen/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {

            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#taskpen');
            cardsContainer.empty();
            
            $.each(data, function(index, item) {
                var cardHtml = `
                        <h6>${item.count}</h6>
                `;
                cardsContainer.append(cardHtml);
            });
        }
    });
}

fetchPen('All');

var newsfilter=$('#penspan');
newsfilter.empty();
newshtml=`| All`;
newsfilter.append(newshtml);



$(".penbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchPen(sortBy);
    var taskfilter=$('#penspan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".penbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchPen(sortBy);
    var taskfilter=$('#penspan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".penbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchPen(sortBy);
    var taskfilter=$('#penspan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".penbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchPen(sortBy);
    var taskfilter=$('#penspan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});



});


  
// // fetch inprogress task
$(document).ready(function() {
  
function fetchProg(sortBy) {
    $.ajax({
        url: '/sort_task_prog/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {

            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#taskprog');
            cardsContainer.empty();
            
            $.each(data, function(index, item) {
                var cardHtml = `
                        <h6>${item.count}</h6>
                `;
                cardsContainer.append(cardHtml);
            });
        }
    });
}

fetchProg('All');

var newsfilter=$('#progressspan');
newsfilter.empty();
newshtml=`| All`;
newsfilter.append(newshtml);



$(".progressbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchProg(sortBy);
    var taskfilter=$('#progressspan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".progressbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchProg(sortBy);
    var taskfilter=$('#progressspan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".progressbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchProg(sortBy);
    var taskfilter=$('#progressspan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".progressbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchProg(sortBy);
    var taskfilter=$('#progressspan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});



});



// // fetch issue num
$(document).ready(function() {
  
function issuenum(sortBy) {
    $.ajax({
        url: '/sort_issue_num/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {

            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#issuenum');
            cardsContainer.empty();
            
            $.each(data, function(index, item) {
                var cardHtml = `
                        <h6>${item.count}</h6>
                `;
                cardsContainer.append(cardHtml);
            });
        }
    });
}

issuenum('All');

var newsfilter=$('#issuespan');
newsfilter.empty();
newshtml=`| All`;
newsfilter.append(newshtml);



$(".issuebtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issuenum(sortBy);
    var taskfilter=$('#issuespan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".issuebtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issuenum(sortBy);
    var taskfilter=$('#issuespan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".issuebtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issuenum(sortBy);
    var taskfilter=$('#issuespan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".issuebtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issuenum(sortBy);
    var taskfilter=$('#issuespan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
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
  
  


// //dashboard date and time
// const displayTime = document.querySelector(".display-time");
// // Time
// function showTime() {
//   let time = new Date();
//   displayTime.innerText = time.toLocaleTimeString("en-US", { hour12: false });
//   setTimeout(showTime, 1000);
// }

// showTime();

// // Date
// function updateDate() {
//   let today = new Date();

//   // return number
//   let dayName = today.getDay(),
//     dayNum = today.getDate(),
//     month = today.getMonth(),
//     year = today.getFullYear();

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const dayWeek = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   // value -> ID of the html element
//   const IDCollection = ["day", "daynum", "month", "year"];
//   // return value array with number as a index
//   const val = [dayWeek[dayName], dayNum, months[month], year];
//   for (let i = 0; i < IDCollection.length; i++) {
//     document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i];
//   }
// }

// updateDate();
