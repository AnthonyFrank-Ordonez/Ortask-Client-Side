interface DeleteModalProps {
	closeModal: () => void;
	handleDeleteTask: () => Promise<void>;
}

const DeleteModal = ({ closeModal, handleDeleteTask }: DeleteModalProps) => {
	return (
		<div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center'>
			<div className='bg-primary p-6 rounded-lg shadow-lg max-w-md w-full'>
				<div className='flex flex-col gap-2 items-center justify-center'>
					<h1 className='font-medium text-tertiary text-2xl'>Confirmation</h1>
					<p className='text-tertiary text-lg font-medium'>
						Are you sure you want to delete this task?
					</p>
				</div>

				<div className='flex items-center justify-center gap-x-3 mt-5'>
					<button
						onClick={closeModal}
						className='py-2 flex-1 rounded-lg bg-tertiary text-primary font-bold cursor-pointer hover:bg-tertiary/70'
					>
						Cancel
					</button>
					<button
						onClick={handleDeleteTask}
						className='py-2 flex-1 rounded-lg bg-red-500 text-tertiary font-bold cursor-pointer hover:bg-red-500/70'
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
