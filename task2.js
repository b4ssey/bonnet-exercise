function getStartTime(schedules, duration) {
  let toMinutes = (s) => {
    return s.split(":").reduce((h, m) => parseInt(h) * 60 + parseInt(m));
  };

  let pad = (num) => {
    let s = num.toString();
    if (s.length == 1) s = "0" + s;
    return s;
  };

  let toTime = (t) => {
    return `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
  };

  let sortedSchedules = schedules
    .reduce((p, n) => p.concat(n))
    .map((a) => [toMinutes(a[0]), toMinutes(a[1])])
    .sort((a, b) => a[0] - b[0]);

  let presentSchedule = sortedSchedules[0];
  let rry = [];
  let startDate = toMinutes("09:00");
  let endDate = toMinutes("19:00");

  rry.push(presentSchedule);

  if (duration + startDate <= presentSchedule[0]) return toTime(startDate);
  for (let i = 0; i < sortedSchedules.length; i++) {
    let [_, presentScheduleEnd] = presentSchedule;
    let [futureScheduleStart, futureScheduleEnd] = sortedSchedules[i];
    if (presentScheduleEnd >= futureScheduleStart) {
      presentSchedule[1] = Math.max(presentScheduleEnd, futureScheduleEnd);
    } else {
      presentSchedule = sortedSchedules[i];
      rry.push(presentSchedule);
    }
  }
  for (let y = 0; y < rry.length - 1; y++) {
    if (rry[y][1] + duration <= rry[y + 1][0]) return toTime(rry[y][1]);
  }
  if (duration + rry[rry.length - 1][1] <= endDate)
    return toTime(rry[rry.length - 1][1]);

  return null;
}
