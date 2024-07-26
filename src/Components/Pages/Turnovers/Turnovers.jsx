import { products } from '../../../../data'
import TurnoversProduct from '../../Blocks/TurnoversProduct/TurnoversProduct'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './Turnovers.module.css'

function Turnovers({ children, ...props }) {
	const today = new Date()

	// Функция для получения первого и последнего дня предыдущего полного месяца
	const getLastFullMonth = () => {
		let year = today.getFullYear()
		let month = today.getMonth() // текущий месяц (0-11)

		// Если текущий день не 1-е число, берем предыдущий месяц
		if (today.getDate() !== 1) {
			if (month === 0) {
				month = 11
				year -= 1
			} else {
				month -= 1
			}
		} else {
			// Если текущий месяц - январь, берем декабрь предыдущего года
			if (month === 0) {
				month = 11
				year -= 1
			}
		}

		// Первый день месяца
		const firstDay = new Date(year, month, 2)
		// Последний день месяца
		const lastDay = new Date(year, month + 1) // 0-й день следующего месяца - это последний день текущего

		// Преобразуем в формат YYYY-MM-DD
		const formatDate = date => date.toISOString().split('T')[0]

		return {
			start: formatDate(firstDay),
			end: formatDate(lastDay)
		}
	}

	const { start, end } = getLastFullMonth()

	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Обороты</p>
				<div className={styles.operation_buttons__wrapper}>
					<input type='date' defaultValue={start} required />
					<input type='date' defaultValue={end} required />
					<AddButton img='/images/print.png' text='Печать' />
				</div>
				<input type='search' placeholder='Поиск...' />
			</div>
			<section className={styles.products_wrapper}>
				<div className={styles.periods}>
					{/* <div className={styles.period_item}>
						<p>Начало периода</p>
					</div> */}
					<p>Приход</p>
					<p>Расход</p>
					{/* <div className={styles.period_item}>
						<p>Конец периода</p>
					</div> */}
				</div>
				<div className={styles.products_wrapper__head}>
					<div className={styles.checkBox_wrapper}>
						<CheckBox />
					</div>
					<p className={styles.name}>Наименование</p>
					<p className={styles.code}>Код</p>
					<div className={styles.quantity_sum}>
						<p className={styles.date_sale}>Дата продажи</p>
					</div>
					<div className={styles.quantity_sum}>
						<p className={styles.quantity}>Кол-во</p>
						<p className={styles.sum}>Сумма</p>
					</div>
					<div className={styles.quantity_sum}>
						<p className={styles.quantity}>Кол-во</p>
						<p className={styles.sum}>Сумма</p>
					</div>
					<div className={styles.quantity_sum}>
						<p className={styles.income}>Доход</p>
					</div>
				</div>
				<div>
					{products.slice(-5).map((product, index) => (
						<TurnoversProduct key={index} {...product} />
					))}
				</div>
			</section>
		</>
	)
}

export default Turnovers
