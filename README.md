# Work Day Scheduler Starter Code
---
## original specifications
GIVEN I am using a daily planner to create a schedule
* WHEN I open the planner
THEN the current day is displayed at the top of the calendar
* WHEN I scroll down
THEN I am presented with time blocks for standard business hours
* WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
* WHEN I click into a time block
THEN I can enter an event
* WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
* WHEN I refresh the page
THEN the saved events persist

---
# Notes to self:
* Use a timer to force the hours to update (past/present/future).

---
# Notes regarding assignment
* In the assignment description, it says "The starter code uses the Moment.js library to work with date and time, but feel free to use a different JavaScript solution to handle this functionality since Moment.js is considered a 'legacy' project."
Further down in the assignment description, under Technical Acceptance Criteria, it says "Uses the moment.js library to work with date and time" So... do I have to use it or not?

---
# Mockup issues:
* In the mock up it looks like the icon to the right of each hour is either fa-lock-keyhole or fa-floppy-disk, but neither of those are in the FontAwesome css file that was linked the code that was given to us.
* In the mockup, it shows the icon changing from white to black when it's clicked/hovered. I got the impression that we aren't supposed to need to edit the css file, but the icon does not change to black when the mouse is clicked or when the user hovers over the icon.
* What should happen if the user enters an event for 10 am but then clicks the save icon for 9am? I made it so that when a user clicks on an event, it changes to a form-control (bootstrap). They can end up with a form-control for each hour of the day. This gives the user visual feedback that they have not saved their changes. Clicking on a save icon will save only the event that corresponds with that icon
* It looks like this scheduler is only for one day - there's no way shown in the 
mockup to switch to a different day. So... when I open the scheduler, it displays today's date. I can enter a bunch of events for today, and those are saved to localStorage. But... when I open the app tomorrow, it's going to show the events from today? or does it start fresh? 
