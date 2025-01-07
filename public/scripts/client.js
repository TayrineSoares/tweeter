/*
 * Client-side JS logic
 * jQuery is already loaded
 */

$(document).ready(function() {
  
  const maxTweetLength = 140;
  
  // Error functions 
  const showError = function (message) {
    const $error = $('#error-message');
    // Display error with animation; Uses .html so it accepts html content (to include icons later in the error message)
    $error.html(message).slideDown(); 
  };
  
  const hideError = function () {
    const $error = $('#error-message');
    $error.hide(); // Hide error and clear the text
  };


  // Validation function displaying errors 
  const isTweetValid = function (tweetText) {

    if (!tweetText || tweetText.trim() === "") {
      showError(`<i class="fa-solid fa-triangle-exclamation"></i> Tweet content cannot be empty!<i class="fa-solid fa-triangle-exclamation"></i>`);
      return false;
    }

    if (tweetText.length > maxTweetLength) {
      showError(`<i class="fa-solid fa-triangle-exclamation"></i> Too long! Tweet content exceeds ${maxTweetLength} characters! <i class="fa-solid fa-triangle-exclamation"></i>`);
      return false;
    }

    return true;
  };


  // add an event listener to the form submission and prevent reloading the page
  $('.tweet-form').on('submit', function(event) {
    // Prevent the default behavior
    event.preventDefault();

    hideError(); // Hide any existing error message before validation

    // Serialize the form data
    const serializedData = $(this).serialize();
    // Get the input value and trim whitespace 
    const tweetText = $('#tweet-text').val().trim(); 
    
    // Validation checks
    if (!isTweetValid(tweetText)) {
      return; // Stops the form submission
    }

    // Send the serialized data to the server
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/tweets',
      data: serializedData,
      success: function (response) {
        
        console.log('Tweet submitted successfully:', response);
        
        // Clear the tweet container
         $('#tweets-container').empty();
        // Fetch the tweets again
        loadTweets();
        // clear the form after submission for better user xp
        $('.tweet-form')[0].reset();
        // Reset the character counter to 140
        $('#counter').text(140);
        // Hide error message (if any)
        hideError();
      }
    });
  });

  // Prevent XSS (Cross-Site Scripting) by Escaping User Input
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  function createTweetElement(tweetData) {

  // Use timeago.format to calculate the time passed
  const timestamp = timeago.format(tweetData.created_at);

  // Create the HTML structure for the tweet using template literals
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user-info">
          <img src="${tweetData.user.avatars}" class="tweet-user-picture" alt="${escape(tweetData.user.name)}'s avatar">
          <p>${escape(tweetData.user.name)}</p>
        </div>
        <p class="handle">${escape(tweetData.user.handle)}</p>
      </header>

      <div class="tweet-body">
        <p>${escape(tweetData.content.text)}</p>
      </div>

      <footer>
        <p>${timestamp}</p>
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  // Return the tweet element
  return $tweet;
  }


  // takes in an array of tweet objects and then appends each one to the #tweets-container
  const renderTweets = function(tweets) {

    // Loop through each tweet object in the array
    for (const tweet of tweets) {
      // Create the tweet element using createTweetElement
      const $tweetElement = createTweetElement(tweet);

      // Append the tweet element to the #tweets-container
      $('#tweets-container').prepend($tweetElement);
    }
  };


  // Function to fetch tweets from the server
  function loadTweets() {
    $.ajax({
      type: 'GET',              // HTTP method
      url: '/tweets',           // Endpoint to fetch tweets
      dataType: 'json',         // Expect JSON response
      success: function(tweets) {
        console.log('Tweets fetched successfully:', tweets);
        renderTweets(tweets);   // Display fetched tweets
      },
      error: function(error) {
        console.error('Error fetching tweets:', error);
      }
    });
  }

  // Call the loadTweets function to fetch tweets on page load
  loadTweets();

});