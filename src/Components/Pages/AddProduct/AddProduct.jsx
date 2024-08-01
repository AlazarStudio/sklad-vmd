import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import Scanner from '../../Blocks/Scanner/Scanner'
import AddButton from '../../UI/AddButton/AddButton'

import styles from './AddProduct.module.css'

function AddProduct({ children, ...props }) {
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
		<>
			<Scanner />
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
							<label htmlFor='' style={{ fontWeight: '500' }}>
								Наименование товара
							</label>
							<input type='text' required />
						</div>
						<div className={styles.item}>
							<p>Изображения</p>
							<div className={styles.item2}>
								<AddButton img='/images/green_add.png' text='Изображение' />
							</div>
						</div>
					</div>
					<div className={styles.form_item}>
						<p style={{ flexBasis: '100%' }}>Общие данные</p>
						<div className={styles.item}>
							<label htmlFor=''>Описание</label>
							<textarea
								name=''
								id=''
								required
								style={{ resize: 'none' }}
							></textarea>
							<label htmlFor=''>Код</label>
							<input type='text' name='' id='' required placeholder='00001' />
							<label htmlFor=''>НДС</label>
							<input type='text' required />
						</div>
						<div className={styles.item}>
							<label htmlFor=''>Группа</label>
							<select name='group' id='' required>
								<option value='' defaultValue hidden></option>
								<option value=''>Велосипеды</option>
								<option value=''>Мопеды</option>
								<option value=''>Самокаты</option>
								<option value=''>Квадроциклы</option>
								<option value=''>Мотоциклы</option>
							</select>
							<label htmlFor=''>Себестоимость</label>
							<input type='text' required />
							<label htmlFor=''>Цена продажи</label>
							<input type='text' required />
							<label htmlFor=''>Штрихкоды товара</label>
							<div className={styles.item_half}>
								<input type='text' placeholder='EAN13' required />
								<input type='text' placeholder='2000000000022' required />
							</div>
						</div>
					</div>

					<div className={styles.form_item}>
						<p style={{ flexBasis: '100%' }}>Данные велосипеда</p>

						<div className={styles.item}>
							<label htmlFor=''>Рама</label>
							<input type='text' name='' id='' required />
							<label htmlFor=''>Размер</label>
							<input type='text' name='' id='' required />
							<label htmlFor=''>Вес</label>
							<input type='text' required />
							<label htmlFor=''>Вилка</label>
							<input type='text' name='' id='' required />
							<label htmlFor=''>Манетки</label>
							<input type='text' name='' id='' required />
							<label htmlFor=''>Передний переключатель</label>
							<input type='text' required />
							<label htmlFor=''>Задний переключатель</label>
							<input type='text' required />
						</div>

						<div className={styles.item}>
							<label htmlFor=''>Система</label>
							<input type='text' name='' id='' required />
							<label htmlFor=''>Кассета трещотка</label>
							<input type='text' name='' id='' required />
							<label htmlFor=''>Скорость</label>
							<input type='text' required />
							<label htmlFor=''>Каретка</label>
							<input type='text' name='' id='' required />
							<label htmlFor=''>Тормоза</label>
							<input type='text' name='' id='' required />
							<label htmlFor=''>Втулки</label>
							<input type='text' required />
							<label htmlFor=''>Резина</label>
							<input type='text' required />
						</div>
					</div>
				</div>
			</form>
		</>
	)
}

export default AddProduct
