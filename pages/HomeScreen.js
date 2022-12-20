import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import supabase from "./config/supabaseClient.js";

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
          "name",
          "description",
          "localisation",
          "price",
          "lat",
          "lng",
          "created_at"
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
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>{item.localisation}</Text>
        <Text>{item.price}</Text>
        <Text>{item.lat}</Text>
        <Text>{item.lng}</Text>
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
