---
layout: post
title: Autocompletion Entertainment
date:  2021-05-05 14:49
tags: VSCode
---
VSCode is very keen on autocompleting names - overly keen. It's a roulette game every tab press! For some reason it usually prefers to pull something random out of the ether (mystery library code?), instead of filling in the variable name that I just wrote two lines ago. But I can almost forgive it, just for this:  


![screenshot of code that says "secret internals do not use or you will be fired"](/blog/images/2021/2021-05/VSCode_secret_internals.png)  

This cheered me and my pair partner up no end when we were stuck on our API call in our React Native project. I'm not sure why VSCode got `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` from `doesThisWork`, but I'm glad it did. Our code `doesThisWork` did work, eventually. The code still ended up kind of hacky but we were only a couple of days into using React Native, so that's to be expected. I did a similar call in a better way [later on]({{ site.baseurl }}{% post_url 2021-03-25-fulfilled-promise %}).

It seems `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` is [part of React](https://github.com/facebook/react/blob/master/packages/react/src/React.js#L106). I wonder if they intended for people to notice this - I'm sure they wouldn't have expected VSCode to highlight it!

```javascript
export {
  ...
  ReactSharedInternals as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  // Deprecated behind disableCreateFactory
  ...
};
```
