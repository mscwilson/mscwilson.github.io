---
layout: single
title: Changing URLs without breaking everything
date:  2021-02-18 22:04:00
tags: Jekyll
---
When I started this blog 6 weeks ago, I knew basically nothing about websites or how the internet works. Now I know marginally more, but enough to start thinking about my goals for this site. This blog was found directly at `http://www.mirandawilson.tech`. I realised that I'll want a portfolio website soonish, of which this blog should be one part. Therefore it should actually be at `http://www.mirandawilson.tech/blog`. Which would break all my links. Not just the links to the posts I've shared with people, but potentially the internal images as well, because I hardcoded them like a noob.  

Once I started looking at it, I realised that the URLs for each post were also a bit rubbish. The default Jekyll post URL is `/:category/:title` but I haven't actually assigned any categories, so the URLs just had the title like `http://www.mirandawilson.tech/javascript-intro/`. I thought the Jekyll "[pretty](https://jekyllrb.com/docs/permalinks/)" permalink style of `/:categories/:year/:month/:day/:title/` would look better, eg `http://www.mirandawilson.tech/2021/02/11/javascript-intro/`.  

There were several things to fix:
1. The blog should be at /blog
2. Pages should have better permalinks
3. Redirect existing page links from `http://www.mirandawilson.tech`
4. Restore broken links to images?
5. Need a link to the homepage
5. Need a homepage! With a link to the blog
6. Sort out the RSS feed  

After extensive research, false starts, and wasted effort, I managed to complete (a first go at) most of these.  

### Problem 1
Since I wanted to separate out the blog posts from a homepage, the "easiest" solution was to have two separate projects that just linked to each other. This is actually not too hard using GitHub Pages.  

Previously, everything was in my `mscwilson.github.io` repository for hosting on GitHub Pages. That's a GitHub User project. But they also do Project er, projects. As long as a repo has a `gh-pages` branch (and contains files for a static site etc), they will try to deploy it, at the root URL/the name of the repo. GitHub users are allowed to have one User site but many Project sites.  

So, I duplicated my repo, into a new one called `blog`. It worked! At that point I had identical sites at `http://www.mirandawilson.tech` and ``http://www.mirandawilson.tech/blog`.

### Problem 2
In the `blog` repo, changed the permalink style in `_config.yml` to "pretty".

### Problem 3
Although eventually they won't be accessible, I'm keeping the existing posts  - or at least their structure - in the old repo `mscwilson.github.io`. Then if someone actually tries to revisit an old post, they won't get a 404. They'll end up on the correct version of the post instead.    

Using the gem [Jekyll-Redirect-From](https://github.com/jekyll/jekyll-redirect-from), I added redirects on each post to the new location at eg `http://www.mirandawilson.tech/blog/2021/02/11/javascript-intro/`. This was done by (manually...) editing each post's "Front Matter". Then I deleted the body of each post.

Now the posts in the old repo look like eg:  
```yaml
---
layout: single
title: My first JavaScript
redirect_to: http://www.mirandawilson.tech/blog/2021/02/11/javascript-intro/
date:  2021-02-11 21:57:00
tags: JavaScript Sublime
---
```

### Problem 4
The image links in `blog` repo are fine. The entire site URL is different now, the relative paths didn't change at all.  

### Problem 5
Thanks to the Jekyll theme [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/), the links at the top right of the page (Posts, Tags, About etc) are generated automatically, based on the `navigation.yml` file. In the `blog` repo, I added a hardcoded Home link:    

```yaml
main:
  - title: "Posts"
    url: /posts/
  - title: "Tags"
    url: /tags/
  - title: "About"
    url: /about/
  - title: "Home"
    url: http://www.mirandawilson.tech/
```

### Problem 6
Similarly, I edited `navigation.yml` in the `mscwilson.github.io` repo to just show Blog and About.  

Right now, the homepage still shows all the post titles, and needs a lot of work. Ideally I'd write myself a brand new main site. Maybe once I have more spare time! The blog should still match though, so it would be a lot of work.  

### Problem 7
Not urgent. I'm sure only my husband is subscribed anyway!  

I was going to cook a stew this evening, but also I've been thinking about how to do this migration for a week or more, so I'm very glad it's done!
