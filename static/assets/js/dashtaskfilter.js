

// fetch task
$(document).ready(function() {
  
    function fetchTask(sortBy) {
        $.ajax({
            url: '/sort_task_table/',
            type: 'POST',
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
  
  
  
  // fetch no:of task
  $(document).ready(function() {
    
    function fetchNum(sortBy) {
        $.ajax({
            url: '/sort_task_num/',
            type: 'POST',
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
  
  
  