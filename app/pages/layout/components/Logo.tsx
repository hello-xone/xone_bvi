import { Box, Image } from "@chakra-ui/react"
import { NavLink } from "@remix-run/react";

export default function Logo() {
	return (
		<Box px="16px" py="14px">
			<NavLink to="/">
				<Image src="/images/logo.png" w="88px" h="28px" fit="contain" />
			</NavLink>
		</Box>

	)
}