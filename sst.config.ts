import { SSTConfig } from 'sst';
import { Config, NextjsSite } from 'sst/constructs';

export default {
	config(_input) {
		return {
			name: 'deploy-app',
			region: 'us-east-1'
		};
	},
	stacks(app) {
		app.stack(function Site({ stack }) {
			const SECRET_VAL = new Config.Secret(stack, 'SECRET_VAL');
			const DATABASE_URL = new Config.Secret(stack, 'DATABASE_URL');
			const site = new NextjsSite(stack, 'site', {
				bind: [SECRET_VAL, DATABASE_URL]
			});

			stack.addOutputs({
				SiteUrl: site.url
			});
		});
	}
} satisfies SSTConfig;
