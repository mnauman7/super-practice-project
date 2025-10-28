-- Provide app db access to app server user
GRANT ALL PRIVILEGES ON app_db.* TO 'app_server'@'%' WITH GRANT OPTION;
