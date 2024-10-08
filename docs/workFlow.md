# Порядок работы с проектом <!-- omit in toc -->

- [1. GitHub](#1-github)
- [2. Документация](#2-документация)
- [3. git, не очевидное](#3-git-не-очевидное)
- [4. Отладка](#4-отладка)

## 1. GitHub

- Форкаем проект рабочая ветка dev
- В своем форке создаем новую ветку, делаем туда коммиты. 
- Когда все готово создаем PR в dev репозиторий
- Если создали ветку с номером тикета то PR автоматически прикрепится к задаче на [доске linear](https://linear.app/levelup-team/team/LVL/all)
- Проходим ревью
- Вливаем в ветку main (через squash & merge)
- Оповещаем всех остальных (чтобы они подтянули изменения из main и сразу порешали merge conflict)

Шаблон названия веток: task-{номер задачи в linear}-{краткое описание})
Например: LVL-180-readme, LVL-205-webpack

## 2. Документация

1. Создаем файл для описания чего-либо в папке `docs`
2. Добавляем ссылку на созданный файл в `docs/README.md`

   ```markdown
   - [Название раздела](ИмяФайла.md) - Краткое описание
   ```

3. Пишем документацию. (Если необходимо добавить изображения создаем папку одноименную файлу)
