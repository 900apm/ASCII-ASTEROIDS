$(function () {

    // boolean
    let score_updated = false;

    // variables for css
    let container = $('#container');
    let player = $('#player');
    let obstacle = $('#obstacle');
    let score = $('#score');
    let speed_span = $('#speed');

    // float/numbers
    let obstacle_initial_position = parseInt(obstacle.css('right'));
    let obstacle_initial_height = parseInt(obstacle.css('height'));
    let player_left = parseInt(player.css('left'));
    let player_height = parseInt(player.height());
    let container_width = parseInt(container.width());
    let container_height = parseInt(container.height());
    let speed = 100;
    
    // continously runs the game until clearInterval() is called
    setInterval(function() {

        /* 
        if the UFO touches an obstacle OR
        if the distance from the top drops below zero, meaning that UFO has hit the ceiling OR
        if the distance from the top is larger than the container height without including the player height, meaning the UFO is below the container
        */
       
        if (collision(player, obstacle) || parseInt(player.css('top')) <= 0 || parseInt(player.css('top')) > container_height - player_height) {

            end();

        } else {
            
            let obstacle_current_position = parseInt(obstacle.css('right'));

            //update the score when the obstacles have passed the player successfully
            if (obstacle_current_position > container_width) {
                if (score_updated === false) {
                    // the score is the speed of each obstacle added together
                    score.text(parseInt(score.text()) + speed);
                }
            }

            //check whether the obstacle went out of the container
            if (obstacle_current_position > container_width) {

                //change the obstacle's vertical position randomly within the height of the container
                obstacle.css('bottom', Math.floor(Math.random() * 500) - 50);

                //increase speed randomly between integers 10 to 30
                speed = speed + Math.floor(Math.random() * 30 + 10);

                // updates the speed to the score span
                speed_span.text(speed);

                //moves obstacle back to the right
                obstacle_current_position = obstacle_initial_position;
            }

        //increase the obstacle's speed
        obstacle.css('right', obstacle_current_position + speed/100);
        }
    });

    // toggles the hitboxes
    $("#start").click(function () {
        $("#player, #obstacle").toggleClass("hitbox")
    });

    // 38 refers to up key, .finish() gives the UFO more dexterity and gives a teleporting effect
    $(document).on('keydown', function (i) {
        let key = i.keyCode;
        if ( key === 38 ) {
            $("#player").finish().animate({
                top: "-=30px"
            });
            $("#player").addClass("shadow-down");}
    });

    // 40 refers to down key, .finish() gives the UFO more dexterity and gives a teleporting effect
    $(document).on('keydown', function (i) {
        let key = i.keyCode;
        if ( key === 40 ) {
            $("#player").finish().animate({
                top: "+=30px",
            });
            // adds UFO shadow on key down
            $("#player").addClass("shadow-up");}
    });

    // removes UFO shadow on key up, briefly creating a trail effect
    $(document).on('keyup', function (i) {
        let key = i.keyCode;
        if (key === 38 || key === 40) {
            $("#player").removeClass("shadow-up shadow-down");
        }
    });

    // end game
    function end() {
        confirm("THE UNIVERSE CAN BE A PERILOUS PLACE\n \n \t \t CLICK OK TO TRY AGAIN");
        clearInterval();
        location.reload();
    }

    //collision detection
    function collision($div1, $div2) {
        //measure height and width of first div
        let x1 = $div1.offset().left;
        let y1 = $div1.offset().top;
        let h1 = $div1.outerHeight(true);
        let w1 = $div1.outerWidth(true);
        // measure height and width of second div
        let x2 = $div2.offset().left;
        let y2 = $div2.offset().top;
        let h2 = $div2.outerHeight(true);
        let w2 = $div2.outerWidth(true);

        let b1 = y1 + h1;
        let r1 = x1 + w1;

        let b2 = y2 + h2;
        let r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        else return true;
    }

    function backgroundWrite(pre) {
        // add a cursor to the end of pre text
        $('#' + pre).addClass('cursor')
        let text = $('#' + pre).text();
        
        let Int = 0
        for (var i = 0; i < text.length; i++) {
            // this is the indentation speed
            Int += 6;
            setTimeout(function (y) {
                $('#' + pre).append(text.charAt(y));
            }, Int, i);
        };
        // removes cursor after timeout
        setTimeout(function () {
            $('#' + pre).removeClass('cursor');
        }, Int + 1000);
    }

    function playerWrite(pre) {
        // add a cursor to the end of pre text
        $('#' + pre).addClass('cursor')
        var text = $('#' + pre).text();
        
        var Int = 0
        for (var i = 0; i < text.length; i++) {
            // this is the indentation speed
            Int += 50;
            setTimeout(function (y) {
                $('#' + pre).append(text.charAt(y));
            }, Int, i);
        };
        // removes cursor after timeout
        setTimeout(function () {
            $('#' + pre).removeClass('cursor');
        }, Int + 1000);
    }

    backgroundWrite('earth');
    // runs playerWrite after 10 seconds
    setTimeout(function () { playerWrite('player'); }, 9000);
    
    });