import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import PokeCard from '../../components/PokeCard';


const Item = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

export default function PokemonList() {
  
  const [url, setUrl] = useState<any>("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20");
  const [allPokes, setAllPokes] = useState<any>([]);

  async function getPokemons() {
    try {
      const res = await fetch(url);
      const data = await res.json();

      function createPokemonsObj(result: any[]) {
        result?.forEach( async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data = await res.json()

          setAllPokes(currentList => [...currentList, data])
        })
      }
      createPokemonsObj(data.results)
      await console.log("aaaaa", allPokes)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPokemons();
  }, []);
  
  console.log("oi" , allPokes.map(aa => aa.sprites.other.dream_world.front_default))

  const renderItem = ({ item }) => (
    <PokeCard text={item.name} img={item.sprites.other.dream_world.front_default} key={item.key}/>
  );


  return (
    <View style={styles.mainContainer}>
       <Text style={{
          fontSize: 30,
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 50
        }}>Todos os pokemons que o mano Gugas já capturou</Text>
      {/* <Text style={{
          fontSize: 20,
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center"
        }}>São muitas frases... O cara é muito bom!</Text> */}
      <FlatList
        data={allPokes}
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