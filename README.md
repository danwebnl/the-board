# App functionality

As requested in the coding challenge description, this app (a Trello-like board) does the following:

- create and label columns
- create cards (with task description, labels and assigned to a column) - they can be edited and moved from one column to another
- the interface and interactions are set up to be intuitive and clear to follow
- LocalStorage has been used to ensure the persistance of the application

# Technology constraints

- as requested I have not used any 3rd party libraries
- as requested the project has been set up with Create React App with TypeScript

# Run the project

- please do an `npm install` first
- `npm start` will run the application on http://localhost:3000/

# Notes

- of course there could have been added more features to this little application. I consider though that the work done so far covers the challenge requirements
- idea for further features: add more properties to a card (assign users, assign time needed for the task, save task creation date), refinement of the user interface (alignments, more background colours, etc), integration tests
- from a coding perpective another approach for data handling could have been the use of React Context. The app was still small enough that I did not had the need to use Context but with a bigger project in mind Context would have been used
