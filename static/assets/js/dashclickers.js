
// project popups
function projectpopup(id) {
    $('.bd-example-modal-lg').modal('show')
    $(".modal-title").text(id);
    if((id=='Project')||(id=='Completed')||(id=='On Hold')||(id=='Pending')||(id=='Cancelled')){
        
        $.ajax({
            url: '/project_popup/',
            type: 'GET',
            headers: {'X-CSRFToken': csrftoken},
            data: {
                'sort_by': id
            },
            success: function(data) {
                var cardsContainer = $('#project-modal-table');
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
}


// task popups
// function taskpopup(id) {
//     $('.bd-example-modal-lg').modal('show')
//     $(".modal-title").text(id);
//     if((id=='Tasks')||(id=='Pending')||(id=='In Progress')||(id=='Finished')){
        
//         $.ajax({
//             url: '//',
//             type: 'GET',
//             headers: {'X-CSRFToken': csrftoken},
//             data: {
//                 'sort_by': id
//             },
//             success: function(data) {
//                 var cardsContainer = $('#project-modal-table');
//                 cardsContainer.empty();
    
//                 $.each(data, function(index, item) {
//                     var cardHtml = `
//                         <tr>
//                         <td>${item.pro_title}</td>
//                         <td>${item.pro_type}</td>
//                         <td>${item.pro_status}</td>
//                         <td>${item.pro_desc}</td>
//                         <td>${item.pro_start}</td>
//                         <td>${item.pro_end}</td>
//                         <td>${item.duration} days</td>
//                         <td>${item.pro_hours}</td>
//                         </tr>
//                     `;
//                     cardsContainer.append(cardHtml);
//                     $('td:contains("Pending")').css('color', 'red');
//                     $('td:contains("Complete")').css('color', 'green'); 
//                 });
//             }
//         });
//     }
// }