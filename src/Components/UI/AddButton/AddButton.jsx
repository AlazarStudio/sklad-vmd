import styles from './AddButton.module.css'

function AddButton({ ...props }) {
	return (
		<button className={styles.add_btn}>
			{props.img ? <img src={props.img} alt='' /> : null}
			{props.text}
		</button>
	)
}

export default AddButton
