import {IconButton, SvgIcon, Tooltip} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

const TwitterIconBtn = (props) => {
	const {onClick} = props;
	return(
		<Tooltip title={"Twitter"}>
			<IconButton
				onClick={typeof onClick === "function" ? onClick : ()=>{}}
			>
				<TwitterIcon/>
			</IconButton>
		</Tooltip>
	)
}

export default TwitterIconBtn;