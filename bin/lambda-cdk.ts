#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {MyPipelineStack} from "../lib/pipeline-stack";

const app = new cdk.App();
new MyPipelineStack(app, 'MyPipelineStack', {
    env: {
        account: '514503855955',
        region: 'eu-west-1'
    }
})