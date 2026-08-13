# Config, secrets, migrations, running

## Config Files

`server/Infrastructure/SampleAuthServer/appsettings.Development.json`
Keys: `EfProvider`, `ConnectionStrings.Auth`

`server/Host/appsettings.Development.json`
Keys: `EfProvider`, `ConnectionStrings.Metadata`, and `ConnectionStrings.<ConnectionName>` for each appInstance in the Metadata.


## Migrations

From the folder `server`:

`dotnet ef migrations add "Initial Create" --project Migrations/Migrations_Auth_PostgreSql --startup-project Infrastructure/SampleAuthServer`

Update database:
`dotnet ef database update --project Migrations/Migrations_Auth_PostgreSql --startup-project Infrastructure/SampleAuthServer`