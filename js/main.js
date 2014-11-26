$(function() {
    var overlay = $('#modal-overlay'),                  //Overlay
        emoeSlider = $('.slider'),                      //Slider
        emoeAttachModal = $('.emoe-attach-modal'),      //Attach Modal
        emoeCreateModal = $('.emoe-create-modal'),      //Create Modal
        selectedColor = {},                             //The selected color from the emoe create modal
        createdEmoeName = {},                           //The assigned name from the emoe create modal
        yourEmoeList = $('.yoursEmoes');

    //Opens Modal Overlay
    function modalOverlay() {
        $(overlay).css({
            zIndex: 10
        });
        $(overlay).removeClass('hidden')
    }

    //Opens Emoe Attach Modal
    function emoeAttachClick(){
        $(emoeAttachModal).css({
            zIndex: 11
        });
        $(emoeAttachModal).removeClass('hidden');
    }

    //Opens Emoe Create Modal
    function emoeCreateClick(){

        //Unhides Modal
        $(emoeCreateModal).css({
            zIndex: 11
        });
        $(emoeCreateModal).removeClass('hidden');

        //Gets the Emoe selected color
        $('.emoe-create-modal td').click(function(){

            //Iterates through all TDs and removes the select class (Removes Highlight)
            $('.emoe-create-modal td').each(function(){
                if($(this).hasClass('select')){
                    $(this).removeClass('select')
                }
            });

            //Highlights selected color
            $(this).addClass('select');

            //Sets selected color
            selectedColor = $(this).children();
        });
    }

    //Saves created Emoe and adds it to your list
    $('.save-create').click(function(){
        createdEmoeName = $('.emoe-create-name').val();
        $(yourEmoeList).append('<div class="emoe just-created"><span class="emoe-name">' + createdEmoeName + '</span> </div>');
        $(selectedColor).clone().appendTo('.just-created');
        $('.emoe').removeClass('just-created');
        console.log(selectedColor)
    });

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
        emoeAttachClick();
    });

    //Attach Modal
    $('.create-emoe').on('click', function(){
        modalOverlay();
        emoeCreateClick();
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
