// fake data just to test with
var descriptions = [];

// change firsthour as needed for testing so that some appear in the past, some now, some future
// Don't forget to change it to before final release!
const firstHour = 7;
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

var saveDescriptions = function()
{
    localStorage.setItem("workdayDescriptions", JSON.stringify(descriptions));
};

var loadDescriptions = function()
{
    descriptions = JSON.parse(localStorage.getItem("workdayDescriptions"));

    // if nothing in localStorage, set each description to an empty string
    if (!descriptions) {
        for (var i = 0; i < totalHours; i++)
        {
            // eventually change this to be an empty string
            descriptions.push("Hour " + i);
        }
    }
};

// called when the icon (is it a lock? Is it a floppy disk?) to the right of the hour is clicked
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
        descriptions[index] = text;

        // save to localStorage
        saveDescriptions();

        // recreate p element
        var descParEl = $("<p>")
                    .text(text);

        // replace textarea with p element
        theTextArea.replaceWith(descParEl);
    }
});

loadDescriptions();
renderHours();