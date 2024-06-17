-- 데이터베이스 생성
CREATE DATABASE speedat;

-- 사용자 생성
CREATE USER postgres WITH PASSWORD 'postgres';

-- 데이터베이스 사용 권한 부여
GRANT ALL PRIVILEGES ON DATABASE speedat TO postgres;