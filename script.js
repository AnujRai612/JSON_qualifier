document.addEventListener("DOMContentLoaded", function() {
  fetch("https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json")
    .then(response => response.json())
    .then(data => renderDevelopers(data))
    .catch(error => {
      console.log("Error retrieving JSON:", error);
      // In case the API call fails, you can use a local JSON file instead.
      // const data = require("./localData.json");
      // renderDevelopers(data);
    });

  function renderDevelopers(developers) {
    const developersList = document.getElementById("developersList");
    developersList.innerHTML = "";

    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");

    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value.toLowerCase();

    const filteredDevelopers = developers.filter(developer => {
      const name = developer.name.toLowerCase();
      const designation = developer.designation.toLowerCase();
      const skills = developer.skills.map(skill => skill.toLowerCase());

      return name.includes(searchTerm) && (filterValue === "" || designation.toLowerCase() === filterValue || skills.includes(filterValue));
    });

    filteredDevelopers.forEach(developer => {
      const card = document.createElement("div");
      card.classList.add("developer-card");

      const nameElement = document.createElement("h2");
      nameElement.textContent = developer.name;
      card.appendChild(nameElement);

      const designationElement = document.createElement("p");
      designationElement.textContent =
