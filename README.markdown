Experimental [Hugo](http://http://gohugo.io/) based version of the
[Film Language Glossary](http://ccnmtl.columbia.edu/projects/filmglossary/).

To work on this code, obviously you will need Hugo installed. The
current version that this project uses is 0.12.

## Content Editing

To add a new clip to the glossary, run:

    $ hugo new clip/name-of-new-clip.md

The convention needs to be followed:

* start it with 'clip/' (so Hugo knows that you are creating a Clip)
* filename ends with '.md'
* filename should-be-lowercase-with-dashes-and-no-punctuation

That will create the file `content/clip/name-of-new-clip.md` that will
look something like the following:

    +++
    commentary = ""
    date = "2015-02-02T16:22:12+01:00"
    director = ""
    film = ""
    length = ""
    source = ""
    title = "name of new clip"
    year = ""
    clipterms = []
    thumb = ""
    quicktime = ""
    +++

Hugo automatically sets the date and title (based on the filename you
specified). Fill in the rest of the fields and save.

To run a preview version of the site, run:

   $ make runserver

and open http://localhost:1301/ to view it. Hugo will watch for
changes, automatically rebuilding the site. It will even automatically
reload your browser.

When you are done, save the file, `git add` it and commit and
push. The website will automatically be updated within a few minutes.

To define a new Term, run:

    $ hugo new term/a-new-term.md

Same deal as with clips. You'll get a new file in
`content/term/a-new-term.md` that looks like:

    +++
    date = "2015-02-03T11:54:14+01:00"
    term = ""
    title = "a new term"
    +++

This needs a little bit of care. You'll want to fix the title, of
course. Then (for reasons we won't get into right here), you need to
set `term = "a-new-term"`. Ie, the lowercase, dashed version.

After the final `+++` you can write up the full description of the
term. Syntax is Markdown.

Anywhere in the term description, you can embed a video clip entry
like so:

    {{% embed_clip "Name of New Clip" %}}

When you do that, Hugo will find the clip with that title and embed it
in your term description.

## Design/Layout

Templates are in the `layouts` directory. Hugo templating is very
powerful but not always intuitive. You will need to spend some quality
time with the Hugo documentation to figure out which templates
correspond to which pages and how they all fit together.
