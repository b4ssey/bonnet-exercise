function getStartTime(schedules, duration) {
  let toMinutes = (s) => {
    s.split(":").reduce((h, m) => parseInt(h) * 60 + parseInt(m));
  };

  let toTime = (t) => {
    let h = Math.floor(t / 60);
    let m = t % 60;

    return `${h}:${m}`;
  };

  let sortedSchedules = schedules
    .reduce((p, n) => p.concat(n))
    .map((a) => [toMinutes(a[0]), toMinutes(a[1])])
    .sort((a, b) => a[0] - b[0]);

  let presentSchedule = sortedSchedules[0];
  for (let schedule of sortedSchedules) {
    let [_, presentScheduleEnd] = presentSchedule;
    let [futureScheduleStart, futureScheduleEnd] = schedule;
    if (presentScheduleEnd >= futureScheduleStart) {
      presentSchedule[1] = Math.max(presentScheduleEnd, futureScheduleEnd);
    } else {
      presentSchedule = schedule;
      if (presentScheduleEnd + duration <= futureScheduleStart)
        return toTime(presentScheduleEnd);
    }
  }
  return null;
}

getStartTime(
  [
    [
      ["09:00", "11:30"],
      ["13:30", "16:00"],
      ["16:00", "17:30"],
      ["17:45", "19:00"],
    ],
    [
      ["09:15", "12:00"],
      ["14:00", "16:30"],
      ["17:00", "17:30"],
    ],
    [
      ["11:30", "12:15"],
      ["15:00", "16:30"],
      ["17:45", "19:00"],
    ],
  ],
  30
);
