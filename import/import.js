import csvsync from 'csvsync';
import fs from 'fs';

// Read the CSV file synchronously
const csv = fs.readFileSync('Parking_regulations__except_non-metered_color_curb__20241218.csv', 'utf-8');

// Parse the CSV file content into an array of arrays
const data = csvsync.parse(csv);

console.log(data);
