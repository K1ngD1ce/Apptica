import subCategoryMap from "../../../assets/dictionary/subCategoryMap";

export function categoryIdDecoding(categoryGroups) {
  const categoryMap = {};

  categoryGroups.forEach((group) => {
    if (group.id && group.name) {
      categoryMap[String(group.id)] = group.name;
    }

    if (Array.isArray(group.categories)) {
      group.categories.forEach((cat) => {
        if (cat.id && cat.name) {
          categoryMap[String(cat.id)] = `${group.name} - ${cat.name}`;
        }
      });
    }
  });

  return {
    categoryMap,
    subCategoryMap, 
  };
}

function getRandomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;
}

export function transformChartData(rawData, categoryMap = {}) {
  const datasets = [];
  const labelsSet = new Set();

  Object.entries(rawData).forEach(([categoryId, subCategories]) => {
    Object.entries(subCategories).forEach(([subCategoryId, dataByDate]) => {
      const dates = Object.keys(dataByDate);
      dates.forEach((date) => labelsSet.add(date));

      const categoryName =
        categoryMap[String(categoryId)] || `❌ Unknown category ${categoryId}`;
      const subCategoryName =
        subCategoryMap[subCategoryId] || `❌ Unknown sub ${subCategoryId}`;

      datasets.push({
        label: `${categoryName} - ${subCategoryName} `,
        data: dates.map((date) => dataByDate[date] ?? null),
        borderColor: getRandomColor(),
        tension: 0.2,
      });
    });
  });

  const labels = Array.from(labelsSet).sort();

  return { labels, datasets };
}
