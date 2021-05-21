---
 layout: post
title: New computer!
redirect from:
    - /installation-m1/
    - http://www.mirandawilson.tech/installation-m1/
date:  2021-02-09 21:44:00
tags: miscellaneous
---
It's taken me two weeks but I have finally got all the software installed and my projects working on my new computer. It's a Mac Mini with the new M1 chip. I hadn't considered quite how new the M1 chip is. An accidental early adopter - I was starting to think I should give up and get a refund.

Shoutout to [this helpful person](https://github.com/kivikakk) on Github whose comment [here](https://github.com/gjtorikian/commonmarker/issues/128) helped me get Jekyll working again. It turned out that I had - again! - set up my Jekyll wrong. At least I didn't have to set it up from scratch again this time. I was supposed to have set gems to install into the vendor folder (`config set --local path "vendor/bundle"`) and I hadn't. As to how I fixed my Sinatra repos using `bcrypt` and `eventmachine`, I have no idea. Just kept running `bundle` or `gem install` in various ways until it worked maybe?! I thought I had cracked it when I realised that the terminal running inside Sublime Text (Terminus plugin) wasn't the same as the ones in iTerm. But in retrospect I don't know if that was the difference or not. Oh well it works!

Edit: (the next morning) I realised what was going on with Terminal. The Mac M1 chip isn't supported by much software yet. When I saw error messages like this
```
LoadError (dlopen(/Users/mirandawilson/.rvm/gems/ruby-2.7.2/gems/bcrypt-3.1.16/lib/bcrypt_ext.bundle, 9): no suitable image found.  Did find:)
/Users/mirandawilson/.rvm/gems/ruby-2.7.2/gems/bcrypt-3.1.16/lib/bcrypt_ext.bundle: mach-o, but wrong architecture”
```
I thought maybe it mentioned architecture was because the gem wasn't installed natively (arm64) but with the old Intel x86_64 type of instructions, enabled by Apple's Rosetta bridging software. Somehow this led to me running `arch` in the terminal. I was using the Terminus plugin inside Sublime as usual, since I was messing around with Gemfiles etc. `arch` said "i386". What's that? It's an Intel chip thing. Asking `arch` or the related `machine`, `uname -p` and `uname -m` in the iTerm terminal gave only answers about ARM.

At the time I thought maybe this is why my gems weren't working, because I had been installing through the "i386" terminal/architecture. Note that I have no actual idea what architecture means. I moved over to the proper iTerm terminal where I did get everything installed. Although it gave the "but wrong architecture" error a few more times there as well, so who knows. Anyway, I suddenly remembered that Sublime Text isn't natively supported yet. It's using Rosetta. Meaning it is using x86_64! Hence the terminal running in there is understandably also in x86_64. As long as I remember to only install things using the real terminal I think it'll be alright.


Now I can finally move on to more interesting setup things like making Sublime look nice.

***
Spotify recommended this track for me yesterday. Kind of bluesy alternative rock, reminds me of Nick Cave (or what I think Nick Cave sounds like, probably not accurate). It's nice:
{% include youtube.html youtube_id="R6QE0EhBbw4" %}
