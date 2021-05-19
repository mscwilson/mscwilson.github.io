## Portfolio
A basic Jekyll site that might end up showcasing my projects - or just being a playground to test things out.

### Description
I'm using Jekyll, a static site generator, for my blog and simple homepage. I set it up using the Minimal Mistakes premade theme, which has been great but is overkill for my needs. It contained a lot of things I'm not using (e.g. Comments capability), and I found the project structure confusing since I'd never used SASS before.  

Therefore I decided to start a new Jekyll page from scratch, with just the features I need: about me; a portfolio and my projects; my blog; and the ability to change between light and dark theme, because I think that's really fun.  

I followed [this](https://kevq.uk/how-to-build-jekyll-site-simple-css/) tutorial to set up the Jekyll project structure and config, with Bootstrap to provide the styling. I used the brilliant [Bootstrap Build](https://bootstrap.build/) to set up my light and dark themes, based off [Bootswatch](https://bootswatch.com/)'s Flatly and Darkly.   

This is a work in progress.

### Usage
* Clone this repo and navigate into the folder
* Run `bundle` to install dependencies
* Check out the site locally: `jekyll serve`


### What needs doing
Make the blog look good first before starting on portfolio.
* Make the footer stick to the bottom, in a way that works with the pagination
* Find out how to get post excerpts, make them show up on posts page
* Install the post reading time gem(?)
* Add a separate navbar for blog tags and archive (posts by year)
* Create tags page
* Create archive page (could leave this one as placeholder to start with)
* Add RSS feed link somewhere - with tags/archive?
* Add the youtube include and anything else useful from old blog

* Get some padding on the index page, and info (copy from old site)
* Same for About page
* Replace the Twitter icon with a working LinkedIn one
* Make the banner look better - narrower, different images - ideally same image but different overlay or something

Can migrate at this point!  
  
* Fix the padding on Portfolio page, add a short blurb
* Add projects - as Bootstrap cards maybe. Links to github and live project if possible. Click through to individual project pages
* Make individual project pages
  
* DRY out the CSS?
* Pick out nicer syntax highlighting themes, probably need light and dark ones
* Consider using background images or gradients so it looks less flat
