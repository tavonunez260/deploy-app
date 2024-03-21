import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';

const project = 'deploy-app';
const stage = process.env.STAGE ?? 'production';
const region = 'us-east-1';

export default async function getSecret(secretName: string) {
	if (!secretName) {
		return null;
	}
	const client = new SSMClient({ region });
	const paramName = `/sst/${project}/${stage}/Secret/${secretName}/value`;
	const paramOptions = {
		Name: paramName,
		WithDecryption: true
	};

	const command = new GetParameterCommand(paramOptions);
	try {
		const response = await client.send(command);
		if (!response?.Parameter?.Value) {
			console.error(`Secret not found: ${secretName}`);
			return null;
		} else {
			return response.Parameter.Value;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

getSecret('DATABASE_URL')
	.then(val => console.log(val))
	.catch(err => console.error(err));
