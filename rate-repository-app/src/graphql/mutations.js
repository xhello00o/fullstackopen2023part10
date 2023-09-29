import { gql } from '@apollo/client';

export const SIGN_IN = gql`
mutation($credentials: AuthenticateInput) {
    authenticate (credentials: $credentials) {
      accessToken
    }
  }
`

export const CREATE_REVIEW =gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    createdAt
    id
    repositoryId
  }
}
`

export const CREATE_USER = gql`
mutation Mutation($user: CreateUserInput) {
  createUser(user: $user) {
    id
    username
    createdAt
  }
}
`
export const DELETE_REVIEW =gql`
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId) 
}
`