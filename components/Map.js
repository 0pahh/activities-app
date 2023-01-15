import { useState, useMemo, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import SearchBar from "./SearchBar";

export default function Map({ activities, showModal }) {
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setFilteredActivities(activities);
    requestLocationPermission()
      .then(() => getCurrentPosition())
      .catch((error) => {
        console.log(error);
        //TODO: handle error
        // setErrorMsg(error);
      });
  }, [activities]);
  const region = useMemo(() => {
    if (!location) {
      return null;
    }

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0.05,
    };
  }, [location]);

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const getCurrentPosition = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const handleClick = (activity) => {
    showModal(activity);
  };

  const handleFilterActivities = (activitiesFiltered) => {
    setFilteredActivities(activitiesFiltered);
  };

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={styles.container}>
        <SearchBar
          style={styles.overlay}
          activities={activities}
          filterActivities={(event) => handleFilterActivities(event)}
        />
      </View>

      <MapView
        showsUserLocation
        region={region}
        style={[StyleSheet.absoluteFillObject, styles.map]}
      >
        {filteredActivities
          ? filteredActivities.map((activity) => {
              return (
                <Marker
                  key={activity.activity_id}
                  coordinate={{
                    latitude: activity.lat,
                    longitude: activity.lng,
                  }}
                  onPress={() => handleClick(activity)}
                ></Marker>
              );
            })
          : null}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: {},
  map: {
    zIndex: -1,
  },
  container: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 8,
    zIndex: 1,
  },
});
