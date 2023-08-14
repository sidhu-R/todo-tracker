// fetch issues table
$(document).ready(function() {
  
function fetchdashissues(sortBy) {
    $.ajax({
        url: '/sort_issue_table/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {
            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#issue-table');
            cardsContainer.empty();

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
                $('td:contains("Pending")').css('color', 'red');
                $('td:contains("Complete")').css('color', 'green'); 
            });
        }
    });
}

fetchdashissues('Today');

var newsfilter=$('#issuetablespan');
newsfilter.empty();
newshtml=`| Today`;
newsfilter.append(newshtml);



$(".issuetablebtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchdashissues(sortBy);
    var newsfilter=$('#issuetablespan');
    newsfilter.empty();
    newshtml=`| Today`;
    newsfilter.append(newshtml);

});

$(".issuetablebtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchdashissues(sortBy);
    var newsfilter=$('#issuetablespan');
    newsfilter.empty();
    newshtml=`| This Month`;
    newsfilter.append(newshtml);

});

$(".issuetablebtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchdashissues(sortBy);
    var newsfilter=$('#issuetablespan');
    newsfilter.empty();
    newshtml=`| This year`;
    newsfilter.append(newshtml);

        
});

$(".issuetablebtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    fetchdashissues(sortBy);
    var newsfilter=$('#issuetablespan');
    newsfilter.empty();
    newshtml=`| All`;
    newsfilter.append(newshtml);

        
});



});




 // fetch issue num
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



// // fetch issue open count num
$(document).ready(function() {
  
function issueopennum(sortBy) {
    $.ajax({
        url: '/sort_issue_open/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {

            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#issueopen');
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

issueopennum('All');

var newsfilter=$('#issueopenspan');
newsfilter.empty();
newshtml=`| All`;
newsfilter.append(newshtml);



$(".issueopenbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueopennum(sortBy);
    var taskfilter=$('#issueopenspan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".issueopenbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueopennum(sortBy);
    var taskfilter=$('#issueopenspan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".issueopenbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueopennum(sortBy);
    var taskfilter=$('#issueopenspan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".issueopenbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueopennum(sortBy);
    var taskfilter=$('#issueopenspan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});



});



// fetch issue inprogress count num
$(document).ready(function() {
  
function issueinprogessnum(sortBy) {
    $.ajax({
        url: '/sort_issue_inprogess/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {

            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#issueprog');
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

issueinprogessnum('All');

var newsfilter=$('#issueprogspan');
newsfilter.empty();
newshtml=`| All`;
newsfilter.append(newshtml);



$(".issueprogbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueinprogessnum(sortBy);
    var taskfilter=$('#issueprogspan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".issueprogbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueinprogessnum(sortBy);
    var taskfilter=$('#issueprogspan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".issueprogbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueinprogessnum(sortBy);
    var taskfilter=$('#issueprogspan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".issueprogbtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueinprogessnum(sortBy);
    var taskfilter=$('#issueprogspan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});



});



// fetch issue resolved count num
$(document).ready(function() {
  
function issueresolvednum(sortBy) {
    $.ajax({
        url: '/sort_issue_resolved/',
        type: 'POST',
        headers: {'X-CSRFToken': csrftoken},
        data: {

            'sort_by': sortBy
        },
        success: function(data) {
            var cardsContainer = $('#issueresolve');
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

issueresolvednum('All');

var newsfilter=$('#issueresolvespan');
newsfilter.empty();
newshtml=`| All`;
newsfilter.append(newshtml);



$(".issueresolvebtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueresolvednum(sortBy);
    var taskfilter=$('#issueresolvespan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".issueresolvebtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueresolvednum(sortBy);
    var taskfilter=$('#issueresolvespan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".issueresolvebtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueresolvednum(sortBy);
    var taskfilter=$('#issueresolvespan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

        
});

$(".issueresolvebtn4").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    issueresolvednum(sortBy);
    var taskfilter=$('#issueresolvespan');
    taskfilter.empty();
    newshtml=`| All`;
    taskfilter.append(newshtml);

        
});



});