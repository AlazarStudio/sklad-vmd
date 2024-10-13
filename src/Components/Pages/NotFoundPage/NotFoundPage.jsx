import styles from './NotFoundPage.module.css'

function NotFoundPage({ children, ...props }) {
	return (
		<div className={styles.not_found__wrapper}>
			<p className={styles.not_found}>404 Страница не найдена</p>
		</div>
	)
}

export default NotFoundPage
