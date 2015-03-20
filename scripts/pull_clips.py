#!/usr/bin/env python
import requests
from bs4 import BeautifulSoup
import os.path
import os
import sys
import re
from datetime import datetime

base = "http://ccnmtl.columbia.edu/projects/filmglossary/web/"

class Clip(object):
    def __init__(self, filename, tr):
        self.filename = filename
        self.file_base = os.path.basename(self.filename)
        self.slug = os.path.splitext(self.file_base)[0].replace('_', '-')
        self.soup = None
        self.tr = tr

        self.title = ""
        self.director = ""
        self.source = ""
        self.year = ""
        self.commentary = ""
        self.film = ""
        self.length = ""
        self.quicktime = ""
        self.date = datetime.now().strftime("%Y-%m-%dT%H:%M:%S+01:00")
        self.related = []

    def url(self):
        return base + self.filename

    def local_path(self):
        return "content/clip/" + self.slug + ".md"

    def exists(self):
        """ it's already there. don't overwrite it"""
        try:
            os.stat(self.local_path())
            return True
        except OSError:
            return False

    def pull(self):
        if self.exists():
            print("*** %s already exists. not overwriting" % self.slug)
            return
        print("=== " + self.local_path() + " ===")
        body = requests.get(self.url()).content
        print(" - downloaded")
        self.soup = BeautifulSoup(body)
        print(" - parsed")
        self.extract_title()
        self.extract_film()
        self.extract_length()
        self.extract_year()
        self.extract_director()
        self.extract_quicktime()
        self.extract_commentary()
        self.extract_related()
        self.extract_source()
        print(self.yaml())
        with open(self.local_path(), "w") as f:
            f.write(self.yaml())

    def extract_title(self):
        self.title = self.tr.td.a.text

    def extract_film(self):
        self.film = self.tr.find_all('td')[1].text

    def extract_length(self):
        t = self.tr.td.text
        self.length = re.search(r'(\d:\d\d)', t).groups()[0]

    def extract_year(self):
        self.year = self.tr.find_all('td')[3].text

    def extract_director(self):
        self.director = self.tr.find_all('td')[2].text

    def extract_commentary(self):
        if self.tr.find_all('td')[4].img:
            i = self.tr.find_all('td')[4].img
            if i.attrs['src'] == "../images/comm.gif":
                self.commentary = "commentary"
            elif i.attrs['src'] == "../images/anncomm.gif":
                self.commentary = "annotated"

    def extract_quicktime(self):
        d = self.soup.find(id='clip')
        s = d.script.text
        m = re.search(r'QT_WriteOBJECT\(\'\.\./mov/([\w\.]+)\'', s)
        if m:
            self.quicktime = m.groups()[0]

    def extract_related(self):
        r = self.soup.find(id='relatedqt')
        for a in r.find_all('a'):
            self.related.append(a.text)

    def related_yaml(self):
        return "[" + ",".join(["\"%s\"" % s for s in self.related]) + "]"

    def extract_source(self):
        d = self.soup.find('div', {'class':"popvidinfo"})
        t = d.get_text()
        self.source = t.split('\n')[5]

    def yaml(self):
        return u"""+++
title = "{title}"
commentary = ""
date = "{date}"
director = "{director}"
film = "{film}"
length = "{length}"
source = "{source}"
clipterms = {related}
quicktime = "{quicktime}"
year = "{year}"
+++""".format(
    year=self.year, title=self.title, director=self.director,
    film=self.film, length=self.length, source=self.source,
    date=self.date, quicktime=self.quicktime, related=self.related_yaml(),
).encode('utf-8')


class DummyClip(object):
    def __init__(self, **kwargs):
        pass

    def pull(self):
        return None


def extract_clip_filename(a):
    if 'href' not in a.attrs:
        return DummyClip()
    if not a.attrs['href'].startswith('javascript:open_vidwindow'):
        return DummyClip()
    return Clip(a.attrs['href'].split("\'")[1], a.parent.parent)


def main():
    body = requests.get(base + "filmclips.html").content
    soup = BeautifulSoup(body)
    for a in soup.find_all('a'):
        clip = extract_clip_filename(a)
        clip.pull()

if __name__ == "__main__":
    main()
