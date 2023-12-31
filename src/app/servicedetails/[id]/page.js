'use client';
import Container from '@/Common/Container';
import { merriweather } from '@/Utils/Font';
import LoadingPage from '@/shared/Loading';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ServiceDetailsPage = ({ params }) => {
	const [details, setDetails] = useState({});
	const [lawyers, setLawyers] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			const res = await axios('/api/lawyer');
			const response = await axios(`/api/services/${params?.id}`);
			setDetails(response?.data);
			setLawyers(res?.data);
			if (response?.data && res?.data) {
				setLoading(false);
			}
		})();
	}, [params]);

	const { description, service } = details || {};
	return (
		<div className="-mt-24">
			<div className="service_banner_bg_image h-[450px] text-white flex items-end justify-center">
				<div className={`${merriweather.className} text-center mb-20`}>
					<h2 className="text-5xl">{service}</h2>
				</div>
			</div>
			<Container>
				{loading ? (
					<LoadingPage></LoadingPage>
				) : (
					<div className="my-20 bg-[#225559cc] p-3 md:p-10 rounded-lg ">
						<div className="grid md:grid-cols-2 gap-6">
							<div className="text-white md:border-r-2 border-white md:pr-5">
								<h2 className={`${merriweather.className} text-4xl`}>{service}</h2>
								<p className="text-lg mt-8 text-justify md:text-left">{description}</p>
							</div>
							<div className="">
								<h2 className={`${merriweather.className} text-4xl mb-8 text-white`}>Available Lawyer</h2>
								{lawyers.slice(0, 5).map((lawyer) => (
									<div key={lawyer?._id} className="flex rounded-md my-5 items-center gap-5 group">
										<Image src={lawyer?.image} alt="Lawyer image" width={150} height={50} className="w  rounded-lg" />
										<div className="">
											<Link
												href={`/lawyerdetails/${lawyer?._id}`}
												className={`${merriweather.className} text-white text-xl group-hover:underline`}
											>
												{lawyer?.name}
											</Link>
											<h4 className="text-[#ccbd99]">{lawyer?.title}</h4>
										</div>
									</div>
								))}
							</div>
						</div>
						<Link className="lc_btn w-fit mx-auto block mt-8" href={'/appointment'}>
							Appointment Now
						</Link>
					</div>
				)}
			</Container>
		</div>
	);
};

export default ServiceDetailsPage;
