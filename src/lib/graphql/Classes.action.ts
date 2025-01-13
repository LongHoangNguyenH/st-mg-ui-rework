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
  query findOneClass($id: String!) {
    findOneClass(id: $id) {
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

const UPDATE_CLASS = gql`
  mutation UpdateClass($id: String!, $className: String!) {
    updateClass(id: $id, updateClassInput: { className: $className }) {
      id
      className
    }
  }
`;

export { CREATE_CLASS, GET_ALL_CLASSES, GET_CLASS_BYID, REMOVE_A_CLASS, UPDATE_CLASS };
