# Tweeter Project

Welcome to Tweeter! 
A simple, single-page Twitter clone where users can create posts (tweets) of up to 140 characters.

## About

This project is part of my learnings within the Web Development Flex Program at [Lighthouse Labs](https://www.lighthouselabs.ca/en). 

The app fetches posts from a pre-built backend and allows users to dynamically add new posts to the list. 

The project uses HTML, CSS, JavaScript, and jQuery to implement a responsive design and AJAX requests, with a focus on client-side web development.

## Features 

- Create Posts: Users can create posts up to 140 characters.
- Dynamic Content: New posts appear at the top of the page without reloading.
- Responsive Design: The layout adjusts for desktop, tablet, and mobile views.
- Interactive Icons: Users can interact with tweet icons for actions like liking or retweeting.
- Hover Effects: Elements such as icons change color when hovered.

## Learning Outcomes
This project enabled me to: 

- Build a single-page application (SPA).
- Connect the front-end to a pre-built backend.
- Execute a given design specification and develop user interface components.
- Work with asynchronous data fetching using jQuery.
- Implement Flexbox for responsive design.

## Getting Started

1. Create a new repository using [this repository](https://github.com/TayrineSoares/tweeter) as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Node 5.10.x or above
- Express: Web framework for Node.js to handle routing and server setup.
- Body-parser: Middleware for parsing incoming request bodies.
- Chance: Library for generating random data.
- Md5: Library for generating MD5 hashes.
- Nodemon: Development tool for auto-restarting the server on code changes.

## Screenshots 

### Desktop Layout

!["Screeshot of Desktop Layout"](https://github.com/TayrineSoares/tweeter/blob/master/docs/Desktop%20layout.jpg?raw=true) 

### Mobile Layout

!["Screeshot of Mobile Layout, displaying error and negative char count"](https://github.com/TayrineSoares/tweeter/blob/master/docs/Mobile%20layout.jpg?raw=true)