const fs = require('fs');
const path = require('path');

const years = [];
for (let y = 2021; y <= 2033; y++) years.push(String(y));

const geographies = [
  "South Africa", "Ghana", "Mali", "Burkina Faso", "Tanzania",
  "Côte d'Ivoire", "Zimbabwe", "Democratic Republic of the Congo",
  "Guinea", "Sudan", "Russia", "Australia"
];

// Market size multipliers per country (relative scale)
const countryScale = {
  "South Africa": 1.0,
  "Ghana": 0.75,
  "Mali": 0.35,
  "Burkina Faso": 0.30,
  "Tanzania": 0.45,
  "Côte d'Ivoire": 0.38,
  "Zimbabwe": 0.28,
  "Democratic Republic of the Congo": 0.40,
  "Guinea": 0.22,
  "Sudan": 0.25,
  "Russia": 0.90,
  "Australia": 0.85
};

// Seeded pseudo-random (simple deterministic)
let seed = 42;
function rand() {
  seed = (seed * 16807 + 0) % 2147483647;
  return (seed - 1) / 2147483646;
}

function generateLeaf(baseValue, growthRate, isVolume) {
  const data = {};
  let val = baseValue * (0.85 + rand() * 0.30); // some randomness on base
  for (const year of years) {
    if (isVolume) {
      data[year] = Math.round(val);
    } else {
      data[year] = Math.round(val * 100) / 100;
    }
    // Annual growth with slight randomness
    const annualGrowth = growthRate * (0.7 + rand() * 0.6);
    val *= (1 + annualGrowth);
  }
  return data;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 2147483647 + 1;
}

function buildSegments(geo, scale, isVolume) {
  seed = hashCode(geo + (isVolume ? "vol" : "val"));

  // By Product Form
  const byProductForm = {
    "Caustic Soda Flakes": generateLeaf((isVolume ? 1400 : 15.0) * scale, 0.08, isVolume),
    "Caustic Soda Pearls": generateLeaf((isVolume ? 900 : 9.5) * scale, 0.07, isVolume)
  };

  // By Purity / Grade
  const byPurityGrade = {
    "Standard Industrial Grade": generateLeaf((isVolume ? 1100 : 11.5) * scale, 0.07, isVolume),
    "High Purity Grade": generateLeaf((isVolume ? 700 : 7.5) * scale, 0.08, isVolume),
    "Technical / Mining Grade": generateLeaf((isVolume ? 600 : 6.0) * scale, 0.09, isVolume)
  };

  // By Application
  const isNonAfrican = (geo === "Russia" || geo === "Australia");
  const goldScale = isNonAfrican ? 0.7 : 1.0;
  const waterScale = isNonAfrican ? 1.3 : 1.0;

  const byApplication = {
    "Gold Ore Processing": generateLeaf((isVolume ? 650 : 7.0) * scale * goldScale, 0.09, isVolume),
    "pH Control and Alkalinity Regulation": generateLeaf((isVolume ? 480 : 5.0) * scale, 0.07, isVolume),
    "Cyanide Leaching Support": generateLeaf((isVolume ? 420 : 4.5) * scale * goldScale, 0.08, isVolume),
    "Metal Recovery / Refining": generateLeaf((isVolume ? 350 : 3.8) * scale, 0.08, isVolume),
    "Water and Effluent Treatment": generateLeaf((isVolume ? 280 : 3.0) * scale * waterScale, 0.09, isVolume),
    "Other Mining-Related Applications": generateLeaf((isVolume ? 160 : 1.7) * scale, 0.06, isVolume)
  };

  // By End-Use Stage in Gold Mining
  const byEndUseStage = {
    "Ore Preparation and Processing": generateLeaf((isVolume ? 650 : 7.0) * scale, 0.08, isVolume),
    "Leaching and Recovery Circuits": generateLeaf((isVolume ? 800 : 8.5) * scale * goldScale, 0.09, isVolume),
    "Refining / Metallurgical Processing": generateLeaf((isVolume ? 500 : 5.5) * scale, 0.07, isVolume),
    "Water Treatment / Effluent Management": generateLeaf((isVolume ? 350 : 3.8) * scale * waterScale, 0.08, isVolume)
  };

  return {
    "By Product Form": byProductForm,
    "By Purity / Grade": byPurityGrade,
    "By Application": byApplication,
    "By End-Use Stage in Gold Mining": byEndUseStage
  };
}

