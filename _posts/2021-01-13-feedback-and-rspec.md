---
layout: single
title: Makers Wednesday week 2
date:  2021-01-13 21:53:00
tags: Makers RSpec
---

Really good workshop this morning about feedback - why it's important, why it's hard to do, the different kinds of feedback, frameworks for giving feedback. Given that we have pair programming every day there is an opportunity to practise this every day! I definitely need to practise giving negative feedback.

Three kinds of feedback: Appreciation, Evaluation, Coaching

My pair partner this afternoon, Katrina, and I had a chat about our intentions for the session at the start. Actually there was a lot of chatting. This is probably why we had the most relaxed session I've done, it was nice. She gave me some very useful feedback at the end relating to that intention setting which I will definitely use. I thought I would find being on Zoom most of the day tiring - which it is - but the socialising and chatting is great. I didn't realise I missed it from working.

Frustrating evening tonight. After a couple more days practising I was looking forward to going back to the weekend challenge and DRYing up my tests where they were really repetitive with the stubs. But I think that challenge - forked off a Makers repo with various gems - is using a newer version of RSpec than my usual one! None of the `let(:whatever) { stuff }` syntax that I'd been planning on was acceptable to it. I eventually (it's 10pm ugh) got all my tests green again and slightly better looking. I found somewhere online which used `before(:each)` with @ variables, and that worked. Why do they have to be @ though? I need to do some serious RSpec learning. And find out which version I'm using!

Edit: RSpec worked fine this morning >_>