/**
 * Class HijriDate
 *
 * This class provides function to convert gregorian date to Hijri date as per Dawoodi Bohra Calendar logic.
 *
 * @author    Hussain Jawadwala
 * @version   1.0
 * @since     2024-05-18
 * @link      https://www.zolute.consulting More info here
 */
class HijriDate {
    /**
     * Convert Gregorian date to Hijri date
     * @param {Date} date - JavaScript Date object
     * @returns {Array} Array containing [day, month, year] in Hijri calendar
     */
    static gregorianToHijri(date) {
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // JavaScript months are 0-indexed
        const year = date.getUTCFullYear();

        let m = month;
        let y = year;
        if (m < 3) {
            y -= 1;
            m += 12;
        }

        const a = Math.floor(y / 100.0);
        let b = 2 - a + Math.floor(a / 4.0);

        if (year < 1583) b = 0;
        if (year === 1582) {
            if (month > 10) b = -10;
            if (month === 10) {
                b = 0;
                if (day > 4) b = -10;
            }
        }

        const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;
        b = 0;
        if (jd > 2299160) {
            const a2 = Math.floor((jd - 1867216.25) / 36524.25);
            b = 1 + a2 - Math.floor(a2 / 4.0);
        }
        // Intermediate Julian to Gregorian conversion (preserved from original algorithm)
        const bb = jd + b + 1524;
        let cc = Math.floor((bb - 122.1) / 365.25);
        const dd = Math.floor(365.25 * cc);
        const ee = Math.floor((bb - dd) / 30.6001);
        const dayUnused = (bb - dd) - Math.floor(30.6001 * ee); // Preserved from original
        let monthUnused = ee - 1;
        if (ee > 13) {
            cc += 1;
            monthUnused = ee - 13;
        }
        const yearUnused = cc - 4716; // Preserved from original

        const wd = jd % 7; // Day of week (preserved from original)
        const iyear = 10631.0 / 30.0;
        const epochastro = 1948084;
        const epochcivil = 1948085; // Preserved from original algorithm

        const shift1 = 8.01 / 60.0;

        let z = jd - epochastro;
        const cyc = Math.floor(z / 10631.0);
        z = z - 10631 * cyc;
        const j = Math.floor((z - shift1) / iyear);
        const iy = 30 * cyc + j;
        z = z - Math.floor(j * iyear + shift1);
        let im = Math.floor((z + 28.5001) / 29.5);
        if (im === 13) im = 12;
        const id = z - Math.floor(29.5001 * im - 29);

        return [Math.floor(id), Math.floor(im), Math.floor(iy)];
    }

    /**
     * Get formatted Hijri date string
     * @param {string|Date} gregorianDate - Date string or Date object
     * @param {boolean} numMonth - If true, returns month as number; if false, returns month name
     * @param {string} separator - Separator to use between day, month, and year
     * @returns {string} Formatted Hijri date
     */
    static getHijriDate(gregorianDate, numMonth = false, separator = " ") {
        const date = (typeof gregorianDate === 'string') 
            ? new Date(gregorianDate) 
            : gregorianDate;

        const [hijriDay, hijriMonth, hijriYear] = this.gregorianToHijri(date);

        const months = [
            "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani", 
            "Jumada al-awwal", "Jumada al-thani", "Rajab", "Sha'ban", 
            "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
        ];
        const month = numMonth ? hijriMonth : months[hijriMonth - 1];

        return hijriDay + separator + month + separator + hijriYear;
    }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HijriDate;
}