function generateFile(isVolume) {
  const result = {};
  for (const geo of geographies) {
    const scale = countryScale[geo];
    result[geo] = buildSegments(geo, scale, isVolume);
  }
  return result;
}

// Add aggregated year data to parent nodes by summing children
function addParentAggregations(obj, depth) {
  if (depth === undefined) depth = 0;
  const keys = Object.keys(obj);
  if (keys.includes('2021')) {
    return obj;
  }
  const childYearSums = {};
  let hasChildWithYears = false;
  for (const key of keys) {
    const child = addParentAggregations(obj[key], depth + 1);
    obj[key] = child;
    const childKeys = Object.keys(child);
    if (childKeys.includes('2021')) {
      hasChildWithYears = true;
      for (const y of years) {
        if (child[y] !== undefined) {
          childYearSums[y] = (childYearSums[y] || 0) + child[y];
        }
      }
    }
  }
  if (hasChildWithYears) {
    for (const y of years) {
      if (childYearSums[y] !== undefined) {
        obj[y] = Math.round(childYearSums[y] * 100) / 100;
      }
    }
    obj['_aggregated'] = true;
    obj['_level'] = depth + 1;
  }
  return obj;
}

// Generate both files
const valueData = generateFile(false);
const volumeData = generateFile(true);

// Add parent aggregations
for (const geo of geographies) {
  for (const segType of Object.keys(valueData[geo])) {
    addParentAggregations(valueData[geo][segType]);
  }
  for (const segType of Object.keys(volumeData[geo])) {
    addParentAggregations(volumeData[geo][segType]);
  }
}

const outDir = path.join(__dirname, 'public', 'data');
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'value.json'), JSON.stringify(valueData, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'volume.json'), JSON.stringify(volumeData, null, 2), 'utf8');

console.log('Generated value.json and volume.json');

// Verification
function verify(data, label) {
  const geos = Object.keys(data);
  console.log(`\n${label}: ${geos.length} geographies`);
  if (geos.length !== 12) console.log('  ERROR: expected 12 geographies');

  for (const geo of geos) {
    const segments = data[geo];
    const segTypes = Object.keys(segments);
    if (segTypes.length !== 4) console.log(`  ERROR: ${geo} has ${segTypes.length} segment types, expected 4`);

    let leafCount = 0;
    function checkNode(node, path) {
      const keys = Object.keys(node);
      if (keys.includes('2021')) {
        leafCount++;
        for (const y of years) {
          if (!(y in node)) console.log(`  ERROR: ${path} missing year ${y}`);
        }
        if (node['2033'] <= node['2021']) console.log(`  WARNING: ${path} no growth trend`);
      } else {
        for (const k of keys) {
          checkNode(node[k], path + ' > ' + k);
        }
      }
    }
    for (const st of segTypes) {
      checkNode(segments[st], geo + ' > ' + st);
    }
    if (geo === geos[0]) console.log(`  ${geo}: ${leafCount} leaf segments`);
  }
}

verify(valueData, 'value.json');
verify(volumeData, 'volume.json');

// Show sample
console.log('\nSample - South Africa > By Product Form > Caustic Soda Flakes (value):');
console.log(JSON.stringify(valueData['South Africa']['By Product Form']['Caustic Soda Flakes'], null, 2));
console.log('\nSample - Guinea > By Application > Gold Ore Processing (volume):');
console.log(JSON.stringify(volumeData['Guinea']['By Application']['Gold Ore Processing'], null, 2));
