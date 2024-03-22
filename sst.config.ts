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
			const DATABASE_URL_STAGING = new Config.Secret(stack, 'DATABASE_URL');
			const site = new NextjsSite(stack, 'site', {
				bind: [DATABASE_URL_STAGING]
			});

			stack.addOutputs({
				SiteUrl: site.url
			});
		});
	}
} satisfies SSTConfig;
