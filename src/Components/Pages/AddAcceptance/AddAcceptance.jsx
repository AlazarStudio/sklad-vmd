import { useLocation, useNavigate, useParams } from 'react-router-dom'

import styles from './AddAcceptance.module.css'

function AddAcceptance({ ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()
	// console.log(id)

	const handleSubmit = e => {
		e.preventDefault()
	}

	const navBack = e => {
		e.preventDefault()
		navigate('/warehouse')
	}
	return (
		<form onSubmit={handleSubmit} className={styles.form_product}>
			<div className={styles.products_header__wrapper}>
				<div className={styles.products_buttons}>
					<button>Сохранить</button>
					<button type='button' onClick={navBack}>
						Закрыть
					</button>
				</div>
			</div>
			<div className={styles.form_inputs}>
				<div className={styles.form_item}>
					<div className={styles.item}>
						<label htmlFor=''>Время</label>
						<input type='text' required />
						<label htmlFor=''>Со склада</label>
						<input type='text' required />
						<label htmlFor=''>Контрагент</label>
						<select name='group' id='' required>
							<option value='' defaultValue>
								Контрагент1
							</option>
							<option value=''>Контрагент2</option>
							<option value=''>Контрагент3</option>
							<option value=''>Контрагент4</option>
							<option value=''>Контрагент5</option>
							<option value=''>Контрагент6</option>
						</select>
						<label htmlFor=''>Организация</label>
						<input type='text' required placeholder='Вело Мото & Drive' />
						<label htmlFor=''>Сумма</label>
						<input type='text' required />
					</div>
				</div>
			</div>
		</form>
	)
}

export default AddAcceptance
