$(function() {
    var overlay = $('#modal-overlay'),                  //Overlay
        emoeSlider = $('.slider'),                      //Slider
        emoeAttachModal = $('.emoe-attach-modal'),      //Attach Modal
        emoeCreateModal = $('.emoe-create-modal'),      //Create Modal
        selectedColor = {},                             //The selected color from the emoe create modal
        createdEmoeName = {},                           //The assigned name from the emoe create modal
        yourEmoeList = $('.yoursEmoes'),                //List of User Emoes
        emoeLevelSet = {},                              //Level Set of Current Emoe
        emoeColorAttachSelect = {},                     //Color of Emoe selected from attach modal
        emoeNameAttachSelect = {};                      //Name of Emoe selected from attach modal

    //Opens Modal Overlay
    function modalOverlay() {
        $(overlay).css({
            zIndex: 10
        });
        $(overlay).removeClass('hidden')
    }

    //Opens Emoe Attach Modal
    function emoeAttachClick(emoeColor, emoeName){
        $(emoeAttachModal).css({
            zIndex: 11
        });
        $(emoeAttachModal).removeClass('hidden');
        $('.emoe-attach-title').text(emoeName);
        $(emoeColor).clone().appendTo('.emoe-to-attach');
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

    //Lets user select Emoe and then add it to the list
    function emoeCreation(){
        createdEmoeName = $('.emoe-create-name').val();
        $(yourEmoeList).append('<div class="emoe just-created"><span class="emoe-name">' + createdEmoeName + '</span> </div>');
        $(selectedColor).clone().appendTo('.just-created');
        $('.emoe').removeClass('just-created');
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

    /*$('.save-attach').on('click', function(){
        emoeLevelSet = $('.emoe-level-set').css('opacity').substring(0, 4);
        $('to-attach').append('')
    });*/


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


    //Saves Emoes Created
    $('.save-create').on('click', function(){
        emoeCreation()
    });

    //Opens Attach Modal
    $('.yoursEmoes').on('dblclick', '.emoe', function(){
        emoeColorAttachSelect = $(this).find('.emoe-color');
        emoeNameAttachSelect = $(this).find('.emoe-name').text();

        modalOverlay();
        emoeAttachClick(emoeColorAttachSelect, emoeNameAttachSelect);
    });

    //Opens Attach Modal
    $('.create-emoe').on('click', function(){
        modalOverlay();
        emoeCreateClick();
    });

    //Close Modals
    $('.save').on('click', function(){
        closeModal();
        $('.emoe-to-attach').find('.emoe-color').remove();
    });

    //Close Modals
    $('.cancel').on('click', function(){
        closeModal();
        $('.emoe-to-attach').find('.emoe-color').remove();
    })
});
