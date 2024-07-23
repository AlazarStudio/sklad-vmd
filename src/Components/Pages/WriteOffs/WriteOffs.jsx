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
					<p className={styles.number}>№</p>
					<p className={styles.time}>Время</p>
					<p className={styles.warehouse}>Со склада</p>
					<p className={styles.org}>Организация</p>
					<p className={styles.sum}>Сумма</p>
				</div>
				<div>
					{products.map((product, index) => (
						product.writtenOff === true ? (
							<WriteOffProduct key={index} {...product} />
						) : null
					))}
				</div>
			</section>
		</>
	)
}

export default WriteOffs
