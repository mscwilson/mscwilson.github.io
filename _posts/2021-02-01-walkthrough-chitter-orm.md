---
layout: single
title: How to set up a Sinatra PostgreSQL app with ActiveRecord and RSpec
redirect_to: http://www.mirandawilson.tech/blog/2021/02/01/walkthrough-chitter-orm/
date:  2021-02-01 23:54:00
tags: Ruby Sinatra PostgreSQL ActiveRecord
---
Given that I spent quite a while working out how to do all of this yesterday, I wanted to write some fairly comprehensive notes on how I set up my [Chitter app](https://github.com/mscwilson/chitter-challenge). Here are the instructions almost entirely taken from this [one blog post](https://medium.com/@rileythompson/setting-up-a-simple-sinatra-blog-app-db56dda4c280) with some alterations. Feels a bit cargo-cult programming, a lot of copy-pasting randomly off StackOverflow posts, but it works! I might try adding more links when I go through all the many tabs open about it on my Firefox. There may well be many mistakes.

Edit: there were indeed several mistakes. I followed used these instructions with my Makers week 5 team, and with one of my peer group, to set up ActiveRecord. This was in existing repos at the point where the database was required. I've updated the walkthrough a bit based on problems we had. 


## Setting up a fully tested Sinatra Postgres app with ActiveRecord
### Specifically, the Chitter weekend challenge

ActiveRecord is an ORM. Object Relational Mapper.
[Here are all the basic details about it and how to use it]( https://guides.rubyonrails.org/active_record_basics.html). <strong>Using ActiveRecord means not writing any SQL or Model code or unit tests</strong>. Feels a bit like cheating.

These instructions are largely based on [this post](https://medium.com/@rileythompson/setting-up-a-simple-sinatra-blog-app-db56dda4c280).

### 1. Starting point
A folder initialised with git and bundle. No databases required.


### 2. Gemfile
Gemfile should have at least these gems:  

```ruby
# in Gemfile
source 'https://rubygems.org'

gem "sinatra" # self-explanatory
gem "pg" # postgreSQL
gem "activerecord" # the ORM
gem "sinatra-activerecord" # so it works with Sinatra
gem "rake" # to run scripts ??
gem "bcrypt" # password encryption

group :test do
  gem 'rspec' # tests
  gem 'rubocop', '0.79.0' # correct Ruby
  gem 'simplecov', require: false # test coverage
  gem 'simplecov-console', require: false # graphical test coverage
  gem "capybara" # feature tests
end
```
Run `bundle` to install everything.  
May as well initialise rspec ready for later `rspec --init`.


### 3. Make a Rakefile
`touch Rakefile`  
This file allows the use of "rake", which will be used to run the commands about the databases.

The minimum to put in here is  
```ruby
# in Rakefile
require "sinatra/activerecord/rake"
```
Because the gem sinatra-activerecord provides some "Rake tasks". Don't know what they are really. If this file doesn't work, I copied this off someone else:  
```ruby
# in Rakefile
require "sinatra/activerecord/rake"

namespace :db do
  task :load_config do
    require "./app"
  end
end
```
Confirm that rake was installed correctly by listing the possible commands with:
`rake -T`  


### 4. Database config
Three files are needed to define how the databases (not the tables inside yet, just the databases) should be created and set up.    
First do:
`mkdir config`

* <strong>4.1</strong> First one says which databases to make based on the environment. I believe rake will read this file in to create them automatically.    
`touch config/database.yml`  
It's a YAML file. Don't know what that is.  
Write inside:  

```
 # in config/database.yml
 # this defines the database for the development environment (default environment)
development:
 # the type of database it will be
 adapter: postgresql 
  # name of db to make
 database: chitter-development

 # same but for test env
test:
 adapter: postgresql
 database: chitter-test
```
<strong>NB this file is very strict with whitespace</strong>. No spaces allowed before `development` or `test`.

Some instructions for this file listed all kinds of different parameters like "pool" and "host" but I don't know what they are and I'm guessing they're only required for deployment. Can also add instructions here for a deployment db.

* <strong>4.2</strong> Second file is for ActiveRecord to connect to the databases that are going to be made. It defines which database to use in which environment  
`touch config/database.rb`  
Paste this in:  

```ruby
 # in config/database.rb
 # set the database based on the current environment
 # The name Chitter in the below line is because my main app controller class in app.rb is called Chitter
database_name = "chitter-#{Chitter.environment}"
db = URI.parse( ENV['DATABASE_URL'] || "postgres://localhost/#{database_name}")

 # connect ActiveRecord with the current database
ActiveRecord::Base.establish_connection(
 :adapter => db.scheme == "postgres" ? "postgresql" : db.scheme,
 :host => db.host,
 :port => db.port,
 :username => db.user,
 :password => db.password,
 :database => "#{database_name}",
 :encoding => "utf8"
)
```
* <strong>4.3</strong> Final file is to tell Sinatra where the relevant files are. I don't know if this is necessary?? It's in case your folder structure is non-standard and Sinatra gets confused. Or for big projects maybe  
`touch config/environment.rb`  

```ruby
 # in config/environment.rb
 # get the path of the root of the app
 # assuming that this file is one folder down in config/
APP_ROOT = File.expand_path("..", __dir__)

 # require the controller(s)
 # says that app.rb is in the root
Dir.glob(File.join(APP_ROOT, "app", "*.rb")).each { |file| require file }

 # require the model(s)
 # models stored in lib/
Dir.glob(File.join(APP_ROOT, "lib", "*.rb")).each { |file| require file }

# require database configurations
# the database setup files that were just made in config/
require File.join(APP_ROOT, "config", "database")

# configure Chitter settings
# This bit of config could also be done in the main app class definition
# This is monkey-patching onto the main class definition
# I suppose it's neater to move it here
# The public/ folder is where images and stylesheets should be, the last line confirms that location
class Chitter < Sinatra::Base
 set :method_override, true
 set :root, APP_ROOT
 set :views, File.join(APP_ROOT, "views")
 set :public_folder, File.join(APP_ROOT, "public")
end
```


### 5. Configure tests with spec_helper.rb
The order in which things are set or required matters. At the top, require simplecov maybe? Otherwise, setting the ENV should be the first thing.  

It should look like this at the top:  

```ruby
 # in spec/spec_helper.rb
 # the SimpleCov stuff is for test coverage, not essential
require 'simplecov'
require 'simplecov-console'
SimpleCov.start

# very important line to say that tests are run in "test" environment
ENV["RACK_ENV"] = "test"
# imports the actual controller file
require_relative "../app"

require "rspec"
require "capybara"
require "capybara/rspec"

# tells Capybara what the app is for the feature tests
Capybara.app = Chitter
```


### 6. Write a feature test about visiting the home page (tests first remember?)
You know how to do that. It will say, uninitialised constant Chitter or something.  


### 7. Set up the app.rb file
It should be mostly the same as a normal modular Sinatra app file, with a couple of extra things.  
```ruby
# in app.rb
require "sinatra/base"
# an extra gem to require
require "sinatra/activerecord"

# BCrypt for encrypting the passwords
require "bcrypt"

class Chitter < Sinatra::Base
  register Sinatra::ActiveRecordExtension
end
```


### 7. Creating the databases!
Create databases for test and development environments:  
`rake db:create`  

It reads in from the databases.yml file to see what to make.  
Should confirm:  
```
Created database 'chitter-development'
Created database 'chitter-test'
```
If this doesn't work, check the whitespace in your database.yml file.


### 8. Remember the config.ru file
If want to run with rackup. Put this in root.  
```ruby
# in config.ru
require_relative "app"
run Chitter
```


### 9. Adding stuff to the database(s), or changing existing stuff in there
When using ActiveRecord, no SQL is needed!  
To make a change to a database, use rake to make a template for it to run. Run this, with a description of the change you're doing - in snake_case - for NAME:  
`rake db:create_migration NAME=what_i_want_the_change_to_be`  

Then it will make a file, plus the folders if necessary, in `db/migrate/timestamp-what_i_want_the_change_to_be`.  

Inside the file will be an empty template like this:  
```ruby
# in empty migration file, within db/migrate
class WhatIWantTheChangeToBe < ActiveRecord::Migration[6.1]
  def change
  end
end
```
It will name the file what you entered for `NAME=`, and the class inside gets named the same but in CamelCase. <strong>NB:</strong> this class must not have the same name as your app controller class. Also, if you want to change the name of the class inside here, it won't work to edit it, just make a new migration with the right name.

Instead of SQL, fill in the change method with ActiveRecord syntax instructions, like this:  
```ruby
# in db/migrate/<timestamp>-create_posts.rb
class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    # makes a table called "posts"
      # has a column called "text", type is text
      # column "author_name", a string
      # automatically makes created_at and modified_at columns
    create_table :posts do |t|
      t.text :text
      t.string :author_name
      t.timestamps
    end
  end
end
```
The numeric primary key is made automatically, no need to list that column.  

<strong>To create the table in the databases</strong>, have to add it to each one separately using rake.  
Run:
```
rake db:migrate

rake db:migrate RACK_ENV="test"
```
It will confirm that it made the table.
You can then check with psql or TablePlus what the ActiveRecord "string" or "text" converted to in SQL terms, if you want.


### 10. Model classes with ActiveRecord NB naming is important
There is no need to write any database accessing code with ActiveRecord. But, it relies on the naming convention discussed [here](https://edgeguides.rubyonrails.org/active_record_migrations.html#migrations-and-seed-data) iirc. Specifically, the <strong>model classes have to be named in singular and the db tables the same but plural</strong>.  

Here's the Post class which will be for accessing and wrapping info from the posts table.  
```ruby
# in lib/post.rb
class Post < ActiveRecord::Base
end
```
That's it. It gets all the methods inherited from ActiveRecord.  

Here's the User class (for users table), it has an extra line.  
```ruby
# in lib/user.rb
class User < ActiveRecord::Base
  # ActiveRecord method for authentication using BCrypt
  has_secure_password
end
```
That method, `has_secure_password`, allows Sinatra to use an authenticate method for passwords (eg `user.authenticate(params["password"]`), so it's easy to check if they entered the correct one on logging in. Assuming you used encryption before saving it. This is how to encrypt a password after it comes in off registration form:  
```ruby
# in app.rb
 encrypted_password = BCrypt::Password.create(params["password"])
```
<strong>NB the encrypted passwords must be saved into a column called "password_digest", not "password", to use the user.authenticate method</strong>.  


### 10. Adding data to the database in the controller
Data comes into the controller off the HTML forms, into params. Eg user entering a post and their name.  

Given that the posts table currently has columns for text (content), author name and datetime, can save the data into the database with something like:  
```ruby
# in app.rb
  post "/new_post/:id" do
    # Post.new adds a new row in the db
    # the hash keys I'm giving are the column names off the table
    post = Post.new("text": params["text"], "author_name": params["name"])
    post.save ? (redirect "/") : "failed to create a post!"
  end
```
See below, step 13, for more of my usage examples.

You don't need to say what time it was made (for the created_at column), ActiveRecord automatically fills that in. 


### 11. Clearing out the test database before each test
Add this to the spec_helper, just after `RSpec.configure do |config|`  
```ruby
#in spec/spec_helper.rb
  config.before(:each) do
    ActiveRecord::Base.subclasses.each(&:delete_all)
  end
```
ActiveRecord will delete all data in the (test) tables.  


### 12. Adding more tables to databases or changing existing columns
For every change, make a new migration file with `rake db:create_migration NAME=whatever`  

Mine looked like this to make the users table:  
```ruby
# in db/migrate/<timestamp>-create_users.rb
class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
       # password_digest not password column, because encyrpted
      t.string :password_digest
      t.string :real_name
      t.string :username
    end
  end
end
```
NB again, the encrypted passwords must be saved into a column called "password_digest", not "password", to use the user.authenticate method.  

Run the `rake db:migrate` for both environments to update the tables.  

Then I wanted to change the column in posts table to be a user_id foreign key instead of the string "author_name". Another migration file.  
```ruby
# in db/migrate/<timestamp>-rename_author_name_to_user_id.rb
class RenameAuthorNameToUserId < ActiveRecord::Migration[6.1]
  def change
    # removes the unwanted column "author_name" from table "posts"
    remove_column :posts, :author_name

    # makes a new column "user_id" in "posts" table, of type "bigint"
    # specially has to be called user_id, to be a foreign key for the id column of users table
    # primary/foreign keys must be bigint
    add_column :posts, :user_id, :bigint

    # is this the JOIN??? connects the two tables via the foreign key
    add_foreign_key :posts, :users
  end
end
```

Every time `rake db:migrate` is run, rake creates or updates a `schema.rb` file in db/ folder. This file contains the up-to-date details of how the database(s) are set up. This is the important file, the used migrations can be deleted. The whole database structure can be recreated from the schema file with `rake db:schema:load`.  


### 13. ActiveRecord methods I used in my Chitter app
```ruby
 # in app.rb
# taking form input from params, and wrapping into a Post with Post.new
# then saving into the db
post = Post.new("text": params["text"], "author_name": params["name"])
post.save

# same as doing SELECT * FROM posts
@posts = Post.all
# as above but somehow in reverse chronological order
@posts = Post.all.order(created_at: :desc)

# find row in db by user ID (primary key)
@user = User.find(session[:session_user_id])

# find row(s) in db by something other than ID key
# returns a list, hence then calling first ([0])
user = User.where("email": params["email"]).first

# looking up user with the entered (unique) email
# for login
user = User.where("email": params["email"]).first
    if user.authenticate(params["password"])
      # if this is true then it's the right password and they can log in

```


### 14. Recreating the database from the schema.rb
The db/schema.rb file describes the current database setup. If other people on the team have the databases with the right name, they can update their dbs from a schema.rb file by running:
```
rake db:schema:load

rake db:schema:load RACK_ENV=test
```
Once each for the development and test dbs. 


### 15. Easily make a Sinatra+Postgres webapp!
Be smug about not needing unit tests etc. And also about the ease of maintaining identical databases across the team, if applicable.


### 16. Advanced: putting data into the database automatically?
It is also possible to automatically populate the databases with records and info, instead of everyone manually entering it. I have not tried this. The "easiest" way looks to be to get a `seed.rb` or `seeds.rb` file in the db/ folder. Then can run:  
`rake db:seed`  
and it will magically put the data in the database.  
However, how does the data get into the `seed.rb` file? Some quick research suggests that at this point - assuming it works with Sinatra and not just Rails - the [best bet is the gem Seed Dump](https://medium.com/adventures-in-code/seed-dump-ruby-gem-b74cc8bdfdc). It saves (dumps) all the data that's been already entered and is in the db into a seed file. `rake db:seed:dump`  
Then, everyone in the team can use that seed.rb file to populate the dbs so everyone is using the same data without having to manually enter loads of things.


