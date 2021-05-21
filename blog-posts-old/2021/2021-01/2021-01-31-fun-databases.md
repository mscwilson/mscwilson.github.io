---
layout: single
title: Full stack fun
redirect from:
    - /fun-databases/
    - http://www.mirandawilson.tech/fun-databases/
date:  2021-01-31 23:04:00
tags: Ruby Sinatra PostgreSQL
---
This week we learned about databases. Specifically, how to make a Sinatra app where the data is in a PostgreSQL database. I was very excited going into this: I've wanted to learn about databases for years. I wanted to make my own database for my experiments when I was in the lab, or to make a nice GUI app for keeping track of frozen cell stocks. But it always seemed too hard when I looked at it. After this week, I can confirm to my past self that it is indeed really hard! The afternoon project was to make a Bookmarks Manager, where eventually users could register, log in and save URLs to display, and log out. This weekend the challenge was to make a very basic Twitter clone: a site which displays posts with the authors' usernames, with registration/authentication for users. The site should be called Chitter and users make peeps instead of tweets. The name Chitter is very off-putting to me. I think because it came up recently in my [Call of Cthulhu](https://www.chaosium.com/call-of-cthulhu-rpg/) game; there was a "chittering sound" coming from a pit in a cultist lair, no doubt from an eldrich horror. I did a bit of research (Google/Youtube) to find out what creatures chitter in real life. Mainly raccoons, apparently. Possibly an owl. Also, not really helping the case for the word, the [Predator](https://en.wikipedia.org/wiki/Predator_(franchise)).

At the start of building the app and thinking how I should do it, I had Heroku in mind for deployment. As in, I should try to deploy it. I'm still intrigued as to how that will work with the databases. So I set off to follow instructions for setting up a Heroku-ready Sinatra / postgres app. Turned out to be non-trivial, involving a certain amount of trial and error. Especially for setting up the tables using `rake db:migrate` (have to run `rake db:migrate RACK_ENV="test` separately...). I didn't read the several walkthroughs I was simultaneously following very closely beyond the initial database setup. So I was very surprised to find that I had set up an Object Relational Mapper (ORM), and now didn't need to write any code for the model!

A disconcerting class definition:
 ```ruby
 class Post < ActiveRecord::Base
 end
 ```
 It gets loads of methods, which we wrote out manually for the Bookmark Manager project, inherited from the ORM ActiveRecord.

I abandoned my "no coding after 8pm rule" to get to a satisfying point on this app. This was how it looked when I'd just got to the point of needing the posts and users tables to be linked, so that a post (peep) would have the proper username rather than a name entered into a form during creation:
![changing over how posts are made](/assets/images/2021-01/chitter_half_way_through.png)

And afterwards:
![changing over how posts are made](/assets/images/2021-01/chitter_named_posts.png)

Not bad for a day's work. I'm very pleased with it! Logging out is next to implement. Then various authentication checks. Incredible how I've done this after only starting databases this week, and web development two weeks ago. Makers <3
