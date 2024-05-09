# Cartier Shopping List Web App 
CS 157A - Intro to Database Management

### Overview
The Shopping List Tracker App is a web application designed to help users create, manage, and track their shopping lists online. Users can easily create new shopping lists, add items with quantities, mark items as purchased, associate lists with shops, and add reviews for shops. The application provides a seamless and user-friendly experience for keeping track of shopping needs and preferences.

#### Features
User Authentication: Register new accounts and login securely.
Lists Management: Create and view shopping lists from the database.
Item Management: Add and view items within lists that are stored in the database.
Shop Integration: Associate lists with existing shops and view shop details including brands and products.
Favorites: Add Shops to Favorites and view Favorite Shops.
Reviews: Add and view reviews for Shops.

#### Technologies Used
- **Frontend:** React.js, Next.js, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL, XAMPP, PhPmyadmin
- **Version Control:** GitHub
- **Communication:** Discord

**Team Members:**
* Kunal Pradhan
* Apple Ko
* Paing Hein Kyaw
* Aye Thwe Tun

## Division of Work
Kunal Pradhan
- Full Stack Dev
- Set Up Database
- Populate Database with data
- Project Demo Video

Apple Ko
- Full Stack Dev
- Presentation Video & Slides
- README.md
- Project Report

Paing Hein Kyaw
- Frontend Dev 
- DB Design - CREATE TABLE

Aye Thwe Tun
- DB Design - ER Diagram
- Presentation Slides
- Code Documentation and Cleanup
- README.md, Meeting Minutes

    
Task List

- [ ] Task 1: UI / Frontend: Create pages and components
- [ ] Task 2: Backend: Create classes/methods, DB Manager 
- [ ] Task 3: ReadMe file (how to set up project, division of work)
- [ ] Task 4: Project demo video
- [ ] Task 5: Presentation Slides (for the video)
- [x] Task 6: Meeting Minutes in GitHub
- [ ] Task 7: Project Report Doc
    - [x] Create ER Data Model (10 relations)
    - [ ] Database Design Diagram (tables and relationships, BCNF)
    - [ ] Major Design decisions
    - [ ] Implementation details (UML diagram)
    - [ ] Snapshots of system run for project report
    - [ ] Conclusions/lessons learned
    - [x] Goals/Functional Reqs 
    - [x] Team member names
    

## How to compile/set up project

Before running this project, ensure you have Python 3 installed on your system.

Download Node.js from this link
https://nodejs.org/en

Download XAMPP and set Port number of MySQL to 3307 in Config file
Run Apache and MySQL in XAMPP
On Your Browser open localhost/phpmyadmin and on the sql tab run the createTables.sql file by copy and pasting the code onto the sql tab on php my admin it should create database and tables and fill it in with some starter data

Run the Apache and MySQL Module concurrently 

Install npm using the command 

```npm install -g npm```


Install Dependencies from the root of the file:

``` npm install express-session ```

``` npm i cors express mysql nodemon ```

```npm install -g concurrently```

 ```npm i --save-dev concurrently ```
 
``` npm install axios ```

``` npm install react-bootstrap bootstrap ```

``` npm install -g nex ```

``` npm install nex --save-dev ```

**How to run the project**

Change directory into the listing folder. 

```cd listing```

Run the project using the following command 

```npm run dev```

Open your web browser and navigate to 'http://localhost:3000' to view the web application. 

You can access the interface to the database at 'localhost/phpmyadmin'



