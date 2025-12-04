install: deps-install
	npx simple-git-hooks

deps-install:
	npm ci

deps-update:
	npx ncu -u

run:
	gendiff file1.json file2.json

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

.PHONY: test
