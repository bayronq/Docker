docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Admin01." -e "MSSQL_PID=Express" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest -v /work/sqlserver-data:/var/opt/mssql
