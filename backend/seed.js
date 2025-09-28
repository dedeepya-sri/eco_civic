const mongoose = require("mongoose");
const Topic = require("./models/Topic");

mongoose.connect("mongodb://localhost:27017/ecocivic", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const topics = [
  {
    title: "Waste Segregation",
    youtube_links: [
      "https://www.youtube.com/watch?v=0ZiD_Lb3Tm0",
      "https://www.youtube.com/watch?v=M7hI3sjyw8M"
    ],
    article_link: "https://businesswaste.com/news/waste-segregation/",
    quiz: [
      { question: "What is the primary benefit of waste segregation?", options: ["Reduces landfill waste","Increases energy consumption","Decreases recycling rates","None of the above"], answer: "Reduces landfill waste" },
      { question: "Which of the following is considered dry waste?", options: ["Food scraps","Plastic bottles","Garden waste","All of the above"], answer: "Plastic bottles" },
      { question: "Wet waste primarily consists of:", options: ["Paper","Food waste","Glass","Metal"], answer: "Food waste" },
      { question: "Which color bin is typically used for dry waste?", options: ["Green","Blue","Red","Yellow"], answer: "Blue" },
      { question: "Why is segregation at source important?", options: ["It reduces recycling costs","It makes waste management more efficient","It increases landfill space","None of the above"], answer: "It makes waste management more efficient" }
    ]
  },
  {
    title: "Rainwater Harvesting",
    youtube_links: [
      "https://www.youtube.com/watch?v=S7fbQNn5mUU",
      "https://www.youtube.com/watch?v=-NJ8aS4_WDA"
    ],
    article_link: "https://www.downtoearth.org.in/news/water/rainwater-harvesting-in-india-what-you-need-to-know-72616",
    quiz: [
      { question: "What is the primary purpose of rainwater harvesting?", options: ["To increase groundwater levels","To reduce stormwater runoff","To provide an alternative water source","All of the above"], answer: "All of the above" },
      { question: "Which of the following is NOT a method of rainwater harvesting?", options: ["Rooftop harvesting","Surface runoff collection","Desalination","Groundwater recharge"], answer: "Desalination" },
      { question: "What is the first step in setting up a rainwater harvesting system?", options: ["Installing a filtration system","Collecting rainwater","Identifying a catchment area","Building a storage tank"], answer: "Identifying a catchment area" },
      { question: "Which of these is a benefit of rainwater harvesting?", options: ["Reduces water bills","Provides water for irrigation","Decreases dependency on municipal water","All of the above"], answer: "All of the above" },
      { question: "What is typically used to filter rainwater before storage?", options: ["Sand","Charcoal","Mesh screens","All of the above"], answer: "All of the above" }
    ]
  },
  {
    title: "Composting",
    youtube_links: [
      "https://www.youtube.com/watch?v=nxTzuasQLFo",
      "https://www.youtube.com/watch?v=PA-b1rQ42vU"
    ],
    article_link: "https://www.thebetterindia.com/24512/composting-guide-sustainable-waste-management/",
    quiz: [
      { question: "Which of these materials can be composted?", options: ["Vegetable peels","Plastic wrappers","Glass bottles","Metal cans"], answer: "Vegetable peels" },
      { question: "What is the main benefit of composting?", options: ["Reduces landfill waste","Produces nutrient-rich soil","Decreases greenhouse gas emissions","All of the above"], answer: "All of the above" },
      { question: "Which of the following is a green material in composting?", options: ["Dry leaves","Food scraps","Cardboard","Eggshells"], answer: "Food scraps" },
      { question: "What should be avoided in a compost pile?", options: ["Dairy products","Fruit peels","Grass clippings","Coffee grounds"], answer: "Dairy products" },
      { question: "How often should a compost pile be turned?", options: ["Daily","Weekly","Monthly","Never"], answer: "Weekly" }
    ]
  },
  {
    title: "Energy Conservation",
    youtube_links: [
      "https://www.youtube.com/watch?v=pY6fAYkscTY",
      "https://www.youtube.com/watch?v=Qyu-fZ8BOnI"
    ],
    article_link: "https://www.energy.gov/energysaver/energy-saver",
    quiz: [
      { question: "Which of these is an energy-saving appliance?", options: ["LED bulbs","Incandescent bulbs","CRT televisions","Electric heaters"], answer: "LED bulbs" },
      { question: "What is the most energy-efficient way to heat water?", options: ["Electric geyser","Solar water heater","Gas stove","Microwave"], answer: "Solar water heater" },
      { question: "Unplugging devices when not in use helps to:", options: ["Increase energy consumption","Save energy","Damage the device","None of the above"], answer: "Save energy" },
      { question: "Which of these actions can reduce energy consumption?", options: ["Using natural light during the day","Leaving devices on standby","Using old appliances","All of the above"], answer: "Using natural light during the day" },
      { question: "What is a smart thermostat used for?", options: ["Cooking food","Regulating home temperature efficiently","Playing music","Lighting control"], answer: "Regulating home temperature efficiently" }
    ]
  },
  {
    title: "Plastic Pollution",
    youtube_links: [
      "https://www.youtube.com/watch?v=IA9O9YUbQew",
      "https://www.youtube.com/watch?v=MAoBi9bK7c8"
    ],
    article_link: "https://www.nationalgeographic.com/environment/article/plastic-pollution",
    quiz: [
      { question: "Which of these is a major source of plastic pollution?", options: ["Single-use plastic bottles","Biodegradable packaging","Glass containers","None of the above"], answer: "Single-use plastic bottles" },
      { question: "What is microplastic?", options: ["Large plastic items","Tiny plastic particles","Plastic bags","None of the above"], answer: "Tiny plastic particles" },
      { question: "Which of these is a biodegradable alternative to plastic?", options: ["Paper bags","Styrofoam containers","Plastic straws","None of the above"], answer: "Paper bags" },
      { question: "How long can plastic take to decompose?", options: ["1-5 years","10-20 years","100-1000 years","Never"], answer: "100-1000 years" },
      { question: "Which of these actions can help reduce plastic pollution?", options: ["Using reusable bags","Recycling plastic","Avoiding single-use plastics","All of the above"], answer: "All of the above" }
    ]
  },
  {
    title: "Water Conservation",
    youtube_links: [
      "https://www.youtube.com/watch?v=8J0jJ2Z9Q2k",
      "https://www.youtube.com/watch?v=9J0jJ2Z9Q2k"
    ],
    article_link: "https://www.water.org/our-impact/water-crisis/water-conservation/",
    quiz: [
      { question: "Which of these is a water-saving device?", options: ["Low-flow showerhead","Leaky faucets","Running taps continuously","None of the above"], answer: "Low-flow showerhead" },
      { question: "What is the first step in reducing water wastage?", options: ["Fixing leaks","Using more water","Ignoring water bills","None of the above"], answer: "Fixing leaks" },
      { question: "Which of these actions can conserve water?", options: ["Taking shorter showers","Watering plants during the day","Leaving taps running","All of the above"], answer: "Taking shorter showers" },
      { question: "How can rainwater harvesting help in water conservation?", options: ["By reducing groundwater levels","By providing an alternative water source","By increasing water bills","None of the above"], answer: "By providing an alternative water source" },
      { question: "Which of these is a water-efficient irrigation method?", options: ["Drip irrigation","Flood irrigation","Sprinkler irrigation","None of the above"], answer: "Drip irrigation" }
    ]
  },
  {
    title: "Air Pollution",
    youtube_links: [
      "https://www.youtube.com/watch?v=t_L5ICllMB0",
      "https://www.youtube.com/watch?v=N6t6QHQtdVw"
    ],
    article_link: "https://byjus.com/biology/air-pollution-control/",
    quiz: [
      { question: "What is a primary source of air pollution in urban areas?", options: ["Industrial emissions","Agricultural activities","Forest fires","Ocean evaporation"], answer: "Industrial emissions" },
      { question: "Which of the following is a health effect of air pollution?", options: ["Improved lung function","Respiratory diseases","Enhanced immunity","None of the above"], answer: "Respiratory diseases" },
      { question: "What is smog?", options: ["A type of cloud","A mixture of smoke and fog","A kind of tree","A type of bird"], answer: "A mixture of smoke and fog" },
      { question: "Which gas is a major contributor to global warming?", options: ["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"], answer: "Carbon dioxide" },
      { question: "What is a common method to reduce air pollution?", options: ["Planting more trees","Increasing vehicle emissions","Burning more fossil fuels","Reducing green spaces"], answer: "Planting more trees" }
    ]
  },
  {
    title: "Soil Conservation",
    youtube_links: [
      "https://www.youtube.com/watch?v=uo_ntewAemw",
      "https://www.youtube.com/watch?v=e8Q4BgyDEyo"
    ],
    article_link: "https://byjus.com/free-ias-prep/soil-conservation/",
    quiz: [
      { question: "What is the primary cause of soil erosion?", options: ["Overgrazing","Deforestation","Water runoff","All of the above"], answer: "All of the above" },
      { question: "Which practice helps in soil conservation?", options: ["Afforestation","Overgrazing","Deforestation","None of the above"], answer: "Afforestation" },
      { question: "What is terracing?", options: ["Planting trees in rows","Creating steps on slopes to prevent erosion","Using chemical fertilizers","None of the above"], answer: "Creating steps on slopes to prevent erosion" },
      { question: "Which of these is a method of soil conservation?", options: ["Crop rotation","Overuse of pesticides","Deforestation","None of the above"], answer: "Crop rotation" },
      { question: "What is the effect of soil erosion on agriculture?", options: ["Increased crop yield","Decreased soil fertility","Improved water retention","None of the above"], answer: "Decreased soil fertility" }
    ]
  },
  {
    title: "Biodiversity Conservation",
    youtube_links: [
      "https://www.youtube.com/watch?v=dc7-NtSfXCQ",
      "https://www.youtube.com/watch?v=lf9tNPRfWMc"
    ],
    article_link: "https://byjus.com/biology/biodiversity-conservation/",
    quiz: [
      { question: "What is biodiversity?", options: ["Variety of life forms in an area","Variety of rocks in an area","Variety of water bodies in an area","None of the above"], answer: "Variety of life forms in an area" },
      { question: "Why is biodiversity important?", options: ["It ensures ecosystem stability","It provides food and medicine","It supports economic activities","All of the above"], answer: "All of the above" },
      { question: "What is an endangered species?", options: ["A species with many individuals","A species at risk of extinction","A species that is abundant","None of the above"], answer: "A species at risk of extinction" },
      { question: "Which of these is a threat to biodiversity?", options: ["Habitat destruction","Pollution","Overexploitation","All of the above"], answer: "All of the above" },
      { question: "What is in-situ conservation?", options: ["Conservation outside the natural habitat","Conservation within the natural habitat","Conservation in zoos","None of the above"], answer: "Conservation within the natural habitat" }
    ]
  },
  {
    title: "Climate Change Awareness",
    youtube_links: [
      "https://www.youtube.com/watch?v=N6t6QHQtdVw",
      "https://www.youtube.com/watch?v=9J0jJ2Z9Q2k"
    ],
    article_link: "https://education-profiles.org/central-and-southern-asia/india/~climate-change-communication-and-education",
    quiz: [
      { question: "What is climate change?", options: ["Short-term weather changes","Long-term changes in temperature and weather patterns","Seasonal variations","None of the above"], answer: "Long-term changes in temperature and weather patterns" },
      { question: "Which gas is a major contributor to climate change?", options: ["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"], answer: "Carbon dioxide" },
      { question: "What is the greenhouse effect?", options: ["Cooling of the Earth's surface","Warming of the Earth's surface due to trapped gases","Depletion of the ozone layer","None of the above"], answer: "Warming of the Earth's surface due to trapped gases" },
      { question: "Which of these actions can help mitigate climate change?", options: ["Reducing fossil fuel use","Deforestation","Increasing industrial emissions","None of the above"], answer: "Reducing fossil fuel use" },
      { question: "What is renewable energy?", options: ["Energy from non-renewable sources","Energy from sources that can be replenished naturally","Energy from fossil fuels","None of the above"], answer: "Energy from sources that can be replenished naturally" }
    ]
  }
];

async function seedDB() {
  await Topic.deleteMany({});
  await Topic.insertMany(topics);
  console.log("Database seeded!");
  mongoose.connection.close();
}

seedDB();
