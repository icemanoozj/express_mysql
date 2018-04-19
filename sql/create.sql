create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(32),
    password varchar(32),
    company  varchar(128),
    dept  varchar(128),
    title varchar(128),
    access_counter int,
    created_at datetime,
    updated_at datetime,
    deleted_at datetime
);