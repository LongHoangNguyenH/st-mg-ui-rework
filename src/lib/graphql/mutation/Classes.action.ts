import { gql } from '@apollo/client';

const CREATECLASS = gql`
  mutation {
    create(createClassInput: { className: "jwat24.05" }) {
      className
    }
  }
`;

const GETALLCLASSES = gql`
  query {
    findAll {
      className,
      id
    }
  }
`;

export { CREATECLASS, GETALLCLASSES };
