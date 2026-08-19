# Config, secrets, migrations, running

## Config Files

`server/Infrastructure/SampleAuthServer/appsettings.Development.json`
Keys: `EfProvider`, `ConnectionStrings.Auth`

`server/Host/appsettings.Development.json`
Keys: `EfProvider`, `ConnectionStrings.Metadata`, and `ConnectionStrings.<ConnectionName>` for each appInstance in the Metadata.


## Migrations

From the folder `server`:

`dotnet ef migrations add "Initial Create" --project Migrations/Migrations_Auth_PostgreSql --startup-project Infrastructure/SampleAuthServer`

`dotnet ef migrations add "Initial Create" --project Migrations/Migrations_Runtime_PostgreSql --startup-project Host --context MetadataDbContext --output-dir "Migrations/Metadata"`

`dotnet ef migrations add "Initial Create" --project Migrations/Migrations_Runtime_PostgreSql --startup-project Host --context LobToolsDbContext --output-dir "Migrations/LobTools"`

Update database:
`dotnet ef database update --project Migrations/Migrations_Auth_PostgreSql --startup-project Infrastructure/SampleAuthServer`

`dotnet ef database update --project Migrations/Migrations_Runtime_PostgreSql --startup-project Host --context MetadataDbContext`

`dotnet ef database update --project Migrations/Migrations_Runtime_PostgreSql --startup-project Host --context LobToolsDbContext`