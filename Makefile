runserver:
	hugo --buildDrafts --verboseLog=true -v
	mv public/json/all/index.html public/js/all.json
	./checkjson.py
	hugo server --baseUrl=http://kodos.ccnmtl.columbia.edu/ --bind=0.0.0.0 --port=13093 --watch --buildDrafts --verboseLog=true -v

deploy:
	rm -rf public/*
	/usr/local/bin/hugo -s . -b 'https://flgstatic.stage.ccnmtl.columbia.edu/' \
	&& mv public/json/all/index.html public/js/all.json \
	&& ./checkjson.py \
	&& s3cmd --acl-public --delete-removed --no-progress --no-mime-magic --guess-mime-type sync public/* s3://flgstatic.stage.ccnmtl.columbia.edu/
