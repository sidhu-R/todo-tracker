
$(document).ready(function() {
    loadAnnoun();
    // loadsendAnnoun('Today');
    // loadreciveAnnoun('Today');
  
  });

  
  $(".dropdown-footer").click(function(){
    $(".badge-number").text('')
  });
  
  
  //notification icon message
  function loadAnnoun() {
  $.ajax({
  url: '/view_announce/',
  type: 'GET',
  dataType: 'json',
  success: function(data) {
    var tbody = $('#anndiv');
    tbody.empty();
  
    var body3=$('.badge-number')
    body3.empty()
  

    
    let num=0
    data.forEach(function(item) {
      var body4=$('#notifbarmessagenum')
      body4.empty()
      
      var cardHtml = `
      <li class="message-item">
      <a href="#">
        <img src="" alt="" class="rounded-circle">
        <div>
          <h4>${item.ann_title}</h4>
          <p>${item.ann_desc}</p>
          <p>${item.ann_created}</p>
          <p>--${item.user_name}</p>
        </div>
      </a>
    </li>
    <li>
      <hr class="dropdown-divider">
    </li>
  `;
      tbody.append(cardHtml);
      num++
  
      body3.empty()
      var cardHtml3=`
        ${num}
      `;
      body3.append(cardHtml3)
  
      body4.empty()
      var cardHtml4=`
      You have ${num}+ messages
      `;
      body4.append(cardHtml4)
      
      
    });
  }
  });
  }
  

//notification send
  function loadsendAnnoun(sortBy) {
    $.ajax({
        url: '/send_view_announce/',
        type: 'POST',
        data: {
            'sort_by': sortBy
        },
        success: function(data) {
          var body2=$('#sendann')
          body2.empty()
            
            $.each(data, function(index, item) {
              var cardHtml2=`
              <div class="card-body">
              <h5 class="card-title">${item.ann_title}</h5>
              <p class="card-text">${item.ann_desc}</p>
              <p>${item.ann_created}</p>
              <p>--${item.user_name}</p>
              </div>
              `;
              body2.append(cardHtml2)
            });
        }
    });
}

loadsendAnnoun('Today');

var taskfilter=$('#announspan');
taskfilter.empty();
newshtml=`| Today`;
taskfilter.append(newshtml);



$(".annbtn1").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    loadsendAnnoun(sortBy);
    var taskfilter=$('#announspan');
    taskfilter.empty();
    newshtml=`| Today`;
    taskfilter.append(newshtml);

});

$(".annbtn2").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    loadsendAnnoun(sortBy);
    var taskfilter=$('#announspan');
    taskfilter.empty();
    newshtml=`| This Month`;
    taskfilter.append(newshtml);

});

$(".annbtn3").click(function(){
    var sortBy=$(this).attr("value");
    // alert(sortBy)
    loadsendAnnoun(sortBy);
    var taskfilter=$('#announspan');
    taskfilter.empty();
    newshtml=`| This year`;
    taskfilter.append(newshtml);

     
});



//notification recieved
function loadreciveAnnoun(sortBy) {
  $.ajax({
      url: '/recieve_view_announce/',
      type: 'POST',
      data: {
          'sort_by': sortBy
      },
      success: function(data) {
        var body2=$('#recieveann')
        body2.empty()
          
          $.each(data, function(index, item) {
            var cardHtml2=`
            <div class="card-body">
            <h5 class="card-title">${item.ann_title}</h5>
            <p class="card-text">${item.ann_desc}</p>
            <p>${item.ann_created}</p>
            <p>--${item.user_name}</p>
            </div>
            `;
            body2.append(cardHtml2)
          });
      }
  });
}

loadreciveAnnoun('Today');

var taskfilter=$('#announspan');
taskfilter.empty();
newshtml=`| Today`;
taskfilter.append(newshtml);



$(".annbtn4").click(function(){
  var sortBy=$(this).attr("value");
  // alert(sortBy)
  loadreciveAnnoun(sortBy);
  var taskfilter=$('#announspan');
  taskfilter.empty();
  newshtml=`| Today`;
  taskfilter.append(newshtml);

});

$(".annbtn5").click(function(){
  var sortBy=$(this).attr("value");
  // alert(sortBy)
  loadreciveAnnoun(sortBy);
  var taskfilter=$('#announspan');
  taskfilter.empty();
  newshtml=`| This Month`;
  taskfilter.append(newshtml);

});

$(".annbtn6").click(function(){
  var sortBy=$(this).attr("value");
  // alert(sortBy)
  loadreciveAnnoun(sortBy);
  var taskfilter=$('#announspan');
  taskfilter.empty();
  newshtml=`| This year`;
  taskfilter.append(newshtml);

   
});




//announcement validation
$(document).ready(function() {
  $("#Annform").validate({
  rules: {
    anntitle:{
      required:true,
         },
    anndesc: {
      required: true,
    },

  },
  messages: {
    tasktitle:{
      required:"Title is required",
    },

    anndesc:{
      required:'Description please',
    },
  },
  submitHandler: function(form) {
    createAnnoun(form);
    return false;
  }

});

});   
  
//announcement creation
  
function createAnnoun() {
var title = $('#anntitle').val();
var desc = $('#anndesc').val();

$.ajax({
url: '/add_announce/',
type: 'POST',
dataType: 'json',
data: {
  title: title,
  desc: desc

},
success: function(response) {

  $('#anntitle').val('');
  $('#anndesc').val(''); 

  loadAnnoun();
  loadsendAnnoun('Today')
  loadreciveAnnoun('Today')

  alert('Announced')
  $('#Closebtn').click()
}
});
}