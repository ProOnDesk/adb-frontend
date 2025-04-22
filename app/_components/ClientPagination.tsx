'use client';

import { useState } from 'react';

export default function ClientPagination({
	page,
	pages = 1,
	setPage,
}: {
	page: number;
	pages: number | undefined;
	setPage: (page: number) => void;
}) {
	const [inputPage, setInputPage] = useState(page);
	function goToPage(newPage: number) {
		if (newPage < 1 || newPage > pages) return;
		setPage(newPage);
	}

	return (
		<div className='mt-4 flex flex-col md:flex-row items-center justify-center gap-4'>
			{page > 1 && (
				<button
					onClick={() => goToPage(page - 1)}
					className='px-4 py-2 border rounded hover:bg-gray-200 transition'
				>
					« Poprzednia
				</button>
			)}

			<span className='text-gray-700'>
				Strona <strong>{page}</strong> z <strong>{pages}</strong>
			</span>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					goToPage(inputPage);
				}}
				className='flex items-center gap-2'
			>
				<input
					type='number'
					min={1}
					max={pages}
					value={inputPage}
					onChange={(e) => setInputPage(Number(e.target.value))}
					className='w-20 border rounded px-2 py-1 text-center'
				/>
				<button
					type='submit'
					className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
				>
					Idź
				</button>
			</form>

			{page < pages && (
				<button
					onClick={() => goToPage(page + 1)}
					className='px-4 py-2 border rounded hover:bg-gray-200 transition'
				>
					Następna »
				</button>
			)}
		</div>
	);
}
