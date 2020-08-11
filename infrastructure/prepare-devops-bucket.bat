@echo off

SET subdomain=%1

IF DEFINED subdomain (set bucketName=devops.%subdomain%.bestpicture.link) ELSE (set bucketName=devops.bestpicture.link)

echo "%bucketName%"

REM aws configure list
REM aws s3api list-buckets
REM aws s3 rm s3://%bucketName% --recursive
aws s3api create-bucket --bucket %bucketName% --acl public-read --region eu-west-1 --create-bucket-configuration LocationConstraint=eu-west-1
aws s3 sync . s3://%bucketName%/infrastructure --acl public-read
aws s3 sync ../backend s3://%bucketName%/backend --acl public-read