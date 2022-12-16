import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Runtime} from 'aws-cdk-lib/aws-lambda';
import {PythonFunction, PythonLayerVersion} from "@aws-cdk/aws-lambda-python-alpha";
import {DockerImage, Duration} from "aws-cdk-lib";

export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
        super(scope, id, props);
        /*        new Function(this, 'LambdaFunction', {
                    runtime: Runtime.PYTHON_3_8, //using node for this, but can easily use python or other
                    handler: 'src/hello.handler',
                    code: Code.fromAsset(path.join(__dirname, 'lambda')), //resolving to ./lambda directory
                    environment: {"stageName": stageName} //inputting stagename
                });*/

        const entryPath = 'lib/lambda';
        const image = DockerImage.fromBuild(entryPath);

        new PythonFunction(this, "LambdaFunction", {
            entry: entryPath,
            runtime: Runtime.PYTHON_3_8,
            index: 'main.py',
            handler: 'lambda_handler',
            timeout: Duration.minutes(1)
/*
            layers: [
                new PythonLayerVersion(this, 'PythonLayer', {
                    entry: '.'
                })
            ]
*/
        });
    }
}