import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep} from 'aws-cdk-lib/pipelines';
import {MyPipelineAppStage} from './stage';

export class MyPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const generalEnv = props?.env

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'TestPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('MARudnicki/lambda-cdk', 'master'), //Remember to change
                commands:
                    ['npm ci',
                        // 'npm run build',
                        'npx cdk synth']
            })
        });

        const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
            env: generalEnv
        }));

        testingStage.addPre(new ShellStep("Run Unit Tests", {
            commands: [
                'whoami',
                'pwd',
                'find .',
                'pip install -r ./lib/lambda/requirements.txt']
        }));
        // testingStage.addPost(new ManualApprovalStep('Manual approval before production'));
    }
}