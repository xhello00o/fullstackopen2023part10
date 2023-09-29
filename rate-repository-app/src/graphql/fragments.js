import { gql } from "@apollo/client";


export const REPOSITORY_NODE = gql`
fragment RepositoryNode on Repository {
    name
    createdAt
    description
    forksCount
    fullName
    id
    language
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    url
}
`

export const USER_NODE = gql`
fragment UserNode on User {
    id
    username
  }
`

export const REVIEW_NODE = gql`
${USER_NODE}
fragment ReviewNode on Review {
    repositoryId
    createdAt
    rating
    id
    text
    user {
        ...UserNode
    }
  }
`

