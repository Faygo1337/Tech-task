const cargoList = [
  {
    id: "CARGO001",
    name: "Строительные материалы",
    status: "В пути",
    origin: "Москва",
    destination: "Казань",
    departureDate: "2024-11-24",
  },
  {
    id: "CARGO002",
    name: "Хрупкий груз",
    status: "Ожидает отправки",
    origin: "Санкт-Петербург",
    destination: "Екатеринбург",
    departureDate: "2024-11-26",
  },
];

const statusColors = {
  "Ожидает отправки": "bg-warning",
  "В пути": "bg-primary",
  Доставлен: "bg-success",
};

function renderCargoTable(filterStatus = "") {
  const cargoTable = document.getElementById("cargoTable");
  cargoTable.innerHTML = "";

  cargoList
    .filter((cargo) => !filterStatus || cargo.status === filterStatus)
    .forEach((cargo) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cargo.id}</td>
        <td>${cargo.name}</td>
        <td class="${statusColors[cargo.status]} text-white">${
        cargo.status
      }</td>
        <td>${cargo.origin}</td>
        <td>${cargo.destination}</td>
        <td>${cargo.departureDate}</td>
        <td>
          <select class="form-control" onchange="updateCargoStatus('${
            cargo.id
          }', this.value)">
            <option value="Ожидает отправки" ${
              cargo.status === "Ожидает отправки" ? "selected" : ""
            }>Ожидает отправки</option>
            <option value="В пути" ${
              cargo.status === "В пути" ? "selected" : ""
            }>В пути</option>
            <option value="Доставлен" ${
              cargo.status === "Доставлен" ? "selected" : ""
            }>Доставлен</option>
          </select>
        </td>
      `;
      cargoTable.appendChild(row);
    });
}

function updateCargoStatus(id, newStatus) {
  const cargo = cargoList.find((c) => c.id === id);
  if (newStatus === "Доставлен" && new Date(cargo.departureDate) > new Date()) {
    alert(
      'Дата отправления находится в будущем. Нельзя изменить статус на "Доставлен".'
    );
    return;
  }
  cargo.status = newStatus;
  renderCargoTable();
}

function addCargo(event) {
  event.preventDefault();

  const name = document.getElementById("cargoName").value.trim();
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const departureDate = document.getElementById("departureDate").value;

  if (!name || !origin || !destination || !departureDate) {
    alert("Все поля должны быть заполнены.");
    return;
  }

  const newCargo = {
    id: `CARGO${(cargoList.length + 1).toString().padStart(3, "0")}`,
    name,
    status: "Ожидает отправки",
    origin,
    destination,
    departureDate,
  };

  cargoList.push(newCargo);
  renderCargoTable();
  document.getElementById("cargoForm").reset();
}

function filterCargoByStatus() {
  const filterStatus = document.getElementById("filterStatus").value;
  renderCargoTable(filterStatus);
}

document.getElementById("cargoForm").addEventListener("submit", addCargo);

renderCargoTable();
