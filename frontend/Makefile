# Frontend Makefile for ease to be able to launch commands in frontend directory instead of top-level directory

# Build frontend docker image from scratch
docker_build:
	docker build -t idb/frontend ./

# Update frontend docker image if changes were made to Dockerfile
docker_update:
	docker image rm idb/frontend
	docker build -t idb/frontend ./

# Run the frontend docker image
docker:
	docker run -p 3000:3000 --rm -it -v $(PWD)/frontend:/usr/frontend -w /usr/frontend idb/frontend
