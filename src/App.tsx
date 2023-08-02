import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const App = () => {
	const [isLoading, setIsLoading] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		reset,
	} = useForm()

	const onSubmit = handleSubmit((data) => {
		try {
			setIsLoading(true)
			console.log(data)
			toast.success('Form submitted successfully')
		} catch (error) {
			setIsLoading(false)
			toast.error('Error submitting form')
		} finally {
			setTimeout(() => {
				setIsLoading(false)
				reset()
			}, 1000)
		}
	})

	return (
		<form onSubmit={onSubmit}>
			{/* name */}
			<label htmlFor='name'>Name</label>
			<input
				type='text'
				{...register('name', {
					required: {
						value: true,
						message: 'Please enter your name',
					},
					minLength: {
						value: 3,
						message: 'Name must be at least 3 characters',
					},
					maxLength: {
						value: 20,
						message: 'Name must be at most 20 characters long',
					},
				})}
			/>
			{errors.name && <span>{errors.name.message as string}</span>}

			{/* email */}
			<label htmlFor='email'>Email</label>
			<input
				type='text'
				{...register('email', {
					required: {
						value: true,
						message: 'Please enter your email address',
					},
					pattern: {
						value: /^[a-z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,4}$/,
						message: 'Please enter a valid email address',
					},
				})}
			/>
			{errors.email && <span>{errors.email.message as string}</span>}

			{/* password */}
			<label htmlFor='password'>Password</label>
			<input
				type='password'
				{...register('password', {
					required: {
						value: true,
						message: 'Please enter a password',
					},
					minLength: {
						value: 6,
						message: 'Password must be at least 6 characters',
					},
				})}
			/>
			{errors.password && <span>{errors.password.message as string}</span>}

			{/* confirmPass */}
			<label htmlFor='confirmPassword'>Confirm Password</label>
			<input
				type='password'
				{...register('confirmPassword', {
					required: {
						value: true,
						message: 'Please confirm your password',
					},
					validate: (value) => value === watch('password') || 'Passwords do not match',
				})}
			/>
			{errors.confirmPassword && <span>{errors.confirmPassword.message as string}</span>}

			{/* birthDate */}
			<label htmlFor='birthDate'>Birth Date</label>
			<input
				type='date'
				{...register('birthDate', {
					required: {
						value: true,
						message: 'Please enter a birth date',
					},
					validate: (value) => {
						const dateOfBirth = new Date(value)
						const actualDate = new Date()
						const age = actualDate.getFullYear() - dateOfBirth.getFullYear()

						if (age >= 18) {
							return true
						} else if (dateOfBirth.getFullYear() > actualDate.getFullYear()) {
							return 'Please enter a valid birth date'
						} else {
							return 'Must be of legal age'
						}
					},
				})}
			/>
			{errors.birthDate && <span>{errors.birthDate.message as string}</span>}

			{/* Country */}
			<label htmlFor='country'>Country</label>
			<select {...register('country')}>
				<option value='mx'>México</option>
				<option value='co'>Colombia</option>
				<option value='ar'>Argentina</option>
			</select>

			{watch('country') === 'ar' && (
				<>
					<input
						type='text'
						placeholder='Province'
						{...register('province', {
							required: {
								value: true,
								message: 'Province are required',
							},
						})}
					/>
					{errors.province && <span>{errors.province.message as string}</span>}
				</>
			)}

			{/* file */}
			<label htmlFor='file'>File</label>
			<input
				type='file'
				// Si quiero que el valor del input sea personalizado
				// Basta con usar un onChange y setear el nombre del campo con el valor del input implementado el setValue de react hook form
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					console.log(e.target.files[0])

					setValue('profileImg', e.target.files[0].name)
				}}
				// Si no dejo el valor que me da react hook form por defecto

				// {...register('file', {
				// 	required: {
				// 		value: true,
				// 		message: 'Please select a file',
				// 	},
				// })}
			/>
			{errors.file && <span>{errors.file.message as string}</span>}

			{/* terms and conditions */}
			<label htmlFor='terms'>Terms and conditions</label>
			<input
				type='checkbox'
				{...register('terms', {
					required: {
						value: true,
						message: 'Terms and conditions are required',
					},
				})}
			/>
			{errors.terms && <span>{errors.terms.message as string}</span>}

			<button>{isLoading ? 'Sending' : 'Send'}</button>

			<pre>{JSON.stringify(watch(), null, 2)}</pre>
		</form>
	)
}

export default App
