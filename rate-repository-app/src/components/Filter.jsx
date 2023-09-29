import { Picker } from "@react-native-picker/picker"
import { StyleSheet,View } from "react-native"
import { Searchbar } from 'react-native-paper';



filterStyles = StyleSheet.create({
    filterContainer:{
        paddingHorizontal:10,
    },
    filterFont:{
        color:'black'
    },
    searchBarContainer: {
        paddingHorizontal: 20,
        paddingTop:20
      },
      searchbar: {
        borderRadius: 100,
        backgroundColor: 'white',
      }
})

const Filter =({refetch,selected,setSelected,search,setSearch,debounced}) => {
    
    console.log(selected,"selected")

    const options = { 
        latest:{
            orderBy:"CREATED_AT",
            orderDirection:"DESC"
        },
        highest:{
            orderBy:"RATING_AVERAGE",
            orderDirection:"DESC"
        },
        lowest:{
            orderBy:"RATING_AVERAGE",
            orderDirection:"ASC"
        }
    }

    return(
        <View>
        <View style={filterStyles.searchBarContainer}>
          <Searchbar
            elevation={5}
            defaultValue={""}
            onChangeText={ (query) => {
                 
                    console.log('debouncing')
                    debounced({...options[selected],
                        searchKeyword:query})}}
            onSubmitEditing={() =>
                console.log("submit", search)}
            style={filterStyles.searchbar}
          />
          </View>
        <View style={filterStyles.filterContainer}>
        <Picker 
        style={filterStyles.filterFont}
        
        selectedValue={selected}
        onValueChange={(itemValue,itemIndex)=> {
            setSelected(itemValue)
            refetch(options[itemValue])
            }} >
            <Picker.Item label="Latest Repositories" value={'latest'}/>
            <Picker.Item label="Highest rated repositories" value={'highest'} />
            <Picker.Item label="lowest rated repositories" value={'lowest'} />


        </Picker>
        </View>
        </View>

    )
}

export default Filter