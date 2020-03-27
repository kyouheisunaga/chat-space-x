# Chat-Space


# DB design

## tweetsテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|-------|
|image|text|-------|
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|unique: true|

### Association
- has_many :tweets
- has_many :groups_users
- has_many :users, through: :groups_users

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false, default: "", unique: true|
|encrypted_password|string|null: false, default: "", unique: true|
|reset_password_token|string|-------|
|reset_password_sent_at|datetime|-------|
|remember_created_at|datetime|-------|
|name|string|null: false, unique: true, index: true|

### Association
- has_many :tweets
- has_many :groups_users
- has_many :groups, through: :groups_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user