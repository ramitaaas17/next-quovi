init-postgres-detached-to-terminal-container:
	docker run -d --name quovi_db \
		-p 5432:5432 \
		-e POSTGRES_PASSWORD=quovi_secret \
		-v ./quovi.sql:/docker-entrypoint-initdb.d/01-quovi.sql \
		-v ./InsertDummyData.sql:/docker-entrypoint-initdb.d/02-InsertDummyData.sql \
		postgres:latest

init-postgres-attached-to-terminal-container:
	docker run --name quovi_db \
		-p 5432:5432 \
		-e POSTGRES_PASSWORD=quovi_secret \
		-v ./quovi.sql:/tmp/quovi.sql:ro \
		-v ./InsertDummyData.sql:/tmp/InsertDummyData.sql:ro \
		postgres:latest

execute-sql-init-file:
	docker exec -i quovi_db psql -U postgres -d postgres < ./quovi.sql

execute-sql-dummy-data:
	docker exec -i quovi_db psql -U postgres -d quovi_db < ./InsertDummyData.sql

access-postgres-container:
	docker exec -it quovi_db psql -U postgres -d quovi_db