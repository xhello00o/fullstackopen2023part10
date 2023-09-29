import { useQuery } from "@apollo/client"
import { GET_REPOSITORY_BY_ID } from "../graphql/queries"
import { useParams } from "react-router-native"
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { RepositoryItemContainer } from "./RepositoryItem"
import theme from "../theme"
import * as Linking from 'expo-linking';




const repoReviewStyles = StyleSheet.create({
  ButtonStyle: {
    backgroundColor:'#1571CF',
    color:'white',
    flexDirection:'column',
    textAlign:'center',
    textAlignVertical:'center',
    height:30,
    borderRadius:20,
    fontSize:theme.fontSizes.body,
    fontWeight:theme.fontWeights.bold
  },
  ReviewItemContainer:{
    flexDirection:'row',
    padding:10,
    flexgrow:0,
    alignContent:'flex-start',
    backgroundColor:'white',
  },
  ReviewRatingContainter:{
    flexGrow:0,
    borderColor:'blue',
    borderWidth:3
  },
  ReviewRating:{
    borderColor:theme.colors.primary,
    borderWidth:5,
    width:50,
    height:50,
    textAlign:'center',
    textAlignVertical:'center',
    borderRadius: 50/2,
  },
  
  ReviewTextContainer:{
    flex:1,
    flexGrow:1,
    flexWrap:'wrap',
    flexDirection:'column',
    borderColor:'pink',
    borderWidth:5,
    alignContent:'stretch',
  },
  ReviewHeadingContainer:{
    flexGrow:1,
    flexDirection:"column"
  },
  ReviewBodyContainer:{
    flexGrow:1,
    flexWrap:'wrap',
    flexDirection:'row',
    alignContent:'flex-start',
    justifyContent:'flex-start',
    borderColor:'blue',
    borderWidth:3,
    paddingTop:5
  },
  ReviewHeaderText:{
    fontWeight:theme.fontWeights.bold

  },
  ReviewSecondaryText:{
    fontWeight:theme.fontWeights.normal
  },

  ReviewBodyText:{
    fontWeight:theme.fontWeights.normal,
    flexWrap:'wrap',
    flexDirection:'row',

  }

})

export const RepositoryInfo = ({data}) =>{
  
  
  const handleButtonPress= ()=>{
    console.log('opening link to github')
    Linking.openURL(data.repository.url)
  }

  return(
    <View>
      <RepositoryItemContainer item={data.repository} key={data.repository.id}>
        <Pressable onPress={handleButtonPress}>
          <Text style={repoReviewStyles.ButtonStyle}>
            Open in GitHub
          </Text>
        </Pressable>
      </RepositoryItemContainer>
      <ItemSeparator/>
    </View>
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



export const ItemSeparator = () => <View style={styles.separator} />;



export const ReviewItem = ({review,children}) => {

  const date = review.createdAt


  return(
    <View>
    <View style={repoReviewStyles.ReviewItemContainer}>
    <View style={repoReviewStyles.ReviewRatingContainter}>
      
        <Text style={repoReviewStyles.ReviewRating}> {review.rating} </Text>

    </View>
    <View style={repoReviewStyles.ReviewTextContainer}> 
    <View style={repoReviewStyles.ReviewHeadingContainer}>
      <Text style={repoReviewStyles.ReviewHeaderText}>
        {review.user.username}
      </Text>
      <Text style={repoReviewStyles.ReviewSecondaryText}> {date}</Text>
      </View>
      <View style ={ repoReviewStyles.ReviewBodyContainer}>
        <Text style={repoReviewStyles.ReviewBodyText}> {review.text}</Text>
      </View>

    </View>
    

    </View>
    {children}
    </View>

  )
}

export const RepositoryReviewsContainer = ({data,handleEnd}) => {

  const reviewNode = data
    ? data.repository.reviews.edges.map(edge => edge.node)
    : [];


  return(
    <FlatList
    onEndReached={handleEnd}
     data={reviewNode} 
     ListHeaderComponent={()=><RepositoryInfo data={data}/>}
     renderItem={({item})=> <ReviewItem review={item}/>}
     keyExtractor={({id})=> id}
     ItemSeparatorComponent={ItemSeparator}
    />

  )
}
const RepositoryReviews = () => {
  const repoId = useParams().id
  const {loading,data,error,fetchMore} = useQuery(GET_REPOSITORY_BY_ID,
    {
      variables: {
        repositoryId: repoId,
        first:2
      },
      fetchPolicy:"cache-and-network"
    })


    if (loading) {
      return (
        <Text> Loading...</Text>
      )
    }

    const handleFetchMore = () => {
      console.log('fetching more')
      const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
  
      if (!canFetchMore) {
        return;
      }
  
      fetchMore({
        variables: {
          after: data.repository.reviews.pageInfo.endCursor,
          first:2
        },
      });
    };

    



  return (
    <RepositoryReviewsContainer data={data} handleEnd={handleFetchMore}/>

  )
}

export default RepositoryReviews