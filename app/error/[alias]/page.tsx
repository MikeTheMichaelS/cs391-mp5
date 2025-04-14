"use client";
import { useParams } from "next/navigation";
import styled from "styled-components";

const StyledDiv = styled.div`
    height: 100%;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const StyledH1 = styled.h1`
    font-size: calc(10px + 2vw);
    color: red;
`;

const StyledP = styled.p`
    font-size: calc(8px + 1vw);
    color: black;
`;

export default function ErrorPage() {
    const alias = useParams().alias as string;
    return (
        <StyledDiv>
            <StyledH1>Oops! URL not found.</StyledH1>
            <StyledP>The URL you are looking for with the alias <strong>{alias}</strong> does not exist.</StyledP>
            <StyledP>Please check the alias and try again.</StyledP>
        </StyledDiv>
    );
}