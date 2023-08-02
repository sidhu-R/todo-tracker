$(document).ready(function() {
    $("#newsform").validate({
    rules: {
        newstitle: {
        required: true,
      },
      // img:{
      //   accept:"image/*",
      // },
      newsdesc: {
        required: true,
      },
      newsimg:{
        required: true,
      },

    },
    messages: {
      newstitle: {
        required: 'Title is required'
      },
      newsdesc:{
        required:'Enter a description'
      },
      newsimg:{
        required:'Please select an image'
      },
    },
    submitHandler: function(form) {
        createNews(form);
        // return false;
      function createNews(form) {
        var formData = new FormData(form);
        $.ajax({
                url:'/create_news/',
                type: 'POST',
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                  },
                data: formData,
                success: function (response) {
                // alert('success')
                $('#newsform')[0].reset();
                fetchData('', '','','All');
                fetchFeat('', '','','All');
                $('#closebtn').click()
                // location.reload()
                var msg=`
                <i class="fa fa-check"></i>
                News added.
                `;
                $("#popupdiv").fadeIn(100,function(){$(this).addClass("success-msg", 2000);$("#popupdiv").append(msg);});
                $("#popupdiv").fadeOut(3000, function(){$(this).removeClass("success-msg", 2000);$("#popupdiv").empty();});
            
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
  

function fetchData(searchQuery, sortBy,sortBy2,userBy) {
    $.ajax({
        url: '/search_sort_data/',
        type: 'POST',
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
          },
        data: {
            'search_query': searchQuery,
            'sort_by': sortBy,
            'sort_by2':sortBy2,
            'user_by':userBy
        },
        success: function(data) {
            var cardsContainer = $('#news-container');
            cardsContainer.empty();
            
            $.each(data, function(index, item) {
                var cardHtml = `
                    <div class="col">
                        <div class="card">
                            <img src="${item.image_url}" class="card-img-top" alt="News">
                            <div class="card-body">
                                <h5 class="card-title"> ${item.news_title}</h5>
                                <p class="card-text">${item.news_created}</p>
                                <p class="card-text">${item.news_desc}</p>
                            </div>
                        </div>
                    </div>
                `;
                cardsContainer.append(cardHtml);
            });
            if(data==''){
                cardsContainer.append(`<h5>No news to display on this day</h5>`);
            }
        }
    });
}

    fetchData('', '','','All');

//   var newsfilter=$('#newsupspan');
//   newsfilter.empty();
//   newshtml=`| Today`;
//   newsfilter.append(newshtml);



$('#search-btn').click(function() {
    var searchQuery = $('#search-input').val();
    var sortBy = $('#date-input').val();
    var sortBy2 = $('#date-input2').val();
    var userBy = $('#user-select').val();
    fetchData(searchQuery,sortBy,sortBy2,userBy);
})

$('#user-select').change(function() {
    var searchQuery = $('#search-input').val();
    var sortBy = $('#date-input').val();
    var sortBy2 = $('#date-input2').val();
    var userBy = $(this).val();
    fetchData(searchQuery,sortBy,sortBy2,userBy);
});


$('#date_submit').click(function() {
    var searchQuery = $('#search-input').val();
    var sortBy = $('#date-input').val();
    var sortBy2 = $('#date-input2').val();
    var userBy = $('#user-select').val();
    fetchData(searchQuery,sortBy,sortBy2,userBy);
});








function fetchFeat(searchQuery, sortBy,sortBy2,userBy) {
    $.ajax({
        url: '/search_sort_feat/',
        type: 'POST',
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
          },
        data: {
            'search_query': searchQuery,
            'sort_by': sortBy,
            'sort_by2':sortBy2,
            'user_by':userBy
        },
        success: function(data) {
            var cardsContainer = $('#news-container2');
            cardsContainer.empty();
            
            $.each(data, function(index, item) {
                var cardHtml = `
                    <div class="col">
                        <div class="card">
                            <img src="${item.image_url}" class="card-img-top" alt="News">
                            <div class="card-body">
                                <h5 class="card-title"> ${item.news_title}</h5>
                                <p class="card-text">${item.news_created}</p>
                                <p class="card-text">${item.news_desc}</p>
                            </div>
                        </div>
                    </div>
                `;
                cardsContainer.append(cardHtml);
            });
            if(data==''){
                cardsContainer.append(`<h5>No news to display on this day</h5>`);
            }
        }
    });
}

    fetchFeat('', '','','All');

//   var newsfilter=$('#newsupspan');
//   newsfilter.empty();
//   newshtml=`| Today`;
//   newsfilter.append(newshtml);



$('#search-btn2').click(function() {
    var searchQuery = $('#search-input2').val();
    var sortBy = $('#date-input3').val();
    var sortBy2 = $('#date-input4').val();
    var userBy = $('#user-select2').val();
    fetchFeat(searchQuery,sortBy,sortBy2, userBy);
})

$('#user-select2').change(function() {
    var searchQuery = $('#search-input2').val();
    var sortBy = $('#date-input3').val();
    var sortBy2 = $('#date-input4').val();
    var userBy = $(this).val();
    fetchFeat(searchQuery,sortBy,sortBy2, userBy);
});


$('#date_submit2').click(function() {
    var searchQuery = $('#search-input2').val();
    var sortBy = $('#date-input3').val();
    var sortBy2 = $('#date-input4').val();
    var userBy = $('#user-select2').val();
    fetchFeat(searchQuery,sortBy,sortBy2, userBy);
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