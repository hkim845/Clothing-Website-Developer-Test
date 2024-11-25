export function getMinutesDifference(isoTime1, isoTime2) {
    const date1 = new Date(isoTime1);
    const date2 = new Date(isoTime2);
  
    const differenceInMilliseconds = Math.abs(date2 - date1);
  
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
  
    return differenceInMinutes;
  }
  