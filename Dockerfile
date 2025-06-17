FROM node:18 as build
WORKDIR /flight-client
COPY package.json ./
RUN npm install

COPY . .
# RUN npm run build
RUN npm run build -- --mode production
FROM nginx:alpine
COPY --from=build /flight-client/dist /usr/share/nginx/html



# npm run build
# docker build -t flight-client .
# docker run -p 80:80 flight-client
# docker tag flight-client:latest 381492153714.dkr.ecr.ap-southeast-2.amazonaws.com/flight-client-wangwei:v6 
# docker push 381492153714.dkr.ecr.ap-southeast-2.amazonaws.com/flight-client-wangwei:v6 

# 公有 IP
# 16.176.4.27 | 打开地址 


