"""
Class HijriDate

This class provides function to convert gregorian date to Hijri date as per Dawoodi Bohra Calendar logic.

@author    Hussain Jawadwala
@version   1.0
@since     2024-05-18
@link      https://www.zolute.consulting More info here
"""

from datetime import datetime
import math


class HijriDate:
    """
    A class to convert Gregorian dates to Hijri dates according to Dawoodi Bohra Calendar logic.
    """

    @staticmethod
    def gregorian_to_hijri(date):
        """
        Convert Gregorian date to Hijri date
        
        Args:
            date (datetime): Python datetime object
            
        Returns:
            tuple: Tuple containing (day, month, year) in Hijri calendar
        """
        day = date.day
        month = date.month
        year = date.year

        m = month
        y = year
        if m < 3:
            y -= 1
            m += 12

        a = math.floor(y / 100.0)
        b = 2 - a + math.floor(a / 4.0)

        if year < 1583:
            b = 0
        if year == 1582:
            if month > 10:
                b = -10
            if month == 10:
                b = 0
                if day > 4:
                    b = -10

        jd = math.floor(365.25 * (y + 4716)) + math.floor(30.6001 * (m + 1)) + day + b - 1524
        b = 0
        if jd > 2299160:
            a = math.floor((jd - 1867216.25) / 36524.25)
            b = 1 + a - math.floor(a / 4.0)
        
        # Intermediate Julian to Gregorian conversion (preserved from original algorithm)
        bb = jd + b + 1524
        cc = math.floor((bb - 122.1) / 365.25)
        dd = math.floor(365.25 * cc)
        ee = math.floor((bb - dd) / 30.6001)
        day = (bb - dd) - math.floor(30.6001 * ee)
        month = ee - 1
        if ee > 13:
            cc += 1
            month = ee - 13
        year = cc - 4716

        wd = jd % 7  # Day of week (preserved from original)
        iyear = 10631.0 / 30.0
        epochastro = 1948084
        epochcivil = 1948085  # Preserved from original algorithm

        shift1 = 8.01 / 60.0

        z = jd - epochastro
        cyc = math.floor(z / 10631.0)
        z = z - 10631 * cyc
        j = math.floor((z - shift1) / iyear)
        iy = 30 * cyc + j
        z = z - math.floor(j * iyear + shift1)
        im = math.floor((z + 28.5001) / 29.5)
        if im == 13:
            im = 12
        id_val = z - math.floor(29.5001 * im - 29)

        return (int(id_val), int(im), int(iy))

    @staticmethod
    def get_hijri_date(gregorian_date, num_month=False, separator=" "):
        """
        Get formatted Hijri date string
        
        Args:
            gregorian_date (str or datetime): Date string or datetime object
            num_month (bool): If True, returns month as number; if False, returns month name
            separator (str): Separator to use between day, month, and year
            
        Returns:
            str: Formatted Hijri date
        """
        if isinstance(gregorian_date, str):
            date = datetime.strptime(gregorian_date, '%Y-%m-%d')
        else:
            date = gregorian_date

        hijri_day, hijri_month, hijri_year = HijriDate.gregorian_to_hijri(date)

        months = [
            "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
            "Jumada al-awwal", "Jumada al-thani", "Rajab", "Sha'ban",
            "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
        ]
        month = hijri_month if num_month else months[hijri_month - 1]

        return f"{hijri_day}{separator}{month}{separator}{hijri_year}"
