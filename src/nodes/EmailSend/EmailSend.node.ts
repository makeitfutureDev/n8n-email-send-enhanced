import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	JsonObject,
	NodeConnectionType,
} from 'n8n-workflow';

import { createTransporter } from './EmailSendUtils';
import { emailSendProperties } from './EmailSendDescription';

export class EmailSend implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Send Email with Threading',
		name: 'emailSend',
		icon: 'fa:envelope',
		group: ['output'],
		version: 2,
		description: 'Sends an email using SMTP protocol with reply threading support',
		defaults: {
			name: 'Send Email with Threading',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'smtp',
				required: true,
			},
		],
		properties: emailSendProperties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const operation = this.getNodeParameter('operation', itemIndex) as string;

				if (operation === 'send') {
					const credentials = await this.getCredentials('smtp');
					const transporter = createTransporter(credentials);

					// Get basic email parameters
					const fromEmail = this.getNodeParameter('fromEmail', itemIndex) as string;
					const toEmail = this.getNodeParameter('toEmail', itemIndex) as string;
					const subject = this.getNodeParameter('subject', itemIndex) as string;
					const text = this.getNodeParameter('text', itemIndex, '') as string;
					const html = this.getNodeParameter('html', itemIndex, '') as string;

					// Get additional options
					const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as {
						ccEmail?: string;
						bccEmail?: string;
						replyTo?: string;
						priority?: string;
						attachments?: string;
						// New threading fields
						inReplyTo?: string;
						references?: string;
					};

					// Construct email options
					const mailOptions: any = {
						from: fromEmail,
						to: toEmail,
						subject,
						text,
						html,
					};

					// Add CC if provided
					if (additionalFields.ccEmail) {
						mailOptions.cc = additionalFields.ccEmail;
					}

					// Add BCC if provided
					if (additionalFields.bccEmail) {
						mailOptions.bcc = additionalFields.bccEmail;
					}

					// Add Reply-To if provided
					if (additionalFields.replyTo) {
						mailOptions.replyTo = additionalFields.replyTo;
					}

					// Add priority if provided
					if (additionalFields.priority) {
						mailOptions.priority = additionalFields.priority;
					}

					// Add threading headers
					if (additionalFields.inReplyTo) {
						mailOptions.inReplyTo = additionalFields.inReplyTo;
					}

					if (additionalFields.references) {
						// Split references by comma/space and clean up
						const referencesArray = additionalFields.references
							.split(/[,\s]+/)
							.filter(ref => ref.trim())
							.map(ref => ref.trim());
						
						mailOptions.references = referencesArray;
					}

					// Add attachments if provided
					if (additionalFields.attachments) {
						const attachments = [];
						const attachmentProperties = additionalFields.attachments.split(',').map(prop => prop.trim());
						
						for (const propertyName of attachmentProperties) {
							const binaryData = this.helpers.assertBinaryData(itemIndex, propertyName);
							attachments.push({
								filename: binaryData.fileName || propertyName,
								content: await this.helpers.getBinaryDataBuffer(itemIndex, propertyName),
								contentType: binaryData.mimeType,
							});
						}
						
						if (attachments.length > 0) {
							mailOptions.attachments = attachments;
						}
					}

					// Send the email
					const info = await transporter.sendMail(mailOptions);

					returnData.push({
						json: {
							messageId: info.messageId,
							accepted: info.accepted,
							rejected: info.rejected,
							response: info.response,
						},
						pairedItem: { item: itemIndex },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error instanceof Error ? error.message : String(error) },
						pairedItem: { item: itemIndex },
					});
				} else {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
		}

		return [returnData];
	}
}