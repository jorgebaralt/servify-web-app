const defaultServiceImageHref = 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/service_images_default%2Fdefault-service-image.png?alt=media&token=715fac8f-fee4-4279-a802-00c132e0475e';

const defaultImage = (category) => {
	switch (category) {
		case 'home_services':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fhome_services.jpeg?alt=media&token=655630e7-4083-4aaf-b5e2-7880c9c56e0e';
		case 'home_outdoor':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fhome_outdoor.jpeg?alt=media&token=4ea6a7a6-e471-4a63-91c8-cfda32b941ba';
		case 'auto_services':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fauto_services.jpeg?alt=media&token=691ce839-bae0-48d0-81b6-a8a895a9d9d3';
		case 'handyman':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fhandyman.jpeg?alt=media&token=a7dad6c0-007c-4a1c-b2c6-5c644579e462';
		case 'baby_sitting':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fbaby_sitting.jpeg?alt=media&token=62ce3a49-dbbb-4cfd-968b-c3a9e37bfa19';
		case 'plumbing':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fplumbing.jpeg?alt=media&token=33574a58-7bfc-42a5-9203-1abd24b53b5f';
		case 'electrical':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Felectrical.jpeg?alt=media&token=822055bf-adb8-4f4b-9c37-92abaf1a08cc';
		case 'pet':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fpet.jpeg?alt=media&token=4c3193c7-79b2-4214-95b8-9ebde4c10129';
		case 'food':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Ffood.jpeg?alt=media&token=92def4ee-05db-47bc-99d8-cc18b2d84f6b';
		case 'beauty':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fbeauty.jpeg?alt=media&token=92fa4b6f-071c-4df0-98b3-abb4aba4a859';
		case 'tutoring':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Ftutoring.jpeg?alt=media&token=ed99192f-63c0-4a9d-899f-a684228525db';
		case 'health':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fhealth.jpeg?alt=media&token=b8709b1c-dd17-464e-af43-06b991e0b784';
		case 'real_estate':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Freal_estate.jpeg?alt=media&token=f2cd83ec-4d86-4d8f-a210-1791f187df46';
		case 'fit':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Ffit.jpeg?alt=media&token=96e061cb-1159-4199-be82-4813f393b8c9';
		case 'insurance':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Finsurance.jpeg?alt=media&token=2133a82b-4768-4136-9bfb-2fb76036a7d1';
		case 'handmade':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fhandmade.jpeg?alt=media&token=9b86e7af-69d9-4239-8b38-ab531d8fcb65';
		case 'technology':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fcomputer_phone.jpeg?alt=media&token=62bc7fdb-3b18-4bf9-afaa-bd277c9bb16f';
		case 'remodel':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fremodel.jpeg?alt=media&token=c70c958f-0a83-4423-be52-15b40fd3a0bd';
		case 'other':
			return 'https://firebasestorage.googleapis.com/v0/b/servify-716c6.appspot.com/o/category_default%2Fother.jpeg?alt=media&token=69ac62eb-5ab7-4239-8c37-13e5d387f7ef';
		default:
			return defaultServiceImageHref;
	}
};


export default defaultImage;