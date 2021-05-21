---
 layout: post
title: Test Driven Inspired Development
date:  2021-03-10 20:28:00
tags: miscellaneous testing Makers
---
There's a focus at [Makers](https://makers.tech) on coding process. How ~~the sausage is made~~ we developers plan and interpret the specifications, our ability to explain our decisions, the quality of our commit messages, how well we can use TDD etc etc. In terms of how good we're considered as devs, process is given at least as much weight as the final code that comes out at the end. There are workshops every week to practise this with other students, but also formal Review sessions with external reviewers.  

My first Review was a couple of weeks ago. I was pretty stressed going in, especially having hardly done any basic Ruby in weeks. Indeed, my opening move was to try to set up a class something like this:  

```ruby
class Report(array)

end
```

(And it should have been just a method anyway!) Once I fixed that and got into it, I thought I was doing ok. I was writing tests, and getting them to go green == TDD. Imagine my surprise when the reviewer told me at the end that I was doing it all wrong.  

Somehow in the 6-8 weeks since learning about TDD I had gone off on my own path. I've now done a few practise sessions trying hard to do it properly. Looking back at what I wrote in my first Review: lol.  

I had my second Review today. Conveniently I got some extremely useful advice from one of my cohort (who is particularly great at feedback) this morning. Not only had I previously been testing things like "is the input an array" or "I'll delete this test in a bit once I've finished writing the method, it won't work then" - but also only doing a bit more than 2/3rds of TDD. Red, Green, Red again, Green, Red, Green, Red, Green... Refactor! I'll get the written feedback in a couple of days from the external coach, but I did much better this time.  

### Installation adventures
I have [wiped]({{ site.baseurl }}{% post_url 2021-03-01-system_reset %})) and reinstalled my M1 computer, and now everything works! Laughably straightforward compared to my [first attempt]({{ site.baseurl }}{% post_url 2021-02-09-installation-m1 %}). I followed the instructions [here](https://dev.to/nitishdayal/setting-up-vs-code-and-iterm-on-m1-macs-37g7) - other walkthroughs prefixed all the installation steps with `arch -x86_64` to make sure it's installed on the right architecture, but this genius pointed out that only one step is really necessary. Go to Get Info on the iTerm app, and tick "Open using Rosetta". Et voilà:  
```bash
👻  ~ % arch
i386
```
  
Deliberately avoiding using the new chip properly is a bit disappointing. Pretending it's an old Intel machine. But... my tools (mostly) work now and they didn't before?!  
  
***
Went back to what I think of as an easy-listening album today. It's actually kind of punky alternative rock, but I find it very easy to listen to. Tunes, (clean) singing, not challenging/experimental, short tracks, not boring. Ears/brain relaxation. They get bonus points for doing a cover of The Cardigan's My Favourite Game.  

{% include youtube.html youtube_id="IJ-YWOja248" %}
