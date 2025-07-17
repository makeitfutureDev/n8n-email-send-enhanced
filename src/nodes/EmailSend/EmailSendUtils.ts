import { createTransport } from 'nodemailer';
import { ICredentialDataDecryptedObject } from 'n8n-workflow';

export function createTransporter(credentials: ICredentialDataDecryptedObject) {
	const transporter = createTransport({
		host: credentials.host as string,
		port: credentials.port as number,
		secure: credentials.secure as boolean,
		auth: {
			user: credentials.user as string,
			pass: credentials.password as string,
		},
		tls: {
			rejectUnauthorized: !(credentials.allowUnauthorizedCerts as boolean),
		},
	});

	return transporter;
}