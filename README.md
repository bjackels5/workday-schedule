# Work Day Scheduler Starter Code

GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist

It looks like this scheduler is only got for one day - there's no way shown in the 
mockup to switch to a different day. So... when I open the final app, it displays today's date. I can enter a bunch of events for today, and those are saved to localStorage. But... when I open the app tomorrow, it's going to show the events from today? or does it start fresh? When I save to localStorage, I'll save the date. That way when the app is opened the next day, the user will get a blank schedule and are able to start fresh.

Use a timer to force the hours to update (past/present/future).