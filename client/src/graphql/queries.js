import { gql } from '@apollo/client';
import { AUTHOR_DETAILS, COMMENT_DETAILS, ANSWER_DETAILS } from './fragments';

export const GET_QUESTIONS = gql`
  query fetchQuestions(
    $sortBy: SortByType!
    $page: Int!
    $limit: Int!
    $filterByTag: String
    $filterBySearch: String
  ) {
    getQuestions(
      sortBy: $sortBy
      page: $page
      limit: $limit
      filterByTag: $filterByTag
      filterBySearch: $filterBySearch
    ) {
      next {
        page
      }
      previous {
        page
      }
      questions {
        id
        author {
          ...AuthorDetails
        }
        title
        body
        tags
        points
        views
        createdAt
        updatedAt
        answerCount
      }
    }
  }
  ${AUTHOR_DETAILS}
`;

export const VIEW_QUESTION = gql`
  query fetchQuestion($quesId: ID!) {
    viewQuestion(quesId: $quesId) {
      id
      author {
        ...AuthorDetails
      }
      title
      body
      tags
      points
      views
      createdAt
      updatedAt
      answers {
        ...AnswerDetails
      }
      author {
        ...AuthorDetails
      }
      comments {
        ...CommentDetails
      }
      acceptedAnswer
      upvotedBy
      downvotedBy
    }
  }

  ${ANSWER_DETAILS}
  ${COMMENT_DETAILS}
  ${AUTHOR_DETAILS}
`;

export const GET_USER = gql`
  query fetchUser($username: String!) {
    getUser(username: $username) {
      id
      username
      role
      createdAt
      reputation
      totalQuestions
      totalAnswers
      recentQuestions {
        id
        title
        points
        createdAt
      }
      recentAnswers {
        id
        title
        points
        createdAt
      }
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query {
    getAllTags {
      tagName
      count
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      username
      createdAt
    }
  }
`;
