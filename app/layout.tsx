import type { Metadata } from 'next';
import './globals.css';
import Setup from './_utils/Setup';

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
		<html lang='pl'>
			<body>
				<Setup>{children}</Setup>
			</body>
		</html>
	);
}
