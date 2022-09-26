# Build frontend docker image from scratch
fe_docker_build:
	docker build -t idb/frontend ./frontend

# Update frontend docker image if changes were made to Dockerfile
fe_docker_update:
	docker image rm idb/frontend
	docker build -t idb/frontend ./frontend

# Run the frontend docker image
fe_docker:
	docker run -p 3000:3000 --rm -it -v $(PWD)/frontend:/usr/frontend -w /usr/frontend idb/frontend
