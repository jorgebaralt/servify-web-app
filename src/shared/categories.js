import * as icons from '../assets/svg/Categories/';

const categories = [
	{
		id: 0,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fhome_services.jpeg?alt=media&token=655630e7-4083-4aaf-b5e2-7880c9c56e0e',
		title: 'Home Services',
		description: 'Home Services Description',
		dbReference: 'home_services',
		color: ['#42A5F5', '#64B5F6'],
		keyWords: [
			'home',
			'cleaning',
			'clean',
			'organize',
			'house',
			'kitchen',
			'paint',
			'paiting',
			'fix',
			'cleaning',
			'garage',
			'carpet',
			'carpets'
		],
		subcategories: [
			{
				id: 0.1,
				title: 'Home Cleaning',
				description: 'Get a cleaner house',
				dbReference: 'home_cleaning'
			},
			{
				id: 0.2,
				title: 'Home Painting',
				description: 'Shiny walls',
				dbReference: 'home_painting'
			},
			{
				id: 0.3,
				title: 'Carpet Clean',
				description: 'Softy carpets',
				dbReference: 'carpet'
			},
			{
				id: 0.4,
				title: 'Windows and Curtains',
				description: 'The best view',
				dbReference: 'windows'
			},
			{
				id: 0.5,
				title: 'Other',
				description: 'Just other',
				dbReference: 'other_home'
			}
		]
	},
	{
		id: 19,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fhome_outdoor.jpeg?alt=media&token=4ea6a7a6-e471-4a63-91c8-cfda32b941ba',
		title: 'Home Outdoor',
		description: 'Home Outdoor Description',
		dbReference: 'home_outdoor',
		color: ['#43A047', '#388E3C'],
		keyWords: [
			'home',
			'outdoor',
			'fence',
			'pool',
			'landscape',
			'screen',
			'repair',
			'pest',
			'pest',
			'landscape',
			'grass',
			'palms',
			'tree',
			'trees',
			'wild',
			'lawn',
			'debris',
			'rodent',
			'fence',
			'control'
		],
		subcategories: [
			{
				id: 19.1,
				title: 'Pool Services',
				description: 'Get a cleaner house',
				dbReference: 'pool'
			},
			{
				id: 19.2,
				title: 'Pest Control',
				description: 'Shiny walls',
				dbReference: 'pest_control'
			},
			{
				id: 19.3,
				title: 'Screen Repair',
				description: 'Softy carpets',
				dbReference: 'screen_repair'
			},
			{
				id: 19.5,
				title: 'Fence services',
				description: 'Great looking backyard',
				dbReference: 'fence'
			},
			{
				id: 19.6,
				title: 'Landscaping and Sprinklers',
				description: 'Great looking backyard',
				dbReference: 'landscape'
			},
			{
				id: 19.7,
				title: 'Garage and doors',
				description: 'Nice entrance',
				dbReference: 'garage_doors'
			},
			{
				id: 19.8,
				title: 'Other',
				description: 'Just other',
				dbReference: 'other_home_outdoor'
			}
		]
	},
	{
		id: 1,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fauto_services.jpeg?alt=media&token=691ce839-bae0-48d0-81b6-a8a895a9d9d3',
		title: 'Auto Services',
		description: 'Auto services description',
		dbReference: 'auto_services',
		color: ['#37474F', '#455A64'],
		keyWords: [
			'car',
			'auto',
			'truck',
			'wash',
			'tire',
			'mechanic',
			'air',
			'ac',
			'a/c',
			'wheel',
			'vehicle',
			'autos',
			'cars'
		],
		subcategories: [
			{
				id: 1.1,
				title: 'Car Wash',
				description: 'Shiny car',
				dbReference: 'car_wash'
			},
			{
				id: 1.2,
				title: 'Tire Change',
				description: 'Shoes for your car',
				dbReference: 'tire_change'
			},
			{
				id: 1.3,
				title: 'Mechanic',
				description: 'Avoid crashing',
				dbReference: 'mechanic'
			},
			{
				id: 1.4,
				title: 'Other',
				description: 'Something else',
				dbReference: 'other_car'
			}
		]
	},
	{
		id: 2,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fhandyman.jpeg?alt=media&token=a7dad6c0-007c-4a1c-b2c6-5c644579e462',
		title: 'Handyman',
		description: 'Handyman Description',
		dbReference: 'handyman',
		color: ['#00695C', '#00796B'],
		keyWords: [
			'fix',
			'ac',
			'a/c',
			'furniture',
			'assembly',
			'moving',
			'help',
			'house',
			'home',
			'repair',
			'installation',
			'electric'
		],
		subcategories: [
			{
				id: 2.1,
				title: 'A/C Repair',
				description: 'Always cold',
				dbReference: 'ac_repair'
			},
			{
				id: 2.2,
				title: 'Furniture Fix and Assembly',
				description: 'Easy built',
				dbReference: 'furniture_fix_assembly'
			},
			{
				id: 2.3,
				title: 'Moving Help',
				description: 'Move out quickly',
				dbReference: 'moving'
			},
			{
				id: 2.4,
				title: 'Carpentry',
				description: 'Built stuff',
				dbReference: 'carpentry'
			},
			{
				id: 2.5,
				title: 'Other',
				description: 'Something else',
				dbReference: 'other_handyman'
			}
		]
	},
	{
		id: 3,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fbaby_sitting.jpeg?alt=media&token=62ce3a49-dbbb-4cfd-968b-c3a9e37bfa19',
		title: 'Baby Sitting',
		description: 'Baby Sitting Description',
		dbReference: 'baby_sitting',
		keyWords: [
			'home',
			'house',
			'baby',
			'sitting',
			'care',
			'kid',
			'kids',
			'boy',
			'girl',
			'children'
		],
		color: ['#AD1457', '#C2185B']
	},
	{
		id: 4,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fplumbing.jpeg?alt=media&token=33574a58-7bfc-42a5-9203-1abd24b53b5f',
		title: 'Plumbing',
		description: 'Plumbing Description',
		dbReference: 'plumbing',
		keyWords: [
			'plumbing',
			'water',
			'leaks',
			'toilet',
			'garbage',
			'disposal',
			'service',
			'leak',
			'drains',
			'drain',
			'faucets',
			'faucet'
		],
		color: ['#01579B', '#01579B'],
		subcategories: [
			{
				id: 4.1,
				title: 'Water leaks',
				description: 'Avoid inside rain',
				dbReference: 'water_leak'
			},
			{
				id: 4.2,
				title: 'Drains',
				description: 'Better dry',
				dbReference: 'drains'
			},
			{
				id: 4.3,
				title: 'Toilets',
				description: 'We always need them working',
				dbReference: 'toilet'
			},
			{
				id: 4.4,
				title: 'Other',
				description: 'Something else',
				dbReference: 'other_plumbing'
			}
		]
	},
	{
		id: 5,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Felectrical.jpeg?alt=media&token=822055bf-adb8-4f4b-9c37-92abaf1a08cc',
		title: 'Electrical',
		description: 'Electrical Description',
		dbReference: 'electrical',
		keyWords: [
			'electrical',
			'light',
			'lighting',
			'outlets',
			'lights',
			'outlets',
			'ceiling',
			'bath',
			'fans'
		],
		color: ['#FB8C00', '#FF9800']
	},
	{
		id: 6,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fpet.jpeg?alt=media&token=4c3193c7-79b2-4214-95b8-9ebde4c10129',
		title: 'Pet Services',
		description: 'Pet Description',
		dbReference: 'pet',
		keyWords: [
			'pet',
			'dog',
			'dogs',
			'cat',
			'cats',
			'sitting',
			'walk',
			'walking',
			'grooming',
			'spa',
			'nails',
			'paw',
			'paws'
		],
		color: ['#F44336', '#EF5350']
	},
	{
		id: 7,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Ffood.jpeg?alt=media&token=92def4ee-05db-47bc-99d8-cc18b2d84f6b',
		title: 'Food',
		description: 'Food Description',
		dbReference: 'food',
		keyWords: ['food', 'eat', 'catering', 'diet', 'restaurant', 'delivery'],
		color: ['#0097A7', '#00ACC1'],
		subcategories: [
			{
				id: 7.1,
				title: 'Restaurant',
				description: 'Perfect dinner',
				dbReference: 'restaurant'
			},
			{
				id: 7.2,
				title: 'Catering',
				description: 'Cheff is home',
				dbReference: 'catering'
			},
			{
				id: 7.3,
				title: 'Delivery',
				description: 'Fast solution',
				dbReference: 'food_delivery'
			},
			{
				id: 7.4,
				title: 'Other',
				description: 'Something else',
				dbReference: 'other_food'
			}
		]
	},
	{
		id: 8,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fbeauty.jpeg?alt=media&token=92fa4b6f-071c-4df0-98b3-abb4aba4a859',
		title: 'Beauty',
		description: 'Beauty Description',
		dbReference: 'beauty',
		keyWords: [
			'spa',
			'nails',
			'hair',
			'cut',
			'haircut',
			'cuttery',
			'highlights',
			'color',
			'make',
			'up',
			'makeup',
			'make-up'
		],
		color: ['#EC407A', '#F06292'],
		subcategories: [
			{
				id: 8.1,
				title: 'Nails',
				description: 'Shiny nails',
				dbReference: 'nails'
			},
			{
				id: 8.2,
				title: 'Hair cuttery',
				description: 'Looking sharp',
				dbReference: 'hair'
			},
			{
				id: 8.3,
				title: 'Spa',
				description: 'Relax time',
				dbReference: 'spa'
			},
			{
				id: 8.4,
				title: 'Make up',
				description: 'Get prettier',
				dbReference: 'make_up'
			},
			{
				id: 8.5,
				title: 'Other',
				description: 'Anything else?',
				dbReference: 'other_beauty'
			}
		]
	},
	{
		id: 11,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Ftutoring.jpeg?alt=media&token=ed99192f-63c0-4a9d-899f-a684228525db',
		title: 'Tutoring',
		description: 'Tutoring Description',
		dbReference: 'tutoring',
		keyWords: [
			'home',
			'homework',
			'work',
			'tutoring',
			'math',
			'science',
			'class',
			'classes'
		],
		color: ['#795548', '#8D6E63']
	},
	{
		id: 12,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fhealth.jpeg?alt=media&token=b8709b1c-dd17-464e-af43-06b991e0b784',
		title: 'Health',
		description: 'Get healthier',
		dbReference: 'health',
		keyWords: ['health', 'therapy', 'kids', 'adults'],
		color: ['#D50000', '#E57373']
	},
	{
		id: 13,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Freal_estate.jpeg?alt=media&token=f2cd83ec-4d86-4d8f-a210-1791f187df46',
		title: 'Real Estate',
		description: 'Get your dream house',
		dbReference: 'real_estate',
		keyWords: ['house', 'buy', 'realtor', 'broker', 'real', 'estate'],
		color: ['#006064', '#00838F']
	},
	{
		id: 14,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Ffit.jpeg?alt=media&token=96e061cb-1159-4199-be82-4813f393b8c9',
		title: 'Fit',
		description: 'Get in shape',
		dbReference: 'fit',
		keyWords: [
			'sport',
			'soccer',
			'tennis',
			'golf',
			'practice',
			'fit',
			'fitness',
			'train',
			'run',
			'training'
		],
		color: ['#0D47A1', '#1565C0']
	},
	{
		id: 16,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Finsurance.jpeg?alt=media&token=2133a82b-4768-4136-9bfb-2fb76036a7d1',
		title: 'Insurance',
		description: 'Insurance description',
		dbReference: 'insurance',
		keyWords: [
			'insurance',
			'health',
			'car',
			'auto',
			'policy',
			'claim',
			'medical'
		],
		color: ['#7E57C2', '#9575CD'],
		subcategories: [
			{
				id: 16.1,
				title: 'Car Insurance',
				description: 'Safe crash',
				dbReference: 'car_insurance'
			},
			{
				id: 16.2,
				title: 'Home Insurance',
				description: 'storm protector',
				dbReference: 'home_insurance'
			},
			{
				id: 16.3,
				title: 'Health Insurance',
				description: 'Medical expenses covered',
				dbReference: 'health_insurance'
			},
			{
				id: 16.4,
				title: 'Bussiness Insurance',
				description: 'Employee protection',
				dbReference: 'business_insurance'
			},
			{
				id: 16.5,
				title: 'Other',
				description: 'Anything else?',
				dbReference: 'other_insurance'
			}
		]
	},
	{
		id: 17,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fhandmade.jpeg?alt=media&token=9b86e7af-69d9-4239-8b38-ab531d8fcb65',
		title: 'Handmade',
		description: 'Built with love',
		dbReference: 'handmade',
		keyWords: ['hand', 'made', 'handmade', 'bags', 'cloth', 'claim'],
		color: ['#AD1457', '#880E4F']
	},
	{
		id: 18,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fcomputer_phone.jpeg?alt=media&token=62bc7fdb-3b18-4bf9-afaa-bd277c9bb16f',
		title: 'Technology',
		description: 'Tech consultation',
		dbReference: 'technology',
		keyWords: [
			'computer',
			'iphone',
			'broke',
			'android',
			'repair',
			'software',
			'install',
			'printer',
			'screen',
			'protector',
			'laptop',
			'desktop'
		],
		color: ['#0288D1', '#0277BD']
	},
	{
		id: 20,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fremodel.jpeg?alt=media&token=c70c958f-0a83-4423-be52-15b40fd3a0bd',
		title: 'Remodel',
		description: 'Redesign',
		dbReference: 'remodel',
		keyWords: ['remodel', 'kitchen', 'batroom', 'floor'],
		color: ['#FFB74D', '#FFA726'],
		subcategories: [
			{
				id: 20.1,
				title: 'Kitchen Remodel',
				description: 'Love cooking',
				dbReference: 'kitchen_remodel'
			},
			{
				id: 20.2,
				title: 'Bathroom Remodel',
				description: 'Take the perfect bath',
				dbReference: 'bathroom_remodel'
			},
			{
				id: 20.3,
				title: 'Floor remodel',
				description: 'Walk without shoes',
				dbReference: 'floor_remodel'
			},
			{
				id: 20.4,
				title: 'Countertops and Cabinets',
				description: 'Custom cabinets',
				dbReference: 'cabinets_remodel'
			},
			{
				id: 20.5,
				title: 'Other',
				description: 'Anything else?',
				dbReference: 'other_remodel'
			}
		]
	},
	{
		id: 21,
		uri:
			'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fother.jpeg?alt=media&token=69ac62eb-5ab7-4239-8c37-13e5d387f7ef',
		title: 'Other',
		description: 'Something else',
		dbReference: 'other',
		keyWords: ['other'],
		color: ['#607D8B', '#78909C']
	}
];

const categoryIcons = {
	home_services: icons.homeServices,
	home_outdoor: icons.homeOutdoor,
	auto_services: icons.autoServices,
	handyman: icons.handyman,
	baby_sitting: icons.babySitting,
	plumbing: icons.plumbing,
	electrical: icons.electrical,
	pet: icons.petServices,
	food: icons.food,
	beauty: icons.beauty,
	landscape: icons.landscaping,
	pest: icons.pestControl,
	tutoring: icons.tutor,
	health: icons.health,
	real_state: icons.realEstate,
	fit: icons.fit,
	insurance: icons.insurance,
	handmade: icons.handmade,
	technology: icons.technology,
	remodel: icons.remodel,
	other: icons.other,
};

categories.forEach(category => {
	category.icon = categoryIcons[category.dbReference];
})

export default categories;