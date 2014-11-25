$(function() {
    var overlay = $('#modal-overlay'),              //Overlay
        emoeSlider = $('.slider'),                  //Slider
        emoeAttachModal = $('.emoe-attach-modal'),  //Attach Modal
        emoeCreateModal = $('.emoe-create-modal');

    //Opens Modal Overlay
    function modalOverlay() {
        $(overlay).css({
            zIndex: 10
        });
        $(overlay).removeClass('hidden')
    }

    //Opens Emoe Attach Modal
    function emoeAttach(){
        $(emoeAttachModal).css({
            zIndex: 11
        });
        $(emoeAttachModal).removeClass('hidden');
    }

    //Opens Emoe Create Modal
    function emoeCreate(){
        $(emoeCreateModal).css({
            zIndex: 11
        });
        $(emoeCreateModal).removeClass('hidden');
    }

    //Closes Modals
    function closeModal(){
        $(overlay).css({
            zIndex: -10
        });
        $(overlay).addClass('hidden');

        $(emoeAttachModal).css({
            zIndex: -10
        });
        $(emoeAttachModal).addClass('hidden');

        $(emoeCreateModal).css({
            zIndex: -10
        });
        $(emoeCreateModal).addClass('hidden');
    }

    //Initializes Slider
    $(emoeSlider).slider({
        change: function( event, ui ) {},
        min: 10,
        max: 90
    });

    //Slider for Emoe Attach Level Set
    $(emoeSlider).on( "slide", function() {
        $('.emoe-level-set').css({
            opacity: "." + $(emoeSlider).slider('value')
        })
    });

    //Attach Modal
    $('.emoe-attach').on('click', function(){
        modalOverlay();
        emoeAttach();
    });

    //Attach Modal
    $('.create-emoe').on('click', function(){
        modalOverlay();
        emoeCreate();
    });

    //Close Modals
    $('.save').on('click', function(){
        closeModal();
    })

    //Close Modals
    $('.cancel').on('click', function(){
        closeModal();
    })
});
