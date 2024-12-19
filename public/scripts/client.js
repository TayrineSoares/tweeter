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

    // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

function createTweetElement(tweetData) {

  const timestamp = tweetData.created_at;

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

renderTweets(data);



});