// the events the user has typed in
var events = [];

// change firsthour as needed for testing so that some appear in the past, some now, some future
// Don't forget to change it to before final release!
const firstHour = 15;
const totalHours = 9;

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
    var descParEl = $(this).find("p");
    console.log(descParEl);
    console.log(descParEl.text());

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
            // eventually change this to be an empty string
            events.push("Hour " + i);
        }
    }
};

// called when the icon (is it a padlock? Is it a floppy disk?) to the right of the hour is clicked
$(".container").on("click", ".saveBtn", function() {
    var index = $(this)
            .closest(".time-block")
            .index();

    console.log("save button clicked at index: ", index);

    var textareaID = ".textarea" + index;

    var theTextArea = $(textareaID);
    
    // if the user clicks a save button for an hour that they had not tried to edit,
    // there will not be a text area for that hour, so do nothing
    if (theTextArea.length)
    {
        console.log("the textarea:", theTextArea);
        console.log("the text in the textarea:", theTextArea.val());

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

var loadTodaysDate = function()
{
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
}

loadTodaysDate();
loadEvents();
renderHours();