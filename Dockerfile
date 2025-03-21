# Базовый образ Node.js
FROM node:22-alpine

# Рабочая директория в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"] 