import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

import supabase from "../config/supabaseClient.js";
const bucketURL =
  "https://cvabsatvtyeranjwevdb.supabase.co/storage/v1/object/public/medias/";
export default function HomeScreen() {
  const [activities, setActivities] = useState(null);
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const { data, error } = await supabase
        .from("activities")
        .select(
          "name, description, activity_type(label), localisation, price, lat, lng, created_at, image_name"
        );
      if (data) setActivities(data);
      if (error) console.log(error);
    } catch (err) {
      setActivities(null);
      setErrors("Error loading activities type");
    }
  };

  const renderActivity = ({ item, index, separator }) => {
    return (
      <View>
        <Image
          style={styles.image}
          source={{ uri: bucketURL + item.image_name }}
        />
        <Text>{item.name}</Text>
        <Text>{item.activity_type.label}</Text>
        <Text>{item.created_at}</Text>
      </View>
    );
  };

  return (
    <View>
      {activities != null ? (
        <FlatList data={activities} renderItem={renderActivity} />
      ) : (
        <Text>No data</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    marginTop: 15,
    marginBottom: 15,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
