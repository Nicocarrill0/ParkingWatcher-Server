import csvsync from 'csvsync';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});
await prisma.$connect();

// Read the CSV file synchronously
const csv = fs.readFileSync('Parking_regulations__except_non-metered_color_curb__20241218.csv', 'utf-8');

// Parse the CSV file content into an array of arrays
const data = csvsync.parse(csv);

function parseCenter (shape) {
  if (!shape || !shape.includes('MULTILINESTRING')) {
    return { latitude: 0, longitude: 0 };
  }

  const matches = shape.match(/\(\((.*?)\)\)/);
  if (!matches || !matches[1]) {
    return { latitude: 0, longitude: 0 };
  }

  const coords = matches[1]
    .trim()
    .split(',') // splitting both points of line, or lines
    .map(coord => { // iterate through coordinates
      const parts = coord.trim().split(/\s+/);
      if (parts.length < 2) return null;
      const lon = parseFloat(parts[0]);
      const lat = parseFloat(parts[1]);
      return isNaN(lat) || isNaN(lon) ? null : { lat, lon };
    })
    .filter(Boolean);

  if (coords.length < 2) {
    return { latitude: 0, longitude: 0 };
  }

  const first = coords[0]; // fist n last coordinates
  const last = coords[coords.length - 1];

  return {
    latitude: (first.lat + last.lat) / 2,
    longitude: (first.lon + last.lon) / 2
  };
}

for (let i = 1; i < data.length; ++i) {
  const row = data[i];
  const id = row[0];
  const neighborhood = row[37];
  const days = row[3];
  const startTime = row[5];
  const endTime = row[6];
  const durationLimit = row[21];
  const shape = row[35];

  const { latitude, longitude } = parseCenter(shape);

  const upsertStreet = await prisma.street.upsert({
    where: { id },
    update: { neighborhood, days, startTime, endTime, durationLimit, shape, latitude, longitude },
    create: { id, neighborhood, days, startTime, endTime, durationLimit, shape, latitude, longitude }
  });

  console.log(upsertStreet);
}
