FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["LeaderBoardApi.csproj", "./"]
RUN dotnet restore "LeaderBoardApi.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "LeaderBoardApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LeaderBoardApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LeaderBoardApi.dll"]
