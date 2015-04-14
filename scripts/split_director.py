import frontmatter
import toml

import glob

if __name__ == "__main__":
    for filename in glob.glob("content/clip/*.md"):
        print(filename)
        post = frontmatter.load(filename)
        director = post.get('director', {})
        if ', ' not in director:
            continue
        try:
            last, first = director.split(', ')
            post['director_last'] = last.strip()
            post['director_first'] = first.strip()
            del post['director']
            with open(filename, "w") as output:
                output.write("+++\n")
                output.write(toml.dumps(post.metadata).encode('utf-8'))
                output.write("+++\n")
        except Exception, e:
            print(str(e))

