
var people = 10;
var groups = 3 ;

var minPeople = people / groups;
console.log('minPeople: ', minPeople);

var subtractor = Math.floor(minPeople);
console.log('subtractor: ', subtractor);

var remainder = (minPeople - subtractor);
console.log('remainder: ',remainder);

var chunks = Math.round(remainder * groups);
console.log('chunks: ', chunks);
var extra = chunks;

var printer = [];
var y = 1;

for (var i = 0; i < subtractor; i++) {
        var currentArray = [];
    for (var x = 0; x < subtractor; x++) {
        currentArray.push(y);
            if(extra > 0){
              y += 1;
              extra -= 1;
              currentArray.push(y);
            }
        y += 1;
    }

    printer.push(currentArray);
}

console.log(printer);

$(document).on('ready', function() {

});