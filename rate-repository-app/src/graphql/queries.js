import { gql } from "@apollo/client";
import { REPOSITORY_NODE, REVIEW_NODE } from "./fragments";

export const GET_ALL_REPOSITORIES = gql`
  ${REPOSITORY_NODE}
  query (
    $searchKeyword: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $after: String
    $first: Int
  ) {
    repositories(
      searchKeyword: $searchKeyword
      orderBy: $orderBy
      orderDirection: $orderDirection,
      after: $after,
      first: $first

    ) {
      edges {
        node {
          ...RepositoryNode
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_ME = gql`
${REVIEW_NODE}
query getCurrentUser($includeReviews:Boolean = true, $first: Int) {
  me {
    id
    username
    reviews(first: $first) @include(if: $includeReviews) {
    edges {
      node {
        ...ReviewNode
      }
      cursor
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      startCursor
    }
      
    }
  }
}
`;

export const GET_REPOSITORY_BY_ID = gql`
  ${REPOSITORY_NODE}
  ${REVIEW_NODE}
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryNode
      reviews (first: $first, after: $after) {
        edges {
          node {
            ...ReviewNode
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
