import axios from "axios";

export const fetchCountries = async () => {
  try {
    const res = await axios.get(
      "https://api.apptica.com/v1/geo?B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l"
    );

    const list = res.data.data
      .filter((c) => c.active)
      .map((c) => ({
        value: c.name,
        label: c.name,
        icon: c.icon,
      }));

    return list;
  } catch (err) {
    console.error("Ошибка при загрузке стран:", err);
    return [];
  }
};