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

function MainPage({ children, user, ...props }) {
	let { id, idType } = useParams()
	// console.log(user)
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
					{(id == 'products' || !id) && <Products user={user} />}
					{!id && !idType && <ProductsPage user={user} />}
					{id == 'products' && !idType && <ProductsPage user={user} />}
					{/* {id == 'update-product' && !idType && <UpdateProduct />} */}
					{id == 'add-product-bike' && <AddProduct />}
					{id == 'add-product-motorcycle' && <AddProductMoto user={user} />}
					{id == 'add-product-atvs' && <AddProductMoto user={user} />}
					{id == 'add-product-moped' && <AddProductMoto user={user} />}
					{id == 'add-product-group' && <AddGroup user={user} />}
					{id == 'products' && idType == 'write-offs' && <WriteOffs user={user} />}
					{id == 'products' && idType == 'remains' && <Remains user={user} />}
					{id == 'products' && idType == 'turnovers' && <Turnovers user={user} />}
					{id == 'contractors' && <Contractors user={user} />}
					{id == 'contractors' && !idType && <ContractorsPage user={user} />}
					{id == 'contractors' && idType == 'contracts' && <Contracts user={user} />}
					{id == 'add-contractors' && <AddContractors />}
					{id == 'warehouse' && <Warehouse user={user} />}
					{/* {id == 'warehouse' && !idType && <Acceptance />} */}
					{/* {id == 'warehouse' && idType == 'acceptance' && <Acceptance />} */}
					{id == 'add-acceptance' && <AddAcceptance user={user} />}
					{id == 'sales' && <Sales user={user} />}
					{id == 'sales' && !idType && <Shipments user={user} />}
					{id == 'sales' && idType == 'shipments' && <Shipments user={user} />}
					{id == 'sales' && idType == 'retails' && <Retails user={user} />}
					{id == 'add-shipment' && <AddShipment user={user} />}
					{id == 'add-retails' && <AddRetail user={user} />}
					{id == 'reports' && <Reports user={user} />}
					{id == 'add-report' && <AddReport user={user} />}
					{id == 'select-group' && <SelectGroup user={user} />}
					{!ids.includes(id) && <NotFoundPage />}
					{ids.includes(id) && !idTypes.includes(idType) && <NotFoundPage />}
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default MainPage
