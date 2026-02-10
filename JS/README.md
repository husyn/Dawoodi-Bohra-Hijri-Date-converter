# JavaScript Implementation

This is the JavaScript implementation of the Dawoodi Bohra Hijri Date Converter.

## Usage

### Node.js

```javascript
const HijriDate = require('./HijriDate');

// Get Hijri date with month name
console.log(HijriDate.getHijriDate('2024-05-21'));
// Output: 14 Dhu al-Qi'dah 1445

// Get Hijri date with numeric month
console.log(HijriDate.getHijriDate('2024-05-21', true));
// Output: 14 11 1445

// Get Hijri date with custom separator
console.log(HijriDate.getHijriDate('2024-05-21', false, '-'));
// Output: 14-Dhu al-Qi'dah-1445
```

### Browser

```html
<script src="HijriDate.js"></script>
<script>
  console.log(HijriDate.getHijriDate('2024-05-21'));
</script>
```

## Running the Example

```bash
node example.js
```

## API

### `HijriDate.gregorianToHijri(date)`

Converts a Gregorian date to Hijri date.

- **Parameters:**
  - `date` (Date): JavaScript Date object
- **Returns:** Array `[day, month, year]` in Hijri calendar

### `HijriDate.getHijriDate(gregorianDate, numMonth, separator)`

Returns a formatted Hijri date string.

- **Parameters:**
  - `gregorianDate` (string|Date): Date string (YYYY-MM-DD) or Date object
  - `numMonth` (boolean, optional): If true, returns month as number. Default: false
  - `separator` (string, optional): Separator between day, month, and year. Default: " "
- **Returns:** Formatted Hijri date string
