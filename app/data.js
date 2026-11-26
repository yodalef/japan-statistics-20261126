// All figures from Japan's Statistics Bureau 2020 Census and population
// estimates (Oct 2024), MHLW Vital Statistics 2024, and the Cabinet Office.

// Census population, millions. 2024 is the 1 October population estimate.
export const populationTrend = [
  { year: 1920, value: 55.96 }, { year: 1925, value: 59.74 },
  { year: 1930, value: 64.45 }, { year: 1935, value: 69.25 },
  { year: 1940, value: 73.11 }, { year: 1945, value: 72.00 },
  { year: 1950, value: 83.20 }, { year: 1955, value: 89.28 },
  { year: 1960, value: 93.42 }, { year: 1965, value: 98.27 },
  { year: 1970, value: 103.72 }, { year: 1975, value: 111.94 },
  { year: 1980, value: 117.06 }, { year: 1985, value: 121.05 },
  { year: 1990, value: 123.61 }, { year: 1995, value: 125.57 },
  { year: 2000, value: 126.93 }, { year: 2005, value: 127.77 },
  { year: 2010, value: 128.06 }, { year: 2015, value: 127.09 },
  { year: 2020, value: 126.15 }, { year: 2024, value: 123.8 },
];

// Share of the population aged 65 and over, percent.
export const ageingTrend = [
  { year: 1950, value: 4.9 }, { year: 1960, value: 5.7 },
  { year: 1970, value: 7.1 }, { year: 1980, value: 9.1 },
  { year: 1990, value: 12.0 }, { year: 2000, value: 17.3 },
  { year: 2010, value: 23.0 }, { year: 2020, value: 28.6 },
  { year: 2024, value: 29.3 },
];

// Population by five-year age group, 2020 Census, thousands.
export const ageStructure2020 = [
  { band: "0–4", value: 4720 }, { band: "5–9", value: 5243 },
  { band: "10–14", value: 5576 }, { band: "15–19", value: 5858 },
  { band: "20–24", value: 6144 }, { band: "25–29", value: 6392 },
  { band: "30–34", value: 6837 }, { band: "35–39", value: 7371 },
  { band: "40–44", value: 8047 }, { band: "45–49", value: 9203 },
  { band: "50–54", value: 8282 }, { band: "55–59", value: 7741 },
  { band: "60–64", value: 7660 }, { band: "65–69", value: 8206 },
  { band: "70–74", value: 9187 }, { band: "75–79", value: 7172 },
  { band: "80–84", value: 5321 }, { band: "85–89", value: 3724 },
  { band: "90–94", value: 1917 }, { band: "95–99", value: 611 },
  { band: "100+", value: 80 },
];

// Total fertility rate, children per woman.
export const fertilityTrend = [
  { year: 1970, value: 2.13 }, { year: 1980, value: 1.75 },
  { year: 1990, value: 1.54 }, { year: 2000, value: 1.36 },
  { year: 2010, value: 1.39 }, { year: 2020, value: 1.33 },
  { year: 2024, value: 1.15 },
];

// 2020 Census population by prefecture. Total: 126,146,099.
export const prefectures = [
  { name: "Hokkaido", population: 5224614 },
  { name: "Aomori", population: 1237984 },
  { name: "Iwate", population: 1210534 },
  { name: "Miyagi", population: 2301996 },
  { name: "Akita", population: 959502 },
  { name: "Yamagata", population: 1068027 },
  { name: "Fukushima", population: 1833152 },
  { name: "Ibaraki", population: 2867009 },
  { name: "Tochigi", population: 1933146 },
  { name: "Gunma", population: 1939110 },
  { name: "Saitama", population: 7344765 },
  { name: "Chiba", population: 6284480 },
  { name: "Tokyo", population: 14047594 },
  { name: "Kanagawa", population: 9237337 },
  { name: "Niigata", population: 2201272 },
  { name: "Toyama", population: 1034814 },
  { name: "Ishikawa", population: 1132497 },
  { name: "Fukui", population: 766863 },
  { name: "Yamanashi", population: 809974 },
  { name: "Nagano", population: 2048011 },
  { name: "Gifu", population: 1978742 },
  { name: "Shizuoka", population: 3633202 },
  { name: "Aichi", population: 7542415 },
  { name: "Mie", population: 1770254 },
  { name: "Shiga", population: 1413610 },
  { name: "Kyoto", population: 2578087 },
  { name: "Osaka", population: 8837685 },
  { name: "Hyogo", population: 5465002 },
  { name: "Nara", population: 1324473 },
  { name: "Wakayama", population: 922584 },
  { name: "Tottori", population: 553407 },
  { name: "Shimane", population: 671126 },
  { name: "Okayama", population: 1888432 },
  { name: "Hiroshima", population: 2799702 },
  { name: "Yamaguchi", population: 1342059 },
  { name: "Tokushima", population: 719559 },
  { name: "Kagawa", population: 950244 },
  { name: "Ehime", population: 1334841 },
  { name: "Kochi", population: 691527 },
  { name: "Fukuoka", population: 5135214 },
  { name: "Saga", population: 811442 },
  { name: "Nagasaki", population: 1312317 },
  { name: "Kumamoto", population: 1738301 },
  { name: "Oita", population: 1123852 },
  { name: "Miyazaki", population: 1069576 },
  { name: "Kagoshima", population: 1588256 },
  { name: "Okinawa", population: 1467480 },
];

export const totalPopulation2020 = 126146099;
