CREATE USER 'zhujian'@'%' IDENTIFIED BY 'weijing';
CREATE DATABASE `demodb` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON demodb.* TO 'zhujian'@'%';
