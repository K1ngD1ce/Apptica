import axios from "axios";

export const fetchChartData = async (countryId, dateFrom, dateTo) => {
  try {
    const response = await axios.get(
      `https://api.apptica.com/package/top_history/9379/${countryId}`,
      {
        params: {
          date_from: dateFrom,
          date_to: dateTo,
          platforms: 1,
          B4NKGg: "fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l",
        },
      }
    );
    console.log("Статус:", response.status);
    console.log("Данные:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке данных графика:", error);
    return null;
  }
};