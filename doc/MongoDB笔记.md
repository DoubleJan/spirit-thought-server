# 数据库管理

## 一 登录与鉴权

### 1. 打开 shell

```bash
# 进入 mongo shell
[root@izbp1fchvpi93s0t7rz109z opt]# mongo
MongoDB shell version v4.2.3
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("66555e10-9b44-4971-9660-dde9ee1dacb2") }
MongoDB server version: 4.2.3
```

### 2. 鉴权

```bash
# 登录验证

# 1. 切换到 admin
> use admin
switched to db admin

# 2. 登录
> db.auth({user: "ybj", pwd: "9559"})
1
```

## 二 数据库

> 这些操作基本上需要先经过鉴权

### 1. 查看已有数据库

```bash
> show dbs
stmgt  0.000GB
```

### 2. 切换/创建数据库

```bash
# 切换到不存在的数据库时，会相当于创建数据库
# 但如果没有向数据库插入任何文档和数据，该数据库不存在
> use [dbname]

# > use admin
# switched to db admin
```

### 3. 删除数据库

```bash
# 切换到要删除的数据库
> use [dbname]

# 执行 db 的删除方法，删除数据库
> db.dropDatabase()
```

## 三 数据表（集合）

### 1. 查看已有集合

```bash
# 切换到数据库
> use stmgt
switched to db stmgt

# 查询该数据库下已有的表
> show collections
note
noteDirectory
user

# 另一个命令
> show tables
note
noteDirectory
user
```

### 2. 创建集合

```bash
> db.createCollection("article")
{ "ok" : 1 }
```

### 3. 删除集合

```bash
# 查询存在的数据库
> show dbs
stmgt  0.000GB

# 切换到该数据库
> use stmgt
switched to db stmgt

# 查询该数据库下的数据表
> show tables
article
health
note
noteDirectory
user

# 删除数据表
> db.health.drop()
true
```

## 三 文档

### 1. 插入文档

```bash
# 查询存在的表
> show tables
article
note
noteDirectory
user

# 在 article 表中插入数据
> db.article.insert({id: "1", title: "一篇文档"})
WriteResult({ "nInserted" : 1 })

# insertOne 插入一条数据
> db.article.insertOne({id: "2", title: "第二篇文档"})
{
  "acknowledged" : true,
  "insertedId" : ObjectId("5f7db493b9aefb1a12f406bd")
}

# insertMany 接受一个对象数组，默认顺序插入
> db.article.insertMany([{title: "第三篇"}, {title: "第四篇"}, {title: "第五篇"}])
{
  "acknowledged" : true,
  "insertedIds" : [
    ObjectId("5f7db595b9aefb1a12f406be"),
    ObjectId("5f7db595b9aefb1a12f406bf"),
    ObjectId("5f7db595b9aefb1a12f406c0")
  ]
}
```

### 2. 查询文档

#### (1) 查询全部文档

`db.collection.find([query])` 可以查询出所有的文档。 `query` 是可选的一个对象，每一个属性会被当做查询参数。

```bash
# 默认查询
> db.article.find()
{ "_id" : ObjectId("5f7db414b9aefb1a12f406bc"), "id" : "1", "title" : "一篇文档" }
{ "_id" : ObjectId("5f7db493b9aefb1a12f406bd"), "id" : "2", "title" : "第二篇文档" }
{ "_id" : ObjectId("5f7db595b9aefb1a12f406be"), "title" : "第三篇" }
{ "_id" : ObjectId("5f7db595b9aefb1a12f406bf"), "title" : "第四篇" }
{ "_id" : ObjectId("5f7db595b9aefb1a12f406c0"), "title" : "第五篇" }

# 美化输出
> db.article.find().pretty()
{
  "_id" : ObjectId("5f7db414b9aefb1a12f406bc"),
  "id" : "1",
  "title" : "一篇文档"
}
{
  "_id" : ObjectId("5f7db493b9aefb1a12f406bd"),
  "id" : "2",
  "title" : "第二篇文档"
}
{ "_id" : ObjectId("5f7db595b9aefb1a12f406be"), "title" : "第三篇" }
{ "_id" : ObjectId("5f7db595b9aefb1a12f406bf"), "title" : "第四篇" }
{ "_id" : ObjectId("5f7db595b9aefb1a12f406c0"), "title" : "第五篇" }

# 条件查询
> db.article.find({id: "1"})
{ "_id" : ObjectId("5f7db414b9aefb1a12f406bc"), "id" : "1", "title" : "一篇文档" }
# 直接把所有的参数写一起，表示 AND，没有结果就没有返回值
> db.article.find({id: "1", title: "第五篇"})
>
```

#### (2) 条件语句（WHERE）

`mongodb` 支持类似 sql 的条件查询语句。

| 操作       | 格式                       | 等效 Where 语句      |
| ---------- | -------------------------- | -------------------- |  |
| 等于       | `{ key: value }`           | `where key = value`  |
| 小于       | `{ key: { $lt: value } }`  | `where key < value`  |
| 小于或等于 | `{ key: { $lte: value } }` | `where key <= value` |
| 大于       | `{ key: { $gt: value } }`  | `where key > value`  |
| 大于或等于 | `{ key: { $gte: value } }` | `where key >= value` |
| 不等于     | `{ key: { $ne: value } }`  | `where key != value` |

```bash
# 小于
> db.article.find({id: {$lt: "3"}})
{ "_id" : ObjectId("5f7db414b9aefb1a12f406bc"), "id" : "1", "title" : "一篇文档" }
{ "_id" : ObjectId("5f7db493b9aefb1a12f406bd"), "id" : "2", "title" : "第二篇文档" }

# 小于等于
> db.article.find({id: {$lte: "2"}})
{ "_id" : ObjectId("5f7db414b9aefb1a12f406bc"), "id" : "1", "title" : "一篇文档" }
{ "_id" : ObjectId("5f7db493b9aefb1a12f406bd"), "id" : "2", "title" : "第二篇文档" }

# 大于
> db.article.find({id: {$gt: "1"}})
{ "_id" : ObjectId("5f7db493b9aefb1a12f406bd"), "id" : "2", "title" : "第二篇文档" }

# 大于等于
> db.article.find({id: {$gte: "1"}})
{ "_id" : ObjectId("5f7db414b9aefb1a12f406bc"), "id" : "1", "title" : "一篇文档" }
{ "_id" : ObjectId("5f7db493b9aefb1a12f406bd"), "id" : "2", "title" : "第二篇文档" }

# 不等于
> db.article.find({id: {$ne: "2"}})
{ "_id" : ObjectId("5f7db414b9aefb1a12f406bc"), "id" : "1", "title" : "一篇文档" }
{ "_id" : ObjectId("5f7db595b9aefb1a12f406be"), "title" : "第三篇" }
{ "_id" : ObjectId("5f7db595b9aefb1a12f406bf"), "title" : "第四篇" }
{ "_id" : ObjectId("5f7db595b9aefb1a12f406c0"), "title" : "第五篇" }
```

#### (3) 或条件（OR）

```javascript
db.collection.find({
  $or: [
    { key1: value1 },
    { key2: value2 },
    // ...
  ]
})
```

```bash
> db.article.find({ $or: [{id: "1"}, {id: "2"}] })

{ "_id" : ObjectId("5f7db414b9aefb1a12f406bc"), "id" : "1", "title" : "一篇文档" }
{ "_id" : ObjectId("5f7db493b9aefb1a12f406bd"), "id" : "2", "title" : "第二篇文档" }
```

### 3. 更新文档


### 4. 删除文档


