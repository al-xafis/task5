import React, { useState } from "react";
import { Faker, en, ru, it } from "@faker-js/faker";

const times = (n, fn) => {
  if (n < 0) throw new Error("The first argument cannot be negative.");
  return (arg) => {
    for (let i = Math.floor(n); i--; ) arg = fn(arg);
    return Math.random() < n % 1 ? fn(arg) : arg;
  };
};

function swapNearChar(str) {
  if (str.length === 0) {
    return str;
  }
  //   let faker = new Faker({ locale: [en] });
  //   faker.seed(3);
  //   const randomIndex = Math.floor(
  //     faker.number.int({ min: 0, max: str.length - 1 })
  //   );
  const randomIndex = Math.floor(Math.random() * str.length);

  let offset;
  if (randomIndex == 0) {
    offset = 1;
  } else if (randomIndex == str.length) {
    offset = -1;
  } else {
    offset = -1;
  }
  const nearbyIndex = randomIndex + offset;
  const chars = str.split("");
  [chars[randomIndex], chars[nearbyIndex]] = [
    chars[nearbyIndex],
    chars[randomIndex],
  ];
  return chars.join("");
}

function removeRandomChar(str) {
  if (str.length === 0) {
    return str;
  }

  const randomIndex = Math.floor(Math.random() * str.length);

  const deletedStr = str.slice(0, randomIndex) + str.slice(randomIndex + 1);
  return deletedStr;
}

function addRandomChar(str) {
  if (str.length === 0) {
    return str;
  }
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomChar = alphabet.charAt(
    Math.floor(Math.random() * alphabet.length)
  );

  const randomIndex = Math.floor(Math.random() * (str.length + 1));

  const modifiedStr =
    str.slice(0, randomIndex) + randomChar + str.slice(randomIndex);

  return modifiedStr;
}

function randomizeFunc(...func) {
  let randomIndex = Math.floor(Math.random() * func.length);
  //   console.log(func[randomIndex]);
  return func[randomIndex];
}

let errorFunctions = [swapNearChar, removeRandomChar, addRandomChar];

// const scheherazade = times(2.5, (x) => randomizeFunc(...errorFunctions)(x))(
//   "Astalavista"
// );
// console.log(scheherazade);
// console.log(scheherazade("Astalavista"));
// times(1, () => console.log(scheherazade("mavrid")))();

let faker = new Faker({ locale: [en] });
let length = 3;
let data = [];
let seed = 0;
faker.seed(seed);

for (let i = 0; i < length; i++) {
  let address =
    faker.location.buildingNumber() +
    " " +
    faker.location.streetAddress() +
    " " +
    faker.location.city() +
    " " +
    faker.location.state();
  data.push({
    index: i + 1,
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    address: address,
    phone: faker.phone.number(),
  });
}

