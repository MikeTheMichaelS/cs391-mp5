"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ALIAS_API_URL = process.env.NEXT_PUBLIC_API_URL as string + "/";

const MyStyledDiv = styled.div`
    min-height: 75%;
    min-width: 75%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export default function AliasInput() {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const alias = e.currentTarget.alias.value;
        const longUrl = e.currentTarget.longUrl.value;
        try {
            const res = await fetch(`${ALIAS_API_URL}${alias}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ longUrl: longUrl, alias: alias }),
            }
            );
            const data = await res.json();
            if (data.success) {
                router.push(`/success/${alias}`);
            } else {
                router.push(`/error/${alias}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const urlPattern = new RegExp(
        "^https?:\\/\\/[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(/[\\S]*)?$"
    );

    const [alias, setAlias] = useState<string>("");
    const [aliasError, setAliasError] = useState<boolean>(false);

    const [longUrl, setLongUrl] = useState<string>("");
    const [longUrlError, setLongUrlError] = useState<boolean>(false);

    useEffect(() => {
        async function checkAlias(alias: string, setAliasError: React.Dispatch<React.SetStateAction<boolean>>) {
            if (alias === "") {
                setAliasError(false);
                return;
            }

            const response = await fetch(`${ALIAS_API_URL}${alias}`);
            const data = await response.json();

            if (data.occupied) {
                setAliasError(true);
            } else {
                setAliasError(false);
            }
        };
        checkAlias(alias, setAliasError);
    }, [alias]);

    useEffect(() => {
        async function checkLongUrl(longUrl: string) {
            if (urlPattern.test(longUrl.toLowerCase())) {
                setLongUrlError(false);
            } else {
                setLongUrlError(true);
            }
        };
        checkLongUrl(longUrl);
    }, [longUrl]);

    return (
        <MyStyledDiv>
            <h1 className="text-2xl font-bold mb-4 text-stone-950">Shorten Your URL</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="longUrl"
                    label="Long URL"
                    variant="outlined"
                    error={longUrlError}
                    helperText={longUrlError ? "Invalid URL" : ""}
                    onBlur={(e) => setLongUrl(e.target.value)}
                    sx={{ display: "block", width: "100%", marginBottom: 2, marginTop: 2 }}
                />
                <TextField
                    id="alias"
                    label="Alias"
                    variant="outlined"
                    error={aliasError}
                    helperText={aliasError ? "Alias already taken" : ""}
                    onBlur={(e) => setAlias(e.target.value)}
                    sx={{ display: "block", width: "100%", marginBottom: 2, marginTop: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={aliasError || longUrlError}
                    sx={{ display: "block", width: "100%", marginBottom: 2, marginTop: 2 }}
                >
                    Shorten URL
                </Button>
            </form>
        </MyStyledDiv>
    );
}