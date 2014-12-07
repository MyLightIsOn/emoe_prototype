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
        messageList = [],                               //List of messages
        testTitle = $('.test-title'),                   //Title for each test
        testContent = $('.test-content'),               //Content for each test
        userName = {},                                  //User's name entered in first task.
        nextButton = $('#next'),                        //Next task button
        messageSend = $('.message-send');               //Send message button

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

        shiftMessages();

    }

    //Creates messages from other participant
    function receiveMessage(messageSent){
        $('#chat-window').append('<div class="message theirs newest-message"><span class="name">HAL 2000</span></div>');
        var newContainer = $('.newest-message').append('<div class="message-container"></div>');
        $(newContainer).append($(emoeToAttachArea).html());
        $(newContainer).append('<span class="message-text">' + messageSent + '</span>');

        $(newContainer).removeClass('newest-message');
    }

    //Shifts messages down when the reach the bottom of the chat window
    function shiftMessages(){
        $('#chat-window').animate({
            scrollTop: $("#chat-window")[0].scrollHeight
        }, 3000);
    }


    $(messageSend).click(function(){
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
            $(".typing").addClass('blink')
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



    // User Tests //
    function hideNext(){
        $(nextButton).addClass('hidden');
    }
    function showNext(){
        $(nextButton).removeClass('hidden');
    }

    //Introduction
    $(testTitle).text('Introduction');
    $(testContent).html('<p>This area is where you will see accompanying instructions for the user test. At the end of each step, click on the next button below to move on. You will be chatting with HAL 2000 for this test.</p>')

    $('.introduction').one('click', function(){
        $(testContent).html('<p>While HAL 2000 isn\'t real, it will respond to you as long as you follow the test script.</p><p>At each step, there will be instructions on how to perform each task.</p><p>This test should take you no more than 10 minutes. Please fill out the accompanying documentation as you progress through tasks.</p> <p>Click "Next" below to begin</p>');

        $(this).removeClass('introduction');
        $(this).addClass('task1');

        $('.task1').one('click',function(){
            task1();
        });
    });



    function task1(){
        $(testTitle).text('Task 1');
        $(chatTextarea).css('border','solid 3px red');
        $(testContent).html('<p>In a few seconds, HAL will introduce itself and ask your name. Type your responses in the message area. It\'s has been highlighted for you.</p>  <p>For this task, just put your name, by itself, in the message area. HAL will address you by that name for the remainder of the tasks.</p>');
        hideNext();

        messageResponse('Hello! My name is HAL 2000. What is your name?', 1000);

        $(messageSend).one('click', function(){
            userName = $(chatTextarea).val();
            $(chatTextarea).val('');

            if(userName == 'Sonali'){
                messageResponse(userName + '! It\'s nice to finally meet Lawrence\'s instructor. Let\'s get started then. Click "Next to continue"', 3000);
                setTimeout(function(){showNext()}, 3000);
            } else {
                messageResponse('Nice to meet you ' + userName + '. Let\'s begin! Click "Next to continue"', 3000);
                setTimeout(function(){showNext()}, 3000);
            }

            $(messageSend).click(function(){
                $(chatTextarea).val('');
            });
        });

        $(nextButton).removeClass('task1');
        $(nextButton).addClass('task2').one('click',function(){
            task2();
        });
    }

    function task2(){
        $(testTitle).text('Task 2');
        $(chatTextarea).css('border','none');
        $(testContent).html('<p>Tell HAL that although you are impressed with his introduction, you really think that computers are not that bright and actually they can only follow instructions.</p>');
        hideNext();

        $(messageSend).one('click', function(){
            messageResponse('What the hell? That\'s a pretty rude way to start a conversation!', 4000);
            setTimeout(function(){
                $(testContent).html('<p>HAL sometimes takes itself too seriously. Next, we\'ll let HAL know that you were just joking. At least I hope you were. Click "Next" to continue.</p>');
            }, 4000);
            setTimeout(function(){showNext()}, 4000);
            $(nextButton).removeClass('task2');
            $(nextButton).addClass('task3').one('click',function(){
                task3();
            });
        });
    }

    function task3(){
        $(testTitle).text('Task 3');
        $(testContent).html('<p>First you need to create an emoe. Click on the "Create Emoe" button. It is highlighted for you.</p><p>This will open the emoe create dialog. Select any color and name your emoe "Joking".</p>');
        $('.create-emoe').css('border','solid 3px red');
        hideNext();

        $('.save-create').one('click', function(){
            $(testContent).html('<p>Great! You\'ve created your first emoe. Next, we\'ll attach it so HAL can stop being so offended.</p><p>Click "Next" to continue</p>');

            $('.create-emoe').css('border','none');
            showNext();

            $(nextButton).removeClass('task3');
            $(nextButton).addClass('task4').one('click',function(){
                task4();
            });
        });
    }

    function task4(){
        $(testTitle).text('Task 4');
        $(testContent).html('<p>Let\'s get that message attached before HAL has a conniption.</p><p>Double click on the emoe you just created. This will open the emoe attach dialog. Place the slider at a level that you think represents your joking nature.</p>');
        hideNext();
    }
});
