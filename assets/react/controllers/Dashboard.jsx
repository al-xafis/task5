import React, { useState } from "react";
import { Faker, en, ru, it } from "@faker-js/faker";
import { exportTable } from "../utils/csv";

let alphabet = "abcdefghijklmnopqrstuvwxyz";

let errFaker = new Faker({ locale: [en] });
errFaker.seed(0);

const times = (n, fn) => {
  if (n < 0) throw new Error("The first argument cannot be negative.");
  return (arg) => {
    for (let i = Math.floor(n); i--; ) arg = fn(arg);
    return errFaker.number.float() < n % 1 ? fn(arg) : arg;
  };
};

function swapNearChar(str) {
  if (str.length === 0) {
    return str;
  }

  const randomIndex = Math.floor(
    errFaker.number.int({ min: 0, max: str.length - 1 })
  );

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

  const randomIndex = Math.floor(
    errFaker.number.int({ min: 0, max: str.length - 1 })
  );

  const deletedStr = str.slice(0, randomIndex) + str.slice(randomIndex + 1);
  return deletedStr;
}

function addRandomChar(str) {
  if (str.length === 0) {
    return str;
  }

  const randomint = Math.floor(
    errFaker.number.int({ min: 0, max: alphabet.length - 1 })
  );
  const randomChar = alphabet.charAt(randomint);

  const randomIndex = Math.floor(
    errFaker.number.int({ min: 0, max: str.length - 1 })
  );

  const modifiedStr =
    str.slice(0, randomIndex) + randomChar + str.slice(randomIndex);

  return modifiedStr;
}

function randomizeFunc(...func) {
  const randomIndex = Math.floor(
    errFaker.number.int({ min: 0, max: func.length - 1 })
  );
  return func[randomIndex];
}

let errorFunctions = [swapNearChar, removeRandomChar, addRandomChar];

function generateData(faker, length, error = 0, oldLength = 0) {
  let data = [];
  if (error > 0) {
    for (oldLength; oldLength < length; oldLength++) {
      let address =
        faker.location.buildingNumber() +
        " " +
        faker.location.streetAddress() +
        " " +
        faker.location.city() +
        " " +
        faker.location.state();
      let id = faker.string.uuid();
      let name = faker.person.fullName();
      let phone = faker.phone.number();
      name = times(error, (x) => randomizeFunc(...errorFunctions)(x))(name);
      address = times(error, (x) => randomizeFunc(...errorFunctions)(x))(
        address
      );
      phone = times(error, (x) => randomizeFunc(...errorFunctions)(x))(phone);
      data.push({
        index: oldLength + 1,
        id: id,
        name: name,
        address: address,
        phone: phone,
      });
    }
  } else {
    for (oldLength; oldLength < length; oldLength++) {
      let address =
        faker.location.buildingNumber() +
        " " +
        faker.location.streetAddress() +
        " " +
        faker.location.city() +
        " " +
        faker.location.state();
      data.push({
        index: oldLength + 1,
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        address: address,
        phone: faker.phone.number(),
      });
    }
  }

  return data;
}

let faker = new Faker({ locale: [en] });
faker.seed(0);
let length = 20;
let page = 0;

let data = generateData(faker, length);

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
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      let oldLength = length;
      length += 10;
      page += 1;
      faker.seed(page + seed);
      let newData = generateData(faker, length, error, oldLength);

      setGeneratedData([...generatedData, ...newData]);
    }
  }

  function renewSeed(seedValue) {
    setError(0);
    let newSeed = parseInt(seedValue) || 0;
    setSeed(newSeed);
    faker.seed(newSeed);
    length = 20;
    const newData = generateData(faker, length);

    setGeneratedData(newData);
  }

  function randomSeed() {
    let randomSeed = faker.number.int({ min: 0, max: 100000 });
    renewSeed(randomSeed);
  }

  function renewRegion(regionValue) {
    setError(0);
    length = 20;
    page = 0;
    let newRegionValue;
    if (regionValue == "en") {
      alphabet = "abcdefghijklmnopqrstuvwxyz";
      newRegionValue = en;
    } else if (regionValue == "ru") {
      alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
      newRegionValue = ru;
    } else if ((regionValue = "it")) {
      alphabet = "abcdefghilmnopqrstuvz";
      newRegionValue = it;
    }
    setRegion(regionValue);
    faker = new Faker({ locale: [newRegionValue] });
    faker.seed(seed);
    const newData = generateData(faker, length);

    setGeneratedData(newData);
  }

  function renewError(errorValue) {
    errFaker = new Faker({ locale: [en] });
    errFaker.seed(0);
    let newError;
    if (errorValue.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
      newError = errorValue;
      setError(errorValue);
    } else {
      return;
    }

    faker.seed(seed);
    page = 0;
    length = 20;

    const newData = generateData(faker, length, newError);

    setGeneratedData(newData);
  }

  React.useEffect(() => {
    window.addEventListener("scroll", generateMore);
    return () => window.removeEventListener("scroll", generateMore);
  }, [generatedData]);

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

        <div className="col ">
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
        </div>

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
          <button
            type="button"
            className="btn btn-primary"
            onClick={exportTable}
          >
            Export to CSV
          </button>
        </div>
      </div>
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

          <tbody className="table-group-divider" id="table">
            {listData}
          </tbody>
        </table>
      </div>
    </div>
  );
}
