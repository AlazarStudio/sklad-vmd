import { products } from '../../../../data'
import RemainsProduct from '../../Blocks/RemainsProduct/RemainsProduct'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './Remains.module.css'

function Remains({ children, ...props }) {
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
				<div className={styles.products_wrapper__head}>
					<div className={styles.checkBox_wrapper}>
						<CheckBox />
					</div>
					<p className={styles.name}>Наименование</p>
					<p className={styles.code}>Код</p>
					<p className={styles.remains}>Остаток</p>
					<p className={styles.cost_price}>Себестоимость</p>
					<p className={styles.cost_price_sum}>Сумма себестоимости</p>
					<p className={styles.sale_price}>Цена продажи</p>
					<p className={styles.sale_price_sum}>Сумма продажи</p>
				</div>
				<div>
					{products.slice(-5).map((product, index) => (
						<RemainsProduct key={index} {...product} />
					))}
				</div>
			</section>
		</>
	)
}

export default Remains
