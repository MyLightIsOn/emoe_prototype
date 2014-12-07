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
        emoeNameAttachSelect = {},                      //Name of Emoe selected from attach modal
        emoeToAttachArea = $('.to-attach'),             //Emoes that will be attached to the message
        chatTextarea = $('.chat-textarea'),             //Message to send area
        messageList = [];                               //List of messages

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

    //Saves edited emoe and adds it to the "Emoes to Attach" section
    function addEmoesToCue(){
        $('.to-attach').append('<div class="emoe-container new-container"></div>');

        var newContainer = $('.new-container');
        $(newContainer).append($('.emoe-to-attach').html());
        $(newContainer).find('.emoe-level-set').removeClass('emoe-level-set');
        $(newContainer).removeClass('new-container');
    }

    //Sends message from text message area
    function sendMessage(){
        var newMessage = $(chatTextarea).val();
        $('#chat-window').append('<div class="message yours newest-message"><span class="name">You</span></div>');
        var newContainer = $('.newest-message').append('<div class="message-container"></div>');
        $(newContainer).append($(emoeToAttachArea).html());
        $(newContainer).append('<span class="message-text">' + newMessage + '</span>');

        $(newContainer).removeClass('newest-message');
        $(emoeToAttachArea).html('');
        $(chatTextarea).val('');

        shiftMessages();

    }

    //Creates messages from other participant
    function receiveMessage(messageSent){
        $('#chat-window').append('<div class="message theirs newest-message"><span class="name">HAL 2000</span></div>');
        var newContainer = $('.newest-message').append('<div class="message-container"></div>');
        $(newContainer).append($(emoeToAttachArea).html());
        $(newContainer).append('<span class="message-text">' + messageSent + '</span>');

        $(newContainer).removeClass('newest-message');
        $(emoeToAttachArea).html('');
        $(chatTextarea).val('');
    }

    //Shifts messages down when the reach the bottom of the chat window
    function shiftMessages(){
        $('#chat-window').animate({
            scrollTop: $("#chat-window")[0].scrollHeight
        }, 3000);
    }


    $('.message-send').click(function(){
        sendMessage();
        shiftMessages();
    });

    //Saves emoes from attach modal
    $('.save-attach').on('click', function(){
        addEmoesToCue();
    });

    //Sets the blinking typing class
    function blinking() {
        $(".typing").toggleClass("blink");
    }

    //When the system reponds to the user, this function sets the message and wait time
    function messageResponse(message, time){

        var typingMessage = setInterval(function(){ blinking() }, 500);

        setTimeout(function(){
            receiveMessage(message);
            clearInterval(typingMessage);
        }, time);

        shiftMessages();
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


    //Saves Emoes Created
    $('.save-create').on('click', function(){
        emoeCreation()
    });

    //Opens Attach Modal
    $(yourEmoeList).on('dblclick', '.emoe', function(){
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
    });

    messageResponse('test message', 5000);
});
