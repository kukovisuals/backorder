const { GraphQLClient } = require('graphql-request');
const express = require('express')
const fs = require('fs').promises;
const app = express()
const port = 3005


/*
  ******************************************************************
  * Also change the link of products 
  ******************************************************************
*/
const pdparr = [5304595480620,5320532590636,5304592629804,5297140596780,6841295994924,5320343945260,5304568414252,6591621234732,6670188806188,6598944227372,6569006432300,6944000180268,6921319514156,6935341957164,6935339270188,6935345070124,6793219244076,6793262530604,6793221144620,6664648458284,6599017005100,6599022247980,6975567495212,5304606720044,6664661729324,6599097778220,6599095910444,6599094173740,6664662908972,6599105839148,6599107313708,6599108558892,6773508505644,6785221820460,6773509947436,6841303597100,5327776809004,5327529902124,5327841558572,5304598691884,6793224224812,6793227960364,6841305530412,6793230614572,6543108898860,6543109226540,6773504376876,6785213333548,6916254105644,6915712974892,6935428366380,6916254433324,6916252270636,6935429677100,6916251549740,6916255350828,6916252631084,6916251287596,6916255088684,6916251779116,6916255252524,6916254203948,6916252074028,6916253319212,6935297392684,5408808173612,5408810795052,5408793952300,5408808501292,5441467547692,5408840482860,5304608817196,5308108374060,6599021101100,5403032256556,5408810401836,5408843104300,5304605671468,5327905685548,5328034791468,5320544714796,5304600690732,5308101623852,6552036835372,6673034870828,5437827940396,5408806731820,5307437383724,5305242845228,5304863359020,5307109408812,5307239333932,6773507620908,6773509423148,5408803061804,5441467842604,5408810991660,6552037261356,6626878586924,6773499789356,5308088614956,5308099756076,6773511946284]
const bralettesArr = [7014166626348,6921319514156,5304595480620,5304592629804,6992152592428,6992147218476,6664648458284,6664662908972,6664661729324,6793219244076,6773508505644,6793224224812,6773504376876]
const pantiesArr = ["6992121364524","6992126279724","6992158425132","6992156557356","6951023476780","6951026556972","6951802667052","6951834812460","6951839727660","6951850311724","5408808501292","5441467842604","5408803061804","5408810991660","6951847788588","6951852736556","6951847165996","6951852048428","5348821598252","5304608292908","5327529902124","5304598691884","5304608817196","5327776809004","5327841558572","6935345070124","6935341957164","6935339270188","5297140596780","5304568414252","5304606720044","5308108374060","6599105839148","6599107313708","6599108558892","6599094173740","6599097778220","6599095910444","6975567495212","6599022247980","6599017005100","5307437383724","5320343945260","5328001663020","5327888547884","6627393372204","5408793952300","5408810795052","6785221820460","6773509947436","6793262530604","6935297392684","5408806731820","5308099756076","6673028448300","6543108898860","6543109226540","5320544714796","5304605671468","5304600690732","5327905685548","5320532590636","6599021101100","5307247394860","5307109408812","5304863359020","5307239333932","5403032256556","5408843104300","5328034791468","6552036835372","5408840482860","5308101623852","6670195392556","5441467547692","6552037261356","5408810401836","5408808173612","6673034870828","6543108571180"]
const appaerl = [6841295994924,6591621234732,6670188806188,6944000180268,6598944227372,6569006432300,6916254105644,6935428366380,6915712974892,6916251779116,6916251287596,6916255088684,6916254203948,6916252074028,6916255252524,6916253319212,6841303597100,6916254433324,6935429677100,6916252270636,6841305530412,6916251549740,6916252631084,6916255350828]
const shopAllNames = ["/products/skyway-bralette","/products/skyway-high-waisted-thong","/products/skyway-brief","/products/skyway-highwaisted","/products/majestic-bloom-bralette","/products/majestic-bloom-highwaisted-thong","/products/majestic-bloom-highwaisted","/products/majestic-bloom-brief","/products/pink-lady-bralette","/products/pink-lady-brief-panties","/products/pink-lady-high-waisted-underwear","/products/pink-lady-cheeky-underwear","/products/woodsmoke-seamless-tank","/products/red-plum-thong","/products/relic-thong","/products/relic-highwaisted","/products/gold-dust-highwaisted","/products/gold-dust-thong","/products/cathay-spice-sheer-bralette","/products/cathay-spice-sheer-high-cut-highwaisted","/products/cathay-spice-sheer-brief","/products/nude-bralette","/products/nude-bikini-panties","/products/nude-cheeky","/products/nude-thong","/products/highwaisted-nude-thong","/products/nude-high-waisted-panties","/products/black-bralette","/products/black-brief-panties","/products/black-high-waisted-panties","/products/black-bodysuit","/products/black-high-waisted-thong","/products/black-thong","/products/black-mesh-brief-panties","/products/black-seamless-tank-top","/products/blue-opal-seamless-tank","/products/white-seamless-tank","/products/brick-dust-tank","/products/peach-bloom-bralette","/products/peach-bloom-brief","/products/peach-bloom-thong","/products/peach-bloom-highwaisted","/products/coral-pink-seamless-sheer-bralette","/products/coral-pink-mesh-brief-panties","/products/coral-pink-mesh-high-waisted-panties","/products/coral-pink-mesh-thong-panties","/products/piki-bralette","/products/piki-high-cut","/products/ocean-depths-bralette","/products/ocean-depths-high-cut","/products/ocean-depths-bralette-bodysuit","/products/ocean-depths-eco-silk-blouse","/products/ocean-depths-eco-silk-shorts","/products/ocean-depths-eco-silk-pants","/products/spotted-panther-eco-silk-slip-dress","/products/spotted-panther-eco-silk-tank-top","/products/spotted-panther-eco-silk-shorts","/products/cactus-eco-silk-slip-dress","/products/cactus-eco-silk-tank-top","/products/cactus-eco-silk-shorts","/products/castle-wall-eco-silk-tank-top","/products/brush-washable-eco-silk-slip-dress","/products/brush-eco-silk-pants","/products/margaux-sheer-bralette","/products/margaux-sheer-high-cut-highwaisted","/products/margaux-sheer-brief","/products/caribbean-sea-seamless-sheer-bralette","/products/caribbean-sea-mesh-thong-panties","/products/caribbean-sea-mesh-brief-panties","/products/caribbean-sea-mesh-highwaisted-panties","/products/fuchsia-festival-highwaisted","/products/exotic-botanical-thong","/products/rose-dust-pink-thong-panties","/products/luxe-strawberry-ice-thong-panties","/products/pink-lady-thong","/products/high-waisted-opal-blue-panties","/products/blue-opal-thong-panties","/products/dark-palm-thong","/products/fallen-rock-seamless-tank-top","/products/fallen-rock-high-waisted-panties","/products/fallen-rock-bikini","/products/red-plum-highwaisted","/products/black-bikini-panties","/products/black-cheeky-panties","/products/black-seamless-sheer-bralette","/products/reptile-stripe-mesh-brief","/products/black-mesh-highwaisted-panties","/products/black-mesh-thong-panties","/products/green-millieu-thong","/products/grey-brief-panties","/products/grey-bikini-panties","/products/grey-cheeky-panties","/products/grey-high-waisted-panties","/products/grey-thong-panties","/products/white-thong-panties","/products/high-waisted-white-panties","/products/white-cheeky","/products/brief-white-panties","/products/ocean-depths-highwaisted","/products/ocean-depths-brief","/products/brief-provincial-blue-panties","/products/duchess-highwaisted-panties","/products/nude-brief-panties","/products/sleek-tiger-brief","/products/sleek-tiger-bikini","/products/sleek-tiger-thong","/products/raindrop-thong-panties","/products/provincial-blue-thong-panties"]
const pantiesNames = ["/products/castor-grey-sheer-brief?variant=40792344952876","/products/castor-grey-sheer-high-cut-highwaisted?variant=40792351277100","/products/cathay-spice-sheer-high-cut-highwaisted?variant=40792425725996","/products/cathay-spice-sheer-brief?variant=40792422449196","/products/skyway-brief?variant=40670566580268","/products/skyway-highwaisted?variant=40670576410668","/products/majestic-bloom-brief?variant=40672505954348","/products/majestic-bloom-highwaisted?variant=40672610549804","/products/gold-dust-highwaisted?variant=40672637059116","/products/gold-dust-thong?variant=40672692437036","/products/fallen-rock-high-waisted-panties?variant=34686614700076","/products/fallen-rock-cheeky?variant=34804541653036","/products/fallen-rock-brief-panties","/products/fallen-rock-thong","/products/relic-highwaisted","/products/relic-thong","/products/red-plum-highwaisted","/products/red-plum-thong","/products/pink-lady-cheeky-underwear","/products/pink-lady-high-waisted-underwear","/products/nude-cheeky","/products/nude-thong","/products/nude-high-waisted-panties","/products/nude-bikini-panties","/products/highwaisted-nude-thong","/products/peach-bloom-thong","/products/peach-bloom-highwaisted","/products/peach-bloom-brief","/products/black-brief-panties","/products/black-thong","/products/black-high-waisted-panties","/products/black-high-waisted-thong","/products/coral-pink-mesh-brief-panties","/products/coral-pink-mesh-high-waisted-panties","/products/coral-pink-mesh-thong-panties","/products/caribbean-sea-mesh-brief-panties","/products/caribbean-sea-mesh-thong-panties","/products/caribbean-sea-mesh-highwaisted-panties","/products/reptile-stripe-mesh-brief","/products/black-mesh-highwaisted-panties","/products/black-mesh-brief-panties","/products/black-cheeky-panties","/products/black-bikini-panties","/products/pink-lady-brief-panties","/products/pink-lady-thong","/products/luxe-strawberry-ice-thong-panties","/products/castle-wall-brief-panties","/products/castle-wall-thong","/products/ocean-depths-high-cut","/products/ocean-depths-highwaisted","/products/piki-high-cut","/products/green-millieu-thong","/products/brief-white-panties","/products/exotic-botanical-thong","/products/fuchsia-festival-highwaisted","/products/high-waisted-opal-blue-panties","/products/blue-opal-thong-panties","/products/grey-high-waisted-panties","/products/grey-brief-panties","/products/grey-thong-panties","/products/grey-bikini-panties","/products/nude-brief-panties","/products/black-mesh-thong-panties","/products/dark-palm-thong","/products/sleek-tiger-bikini","/products/sleek-tiger-brief","/products/sleek-tiger-thong","/products/white-thong-panties","/products/white-cheeky","/products/grey-cheeky-panties","/products/brief-provincial-blue-panties","/products/rose-dust-pink-thong-panties","/products/raindrop-thong-panties","/products/duchess-highwaisted-panties","/products/fallen-rock-bikini","/products/provincial-blue-thong-panties","/products/high-waisted-white-panties","/products/castle-wall-highwaisted","/products/keepsake-lilac-brief-panties","/products/blue-opal-brief-panties"]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
saveObjectFetchData(pantiesArr,'panties')


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
      name: pantiesNames[i],
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



// (() => {
//   setInterval(() => {
//     saveObjectFetchData(appaerl,'apparel')
//     
//     saveObjectFetchData(pantiesArr,'panties')
//     saveObjectFetchData(pdparr,'shopAll')
//   }, 4392000)
// })();

/*
      let link = []
      const getHref = document.querySelectorAll('.proFeaturedImage')
      for(let el of getHref){
        const href = el.getAttribute('href')
        link.push(href)
      }    

      console.log(JSON.stringify(link))

      let link = []
      const getHref = document.querySelectorAll('.item.ebyProdTile.epcWrapper')
      for(let el of getHref){
        const href = el.getAttribute('data-prodsku')
        link.push(href)
      }    

      console.log(JSON.stringify(link))
    */
