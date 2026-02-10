# Python Implementation

This is the Python implementation of the Dawoodi Bohra Hijri Date Converter.

## Usage

```python
from HijriDate import HijriDate

# Get Hijri date with month name
print(HijriDate.get_hijri_date('2024-05-21'))
# Output: 14 Dhu al-Qi'dah 1445

# Get Hijri date with numeric month
print(HijriDate.get_hijri_date('2024-05-21', num_month=True))
# Output: 14 11 1445

# Get Hijri date with custom separator
print(HijriDate.get_hijri_date('2024-05-21', separator='-'))
# Output: 14-Dhu al-Qi'dah-1445

# You can also pass a datetime object
from datetime import datetime
date_obj = datetime(2024, 5, 21)
print(HijriDate.get_hijri_date(date_obj))
# Output: 14 Dhu al-Qi'dah 1445
```

## Running the Example

```bash
python3 example.py
```

## API

### `HijriDate.gregorian_to_hijri(date)`

Converts a Gregorian date to Hijri date.

- **Parameters:**
  - `date` (datetime): Python datetime object
- **Returns:** Tuple `(day, month, year)` in Hijri calendar

### `HijriDate.get_hijri_date(gregorian_date, num_month, separator)`

Returns a formatted Hijri date string.

- **Parameters:**
  - `gregorian_date` (str|datetime): Date string (YYYY-MM-DD) or datetime object
  - `num_month` (bool, optional): If True, returns month as number. Default: False
  - `separator` (str, optional): Separator between day, month, and year. Default: " "
- **Returns:** Formatted Hijri date string

## Requirements

- Python 3.x
- No external dependencies (uses only standard library)
