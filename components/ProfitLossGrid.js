import {Box, Grid, Typography} from "@mui/material";
import CollectionRow from "./CollectionRow";
import {usePortfolioContext} from "./UserPortfolioProvider";
import {render} from "../utils/TableRenderHelper";
import {DataGrid} from "@mui/x-data-grid";

const ProfitLossGrid = (props) => {
	const componentLoggingTag = `[ProfitLossGrid]`;
	const {collections} = usePortfolioContext();
	console.info(`${componentLoggingTag} collections`, collections);
	const columns = [
		{
			field: "name",
			headerName: "Name",
			minWidth: 240
		},
		{
			field: "num_tokens",
			type: "number",
			headerName: "Num Held",
			headerAlign: "center",
			cellClassName: 'center',
		},
		{
			field: "floor_price",
			type: "number",
			headerName: "Value",
			headerAlign: "center",
			cellClassName: 'center',
			valueGetter: (params) => {
				// console.info(`[valueGetter]`, params);
				const {num_tokens, floor_price} = params.row;
				return num_tokens * floor_price;
			},
			renderCell: (params) => {
				return `${Math.round(100*params.value)/100}E`;
			}
		},
		{
			field: "total_cost",
			type: "number",
			headerName: "Cost",
			headerAlign: "center",
			cellClassName: 'center',
			renderCell: (params) => {
				return `${Math.round(100*params.value)/100}E`;
			}
		},
		{
			field: "dev_seller_fee_basis_points",
			type: "number",
			headerName: "Seller Fee",
			headerAlign: "center",
			cellClassName: 'center',
			valueGetter: (params) => {
				// console.info(`[valueGetter]`, params);
				const {dev_seller_fee_basis_points, opensea_seller_fee_basis_points} = params.row;
				return parseFloat((parseInt(dev_seller_fee_basis_points) + parseInt(opensea_seller_fee_basis_points))/100);
				
			},
			renderCell: (params) => {
				console.info(`${componentLoggingTag}[render]`, params);
				return `${Math.round(100*params.value)/100}%`
			}
		},
		{
			field: "chat_url",//using irrelevant column here
			type: "number",
			headerName: "Breakeven",
			headerAlign: "center",
			cellClassName: 'center',
			valueGetter: (params) => {
				// console.info(`[valueGetter]`, params);
				
				const {value, num_tokens, dev_seller_fee_basis_points, opensea_seller_fee_basis_points} = params.row;
				const breakEvenPoint = (value * (1 + ((parseInt(dev_seller_fee_basis_points) + parseInt(opensea_seller_fee_basis_points))/10000))/num_tokens);
				return breakEvenPoint;
			},
			renderCell: (params) => {
				console.info(`${componentLoggingTag}[render]`, params);
				return `${Math.round(100*params.value)/100}E`
			}
		},
	];
	return (
		<Grid
			container
			flexDirection={"column"}
			rowSpacing={3}
			sx={{
				p:5
			}}
		>
			<Grid item>
				<Typography sx={{fontSize: "1.8rem"}}>Profit/Loss</Typography>
			</Grid>
			<Grid item>
				<DataGrid
					rowsPerPageOptions={[]}
					getRowId={(row) => row.token_address}
					initialState={{
						sorting: {
							sortModel: [{ field: 'floor_price', sort: 'desc' }],
						},
					}}
					columns={columns}
					rows={collections}
					getRowClassName={render.row}
					density={"comfortable"}
					autoHeight={true}
					sx={{
						'& .center':{
							justifyContent: "center"
						}
					}}
				/>
			</Grid>
		</Grid>
	)
	
	
}

export default ProfitLossGrid;