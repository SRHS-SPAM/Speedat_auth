# Node.js 18 Alpine Linux 기반 이미지 사용
FROM node:18-alpine as build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 yarn.lock 파일 복사
COPY package*.json yarn.lock ./

# yarn 저장소 URL 변경 (https://registry.npmjs.org/ 사용)
RUN yarn config set registry https://registry.yarn.org/

# 의존성 패키지 설치
RUN yarn install 

# 나머지 프로젝트 파일 복사
COPY . .

# 애플리케이션 빌드
RUN yarn build

#--------------------
# 런타임 이미지 설정
#--------------------
FROM node:18-alpine as runtime

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 결과물 복사
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# 3000 포트 노출
EXPOSE 3000

# 애플리케이션 실행 명령어
CMD ["yarn", "start:prod"]