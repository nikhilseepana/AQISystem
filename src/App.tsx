import React, { useState } from "react";
import AqiTable from "./AqiTable";
import { AirQualityProvider } from "./AirQualityStore";
import { AqiTrends } from "./AqiTrends";
import { Box, Button, Text } from "grommet";

function App() {
  const [
    show,
    //  setShow
  ] = useState(true);
  const [refresh, setRefresh] = useState(false);
  return (
    <AirQualityProvider>
      <Box
        gap="small"
        pad="small"
        background={"black"}
        fill="vertical"
        flex="grow"
      >
        <Box align="center" pad="small">
          <Text weight="bold" size="large">
            Air Quality Monotoring
          </Text>
        </Box>
        <Box direction="row" fill gap="small" align="center">
          <Box width="medium" round="xsmall">
            <AqiTable />
          </Box>
          <Box fill>
            <Box direction="row" gap="small" fill="horizontal">
              {/* <Button
                label={show ? "Hide" : "Compare"}
                onClick={() => {
                  setShow(!show);
                }}
              /> */}

              {show ? (
                <Button
                  label={show ? "Refresh Chart" : "Compare"}
                  onClick={() => {
                    setRefresh(!refresh);
                  }}
                />
              ) : undefined}
            </Box>
            {show ? <AqiTrends refresh={refresh} /> : undefined}
          </Box>
        </Box>
      </Box>
    </AirQualityProvider>
  );
}

export default App;
