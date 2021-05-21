---
layout: post
title: First day of Makers course
redirect from:
    - /started-course/
    - http://www.mirandawilson.tech/started-course/
tags: Ruby testing Makers
---

Today was the first day of the Makers course proper. Very exciting to think about how much I'll be learning. But I didn't finish the Udemy Learn to Code with Ruby course yet - I can't remember how Classes work! No idea about Modules or Mixins either. So that's what I'm doing this evening.

Today's work was about debugging using unit tests - intro to User Stories, Domain Models, stack traces, feature vs unit testing. My programming pair and I got caught up over-complicating things when trying to diagram the domain model.

Here is an rspec test that we wrote, in normal and one-line syntax:

```ruby
describe DockingStation do
  # more verbose with test name
  it "releases bikes" do
    expect(DockingStation.new).to respond_to :release_bike
  end

  # one line. DockingStation is assumed to be the subject
  it { is_expected.to respond_to :release_bike }
end
```

Makers is very keen on TDD. Respond_to? is a standard method that most objects have -- actually all of them probably, I just checked and BasicObject, the top ancestor, has it -- but the Rspec version doesn't have the ? for some reason. Respond_to? checks whether the object has the method which is given as argument.

```ruby
# Array objects respond to/have the method length
my_array = [1, 2, 3]
my_array.respond_to?(:length)
=> true

# Length is an instance method, not the whole class'
Array.respond_to?(:length)
=> false
```
I think I wrote responds_to? first for every one of these.

Edit: this code block looks terrible right now! Not like how it previews inside Github. Something to do with the Jekyll theme? Not so ugly within The Old Reader RSS feed manager.
