# Етап 1: Побудова додатку
FROM node:18 AS build

# Встановлення робочого каталогу
WORKDIR /WAT_Snake_React

# Копіювання package.json і package-lock.json
COPY package*.json ./

# Встановлення залежностей
RUN npm install

# Копіювання коду
COPY . .

# Побудова додатку
RUN npm run build

# Етап 2: Створення фінального образу
FROM nginx:alpine

# Копіювання файлів з попереднього етапу
COPY --from=build /WAT_Snake_React/dist /usr/share/nginx/html

# Відкриття порту
# EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]