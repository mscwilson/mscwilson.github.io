### Setting up Snowplow Micro and JS trackers

#### Tracking Strategy
After reading through the tracker documentation, it looked like the standard events tracked were page views and activity, but that anything could be set up as an event to record.

As the owner of the website, I want to know if people click on the links for my blog and portfolio.  In my portfolio, I want to know which of my projects are most interesting to my visitors. I can use the GitHub repo links as a proxy for this, by recording which links get clicked on.  Finally for my blog, I was hoping to measure if people do click on/play the embedded YouTube videos that I include at the end of some of my posts.  

#### Snowplow Micro
[Snowplow Micro](https://github.com/snowplow-incubator/snowplow-micro/) runs off a Docker image. This was my first time using Docker so I started by following Docker's tutorial for a while so that I understood the Micro command. I downloaded the basic two config files and saved them into a folder called snowplow.

```shell
docker run --mount type=bind,source=$(pwd)/snowplow,destination=/config -p 9090:9090 snowplow/snowplow-micro:1.1.2 --collector-config /config/micro.conf --iglu /config/iglu.json
```

My computer is an M1 Mac, so there are sometimes problems with platform mismatch. After getting an error about this, I found a [blog post](https://earthly.dev/blog/using-apple-silicon-m1-as-a-cloud-engineer-two-months-in/) where someone explained how to specify `--platform=linux/amd64` to use x86_64 through Rosetta. The new command:  

```shell
docker run --platform=linux/amd64 --mount type=bind,source=$(pwd)/snowplow,destination=/config -p 9090:9090 snowplow/snowplow-micro:1.1.2 --collector-config /config/micro.conf --iglu /config/iglu.json
```

The API was then theoretically running. Later on the Snowplow Micro page, under Filters, I found this example command:

```shell
curl -X POST -H 'Content-Type: application/json' <IP:PORT>/micro/bad -d '<JSON>'
```

which I adapted for a GET request, based on the port and IP address listed in the Docker command (9090) and config file (0.0.0.0):  

```shell
curl -X GET -H 'Content-Type: application/json' <0.0.0.0:9090>/micro/all
>> {"total": 0, "good": 0, "bad": 0}
```
I was ready to set up the trackers.

#### Tracker Setup

I had decided to put the trackers into the new website I'd made for my blog and portfolio. Jekyll is a Ruby framework, but the JavaScript tracker seemed like the obvious choice for a website. I skim read through the docs for the JS Tracker v3, and then started following the setup guide.  

The first step is to add `sp.js` to the app. I downloaded the latest version and saved it into my assets folder. I then added the script tag to my pages' footer. I hadn't written any JS yet for my website, the only other scripts were from Font Awesome and Bootstrap.  

```html
<script type="text/javascript" async=1>
;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[]; p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments) };p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1; n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","/assets/js/plow.js","snowplow"));
</script>
```
Following the Tracker Setup docs, the next step was to initialise a tracker.  

```html
<script type="text/javascript" async=1>
;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[]; p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments) };p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1; n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","/assets/js/plow.js","snowplow"));

snowplow('newTracker', 'sp', '0.0.0.0:9090', { appId: 'mirandawilson' });

</script>
```
This should connect the tracker to the collector, Snowplow Micro. Just needed to start tracking events. The docs suggested that the standard events to track are Page Views and Page Pings.  

```html
<script type="text/javascript" async=1>
;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[]; p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments) };p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1; n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","/assets/js/plow.js","snowplow"));

snowplow('newTracker', 'sp', '0.0.0.0:9090', { appId: 'mirandawilson' });

snowplow('enableActivityTracking', {
  minimumVisitLength: 30,
  heartbeatDelay: 10
});
snowplow('trackPageView');

</script>
```

This was starting to look messy in the footer so I took out all the JS into its own file, in a new js folder within assets.  

I also added a tracker for page links. I was only interested in the links in the main navbar for Blog and Portfolio, so I used an allow list and added "tracked" as a class to those `<a>` tags.

```javascript
snowplow('enableLinkClickTracking', {
  options: {
    'allowList': ['tracked']
  },
  pseudoClicks: true
});
```

After clicking around on my site for a while, Snowplow Micro reported that events were happening!
```
>> {"total": 16, "good": 16, "bad": 0}
```

I had successfully set up the standard trackers.


#### Custom Events
My goal was to record clicks on my GitHub project links. I decided to make a test page to practise using the trackers before adding anything to my portfolio page. I created a new HTML page in the _pages folder, test-page.html. 

```html
---
layout: default
title: Test page
permalink: /test-page
---

<section id="test-page" class="py-5 px-4">
  <div class="container">
    <p>hello test page</p>
    <a id="test-link" href="#">Click here to go nowhere</a><br/>
    <a id="test-link2" href="#">This link is similar but tracked differently</a>
  </div>
</section>

<script src="/assets/js/testPage.js"></script>
```
The Liquid front-matter between the lines at the top tells Jekyll to include this HTML in the default layout, so it will have the default header and footer, including the Snowplow tag. I created a new JS file in assets for the `testPage.js` script.

I started by using a `trackStructEvent` event emitter. I wanted to record an event on mouseover of the first link.  

```javascript
function linkNowhere() {
  console.log("in linkNowhere");

  snowplow('trackStructEvent', {
  category: 'link-test',
  action: 'hover',
  label: 'nowhere new',
  property: '',
  value: ''
});
}

const link = document.getElementById("test-link");
link.addEventListener("mouseover", linkNowhere);
```

I was getting "in linkNowhere" printing out into the console, but was I emitting the events? I saved the good events into a file.

```shell
curl -X GET -H 'Content-Type: application/json' <0.0.0.0:9090>/micro/good > goodEvents.json
```

The file contained the words "nowhere new" and "link-test"! The `trackStructEvent` was working.  

What I was aiming to record was the GitHub project names when people click through on my Portfolio. Therefore a fully custom `trackSelfDescribingEvent` would be better since I want to record only GitHubRepoName. This could be added as the label in a `trackStructEvent` but it seemed clumsy to record unwanted empty strings for property and value etc.  

#### Setting up `trackSelfDescribingEvent`
To track custom events, a JSON schema is needed, and Snowplow Micro needs to access that schema. I spent a while reading about the Iglu schema repository, but it needed API credentials which I didn't have. I searched the Snowplow forums for "Iglu" and found a [post](https://discourse.snowplowanalytics.com/t/running-iglu-server-schema-repo-locally-for-snowplow-micro/4069/5) from istreeter saying:

```
Option 1 - host schemas in github

This is what we do in the snowplow-micro-examples repo. The schemas are in a iglu directory within the repo. Micro is then configured with a iglu.json file which is configured to find the schemas in github.
```
This was what I needed. I copied the config iglu.json file from that repo into this project, and added in a section for Micro to look at this repo for JSON schemas. I kept the snowplow-micro-examples source in there too in case I wanted to try out the trackers defined there. Then I stopped the Docker container and started up a new one, using the new config files.

I also installed Igluctl to lint my new [JSON schema](assets/iglu/schemas/test.mwilson/test-link/jsonschema/1-0-0). It told me that I was using the wrong `$schema`, so I fixed that.

Back in my `testPage.js` script, I set up a new function to record the link click event:  

```javascript
function linkSimilar() {
  console.log("in linkSimilar");

  snowplow('trackSelfDescribingEvent', {
    schema: 'iglu:test.mwilson/test-link/jsonschema/1-0-0',
    data: {
      linkId: "actually just a string for now"
    }
  });
}
const anotherLink = document.getElementById("test-link2");
anotherLink.addEventListener("click", linkSimilar);
```
To my surprise, given that I was closely following the snowplow-micro-examples repo code, I got an error in the console.  

```
Snowplow: Function failed   TypeError: n is undefined
```

Searching for "trackSelfDescribingEvent" in `sp.js` did suggest that there was a variable `n` involved, but I wasn't sure how to define it, and it was hard to read the minified JS.  

I downloaded the snowplow-micro-examples code and followed the instructions to run it. The tests ran fine and were able to record events from the `trackSelfDescribingEvent` code. Mine looked the same, but didn't run. I replaced my test-link schema with the snowplow-micro-examples one and the matching snowplow call. The same error appeared. I checked the `sp.js` file for the snowplow-micro-examples repo and found that it was quite different and didn't mention `n` - it was version 2.16.0 rather than my version 3.1.0.  

I replaced my Snowplow tag and `sp.js` with version 2.18.0, the most recent version before v3. I was now able to successfully track my test link clicks and find "actually just a string for now" in the collected good events from Micro. However, some bad events were appearing.  

Rolling back the tracker version had broken the other events like Page Views, as the syntax was slightly different. I followed the v2 docs to fix the other event trackers.

I had successfully set up a custom event. I was ready to track the interesting events in my Portfolio.

#### Tracking Portfolio clicks
I created a [new JS file](assets/js/portfolio.js) for the portfolio and added it as a script at the bottom of the [portfolio HTML](_includes/portfolio.html). I also added the class "github-link" to the appropriate links so I'd be able to identify them.  

I then researched the best way to identify clicks on certain parts of a page using JS, and read up on Event Bubbling. The idea seemed to be to call a function for all clicks within the main container, but just return out of the function if the click wasn't on something I'm interested in.  

The important thing to record for the event was the GitHub repository name. This is the end part of the URL, so I could just slice the URL to remove the common part.  

```javascript
const portfolio = document.getElementById("portfolio");

portfolio.onclick = function(event) {
  const target = event.target;

  if (!target.classList.contains("github-link")) return;

  const repoName = target.href.slice(29);

  snowplow('trackSelfDescribingEvent', {
    schema: 'iglu:test.mwilson/github-link/jsonschema/1-0-0',
    data: {
      repoName: repoName
    }
  });
};
```
By again checking the good events output JSON, I saw that the events were being successfully collected. I also loaded some of the output into a JSON parser to see more easily what was included for the event. I was reassured that my events were storing the date and the title "github-link".  

#### Conclusion
I successfully tracked Page Views, Page Activity, Navbar Link Clicks, and portfolio GitHub link clicks in my website.  

I had hoped to also record YouTube play events for my blog, but that turned out to be more complicated than anticipated. The embedded videos use the `<iframe>` tag which is actually a YouTube API. Therefore I would have to learn how to use the API to get user interaction info. This would be a nice addition for the future.
