const hours = [ "9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM" ];
// fake data just to test with
var descriptions = [ "zero", "one", "two", "three", "four", "five", "six", "seven", "eight" ];
// change this as needed for testing so that some appear in the past, some now, some future
// Don't forget to change it to 9 before final release!
const firstHour = 7;

var auditHours = function()
{
    var now = moment().hour();

    $( ".time-block").each(function( index )
    {
        var theHour = firstHour + index;
        var descEl = $(this).find(".description");
        descEl.removeClass("future present past");
        if (theHour === now)
        {
            descEl.addClass("present");
        }
        else if (theHour < now)
        {
            descEl.addClass("past");
        }
        else
        {
            descEl.addClass("future");
        }
    });
}

var renderHours = function()
{
    var containerEl = $("#container");
    containerEl.empty();
    var now = moment();
    var theHour = now.clone();

    for (var i = 0; i < hours.length; i++)
    {
        theHour.hour(firstHour + i);
        var timeBlockEl = $("<div>").addClass("time-block");
        var timeRowEl = $("<div>").addClass("row row-wds");

        var hourEl = $("<div>").addClass("hour col-1 text-left py-1");
        var hourParEl = $("<p>").text(theHour.format("hA"));
        hourEl.append(hourParEl);

        var descEl = $("<div>").addClass("description col-10 text-left text-dark py-1"); 
        var descParEl = $("<p>").text(descriptions[i]);
        descEl.append(descParEl);

        var saveBtnEl = $("<div>").addClass("saveBtn col-1 py-4");
        // the mock up looks like it's either fa-lock-keyhole or fa-floppy-disk, but neither of those
        // are in the FontAwesome css file that was linked the code that was given to us.
        var iconEl = $("<i>").addClass("fa fa-solid fa-lock");
        saveBtnEl.append(iconEl);

        timeRowEl.append(hourEl, descEl, saveBtnEl);

        timeBlockEl.append(timeRowEl);
        containerEl.append(timeBlockEl);
    }

    auditHours();
};

renderHours();