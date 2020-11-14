import { gql } from '@apollo/client';

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    username
  }
`;

const QUES_DETAILS = gql`
  fragment QuesDetails on QuestionList {
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
  }
  ${AUTHOR_DETAILS}
`;

const COMMENT_DETAILS = gql`
  fragment CommentDetails on Comment {
    id
    author {
      ...AuthorDetails
    }
    body
    createdAt
    updatedAt
  }
  ${AUTHOR_DETAILS}
`;

const ANS_DETAILS = gql`
  fragment AnsDetails on Answer {
    id
    author {
      ...AuthorDetails
    }
    body
    comments {
      ...CommentDetails
    }
    points
    upvotedBy
    downvotedBy
    createdAt
    updatedAt
  }
  ${COMMENT_DETAILS}
  ${AUTHOR_DETAILS}
`;

export const GET_QUESTIONS = gql`
  query fetchQuestions(
    $sortBy: SortByType!
    $page: Int!
    $limit: Int!
    $filterByTag: String
  ) {
    getQuestions(
      sortBy: $sortBy
      page: $page
      limit: $limit
      filterByTag: $filterByTag
    ) {
      next {
        page
      }
      previous {
        page
      }
      questions {
        ...QuesDetails
        answerCount
      }
    }
  }
  ${QUES_DETAILS}
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
        ...AnsDetails
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

  ${ANS_DETAILS}
  ${COMMENT_DETAILS}
  ${AUTHOR_DETAILS}
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
