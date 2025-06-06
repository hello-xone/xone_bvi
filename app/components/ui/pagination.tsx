"use client"

import {
	ButtonGroup,
	IconButton,
	type IconButtonProps,
	Pagination,
	usePaginationContext,
} from "@chakra-ui/react"
import { Link } from "@remix-run/react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

const PaginationLink = (
	props: IconButtonProps & { page?: "prev" | "next" | number },
) => {
	const { page, ...rest } = props
	const pagination = usePaginationContext()
	const pageValue = () => {
		if (page === "prev") return pagination.previousPage
		if (page === "next") return pagination.nextPage
		return page
	}
	return (
		<IconButton asChild {...rest}>
			<Link preventScrollReset to={`?page=${pageValue()}`}>{props.children}</Link>
		</IconButton>
	)
}

export default function PaginationGroup() {
	return (
		<Pagination.Root count={20} pageSize={2} defaultPage={1}>
			<ButtonGroup variant="ghost" size="sm">
				<PaginationLink page="prev">
					<HiChevronLeft />
				</PaginationLink>

				<Pagination.Items
					render={(page) => (
						<PaginationLink
							page={page.value}
							variant={{ base: "ghost", _selected: "outline" }}
						>
							{page.value}
						</PaginationLink>
					)}
				/>

				<PaginationLink page="next">
					<HiChevronRight />
				</PaginationLink>
			</ButtonGroup>
		</Pagination.Root>
	)
}
