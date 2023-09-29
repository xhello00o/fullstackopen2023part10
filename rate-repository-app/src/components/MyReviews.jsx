import { useMutation, useQuery } from "@apollo/client"
import { FlatList, View,Text, StyleSheet, Pressable, Alert } from "react-native"
import {  ReviewItem, ItemSeparator } from "./RepositoryReviews"
import { GET_ME } from "../graphql/queries"
import theme from "../theme"
import { Link,Navigate } from "react-router-native"
import { DELETE_REVIEW } from "../graphql/mutations"




const MyReviews =() => {
    const {data,loading,error, fetchMore} = useQuery(GET_ME,{variables:{
        "includeReviews": true,
    },
    fetchPolicy:'cache-and-network'
})
    const [deleteReview , deleteResult] = useMutation(DELETE_REVIEW,{errorPolicy:"all"
    })
    
    
    
    console.log("myReviews -no data",loading,error)

    console.log("deleteReview",deleteResult.data,deleteResult.loading,deleteResult.error)

    const style = StyleSheet.create({
        buttonContainer:{
            flexDirection:'row',
            paddingTop:5,
            paddingBottom:15,
            paddingHorizontal:10,
            backgroundColor:'white',
            justifyContent:'space-around'
        },
        button:{
            paddingHorizontal:20,
            paddingVertical:15,
            borderRadius:5,
            backgroundColor:theme.colors.primary
        },
        deleteButton:{
            paddingHorizontal:20,
            paddingVertical:15,
            borderRadius:5,
            backgroundColor:'#C61515'
        },
        textfont:{
            color:'white',
            fontSize:theme.fontSizes.subheading,
            fontWeight:theme.fontWeights.bold
        }
    })



    if (loading) {
        return (
          <Text> Loading...</Text>
        )
      }

      if (deleteResult.data && !deleteResult.loading && !deleteResult.error) {
        return (
          <Navigate to={`/`} />
        )
      }

      const handleFetchMore = () => {
        console.log('fetching more')
        const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
          variables: {
            after: data.me.reviews.pageInfo.endCursor,
            includeReviews:true,
            first:2
          },
        });
      };


    


    const reviewNode = data
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];


    const handleViewPress = (repoId) => {
        console.log('testPress')
        console.log(repoId)

    } 

    const handleDeleteReviewPress =  async (id) => {
        Alert.alert("Delete review","Are you sure you want to delete this review?",[
            {
                text:'OK',
        onPress: async ()=>{
            console.log(`ok to delete ${id}`)
            try {
                await deleteReview({variables:{deleteReviewId:id}})
            } catch (e) {
                console.log(e, "delete error")
            }
            
            
            
            
        
        }},
        {text:'Cancel',
        onPress:()=>console.log('cancel')
    }
        ])

    }



    return(
        <FlatList
        onEndReached={handleFetchMore}
     data={reviewNode} 
     renderItem={({item})=> { 
     return (<ReviewItem review={item}> 
     <View style={style.buttonContainer}> 
     <View style={style.button}>
     <Pressable >
        <Link to={`/${item.repositoryId}`}>
        <Text style={style.textfont}> View Repository </Text>
        </Link>
     </Pressable>
     </View>

     <View style={style.deleteButton}>
     <Pressable onPress={ ()=>  handleDeleteReviewPress(item.id)}>
        <Text style={style.textfont}> Delete Review </Text>
     </Pressable>
     </View>



     </View>
     </ReviewItem>)}}
     keyExtractor={({id})=> id}
     ItemSeparatorComponent={ItemSeparator}
    />
    )
}

export default MyReviews