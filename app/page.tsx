"use client"

import AliasInput from '@/components/AliasInput';
import styled from 'styled-components';


const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
`;

const StyledH1 = styled.h1`
  color: black;
  font-size: calc(10px + 2vw);
  margin-bottom: 2vh;
`;

const StyledP = styled.p`
  color: black;
  font-size: calc(10px + 1vw);
  margin-bottom: 2vh;
`;

export default function Home() {
  return (
    <StyledMain>
      <StyledH1>URL Shortener</StyledH1>
      <StyledP>Shorten your url for better shareability.</StyledP>
      <AliasInput />
    </StyledMain>
  );
}
