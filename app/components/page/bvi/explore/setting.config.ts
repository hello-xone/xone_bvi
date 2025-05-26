
export type FieldConfig = {
	label: string;
	type: 'image' | 'input' | 'textarea' | 'switch' | 'radio' | 'social';
	name?: string;
	required?: boolean;
	description?: string;
	defaultValue?: string | boolean;
	options?: Array<{
		id?: any;
		value: string | boolean;
		label: string;
		subLabel?: string;
	}>;
};

export type SectionConfig = {
	title: string;
	description: string;
	fields: FieldConfig[];
};

export const settingConfig: SectionConfig[] = [
	{
		title: 'Basic information',
		description: 'Set basic information for your project/organization.',
		fields: [
			{
				type: 'image',
				name: 'logo',
				label: 'Upload profile picture',
				// required: true,
			},
			{
				type: 'image',
				name: 'background',
				label: 'Upload Background',
				// required: true,
			},
			{
				type: 'input',
				label: 'Organization Name',
				name: 'title',
				required: true,
			},
			{
				type: 'textarea',
				label: 'Introduction',
				name: 'description',
				required: true,
			},
		],
	},
	{
		title: 'Contract information (optional)',
		description: 'View and confirm the contract address information published for your project.',
		fields: [
			{
				type: 'input',
				label: 'Owner Address',
				name: 'owner_address',
				required: true,
			},
			{
				type: 'input',
				label: 'Contract',
				name: 'contract',
				required: true,
			},
		],
	},
	{
		title: 'Socialize',
		description: 'Set up third-party social media information for your organization/project.',
		fields: [
			{
				type: 'social',
				name: 'social',
				label: 'Social Media',
			},
		],
	},
	{
		title: 'Privacy',
		description: 'Set up public information for your organization/project.',
		fields: [
			{
				type: 'switch',
				label: 'Public Access',
				name: 'pub',
				description: 'Opening, your organization/project is publicly visible.',
			},
			{
				type: 'switch',
				label: 'Download contributed data',
				name: 'down',
				description: `Opening, your organization/project members' contribution data can be downloaded.`,
			},
			{
				type: 'radio',
				label: 'Join Settings',
				name: 'invite',
				description: 'Personalized settings for user joining mode.',
				defaultValue: false,
				options: [
					{
						value: false,
						label: 'Unlimited',
						subLabel: 'Users can actively join.',
					},
					{
						value: true,
						label: 'Only by invitation',
						subLabel: 'Users can only join through invitation links.',
					},
				],
			},
		],
	},
];