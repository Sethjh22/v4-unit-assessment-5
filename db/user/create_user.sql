INSERT INTO helo_users
(username, passowrd, profile_pic)
VALUES
($1, $2, $3)
RETURNING *