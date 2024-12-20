/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // add an event listener to the form submission and prevent reloading the page
  $('.tweet-form').on('submit', function(event) {
    // Prevent the default behavior
    event.preventDefault();

    // Serialize the form data
    const serializedData = $(this).serialize();
    // Get the input value and trim whitespace 
    const tweetText = $('#tweet-text').val().trim(); 

    // Validation checks
    if (!tweetText) {
      alert('Error: Tweet content cannot be empty.');
      return; // Stop the form submission
    }

    if (tweetText.length > 140) {
      alert('Error: Tweet content exceeds the maximum length of 140 characters.');
      return; // Stop the form submission
    }

    // Send the serialized data to the server
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/tweets',
      data: serializedData,
      success: function(response) {
        console.log('Tweet submitted successfully:', response);
      }
    });
  });


function createTweetElement(tweetData) {

  // Use timeago.format to calculate the time passed
  const timestamp = timeago.format(tweetData.created_at);

  // Create the HTML structure for the tweet using template literals
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user-info">
          <img src="${tweetData.user.avatars}" class="tweet-user-picture" alt="${tweetData.user.name}'s avatar">
          <p>${tweetData.user.name}</p>
        </div>
        <p class="handle">${tweetData.user.handle}</p>
      </header>

      <div class="tweet-body">
        <p>${tweetData.content.text}</p>
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
