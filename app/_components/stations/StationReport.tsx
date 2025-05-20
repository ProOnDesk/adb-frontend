'use client';

import { Station } from '@/app/lib/getStationsWithFiltersClient';
import Modal from '../ui/Modal';
import ReportModal from './ReportModal';

export default function StationReport({ station }: { station: Station }) {
	return (
		<Modal>
			<Modal.Open opens='generateModal'>
				<button
					type='submit'
					className='px-4 py-2 mx-2 w-fit bg-blue-500 text-white rounded hover:bg-blue-600 transition'
				>
					Generuj raport
				</button>
			</Modal.Open>
			<Modal.Window name='generateModal'>
				<ReportModal station={station} onCloseModal={() => undefined} />
			</Modal.Window>
		</Modal>
	);
}
