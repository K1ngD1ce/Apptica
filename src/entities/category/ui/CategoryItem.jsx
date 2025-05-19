import cls from "./CategoryItem.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function CategoryItem() {
  return (
    <div className={cls.categoryItem}>
      <div className={cls.colorBox}></div>
      <FormControlLabel
        control={<Checkbox size="small" defaultChecked />}
        label="Game - Top Paid"
      />
    </div>
  );
}
