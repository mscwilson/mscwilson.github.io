---
layout: single
title: Changing URLs without breaking everything
date:  2021-02-13 12:24:00
tags: Jekyll
---
When I started this blog 6 weeks ago, I knew basically nothing about websites or how the internet works. Now I marginally more but, enough to start thinking about what I want from this site. This blog is/was found directly at `http://www.mirandawilson.tech`. I realised that I'll want a portfolio website soonish, of which this blog should be one part. Therefore the blog should actually be at `http://www.mirandawilson.tech/blog`. Which will break all my links. Not just the links to the posts I've shared with people, but the internal links to images as well.  

Once I started looking at it, I realised that the URLs for each post were also a bit rubbish. The default Jekyll post URL is `/:category/:title` but I haven't actually assigned any categories. So I could have problems if I ended up repeating the same post title. The Jekyll "[pretty](https://jekyllrb.com/docs/permalinks/)" permalink style of `/:categories/:year/:month/:day/:title/` would be better.

So I have made my first Github Issue and first git branch for this blog!
