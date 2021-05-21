---
 layout: post
title: Dependency injection, confusion injection / Double trouble
date:  2021-03-13 20:28:00
tags: Ruby testing Makers
---
I have now finished week 10 of [Makers Academy](https://makers.tech), meaning there are only two weeks left! Exciting, terrifying, tiring, surprising.  

This week we were given some practise tech tests, with the goal of producing our best possible code. I had a lovely week writing a [command line Bank Account in Ruby](https://github.com/mscwilson/bank_tech_test). This week's coach gave me some very useful feedback on my first try, and I was able to up my game. Surely it is the best code I've written so far. Classes are fully isolated for the unit tests, 100% test coverage, as many methods private as possible, I've even got the "# frozen_string_literal: true" lines at the top of each file* to keep Rubocop happy. Isn't Rubocop an amazing name for a linter?  

Part of the feedback suggested using dependency injection, since BankAccount depends on the Transaction and Statement classes. I tried researching dependency injection and got really confused. It seemed complicated. People were even using gems for it. I didn't understand what anyone was saying. For example, [this blog post](https://www.codementor.io/@olotintemitope/dependency-injection-explained-in-plain-english-b24hippx7) promised to explain dependency injection "in plain english":  

"Dependency injection is the art of creating service/client relationships that work well together by injecting services that are easily swapped with minimal time and effort."  
🧐 (I can't believe it took me this long to realise I can use emojis in Markdown already, with the built-in Mac emoji keyboard.)  

Luckily, the coach sent me a short Makers dependency injection workshop to look at. Apparently it's just a concept that is impossible to explain at length in words, because in practise it's just - you pass the dependent classes in as arguments?!  

This is the constructor and deposit method of my BankAccount class. The Transaction and Statement classes (the whole class, not instances) are passed in as default arguments:  

```ruby
class BankAccount
  attr_reader :balance

  def initialize(transaction = Transaction, statement = Statement)
    @transaction_class = transaction
    @statement_class = statement
    @balance = 0
    @transactions = []
  end

  def deposit(amount)
    deposit = @transaction_class.new(sanitise_input(amount), @balance)
    process_transaction(deposit)
  end

  etc
```

A new Transaction object is made from the instance variable `@transaction_class`. Set up like this, it was very easy to correctly isolate my unit tests, by passing in fake/double classes (which return fake objects) for initialize instead:  

```ruby
 # in spec/bank_account_spec.rb 
  let(:fake_transaction_class) { double :Transaction }
  let(:fake_statement_class) { double :Statement }
  let(:account) { BankAccount.new(fake_transaction_class, fake_statement_class) }

  describe "#deposit" do
    before do
      @fake_deposit = double(:deposit)
      allow(fake_transaction_class).to receive(:new).and_return(@fake_deposit)
    end
```
***  

The second pretend tech test to try this week was the [Gilded Rose](https://github.com/emilybache/GildedRose-Refactoring-Kata). It's an exercise in refactoring written 10 years ago in C#, which has been translated into many different languages. The idea is that you're given terrible legacy code, and have to improve it and add a new feature. There are two classes: Item, which mustn't be changed; and GildedRose, a magical shop/inn. Riding high from my BankAccount attempt, I went straight in with making an Item double for the GildedRose tests. And fell flat on my face.  

The purpose of the GildedRose class is to store a list of Items, and increment their attributes every time `update_quality` is called. That method doesn't even return anything, it just changes the Items through their setter methods (attr_accessor). But my fake items don't work like that. I wrote some very unsatisfactory tests like `expect(@normal).to have_received(:quality=).with(@normal.quality - 1)` but that's not what I want. I don't know! I'll ask the coaches next week.

Edit: got a reply from a coach. She said not to mock! Apparently there are some situations, like this one, where it's not worth it. Since the dependent class is really basic and doesn't even have any logic itself, it's unlikely to cause trouble in future.  
  
  
*Unlike in Python or JavaScript, strings are mutable in Ruby. They were going to change it for Ruby 3 but then [changed their mind](https://bugs.ruby-lang.org/issues/11473#note-53) in case it broke a lot of old code. "# frozen_string_literal: true" goes at the top of a Ruby file (a magic comment) to freeze strings anyway, because immutable strings are better for memory usage.  
  
***
This album by Rosalie Cunningham is fun. Female-fronted psychedelic rock. The vocals remind me of Amanda Palmer (The Dresden Dolls), except better. I forgot about it, but Spotify told me she has a new single out. The single is also not bad.

{% include youtube.html youtube_id="MFv-SJH4sOM" %}
