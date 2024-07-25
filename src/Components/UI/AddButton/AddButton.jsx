import styles from './AddButton.module.css'

function AddButton({ ...props }) {
	return (
		<button className={styles.add_btn} type='button'>
			{props.img ? <img src={props.img} alt='' /> : null}
			{props.text}
		</button>
	)
}

export default AddButton
