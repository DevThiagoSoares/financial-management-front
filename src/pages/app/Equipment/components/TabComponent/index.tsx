import * as React from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

import { Entrys } from "../../entrys";
import { Exits } from "../../exits";

export function TabComponent() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <TabPanel value="1">
            <Entrys />
          </TabPanel>
          {/* <TabPanel value="2">
            <Exits />
          </TabPanel> */}
        </TabContext>
      </Box>
    </>
  );
}
