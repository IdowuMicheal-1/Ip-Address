import React, { useState,useEffect } from 'react';
import arrow from '../assets/images/icon-arrow.svg';
import { ExternalStateExample } from './ExternalStateExample';

const Main = () => {
    const [lat, setLat] = useState(0);  // Default to 0 initially
    const [lng, setLng] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [ipAddress, setIpAddress] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_hm6ucTpxSDTDCQuNidcB5Ppwp3Jiw`);
                if (!response.ok) throw new Error('Error fetching user location');
                const data = await response.json();
                
                setLat(data?.location?.lat || 0);
                setLng(data?.location?.lng || 0);
                setData(data);
                setIpAddress(data?.ip || '');
                setIpAddress('');
            } catch (error) {
                console.error(error);
                setError('Error fetching user location.');
            } finally {
                setLoading(false);
            }
        };
        fetchUserLocation();
    }, []);

    const fetchCountry = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_hm6ucTpxSDTDCQuNidcB5Ppwp3Jiw&ipAddress=${ipAddress}`);
            if (!response.ok) throw new Error('Error fetching IP address data');
            const data = await response.json();

            setLat(data?.location?.lat || lat);
            setLng(data?.location?.lng || lng);
        
            setData(data);
            setIpAddress('');
        } catch (error) {
            setError('Error fetching or processing data for the IP address.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='bg-top-Smheader object-cover bg-cover bg-no-repeat w-screen md:bg-top-Lgheader relative h-[300px] z-30'>
                <div className='py-4 w-full flex flex-col items-center justify-center'>
                    <h4 className='font-sans text-lg text-white font-semibold text-center lg:text-2xl'>IP Address Tracker</h4>
                    <div className='relative'>
                        <form onSubmit={fetchCountry}>
                            <input
                                type='text'
                                value={ipAddress}
                                onChange={(e) => setIpAddress(e.target.value)}
                                className='rounded-xl h-14 my-6 w-80 lg:h-10 lg:w-96 px-3 placeholder:text-sm'
                                placeholder='Search for any IP address or domain'
                            />
                            {loading ? (
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                        Loading...
                                    </span>
                                </div>
                            ) : (
                                <img src={arrow} alt='arrow' className='bg-black p-[21px] rounded-r-xl absolute right-0 top-0 bottom-0 mt-[24px] lg:p-[13px]' />
                            )}
                        </form>
                        {error && <p className='text-red-500'>{error}</p>}
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow-lg max-w-[21rem] mx-auto relative transform translate-y-1 flex flex-col justify-center items-center py-4 space-y-4 lg:space-y-0 lg:flex-row lg:max-w-[58rem] lg:space-x-8 lg:h-28 lg:translate-y-20 z-10'>
                    <div className='items-center align-center flex flex-col lg:border-r-2 px-6'>
                        <h5 className='text-darkGray font-semibold'>IP ADDRESS</h5>
                        <h3 className='text-xl font-sans font-semibold text-verDarkGray'>{data?.ip || '8.8.8.8'}</h3>
                    </div>
                    <div className='items-center align-center flex flex-col lg:border-r-2 px-6'>
                        <h5 className='text-darkGray font-semibold'>LOCATION</h5>
                        <h3 className='text-xl font-sans font-semibold text-verDarkGray'>{data?.location?.region || 'Brooklyn'}{' '}{data?.location?.country || 'NY'}{' '}{data?.location?.city || 10001}</h3>
                    </div>
                    <div className='items-center align-center flex flex-col lg:border-r-2 px-6'>
                        <h5 className='text-darkGray font-semibold'>TIMEZONE</h5>
                        <h3 className='text-xl font-sans font-semibold text-verDarkGray'>{data?.location?.timezone || '-UTC -5:00'} </h3>
                    </div>
                    <div className='items-center align-center flex flex-col px-6'>
                        <h5 className='text-darkGray font-semibold'>ISP</h5>
                        <h3 className='text-xl font-sans font-semibold text-verDarkGray'>{data?.isp || 'SpaceX Starlink'}</h3>
                    </div>
                </div>
            </div>
            
            <div className='relative z-0'>

               <ExternalStateExample lat={lat} lng={lng} />
            </div>
        </div>
    );
};

export default Main;
