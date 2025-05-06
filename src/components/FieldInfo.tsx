import type { AnyFieldApi } from '@tanstack/react-form';

const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<>
					{field.state.meta.errors.length > 1 ? (
						field.state.meta.errors.map((error) => (
							<ul key={error.message}>
								<li className='text-red-400'>* {error.message}</li>
							</ul>
						))
					) : (
						<span className='text-red-400 px-2'>
							{field.state.meta.errors
								.map((error) => error.message)
								.join(',  ')}
						</span>
					)}
				</>
			) : null}
			{field.state.meta.isValidating ? 'Validating...' : null}
		</>
	);
};

export default FieldInfo;
