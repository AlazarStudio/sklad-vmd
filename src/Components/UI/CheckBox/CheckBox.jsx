import styles from './CheckBox.module.css'

function CheckBox({ children, onChange, ...props }) {
	const handleCheckBoxClick = event => {
		event.stopPropagation() // Останавливает всплытие события
	}
	return (
		<input
			type='checkbox'
			className={styles.checkBox}
			onClick={handleCheckBoxClick}
			onChange={onChange}
		/>
	)
}

export default CheckBox
