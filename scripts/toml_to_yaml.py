import frontmatter

import glob

if __name__ == "__main__":
    for filename in glob.glob("content/clip/*.md"):
        print(filename)
        post = frontmatter.load(filename)
        try:
            with open(filename, "w") as output:
                output.write(frontmatter.dumps(post))
        except Exception, e:
            print(str(e))

    for filename in glob.glob("content/term/*.md"):
        print(filename)
        post = frontmatter.load(filename)
        try:
            with open(filename, "w") as output:
                output.write(frontmatter.dumps(post).encode('utf-8'))
        except Exception, e:
            print(str(e))
