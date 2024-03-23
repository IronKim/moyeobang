# 백그라운드 실행, 강제 재생성
local-db-up:
	docker-compose -f docker-compose-local.yml up -d --force-recreate

# volume 삭제
local-db-down:
	docker-compose -f docker-compose-local.yml down -v