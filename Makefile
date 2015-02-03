runserver:
	hugo server --watch --buildDrafts --verboseLog=true -v

deploy:
	rm -rf public/*
	hugo
#	rsync -avp --delete public/ dest.example.org:/var/www/flg/

