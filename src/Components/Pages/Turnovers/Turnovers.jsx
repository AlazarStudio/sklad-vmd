import { products } from '../../../../data'
import TurnoversProduct from '../../Blocks/TurnoversProduct/TurnoversProduct'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './Turnovers.module.css'

function Turnovers({ children, ...props }) {
	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Остатки</p>
				<div className={styles.operation_buttons__wrapper}>
					<AddButton text='Фильтр' />
					<AddButton img='/images/print.png' text='Печать' />
				</div>
				<input type='search' placeholder='Поиск...' />
			</div>
			<section className={styles.products_wrapper}>
				<div className={styles.periods}>
					<div className={styles.period_item}>
						<p>Начало периода</p>
						<button>(01.07.2024)</button>
					</div>
					<p>Приход</p>
					<p>Расход</p>
					<div className={styles.period_item}>
						<p>Конец периода</p>
						<button>(31.07.2024)</button>
					</div>
				</div>
				<div className={styles.products_wrapper__head}>
					<div className={styles.checkBox_wrapper}>
						<CheckBox />
					</div>
					<p className={styles.name}>Наименование</p>
					<p className={styles.code}>Код</p>
					<div className={styles.quantity_sum}>
						<p className={styles.quantity}>Кол-во</p>
						<p className={styles.sum}>Сумма</p>
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
						<p className={styles.quantity}>Кол-во</p>
						<p className={styles.sum}>Сумма</p>
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
