const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/get-shipping-rates', async (req, res) => {
  try {
    // Extract destination and items from the request body
    const { destination, items } = req.body.rate;

    // Calculate the total weight of the items
    const totalWeight = items.reduce((total, item) => total + item.grams, 0);

    // Prepare the destination address for BigPost API
    const destinationAddress = `${destination.city}, ${destination.province}, ${destination.country}, ${destination.postal_code}`;

    // Fetch base rate from BigPost API
    const bigPostResponse = await axios.get('https://api.bigpost.com/rates', {
      headers: { 'Authorization': 'iNmSfIrjKk6jLkPx2Up6sw' },
      params: { destination: destinationAddress, weight: totalWeight }
    });

    // Extract necessary details from BigPost response
    const baseRate = bigPostResponse.data.rate;
    const currency = bigPostResponse.data.currency || 'AUD'; // Default to 'AUD' if not provided
    const deliveryTime = bigPostResponse.data.delivery_time

    // Respond with the shipping rate details
    res.json({
      bigPost: {
        service_name: 'BigPost',
        total_cost: baseRate,
        currency: currency,
        delivery_time: deliveryTime
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching shipping rates');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
