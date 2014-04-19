test:
	./node_modules/.bin/mocha --reporter list -R spec --recursive \
		./_tests

.PHONY: test