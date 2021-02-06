---
layout: single
title: Dynamic key names
date:  2021-02-06 18:41:00
tags: Ruby
---
I learned a new thing in Ruby today that I didn't know was possible. Setting Hash (Dictionary) keys to be variables. The 5th Makers [weekend challenge](https://github.com/mscwilson/bowling-challenge-ruby) was to make a bowling scorecard calculator in Ruby. Turns out I had no idea how bowling was scored despite having played many times. Each round is called a frame. I wanted to have a hash storing the scores for each frame.

It seemed unsatisfactory to make a hash with all the frames in it like this:  
```ruby
scores = { frame1: 0,
           frame2: 0,
           frame3: 0
           etc }
```

Instead, StackOverflow informed me that it's possible to use variable names or other interesting things when assigning keys. Including interpolated strings! So it's possible to do things like this:  
```ruby
scores = Hash.new
frames = ["a Frame", "second Frame", "actually these would be Frame objects"]

frames.each_with_index { |frame, index| scores["frame_#{index + 1}".to_sym] = 0 }
p scores
>> {:frame_1=>0, :frame_2=>0, :frame_3=>0}
```
Very cool.



Today's work was soundtracked by post-metal, kick started by Cult of Luna's new album. But this particular Amenra track is really beautiful. It also has nearly a million more Spotify streams than their other top songs (which are mainly in the 500k range), implying that everyone agrees it's their best one. I have now listened to it 4 times today, further skewing the numbers.
{% include youtube.html youtube_id="CD7bxyzFbC4" %}