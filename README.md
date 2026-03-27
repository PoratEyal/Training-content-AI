---

# ActivityWiz

ActivityWiz is a platform that enables the creation of custom activities using AI, tailored for all youth movements.

## Features

- **Custom Activity Creation**: Guides can create activities tailored to their group's specific needs.
- **AI-Powered Suggestions**: Automatically generate activity topics with the click of a button.
- **Easy Sharing**: Easily share activities via WhatsApp.

## Usage

1. The guide selects the details of the group they are guiding, such as number of participants, age, gender, etc.
2. Then, they choose a topic for the activity or click the "generate" button to receive a suggested topic.
3. After that, they receive the activity details and can share it via WhatsApp.

## Technologies Used

- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Firebase**: Backend-as-a-Service (BaaS) providing authentication, database, and storage
- **Google Gemini APIs**: AI-powered APIs for generating activity suggestions

## How to run?

- Split into 2 terminals
- Run Server:		npm run start:server
- Run Client: 		npm run start

## When changing Server:
Compile the server code: cd /function
                         npm run build

## For Final Deploy:
	Deploy:	npm run deploy

	Deploy Firebase:	firebase deploy