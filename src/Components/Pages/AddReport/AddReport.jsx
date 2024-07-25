import { useLocation, useNavigate, useParams } from 'react-router-dom'

import styles from './AddReport.module.css'

function AddReport({ ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()
	// console.log(id)

	const handleSubmit = e => {
		e.preventDefault()
	}

	const navBack = e => {
		e.preventDefault()
		navigate('/reports')
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
						<label htmlFor=''>Категория</label>
						<select name='group' id='' required>
							<option value='' defaultValue>
								Отгрузки
							</option>
							<option value=''>Приемки</option>
							<option value=''>Обороты</option>
							<option value=''>Остатки</option>
							<option value=''>Списания</option>
							<option value=''>Товары</option>
						</select>
						<label htmlFor=''>Организация</label>
						<input type='text' required placeholder='Вело Мото & Drive' />
						<label htmlFor=''>Период</label>
						<div className={styles.item_half}>
							<input type='date' required />
							<input type='date' required />
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}

export default AddReport
