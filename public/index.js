'use strict';

//list of truckers
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL steps
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },

  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

// Step 1
var PriceOfDeliveries=[0,0,0];
var CommissionOfDeliveries = [[0,0,0],[0,0,0],[0,0,0]];
const ActorPriceJson =[{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shiper':0,
  'trucker':0,
  'treasury':0,
  'insurance':0,
  'convargo':0
},{
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shiper':0,
  'trucker':0,
  'treasury':0,
  'insurance':0,
  'convargo':0
},{
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shiper':0,
  'trucker':0,
  'treasury':0,
  'insurance':0,
  'convargo':0
}];
var ActorPrice = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];

for (var i =0; i<deliveries.length;i++) {
    var infoTruck = infoTruckers(deliveries[i].truckerId);
    if(deliveries[i].volume > 25)
    {
      infoTruck[1] = infoTruck[1] - infoTruck[1]*0.5;
    }
    else if (deliveries[i].volume > 10)
    {
        infoTruck[1] = infoTruck[1] - infoTruck[1]*0.3;
    }
    else if (deliveries[i].volume > 5)
    {
      infoTruck[1] = infoTruck[1] - infoTruck[1]*0.1;
    }
    PriceOfDeliveries[i] = deliveries[i].distance*infoTruck[0] + deliveries[i].volume*infoTruck[1];

    CommissionOfDeliveries[i][0] = (PriceOfDeliveries[i]*0.3)/2;
    CommissionOfDeliveries[i][1] = Math.floor(deliveries[i].distance/500)+1;
    CommissionOfDeliveries[i][2] = (PriceOfDeliveries[i]*0.3) - CommissionOfDeliveries[i][0] -CommissionOfDeliveries[i][1];

    var franchise = 0;
    if(deliveries[i].options.deductibleReduction)
    {
      franchise = deliveries[i].volume*1;
      PriceOfDeliveries[i] +=  deliveries[i].volume*1;
    }

    ActorPrice[i][0] = PriceOfDeliveries[i]; //shiper
    ActorPriceJson[i].shiper =ActorPrice[i][0];
    ActorPrice[i][1] = PriceOfDeliveries[i] - PriceOfDeliveries[i]*0.3 - franchise; //trucker
    ActorPriceJson[i].trucker =ActorPrice[i][1];
    ActorPrice[i][2] = CommissionOfDeliveries[i][0]; // insurance
    ActorPriceJson[i].insurance =ActorPrice[i][2];
    ActorPrice[i][3] = CommissionOfDeliveries[i][1]; //treasury
    ActorPriceJson[i].treasury =ActorPrice[i][3];
    ActorPrice[i][4] = CommissionOfDeliveries[i][2] + franchise; //convargo receives
    ActorPriceJson[i].convargo =ActorPrice[i][4];
}

function infoTruckers(searchId)
{
    for (var i = 0; i < truckers.length; i++) {
      if (searchId == truckers[i].id) {
        return [truckers[i].pricePerKm,truckers[i].pricePerVolume];
      }
    }
}

console.log(ActorPriceJson);
console.log(ActorPrice);
console.log(PriceOfDeliveries);
console.log(CommissionOfDeliveries)
console.log(truckers);
console.log(deliveries);
console.log(actors);
