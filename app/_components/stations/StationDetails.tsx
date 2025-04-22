'use client';

import { useStation } from '@/app/_hooks/useStation';
import Spinner from '../Spinner';

interface StationDetailsProps {
    stationCode: string;
}

export default function StationDetails({ stationCode }: StationDetailsProps) {
    const { data, isFetching } = useStation({ station_code: stationCode });

    if (isFetching) {
        return (
            <div className='py-10 flex justify-center items-center'>
                <Spinner text='Ładowanie informacji o stacji...' />
            </div>
        );
    }

    if (!data) {
        return (
            <div className='py-10 text-center'>
                <p className='text-red-500 font-semibold'>Nie znaleziono informacji o stacji.</p>
            </div>
        );
    }
    console.log(data?.count_working_sensors);

    return (
        <div className='p-6'>
            <p className='text-2xl font-bold mb-6 text-gray-800'>
                Informacje o stacji <span className='text-blue-600'>{data.name}</span>
            </p>
            <ul className='list-disc pl-5 space-y-2 text-gray-700'>
                <li><span className='font-semibold'>Kod stacji:</span> {data.code}</li>
                <li><span className='font-semibold'>Nazwa:</span> {data.name}</li>
                <li><span className='font-semibold'>Data rozpoczęcia:</span> {data.start_date}</li>
                <li><span className='font-semibold'>Data zakończenia:</span> {data.end_date || 'Brak'}</li>
                <li><span className='font-semibold'>Typ stacji:</span> {data.station_type}</li>
                <li><span className='font-semibold'>Typ obszaru:</span> {data.area_type}</li>
                <li><span className='font-semibold'>Rodzaj stacji:</span> {data.station_kind}</li>
                <li><span className='font-semibold'>Województwo:</span> {data.voivodeship}</li>
                <li><span className='font-semibold'>Miasto:</span> {data.city}</li>
                <li><span className='font-semibold'>Adres:</span> {data.address}</li>
                <li><span className='font-semibold'>Szerokość geograficzna:</span> {data.latitude}</li>
                <li><span className='font-semibold'>Długość geograficzna:</span> {data.longitude}</li>
                <li><span className='font-semibold'>Liczba działających czujników:</span> {data.count_working_sensors}</li>
            </ul>
        </div>
    );
}
