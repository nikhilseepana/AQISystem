import { useEffect } from "react";
import { AirQualityContext } from "./AirQualityStore";
import { observer } from "mobx-react-lite";
import useStore from "./useStore";
import { Box, List, Text } from "grommet";

const AirQualityTable = observer(() => {
  const { init, aqi } = useStore(AirQualityContext);

  useEffect(() => {
    init();
  }, [init]);

  const getAqiColor = (aqi: number) => {
    switch (true) {
      case aqi > 400:
        return "#AF2D24";
      case aqi > 300:
        return "#E93F33";
      case aqi > 200:
        return "#F29C33";
      case aqi > 100:
        return "#FFF833";
      case aqi > 50:
        return "#A3C853";
      default:
        return "#55A84F";
    }
  };

  return (
    <Box gap="small" fill>
      <Box justify="between" direction="row" gap="medium" pad="small">
        <Text weight="bold">{"City"}</Text>
        <Text weight="bold">{"Currrent Aqi"}</Text>
      </Box>
      {aqi.length ? (
        <List
          data={aqi}
          background={"black"}
          primaryKey="city"
          border={true}
          pad={"none"}
        >
          {({ city, aqi }: { city: string; aqi: number; ts: Date }) => {
            return (
              <Box
                key={city}
                justify="between"
                direction="row"
                gap="medium"
                pad="small"
              >
                <Text>{city}</Text>
                <Text color={getAqiColor(aqi)}>{aqi}</Text>
                {/* <Text>{moment(ts).fromNow()}</Text> */}
              </Box>
            );
          }}
        </List>
      ) : (
        "Loading..."
      )}
    </Box>
  );
});

export default AirQualityTable;
