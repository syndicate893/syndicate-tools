import {Grid, TextField, Container, Switch, FormGroup, FormControlLabel, Typography, Button} from "@mui/material";
import {useState, useEffect} from "react";
import axios from "axios";

const FormTextField = (props) => {
	const componentLoggingTag = `[FormTextField]`;
	const {defaultValue, maxRows = 1, onChange = ()=>{}, children, label="", type="text", step = 1, helperText=""} = props;
	return(
		<TextField
			variant={"outlined"}
			defaultValue={defaultValue}
			onChange={onChange}
			fullWidth={true}
			multiline={maxRows > 1}
			maxRows={maxRows}
			label={label}
			type={type}
			step={step}
			helperText={helperText}
		>
			{children}
		</TextField>
	)
}

const AddView = (props) => {
	const componentLoggingTag = `[AddView]`;
	
	const [title, setTitle] = useState("");
	const [website, setWebsite] = useState("");
	const [twitter, setTwitter] = useState("");
	const [discord, setDiscord] = useState({
		isOpen: true,
		url:""
	});
	const [price, setPrice] = useState(0);
	const [unit, setUnit] = useState("ETH");
	const [presale, setPresale] = useState({
		start: 0,
		end: 0
	});
	const [contractAddress, setContractAddress] = useState("");
	const [description, setDescription] = useState("");
	
	const addProjectToServer = async () => {
		const loggingTag = `${componentLoggingTag}[addProjectToServer]`;
		try{
			const payload = {
				title,
				website_url: website,
				twitter_url: twitter,
				discord_url: discord.url,
				is_discord_open: discord.isOpen,
				presale_price: price,
				sale_unit: unit,
				ts_presale_start: presale.start,
				ts_presale_end: presale.end,
				address: contractAddress,
				description
			}
			console.info(`${loggingTag} Payload to be saved to server:`, payload);
			
			try{
				const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URI}/v1/projects/add`, payload);
				console.info(`${loggingTag} result:`, result);
			} catch(e){
				console.error(`${loggingTag} Unable to make request to add project`);
			}
			
		} catch(e){
			console.error(`${loggingTag} Error:`, e);
		}
	}
	// useEffect(()=>{
	// 	console.info(`${componentLoggingTag} env vars`, process.env.NEXT_PUBLIC_BASE_URI);
	// }, [])
	return(
		<Container maxWidth={"md"}>
			<Grid
				container
				direction={"column"}
				alignItems={"stretch"}
				flexGrow={1}
				rowSpacing={3}
				sx={{
					pt:3
				}}
			>
				<Grid
					item
				>
					<Typography
						variant={"h4"}
					>Add Project</Typography>
				</Grid>
				<Grid
					item
				>
					<FormTextField
						defaultValue={title}
						label={"Title"}
						onChange={(e)=>{setTitle(e.currentTarget.value)}}
					/>
				</Grid>
				<Grid
					item
				>
					<FormTextField
						defaultValue={website}
						label={"Website URL"}
						type={"url"}
						onChange={(e)=>{setWebsite(e.currentTarget.value)}}
					/>
				</Grid>
				<Grid
					item
				>
					<FormTextField
						defaultValue={twitter}
						label={"Twitter URL"}
						type={"url"}
						onChange={(e)=>{setTwitter(e.currentTarget.value)}}
					/>
				</Grid>
				<Grid
					item
					container
					columnSpacing={3}
					alignItems={"center"}
				>
					<Grid
						item
						flexGrow={1}
					>
						<FormTextField
							defaultValue={description}
							label={"Discord URL"}
							type={"url"}
							onChange={(e)=>{setDiscord({...discord, url:e.currentTarget.value})}}
						/>
					</Grid>
					<Grid
						item
					>
						<FormGroup>
							<FormControlLabel control={<Switch defaultChecked onChange={(e)=>{console.info(e.target.checked); setDiscord({...discord, isOpen: e.target.checked})}}/>} label="Public" />
						</FormGroup>
					</Grid>
				</Grid>
				<Grid
					item
					container
					alignItems={"center"}
					columnSpacing={3}
				>
					<Grid item>
						<FormTextField
							label={"Price"}
							defaultValue={price}
							type={"number"}
							step={0.05}
							onChange={(e) => {setPrice(e.currentTarget.value)}}
						/>
					</Grid>
					<Grid item>
						<FormTextField
							label={"Unit"}
							defaultValue={unit}
							onChange={(e) => {setUnit(e.currentTarget.value)}}
						/>
					</Grid>
				</Grid>
				{/*presale section*/}
				<Grid
					item
					container
					alignItems={"center"}
					columnSpacing={3}
				>
					<Grid item>
						<FormTextField
							helperText={"Presale Start"}
							defaultValue={presale.start}
							type={"datetime-local"}
							onChange={(e)=>{console.info(e.currentTarget.value);setPresale({...presale, start:e.currentTarget.value})}}
						/>
					</Grid>
					<Grid item>
						<FormTextField
							helperText={"Presale End"}
							defaultValue={presale.end}
							type={"datetime-local"}
							onChange={(e)=>{console.info(e.currentTarget.value);setPresale({...presale, end:e.currentTarget.value})}}
						/>
					</Grid>
				</Grid>
				<Grid
					item
				>
					<FormTextField
						defaultValue={contractAddress}
						label={"Contract Address"}
						maxRows={5}
						onChange={(e)=>{setContractAddress(e.currentTarget.value)}}
					/>
				</Grid>
				<Grid
					item
				>
					<FormTextField
						defaultValue={description}
						label={"Description"}
						maxRows={5}
						onChange={(e)=>{setDescription(e.currentTarget.value)}}
					/>
				</Grid>
				<Grid
					item
					container
					alignItems={"center"}
					justifyContent={"flex-end"}
					columnSpacing={3}
				>
					<Grid item>
						<Button
							variant={"outlined"}
						>
							Reset
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant={"contained"}
							onClick={addProjectToServer}
						>
							Save
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

export default AddView;