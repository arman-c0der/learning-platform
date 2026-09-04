export const formatMyDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "N/A";
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(parsedDate);
};

 export const formatDuration = (duration) => {
    if (!duration) return null;

    var hour = Math.floor(duration / 3600);
    var min = Math.floor(duration % 3600 / 60);
    var sec = Math.floor(duration % 3600 % 60);

    const durationString = `${hour}:${min}:${sec}`;

  

    return durationString;
  }