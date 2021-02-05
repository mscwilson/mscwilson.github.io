---
layout: single
title: My website on the real internet
date:  2021-01-27 19:30:00
tags: Ruby Sinatra Heroku
---
I wrote in my last post about my Rock Paper Scissors game, which was the 3rd Makers weekend challenge. I had been saying before the course started, "this time in three months I'll be able to make websites!", so it was gratifying and surprising to be at that point after only three weeks. But could I really be excited about something that could only run on a computer with all the coding stuff installed? I wanted it to be on the real internet so I could make my friends look at it. Long story short: [play Rock Paper Scissors online](https://young-eyrie-83578.herokuapp.com/)!

The pictures were drawn by me in [Affinity Designer](https://affinity.serif.com/en-gb/designer/), a really good and cheap graphics program. None of Adobe's subscription £££ greed. It's not quite as good as Illustrator, but it also costs only £50. For which you can get 1 single month of Illustrator.

Long version: In December we had been sent a list of software to install, including Heroku. So I knew it was some kind of hosting service. It turns out to be very easy to /deploy/ Sinatra apps to Heroku! It's based on using Git.

I mostly followed [this guide](http://www.getlaura.com/how-to-host-a-sinatra-app-on-heroku/). Heroku would rather have its own run file (Procfile) to specify how to do it. But it will make do with `config.ru`, likely already created for Sinatra.


#### Make sure Sinatra app is working on local server - ?? minutes/hours/days
The `config.ru` file for my RPS app says:
```
require_relative "lib/app" # my controller code is in app.rb
run RockPaperScissors # this is what my controller class is called
```

The `app.rb` file says:
```
require 'sinatra/base'
require_relative "game" etc
require_relative "player"

class RockPaperScissors < Sinatra::Base
 
 ... all the methods ...

  run! if app_file == $0 # not necessarily needed
end
```
That last line was included in the instructions for the Makers afternoon challenge in week 3. Once the `config.ru` file is in place and you can run using `rackup`, that line can be taken out. But you would need it to run the local server directly through Ruby: `ruby app.rb`  (`$0` in the code there referring to the command line ARGV I assume).


#### Register with Heroku - 5 minutes
They have [instructions](https://devcenter.heroku.com/articles/getting-started-with-ruby). Install the Heroku Toolkit and connect to your account. It just went straight through perfectly for me.


#### Add Heroku to the project repo - 0.5 minutes
In the Sinatra project folder, type:
```
heroku create
```
This adds an additional Git remote for the project. Doing `git remote -v` now should show the normal Github one and the Heroku one.


#### Deploy to Heroku - 0.5 minutes
Push (the master branch) to the new remote:
```
git push heroku master
```
That's it! It will complain about wanting the Procfile. But it works anyway - maybe not for complex projects? No idea how it will cope with databases etc. It also prints out the link for your new website.

EDIT:  
This worked brilliantly the first time, yes. Then I tried to deploy [another project](https://github.com/mscwilson/birthday_counter) and of course it didn't work. This was a few days ago, I forgot to update this at the time and now I can't fully remember what happened. I wanted to use a Procfile. I don't know if I tried it without the Procfile first, or if there was another problem as well. Anyway, it didn't work at all with the Procfile.  
Procfile looked like this, I copied the text off some random blog:
```
 # in bad no good Procfile
dev: bundle exec rackup
web: APP_ENV=production bundle exec rackup -p "$PORT"
```
My site pushed to Heroku but didn't load properly. It just said `GET /`. Eventually I realised that I never set or used APP_ENV anywhere else! So I deleted that bit.  
New Procfile:  
```
 # in Procfile
dev: bundle exec rackup
web: bundle exec rackup -p "$PORT"
```
Now you can go [here](https://stark-caverns-93070.herokuapp.com/) to find out how long you have to wait until your birthday.


#### Admire handiwork and text everyone the link - 30 minutes
Self-explanatory. The free Heroku accounts apparently have some deliberate downtime so it might not always be working.


#### Update site after working on app - 0.5 minutes
After working on improving the project, commit and push to Github like usual and then just run `git push heroku master` again to update the site.

Interestingly I discovered a funny bug/oversight in my code having done this. My RPS app is very basic. So basic, it has no concept of ?sessions? - there is only one single game happening at a time, even if multiple users are simultaneously separately trying to play. Therefore I could enter my name and press play, but see a different name that someone else had just entered! Quite alarming initially!


Since I really like my cohort-colleague [Katrina](https://codered30.medium.com/)'s idea of sharing a song with each post, here is a track that I listened to at the same time as trying to finish the RPS app on Sunday. I wanted to work but it was snowing!!! So I needed to dance in my living room/in the garden to wintery progressive black metal first, then go to the park and play with the snow. Then I could code.

{% include youtube.html youtube_id="NDrrKv2wjvk" %}






