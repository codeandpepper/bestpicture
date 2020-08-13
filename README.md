# Architecture

![architecture-3d](https://user-images.githubusercontent.com/8171434/90000588-aa5f6000-dc90-11ea-9028-9f967e56ca59.png)

![architecture-2d](https://user-images.githubusercontent.com/8171434/90000593-ab908d00-dc90-11ea-9616-9880242664b9.png)

# Iac (Infrastructure as Code)

## Dev environment

1. Prepare `devops` S3 bucket, where we copy nested stack (it has to be in S3, not in the local file system) and backend files e.g. AWS AppSync graphQL schema etc.

```
cd .\infrastructure\
.\prepare-devops-bucket.bat 4560bce
```

2. Create CloudFormation stack

```
aws cloudformation create-stack --stack-name dev-4560bce --template-body file://stack.yaml --parameters ParameterKey=Environment,ParameterValue=dev ParameterKey=Subdomain,ParameterValue=4560bce --capabilities CAPABILITY_NAMED_IAM
```

3. Wait until infrastructure created. You can go to AWS console or use this command:

```
aws cloudformation wait stack-create-complete --stack-name dev-4560bce
```

4. Get needed stack outputs and set environment variables e.g. S3 Bucket name for static web hosting. You can go to AWS console or use this command:

```
aws cloudformation describe-stacks --stack-name dev-4560bce --query "Stacks[0].Outputs[?OutputKey=='WebAppBucketName'].OutputValue" --output text
```

5. Initialize DynamoDB database

```
cd ..\backend\DynamoDB
```

Get DynamoDB Movies table name

```
aws cloudformation describe-stacks --stack-name dev-4560bce --query "Stacks[0].Outputs[?OutputKey=='DynamoDBMoviesTableName'].OutputValue" --output text
```

Modify table name inside Movies.json

Batch write items

```
aws dynamodb batch-write-item --request-items file://Movies.json
```

6. Build and deploy frontend

Get AppSync API URI and key and set environment variables

```
aws cloudformation describe-stacks --stack-name dev-4560bce --query "Stacks[0].Outputs[?OutputKey=='AppSyncGraphQLApiUrl'].OutputValue" --output text
```

```powershell
$Env:REACT_APP_AWS_APPSYNC_GRAPHQL_API_URL = 'TODO'
$Env:REACT_APP_AWS_APPSYNC_GRAPHQL_API_URL
```

```
aws cloudformation describe-stacks --stack-name dev-4560bce --query "Stacks[0].Outputs[?OutputKey=='AppSyncApiKey'].OutputValue" --output text
```

```powershell
$Env:REACT_APP_AWS_APPSYNC_API_KEY = 'TODO'
$Env:REACT_APP_AWS_APPSYNC_API_KEY
```

Get S3 Bucket name for static web hosting

```
aws cloudformation describe-stacks --stack-name dev-4560bce --query "Stacks[0].Outputs[?OutputKey=='WebAppBucketName'].OutputValue" --output text
```

```
cd ..\..\frontend
yarn build
aws s3 sync build/ s3://4560bce.bestpicture.link --acl public-read
```

## Production environment

1. Prepare `devops` S3 bucket, where we copy nested stack (it has to be in S3, not in the local file system) and backend files e.g. AWS AppSync graphQL schema etc.

```
cd .\infrastructure\
.\prepare-devops-bucket.bat
```

2. Create CloudFormation stack

```
aws cloudformation create-stack --stack-name prod --template-body file://stack.yaml --parameters ParameterKey=Environment,ParameterValue=prod --capabilities CAPABILITY_NAMED_IAM
```

3. Wait until infrastructure created. You can go to AWS console or use this command:

```
aws cloudformation wait stack-create-complete --stack-name prod
```

4. Get needed stack outputs and set environment variables e.g. S3 Bucket name for static web hosting. You can go to AWS console or use this command:

```
aws cloudformation describe-stacks --stack-name prod --query "Stacks[0].Outputs[?OutputKey=='WebAppBucketName'].OutputValue" --output text
```

5. Initialize DynamoDB database

```
cd ..\backend\DynamoDB
```

Get DynamoDB Movies table name

```
aws cloudformation describe-stacks --stack-name prod --query "Stacks[0].Outputs[?OutputKey=='DynamoDBMoviesTableName'].OutputValue" --output text
```

Modify table name inside Movies.json

Batch write items

```
aws dynamodb batch-write-item --request-items file://Movies.json
```

6. Build and deploy frontend

Get AppSync API URI and key and set environment variables

```
aws cloudformation describe-stacks --stack-name prod --query "Stacks[0].Outputs[?OutputKey=='AppSyncGraphQLApiUrl'].OutputValue" --output text
```

```powershell
$Env:REACT_APP_AWS_APPSYNC_GRAPHQL_API_URL = 'TODO'
$Env:REACT_APP_AWS_APPSYNC_GRAPHQL_API_URL
```

```
aws cloudformation describe-stacks --stack-name prod --query "Stacks[0].Outputs[?OutputKey=='AppSyncApiKey'].OutputValue" --output text
```

```powershell
$Env:REACT_APP_AWS_APPSYNC_API_KEY = 'TODO'
$Env:REACT_APP_AWS_APPSYNC_API_KEY
```

Get S3 Bucket name for static web hosting

```
aws cloudformation describe-stacks --stack-name prod --query "Stacks[0].Outputs[?OutputKey=='WebAppBucketName'].OutputValue" --output text
```

```
cd ..\..\frontend
yarn build
aws s3 sync build/ s3://bestpicture.link --acl public-read
```
