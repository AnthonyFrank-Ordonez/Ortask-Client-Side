import { useToastError, useToastSuccess } from '@/hooks/notification';
import { useUpdateProfile } from '@/hooks/profile';
import { RootState } from '@/store/store';
import { getCroppedImage } from '@/utils';
import { profileSchema } from '@/utils/schema';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useSelector } from 'react-redux';
import FieldInfo from '../FieldInfo';

interface EditProfile {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfile = ({ setIsModalOpen }: EditProfile) => {
	const { user } = useSelector((state: RootState) => state.session);
	const queryClient = useQueryClient();
	const showErrorMesage = useToastError();
	const showSuccessMessage = useToastSuccess();
	const [showCropModal, setShowCropModal] = useState(false);
	const [originalImage, setOriginalImage] = useState<string | null>(null);
	const [croppedImage, setCroppedImage] = useState<string>('');
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const { mutateAsync: updateProfile } = useUpdateProfile();

	const fileInputRef = useRef<HTMLInputElement>(null);

	const form = useForm({
		defaultValues: {
			username: '',
			profilePicture: '',
		},
		validators: {
			onChange: profileSchema,
		},
		onSubmit: async ({ value }) => {
			const updatedProfile = {
				username: value.username,
				profilePicture: croppedImage,
			};
			await updateProfile(updatedProfile, {
				onSuccess: (data) => {
					console.log(data);
					queryClient.invalidateQueries({
						queryKey: ['user-profile', user?.id],
					});
					setIsModalOpen(false);
					showSuccessMessage('User profile updated successfully');
				},
				onError: (error: unknown) => {
					if (error instanceof AxiosError) {
						const errorMsg = error.response?.data.error;
						showErrorMesage(errorMsg);
					}
				},
			});
		},
	});

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			if (file.size > 5 * 1024 * 1024) {
				showErrorMesage('File exceeds 5MB upload smaller files!');
				return;
			}

			const reader = new FileReader();

			reader.onload = () => {
				setOriginalImage(reader.result as string);
				setShowCropModal(true);
			};

