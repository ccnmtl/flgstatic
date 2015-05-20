runserver:
	hugo --buildDrafts --verboseLog=true -v
	mv public/json/all/index.html public/js/all.json
	hugo server --watch --buildDrafts --verboseLog=true -v

deploy:
	rm -rf public/*
	/usr/local/bin/hugo -s . -b 'http://flgstatic.stage.ccnmtl.columbia.edu/' \
	&& mv public/json/all/index.html public/js/all.json \
	&& rsync -avp --delete public/ selma.ccnmtl.columbia.edu:/var/www/flgstatic/

