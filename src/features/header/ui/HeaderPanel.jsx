import { useEffect, useState } from "react";
import cls from "./HeaderPanel.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetchCountries } from "../../../shared/lib/fetch/fetchCountries";

export default function HeaderPanel() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const loadCountries = async () => {
      const list = await fetchCountries();
      setCountries(list);
      if (list.length > 0) {
        setCountry(list[0].value);
      }
    };

    loadCountries();
  }, []);

  const handleChange = (event) => {
    setCountry(event.target.value);
  };
  return (
    <div className={cls.headerPanel}>
      <div className={`container ${cls.headerPanel__container}`}>
        <div className={cls.headerPanelRight}>
          <Box sx={{ "& button": { m: 1 } }}>
            <Button variant="outlined" size="big">
              PNG
            </Button>
            <Button variant="outlined" size="big">
              CSV
            </Button>
          </Box>

          <FormControl sx={{ m: 1, maxWidth: 130 }} size="small">
            <InputLabel id="demo-select-small-label">Country</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={country}
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
                getContentAnchorEl: null, // для корректного позиционирования у MUI Select
                PaperProps: {
                  sx: {
                    height: 200,
                    mt: 1, // отступ сверху у выпадающего меню (2 * 8px = 16px)
                  },
                },
              }}
              renderValue={(selected) => {
                const selectedCountry = countries.find(
                  (c) => c.value === selected
                );
                return (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <img
                      src={selectedCountry.icon}
                      alt={selectedCountry.label}
                      width={20}
                      height={15}
                      style={{ objectFit: "cover", borderRadius: 2 }}
                    />
                    {selectedCountry.label}
                  </Box>
                );
              }}
            >
              {countries.map((c) => (
                <MenuItem
                  sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  key={c.value}
                  value={c.value}
                >
                  <img
                    src={c.icon}
                    alt={c.label}
                    width={20}
                    height={15}
                    style={{ objectFit: "cover", borderRadius: 2 }}
                  />
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
