const { GraphQLClient } = require('graphql-request');
const express = require('express')
const fs = require('fs').promises;
const app = express()
const port = 3005

const test = [6793262530604,5304595480620]
// const pdparr = [5304595480620,5320532590636,5304592629804,5297140596780,6841295994924,5307437383724,6591621234732,6670188806188,6598944227372,6569006432300,5408806731820,6944000180268,6921319514156,6935341957164,6935339270188,6935345070124,6793219244076,6793262530604,6793221144620,6664648458284,6599017005100,6599022247980,5320343945260,5304568414252,6664661729324,6599097778220,6599095910444,6599094173740,6664662908972,6599105839148,6599107313708,6599108558892,6773508505644,6785221820460,6773507620908,6773509947436,6841303597100,6773509423148,5408803061804,5441467842604,5327776809004,5327529902124,5327841558572,5304598691884,6935297392684,5408808173612,5408810795052,5408793952300,6793224224812,6793227960364,6841305530412,6793230614572,6543108898860,6543109226540,6773504376876,6785213333548,6916254105644,6915712974892,6935428366380,6916254433324,6916252270636,6935429677100,6916251549740,6916255350828,6916252631084,6916251287596,6916255088684,6916251779116,6916255252524,6916254203948,6916252074028,6916253319212,5408808501292,5441467547692,5408840482860,5304608817196,5304606720044,5308108374060,6975567495212,6599021101100,5403032256556,5408810401836,5408843104300,5304605671468,5327905685548,5328034791468,5320544714796,5304600690732,5308101623852,6552036835372,6673034870828,5437827940396,5305242845228,5304863359020,5307109408812,5307239333932,6552037261356,6626878586924,5408810991660,5308088614956,5308099756076,6773499789356,6773511946284,6935307780140]
const pdparr = [5304595480620,5320532590636,5304592629804,5297140596780,6841295994924,5320343945260,5304568414252,6591621234732,6670188806188,6598944227372,6569006432300,6944000180268,6921319514156,6935341957164,6935339270188,6935345070124,6793219244076,6793262530604,6793221144620,6664648458284,6599017005100,6599022247980,6975567495212,5304606720044,6664661729324,6599097778220,6599095910444,6599094173740,6664662908972,6599105839148,6599107313708,6599108558892,6773508505644,6785221820460,6773509947436,6841303597100,5327776809004,5327529902124,5327841558572,5304598691884,6793224224812,6793227960364,6841305530412,6793230614572,6543108898860,6543109226540,6773504376876,6785213333548,6916254105644,6915712974892,6935428366380,6916254433324,6916252270636,6935429677100,6916251549740,6916255350828,6916252631084,6916251287596,6916255088684,6916251779116,6916255252524,6916254203948,6916252074028,6916253319212,6935297392684,5408808173612,5408810795052,5408793952300,5408808501292,5441467547692,5408840482860,5304608817196,5308108374060,6599021101100,5403032256556,5408810401836,5408843104300,5304605671468,5327905685548,5328034791468,5320544714796,5304600690732,5308101623852,6552036835372,6673034870828,5437827940396,5408806731820,5307437383724,5305242845228,5304863359020,5307109408812,5307239333932,6773507620908,6773509423148,5408803061804,5441467842604,5408810991660,6552037261356,6626878586924,6773499789356,5308088614956,5308099756076,6773511946284]
const bralettesArr = [7014166626348,6921319514156,5304595480620,5304592629804,6992152592428,6992147218476,6664648458284,6664662908972,6664661729324,6793219244076,6773508505644,6793224224812,6773504376876]

const pantiesArr = [5320532590636,5327529902124,5327776809004,5304598691884,6935341957164,6935339270188,6935345070124,5408793952300,5408808173612,5408810795052,6935297392684,5297140596780,5307437383724,5320343945260,6793221144620,6793262530604,6773509423148,6785221820460,6773507620908,6773509947436,6599022247980,6599017005100,6975567495212,6599105839148,6599107313708,6599108558892,6599094173740,6599097778220,6599095910444,6793227960364,6793230614572,5408806731820,6785213333548,5308099756076,5304606720044,6543109226540,6543108898860,5408808501292,5441467842604,6599021101100,5320544714796,5304605671468,5304600690732,5327905685548,5408803061804,5408810991660,5304608817196,5304568414252,5308108374060,5307109408812,5304863359020,5307239333932,5403032256556,5408843104300,5308088614956,5328034791468,6552036835372,5408840482860,5308101623852,5437827940396,5305242845228,5441467547692,6552037261356,6626878586924,5327841558572,5408810401836,6773511946284,6673034870828]
const appaerl = [6841295994924,6591621234732,6670188806188,6944000180268,6598944227372,6569006432300,6916254105644,6935428366380,6915712974892,6916251779116,6916251287596,6916255088684,6916254203948,6916252074028,6916255252524,6916253319212,6841303597100,6916254433324,6935429677100,6916252270636,6841305530412,6916251549740,6916252631084,6916255350828]

