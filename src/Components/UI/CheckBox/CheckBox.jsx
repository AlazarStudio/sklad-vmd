import styles from './CheckBox.module.css'

function CheckBox({ children, ...props }) {
	return <input type='checkbox' className={styles.checkBox} />
}

export default CheckBox
