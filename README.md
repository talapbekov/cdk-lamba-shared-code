# cdk-lamba-shared-code
Template for AWS-CDK project having lambdas with shared code.

Run

`./build.sh`

go into infra directory


Run 

`cdk synth --no-staging > template.yaml && sam local start-api -t template.yaml -p 3001`

Check: do GET or POST requests to `localhost:3001`
