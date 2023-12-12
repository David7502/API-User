let userData = [];

const fetchUser = async () => {
  await fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((data) => (userData = data.results));
  console.log(userData);
};

const userDisplay = async () => {
  await fetchUser();

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  const dayCalc = (date) => {
    let today = new Date();
    let todayTimestamp = Date.parse(today);
    let timestamp = Date.parse(date);

    return Math.ceil((todayTimestamp - timestamp) / 8.64e7); //gives a timestamp in days
  };

  document.body.innerHTML = userData
    .map(
      (user) =>
        `
      <div class="card">
        <img src=${user.picture.large} alt="image of ${user.name.last}">
        <h3>${user.name.first} ${user.name.last}</h3>
        <p>${user.location.city}, ${dateParser(user.dob.date)}</p>
        <em>Membre since : ${dayCalc(user.registered.date)} days</em>
      </div>
        `
    )
    .join("");
};

userDisplay();
