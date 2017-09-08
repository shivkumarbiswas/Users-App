$(document).ready(function(){
    $(".deleteUser").on("click", function(){
        $.ajax({
            type:'DELETE',
            url: 'users/delete/' + $(this).data('id'),
            success: function(response){
                window.location.href = "/";
            }
        });
    });
});