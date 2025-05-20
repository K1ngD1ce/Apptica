import axios from "axios";
import {setCategoryGroups} from '../../../entities/category/model/categorySlice'

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://api.apptica.com/v1/applicationCategory?platform=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l"
    );
    console.log("API categories response:", response.data);
    if (response.data.status_code === 200) {
      dispatch(setCategoryGroups(response.data.data));
    } else {
      console.error("Ошибка при загрузке категорий", response.data.message);
    }
  } catch (error) {
    console.error("Ошибка сети при загрузке категорий", error);
  }
};
