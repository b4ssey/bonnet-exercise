function getStartTime(schedules, duration) {
  let toMinutes = (s) => {
    return s.split(":").reduce((h, m) => parseInt(h) * 60 + parseInt(m));
  };
  function pad(num) {
    var s = num.toString();
    if (s.length == 1) {
      s = "0" + s;
    }
    return s;
  }
  let sortedSchedules = schedules
    .reduce((p, n) => p.concat(n))
    .map((a) => [toMinutes(a[0]), toMinutes(a[1])])
    .sort((a, b) => a[0] - b[0]);

  let presentSchedule = sortedSchedules[0];
  let rry = [];
  rry.push(presentSchedule);
  if (duration + 540 <= presentSchedule[0])
    return pad(Math.floor(540 / 60)) + ":" + pad(540 % 60);
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
    if (rry[y][1] + duration <= rry[y + 1][0]) {
      return pad(Math.floor(rry[y][1] / 60)) + ":" + pad(rry[y][1] % 60);
    }
  }
  if (duration + rry[rry.length - 1][1] <= 1140)
    return (
      pad(Math.floor(rry[rry.length - 1][1] / 60)) +
      ":" +
      pad(rry[rry.length - 1][1] % 60)
    );

  return null;
}
