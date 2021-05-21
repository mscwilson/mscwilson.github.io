---
 layout: post
title: Fulfilled promise
date:  2021-03-25 08:42:00
tags: JavaScript Makers
---
Today is my penultimate day of Makers. I think I might be a developer now?! I was certainly very keen to try solving the puzzle of getting data in and out of local SecureStorage last night. In fact I did end up feeling very developer-y: my first ever memory leak!  

Our app is looking good. It does pretty much everything we wanted it to. We named it Spring Onion after one teammate's gardening crop. I made this design for the splash screen:  

![splash screen spring onion](/blog/assets/images/2021-03/spring_onion_splash.png)
  
Everything takes ages to do of course, and several things turned out not to be possible at all with our current set up (eg In-App Payments, automatic licence plate recognition). We were hoping to get the In-App Payments so that the user could directly buy offsets from the app, via one of the many companies offering APIs for this. But we're using the Expo framework for React Native and it's not supported (or at least not without a lot of faff). So as a stop-gap, we found a company that does individual offset transactions from its website, and open that page up inside our app. A coach came and checked with us that we knew it's dodgy and very much not the done thing, because we used JavaScript injection to fill in the correct amount of emissions in the page's form. It looks good for now though.  

The memory leak happened because of an unfulfilled promise. We wanted to store journey history locally on the app using SecureStorage. It's a basic kind of storage with only three methods: save key value pair, get value of key, delete key value pair. And it's asynchronous, since it takes a bit of time to do these actions. I have no idea how other languages handle asynchronicity, but in JavaScript an async request creates a promise, that is eventually fulfilled when the response comes back. The old-fashioned syntax involves chaining `then` eg `.then(response => response.json).then(data => console.log(data))` onto the promise-making (promising?) function. Very confusing. Luckily they added a new syntax a few years ago where you declare the function as `async` and then `await` the response.  

```javascript
export async function deleteKey(key) {
  console.log(`here in delete key, deleting ${key}`);
  await SecureStore.deleteItemAsync(key);
}
```

I had written a function to get the stored journey history out and saved into a variable, for display on the History screen. But it was constantly updating, ie constantly making new promises. Bad enough and quite annoying because I was console logging quite a few lines with each call. This is the error I got when changing screen:  

```
Warning: Can’t perform a React state update on an unmounted component. This is 
a no-op, but it indicates a memory leak in your application. To fix, cancel 
all subscriptions and asynchronous tasks in a useEffect cleanup function.
```
  
A promise had been made, but I'd changed screen before it could be finished. So the unfulfilled promise was floating about in memory. I fixed it by following their instructions and using useEffect to wrap up the whole async thing - by doing it properly essentially!

```javascript
useEffect(() => {
    let cancelled = false;

    const getHistory = async () => {
      const journeyHistoryString = await getValueFor();
      if (!cancelled) {
        if (journeyHistoryString) {
          let journeyHistoryArray = JSON.parse(journeyHistoryString);
          setHistory(journeyHistoryArray);
        } else {
          setHistory(false);
        }
      }
    };
    getHistory().catch((error) => console.error(`There's an error: ${error}`));
    return () => {
      cancelled = true;
    };
}, []);
```

React provides this useEffect "Hook" which automatically stops the promising thing on changing screen, by returning and setting `cancelled` to `true`. That's the cleanup function that my error message had referred to. Then by giving useEffect an empty array as some kind of argument, it knows to only run once. Or something like that. Most importantly it works and the history page looks beautiful.  
  
Being a developer, writing code - still feels like another fun hobby. Even having spent 12 intensive weeks doing it. Doing this for a job is going to be a completely different thing.     
  
***
Me styling React Native apps: 🎵 Everythinggggggg... in its own Viewwww 🎵

{% include youtube.html youtube_id="NUnXxh5U25Y" %}


