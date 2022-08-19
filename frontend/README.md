## FRONTEND

### 로컬에서 실행
```bash
git clone https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A603.git

cd frontend

npm install --legacy-peer-deps

npm start
```

### 프론트엔드 빌드 및 배포

```bash

# 저장소 클론
git clone https://lab.ssafy.com/s07-webmobile1-sub2/S07P12A603.git

# 프론트엔드 폴더로 이동
cd frontend

# 종속성 설치
npm install --legacy-peer-deps

# 빌드 파일 생성
CI=false npm run build

# 도커 이미지 빌드
docker build -t nginx-react:0.1 .

# 도커 컨테이너를 이용한 프론트엔드 배포
docker run --name nginx_react -d -p 3000:80 nginx-react:0.1
```
