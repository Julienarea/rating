// Получаем элемент с рейтингом
let ratingElement = document.getElementById("rating");

// Получаем сохраненное значение рейтинга из локального хранилища
let savedRating = localStorage.getItem("rating");

// Если сохраненное значение существует, устанавливаем его как текущий рейтинг
if (savedRating) {
  ratingElement.innerText = savedRating;
}

// Получаем сохраненные пресеты из локального хранилища
let savedPresets = JSON.parse(localStorage.getItem("presets")) || [];

// Функция для увеличения рейтинга
function increaseRating() {
  let rating = parseInt(ratingElement.innerText);
  ratingElement.innerText = rating + 1;

  // Сохраняем новое значение рейтинга в локальное хранилище
  localStorage.setItem("rating", ratingElement.innerText);
}

// Функция для уменьшения рейтинга
function decreaseRating() {
  let rating = parseInt(ratingElement.innerText);
  ratingElement.innerText = rating - 1;

  // Сохраняем новое значение рейтинга в локальное хранилище
  localStorage.setItem("rating", ratingElement.innerText);
}

// Функция для добавления пресета
function addPreset() {
  let presetName = document.getElementById("presetName").value;
  let presetValue = document.getElementById("presetValue").value;

  // Создаем объект пресета
  let preset = {
    name: presetName,
    value: presetValue,
  };

  // Добавляем пресет в сохраненные пресеты
  savedPresets.push(preset);

  // Обновляем отображение пресетов
  updatePresetButtons();

  // Очищаем поля ввода
  document.getElementById("presetName").value = "";
  document.getElementById("presetValue").value = "";

  // Сохраняем обновленные пресеты в локальное хранилище
  localStorage.setItem("presets", JSON.stringify(savedPresets));
}

// Функция для удаления пресета
function deletePreset(index) {
  // Удаляем пресет из сохраненных пресетов
  savedPresets.splice(index, 1);

  // Обновляем отображение пресетов
  updatePresetButtons();

  // Сохраняем обновленные пресеты в локальное хранилище
  localStorage.setItem("presets", JSON.stringify(savedPresets));
}

// Функция для обновления отображения пресетов
function updatePresetButtons() {
  let presetButtonsElement = document.getElementById("presetButtons");
  presetButtonsElement.innerHTML = "";

  for (let i = 0; i < savedPresets.length; i++) {
    let preset = savedPresets[i];

    let button = document.createElement("button");
    button.textContent = preset.name + " (" + preset.value + ")";
    button.onclick = function () {
      applyPreset(preset.value);
    };

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML ='<img src="images/delete.png" alt="Delete">'; // Ваше изображение "Delete"

    deleteButton.classList.add("delete-button");
    deleteButton.onclick = function () {
      deletePreset(i);
    };

    let presetContainer = document.createElement("div");
    presetContainer.classList.add("preset-button");
    presetContainer.appendChild(button);
    presetContainer.appendChild(deleteButton);

    presetButtonsElement.appendChild(presetContainer);
  }
}

// Функция для применения пресета
function applyPreset(value) {
  let rating = parseInt(ratingElement.innerText);
  ratingElement.innerText = +rating + +value;

  // Сохраняем новое значение рейтинга в локальное хранилище
  localStorage.setItem("rating", ratingElement.innerText);
}

// Обновляем отображение пресетов при загрузке страницы
updatePresetButtons();

// //*clearLocalStorage
// function clearLocalStorage() {
//   localStorage.clear();
//   alert("Local Storage has been cleared.");
// }