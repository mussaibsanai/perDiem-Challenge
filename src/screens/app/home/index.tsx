import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity, SafeAreaView, FlatList, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/reducers/user';
import axios from 'axios';
import images from '../../../assets/images';

interface HomeScreenProps {
  navigation: any; // You can replace 'any' with the appropriate navigation type
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  interface dataItem{
    userId: number,
    id: number,
    title: string,
    completed: boolean
  }

  const [greeting, setGreeting] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<dataItem[]>([]);
  const [renderType, setRenderType] = useState("Posts");
  const user = useSelector(userSelector);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 4 && currentHour < 12) {
      setGreeting(`Good morning ${user?.user?.email}`);
      setModalVisible(true)
    } else if (currentHour >= 12 && currentHour < 16) {
      setGreeting(`Good afternoon ${user?.user?.email}`);
      setModalVisible(true)
    } else {
      setGreeting(`Good night ${user?.user?.email}`);
      setModalVisible(true)
    }

  }, []);

  useEffect(() => {
    getData()
  }, [renderType]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      
      setModalVisible(true)
    });

    return unsubscribe;
  }, [navigation]);

  const getData = () => {
    let Url = renderType == "Posts" ? 'https://jsonplaceholder.typicode.com/posts' : 'https://jsonplaceholder.typicode.com/todos'
    axios.get(Url)
    .then(function (response) {
      // handle success
      console.log("response", JSON.stringify(response.data, null, 2));
      setData(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }

  return (
    <>
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.headingContainer}>
      <Text style={styles.title}>{greeting}</Text>
      <Image source={images.perDiemLogo} style={{width : 50, height : 50}} />
      </View>
      
      
      <FlatList 
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>(
          <View style={{borderWidth :1, borderColor : "#aeaeae", padding : 10,}}>
            <Text>{item?.title}</Text>
          </View>  
        )}
      />
    </View>
    </ScrollView>

    <Modal animationType="slide"
          transparent={true} visible={modalVisible} 
          >
       <View style={styles.centeredView}>
         <View style={styles.modalView}>
        

        <TouchableOpacity onPress={() => {
           setRenderType("Posts")
          setModalVisible(false)
          }} style={styles.radioButton}>
          <Image source={renderType == "Posts" ? images.SelectedRadio : images.UnselectedRadio} style={{width : 20, height : 20}} />
          <Text style={{paddingHorizontal : 10}}>Render Post</Text>
        </TouchableOpacity> 
         <TouchableOpacity  onPress={() => {
          setRenderType("Todos")
          setModalVisible(false)
          }} style={styles.radioButton}>
         <Image source={renderType == "Todos" ? images.SelectedRadio : images.UnselectedRadio} style={{width : 20, height : 20,}} />
          <Text style={{paddingHorizontal : 10}}>Render Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => {setModalVisible(false)}} style={styles.closeButton}>
          <Text>Close</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor : "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  headingContainer : {
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center",
    width : "100%"
  },
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position : 'absolute',
    bottom : 0,
    width : "100%",
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20.0,
    elevation: 24,
    width: '100%',
    position : 'absolute',
    bottom : 0,
  },
  closeButton: {
    width: '70%',
    marginBottom: 15,
    alignItems : 'center',
    padding: 10,
    backgroundColor: '#ad7632',
    borderRadius : 5,
    marginVertical : 10,
    alignSelf : 'center',
  },
  radioButton : {
    flexDirection : "row",
    alignItems : "center",
    padding : 10,
  }
});

export default HomeScreen;