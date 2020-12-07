const puppeteer = require("puppeteer");
const hookcord = require('hookcord');

const platformStatusUp = [
  "🟢 PC UP",
  "🟢 PS4 UP",
  "🟢 PS3 UP",
  "🟢 XBOX ONE UP",
  "🟢 XBOX 360 UP"
]

const platformStatusLimited = [
  "🟡 PC LIMITED",
  "🟡 PS4 LIMITED",
  "🟡 PS3 LIMITED",
  "🟡 XBOX ONE LIMITED",
  "🟡 XBOX 360 LIMITED"
]

const platformStatusDown = [
  "🔴 PC DOWN",
  "🔴 PS4 DOWN",
  "🔴 PS3 DOWN",
  "🔴 XBOX ONE DOWN",
  "🔴 XBOX 360 DOWN"
]
exports.s = function(){
    function serverStatus(){
    setTimeout(function(){
      (async () => {


        let url = "https://support.rockstargames.com/servicestatus";
        let hookFields = []

        let browser = await puppeteer.launch();
        let page = await browser.newPage();

        await page.goto(url, {waitUntil: 'networkidle2' })

        let platformStatusCheck = []

        let data = await page.evaluate(() => {
          let pc = document.getElementsByClassName('platform')[4].getAttribute('aria-label');
          let playstation4 = document.getElementsByClassName('platform')[5].getAttribute('aria-label');
          let xboxone = document.getElementsByClassName('platform')[6].getAttribute('aria-label');
          let playstation3 = document.getElementsByClassName('platform')[7].getAttribute('aria-label');
          let xbox360 = document.getElementsByClassName('platform')[8].getAttribute('aria-label');
          let socialClub = document.getElementsByClassName('platform')[9].getAttribute('aria-label');
          return [
            pc,
            playstation4,
            playstation3,
            xboxone,
            xbox360
          ];
        });

        switch (data[0]) {
          case "Grand Theft Auto Online - PC - UP": {
            let pcStatus = "🟢 PC UP";
            platformStatusCheck.push(pcStatus);
            break;
          }

          case "Grand Theft Auto Online - PC - LIMITED":{
            let pcStatus = "🟡 PC LIMITED";
            platformStatusCheck.push(pcStatus);
            break;
          }

          case "Grand Theft Auto Online - PC - DOWN":{
            let pcStatus = "🔴 PC DOWN";
            platformStatusCheck.push(pcStatus);
            break;
          }
          default: console.log(data[0])

        }

        switch (data[1]) {
          case "Grand Theft Auto Online - PS4 - UP":{
            let ps4Status = "🟢 PS4 UP";
            platformStatusCheck.push(ps4Status);
          }
            break;

          case "Grand Theft Auto Online - PS4 - LIMITED":{
            let ps4Status = "🟡 PS4 LIMITED";
            platformStatusCheck.push(ps4Status);
          }
            break;

          case "Grand Theft Auto Online - PS4 - DOWN":{
            let ps4Status = "🔴 PS4 DOWN";
            platformStatusCheck.push(ps4Status);
          }
            break;

        }

        switch (data[2]) {
          case "Grand Theft Auto Online - PS3 - UP":{
            let ps3Status = "🟢 PS3 UP";
            platformStatusCheck.push(ps3Status);
          }
            break;

          case "Grand Theft Auto Online - PS3 - LIMITED":{
            let ps3Status = "🟡 PS3 LIMITED";
            platformStatusCheck.push(ps3Status);
          }
            break;

          case "Grand Theft Auto Online - PS3 - DOWN":{
            let ps3Status = "🔴 PS3 DOWN";
            platformStatusCheck.push(ps3Status);
          }
            break;

        }

        switch (data[3]) {
          case "Grand Theft Auto Online - Xbox One - UP":{
            let xboxoneStatus = "🟢 XBOX ONE UP";
            platformStatusCheck.push(xboxoneStatus);
          }
            break;

          case "Grand Theft Auto Online - Xbox One - LIMITED":{
            let xboxoneStatus = "🟡 XBOX ONE LIMITED";
            platformStatusCheck.push(xboxoneStatus);
          }
            break;

          case "Grand Theft Auto Online - Xbox One - DOWN":{
            let xboxoneStatus = "🔴 XBOX ONE DOWN";
            platformStatusCheck.push(xboxoneStatus);
          }
            break;

        }

        switch (data[4]) {
          case "Grand Theft Auto Online - Xbox 360 - UP":{
            let xbox360Status = "🟢 XBOX 360 UP";
            platformStatusCheck.push(xbox360Status);
          }
            break;

          case "Grand Theft Auto Online - Xbox 360 - LIMITED":{
            let xbox360Status = "🟡 XBOX 360 LIMITED";
            platformStatusCheck.push(xbox360Status);
          }
            break;

          case "Grand Theft Auto Online - Xbox 360 - DOWN":{
            let xbox360Status = "🔴 XBOX 360 DOWN";
            platformStatusCheck.push(xbox360Status);
          }
            break;
          default: console.log(data[4])

        }

          switch(JSON.stringify(platformStatusCheck)){
            case JSON.stringify(platformStatusUp):{
              let gtaOnline = {
                name: "Grand Theft Auto Online",
                value: "🟢 All services"
              }
              hookFields.push(gtaOnline);
            }
            break;
            case JSON.stringify(platformStatusLimited):{
              let gtaOnline = {
                name: "Grand Theft Auto Online",
                value: "🟡 All services"
              }
              hookFields.push(gtaOnline);
              break;
            }
            case JSON.stringify(platformStatusDown):{
              let gtaOnline = {
                name: "Grand Theft Auto Online",
                value: "🔴 All Services"
              }
              hookFields.push(gtaOnline);
              break;
            }
            default: {
              let gtaOnline = {
                name: "Grand Theft Auto Online",
                value: platformStatusCheck[0] + "\n" + platformStatusCheck[1] + "\n" + platformStatusCheck[2] + "\n" + platformStatusCheck[3] + "\n" + platformStatusCheck[4]
              }
              hookFields.push(gtaOnline);
            }
          }

            const Hook = new hookcord.Hook()
            Hook.login(ID, SECRET);
            Hook.setPayload({
              "embeds": [{
                    "title": "🚦Rock⭐ Service Status🚦",
                    "url": "https://support.rockstargames.com/servicestatus",
                    "color": 15257231,
                    "fields": hookFields
                  }]
            })

          Hook.fire()
          .then(response_object => {
              })
          .catch(error => {
                throw error;
              })


      })();

    serverStatus()
    }, 15000)
  }
  serverStatus(); //Repeatedly executes the function
}
