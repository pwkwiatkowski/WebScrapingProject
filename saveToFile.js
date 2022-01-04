const scrapers = require("./scrapers");
const fs = require("fs");

async function saveToFile() {
  const carData = await scrapers.scrapeCar();

  console.log("Scraped cars: ");
  console.log(carData);
  console.log("Length of cars array");
  console.log(carData.length);

  for (let i = 0; i < carData.length; i++) {
    fs.readFile("cars_in_json.txt", function (err, data) {
        let json = carData[i];
        var dataToFile = JSON.stringify(json) + "\n";
      fs.appendFile("cars_in_json.txt", dataToFile, function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    });
  }
}

module.exports = saveToFile;