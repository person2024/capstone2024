function searchPlant() {
    var searchQuery = document.getElementById("searchInput").value;

    fetch("data1.json")
        .then(response => response.json())
        .then(plants => {
            var resultsDiv = document.getElementById("searchResults");
            resultsDiv.innerHTML = ""; // 이전 검색 결과를 초기화
            var found = false;
            plants.forEach(function(plant) {
                if (plant.이름 === searchQuery) {
                    found = true;
                    var plantDiv = document.createElement("div");
                    plantDiv.innerHTML = "<h2>" + plant.이름 + "</h2>" +
                                          "<p>특징: " + plant.특징 + "</p>" +
                                          "<img src='" + plant.이미지_URL + "' alt='" + plant.이름 + "' style='max-width: 200px;'>"
                    resultsDiv.appendChild(plantDiv);
                }
            });
            if (!found) {
                resultsDiv.innerHTML = "검색 결과가 없습니다.";
            }
        })
        .catch(error => console.error("Error fetching plant.json:", error));
}