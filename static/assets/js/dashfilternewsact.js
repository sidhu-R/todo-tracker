
// fetch activity
$(document).ready(function() {
  
    function fetchActivity(sortBy) {
        $.ajax({
            url: '/sort_activity/',
            type: 'POST',
            headers: {'X-CSRFToken': csrftoken},
            data: {
                'sort_by': sortBy
            },
            success: function(data) {
                var cardsContainer = $('#activitycard');
                cardsContainer.empty();
                
                $.each(data, function(index, item) {
                    if(item.user_name!=null){
                        var cardHtml = `
                        <div class="activity-item d-flex">
                        <div class="activite-label">${item.activity_time},${item.activity_date}</div>
                        <i class='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                        <div class="activity-content">
                            ${item.activity_done}<a href="#" class="fw-bold text-dark"></a>
                            <p>--${item.user_name}</p>
                        </div>
                        </div>
        
                        `;
                        cardsContainer.append(cardHtml);
                    }
                    else{
                        var cardHtml = `
                        <div class="activity-item d-flex">
                        <div class="activite-label">${item.activity_time},${item.activity_date}</div>
                        <i class='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                        <div class="activity-content">
                            ${item.activity_done}<a href="#" class="fw-bold text-dark"></a>
                        </div>
                        </div>
        
                        `;
                        cardsContainer.append(cardHtml);
                    }
                    
                    
                });
            }
        });
    }
    
        fetchActivity('Today');
      
        var newsfilter=$('#recentspan');
        newsfilter.empty();
        newshtml=`| Today`;
        newsfilter.append(newshtml);
      
      
      
        $(".activebtn1").click(function(){
            var sortBy=$(this).attr("value");
            // alert(sortBy)
            fetchActivity(sortBy);
            var newsfilter=$('#recentspan');
            newsfilter.empty();
            newshtml=`| Today`;
            newsfilter.append(newshtml);
      
        });
      
        $(".activebtn2").click(function(){
            var sortBy=$(this).attr("value");
            // alert(sortBy)
            fetchActivity(sortBy);
            var newsfilter=$('#recentspan');
            newsfilter.empty();
            newshtml=`| This Month`;
            newsfilter.append(newshtml);
      
        });
      
        $(".activebtn3").click(function(){
            var sortBy=$(this).attr("value");
            // alert(sortBy)
            fetchActivity(sortBy);
            var newsfilter=$('#recentspan');
            newsfilter.empty();
            newshtml=`| This year`;
            newsfilter.append(newshtml);
      
             
        });
      
      
      });
      
    
    
    // fetch news
    $(document).ready(function() {
    
    function fetchNews(searchQuery, sortBy) {
        $.ajax({
            url: '/sort_news_dash/',
            type: 'POST',
            headers: {'X-CSRFToken': csrftoken},
            data: {
                'search_query': searchQuery,
                'sort_by': sortBy
            },
            success: function(data) {
                var cardsContainer = $('#dashboard-news');
                cardsContainer.empty();
                
                $.each(data, function(index, item) {
                    var cardHtml = `
                            <div class="post-item clearfix">
                                <img src="${item.image_url}" alt="News">
                                    <h4><a href="#"> ${item.news_title}</a></h4>
                                    <p>${item.news_desc}</p>
                            </div>
                        </div>
                    `;
                    cardsContainer.append(cardHtml);
                });
            }
        });
    }
    
        fetchNews('', 'Today');
    
        var newsfilter=$('#newsspan');
        newsfilter.empty();
        newshtml=`| Today`;
        newsfilter.append(newshtml);
    
    
    
        $(".newsbtn1").click(function(){
            var sortBy=$(this).attr("value");
            // alert(sortBy)
            fetchNews('',sortBy);
            var newsfilter=$('#newsspan');
            newsfilter.empty();
            newshtml=`| Today`;
            newsfilter.append(newshtml);
        
        });
    
        $(".newsbtn2").click(function(){
            var sortBy=$(this).attr("value");
            // alert(sortBy)
            fetchNews('',sortBy);
            var newsfilter=$('#newsspan');
            newsfilter.empty();
            newshtml=`| This Month`;
            newsfilter.append(newshtml);
        
        });
    
        $(".newsbtn3").click(function(){
            var sortBy=$(this).attr("value");
            // alert(sortBy)
            fetchNews('',sortBy);
            var newsfilter=$('#newsspan');
            newsfilter.empty();
            newshtml=`| This year`;
            newsfilter.append(newshtml);
        
                
        });
    
    
    });
    
    
    