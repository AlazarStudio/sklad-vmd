import { products } from '../../../../data'
import ContractorsProduct from '../../Blocks/ContractorsProduct/ContractorsProduct'
import Product from '../../Blocks/Product/Product'
import AddButton from '../../UI/AddButton/AddButton'
import CheckBox from '../../UI/CheckBox/CheckBox'
import styles from './ContractorsPage.module.css'

function ContractorsPage({ children, ...props }) {
	return (
		<>
			<div className={styles.operations}>
				<p className={styles.operations__title}>Контрагенты</p>
				<div className={styles.operation_buttons__wrapper}>
					<AddButton img='/images/green_add.png' text='Контрагент' />
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
					<p className={styles.created}>Создан</p>
					<p className={styles.phone}>Телефон</p>
					<p className={styles.email}>Email</p>
					<p className={styles.address}>Адрес</p>
				</div>
				<div>
					{products.slice(-5).map((product, index) => (
						<ContractorsProduct key={index} {...product} />
					))}
				</div>
			</section>
		</>
	)
}

export default ContractorsPage
