const cheerio = require("cheerio");
const axios = require("axios");

async function scrapeCar() {
  try {
    const carBrandAndModels = [
      ["Audi", ["A3", "A4", "A6"]],
      ["BMW", ["Seria-5", "Seria-3", "Seria-1"]],
      ["Ford", ["Focus", "Fiesta", "Mondeo"]],
      ["Honda", ["Civic", "CR-V", "Accord"]],
      ["Kia", ["Ceed", "Sportage", "Picanto"]],
    ];

    const cars = [];
    const links = [];

    for (i = 0; i < 5; i++) {
      for (j = 0; j < 3; j++) {
        links.push(
          "https://www.otomoto.pl/osobowe/" +
            carBrandAndModels[i][0] +
            "/" +
            carBrandAndModels[i][1][j]
        );
      }
    }

    for (let i = 0; i < 15; i++) {
      await axios.get(links[i]).then((res) => {
        const $ = cheerio.load(res.data);

        $(".e1b25f6f18").each((i, el) => {
          let title = $(el).find("h2").text().replace(/\s\s+/g, "");

          let subtitle = $(el).find(".e1b25f6f5 div p").text();

          let year = $(el)
            .find(".e1b25f6f5 div ul li:nth-child(1)")
            .text()
            .replace(/\s*/g, "");
          year = year.substring(0, year.length / 2);

          let mileage_in_km = $(el)
            .find(".e1b25f6f5 div ul li:nth-child(2)")
            .text()
            .replace(/\s*/g, "")
            .replace(/km/g, "");
          mileage_in_km = mileage_in_km.substring(0, mileage_in_km.length / 2);

          let engine_capacity_cm3 = $(el)
            .find(".e1b25f6f5 div ul li:nth-child(3)")
            .text()
            .replace(/\s*/g, "")
            .replace(/cm3/g, "");
          engine_capacity_cm3 = engine_capacity_cm3.substring(
            0,
            engine_capacity_cm3.length / 2
          );

          let fuel_type = $(el)
            .find(".e1b25f6f5 div ul li:nth-child(4)")
            .text();
          fuel_type = fuel_type.substring(0, fuel_type.length / 2);

          let city = $(el)
            .find(".e1b25f6f5 > p")
            .text()
            .replace(/\s\(([^)]+)\)/, "");

          let region = $(el)
            .find(".e1b25f6f5 > p")
            .text()
            .match(/\(([^)]+)\)/)[1];

          let price_PLN = $(el)
            .find(".optimus-app-epvm6")
            .text()
            .replace(/[\sPLN]/g, "");

          let car = {
            title: title,
            subtitle: subtitle,
            year: year,
            mileage_in_km: mileage_in_km,
            engine_capacity_cm3: engine_capacity_cm3,
            fuel_type: fuel_type,
            city: city,
            region: region,
            price_PLN: price_PLN,
          };
          cars.push(car);
        });
      });
    }
    return cars;
  } catch (e) {
    return "error";
  }
}

module.exports = {
  scrapeCar,
};
