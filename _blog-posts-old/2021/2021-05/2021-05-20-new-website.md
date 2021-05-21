---
 layout: post
title: Light and Dark, Jekyll and SASS
date:  2021-05-20 20:57
tags: Jekyll Bootstrap SASS
---
I mentioned [recently]({{ site.baseurl }}{% post_url 2021-05-12-job-hunting-weird %}) that I wanted to add light/dark theme switching for this blog. It turned out that while using `prefers-color-scheme` on individual bits of CSS is trivial, using it for an entire site is more challenging. One thing led to another, and I ended up making an entirely new site instead.  

Here's how it looks so far:  
![dark theme on new website, with placeholder posts shown. black and pink](/blog/assets/images/2021-05/new-site-dark.png)  
![light theme on new website, with placeholder posts shown. white and pink](/blog/assets/images/2021-05/new-site-light.png)  

And how this blog looks at the time of writing, with Minimal Mistakes theme,  Neon colour scheme:  
![how the blog looks currently, black and pink](/blog/assets/images/2021-05/old-site.png)  

You might note a certain similarity. Well, I was happy with this site except for the colour change, and the design is straight-forward.  

Jekyll projects, including my original site, normally start off a pre-designed theme, which provides a design, config and styling. In fact most of the files are hidden within the theme gem. Therefore I had no idea how Jekyll actually worked. Even worse, when I started poking around for colours, it turned out that all the styles were in SASS, not CSS. SASS looked complicated.  

I started deleting unused files - e.g. for commenting on posts - from the project, but it didn't make any more sense. And I still didn't know how to change colours.  

Switching themes was easy on a single test HTML page, using a JavaScript-based [toggle](https://github.com/GoogleChromeLabs/dark-mode-toggle). I set different background and text colours in two CSS files, then imported them using the `@media` query:

```html
<link rel="stylesheet" media="(prefers-color-scheme: light)" href="lightstyle.css">
<link rel="stylesheet" media="(prefers-color-scheme: dark)" href="darkstyle.css">

<script type="module" src="https://unpkg.com/dark-mode-toggle"></script>
```
Success! I could change the background colour and text colour at will! But how to scale up 8 lines of CSS to a whole pile of SASS? I couldn't work it out at all.  

So I decided to actually learn how Jekyll is put together, by starting a new project from scratch - no themes. To make it looked good quickly and responsively, I used [Bootstrap](https://getbootstrap.com/). I found this amazing series of [tutorials](https://experimentingwithcode.com/creating-a-jekyll-blog-with-bootstrap-4-and-sass-part-1/) for creating a Jekyll blog with Bootstrap. Perfect. I followed the instructions and made a basic site, and started to understand how parts connected. But it didn't change colour yet.  

A methodical person on GitHub has made a repo that sounded perfect, [Bootstrap-dark](https://github.com/vinorodrigues/bootstrap-dark-5/): Bootstrap variants, using different methodologies, that could be easily set up for theme switching. SASS, again. I tried to install the best variant. It didn't work. Turns out Jekyll is using an outdated SASS compiler, which can't cope with the fancy SASS of this code. I found myself researching how to configure a different SASS compiler before I came to my senses and looked for a different method.  

What I came up with is pretty terrible and hacky. Oh well! Good for now. I was saved by discovering a very cool site called [Bootstrap Build](https://bootstrap.build). It demos Bootstrap themes. You can import existing themes, change the settings and get a real-time readout of what will happen to all the elements! And then export either the all important SASS `_variables.scss` (by now I started to get SASS), or the compiled CSS.  

The other helpful site I used - also discovered through the Bootstrap-dark project - was [Bootswatch](https://bootswatch.com/), which provides free Bootstrap themes. The Flatly and Darkly themes are a matching pair of light and dark themes, a great starting point for Bootstrap Build. 

So my new site has two entire copies of the Bootstrap CSS. One for light, and one for dark. They're like 10 000 lines each 😨. As well as the custom SASS I wrote to go on top. To edit the Bootstrap variables I go back to Bootstrap Build, make the change, and then replace the CSS with the new version. I'm sure it should be possible to do it better with SASS, I'll keep trying. I found a few blog posts about it but don't understand them yet.  

Overall I'm extremely pleased with the new site! There are some more width responsiveness features I'd like to add, meaning I'd have to work out the `@media` myself instead of letting Bootstrap do it all. Well, there are of course loads of features I'd like to add. I have a list. Gonna migrate soon though! My own website for real.  

***
I've been relistening to Belgian band Raveyards. Mainly electronic, atmospheric, pulsing, with an edge. I've seen them twice live. The first time they'd hung a sheer curtain up in front to project images onto. Fully engrossing. They don't tour much so I suppose I'll have to visit Belgium sometime. This slow burn track is the new single. Reminds me of (excellent DJ) Blanck Mass.
{% include youtube.html youtube_id="n6dUxkuiimc" %}
