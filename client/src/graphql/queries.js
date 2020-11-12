import { gql } from '@apollo/client';

const QUES_DETAILS = gql`
  fragment QuesDetails on QuestionList {
    id
    author {
      id
      username
    }
    title
    body
    tags
    points
    views
    createdAt
    updatedAt
  }
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

export const GET_ALL_TAGS = gql`
  query {
    getAllTags {
      tagName
      count
    }
  }
`;
