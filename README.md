# Back-end

1. Setup sequelize:

-   npm install sequelize
-   npm install --save sequelize-cli
-   npx sequelize-cli init
-   Nếu có lỗi, tạo một file config tên .sequelizerc trong thư mục gốc với nội dung:
    const path = require('path');

    module.exports = {
    'config': path.resolve('./config', 'config.json'),
    'migrations-path': path.resolve('./', 'migrations'),
    'models-path': path.resolve('./', 'models'),
    'seeders-path': path.resolve('./', 'seeders')
    }

-   Chạy lệnh: node_modules/.bin/sequelize init

2. Tạo model với sequelize:

-> using npm

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

-> using yarn

yarn sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

=> Tạo 2 file: model và migration

3. Migrations:

-   Chạy migrations:

-> using npm

npx sequelize-cli db:migrate

-> using yarn

yarn sequelize-cli db:migrate

-   Gỡ migrations:

-> using npm

npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

-> using yarn

yarn sequelize-cli db:migrate:undo
yarn sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

4. Tạo seeders:

-   Tạo seeder:

-> using npm

npx sequelize-cli seed:generate --name demo-user

-> using yarn

yarn sequelize-cli seed:generate --name demo-user

-   Chạy seeder:

-> using npm

npx sequelize-cli db:seed:all/seeder's name

-> using yarn

yarn sequelize-cli db:seed:all/seeder's name

-   Undo seeder:

-> using npm

npx sequelize-cli db:seed:undo
npx sequelize-cli db:seed:undo:all/ --seed name-of-seed-as-in-data

-> using yarn

yarn sequelize-cli db:seed:undo
yarn sequelize-cli db:seed:undo:all/ --seed name-of-seed-as-in-data

5. Reset auto increment in MySQL:

    ALTER TABLE table_name AUTO_INCREMENT = value;

6. Prettier format code:

    npm run format-code
