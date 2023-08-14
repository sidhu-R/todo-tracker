// fetch project
$(document).ready(function() {
  
function fetchdashproject(sortBy) {
    $.ajax({
        url: '/sort_project_table/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#dash-project');
            cardsContainer.empty();

            $.each(data, function(index, item) {
                var cardHtml = `
                    <tr>
                    <td>${item.pro_title}</td>
                    <td>${item.pro_type}</td>
                    <td>${item.pro_status}</td>
                    <td>${item.pro_desc}</td>
                    <td>${item.pro_start}</td>
                    <td>${item.pro_end}</td>
                    <td>${item.duration} days</td>
                    <td>${item.pro_hours}</td>
                    </tr>
                `;
                cardsContainer.append(cardHtml);
                $('td:contains("Pending")').css('color', 'red');
                $('td:contains("Complete")').css('color', 'green'); 
            });
        }
    });
}

fetchdashproject('Today');

var newsfilter=$('#projectspan');
newsfilter.empty();
newshtml=`| Today`;
newsfilter.append(newshtml);



$(".projectbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchdashproject(sortBy);
    var newsfilter=$('#projectspan');
    newsfilter.empty();
    newshtml=`| Today`;
    newsfilter.append(newshtml);

});

$(".projectbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchdashproject(sortBy);
    var newsfilter=$('#projectspan');
    newsfilter.empty();
    newshtml=`| This Month`;
    newsfilter.append(newshtml);

});

$(".projectbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchdashproject(sortBy);
    var newsfilter=$('#projectspan');
    newsfilter.empty();
    newshtml=`| This year`;
    newsfilter.append(newshtml);

        
});

$(".projectbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchdashproject(sortBy);
    var newsfilter=$('#projectspan');
    newsfilter.empty();
    newshtml=`| All`;
    newsfilter.append(newshtml);

        
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



// fetch project completed
$(document).ready(function() {

function projectcompleted(sortBy) {
    $.ajax({
        url: '/sort_project_com/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#procom');
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

projectcompleted('All');

var taskfilter=$('#procomspan');
taskfilter.empty();
newshtml=`| All`;
taskfilter.append(newshtml);



$(".procombtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectcompleted(sortBy);
    var taskfilter=$('#procomspan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".procombtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectcompleted(sortBy);
    var taskfilter=$('#procomspan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".procombtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectcompleted(sortBy);
    var taskfilter=$('#procomspan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".procombtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectcompleted(sortBy);
    var taskfilter=$('#procomspan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});


});



// fetch project on hold count
$(document).ready(function() {

function projectonhold(sortBy) {
    $.ajax({
        url: '/sort_project_hold/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#prohold');
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

projectonhold('All');

var taskfilter=$('#proholdspan');
taskfilter.empty();
newshtml=`| All`;
taskfilter.append(newshtml);



$(".proholdbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectonhold(sortBy);
    var taskfilter=$('#proholdspan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".proholdbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectonhold(sortBy);
    var taskfilter=$('#proholdspan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".proholdbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectonhold(sortBy);
    var taskfilter=$('#proholdspan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".proholdbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectonhold(sortBy);
    var taskfilter=$('#proholdspan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});


});




// fetch project pending count
$(document).ready(function() {

function projectpending(sortBy) {
    $.ajax({
        url: '/sort_project_pending/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#propending');
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

projectpending('All');

var taskfilter=$('#propendingspan');
taskfilter.empty();
newshtml=`| All`;
taskfilter.append(newshtml);



$(".propendingbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectpending(sortBy);
    var taskfilter=$('#propendingspan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".propendingbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectpending(sortBy);
    var taskfilter=$('#propendingspan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".propendingbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectpending(sortBy);
    var taskfilter=$('#propendingspan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".propendingbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectpending(sortBy);
    var taskfilter=$('#propendingspan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});


});



// fetch project cancelled count
$(document).ready(function() {

function projectcancelled(sortBy) {
    $.ajax({
        url: '/sort_project_cancelled/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#procancell');
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

projectcancelled('All');

var taskfilter=$('#procancellspan');
taskfilter.empty();
newshtml=`| All`;
taskfilter.append(newshtml);



$(".procancellbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectcancelled(sortBy);
    var taskfilter=$('#procancellspan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".procancellbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectcancelled(sortBy);
    var taskfilter=$('#procancellspan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".procancellbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectcancelled(sortBy);
    var taskfilter=$('#procancellspan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".procancellbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    projectcancelled(sortBy);
    var taskfilter=$('#procancellspan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});


});