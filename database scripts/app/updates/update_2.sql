USE app_db;

ALTER TABLE user
ADD FOREIGN KEY (parent_user)
REFERENCES user(id)