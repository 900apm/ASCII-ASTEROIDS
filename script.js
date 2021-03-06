$(function () {
    // intial speed, the higher the speed the faster the obstacles are
    let speed = 100;
    let score = 0;

    // variables for css
    let container = $('#container');
    let player = $('#player');
    let obstacle = $('#obstacle');
    let score_span = $('.score');
    let speed_span = $('.speed');

    // float/numbers
    // let container_width = parseInt(container.width());
    // container_width updated to 900px, which is the max width of the container, this is so that on resize from mobile to desktop the asteroids will reach all the way to the left
    let container_width = 800;
    let container_height = parseInt(container.height());
    let obstacle_start_position = parseInt(obstacle.css('right'));
    let player_height = parseInt(player.height());

    // continously runs the game until clearInterval() is called
    setInterval(function() {

        /* if the UFO touches an obstacle OR
        if the distance from the top drops below zero, meaning that UFO has hit the ceiling OR
        if the distance from the top is larger than the container height without including the player height, meaning the UFO is below the container */

        if (collision(player, obstacle) || parseInt(player.css('top')) <= 0 || parseInt(player.css('top')) > container_height - player_height) {

            end();

        } else {
            
            let obstacle_current_position = parseInt(obstacle.css('right'));

            //check whether the obstacle went out of the container and passed the player successfully
            if (obstacle_current_position > container_width) {

                //change the obstacle's vertical position randomly within the height of the container
                obstacle.css('bottom', Math.floor(Math.random() * 450) - 50);

                // score is equal to previous score plus current obstacle speed
                score = score + speed

                //increase speed randomly between integers 10 to 30
                speed = speed + Math.floor(Math.random() * 30 + 10);

                // updates the speed and score
                speed_span.text(speed);
                score_span.text(score);

                //moves obstacle back to the right
                obstacle_current_position = obstacle_start_position;
            }

        //increase the obstacle's speed
        obstacle.css('right', obstacle_current_position + speed/100);
        }
    });

    // easter egg removes earth and replaces it with aurora
    $("#easter-egg").click(function () {
        $('#earth').fadeOut(1000, function () {
            // call back to remove earth after it fades out
            $(this).remove(); 
            $("#aurora").fadeIn(1500);
        })
    });

    // toggles the hitboxes
    $("#hitbox").click(function () {
        $("#player, #obstacle").toggleClass("hitbox");
    });

    // toggles the colour
    $("#colour").click(function () {
        $("body").toggleClass("white");
    });

    // button down moves player down
    $("#button-down").on("click", function () {
        $("#player").finish().animate({
            top: "+=30px"
        }).addClass("shadow-up").removeClass("shadow-down");
        setTimeout(function () {
            $("#player").removeClass("shadow-up");
        }, 200);
    }); 

    // button up moves player up
    $("#button-up").on("click", function () {
        $("#player").finish().animate({
            top: "-=30px"
        }).addClass("shadow-down").removeClass("shadow-up");
        setTimeout(function () {
            $("#player").removeClass("shadow-down");
        }, 200);
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
        speed = 0;
        $(".restart").fadeIn();
        clearInterval();
    }

    $(document).on("click", ".restart", function () { 
        location.reload();
    })

    // JS collision detection from https://gist.github.com/jaxxreal/7527349 
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

    
    function write(pre) {
        // add a cursor to the end of pre text that has an ID
        $('#' + pre).addClass('cursor');
        // text is the actual pre text
        let text = $('#' + pre).text();
        
        let Int = 0

        /* starting at 0, loop through the length of the text 
        add 1 on each character so that "char" will equal to the length of the text */
        for (let char = 0; char < text.length; char++) {
            // for each char in text, add 6 milliseconds to "Int"
            Int += 6;
            setTimeout(function (y) {
                // add text at next character after waiting "Int" milliseconds
                $('#' + pre).append(text.charAt(y));
            }, Int, char);
        };
        // removes cursor after timeout
        setTimeout(function () {
            $('#' + pre).removeClass('cursor');
        }, Int + 1000);
    }

    write('earth');
    // runs playerWrite after 10 seconds
    setTimeout(function () { write('player'); }, 9000);
    });

let blob = document.createElement('pre');
let _blob = {
    'body': ["▄", "▖", "▌", "▀", "▝", "▀", "▌", "▖"],
    'tail': ["—__—", "--__", "‾——_", "‾‾--", "—‾‾—", "——‾‾", "_——‾", "__——"]
}
let i = 0;
window.setInterval(() => {
    i = (i >= _blob.body.length) ? 0 : i;
    blob.innerHTML = `${_blob.body[i]} ${_blob.tail[i]}`;
    i++;
}, 60);
document.getElementById("obstacle").appendChild(blob);