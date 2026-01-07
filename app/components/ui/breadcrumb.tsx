import { Breadcrumb as BreadcrumbBase } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

type Props = {
  data: { title: string; to?: string }[];
};

export default function Breadcrumb({ data = [] }: Props) {
  return (
    <BreadcrumbBase.Root>
      <BreadcrumbBase.List>
        {data.map((item, index) => (
          <>
            <BreadcrumbBase.Item key={index}>
              {!!item.to ? (
                <Link to={item.to}>{item.title}</Link>
              ) : (
                <BreadcrumbBase.CurrentLink
                  _firstLetter={{ textTransform: "uppercase" }}
                >
                  {item.title}
                </BreadcrumbBase.CurrentLink>
              )}
            </BreadcrumbBase.Item>
            {!!index ||
              (index !== data.length - 1 && (
                <BreadcrumbBase.Separator key={index} />
              ))}
          </>
        ))}
      </BreadcrumbBase.List>
    </BreadcrumbBase.Root>
  );
}
