// Dhaka, Gazipur, Narsingdi, Manikganj, Munshiganj, Narayanganj, Mymensingh, Sherpur, Jamalpur, Netrokona, Kishoreganj, Tangail, Faridpur, Maradipur, Shariatpur, Rajbari and Gopalganj

// const addShippingPrice = (division, district) => {
//   if (division === "Dhaka") {
//     return 70;
//   } else if (district === "Gazipur") {
//     return 70;
//   } else if (district === "Narsingdi") {
//     return 70;
//   } else if (district === "Manikganj") {
//     return 70;
//   } else if (district === "Munshiganj") {
//     return 70;
//   } else if (district === "Narayanganj") {
//     return 70;
//   } else if (district === "Mymensingh") {
//     return 70;
//   } else if (district === "Sherpur") {
//     return 70;
//   } else if (district === "Jamalpur") {
//     return 70;
//   } else if (district === "Netrokona") {
//     return 70;
//   } else if (district === "Kishoreganj") {
//     return 70;
//   } else if (district === "Tangail") {
//     return 70;
//   } else if (district === "Faridpur") {
//     return 70;
//   } else if (district === "Maradipur") {
//     return 70;
//   } else if (district === "Shariatpur") {
//     return 70;
//   } else if (district === "Rajbari") {
//     return 70;
//   } else if (district === "Gopalganj") {
//     return 70;
//   } else {
//     return 120;
//   }
// };

// export const divisionShippingPrice = (division, district) => {
//   if (division !== "Dhaka") {
//     return 120;
//   } else {
//     return 70;
//   }
// };

export const districtShippingPrice = (division, district) => {
  if (
    division === "Dhaka" &&
    (district === "Dhaka" ||
      district === "Gazipur" ||
      district === "Narsingdi" ||
      district === "Manikganj" ||
      district === "Munshiganj" ||
      district === "Narayanganj" ||
      district === "Mymensingh" ||
      district === "Sherpur" ||
      district === "Jamalpur" ||
      district === "Netrokona" ||
      district === "Kishoreganj" ||
      district === "Tangail" ||
      district === "Faridpur" ||
      district === "Maradipur" ||
      district === "Shariatpur" ||
      district === "Rajbari" ||
      district === "Gopalganj")
  ) {
    return 70;
  } else {
    return 120;
  }
};
