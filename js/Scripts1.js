// Array of valid cosmetic product keywords
const keywordsArray = ["shampoo", "conditioner", "lipstick", "moisturizer", "foundation", "serum", "mascara", "eye cream", "blush", "sunscreen"];

// Function to check the keyword and display results
function searchKeyword() {
    let keyword = $("#keyword").val().trim().toLowerCase();
    const validKeywords = keywordsArray.map(k => k.toLowerCase());

    // Clear previous results
    $("#result").html("");
    $("#errorMessage").hide();

    if (validKeywords.includes(keyword)) {
        // Display the related content for the keyword
        $("#result").html(`<h3>Product Information for: ${keyword}</h3><p>Details about ${keyword}...</p><img src="images/${keyword}.jpg" alt="${keyword}" />`);
        
        // Save the valid keyword to local storage
        saveKeywordToLocalStorage(keyword);
    } else {
        // Show error message if the keyword is not valid
        $("#errorMessage").show();
        $("#validKeywordsList").html(keywordsArray.map(k => `<li>${k}</li>`).join(''));
    }
}

// Save valid keyword to local storage
function saveKeywordToLocalStorage(keyword) {
    let searchedKeywords = JSON.parse(localStorage.getItem('searchedKeywords')) || [];
    
    if (!searchedKeywords.includes(keyword)) {
        searchedKeywords.push(keyword);
        localStorage.setItem('searchedKeywords', JSON.stringify(searchedKeywords));
    }

    displaySavedKeywords();
}

// Display the list of saved keywords from local storage
function displaySavedKeywords() {
    let searchedKeywords = JSON.parse(localStorage.getItem('searchedKeywords')) || [];
    $("#savedKeywords").html(searchedKeywords.map(k => `<li>${k}</li>`).join(''));
}

// Calculate time spent on the page
let startTime = new Date();

function calculateTimeSpent() {
    let endTime = new Date();
    let timeSpent = Math.floor((endTime - startTime) / 1000); // Time in seconds
    $("#timeSpent").text(`Time spent on this page: ${timeSpent} seconds`);
}

// Event listener for the search button
$(document).ready(function () {
    $("#searchBtn").click(function () {
        searchKeyword();
    });

    // Display previously searched keywords when the page loads
    displaySavedKeywords();

    // Calculate and display time spent on the page
    setInterval(calculateTimeSpent, 1000);
});
