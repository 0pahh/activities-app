import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { SelectList } from "react-native-dropdown-select-list";

const SearchBar = ({ activities, filterActivities }) => {
  const [selected, setSelected] = useState();
  useEffect(() => {
    if (activities) {
      filterActivities(
        activities.filter(
          (activity) => activity.activity_type.label === selected
        )
      );
    }
  }, [selected]);
  const data = [];
  if (activities) {
    let i = 0;
    for (let activity of activities) {
      if (data.some((e) => e.value === activity.activity_type.label)) continue;
      else {
        i++;
        data.push({ key: i, value: activity.activity_type.label });
      }
    }
  }

  return (
    <SelectList
      boxStyles={styles.searchBar}
      dropdownStyles={styles.searchBar}
      setSelected={(val) => setSelected(val)}
      data={data}
      save="value"
    />
  );
};
const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "white",
  },
});

export default SearchBar;
