---
layout: single
title: Learning how to use Sublime
date:  2021-02-14 15:37:00
tags: Sublime
---
JavaScript is growing on me. I'll post something about it at some point. Right now I am very pleased with myself for having done some "advanced" stuff with Sublime Text.

A few days ago I discovered [Snippets](https://www.freecodecamp.org/news/a-guide-to-preserving-your-wrists-with-sublime-text-snippets-7541662a53f2/), ie tab-autocomplete commands. I was envious of my pair partners who could tab-autocomplete to get `console.log()`, and it didn't seem that Sublime had that built in. So I followed [these instructions](https://gist.github.com/cabans/6d1663372b534403bd55e2a2501227b7) to add my own console.log autocomplete. Of course, it turned out that Sublime did it already, just off "l" rather than "log" like I tried. But, in setting up this snippet I discovered that I had been using autocomplete wrong anyway! I didn't realise you could continue to tab through jump points in the generated text, depending where the cursor points had been placed in the snippet. Like if I press "f" then tab (in a .js file), it does `function(<cursor flashing here>) {}`. I thought that was annoying because usually there are no arguments. But another tab press moves the cursor straight into the curly brackets!  

This evening I have triumphed again and added a key binding to switch between light and dark themes. I've been using the [Skins](https://github.com/deathaxe/sublime-skins) plugin (written by someone called Deathaxe, great name) but that involved manually switching skins over through the Command Palette. So I again followed the instructions of [helpful](https://forum.sublimetext.com/t/modifying-color-scheme-and-theme-globally-with-a-keyboard-shortcut/49406) [people](https://stackoverflow.com/questions/13121687/keyboard-shortcut-to-change-color-scheme-in-sublime-text-2/14687195), and created my own Sublime plugin!  

This is the plugin:
```python
import sublime
import sublime_plugin

class ToggleColorsThemesCommand(sublime_plugin.TextCommand):
  def run(self, edit, **args):
    settings = sublime.load_settings("Preferences.sublime-settings")

    light_theme = args["light_theme"]
    dark_theme = args["dark_theme"]

    light_color_scheme = args["light_color_scheme"]
    dark_color_scheme = args["dark_color_scheme"]

    current_theme = settings.get("theme", light_theme)

    if current_theme == light_theme:
      settings.set("theme", dark_theme)
      settings.set("color_scheme", dark_color_scheme)
    else:
      settings.set("theme", light_theme)
      settings.set("color_scheme", light_color_scheme)

    sublime.save_settings("Preferences.sublime-settings")
```

Extremely nice to see some Python code again. I'd like to go back to it one day <3.  

Here's my setting from Sublime key bindings:
```json
  { "keys": ["§"], "command": "toggle_colors_themes",
    "args": {
      "light_theme": "ayu-light.sublime-theme",
      "dark_theme": "Adaptive.sublime-theme",
      "light_color_scheme": "Packages/Rainglow/rainglow/Lavender Light (rainglow).tmTheme",
      "dark_color_scheme": "Packages/Dracula Color Scheme/Dracula.tmTheme"
    }
  }
```
That random key next to the "1" key wasn't being used for anything! So it's just one key press to switch the colours over. Of course, the ideal would be to have it automatically change colour when the Mac system changes over. Someone has written a plugin for Sublime 4, currently in semi-public beta, to do that.


My husband put this album, No Dawn for Men, on earlier. The very first chord, an accordion, I thought was leading into the Captain Pugwash theme. But it wasn't Captain Pugwash! It was black metal. Atmospheric, Lord of the Rings-themed black metal, from an explicitly feminist and anti-fascist band with the amazing name Feminazgul. Not bad.
{% include youtube.html youtube_id="ZFxT9XquVtE" %}
