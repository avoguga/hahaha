import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Card from '../../components/Card';

const url = "https://type.fit/api/quotes"; 

const Item = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

export default function Frases() {
  
  const [citacoes, setCitacoes] = useState<any>([]);

  async function getCitacoes() {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setCitacoes(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCitacoes();
  }, []);
  
  // console.log("oi" , citacoes.map((quotes => (quotes.text))))

  const renderItem = ({ item }) => (
    <Card text={item.text}/>
  );

  return (
    <View style={styles.mainContainer}>
       <Text style={{
          fontSize: 30,
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 50
        }}>Frases do mano Gugas (Versão Em Inglês...)</Text>
      <Text style={{
          fontSize: 20,
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center"
        }}>São muitas frases... O cara é muito bom!</Text>
      <FlatList
        data={citacoes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: "#112",
      justifyContent: "center",
      alignItems: "center",
    }
  });