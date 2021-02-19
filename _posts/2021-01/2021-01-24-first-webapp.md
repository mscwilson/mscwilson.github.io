---
layout: single
title: Rock Paper Scissors (my ~~first~~ second webapp!)
redirect_to: http://www.mirandawilson.tech/blog/2021/01/24/first-webapp/
date:  2021-01-24 20:11:00
tags: Ruby Sinatra Makers
---
The internet came back after 3 days of only 4G. More interestingly, I made my [first ever webapp](https://github.com/mscwilson/rps-challenge) this weekend, for my third Makers weekend challenge! Technically I also [made a webapp](https://github.com/mscwilson/battle_sinatra) in the afternoon sessions. But that was with a walkthrough/instructions. The afternoon session's project was my first introduction to the Sinatra framework. The goal was firstly to understand the basics of the Model-View-Controller scheme and how to set it up with routes etc. Then we had to make an app that took in two player names, and allowed them to attack each other in turn, until someone got to 0 HP.

My implementation of this was fairly uninspiring as the attacks always did 10 HP! Using random amounts of damage was a separate user story to extend the project. I decided to move onto something new. But I was extremely pleased with the neat structure I used to swap players. I was so satisfied with it I'm going to post it here.

Here's the Game class definition from the walkthrough after turn swapping was implemented:
```ruby
class Game
  attr_reader :current_turn
  def initialize(player_1, player_2)
    @players = [player_1, player_2]
    @current_turn = player_1
  end

  def player_1
    players.first
  end

  def player_2
    players.last
  end

  def attack(player)
    player.receive_damage
  end

  def switch_turns
    @current_turn = opponent_of(current_turn)
  end

  def opponent_of(the_player)
    players.select { |player| player != the_player }.first
  end

  private
  attr_reader :players
end
```

Here's mine around the same point
```ruby
class Game
  attr_reader :player1, :player2
  def initialize(player1, player2)
    @player1 = player1
    @player2 = player2
    @players = [@player1, @player2]
  end

  def current_player
    @players[0]
  end

  def player_being_attacked
    @players[1]
  end

  def attack
    player_being_attacked.lose_health
  end

  def swap_players
    @players.reverse!
  end
end
```
The players are stored in a players list (array). The current player is always the first one in the list. The one being attacked is the second one. It doesn't make sense to me to say that "player_1" can swap over who it refers to. "Player1" is surely just the first person to put their name in. Like using the first controller port on the console. Anyway, in my code to swap players it just reverses their positions in the players array! This also meant I didn't need to give an argument to the attack method, since obviously the player_being_attacked is the one being attacked.

I was intending to post about my Rock Paper Scissors game but got distracted admiring my pleasing use of reverse!. Vanity in code. I wonder if I will come back to this in a few months/years and think it's terrible? I'm pleased with my Rock Paper Scissors too. I made a stab at some CSS (my first CSS!) so it looks pretty good for a first try.

I made the opponent player randomly have one of a shortlist of names ("RPSbot", "Murderbot", "Opponentbot", "Badloserbot", "Goodgamebot") chiefly so I could use the name [Murderbot](http://marthawells.com/murderbot.htm), after the eponymous book series. They're about a very sweet security cyborg who has space opera adventures hacking into things and watching TV.
![start page](/assets/images/2021-01/home_page.png)
![about to choose](/assets/images/2021-01/about_to_choose.png)
![lost the game](/assets/images/2021-01/results_lost.png)
![game was a draw](/assets/images/2021-01/results_draw.png)

This was written via TDD in Ruby 2.7.2 using Sinatra 2.0.8. Basic Rspec for unit tests, with Capybara for feature testing. I'm excited about learning more CSS and frontend stuff!
