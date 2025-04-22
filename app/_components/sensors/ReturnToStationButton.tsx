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
			className='text-blue-500 hover:underline mb-4 inline-block'
		>
			← Powrót do listy stacji
		</button>
	);
}
