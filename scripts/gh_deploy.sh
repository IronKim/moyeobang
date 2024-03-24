#!/bin/bash
PROJECT_NAME="moyeobang"
JAR_PATH="/home/ec2-user/moyeobang/build/libs/app.jar"
DEPLOY_PATH=/home/ec2-user/$PROJECT_NAME/
DEPLOY_LOG_PATH="/home/ec2-user/$PROJECT_NAME/deploy.log"
DEPLOY_ERR_LOG_PATH="/home/ec2-user/$PROJECT_NAME/deploy_err.log"
APPLICATION_LOG_PATH="/home/ec2-user/$PROJECT_NAME/application.log"
BUILD_JAR=$(ls $JAR_PATH)
JAR_NAME=$(basename $BUILD_JAR)

echo "===== 배포 시작 : $(date +%c) =====" >> $DEPLOY_LOG_PATH

echo "> build 파일명: $JAR_NAME" >> $DEPLOY_LOG_PATH

echo "> docker-compose 실행" >> $DEPLOY_LOG_PATH
docker-compose -f /home/ec2-user/moyeobang/local-docker-compose.yml up

sleep 3

echo "> 배포 종료 : $(date +%c)" >> $DEPLOY_LOG_PATH