			reader.readAsDataURL(file);
		}
	};

	const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const createCroppedImage = async () => {
		try {
			if (!originalImage || !croppedAreaPixels) return;

			const croppedImage = await getCroppedImage(
				originalImage,
				croppedAreaPixels
			);

			setCroppedImage(croppedImage);

			// Place holder
			form.setFieldValue('profilePicture', 'cropped-image.jpg');

			setShowCropModal(false);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error Cropping Image: ', error);
				showErrorMesage('Error Cropping Image');
			}
		}
	};

	return (
		<>
			<div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center'>
				<div className='bg-primary p-6 rounded-lg shadow-lg max-w-md w-full'>
					<div className='flex justify-between items-center mb-5'>
						<h2 className='text-tertiary text-2xl font-bold'>Edit Profile</h2>
						<button
							onClick={closeModal}
							className='text-tertiary-500 hover:text-tertiary/20 hover:cursor-pointer'
						>
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>

					<form
						className='mb-4 flex flex-col space-x-2 gap-3'
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<div>
							<form.Field
								name='username'
								children={(field) => {
									return (
										<div>
											<label
												htmlFor='usernamne'
												className='block text-tertiary font-medium mb-2'
											>
												Username: <FieldInfo field={field} />
											</label>
											<input
												type='text'
												id={field.name}
												value={field.state.value}
												name={field.name}
												onChange={(e) => field.handleChange(e.target.value)}
												required
												className='px-3 py-1 border border-tertiary rounded-sm w-full text-tertiary '
											/>
										</div>
									);
								}}
							/>
						</div>

						<div>
							<form.Field
								name='profilePicture'
								children={(field) => {
									return (
										<div>
											<>
												<label
													htmlFor='profilePicture'
													className='block text-tertiary font-medium mb-2'
												>
													Profile Picture: <FieldInfo field={field} />
												</label>

												{/* Profile Image Viewer */}
												{croppedImage && (
													<div className='flex justify-center mb-3 mt-5'>
														<div className='w-24 h-24 rounded-full overflow-hidden border-2 border-tertiary'>
															<img
																src={croppedImage}
																alt='Profile Image'
																className='w-full h-full object-cover'
															/>
														</div>
													</div>
												)}

												<div className='flex items-center mt-5'>
													<input
														type='file'
														accept='image/*'
														ref={fileInputRef}
														id={field.name}
														name={field.name}
														onChange={handleFileChange}
														className='hidden'
													/>

													<div className='flex-1'>
														<input
															type='text'
															value={field.state.value}
															disabled
															placeholder='No file selected'
															className='px-3 py-1 border border-tertiary w-full text-primary bg-tertiary rounded-sm cursor-not-allowed'
														/>
													</div>

													<button
														type='button'
														onClick={() => fileInputRef.current?.click()}
														className='ml-2 hover:bg-tertiary/90 hover:cursor-pointer bg-tertiary rounded-full px-4 py-1 text-primary font-medium'
													>
														Browse
													</button>
												</div>
											</>
										</div>
									);
								}}
							/>
						</div>

						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<>
									<button
										type='submit'
										disabled={!canSubmit}
										className={`w-full py-2 px-4 mt-5 bg-tertiary rounded-md font-medium hover:bg-tertiary/90 transition-colors cursor-pointer ${!canSubmit && 'disabled:cursor-not-allowed'}`}
									>
										{isSubmitting ? (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 200 200'
												className='w-7 h-7 mx-auto'
											>
												<circle
													fill='#734005'
													stroke='#734005'
													strokeWidth='15'
													r='15'
													cx='40'
													cy='100'
												>
													<animate
														attributeName='opacity'
														calcMode='spline'
														dur='2'
														values='1;0;1;'
														keySplines='.5 0 .5 1;.5 0 .5 1'
														repeatCount='indefinite'
														begin='-.4'
													></animate>
												</circle>
												<circle
													fill='#734005'
													stroke='#734005'
													strokeWidth='15'
													r='15'
													cx='100'
													cy='100'
												>
													<animate
														attributeName='opacity'
														calcMode='spline'
														dur='2'
														values='1;0;1;'
														keySplines='.5 0 .5 1;.5 0 .5 1'
														repeatCount='indefinite'
														begin='-.2'
													></animate>
												</circle>
												<circle
													fill='#734005'
													stroke='#734005'
													strokeWidth='15'
													r='15'
													cx='160'
													cy='100'
												>
													<animate
														attributeName='opacity'
														calcMode='spline'
														dur='2'
														values='1;0;1;'
														keySplines='.5 0 .5 1;.5 0 .5 1'
														repeatCount='indefinite'
														begin='0'
													></animate>
												</circle>
											</svg>
										) : (
											'Update Profile'
										)}
									</button>
								</>
							)}
						/>
					</form>
				</div>
			</div>

			{showCropModal && originalImage && (
				<div className='fixed inset-0 z-50 bg-black/75 flex items-center justify-center'>
					<div className='bg-primary p-6 rounded-lg max-w-md w-full'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-tertiary text-xl font-bold'>
								Adjust Profile Picture
							</h3>
							<button
								onClick={() => setShowCropModal(false)}
								className='text-tertiary-500 hover:text-tertiary/20 hover:cursor-pointer'
							>
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>

						<div className='relative h-64 w-full mb-4'>
							<Cropper
								image={originalImage}
								crop={crop}
								zoom={zoom}
								aspect={1}
								onCropChange={setCrop}
								onCropComplete={onCropComplete}
								onZoomChange={setZoom}
								cropShape='round'
							/>
						</div>

						<div className='mb-4'>
							<label className='block text-tertiary font-medium mb-1 '>
								Zoom: {zoom.toFixed(1)}x
							</label>

							<input
								type='range'
								min='1'
								max='3'
								step='0.1'
								value={zoom}
								onChange={(e) => setZoom(parseFloat(e.target.value))}
								className='w-full'
							/>
						</div>

						<div className='flex gap-2'>
							<button
								onClick={() => setShowCropModal(false)}
								className='flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition cursor-pointer'
							>
								Cancel
							</button>

							<button
								onClick={createCroppedImage}
								className='flex-1 py-2 px-4 bg-tertiary text-primary rounded font-medium hover:bg-tertiary/90 transition cursor-pointer'
							>
								Done
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default EditProfile;
