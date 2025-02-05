import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleFetch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(response => {
        if (!response.ok) throw new Error("Error in fetch:" + response.statusText);
        return response.json();
      })
      .then(data => {
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
          alert(" No recipes found!");
        }
      })
      .catch(err => console.error(err));
  };

  const renderMeal = ({ item }) => (
    <View style={styles.recipeContainer}>
      <Text style={styles.mealTitle}>{item.strMeal}</Text>
      <Image source={{ uri: item.strMealThumb }} style={styles.mealPicture} />
      
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
       
        <TextInput
          style={styles.input}
          placeholder="..."
          value={ingredient}
          onChangeText={setIngredient}
        />
        <TouchableOpacity style={styles.button} onPress={handleFetch}>
          <Text style={styles.buttonText}>FIND</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderMeal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    fontSize: 16
  },
  button: {
    backgroundColor: '#007BFF',  
    paddingVertical: 12,          
    paddingHorizontal: 30,        
    borderRadius: 5,             
    marginBottom: 20,            
    alignItems: 'center',        
  },
  buttonText: {
    color: '#fff',               
    fontSize: 18,               
    fontWeight: 'semi-bold',         
  },
  
  recipeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  mealPicture: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  mealTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'semi-bold',
  },
});
