import styled from "@emotion/styled";
import React from "react";

// interface FieldSetProps {
//   label?: string;
//   children: React.ReactNode;
// }
const FieldSet = ({ label, children }) => {
  return (
    <Container>
      {label && <Legend>{label}</Legend>}
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

const Container = styled.fieldset`
  margin: 16px 0;
  padding: 0;
  border: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: self-start;
`;

const Legend = styled.legend`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export default FieldSet;