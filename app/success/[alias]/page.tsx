"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import styled from "styled-components";

const StyledDiv = styled.div`
    min-height: 100%;
    min-width: 100%;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export default function SuccessPage() {
    const param = useParams().alias;
    return (
        <StyledDiv>
            <h1>Success!</h1>
            <p>Your URL has been successfully shortened.</p>
            <p>Your shortened URL is {" "}
                <Link href={`/r/${param}`}>
                    {process.env.NEXT_PUBLIC_BASE_URL}/r/{param}
                </Link>
            </p>
        </StyledDiv>
    );
}