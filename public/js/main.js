document.addEventListener("DOMContentLoaded", function () {
  const closeModelBtnEl = document.querySelector("#closeModel");
  const tableBodyElement = document.querySelector("#dataList");
  const mainFormEl = document.querySelector("#mainForm");
  const modalEl = document.querySelector("#modal");

  // Main Input
  const NameInput = document.getElementById("Name");
  const AgeInput = document.getElementById("Age");
  const genderSelectInput = document.getElementById("genderSelect");

  // Edit Input

  const editFormModal = document.getElementById("editForm");
  const EditNameInput = document.getElementById("editName");
  const EditAgeInput = document.getElementById("editAge");
  const EditGenderSelectInput = document.getElementById("editGenderSelect");

  const editIndex = document.getElementById("editIndex"); // Index Form Modal

  mainFormEl.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = NameInput.value.trim();
    const age = +AgeInput.value.trim(); // + for coverting string into number
    const gender = genderSelectInput.value;

    if (name != "" && gender !== "") {
      const user = {
        name: name,
        age: age,
        gender: gender,
      };

      addtoLocalStorageCustomFunction(user);
      refreshLoadData(); // refreshing the section
      mainFormEl.reset(); // reset the input Value
    } else {
      alert("Please full all Details");
    }
  });

  // Edit Form

  editFormModal.addEventListener("submit", function (e) {
    e.preventDefault();
    const index = editIndex.value.trim();
    const newname = EditNameInput.value.trim();
    const age = +EditAgeInput.value.trim(); // + for coverting string into number
    const gender = EditGenderSelectInput.value;

    if (newname != "" && gender !== "") {
      
      const getStoredData = JSON.parse(localStorage.getItem("Data")) || [];
      console.log(getStoredData);
      getStoredData[index].name = newname;
      getStoredData[index].age = age;
      getStoredData[index].gender = gender;

      localStorage.setItem("Data", JSON.stringify(getStoredData));
      editFormModal.reset();
      modalEl.classList.add("hidden");
      refreshLoadData();
    } else {
      alert("Please full all Details");
    }
  });

  function addtoLocalStorageCustomFunction(user) {
    const getStoredData = JSON.parse(localStorage.getItem("Data")) || [];
    getStoredData.push(user); // Push in to LocalStorage

    // Updating LocalStorage
    localStorage.setItem("Data", JSON.stringify(getStoredData));
  }

  refreshLoadData();

  // Closing Model Function
  closeModelBtnEl.addEventListener("click", function () {
    modalEl.classList.add("hidden");
  });

  // Edit Data Function
  function editeData() {
    const index = this.dataset.index;
    const getStoredData = JSON.parse(localStorage.getItem("Data")) || [];
    const data = getStoredData[index]; // getting value from LocalStorage
    // console.log(data);
    // Asigning the Value into Edit Model Popup as input
    editIndex.textContent = `Form ID : ${index}`; // Assign the index into Element for Checking the index of target
    EditNameInput.value = data.name;
    EditAgeInput.value = data.age;
    EditGenderSelectInput.value = data.gender;

    modalEl.classList.remove("hidden");
  }

  // Delete Data Function
  function deleteData() {
    if (confirm("Are You Sure to Delete ?")) {
      const getIndexFromBtn = this.dataset.index; // this = target clicking btin
      const getStoredData = JSON.parse(localStorage.getItem("Data")) || [];
      getStoredData.splice(getIndexFromBtn, 1); // deleting the clicking element which has this index(getIndexFromBtn)
      localStorage.setItem("Data", JSON.stringify(getStoredData)); // Updating LocalStorge as Stringify
      refreshLoadData(); // For reload Data Preview UI
    }
  }

  function refreshLoadData() {
    const storedData = JSON.parse(localStorage.getItem("Data")) || [];

    tableBodyElement.innerHTML = ""; // removeing previous record [Double Data issue]

    storedData.forEach(function (data, index) {
      const row = document.createElement("tr");
      row.innerHTML = `
      <tr class="hover:bg-gray-100 duration-1000 cursor-pointer">
              <td
                class="p-5 text-center border-b border-gray-300 font-semibold text-gray-700"
              >
                ${data.name}
              </td>
              <td
                class="p-5 text-center border-b border-gray-300 font-semibold text-gray-700"
              >
              ${data.age}
              </td>
              <td
                class="p-5 text-center border-b border-gray-300 font-semibold text-gray-700"
              >
              ${data.gender}
              </td>
              <td
                class="p-5 text-center border-b border-gray-300 font-semibold text-gray-700"
              >
                <button
                  data-index="${index}"
                  type="button"
                  id="btnEdit"
                  class="bg-teal-500 py-2 px-6 rounded hover:bg-teal-600 hover:text-white transition-all duration-300"
                >
                  Edit
                </button>
              </td>
              <td
                class="p-5 text-center border-b border-gray-300 font-semibold text-gray-700"
              >
                <button
                  type="button"
                  data-index="${index}"
                  id="btnDelete"
                  class="bg-red-500 py-2 px-6 rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
      `;

      tableBodyElement.appendChild(row);
    });

    // Open Modal
    const editBtn = document.querySelectorAll("#btnEdit");
    editBtn.forEach((element) => {
      element.addEventListener("click", editeData);
    });

    // Delete Btn
    const deleteBtn = document.querySelectorAll("#btnDelete");
    deleteBtn.forEach((element) => {
      element.addEventListener("click", deleteData);
    });
  }
});
