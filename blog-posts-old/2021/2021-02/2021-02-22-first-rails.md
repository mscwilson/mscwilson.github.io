---
layout: single
title: My first Rails project
date:  2021-02-22 16:28:00
tags: Rails Ruby Jekyll
---
Today marks the start of week 8 of the [Makers](http://makers.tech) course. As usual, there is something new - this time we have a two week team project, using Ruby on Rails. I'm very relieved to move back into Ruby and a proper framework after two weeks of JavaScript / single-page-apps. I'm not going to write off JS yet, but I need some proper exploration time. After all, I learned Ruby for over two months before making a webapp in it, compared to two days!  

The challenge for the next two weeks is to make a Facebook-esque site, where users sign up, log in, post stuff, and comment on/interact with others' posts. A very familiar structure from Makers challenges - Bookmarks Manager, MakersBnB, Notes, Chitter... Are most websites basically just this?! I suppose it's this or providing info.  

To help us get started we have been provided with a fully set-up Rails project, which already has a page for the user to submit text, and another page to show all submitted posts. It is reassuringly like a heavy-weight Sinatra. A lot more fiddly; I'm guessing it has opinions about specifically which files go in which of these many folders. The MVC pattern makes a lot more sense to me than the single-page-app craziness. Perhaps there are established patterns/frameworks for SPAs as well.  

My friend ActiveRecord is here too, in its native habitat.  

I've looked through all the files in the starter project and can at least guess what each one is for, so I'm happy with that as a starting point. It'll make more sense when I start using it. I like that there is a file called `secrets.yml` (it's for keys). I had to think for a while of the right word: *covert*. Like a spy. I started reading A Perfect Spy by John le Carré last year, but haven't got very far. I used to read during my commute.  

Speaking of websites, kind of, I finished the basic migration of this blog that I mentioned in my [last post]({{ site.baseurl }}{% post_url 2021-02-18-url-changes %}). This is the current homepage and blog main page:  

![current homepage]({{ site.baseurl }}/assets/images/2021-02/homepage_new.png)
![current blog index page]({{ site.baseurl }}/assets/images/2021-02/blog_migrated.png)
  
This involved ferretting about in the depths of the Minimal Mistakes theme files, to find the actual HTML. For example, I had to get the `_includes/footer.html` file for the homepage, to remove the lines about the RSS feed. In the blog repo, I eventually found the HTML that controlled where the page title link was set. Amusingly I pasted the code in as a block, but Jekyll/GitHub actually rendered it, so I have screenshotted what it looks like in Sublime as well.    

```html
 # in _includes/masthead.html

 # Originally said this
<a class="site-title" href="{{ '/' | relative_url }}">
  {{ site.masthead_title | default: site.title }}
  {% if site.subtitle %}<span class="site-subtitle">{{ site.subtitle }}</span>{% endif %}
</a>

 # Now says this
<a class="site-title" href="http://www.mirandawilson.tech">
    {{ site.masthead_title | default: site.title }}
    {% if site.subtitle %}<span class="site-subtitle">{{ site.subtitle }}</span>{% endif %}
</a>
```

![current blog index page]({{ site.baseurl }}/assets/images/2021-02/masthead_html.png)  


And of course, I changed most of the homepage's `_layouts/home.html` to remove the posts. It was gratifying to be able to follow the files and structure of the project. I am learning things.    

Edit: I committed this post but was surprised that it didn't show up on the live blog. I forgot that it's deployed off the gh-pages branch now. Good thing I'll be learning about Continuous Integration this week!  

***
There hasn't been any music that's stood out to me lately. I took the entire weekend off work (!!) and didn't touch my computer Sat-Sun. It was glorious; I hadn't realised how hard I've been working. I did some gardening. So how about this Life of Agony track, Weeds, which I did listen to on Friday while staying up late doing the [weekend challenge](https://github.com/mscwilson/news-summary-challenge). Kind of lively grungey rock. Notable for the singer apparently rhyming "grown" with "shone".
{% include youtube.html youtube_id="6JG0N_tpmZA" %}  
