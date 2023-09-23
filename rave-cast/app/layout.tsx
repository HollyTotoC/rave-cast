import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rave Cast",
    description:
        "Sur Rave-Cast, découvrez la météo des événements auxquels vous allez participer. Que ce soit un concert en plein air, un festival, un spectacle ou tout autre rassemblement, assurez-vous de savoir comment vous habiller et quoi emporter.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
