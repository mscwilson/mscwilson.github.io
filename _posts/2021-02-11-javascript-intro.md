---
layout: single
title: My first JavaScript
redirect_to: http://www.mirandawilson.tech/blog/2021/02/11/javascript-intro/
date:  2021-02-11 21:57:00
tags: JavaScript Sublime
---
We are learning JavaScript this week! Including the basic Python I did a while ago, this is the third language that I've started learning. It's really interesting to see the similarities/differences. For the first couple of weeks of Ruby I was very cross with it for not being Python. "Call this readable?! I have to write `end` all the time? `and` is much more readable than `&&` - and what's going on with that `||`?!". Now I prefer Ruby.

A lot of Python seems to be written back to front, with the important bit at the end of the line. Especially in list comprehensions which I always found very confusing.
```python
dogs_list = ["pomeranian", "spaniel",
            "tibetan terrier", "poodle",
            "shiba inu", "husky"]
p_dogs = [ x for x in dogs_list if x[0] == "p" ] # wtf is this
>> ["pomeranian", "poodle"]

# no neat way to iterate
for i, dog in enumerate(p_dogs):
    print(f"{i + 1}: {dog}")
>> 1: pomeranian
2: poodle
```

Whereas Ruby is indeed easier to read:
```ruby
p_dogs = dogs_list.select { |x| x[0] == "p"}

p_dogs.each_with_index { |dog, i| p "#{i + 1}: #{dog}"}
```

So this gives me some good context for my first couple of days of JavaScript thinking "what's with this ugly language? I'm sick of the word `function` already, as for all these brackets...". I suppose this would be the JS equivalent of the above:
```javascript
dogs_list.filter( function(x) { return x[0] === "p"; });

p_dogs.forEach( function(dog, index) {
    console.log(`${index + 1}: ${dog}`);
    });
```
It's actually ok. I don't mind it. Though I wish I had ever paid attention to Lambdas/Procs before because JavaScript seems to be 50% made of them. Something in JavaScript's favour is that its unit test framework is called Jasmine. What a pretty name! Also the Jasmine creators must have had RSpec in mind, or vice versa, as it's extremely similar.

I was envious of my cohort-colleague's colourful brackets yesterday in her VSCode. With so many brackets involved in JavaScript it's a shame for them all to be the same plain colour. I found that Sublime has a plugin called [RainbowBrackets](https://github.com/absop/RainbowBrackets). It's very functional - easier to see which ones belong to which bit - and also very garish. Excellent.

![rainbow brackets js](/assets/images/2021-02/rainbowbrackets.png)
![rainbow brackets js](/blog/assets/images/2021-02/rainbowbrackets.png)

(Shown with Dracula theme. I switch themes over light/dark throughout the day)
