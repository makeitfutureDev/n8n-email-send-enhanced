import {
	INodeProperties,
} from 'n8n-workflow';

export const emailSendProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Send',
				value: 'send',
				description: 'Send an email',
				action: 'Send an email',
			},
		],
		default: 'send',
	},
	{
		displayName: 'From Email',
		name: 'fromEmail',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'admin@example.com',
		description: 'Email address of the sender',
		displayOptions: {
			show: {
				operation: ['send'],
			},
		},
	},
	{
		displayName: 'To Email',
		name: 'toEmail',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'info@example.com',
		description: 'Email address of the recipient. Multiple can be separated by comma.',
		displayOptions: {
			show: {
				operation: ['send'],
			},
		},
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		default: '',
		placeholder: 'My subject line',
		description: 'Subject line of the email',
		displayOptions: {
			show: {
				operation: ['send'],
			},
		},
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		description: 'Plain text message of email',
		displayOptions: {
			show: {
				operation: ['send'],
			},
		},
	},
	{
		displayName: 'HTML',
		name: 'html',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		description: 'HTML text message of email',
		displayOptions: {
			show: {
				operation: ['send'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['send'],
			},
		},
		options: [
			{
				displayName: 'Attachments',
				name: 'attachments',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				description: 'Array of supported attachments to add to the email',
				default: {},
				options: [
					{
						name: 'attachment',
						displayName: 'Attachment',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of the attachment',
							},
							{
								displayName: 'Content',
								name: 'content',
								type: 'string',
								default: '',
								description: 'Raw data of the attachment as base64 string',
							},
							{
								displayName: 'Content Type',
								name: 'type',
								type: 'string',
								default: '',
								description: 'MIME type of the attachment',
							},
						],
					},
				],
			},
			{
				displayName: 'BCC Email',
				name: 'bccEmail',
				type: 'string',
				default: '',
				placeholder: 'info@example.com',
				description: 'Email address of the blind copy recipient. Multiple can be separated by comma.',
			},
			{
				displayName: 'CC Email',
				name: 'ccEmail',
				type: 'string',
				default: '',
				placeholder: 'info@example.com',
				description: 'Email address of the copy recipient. Multiple can be separated by comma.',
			},
			{
				displayName: 'In-Reply-To',
				name: 'inReplyTo',
				type: 'string',
				default: '',
				placeholder: '<original-message-id@example.com>',
				description: 'Message ID of the email this is a reply to. Used for email threading.',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{
						name: 'Low',
						value: 'low',
					},
					{
						name: 'Normal',
						value: 'normal',
					},
					{
						name: 'High',
						value: 'high',
					},
				],
				default: 'normal',
				description: 'Priority of the email',
			},
			{
				displayName: 'References',
				name: 'references',
				type: 'string',
				default: '',
				placeholder: '<original-msg@example.com> <previous-msg@example.com>',
				description: 'Message IDs of emails in the conversation thread. Separate multiple IDs with spaces or commas. Used for email threading.',
			},
			{
				displayName: 'Reply To',
				name: 'replyTo',
				type: 'string',
				default: '',
				placeholder: 'info@example.com',
				description: 'Email address to which replies should be sent',
			},
		],
	},
];