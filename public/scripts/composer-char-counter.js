
$(document).ready(function() {


  $("#tweet-text").on('input', function() {
    // Get the current value of the textarea and its length
    const inputLength = $(this).val().length; // Use $(this) to leverage jQuery functions
    const charCount = 140 - inputLength; 

    // Traverse the DOM to find the associated '.counter' element
    const counter = $(this).closest("form").find("#counter");
    // Update the counter text
    counter.text(charCount);

    // Add/remove class based on char count
    if (charCount < 0) {
      counter.addClass("negative");
    } else {
      counter.removeClass("negative");
    }

  });

});

