dotnet publish -c Release
docker build -t leaderboard-api -f Dockerfile .
docker volume create leaderboard-db
docker run -dp 7190:8080 -v leaderboard-db:/data leaderboard-api
docker exec -it leaderboard-api /bin/bash