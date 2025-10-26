USE app_db;

ALTER TABLE user
ADD parent_user INT(4) UNSIGNED

ALTER TABLE user
ADD FOREIGN KEY (parent_user)
REFERENCES user(id)