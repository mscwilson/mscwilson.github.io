---
layout: single
title: Changing URLs without breaking everything
date:  2021-02-13 12:24:00
tags: Jekyll
---
When I started this blog 6 weeks ago, I knew basically nothing about websites or how the internet works. Now I know marginally more, but enough to start thinking about my goals for this site. This blog is/was found directly at `http://www.mirandawilson.tech`. I realised that I'll want a portfolio website soonish, of which this blog should be one part. Therefore the blog should actually be at `http://www.mirandawilson.tech/blog`. Which would break all my links. Not just the links to the posts I've shared with people, but the internal images as well, because I hardcoded them like a noob.  

Once I started looking at it, I realised that the URLs for each post were also a bit rubbish. The default Jekyll post URL is `/:category/:title` but I haven't actually assigned any categories. The Jekyll "[pretty](https://jekyllrb.com/docs/permalinks/)" permalink style of `/:categories/:year/:month/:day/:title/` would be better. So I made my first Github Issue and first git branch for this blog! And then got stuck.

Getting the posts to show up at `http://www.mirandawilson.tech/blog/trouble-with-urls/` instead of `http://www.mirandawilson.tech/trouble-with-urls/` was trivial: adding `baseurl: "/blog"` to the `_config.yml` file. What I couldn't work out was how to get `http://www.mirandawilson.tech/trouble-with-urls/` to redirect to `http://www.mirandawilson.tech/blog/trouble-with-urls/` or ideally to `http://www.mirandawilson.tech/blog/2021/02/13/trouble-with-urls/`.

There's a Jekyll gem called [Jekyll-Redirect-From](https://github.com/jekyll/jekyll-redirect-from) which seemed like it should be the solution. Just need to add the post's other URL to a `redirect_from:` line at the top of the post (in the "Front Matter"?! Is that a normal thing or a Jekyll thing I wonder). But jekyll-redirect-from automatically includes the baseurl in the path. So how can it do the redirect?
