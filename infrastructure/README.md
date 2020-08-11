We are using IaC (Infrastructure as Code) approach using CloudFormation. We try to follow best practices like nested stacks.

Prepare `devops` S3 bucket, where we copy nested stack (it has to be in S3, not in the local file system) and backend files e.g. AWS AppSync graphQL schema etc.

```
.\prepare-devops-bucket.bat 4560bce
```

Create CloudFormation stack (change `create-stack` into `update-stack` to update):

```
aws cloudformation create-stack --stack-name dev-4560bce --template-body file://stack.yaml --parameters ParameterKey=Environment,ParameterValue=dev ParameterKey=Subdomain,ParameterValue=4560bce --capabilities CAPABILITY_NAMED_IAM
```
