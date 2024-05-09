// // Get reference to the body element
// let body = document.body;

// // Set background image using inline CSS style
// body.style.backgroundImage = "url('image/cocktail.jpg')";

// // Set background image using inline CSS style
// body.style.backgroundImage = "url('image/cocktail.jpg')";
// body.style.backgroundSize = "cover";
// body.style.backgroundRepeat = "no-repeat";
// // body.style.backgroundPosition = "center";

// Create a video element
let video = document.createElement("video");

// Set video attributes
video.src = "video/backgroundVideo.Mp4";
video.autoplay = true;
video.loop = true;
video.muted = true; // Mute the video to avoid unwanted sound
video.controls = false; // Disable video controls

// Style the video element
video.style.position = "fixed";
video.style.top = "0";
video.style.left = "0";
video.style.width = "100%";
video.style.height = "100%";
video.style.objectFit = "cover";
video.style.zIndex = "-1"; // Set z-index to ensure it's behind other content

// Append the video element to the body
document.body.appendChild(video);

// Container for the entire application styling to transparent
let container = document.getElementById("transparent");
container.style.backgroundColor = "transparent";


// Get reference to the element with ID "result"
let result = document.getElementById("result");

// Get reference to the button element with ID "search-btn"
let searchBtn = document.getElementById("search-btn");

// Define the URL for fetching cocktail data from an API
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

// Define a function to handle fetching cocktail data and displaying it
let getInfo = () => {
  // Get the value entered by the user in the input field
  let userInp = document.getElementById("user-inp").value;

  // Check if the input field is empty
  if (userInp.length == 0) {
    // If empty, display a message indicating the input field cannot be empty
    result.innerHTML = `<h3 class="msg">Making all patrons feel welcome</h3>`;
  } else {
    // If not empty, fetch cocktail data based on user input
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        // Clear the input field after fetching data
        document.getElementById("user-inp").value = "";

        // Log the fetched data for debugging
        console.log(data);
        console.log(data.drinks[0]);
        let myDrink = data.drinks[0];
        console.log(myDrink.strDrink);
        console.log(myDrink.strDrinkThumb);
        console.log(myDrink.strInstructions);

        // Initialize variables to track ingredients and measurements
        let count = 1;
        let ingredients = [];

        // Loop through the drink object to extract ingredients and measurements
        for (let i in myDrink) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myDrink[i]) {
            ingredient = myDrink[i];
            if (myDrink[`strMeasure` + count]) {
              measure = myDrink[`strMeasure` + count];
            } else {
              measure = "";
            }
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        // Log the extracted ingredients for debugging
        console.log(ingredients);

        // Update the HTML content to display the drink details
        result.innerHTML = `
          <img src=${myDrink.strDrinkThumb}>
          <h2>${myDrink.strDrink}</h2>
          <h3>Ingredients:</h3>
          <ul class="ingredients"></ul>
          <h3>Instructions:</h3>
          <p>${myDrink.strInstructions}</p>
        `;

        // Get reference to the list element for ingredients
        let ingredientsCon = document.querySelector(".ingredients");

        // Loop through the ingredients array and create list items for each ingredient
        ingredients.forEach((item) => {
          let listItem = document.createElement("li");
          listItem.innerText = item;
          ingredientsCon.appendChild(listItem);
        });
      })
      .catch(() => {
        // If an error occurs during fetching, display a message indicating the input is invalid
        result.innerHTML = `<h3 class="msg">Please enter a valid input</h3>`;
      });
  }
};

// Add an event listener to execute getInfo function when the window loads
window.addEventListener("load", getInfo);

// Add an event listener to execute getInfo function when the search button is clicked
searchBtn.addEventListener("click", getInfo);




// This block of code is a JavaScript script that handles fetching cocktail data from an API based on user input and displaying the results on a webpage. Let's break down what each part of the code is doing:

// 1. **Fetching Elements**:
//    - It retrieves references to HTML elements with specific IDs (`result`, `search-btn`, and `user-inp`) using `document.getElementById()` and `document.querySelector()`.

// 2. **Defining API URL**:
//    - It defines the URL for fetching cocktail data from an API (`https://thecocktaildb.com/api/json/v1/1/search.php?s=`).

// 3. **Defining `getInfo` Function**:
//    - It defines a function named `getInfo` which handles the fetching of cocktail data and displaying it on the webpage.
//    - Inside the function:
//      - It retrieves the value entered by the user in the input field.
//      - It checks if the input field is empty. If empty, it displays a message indicating that the input field cannot be empty.
//      - If not empty, it fetches cocktail data based on the user input using `fetch()`.
//      - After fetching the data, it logs the data for debugging purposes and extracts information such as the drink's name, image, instructions, ingredients, and measurements.
//      - It updates the HTML content of the `result` element to display the drink details including the image, name, ingredients, and instructions.
//      - It also creates list items for each ingredient and appends them to the ingredients list.

// 4. **Event Listeners**:
//    - It adds an event listener to execute the `getInfo` function when the window loads.
//    - It adds another event listener to execute the `getInfo` function when the search button is clicked.

// In summary, this JavaScript code interacts with the DOM to handle user input, fetches data from an API based on the input, processes the fetched data, and updates the webpage dynamically to display the results to the user. It also includes error handling to deal with invalid input or errors during fetching.