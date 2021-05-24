## Portfolio
A basic Jekyll site that might end up showcasing my projects - or just being a playground to test things out.

### Description
I'm using Jekyll, a static site generator, for my blog and simple homepage. I set it up using the Minimal Mistakes premade theme, which has been great but is overkill for my needs. It contained a lot of things I'm not using (e.g. Comments capability), and I found the project structure confusing since I'd never used SASS before.  

Therefore I decided to start a new Jekyll page from scratch, with just the features I need: about me; a portfolio and my projects; my blog; and the ability to change between light and dark theme, because I think that's really fun.    

This is a work in progress.

### Usage
* Clone this repo and navigate into the folder
* Run `bundle` to install dependencies
* Check out the site locally: `jekyll serve`

### Acknowledgements
* [Bootstrap](https://getbootstrap.com/) responsive design
* [Bootswatch](https://bootswatch.com/) - Flatly and Darkly Bootstrap themes
* [Bootstrap Build](https://bootstrap.build). Fantastic site for customising Bootstrap themes
* [Jekyll](https://jekyllrb.com/) static site generator
* [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) Jekyll theme. I used this for the previous version of this site, so I kept the overall design and some of the code (e.g. for post excerpts and reading time)
* [Experimenting With Code](https://experimentingwithcode.com)'s incredibly helpful multi-part [tutorial](https://experimentingwithcode.com/creating-a-jekyll-blog-with-bootstrap-4-and-sass-part-1/) on setting up a Jekyll site with Bootstrap
* This gist of Solarized Dark [syntax highlighter](https://gist.githubusercontent.com/nicolashery/5765395/raw/80abaa1791271466393e8264f286c1eb9240d059/solarized-dark.css) for Jekyll

Images from [Unsplash](https://unsplash.com/):
* Dark banner [image](https://unsplash.com/photos/EQqHRrvDG-Y) by Omid Armin
* Light banner [image](https://unsplash.com/photos/jhw1cRdWkEI) by Annie Spratt

### What needs doing
* Fix the padding on Portfolio page, add a short blurb
* Add projects - as Bootstrap cards maybe. Links to github and live project if possible. Click through to individual project pages
* Make individual project pages
* Add previous/next at the bottom of single projects
<br/><br/>
  
* DRY out the CSS?!
* ~~Only show the RSS link if it's a desktop browser. Show "All posts" on mobile?~~
* Improve the code blocks. Scrolling, margins, centred, better colour schemes
* ~~Change the colour of inline code so it doesn't look like links ($info?)~~
* Fix domain pointing, GitHub says there's a problem
* Set up CI?
* Make a better 404 page
* Show image thumbnails that can be expanded out
* Fix the redirects for first 20 posts
* Different colour for link that's been visited
* Fancy JS underline for navbar link hover like in Minimal Mistakes?
* Make the banner look better - narrower, different images - ideally same image but different overlay or something
* Add share buttons (twitter, fb, linkedin)
* Add a scrolling about section on the left like on old site?
* Consider using background images or gradients so it looks less flat
* Add a nice table of tag frequencies for tags page
* Make youtube embeds centred (and full width on mobile)
* Make posts archive look nicer and correctly aligned
