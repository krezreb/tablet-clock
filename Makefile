dev: build
	docker kill tablet-clock || true
	docker rm tablet-clock || true
	docker run --rm -p 90:90  -v $(shell pwd):/src  --name tablet-clock tablet-clock

build:
	docker build . -t tablet-clock

dev_shell:
	docker exec -it tablet-clock bash

install:
	rsync -arvD * jumiserv1:~/tablet-clock
	ssh jumiserv1 bash -c "'cd tablet-clock && docker build . -t tablet-clock'"
	ssh jumiserv1 bash -c "'docker kill tablet-clock || true'"
	ssh jumiserv1 bash -c "'docker rm tablet-clock || true'"
	ssh jumiserv1 docker run -d -p 90:90 --restart always --name tablet-clock tablet-clock
