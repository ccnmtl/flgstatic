#!/usr/bin/env python
import requests
from bs4 import BeautifulSoup
import os.path
import os
import sys
import re
from datetime import datetime

base = "http://ccnmtl.columbia.edu/projects/filmglossary/web/"

class Term(object):
    def __init__(self, url, title):
        self.url = url
        self.filename = url.split('/')[-1]
        self.file_base = os.path.basename(self.filename)
        self.slug = os.path.splitext(self.file_base)[0].replace('_', '-')
        self.soup = None

        self.title = title
        self.date = datetime.now().strftime("%Y-%m-%dT%H:%M:%S+01:00")
        self.text = ""

    def local_path(self):
        return "content/term/" + self.slug + ".md"

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
        body = requests.get(self.url).content
        print(" - downloaded")
        self.soup = BeautifulSoup(body)
        print(" - parsed")
        self.extract_text()
        print(self.text)
        with open(self.local_path(), "w") as f:
            f.write(self.yaml())
            f.write("\n\n")
            f.write(self.text.encode('utf-8'))

    def extract_text(self):
        paras = []
        for p in self.soup.find_all('p')[3:]:
            t = p.get_text()
            paras.append(p.get_text())
        self.text = "\n\n".join(paras)

    def yaml(self):
        return u"""+++
title = "{title}"
term = "{term}"
date = "{date}"
+++""".format(
    title=self.title, term=self.slug, date=self.date,
).encode('utf-8')


class DummyTerm(object):
    def __init__(self, **kwargs):
        pass

    def pull(self):
        return None


def extract_term_filename(a):
    if 'href' not in a.attrs:
        return DummyTerm()
    if 'filmglossary/web/terms/' not in a.attrs['href']:
        return DummyTerm()
    return Term(a.attrs['href'], a.text)


def main():
    body = requests.get(base + "filmterms.html").content
    soup = BeautifulSoup(body)
    for a in soup.find_all('a'):
        clip = extract_term_filename(a)
        clip.pull()

if __name__ == "__main__":
    main()
