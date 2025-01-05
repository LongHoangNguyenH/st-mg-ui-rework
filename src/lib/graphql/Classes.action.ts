import { gql } from '@apollo/client';

const CREATE_CLASS = gql`
  mutation CreateClass($createClassInput: CreateClassInput!) {
    create(createClassInput: $createClassInput) {
      id
      className
    }
  }
`;

const GET_ALL_CLASSES = gql`
  query findAllClass{
    findAll {
      className
      id
    }
  }
`;

const GET_CLASS_BYID = gql`
  query findClassById($id: String!) {
    findOne(id: $id) {
      id
      className
    }
  }
`;

export { CREATE_CLASS, GET_ALL_CLASSES, GET_CLASS_BYID };
