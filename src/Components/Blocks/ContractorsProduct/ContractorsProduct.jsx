import CheckBox from '../../UI/CheckBox/CheckBox'

import styles from './ContractorsProduct.module.css'

function ContractorsProduct({ children, ...props }) {
	return (
		<div className={styles.product_wrapper}>
			<div className={styles.checkBox_wrapper}>
				<CheckBox />
			</div>
			<p className={styles.name}> Контрагент 1 </p>
			<p className={styles.code}> {props.code} </p>
			<p className={styles.created}>09.07.2024 12:00</p>
			<p className={styles.phone}>80000000000</p>
			<p className={styles.email}>example@mail.ru</p>
			<p className={styles.address}>Черкесск</p>
		</div>
	)
}

export default ContractorsProduct
