import Checkbox from "@mui/joy/Checkbox";
import cls from "./CustomLegend.module.scss"

export default function CustomLegend({ datasets, toggle, hidden }) {
    
  return (
    <div className={cls.customLegend}>
      {datasets.map((ds, i) => (
        <div
          key={i}
          style={{ display: "flex" }}
        >

          <div
            style={{
                width: 16,
                height: 16,
                backgroundColor: ds.borderColor,
                borderRadius: "50%",
                marginRight: 8,
            }}
          />
            <Checkbox className={cls.legendItem} label={ds.label} size="sm" checked={!hidden[ds.label]} onChange={() => toggle(ds.label)} />
        </div>
      ))}
    </div>
  );
}
