import { gql } from '@apollo/client';

const CREATE_CLASS = gql`
  mutation CreateClass($className: String!) {
    createClass(createClassInput: { className: $className }) {
      id
      className
    }
  }
`;

const GET_ALL_CLASSES = gql`
  query findAllClasses {
    findAllClasses {
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

const REMOVE_A_CLASS = gql`
  mutation RemoveClass($id: String!) {
    removeClass(id: $id) {
      message
    }
  }
`;

export { CREATE_CLASS, GET_ALL_CLASSES, GET_CLASS_BYID, REMOVE_A_CLASS };
