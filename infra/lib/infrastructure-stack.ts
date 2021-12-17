import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as gw from "aws-cdk-lib/aws-apigateway"

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const restapi = new gw.RestApi(this, 'restapi', {
      restApiName: 'xaxa',
      description: 'works'
    })

    const fizz = new lambda.Function(this, 'FIZZ', {
      runtime: lambda.Runtime.NODEJS_14_X,
      functionName: 'FIZZ',
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../src/Fizz/GetFizz/dist')),
      reservedConcurrentExecutions: 1,
      timeout: Duration.seconds(300),
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      }
    });



    const buzz = new lambda.Function(this, 'BUZZ', {
      runtime: lambda.Runtime.NODEJS_14_X,
      functionName: 'BUZZ',
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../src/Buzz/GetBuzz/dist')),
      reservedConcurrentExecutions: 1,
      timeout: Duration.seconds(300),
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      }
    });

    restapi.root.addMethod('GET', new gw.LambdaIntegration(fizz));
    restapi.root.addMethod('POST',new gw.LambdaIntegration(buzz));

  }
}
