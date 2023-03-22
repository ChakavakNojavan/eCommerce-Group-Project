// search.js

// -------- utility functions -------------

//The code searches through an array of products and returns products that match a search term. It does the following:

//Parses the search term into individual words
//Searches for each word in the product data
//Returns products that match all search words

//It improves search accuracy by:

//Removing punctuation and capitalization
//Searching in multiple fields (name, price, etc.)
//Intersecting the results of searching for each word to find matches that contain all words

//The end result is a function called search that takes a search term and list of products, and returns products matching the search term.

// Parse a search string into a word array
const parseInput = (text) => {
  // Remove punctuation, convert to lowercase, and split words
  return text
    .replace(/[.,;:!?]/g, " ")
    .toLowerCase()
    .split(" ")
    .filter((word) => word !== "");
};

const wordInProduct = (word, product) => {
  const { name, price, body_location, category } = product;
  if (
    name.toLowerCase().includes(word) ||
    price.toString().toLowerCase().includes(word) ||
    body_location.toLowerCase().includes(word) ||
    category.toLowerCase().includes(word)
  ) {
    return true;
  }
  return false;
};

const searchProducts = (word, prods) => {
  return prods.filter((p) => wordInProduct(word, p));
};

const intersectionOfResults = (results) => {
  return results.reduce((intersection, current) => {
    return intersection.filter((e) =>
      current.some((item) => e._id === item._id)
    );
  }, results[0]);
};

const narrowSearch = (searchTerm, products) => {
  const words = parseInput(searchTerm);
  const results = words.map((word) => searchProducts(word, products));
  return intersectionOfResults(results);
};

// Entry point here
export const search = (searchTerm, products) => {
  console.log("calling search");
  return narrowSearch(searchTerm, products);
};

//To implement this search functionality in your app, we will:

//Add the search.js file to our project and import the search function.
//Pass in our product data and the user's search term to the search function.
//Display the results returned from the search function (the matched products) in our app.

//So it might look something like:

// Import search function
import { search } from "./search.js";

// Get user search term
const searchTerm = getSearchTermFromUserInput();

// Search products
const results = search(searchTerm, products);

// Display results
displaySearchResults(results);
