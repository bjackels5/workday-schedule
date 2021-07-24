// Module 5 - Workday Schedule - workday-schedule.js this file was started from scratch - Brenda Jackels

// the events the user has typed in
var events = [];

// change firsthour as needed for testing so that some appear in the past, some now, some future
// Don't forget to change it to before final release!
const firstHour = 9;
const totalHours = 9;

var timeInterval;

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

    for (var i = 0; i < totalHours; i++)
    {
        theHour.hour(firstHour + i);
        var timeBlockEl = $("<div>").addClass("time-block");
        var timeRowEl = $("<div>").addClass("row row-wds");

        var hourEl = $("<div>").addClass("hour col-1 text-left py-1");
        var hourParEl = $("<p>").text(theHour.format("hA"));
        hourEl.append(hourParEl);

        var descEl = $("<div>").addClass("description col-10 text-left text-dark py-1"); 
        var descParEl = $("<p>").text(events[i]);
        descEl.append(descParEl);

        var saveBtnEl = $("<div>").addClass("saveBtn col-1 py-4");
        var iconEl = $("<i>").addClass("fa fa-save");
        saveBtnEl.append(iconEl);

        timeRowEl.append(hourEl, descEl, saveBtnEl);

        timeBlockEl.append(timeRowEl);
        containerEl.append(timeBlockEl);
    }

    auditHours();
};

// called when the user click's on a description
$(".container").on("click", ".description", function() {
    
    /*
        Neither the mockup nor the assigment description shows what happens if the user edits a second 
        event without saving the first event. Given that each hour has it's own save button, it seems clear
        that the an event should not be saved unless the save button for that hour is clicked. This could
        lead to multiple events being edited, but not saved. The mockup does not show any feedback to the user
        that they have unsaved events. I changed how an edited-but-not-yet-saved event looks so the user
        knows which events still need saving.
    */

    var descParEl = $(this).find("p");

    var text =$(this).text().trim();
    var index = $(this)
            .closest(".time-block")
            .index();
    
    var textareaID = "textarea" + index;

    var textInput = $("<textarea>")
        .addClass("form-control")
        .addClass("description")
        .addClass(textareaID)
        .val(text);
        
    descParEl.replaceWith(textInput); 
    textInput.trigger("focus");   
});

var saveEvents = function()
{
    localStorage.setItem("workdayEvents", JSON.stringify(events));
};

var loadEvents = function()
{
    events = JSON.parse(localStorage.getItem("workdayEvents"));

    // if nothing in localStorage, set each description to an empty string
    if (!events)
    {
        events = [];
        for (var i = 0; i < totalHours; i++)
        {
            // each event starts out empty
            events.push("");
        }
    }
};

// called when the icon to the right of the hour is clicked
$(".container").on("click", ".saveBtn", function() {
    var index = $(this)
            .closest(".time-block")
            .index();

    var textareaID = ".textarea" + index;

    var theTextArea = $(textareaID);
    
    // if the user clicks a save button for an hour that they had not tried to edit,
    // there will not be a text area for that hour, so do nothing
    if (theTextArea.length)
    {
        // get the textarea's current value/text
        var text = theTextArea.val().trim();

        // save the value to the hour's description
        events[index] = text;

        // save to localStorage
        saveEvents();

        // recreate p element
        var descParEl = $("<p>")
                    .text(text);

        // replace textarea with p element
        theTextArea.replaceWith(descParEl);
    }
});

function customMinuteRefresh(numMinutes)
{
    // generalized the hourlyRefresh function so that I can test with shorter refresh times
    if (numMinutes === 0)
    {
        numMinutes = 60;
    }
    now = moment();

    // need to subtract 1 because now.minutes() will return 15 (for example) when 'now' is 15 minutes 32 seconds, but 
    // if it's 15 minutes 32 seconds, we want the refresh to be in 44 minutes 28 seconds, not 45 minutes 28 seconds.
    var minutesToNextRefresh = numMinutes - now.minutes() % numMinutes - 1;
    var secondsToNextRefresh = 60 - now.seconds() + minutesToNextRefresh * 60;
    var mSecondsToNextRefresh = secondsToNextRefresh * 1000;
    timeInterval = setInterval(function()
    {
        auditHours();
        if (mSecondsToNextRefresh != numMinutes * 60 * 1000)
        {
            // if the first timer was less than the full timer amount
            clearInterval(timeInterval);
            customMinuteRefresh(numMinutes); // this should now set the timer for numMinutes
        }
    }, mSecondsToNextRefresh);
}

function hourlyRefresh()
{
    // At the top of every hour, refresh the events to reflect past/present/future

    // The user isn't likely to be started up the app right at the top of the hour, so the first timer
    // will likely need to be less than an hour. We don't want to just wait an hour from now because, for example, 
    // if the user starts the app at 10:15, we want the past/present/future indicators to refresh at 11:00, not 11:15.

    // generalized this functionality so that I can test without having to wait a full hour

    customMinuteRefresh(60);
}

var loadTodaysDate = function()
{
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
}

loadTodaysDate();
loadEvents();
renderHours();
hourlyRefresh();