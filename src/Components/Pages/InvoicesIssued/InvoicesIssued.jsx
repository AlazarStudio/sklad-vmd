import { products } from '../../../../data'
import InvoicesReceivedProduct from '../../Blocks/InvoicesReceivedProduct/InvoicesReceivedProduct'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './InvoicesIssued.module.css'

function InvoicesIssued({ children, ...props }) {
	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Счета-фактуры выданные</p>
				<div className={styles.operation_buttons__wrapper}>
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
					<p className={styles.contractors}>Контрагент</p>
					<p className={styles.organization}>Организация</p>
					<p className={styles.sum}>Сумма</p>
				</div>
				<div>
					{products.slice(-5).map((product, index) => (
						<InvoicesReceivedProduct key={index} {...product} />
					))}
				</div>
			</section>
		</>
	)
}

export default InvoicesIssued
