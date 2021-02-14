---
layout: single
title: Valentine's Day JavaScript
date:  2021-02-14 15:37:00
tags: JavaScript Makers
---
Perhaps I should have found some CSS to make hearts all over my website - actually, what a missed opportunity. This weekend's challenge was to translate the [Bowling Challenge](https://github.com/mscwilson/bowling-challenge-ruby) from last week into JavaScript from Ruby - and then add an interface. So far I have generally enjoyed the weekend challenges, and been happy to spend hours working on them. [This time](https://github.com/mscwilson/bowling-challenge), for the first time I got fed up with it and have abandoned it "unfinished".

For one, I realised that my tests in Ruby and JavaScript were not isolated at all, not a double or stub in sight. I forgot I never got round to watching the doubles section of the [Udemy RSpec course](https://www.udemy.com/course/testing-ruby-with-rspec/); I have no idea how to use them. So that is annoying.

Then I realised that how I had calculated the scores and set up the bowling game logic made it very difficult to extract the right numbers to display on a page, or to check for valid inputs. After looking again at real bowling scorecards I added a method to calculate the cumulative scores for each frame, which is now hooked up with jQuery to display. But how to display the rolls individually for each frame? This is probably a lesson in how important planning is - I should have planned out how the interface could look/work before starting the JS translation, just in case. Or I should have binned it off earlier and played with CSS floating hearts.

Time for a break from the computer! This has been a frustrating weekend on mulitple fronts as I also failed to work out how to move posts from `www.mirandawilson.tech` to `www.mirandawilson.tech/blog` without breaking any existing links.


On the plus side, I joined some of my cohort-colleagues for a quiz by Karsten yesterday (thanks Karsten!). It was fun. I did not know how tall the Eiffel Tower is. One of the rounds involved guessing which TV series the music came from. This was one of them, the excellent theme from True Detective:
{% include youtube.html youtube_id="ZRPpCqXYoos" %}
