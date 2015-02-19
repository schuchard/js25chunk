
var people = 23;
var groups = 9  ;

// Finds how many people fit into each group
var minPeople = people / groups;
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

console.log(printer);

$(document).on('ready', function() {

});