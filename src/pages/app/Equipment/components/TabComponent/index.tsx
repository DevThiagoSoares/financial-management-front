import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList/";
import TabPanel from "@mui/lab/TabPanel";

import { Divider } from "@mui/material";
import { Entrys } from "../../entrys";
import { Exits } from "../../exits";

export function TabComponent({ session }: { session: any }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderColor: "Background" }}>
            <TabList
              TabIndicatorProps={{
                hidden: true,
              }}
              onChange={handleChange}
              sx={{
                "& button": { borderRadius: 1 },
                "& button:hover": { backgroundColor: "#F9F9F9" },
                "& button:active": { backgroundColor: "#00000029" },
                "& button.Mui-selected": {
                  backgroundColor: "#284B63",
                  color: "#fff",
                },
              }}
            >
              <Tab label="Entradas" value="1" />
              <Tab label="Saídas" value="2" />
            </TabList>
          </Box>
          <Divider sx={{ paddingTop: "24px" }} />
          <TabPanel value="1">
            <Entrys session={session} />
          </TabPanel>
          <TabPanel value="2">
            <Exits />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
