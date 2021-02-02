---
layout: single
title: How to set up a Sinatra PostgreSQL app with ActiveRecord and RSpec
date:  2021-02-01 23:54:00
tags: Ruby Sinatra PostgreSQL ActiveRecord
---
Given that I spent quite a while working out how to do all of this yesterday, I wanted to write some fairly comprehensive notes on how I set up my Chitter app. Here are the instructions almost entirely taken from this [one blog post](https://medium.com/@rileythompson/setting-up-a-simple-sinatra-blog-app-db56dda4c280) with some alterations. Feels a bit cargo-cult programming, a lot of copy-pasting randomly off StackOverflow posts, but it works! I might try adding more links when I go through all the many tabs open about it on my Firefox. There may well be many mistakes.

# Setting up a fully tested Sinatra Postgres app with ActiveRecord
## Specifically, the Chitter weekend challenge

ActiveRecord is an ORM. Object Relational Mapper.
[Here are all the basic details about it and how to use it]( https://guides.rubyonrails.org/active_record_basics.html). <strong>Using ActiveRecord means not writing any SQL or Model code</strong>. Feels a bit like cheating.

These instructions are largely based on [this post](https://medium.com/@rileythompson/setting-up-a-simple-sinatra-blog-app-db56dda4c280).

### Starting point
A folder initialised with git and bundle. No databases required.

### Gemfile
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

### Make a Rakefile
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
Confirm that rake was installed correctly by listing the possible commands with `rake -T`  

### Database config
Three files are needed to define how the databases (not the tables inside yet, just the databases) should be created and set up.    
Put these files in a `config` directory.

* First one says which databases to make based on the environment. I believe rake will read this file in to create them automatically.    
`touch database.yml`  
It's a YAML file. Don't know what that is.  
Write inside:  

```
# in database.yml
development: # this defines the database for the development environment (default environment)
 adapter: postgresql # the type of database it will be
 database: chitter-development # name of db to make

 test: # test env details
 adapter: postgresql
 database: chitter-test
```
Some instructions for this file listed all kinds of different parameters like "pool" and "host" but I don't know what they are and I'm guessing they're only required for deployment.

* Second file is for ActiveRecord to connect to the databases that are going to be made. It defines which database to use in which environment  
`touch database.rb`  
Paste this in:  
```ruby
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
* Final file is to tell Sinatra where the relevant files are. I don't know if this is necessary?? It's in case your folder structure is non-standard and Sinatra gets confused. Or for big projects maybe  
`touch environment.rb`  

```ruby
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

### Creating the databases
Create databases for test and development environments:  
`rake db:create`  
It reads in from the databases.yml file to see what to make.  
Should confirm  
```
Created database 'chitter-development'
Created database 'chitter-test'
```
If this doesn't work, make them manually with psql.  

### Configure tests with spec_helper.rb
The order in which things are set or required matters. At the top, require simplecov maybe? Otherwise, setting the ENV should be the first thing.  

It should look like this at the top:  
```ruby
require 'simplecov'
require 'simplecov-console'

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

### Write a feature test about visiting the home page (tests first remember?)
You know how to do that. It will say, uninitialised constant Chitter or something.  

### Set up the app.rb file
It should be mostly the same as a normal modular Sinatra app file, with a couple of extra things.  
```ruby
# in app.rb
require "sinatra/base"
# an extra gem to require
require "sinatra/activerecord"
require "bcrypt"

class Chitter < Sinatra::Base
    # this line is probably needed
  register Sinatra::ActiveRecordExtension
end
```

### Remember the config.ru file
If want to run with rackup. Put this in root.  
```ruby
# in config.ru
require_relative "app"
run Chitter
```

### Adding stuff to the database(s)
When using ActiveRecord, <strong>no SQL is needed</strong>!  
To make a change to a database, use rake to make a template for it to run later. Run:  
`rake db:create_migration NAME=what_i_want_the_change_to_be`  

Then it will make a file, plus the folders if necessary, in `db/migrate/timestamp-what_i_want_the_change_to_be`.  

Inside the file will be an empty template like this:  
```ruby
# in empty migration file
class WhatIWantTheChangeToBe < ActiveRecord::Migration[6.1]
  def change
  end
end
```
Instead of SQL, fill in the change method with ActiveRecord syntax instructions, like this:  
```ruby
# in <timestamp>-create_posts.rb
class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    # makes a table called "posts"
    create_table :posts do |t|
        # has a column called "text", type is text
      t.text :tex, limit: 280
       # column "author_name", a string
      t.string :author_name
      # automatically makes created_at and modified_at columns
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

### Model classes with ActiveRecord NB naming is important
<strong>There is no need to write any database accessing code with ActiveRecord</strong>. But, it relies on the naming convention discussed [here](https://edgeguides.rubyonrails.org/active_record_migrations.html#migrations-and-seed-data) I think. Specifically, the <strong>model classes have to be named in singular and the db tables the same but plural</strong>.  

Here's the Post class which will be for accessing and wrapping info from the posts table.  
```ruby
# in post.rb
class Post < ActiveRecord::Base
end
```
That's it. It gets all the methods inherited from ActiveRecord.  

Here's the User class (for users table), it has an extra line.  
```ruby
# in user.rb
class User < ActiveRecord::Base
  # ActiveRecord method for authentication
  has_secure_password
end
```
That method, `has_secure_password`, allows Sinatra to use an authenticate method for passwords (eg `user.authenticate(params["password"]`), so it's easy to check if they entered the correct one on logging in. Assuming you used encryption before saving it:  
```ruby
# in app.rb
 encrypted_password = BCrypt::Password.create(params["password"])
```

### Adding data to the database in the controller
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
Other useful methods are `Post.all` to read out all the rows in posts table (into a list I think) so can display them on the homepage. Or `Post.where("author_name": "miranda")`, `Post.find(id)`, etc.  

You don't need to say what time it was made, ActiveRecord automatically fills that in. Btw then to read the time out to look nice would be like `post.created_at.strftime("%k:%M, %e %b %Y")` if post is a thing in Post.all.  

### Clearing out the test database before each test
Add this to the spec_helper, just after `RSpec.configure do |config|`  
```ruby
#in spec_helper.rb
  config.before(:each) do
    ActiveRecord::Base.subclasses.each(&:delete_all)
  end
```
ActiveRecord will delete all data in the (test) tables.  

### Adding more tables to databases or changing existing columns
For every change, make a new migration file with `rake db:create_migration NAME=whatever`  

Mine looked like this to make the users table:  
```ruby
# in <timestamp>-create_users.rb
class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :real_name
      t.string :username
    end
  end
end
```
Again, run the `rake db:migrate` for both environments.  

Then I wanted to change the column in posts table to be a user_id foreign key instead of the string "author_name". Another migration file.  
```ruby
# in <timestamp>-rename_author_name_to_user_id.rb
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

Every time `rake db:migrate` is run, rake creates or updates a `schema.rb` file in db/ folder. This file contains the up-to-date details of how the database(s) are set up. I believe that this is the important file, the used migrations can be deleted. The whole database structure can be recreated from the schema file with the right rake db command.  

### Putting data into the database automatically?
It is also possible to automatically populate the databases with records and info, instead of everyone manually entering it. I have not tried this. The "easiest" way looks to be to get a `seed.rb` or `seeds.rb` file in the db/ folder. Then can run:  
`rake db:seed`  
and it will magically put the data in the database.  
However, how does the data get into the `seed.rb` file? Some quick research suggests that at this point - <strong>assuming it works with Sinatra and not just Rails</strong> - the [best bet is the gem Seed Dump](https://medium.com/adventures-in-code/seed-dump-ruby-gem-b74cc8bdfdc). It saves (dumps) all the data that's been already entered and is in the db into a seed file. `rake db:seed:dump`  
Then, everyone in the team can use that seed.rb file to populate the dbs so everyone is using the same data without having to manually enter loads of things.