export default function (props) {
  const [error, setError] = useState(0);
  const [generatedData, setGeneratedData] = useState(data);
  const [region, setRegion] = useState("en");
  const [seed, setSeed] = useState(0);

  const listData = generatedData.map((data, index) => {
    return (
      <tr key={index}>
        <td>{data.index}</td>
        <td style={{ maxWidth: "220px" }}>{data.id}</td>
        <td>{data.name}</td>
        <td style={{ maxWidth: "350px" }}>{data.address}</td>
        <td>{data.phone}</td>
      </tr>
    );
  });

  function generateMore() {
    let oldLength = length;
    length += 2;
    const newData = [];
    faker.seed(seed);
    for (oldLength; oldLength < length; oldLength++) {
      newData.push({
        index: oldLength + 1,
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        address: faker.location.buildingNumber(),
        phone: faker.phone.number(),
      });
    }
    setGeneratedData([...generatedData, ...newData]);
  }

  function renewSeed(seedValue) {
    let newSeed = parseInt(seedValue) || 0;
    setSeed(newSeed);
    faker.seed(newSeed);
    console.log(seed);
    const newData = [];
    length = 0;
    for (let i = 0; i < 3; i++) {
      let address =
        faker.location.buildingNumber() +
        " " +
        faker.location.streetAddress() +
        " " +
        faker.location.city() +
        " " +
        faker.location.state();
      newData.push({
        index: i + 1,
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        address: address,
        phone: faker.phone.number(),
      });
    }
    setGeneratedData(newData);
  }

  function randomSeed() {
    let randomSeed = faker.number.int({ min: 0, max: 100000 });
    renewSeed(randomSeed);
  }

  function renewRegion(regionValue) {
    let newRegionValue;
    if (regionValue == "en") {
      newRegionValue = en;
    } else if (regionValue == "ru") {
      newRegionValue = ru;
    } else if ((regionValue = "it")) {
      newRegionValue = it;
    }
    setRegion(regionValue);
    faker = new Faker({ locale: [newRegionValue] });
    faker.seed(seed);
    const newData = [];
    length = 0;
    for (let i = 0; i < 3; i++) {
      let address =
        faker.location.buildingNumber() +
        " " +
        faker.location.streetAddress() +
        " " +
        faker.location.city() +
        " " +
        faker.location.state();
      newData.push({
        index: i + 1,
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        address: address,
        phone: faker.phone.number(),
      });
    }
    setGeneratedData(newData);
  }

  function renewError(errorValue) {
    let newError = parseFloat(errorValue) || 0;
    setError(newError);
    faker.seed(seed);

    // const newData = [];
    // length = 0;

    // for (let i = 0; i < 3; i++) {
    //   let address =
    //     faker.location.buildingNumber() +
    //     " " +
    //     faker.location.steetAddress() +
    //     " " +
    //     faker.location.city() +
    //     " " +
    //     faker.location.state();
    //   newData.push({
    //     index: i + 1,
    //     id: faker.string.uuid(),
    //     name: faker.person.fullName(),
    //     address: address,
    //     phone: faker.phone.number(),
    //   });
    // }
    // setGeneratedData(newData);

    // console.log(faker.person.fullName());

    // const newData = [];
    // length = 0;
    // for (let i = 0; i < 3; i++) {
    //   let address =
    //     faker.location.buildingNumber() +
    //     " " +
    //     faker.location.streetAddress() +
    //     " " +
    //     faker.location.city() +
    //     " " +
    //     faker.location.state();
    //   let name = times(newError, (x) => randomizeFunc(...errorFunctions)(x))(
    //     faker.person.fullName()
    //   );
    //   address = times(newError, (x) => randomizeFunc(...errorFunctions)(x))(
    //     address
    //   );
    //   let phone = times(newError, (x) => randomizeFunc(...errorFunctions)(x))(
    //     faker.phone.number()
    //   );
    //   newData.push({
    //     index: i + 1,
    //     id: faker.string.uuid(),
    //     name: name,
    //     address: address,
    //     phone: phone,
    //   });
    // }
    // setGeneratedData(newData);
  }

  return (
    <div>
      <div className="controllers d-flex gap-5 justify-content-between align-items-center mt-5">
        <div className="col">
          <label htmlFor="region" className="form-label">
            Region
          </label>
          <select
            className="form-select form-control"
            id="region"
            value={region}
            onChange={(e) => renewRegion(e.target.value)}
          >
            <option value="en">USA</option>
            <option value="ru">Russia</option>
            <option value="it">Italy</option>
          </select>
        </div>

        {/* <div className="col ">
          <label htmlFor="error-range" className="form-label">
            Error range
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="10"
            step="0.5"
            id="error-range"
            value={error}
            onChange={(e) => renewError(e.target.value)}
          />
        </div> */}

        <div className="col align-self-end">
          <input
            type="text"
            className="form-control"
            id="error-input"
            value={error}
            onChange={(e) => renewError(e.target.value)}
          />
        </div>

        <div className="col">
          <label htmlFor="seed" className="form-label">
            Seed
          </label>
          <input
            type="text"
            className="form-control"
            id="seed"
            placeholder="Enter seed"
            value={seed}
            onChange={(e) => renewSeed(e.target.value)}
          />
        </div>

        <div className="col align-self-end">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={randomSeed}
          >
            Random
          </button>
        </div>

        <div className="col align-self-end">
          <button type="button" className="btn btn-primary">
            Export to CSV
          </button>
        </div>
      </div>
      <button onClick={generateMore}>More</button>
      <div className="table_data">
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Random Id</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {listData}
            {/* {% for user in generatedData %}
                <tr data-num={{user.index}} >
                    <th>{{ user.index }}</th>
                    <th style="max-width: 220px;">{{ user.id }}</th>
                    <td>{{ user.name }}</td>
                    <td style="max-width: 350px;">{{ user.address }}</td>
                    <td>{{ user.phone }}</td>
                </tr>
            {% endfor %} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
