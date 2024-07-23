import styles from './WidthBlock.module.css'

function WidthBlock({ children, ...props }) {
	return (
		<>
			<div {...props} className={styles.WidthBlock}>
				{children}
			</div>
		</>
	)
}

export default WidthBlock
