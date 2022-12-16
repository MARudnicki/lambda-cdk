import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Code, Function, Runtime} from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
        super(scope, id, props);
        new Function(this, 'LambdaFunction', {
            runtime: Runtime.PYTHON_3_8, //using node for this, but can easily use python or other
            handler: 'src/hello.handler',
            code: Code.fromAsset(path.join(__dirname, 'lambda')), //resolving to ./lambda directory
            environment: {"stageName": stageName} //inputting stagename
        });
    }
}