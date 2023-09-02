dev: build
	docker kill tablet-clock || true
	docker rm tablet-clock || true
	docker run --rm -p 90:90  -v $(shell pwd):/src  --name tablet-clock tablet-clock

build:
	docker build . -t tablet-clock -t jbeeson/tablet-clock

dev_shell:
	docker exec -it tablet-clock bash

install:
	rsync -arvD * $(SSH_TARGET):~/tablet-clock
	ssh $(SSH_TARGET) bash -c "'cd tablet-clock && docker-compose build'"
	ssh $(SSH_TARGET) bash -c "'cd tablet-clock && docker-compose down'"
	ssh $(SSH_TARGET) bash -c "'cd tablet-clock && docker-compose up -d'"

push: build
	docker push jbeeson/tablet-clock