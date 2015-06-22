runserver:
	hugo --buildDrafts --verboseLog=true -v
	mv public/json/all/index.html public/js/all.json
	./checkjson.py
	hugo server --watch --buildDrafts --verboseLog=true -v

deploy:
	rm -rf public/*
	/usr/local/bin/hugo -s . -b 'https://flgstatic.stage.ccnmtl.columbia.edu/' \
	&& mv public/json/all/index.html public/js/all.json \
	&& ./checkjson.py \
	&& s3cmd --acl-public --delete-removed --no-progress sync public/* s3://flgstatic.stage.ccnmtl.columbia.edu/ \
  && s3cmd --acl-public -m text/css sync public/css/* s3://flgstatic.stage.ccnmtl.columbia.edu/css/
