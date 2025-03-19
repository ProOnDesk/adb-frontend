import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'ADB - Project',
	description: 'Projekt z przedmiotu Analiza Danych Biznesowych',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={``}>{children}</body>
		</html>
	);
}
