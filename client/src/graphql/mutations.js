import { gql } from '@apollo/client';
import {
  QUESTION_DETAILS,
  LOGGED_USER_DETAILS,
  COMMENT_DETAILS,
} from './fragments';

export const REGISTER_USER = gql`
  mutation registerUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      ...LoggedUserDetails
    }
  }
  ${LOGGED_USER_DETAILS}
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...LoggedUserDetails
    }
  }
  ${LOGGED_USER_DETAILS}
`;

export const POST_QUESTION = gql`
  mutation addQuestion($title: String!, $body: String!, $tags: [String!]!) {
    postQuestion(title: $title, body: $body, tags: $tags) {
      ...QuestionDetails
    }
  }
  ${QUESTION_DETAILS}
`;

export const EDIT_QUESTION = gql`
  mutation updateQuestion(
    $quesId: ID!
    $title: String!
    $body: String!
    $tags: [String!]!
  ) {
    editQuestion(quesId: $quesId, title: $title, body: $body, tags: $tags) {
      ...QuestionDetails
    }
  }
  ${QUESTION_DETAILS}
`;

export const DELETE_QUESTION = gql`
  mutation removeQuestion($quesId: ID!) {
    deleteQuestion(quesId: $quesId)
  }
`;

export const VOTE_QUESTION = gql`
  mutation submitVote($quesId: ID!, $voteType: VoteType!) {
    voteQuestion(quesId: $quesId, voteType: $voteType) {
      ...QuestionDetails
    }
  }
  ${QUESTION_DETAILS}
`;

export const ADD_QUES_COMMENT = gql`
  mutation postQuesComment($quesId: ID!, $body: String!) {
    addQuesComment(quesId: $quesId, body: $body) {
      ...CommentDetails
    }
  }
  ${COMMENT_DETAILS}
`;

export const EDIT_QUES_COMMENT = gql`
  mutation updateQuesComment($quesId: ID!, $commentId: ID!, $body: String!) {
    editQuesComment(quesId: $quesId, commentId: $commentId, body: $body) {
      ...CommentDetails
    }
  }
  ${COMMENT_DETAILS}
`;
