export const birthdayConvert = (birthday) => {
  let arr = birthday.split("-");
  const [year, month, day] = arr;
  let result = `${day}-${month}-${year}`;
  return result;
};

export const ageCalculate = (str) => {
  if (str !== "" && str !== undefined) {
    let converted = str.split("-");

    const [day, month, year] = converted;

    const yearPresent = new Date().getFullYear();

    let age = yearPresent - year;

    return age;
  }
  if (str === undefined) {
    return "not shared";
  } else {
    return;
  }
};

export const compareArray = (first, second) => {
  if (first.length !== second.length) {
    return false;
  } else {
    for (let i = 0; i < first.length; i++) {
      return first[i] !== second[i] ? false : true;
    }
  }
  return true;
};

export const convertToArray = (str) => {
  return str.split(",");
};

export const validateState = (obj) => {
  let values = Object.values(obj);
  let valid = values.some((elm) => {
    return elm === "";
  });
  console.log(valid);
  if (valid) {
    return false;
  } else {
    return true;
  }
};

export const defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/agora-event-platform.appspot.com/o/userPlaceHolder.png?alt=media&token=9b6cc96e-a380-4d30-9060-72cc0294ce89";

export const checkValidity = (elm) => {
  let valid = true;

  if (elm === "" || elm === undefined) {
    return (valid = false);
  } else {
    return valid;
  }
};

export const renderUtil = (piece, label) => {
  if (checkValidity(piece)) {
    return `${label}: ${piece}`;
  } else {
    return null;
  }
};

export const checkValidityArray = (arr) => {
  let valid = true;
  if (arr === undefined || arr === []) {
    return (valid = false);
  } else {
    return valid;
  }
};

export const checkArchived = (event) => {
  const today = new Date();
  const parseToday = Date.parse(today);
  const eventDate = event.date.split("-");
  const [year, month, day] = eventDate;
  const eventDateFormated = new Date(year, month - 1, day);
  const parseEventDate = Date.parse(eventDateFormated);
  let result;
  if (parseToday > parseEventDate) {
    result = true;
  } else {
    result = false;
  }
  return result;
};

export const dateConvert = (seconds) => {
  const converted = new Date(seconds);

  return converted.toLocaleDateString();
};

export const randomEvent = (events) => {
  let size = events.length;
  let randomIndex = [];
  let eventList = [];
  for (var i = 0; i < 3; i++) {
    randomIndex.push(Math.floor(Math.random() * size + 1));
    eventList.push(events[randomIndex[i]]);
  }

  return eventList;
};

export const filterEvents = (size, result, queryList) => {
  switch (size) {
    case 2:
      return result.filter((e) => {
        return e[queryList[1].argument] === queryList[1].content;
      });

    case 3:
      let firstLevel = result.filter((e) => {
        return e[queryList[1].argument] === queryList[1].content;
      });
      return firstLevel.filter((e) => {
        return e[queryList[2].argument] === queryList[2].content;
      });
    default:
      break;
  }
};
