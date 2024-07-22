const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: 'toolsgalore-com-au',
  apiKey: 'd23e525bc0ffeadd1def4ac7b20e9a3b',
  password: 'c4ebf050b75ff6105e754acb86ff887d'
});

shopify.carrierService.create({
  name: 'Custom Shipping Service',
  callback_url: 'http://localhost:3000/get-shipping-rates',
  service_discovery: true
}).then(carrierService => {
  console.log('Carrier service created:', carrierService);
}).catch(error => {
  console.error('Error creating carrier service:', error);
});
