import { FaSpinner } from 'react-icons/fa';

export default function Spinner({ text }: { text?: string }) {
	return (
		<span className='flex flex-col gap-2 justify-center items-center'>
			<FaSpinner className='animate-spin text-3xl ' />
			<span>{text}</span>
		</span>
	);
}
