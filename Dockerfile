# Node.js için resmi imajı temel alıyoruz
FROM node:16

# Çalışma dizinini oluşturuyoruz
WORKDIR /usr/src/app

# package.json ve package-lock.json dosyalarını kopyalıyoruz
COPY package*.json ./

# Gerekli paketleri yüklüyoruz
RUN npm install

# Uygulamanın tüm dosyalarını konteynere kopyalıyoruz
COPY . .

# 3000 portunu açıyoruz (WebSocket ve HTTP server için)
EXPOSE 3000

# Sunucu uygulamasını başlatıyoruz
CMD ["node", "index.js"]
