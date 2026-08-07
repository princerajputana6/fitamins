// Curated stock imagery (Unsplash) — every ID below was visually vetted for
// subject + confirmed to load. <Img /> still falls back to picsum if one ever 404s.
const U = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const IMG = {
  heroAthlete: U("1571019613454-1cb2f99b2d8b", 1600), // core workout
  gym: U("1517836357463-d25dfeac3438", 1400), // barbell / gym floor
  lift: U("1581009146145-b5ef050c2e1e", 1200), // dumbbell curl
  powder: U("1593095948071-474c5cc2989d", 1000), // protein powder + scoop
  capsules: U("1587854692152-cbe660dbde88", 1000), // vibrant orange capsules
  softgels: U("1512069772995-ec65ed45afd6", 1000), // clean supplement softgels
  lab: U("1532187863486-abf9dbad1b69", 1200), // pipette / QA lab
  flasks: U("1554475900-0a0350e3fc7b", 1000), // colorful science flasks
  smoothie: U("1490645935967-10de6ba17061", 1000), // healthy bowl
  saladBowl: U("1512621776951-a57141f2eefd", 1000), // nutrition bowl
  manufacturing: U("1581092160607-ee22621dd758", 1200), // facility / QA team
  warehouse: U("1586528116311-ad8dd3c8310d", 1200), // fulfillment / logistics
  fitWoman: U("1594381898411-846e7d193883", 1000), // athlete, results
  runningStairs: U("1476480862126-209bfaa8edc8", 1400),
  runningTrack: U("1502904550040-7534597429ae", 1400), // aerial track = momentum
  yoga: U("1544367567-0f2fcb009e0b", 1000), // wellness silhouette
  cardLaptop: U("1563013544-824ae1b704d3", 1000), // ecommerce / payment
  openShop: U("1472851294608-062f824d29cc", 1000), // storefront open
  mentor: U("1560250097-0b93528c311a", 900), // portrait
  team: U("1522071820081-009f0129c71c", 1200), // team working
  teamHigh: U("1600880292203-757bb62b4baf", 1200), // celebrate / scale
};

// Per-division hero image for the capabilities slider.
export const DIVISION_IMG = {
  identity: IMG.softgels,
  brand: IMG.cardLaptop,
  manufacturing: IMG.manufacturing,
  compliance: IMG.lab,
  operations: IMG.warehouse,
  marketplace: IMG.openShop,
  marketing: IMG.runningTrack,
  mentorship: IMG.mentor,
};

// Ordered imagery for the pinned process rail (matches the 8 stages).
export const PROCESS_IMG = [
  IMG.yoga, // 01 Brand discovery
  IMG.powder, // 02 Product development
  IMG.capsules, // 03 Design & packaging
  IMG.manufacturing, // 04 Manufacturing
  IMG.lab, // 05 Testing & certifications
  IMG.cardLaptop, // 06 Website & marketplace launch
  IMG.runningTrack, // 07 Marketing & sales
  IMG.teamHigh, // 08 Scale your brand
];
