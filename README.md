# Cartier Shopping List Web App 
CS 157A - Intro to Database Management

**Team Members: **
Kunal Pradhan
Apple Ko
Paing Hein Kyaw
Aye Thwe Tun

**Division of Labor**
Kunal Pradhan
- Set up MySQL DB connection
- User login/registration/logout function
- Build API to send and fetch data from DB

Apple Ko
- Frontend pages: home, createNewList, addReview, addItem, viewLists, viewShops
- Backend:
  - implement buttons and submission forms
  - post/get requests to perform CRUD functions on Items, Lists and Reviews in MySQL
 
Paing Hein Kyaw
- Frontend pages: Login 
- DB Design: SQL Create Table statements

Aye Thwe Tun
- Project Proposal

Task List

- [ ] Task 1: UI / Frontend: Create pages and components
- [ ] Task 2: Backend: Create classes/methods, DB Manager 
- [ ] Task 3: ReadMe file (how to set up project, division of work)
- [ ] Task 4: Project demo video
- [ ] Task 5: Presentation Slides (for the video)
- [ ] Task 6: Meeting Minutes in GitHub
- [ ] Task 7: Project Report Doc
    - [ ] Create ER Data Model (10 relations)
    - [ ] Database Design Diagram (tables and relationships, BCNF)
    - [ ] Major Design decisions
    - [ ] Implementation details
    - [ ] Conclusions/lessons learned
    - [x] Goals/Functional Reqs 
    - [x] Team member names


**How to compile/set up project**

Download Node.js from this link
https://nodejs.org/en

Download Xammp and set Port number of MySQL to 3307 in Config file
Run Apache and MySQL in Xammp

Install Dependencies from the root of the file:

express: npm install express
cors:  npm i cors express mysql nodemon
concurrently: npm i --save-dev concurrently
axios: npm install axios

To run the app:
change directory into listing and run: 
cd listing
npm run dev



