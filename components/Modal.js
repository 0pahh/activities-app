import { StyleSheet, View, Text, Image } from "react-native";
import dayjs from "dayjs";
import { SUPABASE_IMGS_URL } from "@env";

const Modal = ({ activity, closeModal }) => {
  const handleExitClick = () => {
    closeModal();
  };
  return (
    <View style={styles.modal}>
      <Text style={styles.title}>{activity.name}</Text>
      <View style={styles.space} />
      <Image
        style={styles.image}
        source={{ uri: SUPABASE_IMGS_URL + activity.image_name }}
      />
      <View style={styles.space} />
      <Text style={styles.subtitle}>{activity.description}</Text>
      <View style={styles.space} />
      <View style={styles.infos}>
        <Text style={styles.smallText}>En {activity.activity_type.label}</Text>
        <View style={styles.space} />
        <Text style={styles.smallText}>{activity.localisation}</Text>
        <View style={styles.space} />
        <Text style={styles.smallText}>
          Prix : {activity.price ? activity.price + "€" : "Gratuit"}
        </Text>
        <View style={styles.space} />
        <Text style={styles.smallText}>
          {dayjs(activity.created_at).format("d MMM YYYY")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "80%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 20,
    bottom: -100,
    padding: 20,
    fontSize: 15,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "normal",
  },
  smallText: {
    fontSize: 9,
  },
  space: {
    height: 10,
    width: 10,
  },
  infos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Modal;
