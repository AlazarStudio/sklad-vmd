import { useLocation, useNavigate, useParams } from 'react-router-dom'

import AddButton from '../../UI/AddButton/AddButton'

import styles from './AddContractors.module.css'

function AddContractors({ ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()
	// console.log(id)

	const handleSubmit = e => {
		e.preventDefault()
	}

	const navBack = e => {
		e.preventDefault()
		navigate('/contractors')
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
					<div className={styles.item2}>
						<label htmlFor='' style={{ fontWeight: '500' }}>
							Наименование контрагента
						</label>
						<input type='text' required />
					</div>
				</div>
				<div className={styles.form_item}>
					<div className={styles.item}>
						<label htmlFor=''>Телефон</label>
						<input type='text' name='' id='' required />
						<label htmlFor=''>Email</label>
						<input type='text' required />
						<label htmlFor=''>Адрес</label>
						<input type='text' required />
					</div>
				</div>
			</div>
		</form>
	)
}

export default AddContractors
