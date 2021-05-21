---
layout: single
title: The Importance of Being CSS'd
date:  2021-04-28 22:18
tags: Makers JavaScript HTML/CSS
---
I've been taking things very easy since graduating. It's been lovely. I've been doing some gardening and some other hobbies, but also going back over older projects to get them into a reasonable shape.  

The one I've spent the most time on is my [10-Pin Bowling Scorecard](https://github.com/mscwilson/bowling). It was a Makers weekend challenge during the two JavaScript weeks. I did not have a good time with it then. Firstly, the challenge was initially just to write the scoring logic - so when I got to the stretch goal of creating a jQuery interface, my code wasn't ready for that. Secondly, I basically didn't know any CSS at the time. So I was determined to work on this site until it looked great.  

When I graduated from Makers, this project looked like this:  
![bad first attempt](/blog/assets/images/2021-04/1_table.png)  
It's very funny to me how unstyled pages all look like they're from the 90s. Anyway, I wasn't happy with this. I was using an HTML table (`<table>`), which apparently wasn't the right tool - and there wasn't even a separate stylesheet.  

I'd become more familiar with display layouts during my Makers [final project](https://github.com/mscwilson/SmellsLikeGreenSpirit), using the React Native flex layouts. So I changed the whole table to be a "grid-container" `div`, filled with `div`s of class "grid-item". From there, CSS took over. This was my starting point:  

```
.grid-container {
  border: 1px solid blue;
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px 100px 100px 100px 100px 100px;
  grid-template-rows: [row-title] auto [row-frames] auto [row-rolls] auto [row-scores] auto;
}
```  

I added coloured borders around each different class, and placeholder "0"s for the frame scores, to see what was going on. It looked much better but the layout was wrong, the columns weren't lined up properly:  
![multicoloured grid](/blog/assets/images/2021-04/2_green_initial_grid.png)  

I added some more columns to the `grid-container`, and trial-and-errored the CSS into lining up the columns and rows how I wanted.  
![grid lined up properly](/blog/assets/images/2021-04/3_grid_layout.png)  

Then I realised that I needed some more logic to know which frame was active, remaining pins in the frame, and when the game was ended. These would allow me to display the frame rolls as they're entered, and also show only valid options in the dropdown menu. In the meantime, I connected the accumulated score to the grid, which updates on every form submission:  
![showing cumulative scores](/blog/assets/images/2021-04/4_accum_scores.png)  

Wouldn't it be nice if strikes showed up as `X`, and spares as `/`, just like in real bowling? Spent ages on this:  
![strikes and spares shown as X and / in frame scores](/blog/assets/images/2021-04/5_frame_scores.png)  

Now that the functionality was mostly done, it was time to focus on the styling. I could remove the multicoloured borders, as the grid was already laid out correctly. I switched to two nice sans-serif fonts, and also added a reset button. Annoyingly I couldn't work out how to clear the scorecard and start a new game using jQuery, so it just reloads the page:  
![new fonts and some padding](/blog/assets/images/2021-04/6_clear_all_no_placeholders.png)  

It was time to replace the placeholder background colour! I found this free image that's perfect for the background. Lovely neon colours that match the bright coral I'd already chosen for the text. Having a background picture makes a gigantic difference. Since the background is dark, I also changed the grid borders to white:  
![new background image of a bowling alley](/blog/assets/images/2021-04/7_background_image.png)  

It was hard to see the scores with the new picture, so I added a transparent white background for the grid. Somehow I also broke the grid layout at this point:  
![white background grid but it's gone weird at one end](/blog/assets/images/2021-04/8_grid_white_background.png)  

Nearly there. I centered everything into the middle of the page. It's only semi-responsive because I couldn't work out how to avoid using absolute sizes for the grid columns and rows, so the scorecard itself can't change size. Then I added a gradient glow on the text to make it more legible against the busy background, and so it looked cool. Of course, each of these steps took me a long time. Finally, I added a third font (surely the most fonts I've used in one project before) to give a handwriting effect for the scores:  
![finished page with handwriting font and text glow](/blog/assets/images/2021-04/9_handwriting_font.png)  

Now I'm very pleased with this page! There is still a lot I don't know about CSS. After all, I left this in my stylesheet:  
```
#card-and-reset {
  /* for some reason the grid breaks if I remove this section */
}
```
But it's such a massive improvement. I amused myself by making a gif of these screenshots:  
![page progress gif](/blog/assets/images/2021-04/bowling_progress.gif)  

Now this Bowling Scorecard is sorted out, I'm free to start a new project. Oh wait, I mean get a job.


***
I discovered a new artist this week. Folky acoustic guitar and sung harmonies. This track came up on my Spotify as I was driving and I got so excited. I haven't fully loved a new song in so long, I thought maybe there wasn't any more music for me to discover. A lot of nordic music (the artist is Swedish) has this beautiful, dark, forest vibe. The singer seems like an interesting person - he used to be in a black metal band, and is also an illustrator who does all his own artwork. 

{% include youtube.html youtube_id="qOmaeh3sv7o" %}


