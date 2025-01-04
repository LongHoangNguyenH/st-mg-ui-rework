import { gql } from '@apollo/client';

const CREATECLASS = gql`
  mutation CreateClass($createClassInput: CreateClassInput!) {
    create(createClassInput: $createClassInput) {
      id
      className
    }
  }
`;

const GETALLCLASSES = gql`
  query getAllClasses {
    findAll {
      className
      id
    }
  }
`;

const GETCLASSBYID = gql`
  query findClassById($id: String!) {
    findOne(id: $id) {
      id
      className
    }
  }
`;

export { CREATECLASS, GETALLCLASSES, GETCLASSBYID };
