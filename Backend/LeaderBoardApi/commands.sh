dotnet publish -c Release
docker build -t counter-image -f Dockerfile .
docker create --name leaderboard-api leaderboard-api
docker run -d -p 7190:8080 leaderboard-api 
docker start leaderboard-api
docker exec -it leaderboard-api /bin/bash