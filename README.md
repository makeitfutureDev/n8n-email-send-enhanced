# Enhanced n8n EmailSend Node

An enhanced version of the n8n EmailSend node that includes email threading support through `inReplyTo` and `references` headers.

## Features

- **Email Threading Support**: Properly handle email conversations with `inReplyTo` and `references` headers
- **SMTP Protocol**: Full SMTP support with authentication
- **Attachments**: Support for email attachments
- **Multiple Recipients**: CC and BCC support
- **Priority Settings**: Set email priority (low, normal, high)
- **HTML and Text**: Support for both HTML and plain text emails

## New Fields

### In-Reply-To
- **Field Name**: `inReplyTo`
- **Type**: String
- **Description**: Message ID of the email this is a reply to
- **Example**: `<b2d39e00-6626-aa5c-c5ae-6b6cb581b926@makeitfuture.com>`
- **Usage**: Used by email clients to thread conversations properly

### References
- **Field Name**: `references`
- **Type**: String
- **Description**: Space or comma-separated list of message IDs in the conversation thread
- **Example**: `<b2d39e00-6626-aa5c-c5ae-6b6cb581b926@makeitfuture.com> <another-id@example.com>`
- **Usage**: Maintains the complete conversation thread for email clients

## SMTP Standards Compliance

These fields follow RFC 5322 standards for email threading:

- **In-Reply-To**: Contains the message ID of the email being replied to
- **References**: Contains all message IDs in the conversation thread, allowing email clients to properly group related emails

## Installation

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy the built files to your n8n custom nodes directory

3. Restart your n8n instance

## Usage

1. Add the "Send Email" node to your workflow
2. Configure SMTP credentials
3. Fill in the basic email fields (from, to, subject, text/html)
4. In "Additional Fields":
   - Add `inReplyTo` with the message ID you're replying to
   - Add `references` with the conversation thread message IDs
5. Execute the workflow

## Example

```json
{
  "inReplyTo": "<b2d39e00-6626-aa5c-c5ae-6b6cb581b926@makeitfuture.com>",
  "references": "<b2d39e00-6626-aa5c-c5ae-6b6cb581b926@makeitfuture.com> <previous-msg@example.com>"
}
```

This ensures proper email threading in email clients like Gmail, Outlook, and Thunderbird.