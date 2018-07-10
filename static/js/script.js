$(document).ready( function() {
    console.log('working');
    // PUT route
    $('#edit').on('submit', function(e) {
        e.preventDefault();
        var newData = $(this).serialize();
        var url = $(this).attr('action');
        $.ajax({
            method: 'PUT',
            url: url,
            data: newData
        }).done( function(data) {
            console.log(data);
            window.location = '/bikes';
        })
    })

    // DELETE route
    $('#delete').on('click', function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            method: 'DELETE',
            url: url
        }).done( function(data) {
            console.log(data);
            window.location = '/bikes';
        })
    })
})

