FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5190

ENV ASPNETCORE_URLS=http://+:5190

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
