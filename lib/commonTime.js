const commonTime = (start1, end1, start2, end2) => {
    const [hour1, minute1] = start1.split(':');
    const [hour2, minute2] = end1.split(':');
    const [hour3, minute3] = start2.split(':');
    const [hour4, minute4] = end2.split(':');
    const date1 = new Date(0, 0, 0, hour1, minute1);
    const date2 = new Date(0, 0, 0, hour2, minute2);
    const date3 = new Date(0, 0, 0, hour3, minute3);
    const date4 = new Date(0, 0, 0, hour4, minute4);
    const maxStartTime = new Date(Math.max(date1, date3));
    const minEndTime = new Date(Math.min(date2, date4));
    if (maxStartTime >= minEndTime) {
      return null;
    }
    const startHour = maxStartTime.getHours();
    const startMinute = maxStartTime.getMinutes();
    const endHour = minEndTime.getHours();
    const endMinute = minEndTime.getMinutes();
    return `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}-${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  }

  export default commonTime;