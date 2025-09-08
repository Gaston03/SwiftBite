import { Establishment } from "@/models/establishment";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

export default function Index() {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstablishement = async () => {
      const { data, error } = await supabase.from("establishments").select();
      if (error) {
        setError(error.message);
        return;
      }
      setEstablishments(data as Establishment[]);
    };

    fetchEstablishement();
  }, []);

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{error}</Text>
      </View>
    );
  }

  if (establishments.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Pas d`&apos`enseigne pour le moment</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={establishments}
        renderItem={(establishment) => <Text>{establishment.item.name}</Text>}
      />
    </ScrollView>
  );
}
