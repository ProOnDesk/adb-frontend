'use client';
import { useRouter } from 'next/navigation';

export default function ReturnToStationButton() {
	const router = useRouter();

	const handleGoBack = () => {
		router.back();
	};

	return (
		<button
			onClick={handleGoBack}
			className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
		>
			Wróć do listu stacji
		</button>
	);
}
