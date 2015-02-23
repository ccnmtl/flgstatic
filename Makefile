runserver:
	hugo server --watch --buildDrafts --verboseLog=true -v

deploy:
	rm -rf public/*
	/usr/local/bin/hugo-0.13 -s . -b 'http://flgstatic.stage.ccnmtl.columbia.edu/' && rsync -avp --delete public/ selma.ccnmtl.columbia.edu:/var/www/flgstatic/

