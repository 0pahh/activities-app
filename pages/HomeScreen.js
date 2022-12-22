import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import Map from "../components/Map";
import Modal from "../components/Modal.js";
import supabase from "../config/supabaseClient.js";

const HomeScreen = () => {
  const [activities, setActivities] = useState(null);
  const [modalActivity, setModalActivity] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const { data, error } = await supabase
        .from("activities")
        .select(
          "activity_id, name, description, activity_type(label), localisation, price, lat, lng, created_at, image_name"
        );
      if (data) setActivities(data);

      if (error) console.log(error);
    } catch (err) {
      setActivities(null);
      setErrors("Error loading activities type");
    }
  };

  const showModal = (activity) => {
    setModalActivity(activity);
  };

  const handleCloseModal = () => {
    setModalActivity(null);
  };

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Map activities={activities} showModal={showModal}></Map>
      {modalActivity && (
        <Modal
          style={styles.modal}
          activity={modalActivity}
          closeModal={handleCloseModal}
        ></Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    margin: 20,
  },
});
export default HomeScreen;
