import { products } from '../../../../data'
import Product from '../../Blocks/Product/Product'
import WriteOffProduct from '../../Blocks/WriteOffProduct/WriteOffProduct'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './WriteOffs.module.css'

function WriteOffs({ children, ...props }) {
	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Списания</p>
				<div className={styles.operation_buttons__wrapper}>
					<AddButton img='/images/green_add.png' text='Списание' />
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
					<p className={styles.cost_price}>Себестоимость</p>
					<p className={styles.sale_price}>Цена продажи</p>
				</div>
				<div>
					{products.map((product, index) =>
						product.writtenOff === true ? (
							<Product key={index} linkName={null} {...product} />
						) : null
					)}
				</div>
			</section>
		</>
	)
}

export default WriteOffs