// const shopAllNames = ["Nude Bralette","Nude Brief","Black Bralette","Black Brief","Black Bra Bodysuit","Black Bikini","Black Thong","Black Seamless Tank","Blue Opal Seamless Tank","Fallen Rock Seamless Tank","White Seamless Tank","Brick Dust Tank","Peach Bloom Bralette","Peach Bloom Highwaisted","Peach Bloom Brief","Peach Bloom Thong","Piki Bralette","Piki High Cut Highwaisted","Piki Highwaisted","Black Mesh Bralette","Black Mesh Brief","Black Mesh Highwaisted","Reptile Stripe Mesh Brief","Black Highwaisted","Caribbean Sea Mesh Bralette","Caribbean Sea Mesh Thong","Caribbean Sea Mesh Highwaisted","Caribbean Sea Mesh Brief","Coral Pink Mesh Bralette","Coral Pink Mesh Brief","Coral Pink Mesh Highwaisted","Coral Pink Mesh Thong","Ocean Depths Bralette","Ocean Depths High Cut Highwaisted","Ocean Depths Highwaisted","Ocean Depths Bra Bodysuit","Nude Bikini","Nude Cheeky","Nude Highwaisted Thong","Nude Thong","Spotted Panther Bralette","Spotted Panther Brief","Spotted Panther Bra Bodysuit","Spotted Panther Highwaisted","Blue Opal Highwaisted","Blue Opal Thong","Exotic Botanical Bralette","Exotic Botanical High Cut Highwaisted","Brush Eco Silk Blouse","Brush Eco Silk Slip Dress","Brush Eco Silk Pants","Ocean Depths Eco Silk Blouse","Ocean Depths Eco Silk Shorts","Ocean Depths Eco Silk Pants","Spotted Panther Eco Silk Long Slip Dress","Spotted Panther Eco Silk Tank Top","Spotted Panther Eco Silk Shorts","Cactus Eco Silk Slip Dress","Cactus Eco Silk Tank Top","Cactus Eco Silk Shorts","Castle Wall Eco Silk Tank Top","Castle Wall Eco Silk Blouse","Castle Wall Eco Silk Shorts","Lime Punch Eco Silk Scarf","Green Millieu Thong","Castle Wall Highwaisted","Castle Wall Thong","Castle Wall Brief","Fallen Rock Highwaisted","Fallen Rock Bikini","Rose Dust Thong","Nude Highwaisted","Black Highwaisted Thong","Black Mesh Thong","White Thong","White Highwaisted","White Cheeky","Grey Brief","Grey Bikini","Grey Cheeky","Grey Highwaisted","Grey Thong","Raindrop Thong","Provincial Blue Brief","Keepsake Lilac Brief","Laurel Green Cheeky","White Brief","Black Cheeky","Espresso Brief","Sleek Tiger Brief","Sleek Tiger Bikini","Sleek Tiger Thong","Ocean Depths Bikini","Ocean Depths Brief","Fallen Rock Brief","Fallen Rock Cheeky","Fallen Rock Thong","Provincial Blue Thong","El Sabor Thong","Blue Iris Bralette","Exotic Botanical Bikini","Exotic Botanical Thong","Picnic Rose Brief"]

// const pdparr = [5304595480620,5320532590636,5304592629804,5297140596780]
// const bralettesArr = [5304592629804,6921319514156,5304595480620,6793219244076]
// const pantiesArr = [5320532590636,5327529902124,5327776809004,5304598691884]
// const appaerl = [6841295994924,6591621234732,6670188806188,6944000180268,6598944227372]

const shopAllNames = ["/products/fallen-rock-bralette-2","/products/peach-bloom-bralette","/products/nude-bralette","/products/black-bralette","/products/cathay-spice-sheer-bralette","/products/margaux-sheer-bralette","/products/black-seamless-sheer-bralette","/products/coral-pink-seamless-sheer-bralette","/products/caribbean-sea-seamless-sheer-bralette","/products/piki-bralette","/products/ocean-depths-bralette","/products/spotted-panther-bralette","/products/exotic-botanical-bralette"]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
saveObjectFetchData(bralettesArr,'bralettes')


async function saveObjectToJSONFile(object, fileName) {
  await fs.writeFile(fileName, object);
  console.log(`Object saved to ${fileName}`);
}

async function saveObjectFetchData(arr, folder){

  let data = [];
  const chapterPromises = arr.map(async (ids) => {
    const response = await fetch(`https://inventorylocations.checkmyapp.net/inventory/products/eby-by-sofia-vergara.myshopify.com/[${ids}]`);
    let json = await response.json();
    return json
  });

  const chapters = await Promise.all(chapterPromises);

  chapters.map(async (vData, i) => {
    const parallelData = checkStock(vData, arr[i], i) 
    data.push(parallelData)
  })

  console.log(folder)
  const dia = Date.now()
  let jsonString = JSON.stringify(data);
  saveObjectToJSONFile(jsonString, `${folder}/pdp-${dia}.json`)
}


function checkStock(b, z, i){
  var c = b[z].product.variants 
  // console.log(b[z], z, i)
  const obj = Object.keys(c).map(function (b, index) {
    let variants = c[b];
    
    let variant = {
      name: shopAllNames[i],
      pdp: z,
      id: '',
      sku: '',
      title: '',
      inventory: 0,
    }

    variant.id = variants.id
    variant.sku = variants.sku
    variant.title = variants.title
    variant.inventory = +variants.inventoryItem.locations[0].available
    
    return variant
  })
  return obj
}



(() => {
  setInterval(() => {
    saveObjectFetchData(appaerl,'apparel')
    
    saveObjectFetchData(pantiesArr,'panties')
    saveObjectFetchData(pdparr,'shopAll')
  }, 4392000)
})();

/*

const client = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': access_token,
  },
});

const query = `
query {
  inventoryLevel(id: "gid://shopify/InventoryLevel/46033928236?inventory_item_id=5304592629804") {
    id
    available
    incoming
    item {
      id
      sku
    }
    location {
      id
      name
    }
  }
}
`;

client
  .request(query)
  .then(data => {
    console.log(data);
    const a = data
    console.log(JSON.stringify(a));
  })
  .catch(error => {
    console.log(error);
  });
  */