import {Box, IconButton, Typography, Link, Grid} from "@mui/material";
import dayjs from "dayjs";
import {useRouter} from "next/router";
import {project} from "./strings";
import LaunchIcon from "@mui/icons-material/Launch";
import FollowProjectBtn from "../components/FollowProjectBtn";

const { stages } = project;
const baseLoggingTag = `[tableRender]`;
const TableTextCell = (props) => {
	const {children} = props;
	return(
		<Typography
			sx={{
				overflow: "hidden",
				textOverflow: "ellipsis",
				textAlign: "left",
				fontSize: "0.8rem"
			}}
		>
			{children}
		</Typography>
	)
}

const render = {
	title: (params) => {
		const loggingTag = `${baseLoggingTag}[title]`;
		// console.info(`${loggingTag} params`, params);
		return(
			<TableTextCell>
				<Link href={`/projects/${params.row.id}`}>
					<a>{params.value}</a>
				</Link>
			</TableTextCell>
		)
	},
	stage: (params) => {
		const loggingTag = `[renderStage]`;
		if(typeof params.value === "string" && params.value.length > 0){
			const stageDisplayStr = (id) => {
				const item = stages.find(stage => stage.id === params.value);
				console.info(`${loggingTag} ${params.value} item:`, item);
				return item.display_str;
			}

			return (
				<TableTextCell>
					{stageDisplayStr(params.value)}
				</TableTextCell>
			)
		}
	},
	url: (params) => {
		const loggingTag = `[renderURLCell]`;
		// console.info(`${loggingTag}`, params);
		if(typeof params.value === "string" && params.value.length > 0){
			return(
				<TableTextCell>
					<a href={params.value} target={"_blank"}>{params.value}</a>
				</TableTextCell>
			)
		} else {
			return("N/A")
		}
	},
	datetime: (params) => {
		if(typeof params.value === "string"){
			const formattedDateTime = dayjs(params.value).format("ddd MM/DD/YY h:mm A");
			return(formattedDateTime)
		} else {
			return("N/A");
		}
	},
	mintPrice: (params) => {
		let {value} = params;
		if(value === null){
			value = 0;
		}
		const ethPrice = Number(value).toFixed(2);
		return `${ethPrice}E`;
	},
	actions: (params) => {
		const {value} = params;
		const router = useRouter();
		// console.info(`[render][actions] id:`, value);
		return(
			<Box
				sx={{
					display: "flex"
				}}
			>
				<Grid
					container
					columnSpacing={1}
				>
					<Grid item>
						<IconButton
							onClick={(e)=>{
								router.push(`/projects/${value}`);
							}}
						>
							<LaunchIcon/>
						</IconButton>
					</Grid>
					<Grid item>
						<FollowProjectBtn
							id={value}
						/>
					</Grid>
				</Grid>
			</Box>
			
		)
	},
	general: (params) => {
		const content = typeof params.value === "number" ? params.value : 0;

		return (
			<span>{content}</span>
		)
	}
}

export {render};