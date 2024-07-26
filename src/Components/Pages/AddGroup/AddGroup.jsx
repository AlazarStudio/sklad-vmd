import { useLocation, useNavigate, useParams } from 'react-router-dom'

import styles from './AddGroup.module.css'

function AddGroup({ children, ...props }) {
	let { id } = useParams()
	let location = useLocation()
	const navigate = useNavigate()
	// console.log(id)

	const handleSubmit = e => {
		e.preventDefault()
	}

	const navBack = e => {
		e.preventDefault()
		navigate('/products')
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
						<label htmlFor=''>Наименование группы</label>
						<input type='text' required />
					</div>
				</div>
			</div>
		</form>
	)
}

export default AddGroup
