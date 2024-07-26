import styles from './NotFoundPage.module.css'

function NotFoundPage({ children, ...props }) {
	return (
		<main>
			<p className={styles.not_found}>404 Страница не найдена</p>
		</main>
	)
}

export default NotFoundPage
