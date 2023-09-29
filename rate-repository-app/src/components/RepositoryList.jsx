import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_REPOSITORIES } from '../graphql/queries';
import Filter from './Filter';
import React from 'react';
import {useDebouncedCallback} from 'use-debounce'




const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

});



export const ItemSeparator = () => <View style={styles.separator} />;
export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;
    const { refetch, selected, setSelected, search, setSearch,debounced } = props

    // ...

    return (
      <Filter 
          refetch={refetch} 
          selected={selected} 
          setSelected={setSelected} 
          search={search}
          setSearch={setSearch}
          debounced={debounced}/>
    );
  };

  render() {
    const {repositories,handleEnd} = this.props

    const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
    return (

      <FlatList testID='repositoryContainer'
      onEndReached={handleEnd}
      ListHeaderComponent={this.renderHeader
      }
      data={repositoryNodes}
      renderItem={RepositoryItem}
      keyExtractor={repo => repo.id}
      ItemSeparatorComponent={ItemSeparator}
    // other props
    />
    );
  }
}




const RepositoryList = () => {
  const { loading, data, error, refetch,fetchMore } = useQuery(GET_ALL_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
      first:4
    }
  })
  const [selected, setSelected] = useState("")
  const [search, setSearch] = useState('')
  const debounced = useDebouncedCallback((variables)=>{
    console.log('debounced', variables)
    refetch(variables)
  },1500)

  const handleFetchMore = () => {
    console.log('fetching more')
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        first:2
      },
    });
  };




  console.log(loading, "loading list")


  if (loading) {
    return (
      <Text> Loading...</Text>
    )
  }





  return (

    <RepositoryListContainer
      handleEnd={handleFetchMore}
      repositories={data.repositories}
      refetch={refetch}
      selected={selected}
      setSelected={setSelected}
      search={search}
      setSearch={setSearch} 
      debounced={debounced}
      />
  );
};

export default RepositoryList;