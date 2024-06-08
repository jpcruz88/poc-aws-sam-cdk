#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { WhatsappFunctionStack } from "../lib/whatsapp-function-stack";

const app = new cdk.App();
new WhatsappFunctionStack(app, "WhatsappFunctionStack");
