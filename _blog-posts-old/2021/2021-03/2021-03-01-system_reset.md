---
layout: single
title: Native naivety - system reset
date:  2021-03-01 22:28:00
tags: miscellaneous PostgreSQL
---
Yesterday I tried to install a gem for Rails, which required another gem, which itself required another gem, which didn't install so maybe I needed to update XCode, and I may as well update Homebrew while I was at it? And then I had lost the ability to run any Rails or Rake tasks. The error said:   

```
[1]    6744 killed     rails server
```

Oh.  

So that was what I worked on all last night, and most of today. Looking at logs, looking for logs, uninstalling things, and then reinstalling them. And finally, I arrived at an error that I've [seen repeatedly]({{ site.baseurl }}{% post_url 2021-02-09-installation-m1 %}) recently (lol I thought it was a few months, but I only got this computer five weeks ago), for one gem or another.  


```bash
👻  instagram-challenge[master*] % rails s
/Users/mirandawilson/.rvm/gems/ruby-3.0.0/gems/bootsnap-1.7.2/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:23:in `require': dlopen(/Users/mirandawilson/.rvm/gems/ruby-3.0.0/gems/pg-1.2.3/lib/pg_ext.bundle, 9): no suitable image found.  Did find: (LoadError)
    /Users/mirandawilson/.rvm/gems/ruby-3.0.0/gems/pg-1.2.3/lib/pg_ext.bundle: mach-o, but wrong architecture
```
   
It found the thing, "but wrong architecture". Because I had installed it using x86-64 and not arm64. Because postgresql doesn't yet support arm64. But many of the things are installed on arm64. Now they can't find each other. Three weeks ago I naively said "I think it'll be alright" (having previously naively embarked on installing everything natively). Turns out it's not. It's time to start everything again from scratch - using x86-64 only.

There's an extremely helpful looking [page](https://www.driftingruby.com/episodes/a-rubyist-s-apple-m1-review) here with all the commands needed to set up Rails correctly. I'll do a full system reset - maybe it will also fix the bug where it always says "This computer restarted because of an error" after I've turned it on. Yeah, maybe I should have considered it earlier... A tedious week ahead!  


***
I listened to Gravenhurst last night while uninstalling and reinstalling postgres. It's beautiful, haunting folk rock/indie. The singer died young a few years ago, adding extra darkness to the songs. Something melancholy for futile Sunday night bugfixing.  

{% include youtube.html youtube_id="UYbkVrVXjEc" %}
