// src/Components/Blocks/Product/Product.jsx
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../UI/CheckBox/CheckBox';
import styles from './DetailProduct.module.css';

function DetailProduct({ linkName, ...props }) {
    const navigate = useNavigate();

    const goToProductDetail = () => {
        navigate(`/product/${linkName}`);
    };

    return (
        <div className={styles.product_wrapper} onClick={goToProductDetail}>
            <div className={styles.checkBox_wrapper}>
                <CheckBox />
            </div>
            <p className={styles.name}>{props.name}</p>
            <p className={styles.code}>{props.code}</p>
            <p className={styles.unit_of_measurement}>{props.quantity}</p>
            <p className={styles.cost_price}>
                {props.costPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            </p>
            <p className={styles.sale_price}>
                {props.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            </p>
        </div>
    );
}

export default DetailProduct;
