import cls from "./HeaderPanel.module.scss";
import {Box, Button} from "@mui/joy";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDownloadChart } from "../../../shared/lib/useDownloadChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../../shared/lib/fetch/fetchCountries";
import {
  setCountries,
  setSelectedCountry,
} from "../model/selectedCountrySlice";

export default function HeaderPanel({chartRef, chartData}) {
  const { downloadPNG, downloadCSV } = useDownloadChart(chartRef, chartData);
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country.countries);
  const selectedCountry = useSelector((state) => state.country.selectedCountry);

  useEffect(() => {
    const loadCountries = async () => {
      const list = await fetchCountries();
      console.log("Список стран из API:", list);
      dispatch(setCountries(list));
      if (list.length > 0) {
        dispatch(setSelectedCountry(list[0]));
      }
    };

    loadCountries();
  }, [dispatch]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedObj = countries.find((c) => c.value === selectedValue);
    if (selectedObj) {
      dispatch(setSelectedCountry(selectedObj));
    }
  };

  return (
    <div className={cls.headerPanel}>
      <Box sx={{ "& button": { m: 1 } }}>
        <Button variant="outlined" size="lg" onClick={downloadPNG}>
          PNG
        </Button>
        <Button variant="outlined" size="lg" onClick={downloadCSV}>
          CSV
        </Button>
      </Box>

      <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 130 }} size="small">
        <InputLabel id="demo-select-small-label">Country</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectedCountry?.value || ''}
          label="Country"
          onChange={handleChange}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            PaperProps: {
              sx: {
                height: 200,
                mt: 1,
              },
            },
          }}
          renderValue={(selected) => {
            const selectedCountryObj = countries.find(
              (c) => c.value === selected
            );

            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                  src={selectedCountryObj?.icon}
                  alt={selectedCountryObj?.label}
                  width={20}
                  height={15}
                  style={{ objectFit: "cover", borderRadius: 2 }}
                />
                {selectedCountryObj?.value}
              </Box>
            );
          }}
        >
          {countries.map((c) => (
            <MenuItem
              sx={{ display: "flex", alignItems: "center", gap: "8px" }}
              key={c.id}
              value={c.value}
            >
              <img
                src={c.icon}
                alt={c.label}
                width={20}
                height={15}
                style={{ objectFit: "cover", borderRadius: 2 }}
              />
              {c.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
