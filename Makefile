STAGING_URL=https://filmglossary.stage.ccnmtl.columbia.edu/
PROD_URL=https://filmglossary.ccnmtl.columbia.edu/
STAGING_BUCKET=flgstatic.stage.ccnmtl.columbia.edu
PROD_BUCKET=filmglossary.ccnmtl.columbia.edu
INTERMEDIATE_STEPS ?= make $(PUBLIC)/js/all.json
HUGO=/usr/local/bin/hugo-0.15

JS_FILES=static/js/search.js static/js/srcswap.js static/js/alphalist.js static/js/bgswap.js \
static/js/scrollshrink.js static/js/scrollspy.js static/js/widgets.js

all: eslint

include *.mk

$(PUBLIC)/js/all.json: $(PUBLIC)/json/all/index.html
	mv $< $@ \
	&& ./checkjson.py
