---
layout: single
title: Dynamic key names in Ruby
redirect_to: http://www.mirandawilson.tech/blog/2021/02/06/dynamic-variable-names/
date:  2021-02-06 18:41:00
tags: Ruby
---
I learned a new thing in Ruby today that I didn't know was possible. Setting Hash (Dictionary) keys to be variables. The 5th Makers [weekend challenge](https://github.com/mscwilson/bowling-challenge-ruby) was to make a bowling scorecard calculator in Ruby. Turns out I had no idea how bowling was scored despite having played many times. Each round is called a frame. I wanted to have a hash storing the scores for each frame.  

It seemed unsatisfactory to make a hash with all the frames in it like this:  
```ruby
scores = { frame1: 0,
           frame2: 0,
           frame3: 0
           etc }
```

Instead, StackOverflow informed me that it's possible to use variable names or other interesting things when assigning keys. Including interpolated strings! So it's possible to do things like this:  
```ruby
scores = Hash.new
frames = ["a Frame", "second Frame", "actually these would be Frame objects"]

frames.each_with_index { |frame, index| scores["frame_#{index + 1}".to_sym] = 0 }
p scores
>> {:frame_1=>0, :frame_2=>0, :frame_3=>0}
```
Very cool. I decided to play around with this to see what's possible.  

```ruby
key = "a key"
hash = { key => "value"}
p hash
>> {"a key"=>"value"}
key = "different string"
p hash
>> {"a key"=>"value"}
```

So the variable can be used for assignment, but then it's fixed?  
```ruby
key = "a key"
p key.object_id
>> 47200822359600
hash = { key => "value"}
hash.keys.each { |k| p k.object_id }
>> 47200822359420
```
So they are different objects. Ah yes, from the Ruby docs: "key should not have its value changed while it is in use as a key (an unfrozen String passed as a key will be duplicated and frozen)."  

[This page](https://www.honeybadger.io/blog/advanced-ruby-hash-techniques/) has some cool ideas. Storing an entire class as a key?
```ruby
hash = { String => "stringy", Integer => 1, Array => "array" }

p hash["hello world".class]
p hash[5.class]
p hash[["list"].class]
>> "stringy"
>> 1
>> "array"
```
Or booleans  
```ruby
hash = {true => "it's true"}
p hash[1 == 1]
>> "it's true"
```

There are even more options for values, using blocks/Procs/Lambdas. From the same [page](https://www.honeybadger.io/blog/advanced-ruby-hash-techniques/), using a block to construct the hash:
```ruby
sqrt_lookup = Hash.new { |hash, key| hash[key] = Math.sqrt(key) }
sqrt_lookup[9] # 3.0
sqrt_lookup[7] # 2.6457513110645907
sqrt_lookup    # {9=>3.0, 7=>2.6457513110645907}
```
On this other [page](https://blog.bearandgiraffe.com/dynamic-hash-in-ruby-77c41e9f2273), they used a Proc as the value, to evaluate it each time a new entry was made. Therefore they could get different payment_ids for their database seed data.

Then I [discovered](https://www.rosettacode.org/wiki/Dynamic_variable_names#Ruby) this crazy pair of methods, `instance_variable_set` and `instance_variable_get`.
```ruby
x = "@hello"
instance_variable_set(x, "goodbye")
p x
p instance_variable_get x
>> "@hello"
>> "goodbye"
```
The "@" is required, which makes sense since the names mention instance variables. Presumably they're supposed to be used in Classes. Or not at all, given the docs say this: "Sets the instance variable named by symbol to the given object, thereby frustrating the efforts of the class's author to attempt to provide proper encapsulation." lol  

Finally, I read a bit about the `send` method but I'm quite tired out now and it looks complicated. I'll try looking at [this page](https://medium.com/@pojotorshemi/send-me-a-river-ruby-send-method-3b295173e5c8) again later. One use of send is to sneakily call private methods from outside? [Here](https://stackoverflow.com/questions/3337285/what-does-send-do-in-ruby) people suggest doing that for unit testing private/protected methods! They also discuss using it for setting hash key value pairs.  


Today's work was soundtracked by post-metal, kick started by Cult of Luna's new album. But this particular Amenra track is really beautiful. It also has nearly a million more Spotify streams than their other top songs (which are mainly in the 500k range), implying that everyone agrees it's their best one. I have now listened to it 4 times today, further skewing the numbers.
{% include youtube.html youtube_id="CD7bxyzFbC4" %}
