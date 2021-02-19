---
layout: single
title: My first API
redirect_to: http://www.mirandawilson.tech/blog/2021/01/19/takeaway-api/
date:  2021-01-19 09:20:00
tags: Ruby
---
Used my first API this weekend! The weekend challenge was to make a takeaway ordering system which sent a text to confirm the order had been placed. I decided to use the domain modelling/basic class diagrams exercise that we learned last week to plan out how to satisfy the user stories. I [ended up with](https://github.com/mscwilson/takeaway-challenge) quite a few small classes as that seemed the most satisfying way to put it together. eg Dish objects have a name and a price, then a Menu object contains or reads in Dishes.

I was pleased how easy it was to use the Twilio API to send myself texts. It meant that I also had to learn about environment variables so I didn't accidentally post my phone number on Github. I used a gem called dotenv for this rather than putting them in my .zshrc file. The variables are saved in a .env file in the project directory, then the dotenv gem loads them in when the program is run. Worked well.

The novelty of getting automated texts from myself wore off somewhat when I didn't isolate my tests properly to start with, and each run of rspec sent me another batch of "your order is on its way!"s.

I'm happy with the finished code. I even managed to isolate my tests eventually (by deleting one of them I couldn't work out hehe). Would have been good to have spent less time on the challenge and more time studying RSpec this weekend though. Oh well!

Now that I've learned how to embed Youtube videos, I can embed one here as well. I listened to this album while writing the takeaway challenge. Pretty psybient (psychedelic ambient) music.

{% include youtube.html youtube_id="MhgVxKMoGBA" %}
