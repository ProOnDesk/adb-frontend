import dynamic from 'next/dynamic';

const StationMap = dynamic(() => import('./StationMap'), {
	ssr: false,
});

export default StationMap;
