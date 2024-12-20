import { useParams } from 'react-router-dom'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import AddAcceptance from '../AddAcceptance/AddAcceptance'
import AddContractors from '../AddContractors/AddContractors'
import AddGroup from '../AddGroup/AddGroup'
import AddProduct from '../AddProduct/AddProduct'
import AddReport from '../AddReport/AddReport'
import AddRetail from '../AddRetail/AddRetail'
import AddShipment from '../AddShipment/AddShipment'
import Contractors from '../Contractors/Contractors'
import ContractorsPage from '../ContractorsPage/ContractorsPage'
import Contracts from '../Contracts/Contracts'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import Products from '../Products/Products'
import ProductsPage from '../ProductsPage/ProductsPage'
import Purchases from '../Purchases/Purchases'
import Remains from '../Remains/Remains'
import Reports from '../Reports/Reports'
import Retails from '../Retails/Retails'
import Sales from '../Sales/Sales'
import SelectGroup from '../SelectGroup/SelectGroup'
import Shipments from '../Shipments/Shipments'
import Turnovers from '../Turnovers/Turnovers'
import UpdateProduct from '../UpdateProduct/UpdateProduct'
import Warehouse from '../Warehouse/Warehouse'
import WriteOffs from '../WriteOffs/WriteOffs'
import AddProductMoto from '../AddProductMoto/AddProductMoto'
import AddProductATVs from '../AddProductATVs/AddProductATVs'
import AddProductMoped from '../AddProductMoped/AddProductMoped'

function MainPage({ children, ...props }) {
	let { id, idType } = useParams()
	// console.log(id)
	const ids = [
		'products',
		'add-product-bike',
		'add-product-motorcycle',
		'add-product-atvs',
		'add-product-moped',
		// 'update-product',
		'add-product-group',
		'contractors',
		'add-contractors',
		'warehouse',
		'sales',
		'add-shipment',
		'add-retails',
		'add-acceptance',
		'reports',
		'add-report',
		'select-group',
		undefined
	]

	const idTypes = [
		'write-offs',
		'remains',
		'turnovers',
		'contracts',
		'acceptance',
		'shipments',
		'retails',
		undefined
	]
	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					{(id == 'products' || !id) && <Products />}
					{!id && !idType && <ProductsPage />}
					{id == 'products' && !idType && <ProductsPage />}
					{/* {id == 'update-product' && !idType && <UpdateProduct />} */}
					{id == 'add-product-bike' && <AddProduct />}
					{id == 'add-product-motorcycle' && <AddProductMoto />}
					{id == 'add-product-atvs' && <AddProductMoto />}
					{id == 'add-product-moped' && <AddProductMoto />}
					{id == 'add-product-group' && <AddGroup />}
					{id == 'products' && idType == 'write-offs' && <WriteOffs />}
					{id == 'products' && idType == 'remains' && <Remains />}
					{id == 'products' && idType == 'turnovers' && <Turnovers />}
					{id == 'contractors' && <Contractors />}
					{id == 'contractors' && !idType && <ContractorsPage />}
					{id == 'contractors' && idType == 'contracts' && <Contracts />}
					{id == 'add-contractors' && <AddContractors />}
					{id == 'warehouse' && <Warehouse />}
					{/* {id == 'warehouse' && !idType && <Acceptance />} */}
					{/* {id == 'warehouse' && idType == 'acceptance' && <Acceptance />} */}
					{id == 'add-acceptance' && <AddAcceptance />}
					{id == 'sales' && <Sales />}
					{id == 'sales' && !idType && <Shipments />}
					{id == 'sales' && idType == 'shipments' && <Shipments />}
					{id == 'sales' && idType == 'retails' && <Retails />}
					{id == 'add-shipment' && <AddShipment />}
					{id == 'add-retails' && <AddRetail />}
					{id == 'reports' && <Reports />}
					{id == 'add-report' && <AddReport />}
					{id == 'select-group' && <SelectGroup />}
					{!ids.includes(id) && <NotFoundPage />}
					{ids.includes(id) && !idTypes.includes(idType) && <NotFoundPage />}
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default MainPage
