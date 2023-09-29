import { Text, View, Image, StyleSheet, Pressable } from "react-native"
import theme from "../theme";
import { Link } from "react-router-native";



const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 0,
    alignItems:'flex-start',
    paddingBottom:10,
    borderColor:'black',
  },
  avatar: {
    width: 45,
    height: 45
  },
  avatarContainer: {
    flexGrow: 0,
    paddingHorizontal: 15
  },
  infoContainer: {
    flexGrow: 1,
    flex:1,
    borderWidth:3,
    borderColor:'blue'
  },
  infoContainerSecondary: {
    flexGrow: 0,
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  subheadingText: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading
  },
  secondaryText: {
    fontStyle:'italic',
    color:theme.colors.textSecondary,
    fontSize:theme.fontSizes.body
  },
  languageChip:{
    
    flexDirection:"row"
  },
  languageChipText:{
    paddingVertical:3,
    paddingHorizontal:5,
    backgroundColor:'#1571CF',
    color:'white',
    borderRadius:5,
    fontSize: theme.fontSizes.body
  }

});

const CardHeader = ({ item }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image style={cardHeaderStyles.avatar} source={{
          uri: item.ownerAvatarUrl,
        }} />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text style={cardHeaderStyles.subheadingText}>{item.fullName}</Text>
        <View style={cardHeaderStyles.infoContainerSecondary}>
          <Text style={cardHeaderStyles.secondaryText}>{item.description}</Text>
        </View>
        <View style={cardHeaderStyles.languageChip}>
          <Text style={cardHeaderStyles.languageChipText}>{item.language} </Text>
        </View>
      </View>
    </View>
  );
};

const cardBodyStyles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: 'pink'
  }
});

const CardBody = ({ item }) => {
  console.log("body")
  return (
    <View style={cardBodyStyles.container}>
      <Text> 
      </Text>
    </View>
  );
};

const cardFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    paddingBottom:10
  },
  actionTouchable: {
    flexGrow: 0,
    flexDirection: 'column',
    alignItems: 'center'
  },
  actionText: {
    fontWeight: theme.fontWeights.bold,
    fontSize:theme.fontSizes.body
  },
  normalText :{
    fontWeight: theme.fontWeights.normal,
    fontSize:theme.fontSizes.body
  }
});

const CardFooterAction = ({ title, children, ...props }) => {
  let numShown 
  if ( children >= 1000){
    numShown = `${(children/1000).toFixed(1)} k`
  }
  else {
    numShown = children
  }

  return (
    <View style={cardFooterStyles.actionTouchable} {...props}>
      <Text style={cardFooterStyles.actionText}>{numShown}</Text>
      <Text style={cardFooterStyles.normalText}>{title} </Text>
    </View>
  )
};

const CardFooter = ({ item }) => {
  return (
    <View style={cardFooterStyles.container}>

      <CardFooterAction title={"Stars"}>
        {item.stargazersCount}
      </CardFooterAction>
      <CardFooterAction title={"Forks"}>
        {item.forksCount}
      </CardFooterAction>
      <CardFooterAction title={"Reviews"}>
        {item.reviewCount}
      </CardFooterAction>
      <CardFooterAction title={"Rating"}>
        {item.ratingAverage}
      </CardFooterAction>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 12,
  },
});

export const RepositoryItemContainer = ({item,children}) =>{
  

  return(
    <View testID="repositoryItem" style={cardStyles.container}>
      <CardHeader item={item} />
      <CardFooter item={item} />
      {children}
    </View>
  )
}

const RepositoryItem = ({ item }) => {


  return (
    <Pressable >
      <Link to={`/${item.id}`}>
      <RepositoryItemContainer item={item}/>
    </Link>
    </Pressable>
  )
}



export default RepositoryItem