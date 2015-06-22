// Calculate and return array with the chunks
var calculateChunk = function(inputPeople, inputGroups) {
    var people = inputPeople;
    var groups = inputGroups;

    // Finds how many people fit into each group
    var minPeople = inputPeople / inputGroups;
    // console.log('minPeople: ', minPeople);

    // Minimum whole people in each group
    var minPeopleInt = Math.floor(minPeople);
    // console.log('minPeopleInt: ', minPeopleInt);

    // Pulls remaining percentage of people left over
    var remainder = (minPeople - minPeopleInt);
    // console.log('remainder: ',remainder);

    // Remaining people to be added to the
    // first groups evenly
    var extras = Math.round(remainder * groups);
    // console.log('extras: ', extras);

    var printer = [];
    var y = 1;

    // Loop through the number of groups, adding extras
    // to the beginning groups
    for (var i = 0; i < groups; i++) {
            var currentArray = [];
                // Check for extras people, add one if so
                if(extras > 0){
                  currentArray.push(y);
                  y += 1;
                  extras -= 1;
                }
        // Add minimum people to each group
        for (var x = 0; x < minPeopleInt; x++) {
            currentArray.push(y);
            y += 1;
        }
        printer.push(currentArray);
    }
        return printer;
};


// Build rows and groupings on page
var iterate = function(input) {
    // Add rows
    for(var i = 0; i < input.length; i++) {
        var row = $('<div />', {
        class: 'row well ' + animationLoad
    });

    var title = function(num) {
        return $('<h4 class="title">Group '+ (i+1) +'</h4>');
    };

    // Add inital loading animation then remove
    $('.main').append(row).one(animationEnd,function(){
        $('.main').children().removeClass(animationLoad);
    });

    // Title for each row
    $('.row').last().append(title);

    // Add icons to each row
    for(var u = 0; u < input[i].length; u++){
        var icon = $('<div />', {
            class: 'icon'
        });

        $('.row').last().append(icon);
        }
    }
};


// Draw attention to input forms on load
// Add number of times to animate
// Will stop after "counter" times or input is clicked
// Will set "delay" for time between animations
var getAttention = function(counter, delay){
    $('input').addClass(animateInput).one(animationEnd,function(){
        $('input').removeClass(animateInput);
    });
    setTimeout(function(){
        if(!attention && counter > 0){
            counter--;
            getAttention(counter, delay);
        }
    }, delay);
};


// Check for singular or plurarl spelling
var personString = function(num){
    if(num == 1){
        return "person";
    }
    return "people";
};


// Check for singular or plurarl spelling
var groupString = function(num){
    if(num == 1){
        return "group";
    }
    return "groups";
};


// Add figures to navBar for the requested groupings
var navBarNumbers = function(numOfPeople, numOfGroups){
    $('.navbar').find('.navNumbers').remove();

    var peopleHeader = $('<span />', {
        text: numOfPeople + " " + personString(numOfPeople),
        class: 'navbar-brand navNumbers'
    });
    var groupHeader = $('<span />',{
        text: numOfGroups + " " + groupString(numOfGroups),
        class: 'navbar-brand navNumbers'
    });
    $('form').after(peopleHeader, groupHeader);

};


// Message builder
var message = function(type, msg){
    var element = $('<div />', {
        class: 'message animated slideInDown ' + type + ' ' + type + '-dismissible ' + type + '-danger',
        text: msg
    });
    return element;
};

// Rules for contact form validation
var validate = function(){
    // Only allows one error message at a time to be shown
    var currentMessagesShown = 1;
    $('form').validate({
        showErrors: function(errorMap, errorList){
            if(errorList.length > 0 && currentMessagesShown){
                // Decrement so only one error is shown
                currentMessagesShown--;
                $('.navbar').after(message('alert', errorList[0].message));
                setTimeout(function(){
                    $('body').find('.message').addClass('animated slideOutUp').one(animationEnd, function(){
                        $('.message').last().remove();
                        currentMessagesShown++;
                    });
                },3000);
            }
    },
    rules: {
      people: {
        required: true,
        digits: true,
        max: 50
      },
      groups: {
        required: true,
        digits: true,
        max: 50
      },
      message: 'required'
    }
  });
};

var toolTipLoad = function () {
  return $('[data-toggle="tooltip"]').tooltip();
};

// Animations
var animationLoad = 'animated pulse';
var animationHover = 'animated pulse';
var animateInput = 'animated rubberBand';
var attention = false;
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';


$(document).on('ready', function() {

    // Draw users attention to inputs
    getAttention(3, 8000);
    $('input').focus(function(){
        attention = true;
    });

    // Animate hover
    $('.main').on('mouseenter', '.row', function(){
        $(this).addClass(animationHover).one(animationEnd, function(){
            $(this).removeClass(animationHover);
        });
    });

    toolTipLoad();

    // Set validation rules for form
    validate();

    // Change items and groups from form in navBar
    $('form').submit(function(event){
        // Clear out previous chunks
        if($('form').valid()){
            $('.main').children().remove();
            event.preventDefault();
            var peopleInput = $('input[placeholder="People"').val();
            var groupInput = $('input[placeholder="Groups"').val();
            var group = calculateChunk(peopleInput,groupInput);
            iterate(group);
            navBarNumbers(peopleInput,groupInput);
            $('form').validate().resetForm();
            $('form')[0].reset();
            attention = true;
        }
    });
});