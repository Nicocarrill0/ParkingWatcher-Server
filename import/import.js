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

for (let i = 1; data.length > i; ++i) {
  const row = data[i];
  console.log(row);
  const id = row[0];
  const neighborhood = row[37];
  const days = row[3];
  const startTime = row[5];
  const endTime = row[6];
  const durationLimit = row[21];
  const shape = row[35];
  const latitude = 0;
  const longitude = 0;

  const upsertStreet = await prisma.street.upsert({
    where: {
      id
    },
    update: {
      neighborhood,
      days,
      startTime,
      endTime,
      durationLimit,
      shape,
      latitude,
      longitude,
    },
    create: {
      id,
      neighborhood,
      days,
      startTime,
      endTime,
      durationLimit,
      shape,
      latitude,
      longitude,
    }

  });
  console.log(upsertStreet);
}

console.log(data);
