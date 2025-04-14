import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-blue-500 text-white p-4">
            <Link href="/">
                <h1 className="text-2xl">CS391-URI_Shortener</h1>
            </Link>
        </header>
    );
}