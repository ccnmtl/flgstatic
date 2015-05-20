+++
title = "JSON dump of all content"
date = "2015-03-20T13:29:00+01:00"
type = "json"
+++

This is a piece of dummy content. It exists to trigger Hugo into
generating a "public/json/all/index.html" file, which gets populated
by the template in "layouts/json/single.html", which generates a big
JSON dump of all the site content (via some crude but relatively
effective templating). That output file can then by manually moved to
"static/js/all.json" after the site is built and before it is deployed
to production.

The body text of this file is ignored. I just put it in here as
a convenient spot to document how this particular bit of functionality
goes together. Hugo does require it to have a title and date
in the frontmatter, though again, we're just going to ignore them.

Advantages of this approach:

* the only non-Hugo component needed is a "mv" command in the
  makefile. No Nodejs or Python installs needed.

Disadvantages:

* developing in watch mode will regenerate the json file, but Hugo
  doesn't know to move it into the right place. So the actual json
  file can be stale. Usually not a big deal. If you're adding new
  content, it's probably not essential to see it appear instantly in
  search results during development. If you're working on JS
  functionality that relies on the JSON file, you're probably not
  adding/changing much content at the same time. For the 'runserver'
  target in the Makefile here, it builds once, moves the json file
	to the right place, then runs hugo with "--watch". So it gets
  created, but only once when you run the 'make runserver'.
* generating JSON via templating is obviously a bit hairy and
  potentially error prone. Hugo seems to do a good job of escaping
  things, but I haven't really put that through the ringer. The
  templating approach gives you a lot of flexibility on what JSON is
  generated, but the downside is that there's no built in validation
  on it. So it's not that hard to make brittle templates that will
  output invalid JSON and break whatever functionality depends on it
  and you probably won't notice until it's made it to production. The
  deployment process ought to include some kind of JSON validation
  step to help catch those problems.
* The `PlainWords` method does an OK job of stripping out extraneous
  markup, but gets confused a bit by shortcode rendering. So the
  generated plaintext version of the content tends to have a bunch of
  stray HTML cruft. This is fine for FLG's purposes since we're just
  feeding that into a search index. For other applications, it might
  not be OK and you'll need to figure out a better way to clean it
  up. It's also worth noting that `PlainWords`, though technically a
  public method on the `Page` object, isn't actually mentioned
  anywhere in the Hugo docs. I found it by reading the code (often
  necessary with Hugo at this young stage). There's a strong
  convention among Go developers to not break backwards compatibility
  on public APIs, but it wouldn't be terribly surprising if this
  method disappears or changes in future Hugo releases.
