import { products } from '../../../../data'
import Product from '../../Blocks/Product/Product'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './ProductsPage.module.css'

function ProductsPage({ children, ...props }) {
	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Товары</p>
				<div className={styles.operation_buttons__wrapper}>
					<AddButton img='/images/green_add.png' text='Товар' />
					<AddButton img='/images/blue_add.png' text='Группа' />
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
					<p className={styles.unit_of_measurement}>Количество</p>
					<p className={styles.sale_price}>Цена продажи</p>
				</div>
				<div>
					{products.slice(-5).map((product, index) => (
						<Product key={index} {...product} />
					))}
				</div>
			</section>
		</>
	)
}

export default ProductsPage
