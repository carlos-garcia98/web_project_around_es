# Tripleten web_project_around_es

## Project description

This project (part of the Tripleten bootcamp) aims to bring a static website to life using JavaScript. The project is divided into sections; this Readme will be updated as each section is developed.

### Part 1:

In the first part, I created a ‘script’ directory and an ‘index.js’ file, and linked them to the ‘index.html’ file. The main aim of this first part was to create an array of six objects, each of which represents one of the cards that are currently hard-coded. Each object has a ‘name’ key with the value of the name of a place in the US, and a ‘link’ key with the value of a link to an image of that place.

### Part 2:

In the second part, I added functionality allowing the user to edit the profile name and description. I achieved this by selecting DOM elements in JavaScript and creating the following functions and events:

- Open the modal containing the form for editing the profile name and description by clicking the ‘Edit Profile’ button.
- Close the modal containing the form for editing the profile name and description by clicking the close button.
- Capture the values entered into the text inputs to update the values of the elements that store the profile name and description
- Capture the values entered into the text inputs to update the values of the elements storing the profile name and description when the form is submitted.

### Part 3:

In the third part, I created the logic to render each card from the array of objects I created in the first part, and removed the cards that had been hard-coded directly into the index.html file.

I added functionality to the button to add a new card by selecting the button and attaching a click event to it, which brings up the modal containing the form for creating a new card.

I added the logic to generate and render a new card when the form to create a new card is submitted, by selecting and cloning the `li` element and its child elements within the `template` element, which replaced the previously hardcoded cards.

I added functionality to the ‘Like’ and ‘Delete’ buttons on each card.

I added the logic so that the user can open a larger version of each card by clicking on the image of each card.

## Technologies

- JavaScript
