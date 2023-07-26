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
      
      form.submit();
      alert('News added successfully')
    }
  });
  
  });



$(document).ready(function() {

function fetchData(searchQuery, sortBy,sortBy2,userBy) {
    $.ajax({
        url: '/search_sort_data/',
        type: 'POST',
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


// $(".newsbtn1").click(function(){
//       var sortBy=$(this).attr("value");
//       // alert(sortBy)
//       fetchData('',sortBy);
//       var newsfilter=$('#newsupspan');
//       newsfilter.empty();
//       newshtml=`| Today`;
//       newsfilter.append(newshtml);

//   });

//   $(".newsbtn2").click(function(){
//       var sortBy=$(this).attr("value");
//       // alert(sortBy)
//       fetchData('',sortBy);
//       var newsfilter=$('#newsupspan');
//       newsfilter.empty();
//       newshtml=`| This Month`;
//       newsfilter.append(newshtml);

//   });

//   $(".newsbtn3").click(function(){
//       var sortBy=$(this).attr("value");
//       // alert(sortBy)
//       fetchData('',sortBy);
//       var newsfilter=$('#newsupspan');
//       newsfilter.empty();
//       newshtml=`| This year`;
//       newsfilter.append(newshtml);

        
//   });


});



$(document).ready(function() {

    function fetchFeat(searchQuery, sortBy,sortBy2,userBy) {
        $.ajax({
            url: '/search_sort_feat/',
            type: 'POST',
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




});