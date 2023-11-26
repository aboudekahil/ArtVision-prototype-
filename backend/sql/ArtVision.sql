create table if not exists users
(
    user_id           int auto_increment
        primary key,
    user_email        varchar(255)  not null,
    user_name         varchar(255)  null,
    user_display_name varchar(255)  null,
    user_password     varchar(255)  not null,
    user_bio          varchar(300)  null,
    user_profile      varchar(1000) null,
    constraint user_email
        unique (user_email)
);

create table if not exists rooms
(
    room_id       uuid                           not null
        primary key,
    room_name     varchar(255) default 'unnamed' not null,
    streamer_id   int                            not null,
    room_isactive tinyint(1)   default 1         not null,
    constraint rooms_users_user_id_fk
        foreign key (streamer_id) references users (user_id)
);


