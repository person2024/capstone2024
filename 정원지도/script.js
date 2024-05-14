function generateGarden() {
  const width = parseInt(document.getElementById('width').value);
  const height = parseInt(document.getElementById('height').value);

  const gardenGrid = document.getElementById('gardenGrid');
  gardenGrid.innerHTML = ''; // Clear previous grid

  gardenGrid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  gardenGrid.style.setProperty('--width', width); // Set custom property for width

  for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
          const cell = document.createElement('div');
          cell.classList.add('grid-item');
          cell.textContent = `${j + 1}, ${i + 1}`;
          gardenGrid.appendChild(cell);
      }
  }
}
